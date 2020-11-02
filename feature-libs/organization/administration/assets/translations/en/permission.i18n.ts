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
    title: 'Purchase Limit Details',
    subtitle: 'Purchase Limit: {{ item.code }}',
  },
  edit: {
    title: 'Edit Purchase Limit',
    subtitle: 'Purchase limits : {{ item.code }}',
  },
  create: {
    title: 'Create Purchase Limit',
    subtitle: '',
  },

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',

  messages: {
    deactivate: 'Are you sure you want to disable this purchase limit?',
    confirmEnabled: 'Purchase Limit {{ item.code }} enabled successfully',
    confirmDisabled: 'Purchase Limit {{ item.code }} disabled successfully',
    update: 'Purchase Limit {{ item.code }} updated successfully',
    create: 'Purchase Limit {{ item.code }} created successfully',
  },

  per: {
    DAY: 'per day',
    WEEK: 'per week',
    MONTH: 'per month',
    QUARTER: 'per quarter',
    YEAR: 'per year',
  },

  breadcrumbs: {
    list: 'All purchase limits',
    details: '{{code}}',
  },
};
