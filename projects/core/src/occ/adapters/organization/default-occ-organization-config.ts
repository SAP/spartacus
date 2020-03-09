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
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}',
        orgUnitUserGroupAvailableOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/availableOrderApprovalPermissions',
        orgUnitUserGroupAvailableOrgCustomers:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/availableOrgCustomers',
        orgUnitUserGroupMembers:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/members',
        orgUnitUserGroupMember:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/members/${orgCustomerId}',
        orgUnitUserGroupOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/orderApprovalPermissions',
        orgUnitUserGroupOrderApprovalPermission:
          '/users/${userId}/orgUnitUserGroups/${orgUnitUserGrouppId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
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
