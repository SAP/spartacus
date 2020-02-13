import { OccConfig } from '../../config/occ-config';

export const defaultOccOrganizationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        budgets: '/users/${userId}/budgets',
        budget: '/users/${userId}/budgets/${budgetCode}',
        orgUnits: '/users/${userId}/availableOrgUnitNodes',
        orgUnit: '/users/${userId}/orgUnits/${orgUnitId}',
        costCenters: '/costcenters',
        costCenter: '/costcenters/${costCenterCode}',
        costCentersAll: '/costcentersall',
        permissions: '/users/${userId}/orderApprovalPermissions',
        permission:
          '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
      },
    },
  },
};
