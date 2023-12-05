/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultCustomerTicketingRoutingConfig = {
    routing: {
        routes: {
            supportTickets: {
                paths: ['my-account/support-tickets'],
            },
            supportTicketDetails: {
                paths: ['my-account/support-ticket/:ticketCode'],
                paramsMapping: { ticketCode: 'ticketCode' },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jdXN0b21lci10aWNrZXRpbmctcm91dGluZy1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL3Jvb3QvY29uZmlnL2RlZmF1bHQtY3VzdG9tZXItdGlja2V0aW5nLXJvdXRpbmctY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBa0I7SUFDbEUsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ04sY0FBYyxFQUFFO2dCQUNkLEtBQUssRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQ3RDO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFDLHVDQUF1QyxDQUFDO2dCQUNoRCxhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFO2FBQzVDO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDdXN0b21lclRpY2tldGluZ1JvdXRpbmdDb25maWc6IFJvdXRpbmdDb25maWcgPSB7XG4gIHJvdXRpbmc6IHtcbiAgICByb3V0ZXM6IHtcbiAgICAgIHN1cHBvcnRUaWNrZXRzOiB7XG4gICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvc3VwcG9ydC10aWNrZXRzJ10sXG4gICAgICB9LFxuICAgICAgc3VwcG9ydFRpY2tldERldGFpbHM6IHtcbiAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9zdXBwb3J0LXRpY2tldC86dGlja2V0Q29kZSddLFxuICAgICAgICBwYXJhbXNNYXBwaW5nOiB7IHRpY2tldENvZGU6ICd0aWNrZXRDb2RlJyB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==