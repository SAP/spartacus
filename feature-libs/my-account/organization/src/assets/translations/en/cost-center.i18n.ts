export const costCenter = {
  header: 'Cost centers',
  disabled: '(disabled)',
  code: 'Code',
  name: 'Name',
  currency: 'Currency',
  unit: 'Parent Unit',

  messages: {
    enabled:
      'When you disable the cost center, the related data will be disabled as well. ',
    disabled: 'You cannot edit a disabled Cost Center.',
    disabledUnit: 'You cannot enable cost center if unit is disabled.',
    deactivate: 'Are you sure you want to disable this cost center?',
    deactivateHeader: 'Disable Cost Center',
  },

  budget: {
    link: 'Budgets',
    header: 'Budgets in {{code}}',
    assign: 'Assign budgets',
    assignHeader: 'Assign budgets in {{code}}',
    back: 'Back',
    instructions: {
      check: 'To assign a budget to this cost center, select its check box.',
      uncheck: 'To unassign a budget, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
  },
};

export const costCenterAssignBudgets = {
  name: 'Name',
  code: 'Code',
  amount: 'Amount',
  dateRange: 'Start - End',
};
