import CommerceLayer, { LineItem } from "@commercelayer/sdk"
import { createContext, useEffect, useContext } from "react"
import TagManager from "react-gtm-module"

import { AppContext } from "components/data/AppProvider"

interface GTMProviderData {
  fireAddShippingInfo: () => Promise<void>
  fireAddPaymentInfo: () => Promise<void>
  firePurchase: () => Promise<void>
}

export const GTMContext = createContext<GTMProviderData | null>(null)

interface GTMProviderProps {
  children: React.ReactNode
  gtmId?: string
}
interface ItemProps {
  item_id: string | undefined
  item_name: string | undefined
  price: number | undefined
  currency: string | undefined
  quantity: number | undefined
}

interface PushDataLayerProps {
  eventName:
    | "begin_checkout"
    | "add_shipping_info"
    | "add_payment_info"
    | "purchase"
  dataLayer: {
    coupon?: string
    currency: string | undefined
    shipping?: number
    items?: (ItemProps | undefined)[]
    value?: number
    shipping_tier?: string
    transaction_id?: number
    payment_type?: string
    tax?: number
  }
}

export const GTMProvider: React.FC<GTMProviderProps> = ({
  children,
  gtmId,
}) => {
  if (!gtmId) {
    return <>{children}</>
  }
  const ctx = useContext(AppContext)

  if (!ctx) {
    return <>{children}</>
  }

  const { accessToken, orderId, slug, domain } = ctx

  const cl = CommerceLayer({
    organization: slug,
    accessToken: accessToken,
    domain,
  })

  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId: gtmId })
      fireBeginCheckout()
    }
  }, [])

  const fetchOrder = async () => {
    return cl.orders.retrieve(orderId, {
      include: [
        "line_items",
        "shipments",
        "shipments.shipping_method",
        "payment_method",
      ],
      fields: {
        orders: [
          "number",
          "coupon_code",
          "currency_code",
          "total_amount_with_taxes_float",
          "shipping_amount_float",
          "total_tax_amount_float",
          "payment_method",
        ],
      },
    })
  }

  const pushDataLayer = ({ eventName, dataLayer }: PushDataLayerProps) => {
    try {
      TagManager.dataLayer({
        dataLayer: {
          event: eventName,
          ecommerce: dataLayer,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const mapItemsToGTM = ({
    name,
    currency_code,
    sku_code,
    quantity,
    total_amount_float,
  }: LineItem): ItemProps => {
    return {
      item_id: sku_code,
      item_name: name,
      price: total_amount_float,
      currency: currency_code,
      quantity: quantity,
    }
  }

  const fireBeginCheckout = async () => {
    const order = await fetchOrder()
    const lineItems = (
      await cl.orders.retrieve(orderId, {
        include: ["line_items"],
        fields: {
          orders: ["line_items"],
          line_items: [
            "sku_code",
            "name",
            "total_amount_float",
            "currency_code",
            "quantity",
            "item_type",
          ],
        },
      })
    ).line_items?.filter((line_item) => {
      return (
        line_item.item_type === "skus" || line_item.item_type === "gift_cards"
      )
    })

    return pushDataLayer({
      eventName: "begin_checkout",
      dataLayer: {
        coupon: order?.coupon_code,
        currency: order?.currency_code,
        items: lineItems?.map(mapItemsToGTM),
        value: order?.total_amount_with_taxes_float,
      },
    })
  }

  const fireAddShippingInfo = async () => {
    const order = await fetchOrder()
    const shipments = (
      await cl.orders.retrieve(orderId, {
        include: [
          "shipments.shipping_method",
          "shipments.shipment_line_items",
          "shipments.shipment_line_items.line_item",
        ],
        fields: {
          orders: ["shipments"],
          shipments: ["shipping_method", "shipment_line_items"],
          shipping_method: ["name", "price_amount_for_shipment_float"],
          shipment_line_items: ["line_item"],
          line_item: [
            "sku_code",
            "name",
            "total_amount_float",
            "currency_code",
            "quantity",
            "item_type",
          ],
        },
      })
    ).shipments

    shipments?.forEach(async (shipment) => {
      const lineItems = shipment.shipment_line_items?.map(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (e) => e && mapItemsToGTM(e.line_item)
      )

      pushDataLayer({
        eventName: "add_shipping_info",
        dataLayer: {
          coupon: order?.coupon_code,
          currency: order?.currency_code,
          items: lineItems,
          value: shipment.shipping_method?.price_amount_for_shipment_float,
          shipping_tier: shipment.shipping_method?.name,
        },
      })
    })
  }

  const fireAddPaymentInfo = async () => {
    const order = await fetchOrder()
    const lineItems = (
      await cl.orders.retrieve(orderId, {
        include: ["line_items"],
        fields: {
          orders: ["line_items"],
          line_items: [
            "sku_code",
            "name",
            "total_amount_float",
            "currency_code",
            "quantity",
            "item_type",
          ],
        },
      })
    ).line_items?.filter((line_item) => {
      return (
        line_item.item_type === "skus" || line_item.item_type === "gift_cards"
      )
    })

    const paymentMethod = order.payment_method

    return pushDataLayer({
      eventName: "add_payment_info",
      dataLayer: {
        coupon: order?.coupon_code,
        currency: order?.currency_code,
        items: lineItems?.map(mapItemsToGTM),
        value: paymentMethod?.price_amount_float,
        payment_type: paymentMethod?.name,
      },
    })
  }

  const firePurchase = async () => {
    const order = await fetchOrder()
    const lineItems = (
      await cl.orders.retrieve(orderId, {
        include: ["line_items"],
        fields: {
          orders: ["line_items"],
          line_items: [
            "sku_code",
            "name",
            "total_amount_float",
            "currency_code",
            "quantity",
            "item_type",
          ],
        },
      })
    ).line_items?.filter((line_item) => {
      return (
        line_item.item_type === "skus" || line_item.item_type === "gift_cards"
      )
    })

    return pushDataLayer({
      eventName: "purchase",
      dataLayer: {
        coupon: order?.coupon_code,
        currency: order?.currency_code,
        items: lineItems?.map(mapItemsToGTM),
        transaction_id: order?.number,
        shipping: order?.shipping_amount_float,
        value: order?.total_amount_with_taxes_float,
        tax: order?.total_tax_amount_float,
      },
    })
  }

  return (
    <GTMContext.Provider
      value={{
        fireAddShippingInfo,
        fireAddPaymentInfo,
        firePurchase,
      }}
    >
      {children}
    </GTMContext.Provider>
  )
}
