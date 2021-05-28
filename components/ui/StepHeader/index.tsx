import { useTranslation } from "react-i18next"
import styled from "styled-components"
import tw from "twin.macro"

import { Badge } from "../Badge"

interface Props {
  status: "edit" | "done" | "disabled"
  label: string
  info: string
  stepNumber?: number
  onEditRequest?: () => void
}

export const StepHeader: React.FC<Props> = ({
  status,
  label,
  info,
  stepNumber,
  onEditRequest,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper disabled={status === "disabled"}>
      <Body>
        <Top>
          <MobileBadge>
            <Badge status={status} stepNumber={stepNumber} />
          </MobileBadge>
          <Title data-cy="step-header-customer">{label}</Title>
          {status === "done" ? (
            <Edit>
              {" "}
              <EditButton
                data-cy={`edit-step-${stepNumber}-button`}
                onClick={onEditRequest}
              >
                {t("general.edit")}
              </EditButton>
            </Edit>
          ) : null}
        </Top>
        <Info data-cy="step-header-info">{info}</Info>
      </Body>
    </Wrapper>
  )
}

interface WrapperProps {
  disabled?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  ${tw`flex items-start mb-1.5 md:pl-0 md:mb-5`}
`

const Body = styled.div`
  ${tw``}
`

const Top = styled.div`
  ${tw`flex items-center md:items-start mb-1.5`}
`

const Edit = styled.div`
  ${tw`ml-2 md:flex md:self-end`}
`

const EditButton = styled.button`
  ${tw`text-sm font-bold text-primary border-b leading-none border-black border-opacity-10 md: transition ease-in duration-200 hover:border-opacity-50 hover:text-primary-dark focus:outline-none`}
`

const Title = styled.h2`
  ${tw`text-lg font-semibold leading-none pl-2 md:pl-0`}
`

const Info = styled.p`
  ${tw`text-gray-500 text-sm pl-8 md:pl-0`}
`
const MobileBadge = styled.div`
  ${tw`block md:hidden`}
`
