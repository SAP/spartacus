import { costCenter } from './cost-center.i18n';
import { units } from './units.i18n';

/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
export const organization = {
  organization: {
    enabled: 'Enabled',
    disabled: 'Disabled',
    enable: 'Enable',
    disable: 'Disable',

    back: '',
    close: '',
    cancel: 'Cancel',

    create: 'Create {{name}}',
    edit: 'Edit details',
    save: 'Save {{name}}',

    manage: 'Manage',

    active: 'Active',
    status: 'Status',

    messages: {
      emptyList: 'The list is empty',
    },
  },

  // sub feature labels are added below
  costCenter,
  units,
};
