/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccCustomerTicketingConfig = {
    backend: {
        occ: {
            endpoints: {
                getTicket: 'users/${customerId}/tickets/${ticketId}',
                getTickets: 'users/${customerId}/tickets',
                createTicketEvent: 'users/${customerId}/tickets/${ticketId}/events',
                getTicketCategories: '/ticketCategories',
                getTicketAssociatedObjects: 'users/${customerId}/ticketAssociatedObjects',
                createTicket: 'users/${customerId}/tickets',
                uploadAttachment: '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments',
                downloadAttachment: '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments/${attachmentId}',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY3VzdG9tZXItdGlja2V0aW5nLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvb2NjL2NvbmZpZy9kZWZhdWx0LW9jYy1jdXN0b21lci10aWNrZXRpbmctY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBYztJQUMxRCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFLHlDQUF5QztnQkFDcEQsVUFBVSxFQUFFLDZCQUE2QjtnQkFDekMsaUJBQWlCLEVBQUUsZ0RBQWdEO2dCQUNuRSxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQ3hDLDBCQUEwQixFQUN4Qiw2Q0FBNkM7Z0JBQy9DLFlBQVksRUFBRSw2QkFBNkI7Z0JBQzNDLGdCQUFnQixFQUNkLDBFQUEwRTtnQkFDNUUsa0JBQWtCLEVBQ2hCLDBGQUEwRjthQUM3RjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NDdXN0b21lclRpY2tldGluZ0NvbmZpZzogT2NjQ29uZmlnID0ge1xuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgZ2V0VGlja2V0OiAndXNlcnMvJHtjdXN0b21lcklkfS90aWNrZXRzLyR7dGlja2V0SWR9JyxcbiAgICAgICAgZ2V0VGlja2V0czogJ3VzZXJzLyR7Y3VzdG9tZXJJZH0vdGlja2V0cycsXG4gICAgICAgIGNyZWF0ZVRpY2tldEV2ZW50OiAndXNlcnMvJHtjdXN0b21lcklkfS90aWNrZXRzLyR7dGlja2V0SWR9L2V2ZW50cycsXG4gICAgICAgIGdldFRpY2tldENhdGVnb3JpZXM6ICcvdGlja2V0Q2F0ZWdvcmllcycsXG4gICAgICAgIGdldFRpY2tldEFzc29jaWF0ZWRPYmplY3RzOlxuICAgICAgICAgICd1c2Vycy8ke2N1c3RvbWVySWR9L3RpY2tldEFzc29jaWF0ZWRPYmplY3RzJyxcbiAgICAgICAgY3JlYXRlVGlja2V0OiAndXNlcnMvJHtjdXN0b21lcklkfS90aWNrZXRzJyxcbiAgICAgICAgdXBsb2FkQXR0YWNobWVudDpcbiAgICAgICAgICAnL3VzZXJzLyR7Y3VzdG9tZXJJZH0vdGlja2V0cy8ke3RpY2tldElkfS9ldmVudHMvJHtldmVudENvZGV9L2F0dGFjaG1lbnRzJyxcbiAgICAgICAgZG93bmxvYWRBdHRhY2htZW50OlxuICAgICAgICAgICcvdXNlcnMvJHtjdXN0b21lcklkfS90aWNrZXRzLyR7dGlja2V0SWR9L2V2ZW50cy8ke2V2ZW50Q29kZX0vYXR0YWNobWVudHMvJHthdHRhY2htZW50SWR9JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=