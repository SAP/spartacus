import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/users/:${ROUTE_PARAMS.userCode}`;
const paramsMapping: ParamsMapping = {
  userCode: 'customerId',
};

export const defaultUserRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUser: {
        paths: ['organization/users'],
      },
      orgUserCreate: {
        paths: ['organization/users/create'],
      },
      orgUserDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUserEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUserChangePassword: {
        paths: [`${listPath}/change-password`],
        paramsMapping,
      },
      orgUserApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgUserAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgUserPermissions: {
        paths: [`${listPath}/purchase-limits`],
        paramsMapping,
      },
      orgUserAssignPermissions: {
        paths: [`${listPath}/purchase-limits/assign`],
        paramsMapping,
      },
      orgUserUserGroups: {
        paths: [`${listPath}/user-groups`],
        paramsMapping,
      },
      orgUserAssignUserGroups: {
        paths: [`${listPath}/user-groups/assign`],
        paramsMapping,
      },
    },
  },
};
