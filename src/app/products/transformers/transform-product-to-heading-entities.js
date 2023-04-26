import { getConditionClassname } from '~/src/app/products/helpers/get-condition-classname'

function transformProductToHeadingEntities(product) {
  return {
    primary: [
      {
        kind: 'text',
        value: product.owner,
        label: 'Owner'
      },
      {
        kind: 'tag',
        value: product.condition,
        classes: getConditionClassname(product.condition),
        label: 'Condition'
      },
      {
        kind: 'currency',
        value: product.cost,
        label: 'Cost'
      }
    ],
    secondary: [
      {
        kind: 'date',
        value: product.timestamp,
        label: 'Available'
      }
    ]
  }
}

export { transformProductToHeadingEntities }
