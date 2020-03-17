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
        orgCustomers: '/users/${userId}/orgCustomers',
        orgCustomer: '/users/${userId}/orgCustomers/${orgCustomerId}',
        orgCustomerApprovers:
          '/users/${userId}/orgCustomers/${orgCustomerId}/approvers',
        orgCustomerApprover:
          '/users/${userId}/orgCustomers/${orgCustomerId}/approvers/${approverId}',
        orgCustomerUserGroups:
          '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups',
        orgCustomerUserGroup:
          '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups/${userGroupId}',
        orgCustomerPermissions:
          '/users/${userId}/orgCustomers/${orgCustomerId}/permissions',
        orgCustomerPermission:
          '/users/${userId}/orgCustomers/${orgCustomerId}/permissions/${permissionId}',
      },
    },
  },
};
