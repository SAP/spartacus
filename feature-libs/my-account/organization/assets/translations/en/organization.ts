import { unitAssignApprovers, unitAssignRoles, unit } from './units.i18n';
import { costCenter, costCenterAssignBudgets } from './cost-center.i18n';
import {
  userGroup,
  userGroupAssignUsers,
  userGroupAssignPermissions,
} from './user-group.i18n';
import { budget } from './budget.i18n';
import {
  user,
  userAssignApprovers,
  userAssignPermissions,
  userAssignUserGroups,
} from './user.i18n';
import { permission } from './permission.i18n';
import { orderApproval, orderApprovalList } from './order-approval.i18n';

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

    name: 'Name',
    code: 'Code',

    back: '',
    close: '',
    cancel: 'Cancel',

    create: 'Create {{name}}',
    edit: 'Edit details',
    save: 'Save {{name}}',
    delete: 'Delete',

    manage: 'Manage',

    active: 'Active',
    status: 'Status',
    details: 'Details',

    messages: {
      emptyList: 'The list is empty',
    },
    userRoles: {
      b2bcustomergroup: 'Customer',
      b2bapprovergroup: 'Approver',
      b2bmanagergroup: 'Manager',
      b2badmingroup: 'Admin',
    },

    breadcrumb: 'Organization',

    error: {
      noSufficientPermissions: 'No sufficient permissions to access this page',
    },

    warning: {
      noExistItem: '{{item}} does not exist',
      inactivatedItem: '{{item}} is not active',
    },
  },

  // sub feature labels are added below
  costCenter,
  costCenterAssignBudgets,
  unit,
  unitAssignRoles,
  unitAssignApprovers,
  userGroup,
  userGroupAssignUsers,
  userGroupAssignPermissions,
  budget,
  user,
  userAssignApprovers,
  userAssignPermissions,
  userAssignUserGroups,
  permission,
  orderApproval,
  orderApprovalList,
};
