import { appConfig } from '~/src/config'
import { transformProductToEntityRow } from '~/src/app/products/transformers/transform-product-to-entity-row'
import { productsFixture } from '~/src/__fixtures__/products'

describe('#transformProductToEntityRow', () => {
  test('Should provide expected product transformation', () => {
    expect(transformProductToEntityRow(productsFixture.at(0))).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'link',
          url: `${appConfig.get(
            'appPathPrefix'
          )}/products/14be9663-e19b-4dd1-b606-8fa1a5094ba5`,
          value: 'Tractor'
        }),
        expect.objectContaining({
          kind: 'text',
          value: 'Farmer Giles'
        }),
        expect.objectContaining({
          classes: 'govuk-tag--green',
          kind: 'tag',
          value: 'new'
        }),
        expect.objectContaining({
          kind: 'currency',
          value: '32000'
        }),
        expect.objectContaining({
          kind: 'date',
          value: '2023-04-14T14:40:02.242Z'
        })
      ])
    )
  })
})
