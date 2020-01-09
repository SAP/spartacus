import { OccConfig } from '../../config/occ-config';

export const defaultOccOrganizationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        budgets: '/users/${userId}/budgets',
        budget: '/users/${userId}/budgets/${budgetCode}',
        organizations: '/users/${userId}/availableOrgUnitNodes',
        organization: '/users/${userId}/orgUnits/{orgUnitId}',
      },
    },
  },
};
