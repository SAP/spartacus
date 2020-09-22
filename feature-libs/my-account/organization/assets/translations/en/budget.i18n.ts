export const budget = {
  header: 'All budgets ({{count}})',

  code: 'Code',
  name: 'Name',
  active: 'Status',
  currency: 'Currency',
  amount: 'Amount',
  unit: 'Unit',
  businessUnits: 'Unit',
  dateRange: 'Start - End',
  startDate: 'Start',
  endDate: 'End',
  actions: '',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',
  byCode: 'Sort by code',
  byValue: 'Sort by value',

  detail: {
    title: 'Budget Details',
    subtitle: 'Budget: {{ item.name }}',
  },

  edit: {
    title: 'Edit Budget',
    subtitle: 'Budget: {{ item.name }}',
  },

  create: {
    title: 'Create Budget',
    subtitle: '',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this budget?',
    confirmEnabled: 'Budget enabled successfully',
    confirmDisabled: 'Budget disabled successfully',
  },

  links: {
    costCenters: 'Cost Centers',
  },
};

export const budgetAssignedCostCenters = {
  title: 'Cost centers',
  subtitle: 'Budget: {{ item.name }}',
};
