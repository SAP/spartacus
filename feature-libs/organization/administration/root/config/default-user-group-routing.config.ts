import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/user-groups/:${ROUTE_PARAMS.userGroupCode}`;
const paramsMapping: ParamsMapping = {
  userGroupCode: 'uid',
};

// TODO: this doesn't work with lazy loaded feature
export const defaultUserGroupRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUserGroup: {
        paths: ['organization/user-groups'],
      },
      orgUserGroupCreate: {
        paths: ['organization/user-groups/create'],
      },
      orgUserGroupDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUserGroupEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUserGroupUsers: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      orgUserGroupAssignUsers: {
        paths: [`${listPath}/users/assign`],
        paramsMapping,
      },
      orgUserGroupPermissions: {
        paths: [`${listPath}/purchase-limits`],
        paramsMapping,
      },
      orgUserGroupAssignPermissions: {
        paths: [`${listPath}/purchase-limits/assign`],
        paramsMapping,
      },
    },
  },
};
