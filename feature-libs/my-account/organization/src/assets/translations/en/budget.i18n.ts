export const budget = {
  header: 'All budgets ({{count}})',

  code: 'Code',
  name: 'Name',
  active: 'Status',
  currency: 'Currency',
  unit: 'Parent Unit',
  amount: 'Amount',
  dateRange: 'Start - End',
  actions: '',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',
  byCode: 'Sort by code',
  byValue: 'Sort by value',

  title: 'Budget Details',
  subtitle: 'Budget: {{ item.name }}',

  edit: {
    title: 'Edit Budget',
    subtitle: 'Budget: {{ item.name }}',
  },

  create: {
    title: 'Create Budget',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this budget?',
    confirmEnabled: 'Budget enabled successfully',
    confirmDisabled: 'Budget disabled successfully',
  },

  form: {
    code: {
      label: 'Budget ID',
      placeholder: 'Code',
    },
    name: {
      label: 'Budget name',
      placeholder: 'Name',
    },
    businessUnits: {
      label: 'Parent business unit',
      placeholder: 'Select business unit',
    },
    startDate: 'Start date',
    endDate: 'End date',
    currency: 'Currency',
    amount: {
      label: 'Budget amount',
      placeholder: 'Amount',
    },
  },
  costCenters: {
    link: 'Cost Centers',
    header: 'Cost Centers in {{code}}',
  },

  cardTitle: 'Budget Details',
  cardSubtitle: 'Budget: {{ name }}',
};

export const budgetCostCenters = {
  cardTitle: 'Cost centers',
  cardSubtitle: 'Budget: {{ name }}',
};
