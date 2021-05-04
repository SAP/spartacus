export const orgCostCenter = {
  header: 'All cost centers ({{count}})',

  code: 'Code',
  active: 'Status',
  name: 'Name',
  currency: 'Currency',
  unit: 'Parent Unit',
  actions: '',

  byName: 'Sort by name',
  byCode: 'Sort by code',
  byUnitName: 'Sort by unit',

  hint:
    "All orders placed through your organization's purchase account are linked to a cost center for tracking purposes. Each unit can have multiple cost centers. To limit spending, budgets are assigned to cost centers. A buyer selects a cost center when checking out.",
  disable: {
    confirm: 'Disable',
  },

  messages: {
    deactivateTitle: 'Disable this cost center?',
    deactivate:
      'Disabled cost centers cannot be used for placing new orders. Ensure that your unit has at least one cost center. Existing orders are not affected.',
    confirmEnabled: 'Cost Center {{ item.name }} enabled successfully',
    confirmDisabled: 'Cost Center {{ item.name }} disabled successfully',
    update: 'Cost Center {{ item.name }} updated successfully',
    create: 'Cost Center {{ item.name }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the cost center to allow editing.',
    disabledEnable:
      'Unit must be enabled before this cost center may be enabled.',
  },

  details: {
    title: 'Cost Center Details',
    subtitle: 'Cost Center: {{ item.name }}',
  },

  edit: {
    title: 'Edit Cost Center',
    subtitle: 'Cost Center: {{ item.name }}',
  },

  create: {
    title: 'Create Cost Center',
    subtitle: '',
  },

  budget: {
    link: 'Budgets',
  },

  breadcrumbs: {
    list: 'All cost centers',
    details: '{{name}}',
    budgets: 'Budgets',
  },
};

export const orgCostCenterAssignedBudgets = {
  title: 'Assigned budgets',
  subtitle: 'Cost Center: {{ item.name }}',
  assigned: 'Budget {{ item.name }} assigned successfully',
  unassigned: 'Budget {{ item.name }} unassigned successfully',
};

export const orgCostCenterBudgets = {
  title: 'Manage budgets',
  subtitle: 'Cost Center: {{ item.name }}',
  assigned: 'Budget {{ item.name }} assigned successfully',
  unassigned: 'Budget {{ item.name }} unassigned successfully',
};
