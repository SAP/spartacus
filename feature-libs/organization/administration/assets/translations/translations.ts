import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const organizationTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for organization sub features
export const organizationTranslationChunksConfig: TranslationChunksConfig = {
  organization: [
    'orgBudget',
    'orgBudgetAssignedCostCenters',
    'orgCostCenter',
    'orgCostCenterBudgets',
    'orgCostCenterAssignedBudgets',
    'orgUnit',
    'orgUnitChildren',
    'orgUnitAssignedRoles',
    'orgUnitApprovers',
    'orgUnitAssignedApprovers',
    'orgUnitCostCenters',
    'orgUnitUsers',
    'orgUnitUserRoles',
    'orgUnitAssignedUsers',
    'orgUnitAddress',

    'orgUserGroup',
    'orgUserGroupUsers',
    'orgUserGroupAssignedUsers',
    'orgUserGroupPermissions',
    'orgUserGroupAssignedPermissions',
    'orgUser',
    'orgUserApprovers',
    'orgUserAssignedApprovers',
    'orgUserPermissions',
    'orgUserAssignedPermissions',
    'orgUserUserGroups',
    'orgUserAssignedUserGroups',
    'orgPurchaseLimit',
  ],
};
