export const permission = {
  header: 'Purchase limits',
  disabled: '(disabled)',
  name: 'Name',
  code: 'Code',
  limit: 'Limit',
  orderApprovalPermissionType: 'Type',
  threshold: 'Threshold',
  periodRange: 'Period',
  currency: 'Currency',
  orgUnit: 'Parent Unit',

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
