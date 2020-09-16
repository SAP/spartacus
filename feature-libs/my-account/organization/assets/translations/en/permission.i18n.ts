export const permission = {
  header: 'All purchase limits ({{count}})',

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
  actions: '',

  details: {
    title: 'Purchase limits details',
    subtitle: 'Purchase limits: {{ item.code }}',
  },
  edit: {
    title: 'Edit Purchase limit',
    subtitle: 'Purchase limits : {{ item.code }}',
  },
  create: {
    title: 'Create Purchase limit',
    subtitle: '',
  },

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',

  messages: {
    deactivate: 'Are you sure you want to disable this purchase limit?',
    confirmEnabled: 'Purchase Limit enabled successfully',
    confirmDisabled: 'Purchase Limit disabled successfully',
  },

  per: {
    DAY: 'per day',
    WEEK: 'per week',
    MONTH: 'per month',
    QUARTER: 'per quarter',
    YEAR: 'per year',
  },
};
