/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgPurchaseLimit = {
    header: 'All purchase limits ({{count}})',
    name: 'Name',
    code: 'Code',
    active: 'Status',
    limit: 'Limit',
    orderApprovalPermissionType: 'Type',
    threshold: 'Threshold',
    periodRange: 'Period',
    currency: 'Currency',
    orgUnit: 'Parent Unit',
    unit: 'Parent Unit',
    actions: '',
    hint: 'Purchase limits help control spending by defining how much buyers can spend per order or per week, month, quarter, or year. Purchase limits are assigned to users or user groups. Purchase limits are also assigned to approvers, defining how much they are permitted to approve. You can assign purchase limits to many users at once with user groups.',
    details: {
        title: 'Purchase Limit Details',
        subtitle: 'Purchase Limit: {{ item.code }}',
    },
    edit: {
        title: 'Edit Purchase Limit',
        subtitle: 'Purchase limits : {{ item.code }}',
    },
    create: {
        title: 'Create Purchase Limit',
        subtitle: '',
    },
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnitName: 'Unit',
    },
    messages: {
        deactivateTitle: 'Disable this purchase limit?',
        deactivate: 'Disabled purchase limits can no longer be assigned to a user or user group. Current assignments will have no effect.',
        confirmEnabled: 'Purchase Limit {{ item.code }} enabled successfully',
        confirmDisabled: 'Purchase Limit {{ item.code }} disabled successfully',
        update: 'Purchase Limit {{ item.code }} updated successfully',
        create: 'Purchase Limit {{ item.code }} created successfully',
    },
    info: {
        disabledEdit: 'Enable the purchase limit to allow editing.',
        disabledEnable: 'Unit must be enabled before this purchase limit may be enabled.',
    },
    per: {
        DAY: 'per day',
        WEEK: 'per week',
        MONTH: 'per month',
        QUARTER: 'per quarter',
        YEAR: 'per year',
    },
    breadcrumbs: {
        list: 'All purchase limits',
        details: '{{code}}',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL3Blcm1pc3Npb24uaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDOUIsTUFBTSxFQUFFLGlDQUFpQztJQUV6QyxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLE9BQU87SUFDZCwyQkFBMkIsRUFBRSxNQUFNO0lBQ25DLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLElBQUksRUFBRSxhQUFhO0lBQ25CLE9BQU8sRUFBRSxFQUFFO0lBQ1gsSUFBSSxFQUFFLDJWQUEyVjtJQUVqVyxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsd0JBQXdCO1FBQy9CLFFBQVEsRUFBRSxpQ0FBaUM7S0FDNUM7SUFDRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFFBQVEsRUFBRSxtQ0FBbUM7S0FDOUM7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsTUFBTTtRQUNkLFVBQVUsRUFBRSxNQUFNO0tBQ25CO0lBRUQsUUFBUSxFQUFFO1FBQ1IsZUFBZSxFQUFFLDhCQUE4QjtRQUMvQyxVQUFVLEVBQ1Isc0hBQXNIO1FBQ3hILGNBQWMsRUFBRSxxREFBcUQ7UUFDckUsZUFBZSxFQUFFLHNEQUFzRDtRQUN2RSxNQUFNLEVBQUUscURBQXFEO1FBQzdELE1BQU0sRUFBRSxxREFBcUQ7S0FDOUQ7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZLEVBQUUsNkNBQTZDO1FBQzNELGNBQWMsRUFDWixpRUFBaUU7S0FDcEU7SUFFRCxHQUFHLEVBQUU7UUFDSCxHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBRUQsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixPQUFPLEVBQUUsVUFBVTtLQUNwQjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3Qgb3JnUHVyY2hhc2VMaW1pdCA9IHtcbiAgaGVhZGVyOiAnQWxsIHB1cmNoYXNlIGxpbWl0cyAoe3tjb3VudH19KScsXG5cbiAgbmFtZTogJ05hbWUnLFxuICBjb2RlOiAnQ29kZScsXG4gIGFjdGl2ZTogJ1N0YXR1cycsXG4gIGxpbWl0OiAnTGltaXQnLFxuICBvcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGU6ICdUeXBlJyxcbiAgdGhyZXNob2xkOiAnVGhyZXNob2xkJyxcbiAgcGVyaW9kUmFuZ2U6ICdQZXJpb2QnLFxuICBjdXJyZW5jeTogJ0N1cnJlbmN5JyxcbiAgb3JnVW5pdDogJ1BhcmVudCBVbml0JyxcbiAgdW5pdDogJ1BhcmVudCBVbml0JyxcbiAgYWN0aW9uczogJycsXG4gIGhpbnQ6ICdQdXJjaGFzZSBsaW1pdHMgaGVscCBjb250cm9sIHNwZW5kaW5nIGJ5IGRlZmluaW5nIGhvdyBtdWNoIGJ1eWVycyBjYW4gc3BlbmQgcGVyIG9yZGVyIG9yIHBlciB3ZWVrLCBtb250aCwgcXVhcnRlciwgb3IgeWVhci4gUHVyY2hhc2UgbGltaXRzIGFyZSBhc3NpZ25lZCB0byB1c2VycyBvciB1c2VyIGdyb3Vwcy4gUHVyY2hhc2UgbGltaXRzIGFyZSBhbHNvIGFzc2lnbmVkIHRvIGFwcHJvdmVycywgZGVmaW5pbmcgaG93IG11Y2ggdGhleSBhcmUgcGVybWl0dGVkIHRvIGFwcHJvdmUuIFlvdSBjYW4gYXNzaWduIHB1cmNoYXNlIGxpbWl0cyB0byBtYW55IHVzZXJzIGF0IG9uY2Ugd2l0aCB1c2VyIGdyb3Vwcy4nLFxuXG4gIGRldGFpbHM6IHtcbiAgICB0aXRsZTogJ1B1cmNoYXNlIExpbWl0IERldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnUHVyY2hhc2UgTGltaXQ6IHt7IGl0ZW0uY29kZSB9fScsXG4gIH0sXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgUHVyY2hhc2UgTGltaXQnLFxuICAgIHN1YnRpdGxlOiAnUHVyY2hhc2UgbGltaXRzIDoge3sgaXRlbS5jb2RlIH19JyxcbiAgfSxcbiAgY3JlYXRlOiB7XG4gICAgdGl0bGU6ICdDcmVhdGUgUHVyY2hhc2UgTGltaXQnLFxuICAgIHN1YnRpdGxlOiAnJyxcbiAgfSxcblxuICBzb3J0Qnk6ICdTb3J0IGJ5JyxcbiAgc29ydDoge1xuICAgIGJ5TmFtZTogJ05hbWUnLFxuICAgIGJ5VW5pdE5hbWU6ICdVbml0JyxcbiAgfSxcblxuICBtZXNzYWdlczoge1xuICAgIGRlYWN0aXZhdGVUaXRsZTogJ0Rpc2FibGUgdGhpcyBwdXJjaGFzZSBsaW1pdD8nLFxuICAgIGRlYWN0aXZhdGU6XG4gICAgICAnRGlzYWJsZWQgcHVyY2hhc2UgbGltaXRzIGNhbiBubyBsb25nZXIgYmUgYXNzaWduZWQgdG8gYSB1c2VyIG9yIHVzZXIgZ3JvdXAuIEN1cnJlbnQgYXNzaWdubWVudHMgd2lsbCBoYXZlIG5vIGVmZmVjdC4nLFxuICAgIGNvbmZpcm1FbmFibGVkOiAnUHVyY2hhc2UgTGltaXQge3sgaXRlbS5jb2RlIH19IGVuYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBjb25maXJtRGlzYWJsZWQ6ICdQdXJjaGFzZSBMaW1pdCB7eyBpdGVtLmNvZGUgfX0gZGlzYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGU6ICdQdXJjaGFzZSBMaW1pdCB7eyBpdGVtLmNvZGUgfX0gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNyZWF0ZTogJ1B1cmNoYXNlIExpbWl0IHt7IGl0ZW0uY29kZSB9fSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZEVkaXQ6ICdFbmFibGUgdGhlIHB1cmNoYXNlIGxpbWl0IHRvIGFsbG93IGVkaXRpbmcuJyxcbiAgICBkaXNhYmxlZEVuYWJsZTpcbiAgICAgICdVbml0IG11c3QgYmUgZW5hYmxlZCBiZWZvcmUgdGhpcyBwdXJjaGFzZSBsaW1pdCBtYXkgYmUgZW5hYmxlZC4nLFxuICB9LFxuXG4gIHBlcjoge1xuICAgIERBWTogJ3BlciBkYXknLFxuICAgIFdFRUs6ICdwZXIgd2VlaycsXG4gICAgTU9OVEg6ICdwZXIgbW9udGgnLFxuICAgIFFVQVJURVI6ICdwZXIgcXVhcnRlcicsXG4gICAgWUVBUjogJ3BlciB5ZWFyJyxcbiAgfSxcblxuICBicmVhZGNydW1iczoge1xuICAgIGxpc3Q6ICdBbGwgcHVyY2hhc2UgbGltaXRzJyxcbiAgICBkZXRhaWxzOiAne3tjb2RlfX0nLFxuICB9LFxufTtcbiJdfQ==