import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const organizationTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for organization sub features
export const organizationTranslationChunksConfig: TranslationChunksConfig = {
  organization: [
    'budget',
    'budgetAssignedCostCenters',
    'costCenter',
    'costCenterBudgets',
    'costCenterAssignedBudgets',
    'unit',
    'unitAssignedRoles',
    'unitAssignedApprovers',
    'userGroup',
    'userGroupUsers',
    'userGroupAssignedUsers',
    'userGroupAssignedPermissions',
    'user',
    'userApprovers',
    'userAssignedApprovers',
    'userPermissions',
    'userAssignedPermissions',
    'userUserGroups',
    'userAssignedUserGroups',
    'permission',
    'orderApproval',
    'orderApprovalList',
  ],
};
