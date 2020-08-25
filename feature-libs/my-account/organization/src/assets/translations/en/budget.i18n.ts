export const budget = {
  header: 'Budgets',
  disabled: '(disabled)',
  code: 'Code',
  name: 'Name',
  active: 'Status',
  currency: 'Currency',
  unit: 'Parent Unit',
  amount: 'Amount',
  dateRange: 'Start - End',

  messages: {
    enabled:
      'When you disable the budget, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled Budget.',
    disabledUnit: 'You cannot enable budget if unit is disabled.',
    deactivate: 'Are you sure you want to disable this budget?',
    deactivateHeader: 'Disable Budget',
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
