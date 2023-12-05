/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/purchase-limits/:${ROUTE_PARAMS.permissionCode}`;
const paramsMapping = {
    permissionCode: 'code',
};
export const defaultPermissionRoutingConfig = {
    routing: {
        routes: {
            orgPurchaseLimit: {
                paths: ['organization/purchase-limits'],
            },
            orgPurchaseLimitCreate: {
                paths: ['organization/purchase-limits/create'],
            },
            orgPurchaseLimitDetails: {
                paths: [listPath],
                paramsMapping,
            },
            orgPurchaseLimitEdit: {
                paths: [`${listPath}/edit`],
                paramsMapping,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wZXJtaXNzaW9uLXJvdXRpbmcuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290L2NvbmZpZy9kZWZhdWx0LXBlcm1pc3Npb24tcm91dGluZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLFFBQVEsR0FBRyxpQ0FBaUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ2hGLE1BQU0sYUFBYSxHQUFrQjtJQUNuQyxjQUFjLEVBQUUsTUFBTTtDQUN2QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWtCO0lBQzNELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLGdCQUFnQixFQUFFO2dCQUNoQixLQUFLLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQzthQUN4QztZQUNELHNCQUFzQixFQUFFO2dCQUN0QixLQUFLLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQzthQUMvQztZQUNELHVCQUF1QixFQUFFO2dCQUN2QixLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLGFBQWE7YUFDZDtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsT0FBTyxDQUFDO2dCQUMzQixhQUFhO2FBQ2Q7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBhcmFtc01hcHBpbmcsIFJvdXRpbmdDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnLi4vcm91dGUtcGFyYW1zJztcblxuY29uc3QgbGlzdFBhdGggPSBgb3JnYW5pemF0aW9uL3B1cmNoYXNlLWxpbWl0cy86JHtST1VURV9QQVJBTVMucGVybWlzc2lvbkNvZGV9YDtcbmNvbnN0IHBhcmFtc01hcHBpbmc6IFBhcmFtc01hcHBpbmcgPSB7XG4gIHBlcm1pc3Npb25Db2RlOiAnY29kZScsXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFBlcm1pc3Npb25Sb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiB7XG4gICAgICBvcmdQdXJjaGFzZUxpbWl0OiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi9wdXJjaGFzZS1saW1pdHMnXSxcbiAgICAgIH0sXG4gICAgICBvcmdQdXJjaGFzZUxpbWl0Q3JlYXRlOiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi9wdXJjaGFzZS1saW1pdHMvY3JlYXRlJ10sXG4gICAgICB9LFxuICAgICAgb3JnUHVyY2hhc2VMaW1pdERldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFtsaXN0UGF0aF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnUHVyY2hhc2VMaW1pdEVkaXQ6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vZWRpdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==