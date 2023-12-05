/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping = {
    unitCode: 'uid',
    addressId: 'id',
    userCode: 'customerId',
};
export const defaultUnitsRoutingConfig = {
    routing: {
        routes: {
            orgUnits: {
                paths: ['organization/units'],
            },
            orgUnitCreate: {
                paths: ['organization/units/create'],
            },
            orgUnitDetails: {
                paths: [listPath],
                paramsMapping,
            },
            orgUnitEdit: {
                paths: [`${listPath}/edit`],
                paramsMapping,
            },
            orgUnitChildren: {
                paths: [`${listPath}/children`],
                paramsMapping,
            },
            orgUnitCreateChild: {
                paths: [`${listPath}/children/create`],
                paramsMapping,
            },
            orgUnitUserList: {
                paths: [`${listPath}/users`],
                paramsMapping,
            },
            orgUnitCreateUser: {
                paths: [`${listPath}/users/create`],
                paramsMapping,
            },
            orgUnitUserRoles: {
                paths: [`${listPath}/users/:userCode/roles`],
                paramsMapping,
            },
            orgUnitApprovers: {
                paths: [`${listPath}/approvers`],
                paramsMapping,
            },
            orgUnitAssignApprovers: {
                paths: [`${listPath}/approvers/assign`],
                paramsMapping,
            },
            orgUnitAddressList: {
                paths: [`${listPath}/addresses`],
                paramsMapping,
            },
            orgUnitAddressCreate: {
                paths: [`${listPath}/addresses/create`],
                paramsMapping,
            },
            orgUnitAddressDetails: {
                paths: [`${listPath}/addresses/:addressId`],
                paramsMapping,
            },
            orgUnitAddressEdit: {
                paths: [`${listPath}/addresses/:addressId/edit`],
                paramsMapping,
            },
            orgUnitCostCenters: {
                paths: [`${listPath}/cost-centers`],
                paramsMapping,
            },
            orgUnitCreateCostCenter: {
                paths: [`${listPath}/cost-centers/create`],
                paramsMapping,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC11bml0cy1yb3V0aW5nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdC9jb25maWcvZGVmYXVsdC11bml0cy1yb3V0aW5nLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sUUFBUSxHQUFHLHVCQUF1QixZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEUsTUFBTSxhQUFhLEdBQWtCO0lBQ25DLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLElBQUk7SUFDZixRQUFRLEVBQUUsWUFBWTtDQUN2QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQWtCO0lBQ3RELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QjtZQUNELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUNyQztZQUNELGNBQWMsRUFBRTtnQkFDZCxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLGFBQWE7YUFDZDtZQUNELFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsT0FBTyxDQUFDO2dCQUMzQixhQUFhO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLFdBQVcsQ0FBQztnQkFDL0IsYUFBYTthQUNkO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxrQkFBa0IsQ0FBQztnQkFDdEMsYUFBYTthQUNkO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxRQUFRLENBQUM7Z0JBQzVCLGFBQWE7YUFDZDtZQUNELGlCQUFpQixFQUFFO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsZUFBZSxDQUFDO2dCQUNuQyxhQUFhO2FBQ2Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLHdCQUF3QixDQUFDO2dCQUM1QyxhQUFhO2FBQ2Q7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLFlBQVksQ0FBQztnQkFDaEMsYUFBYTthQUNkO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3RCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxtQkFBbUIsQ0FBQztnQkFDdkMsYUFBYTthQUNkO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxZQUFZLENBQUM7Z0JBQ2hDLGFBQWE7YUFDZDtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsbUJBQW1CLENBQUM7Z0JBQ3ZDLGFBQWE7YUFDZDtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsdUJBQXVCLENBQUM7Z0JBQzNDLGFBQWE7YUFDZDtZQUNELGtCQUFrQixFQUFFO2dCQUNsQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsNEJBQTRCLENBQUM7Z0JBQ2hELGFBQWE7YUFDZDtZQUNELGtCQUFrQixFQUFFO2dCQUNsQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsZUFBZSxDQUFDO2dCQUNuQyxhQUFhO2FBQ2Q7WUFDRCx1QkFBdUIsRUFBRTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLHNCQUFzQixDQUFDO2dCQUMxQyxhQUFhO2FBQ2Q7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBhcmFtc01hcHBpbmcsIFJvdXRpbmdDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnLi4vcm91dGUtcGFyYW1zJztcblxuY29uc3QgbGlzdFBhdGggPSBgb3JnYW5pemF0aW9uL3VuaXRzLzoke1JPVVRFX1BBUkFNUy51bml0Q29kZX1gO1xuY29uc3QgcGFyYW1zTWFwcGluZzogUGFyYW1zTWFwcGluZyA9IHtcbiAgdW5pdENvZGU6ICd1aWQnLFxuICBhZGRyZXNzSWQ6ICdpZCcsXG4gIHVzZXJDb2RlOiAnY3VzdG9tZXJJZCcsXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFVuaXRzUm91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZyA9IHtcbiAgcm91dGluZzoge1xuICAgIHJvdXRlczoge1xuICAgICAgb3JnVW5pdHM6IHtcbiAgICAgICAgcGF0aHM6IFsnb3JnYW5pemF0aW9uL3VuaXRzJ10sXG4gICAgICB9LFxuICAgICAgb3JnVW5pdENyZWF0ZToge1xuICAgICAgICBwYXRoczogWydvcmdhbml6YXRpb24vdW5pdHMvY3JlYXRlJ10sXG4gICAgICB9LFxuICAgICAgb3JnVW5pdERldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFtsaXN0UGF0aF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVW5pdEVkaXQ6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vZWRpdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VuaXRDaGlsZHJlbjoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9jaGlsZHJlbmBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VuaXRDcmVhdGVDaGlsZDoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9jaGlsZHJlbi9jcmVhdGVgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0VXNlckxpc3Q6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vdXNlcnNgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0Q3JlYXRlVXNlcjoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS91c2Vycy9jcmVhdGVgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0VXNlclJvbGVzOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L3VzZXJzLzp1c2VyQ29kZS9yb2xlc2BdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VuaXRBcHByb3ZlcnM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vYXBwcm92ZXJzYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVW5pdEFzc2lnbkFwcHJvdmVyczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9hcHByb3ZlcnMvYXNzaWduYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnVW5pdEFkZHJlc3NMaXN0OiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L2FkZHJlc3Nlc2BdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VuaXRBZGRyZXNzQ3JlYXRlOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L2FkZHJlc3Nlcy9jcmVhdGVgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0QWRkcmVzc0RldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vYWRkcmVzc2VzLzphZGRyZXNzSWRgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0QWRkcmVzc0VkaXQ6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vYWRkcmVzc2VzLzphZGRyZXNzSWQvZWRpdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ1VuaXRDb3N0Q2VudGVyczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9jb3N0LWNlbnRlcnNgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdVbml0Q3JlYXRlQ29zdENlbnRlcjoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9jb3N0LWNlbnRlcnMvY3JlYXRlYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19