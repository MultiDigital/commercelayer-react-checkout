import {
  LineItemsContainer,
  LineItem,
  LineItemCode,
  LineItemsCount,
  LineItemQuantity,
  TaxesAmount,
  ShippingAmount,
  TotalAmount,
  PaymentMethodAmount,
  SubTotalAmount,
  DiscountAmount,
  AdjustmentAmount,
  GiftCardAmount,
} from "@commercelayer/react-components"
import { Box } from "@theme-ui/components"
import { Trans, useTranslation } from "react-i18next"

import { AppProviderData } from "components/data/AppProvider"

import "twin.macro"

import { CouponOrGiftCard } from "./CouponOrGiftCard"
import { LineItemTypes } from "./LineItemTypes"
import {
  SummaryHeader,
  SummarySubTitle,
  SummaryTitle,
  AmountWrapper,
  TotalWrapper,
  AmountSpacer,
  RecapLine,
  RecapLineTotal,
  RecapLineItemTotal,
  RecapLineItem,
} from "./styled"

interface Sku {
  id: string
  displayName: string
  sku: string
  image: {
    url: string
  }
  size: {
    id: string
    name: string
  }
  color: {
    id: string
    name: string
    colorSwitcher: {
      hex: string
    }
  }
}
interface Props {
  allSkus: Sku[]
  appCtx: AppProviderData
}

export const OrderSummary: React.FC<Props> = ({ allSkus, appCtx }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ pb: [5] }}>
      <LineItemsContainer>
        <SummaryHeader>
          <SummaryTitle data-cy="test-summary">
            {t("orderRecap.order_summary")}
          </SummaryTitle>
          <SummarySubTitle>
            <LineItemsCount typeAccepted={["skus", "gift_cards"]}>
              {(props) =>
                t("orderRecap.cartContains", { count: props.quantity })
              }
            </LineItemsCount>
          </SummarySubTitle>
        </SummaryHeader>
        <LineItemTypes type="skus" allSkus={allSkus} />
      </LineItemsContainer>
      <TotalWrapper>
        <AmountSpacer />
        <AmountWrapper>
          <RecapLine>
            <RecapLineItem>{t("orderRecap.subtotal_amount")}</RecapLineItem>
            <SubTotalAmount />
          </RecapLine>
          <RecapLine>
            <DiscountAmount>
              {(props) => {
                if (props.priceCents === 0) return <></>
                return (
                  <>
                    <RecapLineItem>
                      {t("orderRecap.discount_amount")}
                    </RecapLineItem>
                    <div data-cy="discount-amount">{props.price}</div>
                  </>
                )
              }}
            </DiscountAmount>
          </RecapLine>
          <RecapLine>
            <AdjustmentAmount>
              {(props) => {
                if (props.priceCents === 0) return <></>
                return (
                  <>
                    <RecapLineItem>
                      {t("orderRecap.adjustment_amount")}
                    </RecapLineItem>
                    <div data-cy="adjustment-amount">{props.price}</div>
                  </>
                )
              }}
            </AdjustmentAmount>
          </RecapLine>
          <RecapLine>
            <ShippingAmount>
              {(props) => {
                if (!appCtx.isShipmentRequired) return <></>
                return (
                  <>
                    <RecapLineItem>
                      {t("orderRecap.shipping_amount")}
                    </RecapLineItem>
                    <div data-cy="shipping-amount">
                      {!appCtx.hasShippingMethod
                        ? t("orderRecap.notSet")
                        : props.priceCents === 0
                        ? t("general.free")
                        : props.price}
                    </div>
                  </>
                )
              }}
            </ShippingAmount>
          </RecapLine>
          <RecapLine data-cy="payment-method-amount">
            <PaymentMethodAmount>
              {(props) => {
                if (props.priceCents === 0) return <></>
                return (
                  <>
                    <RecapLineItem>
                      {t("orderRecap.payment_method_amount")}
                    </RecapLineItem>
                    {props.price}
                  </>
                )
              }}
            </PaymentMethodAmount>
          </RecapLine>
          <RecapLine>
            <TaxesAmount>
              {(props) => {
                const isTaxIncluded =
                  appCtx.hasShippingAddress && appCtx.hasShippingMethod
                return (
                  <>
                    <RecapLineItem>
                      <Trans
                        i18nKey={
                          isTaxIncluded
                            ? "orderRecap.tax_included_amount"
                            : "orderRecap.tax_amount"
                        }
                        components={
                          isTaxIncluded
                            ? {
                                style: (
                                  <span
                                    className={
                                      !appCtx.taxIncluded
                                        ? "text-gray-600 font-normal"
                                        : ""
                                    }
                                  />
                                ),
                              }
                            : {}
                        }
                      />
                    </RecapLineItem>
                    <div data-cy="tax-amount">
                      {appCtx.hasShippingAddress && appCtx.hasShippingMethod
                        ? props.price
                        : t("orderRecap.notSet")}
                    </div>
                  </>
                )
              }}
            </TaxesAmount>
          </RecapLine>
          <RecapLine>
            <GiftCardAmount>
              {(props) => {
                if (props.priceCents === 0) return <></>
                return (
                  <>
                    <RecapLineItem>
                      {t("orderRecap.giftcard_amount")}
                    </RecapLineItem>
                    <div data-cy="giftcard-amount">{props.price}</div>
                  </>
                )
              }}
            </GiftCardAmount>
          </RecapLine>
          <RecapLineTotal>
            <RecapLineItemTotal>
              {t("orderRecap.total_amount")}
            </RecapLineItemTotal>
            <TotalAmount
              data-cy="total-amount"
              className="text-xl font-extrabold"
            />
          </RecapLineTotal>
        </AmountWrapper>
      </TotalWrapper>
    </Box>
  )
}
