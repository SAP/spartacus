/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/user-groups/:${ROUTE_PARAMS.userGroupCode}`;
const paramsMapping = {
    userGroupCode: 'uid',
};
// TODO: this doesn't work with lazy loaded feature
export const defaultUserGroupRoutingConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC11c2VyLWdyb3VwLXJvdXRpbmcuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290L2NvbmZpZy9kZWZhdWx0LXVzZXItZ3JvdXAtcm91dGluZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLFFBQVEsR0FBRyw2QkFBNkIsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQzNFLE1BQU0sYUFBYSxHQUFrQjtJQUNuQyxhQUFhLEVBQUUsS0FBSztDQUNyQixDQUFDO0FBRUYsbURBQW1EO0FBQ25ELE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFrQjtJQUMxRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTixZQUFZLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDcEM7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDM0M7WUFDRCxtQkFBbUIsRUFBRTtnQkFDbkIsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixhQUFhO2FBQ2Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLE9BQU8sQ0FBQztnQkFDM0IsYUFBYTthQUNkO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxRQUFRLENBQUM7Z0JBQzVCLGFBQWE7YUFDZDtZQUNELHVCQUF1QixFQUFFO2dCQUN2QixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsZUFBZSxDQUFDO2dCQUNuQyxhQUFhO2FBQ2Q7WUFDRCx1QkFBdUIsRUFBRTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLGtCQUFrQixDQUFDO2dCQUN0QyxhQUFhO2FBQ2Q7WUFDRCw2QkFBNkIsRUFBRTtnQkFDN0IsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLHlCQUF5QixDQUFDO2dCQUM3QyxhQUFhO2FBQ2Q7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBhcmFtc01hcHBpbmcsIFJvdXRpbmdDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnLi4vcm91dGUtcGFyYW1zJztcblxuY29uc3QgbGlzdFBhdGggPSBgb3JnYW5pemF0aW9uL3VzZXItZ3JvdXBzLzoke1JPVVRFX1BBUkFNUy51c2VyR3JvdXBDb2RlfWA7XG5jb25zdCBwYXJhbXNNYXBwaW5nOiBQYXJhbXNNYXBwaW5nID0ge1xuICB1c2VyR3JvdXBDb2RlOiAndWlkJyxcbn07XG5cbi8vIFRPRE86IHRoaXMgZG9lc24ndCB3b3JrIHdpdGggbGF6eSBsb2FkZWQgZmVhdHVyZVxuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyR3JvdXBSb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiB7XG4gICAgICBvcmdVc2VyR3JvdXA6IHtcbiAgICAgICAgcGF0aHM6IFsnb3JnYW5pemF0aW9uL3VzZXItZ3JvdXBzJ10sXG4gICAgICB9LFxuICAgICAgb3JnVXNlckdyb3VwQ3JlYXRlOiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi91c2VyLWdyb3Vwcy9jcmVhdGUnXSxcbiAgICAgIH0sXG4gICAgICBvcmdVc2VyR3JvdXBEZXRhaWxzOiB7XG4gICAgICAgIHBhdGhzOiBbbGlzdFBhdGhdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VzZXJHcm91cEVkaXQ6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vZWRpdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VzZXJHcm91cFVzZXJzOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L3VzZXJzYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlckdyb3VwQXNzaWduVXNlcnM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vdXNlcnMvYXNzaWduYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlckdyb3VwUGVybWlzc2lvbnM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vcHVyY2hhc2UtbGltaXRzYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlckdyb3VwQXNzaWduUGVybWlzc2lvbnM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vcHVyY2hhc2UtbGltaXRzL2Fzc2lnbmBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==