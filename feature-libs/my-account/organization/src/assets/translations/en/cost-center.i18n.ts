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

  messages: {
    deactivate: 'Are you sure you want to disable this cost center?',
    confirmEnabled: 'Cost Center enabled successfully',
    confirmDisabled: 'Cost Center disabled successfully',
  },

  title: 'Cost Center Details',
  subtitle: 'Cost Center: {{ item.name }}',

  edit: {
    title: 'Edit Cost Center',
    subtitle: 'Cost Center: {{ item.name }}',
  },

  budget: {
    link: 'Budgets',
    assigned: 'Budget assigned successfully',
    unassigned: 'Budget unassigned successfully',

    title: 'Assigned budgets',
    subtitle: 'Cost Center: {{ item.name }}',

    assign: {
      title: 'Budgets',
      subtitle: 'Cost Center: {{ item.name }}',
    },
  },
};
