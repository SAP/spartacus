/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/budgets/:${ROUTE_PARAMS.budgetCode}`;
const paramsMapping = {
    budgetCode: 'code',
};
export const defaultBudgetRoutingConfig = {
    routing: {
        routes: {
            orgBudget: {
                paths: ['organization/budgets'],
            },
            orgBudgetCreate: {
                paths: ['organization/budgets/create'],
            },
            orgBudgetDetails: {
                paths: [`${listPath}`],
                paramsMapping,
            },
            orgBudgetCostCenters: {
                paths: [`${listPath}/cost-centers`],
                paramsMapping,
            },
            orgBudgetEdit: {
                paths: [`${listPath}/edit`],
                paramsMapping,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1idWRnZXQtcm91dGluZy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL3Jvb3QvY29uZmlnL2RlZmF1bHQtYnVkZ2V0LXJvdXRpbmcuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsTUFBTSxRQUFRLEdBQUcseUJBQXlCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwRSxNQUFNLGFBQWEsR0FBa0I7SUFDbkMsVUFBVSxFQUFFLE1BQU07Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFrQjtJQUN2RCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDaEM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDdkM7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsYUFBYTthQUNkO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxlQUFlLENBQUM7Z0JBQ25DLGFBQWE7YUFDZDtZQUNELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsT0FBTyxDQUFDO2dCQUMzQixhQUFhO2FBQ2Q7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBhcmFtc01hcHBpbmcsIFJvdXRpbmdDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnLi4vcm91dGUtcGFyYW1zJztcblxuY29uc3QgbGlzdFBhdGggPSBgb3JnYW5pemF0aW9uL2J1ZGdldHMvOiR7Uk9VVEVfUEFSQU1TLmJ1ZGdldENvZGV9YDtcbmNvbnN0IHBhcmFtc01hcHBpbmc6IFBhcmFtc01hcHBpbmcgPSB7XG4gIGJ1ZGdldENvZGU6ICdjb2RlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0QnVkZ2V0Um91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZyA9IHtcbiAgcm91dGluZzoge1xuICAgIHJvdXRlczoge1xuICAgICAgb3JnQnVkZ2V0OiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi9idWRnZXRzJ10sXG4gICAgICB9LFxuICAgICAgb3JnQnVkZ2V0Q3JlYXRlOiB7XG4gICAgICAgIHBhdGhzOiBbJ29yZ2FuaXphdGlvbi9idWRnZXRzL2NyZWF0ZSddLFxuICAgICAgfSxcbiAgICAgIG9yZ0J1ZGdldERldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH1gXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdCdWRnZXRDb3N0Q2VudGVyczoge1xuICAgICAgICBwYXRoczogW2Ake2xpc3RQYXRofS9jb3N0LWNlbnRlcnNgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgICBvcmdCdWRnZXRFZGl0OiB7XG4gICAgICAgIHBhdGhzOiBbYCR7bGlzdFBhdGh9L2VkaXRgXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=