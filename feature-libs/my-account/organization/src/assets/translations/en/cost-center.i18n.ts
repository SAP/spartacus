export const costCenter = {
  header: 'All cost centers ({{count}})',
  disabled: '(disabled)',
  code: 'Code',
  active: 'Status',
  name: 'Name',
  currency: 'Currency',
  unit: 'Parent Unit',

  byName: 'Sort by name',
  byCode: 'Sort by code',
  byUnitName: 'Sort by unit',

  actions: '',

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
    // header: 'Budgets: {{code}}',

    assign: 'Assign',
    assignHeader: 'Assign budgets in {{code}}',
    back: 'Back',
    instructions: {
      check: 'To assign a budget to this cost center, select its check box.',
      uncheck: 'To unassign a budget, clear its check box.',
      changes: 'Changes are saved automatically.',
    },
  },

  cardTitle: 'Cost Center Details',
  cardSubtitle: 'Cost Center {{ name }}',
};

export const costCenterBudgets = {
  cardTitle: 'Assigned budgets',
  cardSubtitle: 'Budget: {{ name }}',
  actions: '',
};

// export const costCenterAssignBudgets = {
//   name: 'Name',
//   assign: '',

//   header: 'Assign budgets ({{ count}})',
// };
