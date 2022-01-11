/* eslint-disable */
import { request } from "../../lib/datocms"

const SKU_QUERY: string = `query VariantQuery {
  allVariants {
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
`

export const useVariant = async (query: any = SKU_QUERY, variables?: any, preview?: any) => {
  const data = await request({
    query,
    variables,
    preview
  })

  // eslint-disable-next-line @typescript-eslint/ban-types
  const i18nVariant = data.allVariants.filter((link: object) => link)

  return i18nVariant
}
