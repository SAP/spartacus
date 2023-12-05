/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgCostCenter = {
    header: 'All cost centers ({{count}})',
    code: 'Code',
    active: 'Status',
    name: 'Name',
    currency: 'Currency',
    unit: 'Parent Unit',
    actions: '',
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnitName: 'Unit',
        byCode: 'Code',
    },
    hint: "All orders placed through your organization's purchase account are linked to a cost center for tracking purposes. Each unit can have multiple cost centers. To limit spending, budgets are assigned to cost centers. A buyer selects a cost center when checking out.",
    disable: {
        confirm: 'Disable',
    },
    messages: {
        deactivateTitle: 'Disable this cost center?',
        deactivate: 'Disabled cost centers cannot be used for placing new orders. Ensure that your unit has at least one cost center. Existing orders are not affected.',
        confirmEnabled: 'Cost Center {{ item.name }} enabled successfully',
        confirmDisabled: 'Cost Center {{ item.name }} disabled successfully',
        update: 'Cost Center {{ item.name }} updated successfully',
        create: 'Cost Center {{ item.name }} created successfully',
    },
    info: {
        disabledEdit: 'Enable the cost center to allow editing.',
        disabledEnable: 'Unit must be enabled before this cost center may be enabled.',
    },
    details: {
        title: 'Cost Center Details',
        subtitle: 'Cost Center: {{ item.name }}',
    },
    edit: {
        title: 'Edit Cost Center',
        subtitle: 'Cost Center: {{ item.name }}',
    },
    create: {
        title: 'Create Cost Center',
        subtitle: '',
    },
    budget: {
        link: 'Budgets',
    },
    breadcrumbs: {
        list: 'All cost centers',
        details: '{{name}}',
        budgets: 'Budgets',
    },
};
export const orgCostCenterAssignedBudgets = {
    title: 'Assigned budgets',
    subtitle: 'Cost Center: {{ item.name }}',
    assigned: 'Budget {{ item.name }} assigned successfully',
    unassigned: 'Budget {{ item.name }} unassigned successfully',
};
export const orgCostCenterBudgets = {
    title: 'Manage budgets',
    subtitle: 'Cost Center: {{ item.name }}',
    assigned: 'Budget {{ item.name }} assigned successfully',
    unassigned: 'Budget {{ item.name }} unassigned successfully',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXIuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi9jb3N0LWNlbnRlci5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDM0IsTUFBTSxFQUFFLDhCQUE4QjtJQUV0QyxJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxNQUFNO0lBQ1osUUFBUSxFQUFFLFVBQVU7SUFDcEIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsT0FBTyxFQUFFLEVBQUU7SUFFWCxNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsTUFBTTtRQUNkLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLE1BQU0sRUFBRSxNQUFNO0tBQ2Y7SUFFRCxJQUFJLEVBQUUsdVFBQXVRO0lBQzdRLE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBRUQsUUFBUSxFQUFFO1FBQ1IsZUFBZSxFQUFFLDJCQUEyQjtRQUM1QyxVQUFVLEVBQ1Isb0pBQW9KO1FBQ3RKLGNBQWMsRUFBRSxrREFBa0Q7UUFDbEUsZUFBZSxFQUFFLG1EQUFtRDtRQUNwRSxNQUFNLEVBQUUsa0RBQWtEO1FBQzFELE1BQU0sRUFBRSxrREFBa0Q7S0FDM0Q7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZLEVBQUUsMENBQTBDO1FBQ3hELGNBQWMsRUFDWiw4REFBOEQ7S0FDakU7SUFFRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFFBQVEsRUFBRSw4QkFBOEI7S0FDekM7SUFFRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCLFFBQVEsRUFBRSw4QkFBOEI7S0FDekM7SUFFRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsb0JBQW9CO1FBQzNCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUVELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUc7SUFDMUMsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixRQUFRLEVBQUUsOEJBQThCO0lBQ3hDLFFBQVEsRUFBRSw4Q0FBOEM7SUFDeEQsVUFBVSxFQUFFLGdEQUFnRDtDQUM3RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUc7SUFDbEMsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixRQUFRLEVBQUUsOEJBQThCO0lBQ3hDLFFBQVEsRUFBRSw4Q0FBOEM7SUFDeEQsVUFBVSxFQUFFLGdEQUFnRDtDQUM3RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ0Nvc3RDZW50ZXIgPSB7XG4gIGhlYWRlcjogJ0FsbCBjb3N0IGNlbnRlcnMgKHt7Y291bnR9fSknLFxuXG4gIGNvZGU6ICdDb2RlJyxcbiAgYWN0aXZlOiAnU3RhdHVzJyxcbiAgbmFtZTogJ05hbWUnLFxuICBjdXJyZW5jeTogJ0N1cnJlbmN5JyxcbiAgdW5pdDogJ1BhcmVudCBVbml0JyxcbiAgYWN0aW9uczogJycsXG5cbiAgc29ydEJ5OiAnU29ydCBieScsXG4gIHNvcnQ6IHtcbiAgICBieU5hbWU6ICdOYW1lJyxcbiAgICBieVVuaXROYW1lOiAnVW5pdCcsXG4gICAgYnlDb2RlOiAnQ29kZScsXG4gIH0sXG5cbiAgaGludDogXCJBbGwgb3JkZXJzIHBsYWNlZCB0aHJvdWdoIHlvdXIgb3JnYW5pemF0aW9uJ3MgcHVyY2hhc2UgYWNjb3VudCBhcmUgbGlua2VkIHRvIGEgY29zdCBjZW50ZXIgZm9yIHRyYWNraW5nIHB1cnBvc2VzLiBFYWNoIHVuaXQgY2FuIGhhdmUgbXVsdGlwbGUgY29zdCBjZW50ZXJzLiBUbyBsaW1pdCBzcGVuZGluZywgYnVkZ2V0cyBhcmUgYXNzaWduZWQgdG8gY29zdCBjZW50ZXJzLiBBIGJ1eWVyIHNlbGVjdHMgYSBjb3N0IGNlbnRlciB3aGVuIGNoZWNraW5nIG91dC5cIixcbiAgZGlzYWJsZToge1xuICAgIGNvbmZpcm06ICdEaXNhYmxlJyxcbiAgfSxcblxuICBtZXNzYWdlczoge1xuICAgIGRlYWN0aXZhdGVUaXRsZTogJ0Rpc2FibGUgdGhpcyBjb3N0IGNlbnRlcj8nLFxuICAgIGRlYWN0aXZhdGU6XG4gICAgICAnRGlzYWJsZWQgY29zdCBjZW50ZXJzIGNhbm5vdCBiZSB1c2VkIGZvciBwbGFjaW5nIG5ldyBvcmRlcnMuIEVuc3VyZSB0aGF0IHlvdXIgdW5pdCBoYXMgYXQgbGVhc3Qgb25lIGNvc3QgY2VudGVyLiBFeGlzdGluZyBvcmRlcnMgYXJlIG5vdCBhZmZlY3RlZC4nLFxuICAgIGNvbmZpcm1FbmFibGVkOiAnQ29zdCBDZW50ZXIge3sgaXRlbS5uYW1lIH19IGVuYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBjb25maXJtRGlzYWJsZWQ6ICdDb3N0IENlbnRlciB7eyBpdGVtLm5hbWUgfX0gZGlzYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGU6ICdDb3N0IENlbnRlciB7eyBpdGVtLm5hbWUgfX0gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNyZWF0ZTogJ0Nvc3QgQ2VudGVyIHt7IGl0ZW0ubmFtZSB9fSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZEVkaXQ6ICdFbmFibGUgdGhlIGNvc3QgY2VudGVyIHRvIGFsbG93IGVkaXRpbmcuJyxcbiAgICBkaXNhYmxlZEVuYWJsZTpcbiAgICAgICdVbml0IG11c3QgYmUgZW5hYmxlZCBiZWZvcmUgdGhpcyBjb3N0IGNlbnRlciBtYXkgYmUgZW5hYmxlZC4nLFxuICB9LFxuXG4gIGRldGFpbHM6IHtcbiAgICB0aXRsZTogJ0Nvc3QgQ2VudGVyIERldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnQ29zdCBDZW50ZXI6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIH0sXG5cbiAgZWRpdDoge1xuICAgIHRpdGxlOiAnRWRpdCBDb3N0IENlbnRlcicsXG4gICAgc3VidGl0bGU6ICdDb3N0IENlbnRlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgfSxcblxuICBjcmVhdGU6IHtcbiAgICB0aXRsZTogJ0NyZWF0ZSBDb3N0IENlbnRlcicsXG4gICAgc3VidGl0bGU6ICcnLFxuICB9LFxuXG4gIGJ1ZGdldDoge1xuICAgIGxpbms6ICdCdWRnZXRzJyxcbiAgfSxcblxuICBicmVhZGNydW1iczoge1xuICAgIGxpc3Q6ICdBbGwgY29zdCBjZW50ZXJzJyxcbiAgICBkZXRhaWxzOiAne3tuYW1lfX0nLFxuICAgIGJ1ZGdldHM6ICdCdWRnZXRzJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdDb3N0Q2VudGVyQXNzaWduZWRCdWRnZXRzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIGJ1ZGdldHMnLFxuICBzdWJ0aXRsZTogJ0Nvc3QgQ2VudGVyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ0J1ZGdldCB7eyBpdGVtLm5hbWUgfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ0J1ZGdldCB7eyBpdGVtLm5hbWUgfX0gdW5hc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ0Nvc3RDZW50ZXJCdWRnZXRzID0ge1xuICB0aXRsZTogJ01hbmFnZSBidWRnZXRzJyxcbiAgc3VidGl0bGU6ICdDb3N0IENlbnRlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgYXNzaWduZWQ6ICdCdWRnZXQge3sgaXRlbS5uYW1lIH19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdCdWRnZXQge3sgaXRlbS5uYW1lIH19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG4iXX0=