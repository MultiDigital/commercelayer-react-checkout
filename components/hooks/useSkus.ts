import { request } from "../../lib/datocms"

const SKUS_QUERY = `query VariantQuery {
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

export const useVariant = async () => {
  const data = await request({
    query: SKUS_QUERY,
  })

  const i18nVariant = data.allVariants.filter((link) => link)

  return i18nVariant
}
