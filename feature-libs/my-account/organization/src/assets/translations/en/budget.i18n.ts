export const budget = {
  header: 'Budgets',
  disabled: '(disabled)',
  code: 'Code',
  name: 'Name',
  currency: 'Currency',
  unit: 'Parent Unit',
  amount: 'Amount',
  dateRange: 'Start - End',

  messages: {
    enabled:
      'When you disable the cost center, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled Cost Center.',
    deactivate: 'Are you sure you want to disable this cost center?',
    deactivateHeader: 'Disable Cost Center',
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
};
