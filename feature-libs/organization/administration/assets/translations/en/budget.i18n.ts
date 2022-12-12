/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const orgBudget = {
  header: 'All budgets ({{count}})',

  code: {
    label: 'Code',
    required: 'Code is required',
  },
  name: {
    label: 'Name',
    required: 'Name is required',
  },
  active: 'Status',
  currency: {
    label: 'Currency',
    required: 'Currency is required',
  },
  amount: {
    label: 'Amount',
    required: 'Amount is required',
  },
  unit: 'Unit',
  businessUnits: {
    label: 'Unit',
    required: 'Unit is required',
  },
  dateRange: 'Start - End',
  startDate: 'Start',
  endDate: 'End',
  actions: '',

  sortBy: 'Sort by',
  sort: {
    byName: 'Name',
    byUnitName: 'Unit',
    byCode: 'Code',
    byValue: 'Value',
  },

  hint: 'Budgets set overall purchase limits and are assigned to cost centers. A buyer selects a cost center when checking out.',

  details: {
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
    deactivateTitle: 'Disable this budget?',
    deactivate:
      'Disabled budgets no longer apply to the cost centers they are assigned to. Ensure that the associated cost center has at least one budget.',
    confirmEnabled: 'Budget {{ item.name }} enabled successfully',
    confirmDisabled: 'Budget {{ item.name }} disabled successfully',
    update: 'Budget {{ item.name }} updated successfully',
    create: 'Budget {{ item.name }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the budget to allow editing.',
    disabledEnable: 'Unit must be enabled before this budget may be enabled.',
  },

  links: {
    costCenters: 'Cost Centers',
  },

  breadcrumbs: {
    list: 'All budgets',
    details: '{{name}}',
  },
};

export const orgBudgetAssignedCostCenters = {
  title: 'Cost centers',
  subtitle: 'Budget: {{ item.name }}',
};
