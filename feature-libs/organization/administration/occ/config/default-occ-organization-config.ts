import { OccConfig } from '@spartacus/core';

export const defaultOccOrganizationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        budgets: '/users/${userId}/budgets',
        budget: '/users/${userId}/budgets/${budgetCode}',
        orgUnitsAvailable: '/users/${userId}/availableOrgUnitNodes',
        orgUnitsTree: '/users/${userId}/orgUnitsRootNodeTree',
        orgUnitsApprovalProcesses:
          '/users/${userId}/orgUnitsAvailableApprovalProcesses',
        orgUnits: '/users/${userId}/orgUnits',
        orgUnit: '/users/${userId}/orgUnits/${orgUnitId}',
        orgUnitUsers:
          '/users/${userId}/orgUnits/${orgUnitId}/availableUsers/${roleId}',
        orgUnitApprovers:
          '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles',
        orgUnitApprover:
          '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
        orgUnitUserRoles:
          '/users/${userId}/orgCustomers/${orgCustomerId}/roles',
        orgUnitUserRole:
          '/users/${userId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
        orgUnitsAddresses: '/users/${userId}/orgUnits/${orgUnitId}/addresses',
        orgUnitsAddress:
          '/users/${userId}/orgUnits/${orgUnitId}/addresses/${addressId}',
        userGroups: '/users/${userId}/orgUnitUserGroups',
        userGroup: '/users/${userId}/orgUnitUserGroups/${userGroupId}',
        userGroupAvailableOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrderApprovalPermissions',
        userGroupAvailableOrgCustomers:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrgCustomers',
        userGroupMembers:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/members',
        userGroupMember:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/members/${orgCustomerId}',
        userGroupOrderApprovalPermissions:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions',
        userGroupOrderApprovalPermission:
          '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
        costCenters: '/costcenters',
        costCenter: '/costcenters/${costCenterCode}',
        costCentersAll: '/costcentersall',
        costCenterBudgets: '/costcenters/${costCenterCode}/budgets',
        costCenterBudget:
          '/costcenters/${costCenterCode}/budgets/${budgetCode}',
        permissions: '/users/${userId}/orderApprovalPermissions',
        permission:
          '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
        orderApprovalPermissionTypes: '/orderApprovalPermissionTypes',
        b2bUsers: '/users/${userId}/orgCustomers',
        b2bUser: '/users/${userId}/orgCustomers/${orgCustomerId}',
        b2bUserApprovers:
          '/users/${userId}/orgCustomers/${orgCustomerId}/approvers',
        b2bUserApprover:
          '/users/${userId}/orgCustomers/${orgCustomerId}/approvers/${approverId}',
        b2bUserUserGroups:
          '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups',
        b2bUserUserGroup:
          '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups/${userGroupId}',
        b2bUserPermissions:
          '/users/${userId}/orgCustomers/${orgCustomerId}/permissions',
        b2bUserPermission:
          '/users/${userId}/orgCustomers/${orgCustomerId}/permissions/${premissionId}',
      },
    },
  },
};
