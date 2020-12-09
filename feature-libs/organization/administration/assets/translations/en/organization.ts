import { budget, budgetAssignedCostCenters } from './budget.i18n';
import {
  costCenter,
  costCenterAssignedBudgets,
  costCenterBudgets,
} from './cost-center.i18n';
import { permission } from './permission.i18n';
import {
  orgUnit,
  orgUnitAddress,
  orgUnitApprovers,
  orgUnitAssignedApprovers,
  orgUnitAssignedRoles,
  orgUnitAssignedUsers,
  orgUnitChildren,
  orgUnitCostCenters,
  orgUnitUserRoles,
  orgUnitUsers,
} from './units.i18n';
import {
  orgUserGroup,
  orgUserGroupAssignedPermissions,
  orgUserGroupAssignedUsers,
  orgUserGroupPermissions,
  orgUserGroupUsers,
} from './user-group.i18n';
import {
  orgUser,
  orgUserApprovers,
  orgUserAssignedApprovers,
  orgUserAssignedPermissions,
  orgUserAssignedUserGroups,
  orgUserPermissions,
  orgUserUserGroups,
} from './user.i18n';

/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */

export const organization = {
  organization: {
    enabled: 'Active',
    disabled: 'Disabled',

    enable: 'Enable',
    disable: 'Disable',

    name: 'Name',
    code: 'Code',

    done: 'done',

    cancel: 'Cancel',

    add: 'Add',
    create: 'Create {{name}}',
    edit: 'Edit',
    save: 'Save {{name}}',
    delete: 'Delete',

    assign: 'Manage',

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

    notification: {
      noSufficientPermissions: 'No sufficient permissions to access this page',
      notExist: 'This item does not exist',
      disabled: 'You cannot edit a disabled item',
    },

    confirmation: {
      cancel: 'CANCEL',
      confirm: 'CONFIRM',
    },
  },

  // sub feature labels are added below
  costCenter,
  costCenterBudgets,
  costCenterAssignedBudgets,
  budget,
  budgetAssignedCostCenters,
  orgUnit,
  orgUnitChildren,
  orgUnitApprovers,
  orgUnitAssignedApprovers,
  orgUnitAssignedRoles,
  orgUnitUsers,
  orgUnitUserRoles,
  orgUnitAssignedUsers,
  orgUnitCostCenters,
  orgUnitAddress,

  orgUserGroup,
  orgUserGroupUsers,
  orgUserGroupAssignedUsers,
  orgUserGroupPermissions,
  orgUserGroupAssignedPermissions,
  orgUser,
  orgUserUserGroups,
  orgUserAssignedUserGroups,
  orgUserApprovers,
  orgUserAssignedApprovers,
  orgUserPermissions,
  orgUserAssignedPermissions,
  permission,
};
