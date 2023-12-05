/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath = `organization/account-summary`;
export const defaultAccountSummaryRoutingConfig = {
    routing: {
        routes: {
            orgAccountSummary: {
                paths: [`${listPath}`],
            },
            orgAccountSummaryDetails: {
                paths: [`${listPath}/details/:orgUnit`],
                paramsMapping: { orgUnit: 'uid' },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1hY2NvdW50LXN1bW1hcnktcm91dGluZy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9yb290L2NvbmZpZy9kZWZhdWx0LWFjY291bnQtc3VtbWFyeS1yb3V0aW5nLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxRQUFRLEdBQUcsOEJBQThCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sa0NBQWtDLEdBQWtCO0lBQy9ELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNOLGlCQUFpQixFQUFFO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxtQkFBbUIsQ0FBQztnQkFDdkMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTthQUNsQztTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUm91dGluZ0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmNvbnN0IGxpc3RQYXRoID0gYG9yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnlgO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEFjY291bnRTdW1tYXJ5Um91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZyA9IHtcbiAgcm91dGluZzoge1xuICAgIHJvdXRlczoge1xuICAgICAgb3JnQWNjb3VudFN1bW1hcnk6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH1gXSxcbiAgICAgIH0sXG4gICAgICBvcmdBY2NvdW50U3VtbWFyeURldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFtgJHtsaXN0UGF0aH0vZGV0YWlscy86b3JnVW5pdGBdLFxuICAgICAgICBwYXJhbXNNYXBwaW5nOiB7IG9yZ1VuaXQ6ICd1aWQnIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19