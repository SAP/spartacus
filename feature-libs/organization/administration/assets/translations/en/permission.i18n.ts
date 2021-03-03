export const orgPurchaseLimit = {
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
    deactivateTitle: 'Disable this purchase limit?',
    deactivate:
      'Disabled purchase limits can no longer be assigned to a user or user group. Current assignments will have no effect.',
    confirmEnabled: 'Purchase Limit {{ item.code }} enabled successfully',
    confirmDisabled: 'Purchase Limit {{ item.code }} disabled successfully',
    update: 'Purchase Limit {{ item.code }} updated successfully',
    create: 'Purchase Limit {{ item.code }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the purchase limit to allow editing.',
    disabledEnable:
      'Unit must be enabled before this purchase limit may be enabled.',
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
