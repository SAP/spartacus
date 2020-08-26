export const permission = {
  header: 'All purchase limits ({{count}})',
  disabled: '(disabled)',
  name: 'Name',
  code: 'Code',
  active: 'Status',
  limit: 'Limit',
  orderApprovalPermissionType: 'Type',
  threshold: 'Threshold',
  periodRange: 'Period',
  currency: 'Currency',
  orgUnit: 'Parent Unit',
  unit: 'Parent Unit',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',

  messages: {
    enabled:
      'When you disable the purchase limit, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled purchase limit.',
    deactivate: 'Are you sure you want to disable this purchase limit?',
    deactivateHeader: 'Disable Purchase Limit',
  },

  per: {
    undefined: '',
    MONTH: 'per Month',
    YEAR: 'per Year',
    WEEK: 'per Week',
    QUARTER: 'per Quarter',
  },
};
