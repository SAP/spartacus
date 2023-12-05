/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgBudget = {
    header: 'All budgets ({{count}})',
    code: 'Code',
    name: 'Name',
    active: 'Status',
    currency: 'Currency',
    amount: 'Amount',
    unit: 'Unit',
    businessUnits: 'Unit',
    dateRange: 'Start - End',
    startDate: 'Start',
    endDate: 'End',
    actions: '',
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnitName: 'Unit',
        byCode: 'Code',
        byValue: 'Value',
    },
    hint: 'Budgets set overall purchase limits and are assigned to cost centers. A buyer selects a cost center when checking out.',
    details: {
        title: 'Budget Details',
        subtitle: 'Budget: {{ item.name }}',
    },
    edit: {
        title: 'Edit Budget',
        subtitle: 'Budget: {{ item.name }}',
    },
    create: {
        title: 'Create Budget',
        subtitle: '',
    },
    messages: {
        deactivateTitle: 'Disable this budget?',
        deactivate: 'Disabled budgets no longer apply to the cost centers they are assigned to. Ensure that the associated cost center has at least one budget.',
        confirmEnabled: 'Budget {{ item.name }} enabled successfully',
        confirmDisabled: 'Budget {{ item.name }} disabled successfully',
        update: 'Budget {{ item.name }} updated successfully',
        create: 'Budget {{ item.name }} created successfully',
    },
    info: {
        disabledEdit: 'Enable the budget to allow editing.',
        disabledEnable: 'Unit must be enabled before this budget may be enabled.',
    },
    links: {
        costCenters: 'Cost Centers',
    },
    breadcrumbs: {
        list: 'All budgets',
        details: '{{name}}',
    },
};
export const orgBudgetAssignedCostCenters = {
    title: 'Cost centers',
    subtitle: 'Budget: {{ item.name }}',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmkxOG4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2Fzc2V0cy90cmFuc2xhdGlvbnMvZW4vYnVkZ2V0LmkxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRztJQUN2QixNQUFNLEVBQUUseUJBQXlCO0lBRWpDLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLGFBQWEsRUFBRSxNQUFNO0lBQ3JCLFNBQVMsRUFBRSxhQUFhO0lBQ3hCLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFLEVBQUU7SUFFWCxNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsTUFBTTtRQUNkLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFLE9BQU87S0FDakI7SUFFRCxJQUFJLEVBQUUsd0hBQXdIO0lBRTlILE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsUUFBUSxFQUFFLHlCQUF5QjtLQUNwQztJQUVELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSx5QkFBeUI7S0FDcEM7SUFFRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsZUFBZTtRQUN0QixRQUFRLEVBQUUsRUFBRTtLQUNiO0lBRUQsUUFBUSxFQUFFO1FBQ1IsZUFBZSxFQUFFLHNCQUFzQjtRQUN2QyxVQUFVLEVBQ1IsNElBQTRJO1FBQzlJLGNBQWMsRUFBRSw2Q0FBNkM7UUFDN0QsZUFBZSxFQUFFLDhDQUE4QztRQUMvRCxNQUFNLEVBQUUsNkNBQTZDO1FBQ3JELE1BQU0sRUFBRSw2Q0FBNkM7S0FDdEQ7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZLEVBQUUscUNBQXFDO1FBQ25ELGNBQWMsRUFBRSx5REFBeUQ7S0FDMUU7SUFFRCxLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsY0FBYztLQUM1QjtJQUVELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHO0lBQzFDLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFFBQVEsRUFBRSx5QkFBeUI7Q0FDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCBvcmdCdWRnZXQgPSB7XG4gIGhlYWRlcjogJ0FsbCBidWRnZXRzICh7e2NvdW50fX0pJyxcblxuICBjb2RlOiAnQ29kZScsXG4gIG5hbWU6ICdOYW1lJyxcbiAgYWN0aXZlOiAnU3RhdHVzJyxcbiAgY3VycmVuY3k6ICdDdXJyZW5jeScsXG4gIGFtb3VudDogJ0Ftb3VudCcsXG4gIHVuaXQ6ICdVbml0JyxcbiAgYnVzaW5lc3NVbml0czogJ1VuaXQnLFxuICBkYXRlUmFuZ2U6ICdTdGFydCAtIEVuZCcsXG4gIHN0YXJ0RGF0ZTogJ1N0YXJ0JyxcbiAgZW5kRGF0ZTogJ0VuZCcsXG4gIGFjdGlvbnM6ICcnLFxuXG4gIHNvcnRCeTogJ1NvcnQgYnknLFxuICBzb3J0OiB7XG4gICAgYnlOYW1lOiAnTmFtZScsXG4gICAgYnlVbml0TmFtZTogJ1VuaXQnLFxuICAgIGJ5Q29kZTogJ0NvZGUnLFxuICAgIGJ5VmFsdWU6ICdWYWx1ZScsXG4gIH0sXG5cbiAgaGludDogJ0J1ZGdldHMgc2V0IG92ZXJhbGwgcHVyY2hhc2UgbGltaXRzIGFuZCBhcmUgYXNzaWduZWQgdG8gY29zdCBjZW50ZXJzLiBBIGJ1eWVyIHNlbGVjdHMgYSBjb3N0IGNlbnRlciB3aGVuIGNoZWNraW5nIG91dC4nLFxuXG4gIGRldGFpbHM6IHtcbiAgICB0aXRsZTogJ0J1ZGdldCBEZXRhaWxzJyxcbiAgICBzdWJ0aXRsZTogJ0J1ZGdldDoge3sgaXRlbS5uYW1lIH19JyxcbiAgfSxcblxuICBlZGl0OiB7XG4gICAgdGl0bGU6ICdFZGl0IEJ1ZGdldCcsXG4gICAgc3VidGl0bGU6ICdCdWRnZXQ6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIH0sXG5cbiAgY3JlYXRlOiB7XG4gICAgdGl0bGU6ICdDcmVhdGUgQnVkZ2V0JyxcbiAgICBzdWJ0aXRsZTogJycsXG4gIH0sXG5cbiAgbWVzc2FnZXM6IHtcbiAgICBkZWFjdGl2YXRlVGl0bGU6ICdEaXNhYmxlIHRoaXMgYnVkZ2V0PycsXG4gICAgZGVhY3RpdmF0ZTpcbiAgICAgICdEaXNhYmxlZCBidWRnZXRzIG5vIGxvbmdlciBhcHBseSB0byB0aGUgY29zdCBjZW50ZXJzIHRoZXkgYXJlIGFzc2lnbmVkIHRvLiBFbnN1cmUgdGhhdCB0aGUgYXNzb2NpYXRlZCBjb3N0IGNlbnRlciBoYXMgYXQgbGVhc3Qgb25lIGJ1ZGdldC4nLFxuICAgIGNvbmZpcm1FbmFibGVkOiAnQnVkZ2V0IHt7IGl0ZW0ubmFtZSB9fSBlbmFibGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgY29uZmlybURpc2FibGVkOiAnQnVkZ2V0IHt7IGl0ZW0ubmFtZSB9fSBkaXNhYmxlZCBzdWNjZXNzZnVsbHknLFxuICAgIHVwZGF0ZTogJ0J1ZGdldCB7eyBpdGVtLm5hbWUgfX0gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNyZWF0ZTogJ0J1ZGdldCB7eyBpdGVtLm5hbWUgfX0gY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxuICB9LFxuICBpbmZvOiB7XG4gICAgZGlzYWJsZWRFZGl0OiAnRW5hYmxlIHRoZSBidWRnZXQgdG8gYWxsb3cgZWRpdGluZy4nLFxuICAgIGRpc2FibGVkRW5hYmxlOiAnVW5pdCBtdXN0IGJlIGVuYWJsZWQgYmVmb3JlIHRoaXMgYnVkZ2V0IG1heSBiZSBlbmFibGVkLicsXG4gIH0sXG5cbiAgbGlua3M6IHtcbiAgICBjb3N0Q2VudGVyczogJ0Nvc3QgQ2VudGVycycsXG4gIH0sXG5cbiAgYnJlYWRjcnVtYnM6IHtcbiAgICBsaXN0OiAnQWxsIGJ1ZGdldHMnLFxuICAgIGRldGFpbHM6ICd7e25hbWV9fScsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnQnVkZ2V0QXNzaWduZWRDb3N0Q2VudGVycyA9IHtcbiAgdGl0bGU6ICdDb3N0IGNlbnRlcnMnLFxuICBzdWJ0aXRsZTogJ0J1ZGdldDoge3sgaXRlbS5uYW1lIH19Jyxcbn07XG4iXX0=