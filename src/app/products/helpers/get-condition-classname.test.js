import { getConditionClassname } from '~/src/app/products/helpers/get-condition-classname'

describe('#getDeploymentStatusClassname', () => {
  test('Should provide expected "new" className', () => {
    expect(getConditionClassname('new')).toEqual('govuk-tag--green')
  })

  test('Should provide expected "used" className', () => {
    expect(getConditionClassname('used')).toEqual('govuk-tag--purple')
  })

  test('Should provide expected "old" className', () => {
    expect(getConditionClassname('old')).toEqual('govuk-tag--orange')
  })

  test('Should provide expected default className', () => {
    expect(getConditionClassname()).toEqual('govuk-tag--blue')
  })
})
