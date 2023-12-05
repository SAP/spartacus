/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/cost-centers/:${ROUTE_PARAMS.costCenterCode}`;
const paramsMapping = {
    costCenterCode: 'code',
};
export const defaultCostCenterRoutingConfig = {
    routing: {
        routes: {
            orgCostCenter: {
                paths: ['organization/cost-centers'],
            },
            orgCostCenterCreate: {
                paths: ['organization/cost-centers/create'],
            },
            orgCostCenterDetails: {
                paths: [`${listPath}`],
                paramsMapping,
            },
            orgCostCenterBudgets: {
                paths: [`${listPath}/budgets`],
                paramsMapping,
            },
            orgCostCenterAssignBudgets: {
                paths: [`${listPath}/budgets/assign`],
                paramsMapping,
            },
            orgCostCenterEdit: {
                paths: [`${listPath}/edit`],
                paramsMapping,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb3N0LWNlbnRlci1yb3V0aW5nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdC9jb25maWcvZGVmYXVsdC1jb3N0LWNlbnRlci1yb3V0aW5nLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sUUFBUSxHQUFHLDhCQUE4QixZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDN0UsTUFBTSxhQUFhLEdBQWtCO0lBQ25DLGNBQWMsRUFBRSxNQUFNO0NBQ3ZCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBa0I7SUFDM0QsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ04sYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQ3JDO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2FBQzVDO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLGFBQWE7YUFDZDtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsVUFBVSxDQUFDO2dCQUM5QixhQUFhO2FBQ2Q7WUFDRCwwQkFBMEIsRUFBRTtnQkFDMUIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLGlCQUFpQixDQUFDO2dCQUNyQyxhQUFhO2FBQ2Q7WUFDRCxpQkFBaUIsRUFBRTtnQkFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLE9BQU8sQ0FBQztnQkFDM0IsYUFBYTthQUNkO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQYXJhbXNNYXBwaW5nLCBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJPVVRFX1BBUkFNUyB9IGZyb20gJy4uL3JvdXRlLXBhcmFtcyc7XG5cbmNvbnN0IGxpc3RQYXRoID0gYG9yZ2FuaXphdGlvbi9jb3N0LWNlbnRlcnMvOiR7Uk9VVEVfUEFSQU1TLmNvc3RDZW50ZXJDb2RlfWA7XG5jb25zdCBwYXJhbXNNYXBwaW5nOiBQYXJhbXNNYXBwaW5nID0ge1xuICBjb3N0Q2VudGVyQ29kZTogJ2NvZGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb3N0Q2VudGVyUm91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZyA9IHtcbiAgcm91dGluZzoge1xuICAgIHJvdXRlczoge1xuICAgICAgb3JnQ29zdENlbnRlcjoge1xuICAgICAgICBwYXRoczogWydvcmdhbml6YXRpb24vY29zdC1jZW50ZXJzJ10sXG4gICAgICB9LFxuICAgICAgb3JnQ29zdENlbnRlckNyZWF0ZToge1xuICAgICAgICBwYXRoczogWydvcmdhbml6YXRpb24vY29zdC1jZW50ZXJzL2NyZWF0ZSddLFxuICAgICAgfSxcbiAgICAgIG9yZ0Nvc3RDZW50ZXJEZXRhaWxzOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9YF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnQ29zdENlbnRlckJ1ZGdldHM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vYnVkZ2V0c2BdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICAgIG9yZ0Nvc3RDZW50ZXJBc3NpZ25CdWRnZXRzOiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L2J1ZGdldHMvYXNzaWduYF0sXG4gICAgICAgIHBhcmFtc01hcHBpbmcsXG4gICAgICB9LFxuICAgICAgb3JnQ29zdENlbnRlckVkaXQ6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vZWRpdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==