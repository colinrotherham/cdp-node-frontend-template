import { transformProductToHeadingEntities } from '~/src/app/products/transformers/transform-product-to-heading-entities'
import { productsFixture } from '~/src/__fixtures__/products'

describe('#transformProductToHeadingEntities', () => {
  test('Should provide expected product heading entities transformation', () => {
    expect(transformProductToHeadingEntities(productsFixture.at(0))).toEqual(
      expect.objectContaining({
        primary: expect.arrayContaining([
          expect.objectContaining({
            kind: 'text',
            label: 'Owner',
            value: 'Farmer Giles'
          }),
          expect.objectContaining({
            classes: 'govuk-tag--green',
            kind: 'tag',
            label: 'Condition',
            value: 'new'
          }),
          expect.objectContaining({
            kind: 'currency',
            label: 'Cost',
            value: '32000'
          })
        ]),
        secondary: expect.arrayContaining([
          expect.objectContaining({
            kind: 'date',
            label: 'Available',
            value: '2023-04-14T14:40:02.242Z'
          })
        ])
      })
    )
  })
})
