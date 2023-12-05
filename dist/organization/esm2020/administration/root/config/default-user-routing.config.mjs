/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/users/:${ROUTE_PARAMS.userCode}`;
const paramsMapping = {
    userCode: 'customerId',
};
export const defaultUserRoutingConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC11c2VyLXJvdXRpbmcuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290L2NvbmZpZy9kZWZhdWx0LXVzZXItcm91dGluZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLFFBQVEsR0FBRyx1QkFBdUIsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2hFLE1BQU0sYUFBYSxHQUFrQjtJQUNuQyxRQUFRLEVBQUUsWUFBWTtDQUN2QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQWtCO0lBQ3JELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QjtZQUNELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUNyQztZQUNELGNBQWMsRUFBRTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLGFBQWE7YUFDZDtZQUNELFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsT0FBTyxDQUFDO2dCQUMzQixhQUFhO2FBQ2Q7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLGtCQUFrQixDQUFDO2dCQUN0QyxhQUFhO2FBQ2Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLFlBQVksQ0FBQztnQkFDaEMsYUFBYTthQUNkO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3RCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxtQkFBbUIsQ0FBQztnQkFDdkMsYUFBYTthQUNkO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxrQkFBa0IsQ0FBQztnQkFDdEMsYUFBYTthQUNkO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSx5QkFBeUIsQ0FBQztnQkFDN0MsYUFBYTthQUNkO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxjQUFjLENBQUM7Z0JBQ2xDLGFBQWE7YUFDZDtZQUNELHVCQUF1QixFQUFFO2dCQUN2QixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEscUJBQXFCLENBQUM7Z0JBQ3pDLGFBQWE7YUFDZDtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUGFyYW1zTWFwcGluZywgUm91dGluZ0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICcuLi9yb3V0ZS1wYXJhbXMnO1xuXG5jb25zdCBsaXN0UGF0aCA9IGBvcmdhbml6YXRpb24vdXNlcnMvOiR7Uk9VVEVfUEFSQU1TLnVzZXJDb2RlfWA7XG5jb25zdCBwYXJhbXNNYXBwaW5nOiBQYXJhbXNNYXBwaW5nID0ge1xuICB1c2VyQ29kZTogJ2N1c3RvbWVySWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyUm91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZyA9IHtcbiAgcm91dGluZzoge1xuICAgIHJvdXRlczoge1xuICAgICAgb3JnVXNlcjoge1xuICAgICAgICBwYXRoczogWydvcmdhbml6YXRpb24vdXNlcnMnXSxcbiAgICAgIH0sXG4gICAgICBvcmdVc2VyQ3JlYXRlOiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi91c2Vycy9jcmVhdGUnXSxcbiAgICAgIH0sXG4gICAgICBvcmdVc2VyRGV0YWlsczoge1xuICAgICAgICBwYXRoczogW2xpc3RQYXRoXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVc2VyRWRpdDoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9lZGl0YF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlckNoYW5nZVBhc3N3b3JkOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L2NoYW5nZS1wYXNzd29yZGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VzZXJBcHByb3ZlcnM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vYXBwcm92ZXJzYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlckFzc2lnbkFwcHJvdmVyczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9hcHByb3ZlcnMvYXNzaWduYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlclBlcm1pc3Npb25zOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L3B1cmNoYXNlLWxpbWl0c2BdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VzZXJBc3NpZ25QZXJtaXNzaW9uczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9wdXJjaGFzZS1saW1pdHMvYXNzaWduYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVXNlclVzZXJHcm91cHM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vdXNlci1ncm91cHNgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVc2VyQXNzaWduVXNlckdyb3Vwczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS91c2VyLWdyb3Vwcy9hc3NpZ25gXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=