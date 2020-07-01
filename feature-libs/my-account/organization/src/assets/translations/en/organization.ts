import { costCenter } from './cost-center.i18n';

/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
export const organization = {
  organization: {
    enabled: 'Enabled',
    disabled: 'Disabled',

    back: 'Back',
    create: 'Create {{name}}',
    edit: 'Edit {{name}}',
    save: 'Save {{name}}',
    cancel: 'Cancel {{name}}',
    close: 'Close {{name}}',

    manage: 'Manage',

    active: 'Active',
    status: 'Status',

    messages: {
      emptyList: 'The list is empty',
    },
  },

  // sub feature labels are added below
  costCenter,
};
