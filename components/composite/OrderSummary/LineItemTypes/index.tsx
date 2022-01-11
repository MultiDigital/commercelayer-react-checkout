import {
  LineItem,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  LineItemAmount,
  LineItemOptions,
  LineItemOption,
  LineItemCode,
} from "@commercelayer/react-components"
import { LineItemType } from "@commercelayer/react-components/lib/cjs/typings"
import {
  Box,
  Flex,
  Checkbox,
  Grid,
  Image,
  Label,
  Card,
  Radio,
  Heading,
  Divider,
  Text,
  Container,
  Input,
  Button,
} from "@theme-ui/components"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import tw from "twin.macro"

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
  type: LineItemType
}

export const LineItemTypes: React.FC<Props> = ({ allSkus, type }) => {
  const { t } = useTranslation()

  return (
    <>
      <LineItem type={type}>
        <LineItemWrapper>
          <LineItemDescription>
            <LineItemTitle>
              <LineItemCode>
                {(props) => {
                  const item = allSkus
                    .map((sku) => {
                      if (props.lineItem.sku_code === sku.sku)
                        return { ...sku, ...props.lineItem }
                    })
                    .filter((notUndefined) => notUndefined !== undefined)[0]

                  return (
                    item && (
                      <Flex
                        sx={{
                          alignContent: "centet",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Flex>
                          <Box
                            sx={{
                              width: ["100px"],
                              height: ["auto"],
                              top: 0,
                              left: 0,
                            }}
                          >
                            {item.image && <img alt="" src={item.image.url} />}
                          </Box>
                          <Flex
                            sx={{
                              flexDirection: "column",
                              ml: [3],
                            }}
                          >
                            <Box>
                              <StyledLineItemSkuCode />
                            </Box>
                            <Flex sx={{ justifyContent: "space-between" }}>
                              <Box>
                                <Heading
                                  as="h6"
                                  variant="h6"
                                  sx={{
                                    my: 0,
                                    mb: 2,
                                    fontWeight: "normal",
                                  }}
                                >
                                  {item.displayName}
                                </Heading>
                              </Box>
                            </Flex>
                            <Flex>
                              <Text> {item.size.name} </Text>
                              <Text> &nbsp; - &nbsp; </Text>
                              <Text> {item.color.name} </Text>
                            </Flex>
                            <Box>
                              <LineItemQty>
                                <LineItemQuantity>
                                  {(props) =>
                                    !!props.quantity &&
                                    t("orderRecap.quantity", {
                                      count: props.quantity,
                                    })
                                  }
                                </LineItemQuantity>
                              </LineItemQty>
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    )
                  )
                }}
              </LineItemCode>
            </LineItemTitle>
            <LineItemOptions showAll showName={false}>
              <StyledLineItemOption />
            </LineItemOptions>
          </LineItemDescription>
        </LineItemWrapper>
      </LineItem>
    </>
  )
}

const LineItemWrapper = styled.div`
  ${tw`flex flex-row mb-7 pb-6 border-b`}
`
const LineItemDescription = styled.div`
  ${tw`pl-4 flex flex-col flex-1 lg:pl-8`}
`
const LineItemTitle = styled.div`
  ${tw`flex justify-between`}
`
const LineItemQty = styled.div`
  ${tw`text-xs uppercase mt-1 bg-gray-300 max-w-max py-1 px-2.5 rounded-full tracking-wider text-gray-500 font-bold`}
`
const StyledLineItemSkuCode = styled(LineItemCode)`
  ${tw`text-xxs uppercase text-gray-500 font-bold`}
`
const StyledLineItemOption = styled(LineItemOption)`
  ${tw`text-gray-500 text-xs flex font-medium capitalize pl-5 mt-1.5 bg-no-repeat bg-16`}
  span {
    ${tw`font-bold text-gray-600 ml-1 line-clamp-3 md:line-clamp-6`}
  }

  &:not(span) {
    ${tw`font-medium`}
  }

  &:last-of-type {
    ${tw`mb-1.5`}
  }

  background-image: url("data:image/svg+xml;utf8;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJoLTUgdy01IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9ImN1cnJlbnRDb2xvciI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTAuMjkzIDUuMjkzYTEgMSAwIDAxMS40MTQgMGw0IDRhMSAxIDAgMDEwIDEuNDE0bC00IDRhMSAxIDAgMDEtMS40MTQtMS40MTRMMTIuNTg2IDExSDVhMSAxIDAgMTEwLTJoNy41ODZsLTIuMjkzLTIuMjkzYTEgMSAwIDAxMC0xLjQxNHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+");
`
