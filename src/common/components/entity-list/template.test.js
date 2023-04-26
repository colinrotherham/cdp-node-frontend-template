import { renderComponent } from '~/test-helpers/component-helpers'
import { transformProductToEntityRow } from '~/src/app/products/transformers/transform-product-to-entity-row'
import { productsFixture } from '~/src/__fixtures__/products'

describe('Entity List Component', () => {
  let $entityList

  describe('With entities', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(new Date('2023-04-01'))
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    beforeEach(() => {
      $entityList = renderComponent('entity-list', {
        headings: [
          { text: 'Product', size: 'medium' },
          { text: 'Owner', size: 'medium' },
          { text: 'Condition', size: 'small' },
          { text: 'Cost', size: 'medium' },
          { text: 'Available', size: 'large' }
        ],
        entityRows: [productsFixture.at(0)].map(transformProductToEntityRow),
        noResult: 'Currently there are no products'
      })
    })

    test('Should render app entity list component', () => {
      expect($entityList('[data-testid="app-entity-list"]').length).toEqual(1)
    })

    test('Should contain expected headings', () => {
      const getHeader = (headerNumber) =>
        $entityList(
          `[data-testid="app-entity-list-header"] [data-testid="app-entity-list-item-${headerNumber}"]`
        )

      expect(getHeader(1).text().trim()).toEqual('Product')
      expect(getHeader(2).text().trim()).toEqual('Owner')
      expect(getHeader(3).text().trim()).toEqual('Condition')
      expect(getHeader(4).text().trim()).toEqual('Cost')
      expect(getHeader(5).text().trim()).toEqual('Available')
    })

    test('Rows should contain expected size className', () => {
      const getItem = (itemNumber) =>
        $entityList(
          `[data-testid="app-entity-list-row-1"] [data-testid="app-entity-list-item-${itemNumber}"]`
        )

      expect(getItem(1).attr('class')).toContain(
        'app-entity-list__item--medium'
      )
      expect(getItem(2).attr('class')).toContain(
        'app-entity-list__item--medium'
      )
      expect(getItem(3).attr('class')).toContain('app-entity-list__item--small')
      expect(getItem(4).attr('class')).toContain(
        'app-entity-list__item--medium'
      )
      expect(getItem(5).attr('class')).toContain('app-entity-list__item--large')
    })

    test('Should contain expected entities', () => {
      const getEntity = (entityNumber) =>
        $entityList('[data-testid="app-entity-list-row-1"]').find(
          `[data-testid="app-entity-${entityNumber}"]`
        )
      expect(getEntity(1).length).toEqual(1)
      expect(getEntity(1).html()).toContain('Tractor')

      expect(getEntity(2).length).toEqual(1)
      expect(getEntity(2).html()).toContain('Farmer Giles')

      expect(getEntity(3).length).toEqual(1)
      expect(getEntity(3).html()).toContain('new')

      expect(getEntity(4).length).toEqual(1)
      expect(getEntity(4).html()).toContain('£32,000')

      expect(getEntity(5).length).toEqual(1)
      expect(getEntity(5).html()).toContain('Fri 14th April 2023')
    })
  })

  describe('Without entities', () => {
    beforeEach(() => {
      $entityList = renderComponent('entity-list', {
        headings: [],
        items: [],
        noResult: 'Currently there are no products'
      })
    })

    test('Should render no results message', () => {
      expect(
        $entityList('[data-testid="app-entity-list-no-results"]').length
      ).toEqual(1)
      expect(
        $entityList('[data-testid="app-entity-list-no-results"]').text().trim()
      ).toEqual('Currently there are no products')
    })
  })
})
