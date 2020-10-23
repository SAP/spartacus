export const costCenter = {
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

  disable: {
    confirm: 'Disable',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this cost center?',
    confirmEnabled: 'Cost Center {{ item.name }} enabled successfully',
    confirmDisabled: 'Cost Center {{ item.name }} disabled successfully',
    update: 'Cost Center {{ item.name }} updated successfully',
    create: 'Cost Center {{ item.name }} created successfully',
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

export const costCenterAssignedBudgets = {
  title: 'Assigned budgets',
  subtitle: 'Cost Center: {{ item.name }}',
  assigned: 'Budget "{{ item.name }}" assigned successfully',
  unassigned: 'Budget "{{ item.name }}" unassigned successfully',
};

export const costCenterBudgets = {
  title: 'Manage budgets',
  subtitle: 'Cost Center: {{ item.name }}',
  assigned: 'Budget assigned successfully',
  unassigned: 'Budget unassigned successfully',
};
