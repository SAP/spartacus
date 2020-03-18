import { OccConfig } from '../../config/occ-config';

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
        costCenters: '/costcenters',
        costCenter: '/costcenters/${costCenterCode}',
        costCentersAll: '/costcentersall',
        costCenterBudgets: '/costcenters/${costCenterCode}/budgets',
        costCenterBudget:
          '/costcenters/${costCenterCode}/budgets/${budgetCode}',
        permissions: '/users/${userId}/orderApprovalPermissions',
        permission:
          '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
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
          '/users/${userId}/orgCustomers/${orgCustomerId}/permissions/${permissionId}',
      },
    },
  },
};
