function getConditionClassname(condition) {
  switch (true) {
    case condition?.toLowerCase() === 'new':
      return 'govuk-tag--green'
    case condition?.toLowerCase() === 'used':
      return 'govuk-tag--purple'
    case condition?.toLowerCase() === 'old':
      return 'govuk-tag--orange'
    default:
      return 'govuk-tag--blue'
  }
}

export { getConditionClassname }
