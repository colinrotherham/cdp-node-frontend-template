import { appConfig } from '~/src/config'
import { getConditionClassname } from '~/src/app/products/helpers/get-condition-classname'

function transformProductToEntityRow(product) {
  return [
    {
      kind: 'link',
      value: product.name,
      url: `${appConfig.get('appPathPrefix')}/products/${product.id}`
    },
    {
      kind: 'text',
      value: product.owner
    },
    {
      kind: 'tag',
      value: product.condition,
      classes: getConditionClassname(product.condition)
    },
    {
      kind: 'currency',
      value: product.cost
    },
    {
      kind: 'date',
      value: product.timestamp
    }
  ]
}

export { transformProductToEntityRow }
