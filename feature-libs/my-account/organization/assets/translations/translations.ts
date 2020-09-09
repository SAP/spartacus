import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const organizationTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for organization sub features
export const organizationTranslationChunksConfig: TranslationChunksConfig = {
  organization: [
    'costCenter',
    'costCenterBudgets',
    'costCenterAssignBudgets',
    'unit',
    'unitAssignRoles',
    'unitAssignApprovers',
    'userGroup',
    'userGroupUsers',
    'userGroupAssignUsers',
    'userGroupAssignPermissions',
    'budget',
    'budgetCostCenters',
    'user',
    'userAssignApprovers',
    'userAssignPermissions',
    'userAssignUserGroups',
    'permission',
    'orderApproval',
    'orderApprovalList',
  ],
};
