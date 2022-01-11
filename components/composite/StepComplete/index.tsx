import { useContext } from "react"
import { useTranslation, Trans } from "react-i18next"
import styled from "styled-components"
import tw from "twin.macro"

import { AppContext } from "components/data/AppProvider"
import { Base } from "components/ui/Base"
import { Button } from "components/ui/Button"
import { Footer } from "components/ui/Footer"
import { Logo } from "components/ui/Logo"

import { CheckIcon } from "./CheckIcon"
import { SupportMessage } from "./SupportMessage"

interface Props {
  logoUrl?: string
  companyName: string
  supportEmail: string
  supportPhone: string
  orderNumber: number
}

export const StepComplete: React.FC<Props> = ({
  logoUrl,
  companyName,
  supportEmail,
  supportPhone,
  orderNumber,
}) => {
  const { t } = useTranslation()

  const ctx = useContext(AppContext)

  const handleClick = () => {
    ctx?.returnUrl && (document.location.href = ctx?.returnUrl)
  }

  return (
    <Base>
      <ContainerFlex>
        <Wrapper>
          <Logo
            logoUrl={logoUrl}
            companyName={companyName}
            className="self-center pt-10 pl-4 mb-10 md:self-auto"
          />
          <Main>
            <div className="p-8">
              <CheckIcon />
            </div>
            <Title>{t("stepComplete.title")}</Title>
            <Text data-cy="complete-checkout-summary" className="text-gray-500">
              <Trans
                i18nKey={"stepComplete.summary"}
                values={{ orderNumber: orderNumber }}
                components={{
                  WrapperOrderId: <strong className="text-black" />,
                }}
              />
            </Text>
            <Message>
              <SupportMessage
                supportEmail={supportEmail}
                supportPhone={supportPhone}
              />
            </Message>
            {ctx?.returnUrl && (
              <WrapperButton>
                <Button data-cy="button-continue-to-shop" onClick={handleClick}>
                  {t("stepComplete.continue")}
                </Button>

                {""}
              </WrapperButton>
            )}
          </Main>
          {/* <Footer /> */}
        </Wrapper>
      </ContainerFlex>
    </Base>
  )
}

const ContainerFlex = styled.div`
  ${tw`w-full min-h-full flex min-h-inherit 2xl:max-w-screen-2xl 2xl:mx-auto`}
`
const Main = styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center text-center`}
`
const Wrapper = styled.div`
  ${tw`flex flex-col flex-1 p-5 md:p-10 lg:px-20 lg:pb-10 2xl:px-0`}
`
const Title = styled.h1`
  ${tw`text-2xl lg:text-4xl font-semibold mb-4`}
`
const Text = styled.p`
  ${tw`py-2`}
`
const Message = styled.div`
  ${tw`my-8 text-gray-500`}
  > br {
    ${tw`hidden md:block`}
  }
`
const WrapperButton = styled.div`
  ${tw`flex items-center justify-center pt-5`}
`
