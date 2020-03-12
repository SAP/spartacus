import { OccConfig } from '../../config/occ-config';

export const defaultOccOrganizationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        budgets: '/users/${userId}/budgets',
        budget: '/users/${userId}/budgets/${budgetCode}',
        orgUnits: '/users/${userId}/availableOrgUnitNodes',
        orgUnit: '/users/${userId}/orgUnits/${orgUnitId}',
        orgUnitUserGroups: '/users/${userId}/orgUnitUserGroups',
        orgUnitUserGroup:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}',
        orgUnitUserGroupAvailableOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/availableOrderApprovalPermissions',
        orgUnitUserGroupAvailableOrgCustomers:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/availableOrgCustomers',
        orgUnitUserGroupMembers:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/members',
        orgUnitUserGroupMember:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/members/${orgCustomerId}',
        orgUnitUserGroupOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/orderApprovalPermissions',
        orgUnitUserGroupOrderApprovalPermission:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGroupUid}/orderApprovalPermissions/${orderApprovalPermissionCode}',
        costCenters: '/costcenters',
        costCenter: '/costcenters/${costCenterCode}',
        costCentersAll: '/costcentersall',
        costCenterBudgets: '/costcenters/${costCenterCode}/budgets',
        costCenterBudget:
          '/costcenters/${costCenterCode}/budgets/${budgetCode}',
        permissions: '/users/${userId}/orderApprovalPermissions',
        permission:
          '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
      },
    },
  },
};
