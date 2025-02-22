import { CustomerContainer } from "@commercelayer/react-components"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import { request } from "../../../lib/datocms"

import { CheckoutSkeleton } from "components/composite/CheckoutSkeleton"
import { MainHeader } from "components/composite/MainHeader"
import { OrderSummary } from "components/composite/OrderSummary"
import { StepComplete } from "components/composite/StepComplete"
import {
  StepCustomer,
  StepHeaderCustomer,
} from "components/composite/StepCustomer"
import { StepNav } from "components/composite/StepNav"
import {
  StepPayment,
  StepHeaderPayment,
} from "components/composite/StepPayment"
import { PaymentContainer } from "components/composite/StepPayment/PaymentContainer"
import StepPlaceOrder from "components/composite/StepPlaceOrder"
import {
  StepShipping,
  StepHeaderShipping,
} from "components/composite/StepShipping"
import { AccordionProvider } from "components/data/AccordionProvider"
import { AppContext } from "components/data/AppProvider"
import { useActiveStep } from "components/hooks/useActiveStep"
import { LayoutDefault } from "components/layouts/LayoutDefault"
import { Accordion, AccordionItem } from "components/ui/Accordion"
import { Footer } from "components/ui/Footer"
import { Logo } from "components/ui/Logo"

// const SKU_QUERY = `query VariantQuery($limit: IntType , $skip: IntType){
//   allVariants(first: $limit, skip : $skip) {
//     id
//     displayName
//     sku
//     image {
//       url
//       url
//     }
//     size {
//       id
//       name
//     }
//     color {
//       id
//       name
//       colorSwitcher {
//         hex

//       }
//     }
//   }
// }
// `

export async function loadSKUS() {
  // start from 0
  let skip = 0

  const limit = 100

  // toggle to see when we should break the loop
  let keepQuerying = true

  // we will accumulate blog posts in this array
  let ALLSKUS = [] as any

  while (keepQuerying) {
    const data = await request({
      query: `query  {
        allVariants(first: ${limit}, skip : ${skip}) {
           id
           displayName
           sku
           image {
             url
             url
           }
           size {
             id
             name
           }
           color {
             id
             name
             colorSwitcher {
               hex
               
             }
           }
         }
       }
       `,
    })

    // aggregate results
    ALLSKUS = ALLSKUS.concat(data.allVariants)

    // adjust "cursor" to grab next batch
    skip += limit

    // see if we need to make another query
    if (data.allVariants.length < limit) {
      // if we got less items than we asked for
      // it means we reached the end

      keepQuerying = false
    }
  }

  if (keepQuerying === false) return ALLSKUS
}

interface Props {
  logoUrl?: string
  orderNumber: number
  companyName: string
  supportEmail: string
  supportPhone: string
  termsUrl: string
  privacyUrl: string
}

const Checkout: React.FC<Props> = ({
  logoUrl,
  orderNumber,
  companyName,
  supportEmail,
  supportPhone,
  termsUrl,
  privacyUrl,
}) => {
  const [allSkus, setAllSkus] = useState([])

  useEffect(() => {
    // Using an IIFE
    ;(async function anyNameFunction() {
      const data = await loadSKUS()
      if (data) setAllSkus(data)
    })()
  }, [])

  const ctx = useContext(AppContext)

  const { activeStep, lastActivableStep, setActiveStep, steps } =
    useActiveStep()

  const getStepNumber = (stepName: SingleStepEnum) => {
    return steps.indexOf(stepName) + 1
  }

  if (!ctx || ctx.isFirstLoading) {
    return <CheckoutSkeleton />
  }

  const renderComplete = () => {
    return (
      <StepComplete
        logoUrl={logoUrl}
        companyName={companyName}
        supportEmail={supportEmail}
        supportPhone={supportPhone}
        orderNumber={orderNumber}
      />
    )
  }

  const renderSteps = () => {
    return allSkus.length > 0 ? (
      <CustomerContainer isGuest={ctx.isGuest}>
        <LayoutDefault
          aside={
            <Sidebar>
              <Logo
                logoUrl={logoUrl}
                companyName={companyName}
                className="hidden md:block"
              />
              <SummaryWrapper>
                <OrderSummary allSkus={allSkus} appCtx={ctx} />
              </SummaryWrapper>
              {/* <Footer /> */}
            </Sidebar>
          }
          main={
            <div>
              <Logo
                logoUrl={logoUrl}
                companyName={companyName}
                className="block md:hidden"
              />
              <MainHeader orderNumber={orderNumber} />
              <StepNav
                steps={steps}
                activeStep={activeStep}
                onStepChange={setActiveStep}
                lastActivable={lastActivableStep}
              />
              <Accordion>
                <AccordionProvider
                  activeStep={activeStep}
                  lastActivableStep={lastActivableStep}
                  setActiveStep={setActiveStep}
                  step="Customer"
                  steps={steps}
                  isStepDone={ctx.hasShippingAddress && ctx.hasBillingAddress}
                >
                  <AccordionItem
                    index={1}
                    header={
                      <StepHeaderCustomer step={getStepNumber("Customer")} />
                    }
                  >
                    <StepCustomer className="mb-6" step={1} />
                  </AccordionItem>
                </AccordionProvider>
                {ctx.isShipmentRequired && (
                  <AccordionProvider
                    activeStep={activeStep}
                    lastActivableStep={lastActivableStep}
                    setActiveStep={setActiveStep}
                    step="Shipping"
                    steps={steps}
                    isStepRequired={ctx.isShipmentRequired}
                  >
                    <AccordionItem
                      index={2}
                      header={
                        <StepHeaderShipping step={getStepNumber("Shipping")} />
                      }
                    >
                      <StepShipping
                        className="mb-6"
                        step={2}
                        allSkus={allSkus}
                      />
                    </AccordionItem>
                  </AccordionProvider>
                )}
                <AccordionProvider
                  activeStep={activeStep}
                  lastActivableStep={lastActivableStep}
                  setActiveStep={setActiveStep}
                  step="Payment"
                  steps={steps}
                  isStepRequired={ctx.isPaymentRequired}
                  isStepDone={ctx.hasPaymentMethod}
                >
                  <PaymentContainer>
                    <AccordionItem
                      index={3}
                      header={
                        <StepHeaderPayment step={getStepNumber("Payment")} />
                      }
                    >
                      <div className="mb-6">
                        <StepPayment />
                      </div>
                    </AccordionItem>
                    <StepPlaceOrder
                      isActive={
                        activeStep === "Payment" || activeStep === "Complete"
                      }
                      termsUrl={termsUrl}
                      privacyUrl={privacyUrl}
                    />
                  </PaymentContainer>
                </AccordionProvider>
              </Accordion>
            </div>
          }
        />
      </CustomerContainer>
    ) : (
      <CheckoutSkeleton />
    )
  }

  return ctx.isComplete ? renderComplete() : renderSteps()
}

const Sidebar = styled.div`
  ${tw`flex flex-col min-h-full p-5 lg:pl-20 lg:pr-10 lg:pt-10 xl:pl-48 bg-gray-100`}
`
const SummaryWrapper = styled.div`
  ${tw`flex-1`}
`
export default Checkout
