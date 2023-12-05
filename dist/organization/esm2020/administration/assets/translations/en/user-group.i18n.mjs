/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgUserGroup = {
    header: 'All user groups ({{count}})',
    disabled: '(disabled)',
    uid: 'Code',
    name: 'Name',
    unit: 'Unit',
    orgUnit: 'Unit',
    actions: '',
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnitName: 'Unit',
        byGroupID: 'Group',
    },
    hint: 'User groups allow you to combine users together in one group, for the purposes of assigning purchase limits for many users at once.',
    details: {
        title: 'User group Details',
        subtitle: 'User group: {{ item.name }}',
    },
    edit: {
        title: 'Edit User group',
        subtitle: 'User group: {{ item.name }}',
    },
    create: {
        title: 'Create User group',
        subtitle: '',
    },
    links: {
        user: 'Users',
        permission: 'Purchase limits',
    },
    messages: {
        update: 'User Group {{ item.name }} updated successfully',
        create: 'User Group {{ item.name }} created successfully',
        deleteTitle: 'Delete this user group?',
        delete: 'The users in this group are not affected when the user group is deleted.',
        deleted: 'User Group {{ item.name }} deleted successfully',
    },
    breadcrumbs: {
        list: 'All user groups',
        details: '{{name}}',
        users: 'Users',
        permissions: 'Purchase limits',
    },
};
export const orgUserGroupAssignedUsers = {
    title: 'Assigned users',
    subtitle: 'User group: {{ item.name }}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
};
export const orgUserGroupUsers = {
    title: 'Manage users',
    subtitle: 'User group: {{ item.name }}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
    unassignAll: 'Unassign All',
    unassignAllConfirmation: 'All users unassigned successfully',
};
export const orgUserGroupAssignedPermissions = {
    title: 'Assigned purchase limits',
    subtitle: 'Limit: {{ item.name }}',
    assigned: 'Purchase limits {{item.code}} assigned successfully',
    unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};
export const orgUserGroupPermissions = {
    title: 'Manage purchase limits',
    subtitle: 'Limit: {{ item.name }}',
    assigned: 'Purchase limits {{item.code}} assigned successfully',
    unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL3VzZXItZ3JvdXAuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLE1BQU0sRUFBRSw2QkFBNkI7SUFDckMsUUFBUSxFQUFFLFlBQVk7SUFDdEIsR0FBRyxFQUFFLE1BQU07SUFDWCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLE1BQU07SUFDZixPQUFPLEVBQUUsRUFBRTtJQUVYLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxNQUFNO1FBQ2QsVUFBVSxFQUFFLE1BQU07UUFDbEIsU0FBUyxFQUFFLE9BQU87S0FDbkI7SUFFRCxJQUFJLEVBQUUscUlBQXFJO0lBRTNJLE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsUUFBUSxFQUFFLDZCQUE2QjtLQUN4QztJQUVELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxpQkFBaUI7UUFDeEIsUUFBUSxFQUFFLDZCQUE2QjtLQUN4QztJQUVELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxtQkFBbUI7UUFDMUIsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUVELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLGlCQUFpQjtLQUM5QjtJQUVELFFBQVEsRUFBRTtRQUNSLE1BQU0sRUFBRSxpREFBaUQ7UUFDekQsTUFBTSxFQUFFLGlEQUFpRDtRQUN6RCxXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLE1BQU0sRUFDSiwwRUFBMEU7UUFDNUUsT0FBTyxFQUFFLGlEQUFpRDtLQUMzRDtJQUVELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsS0FBSyxFQUFFLE9BQU87UUFDZCxXQUFXLEVBQUUsaUJBQWlCO0tBQy9CO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3ZDLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsUUFBUSxFQUFFLDZCQUE2QjtJQUN2QyxRQUFRLEVBQUUsMENBQTBDO0lBQ3BELFVBQVUsRUFBRSw0Q0FBNEM7Q0FDekQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHO0lBQy9CLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFFBQVEsRUFBRSw2QkFBNkI7SUFDdkMsUUFBUSxFQUFFLDBDQUEwQztJQUNwRCxVQUFVLEVBQUUsNENBQTRDO0lBQ3hELFdBQVcsRUFBRSxjQUFjO0lBQzNCLHVCQUF1QixFQUFFLG1DQUFtQztDQUM3RCxDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUc7SUFDN0MsS0FBSyxFQUFFLDBCQUEwQjtJQUNqQyxRQUFRLEVBQUUsd0JBQXdCO0lBQ2xDLFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsVUFBVSxFQUFFLHVEQUF1RDtDQUNwRSxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUc7SUFDckMsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixRQUFRLEVBQUUsd0JBQXdCO0lBQ2xDLFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsVUFBVSxFQUFFLHVEQUF1RDtDQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ1VzZXJHcm91cCA9IHtcbiAgaGVhZGVyOiAnQWxsIHVzZXIgZ3JvdXBzICh7e2NvdW50fX0pJyxcbiAgZGlzYWJsZWQ6ICcoZGlzYWJsZWQpJyxcbiAgdWlkOiAnQ29kZScsXG4gIG5hbWU6ICdOYW1lJyxcbiAgdW5pdDogJ1VuaXQnLFxuICBvcmdVbml0OiAnVW5pdCcsXG4gIGFjdGlvbnM6ICcnLFxuXG4gIHNvcnRCeTogJ1NvcnQgYnknLFxuICBzb3J0OiB7XG4gICAgYnlOYW1lOiAnTmFtZScsXG4gICAgYnlVbml0TmFtZTogJ1VuaXQnLFxuICAgIGJ5R3JvdXBJRDogJ0dyb3VwJyxcbiAgfSxcblxuICBoaW50OiAnVXNlciBncm91cHMgYWxsb3cgeW91IHRvIGNvbWJpbmUgdXNlcnMgdG9nZXRoZXIgaW4gb25lIGdyb3VwLCBmb3IgdGhlIHB1cnBvc2VzIG9mIGFzc2lnbmluZyBwdXJjaGFzZSBsaW1pdHMgZm9yIG1hbnkgdXNlcnMgYXQgb25jZS4nLFxuXG4gIGRldGFpbHM6IHtcbiAgICB0aXRsZTogJ1VzZXIgZ3JvdXAgRGV0YWlscycsXG4gICAgc3VidGl0bGU6ICdVc2VyIGdyb3VwOiB7eyBpdGVtLm5hbWUgfX0nLFxuICB9LFxuXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgVXNlciBncm91cCcsXG4gICAgc3VidGl0bGU6ICdVc2VyIGdyb3VwOiB7eyBpdGVtLm5hbWUgfX0nLFxuICB9LFxuXG4gIGNyZWF0ZToge1xuICAgIHRpdGxlOiAnQ3JlYXRlIFVzZXIgZ3JvdXAnLFxuICAgIHN1YnRpdGxlOiAnJyxcbiAgfSxcblxuICBsaW5rczoge1xuICAgIHVzZXI6ICdVc2VycycsXG4gICAgcGVybWlzc2lvbjogJ1B1cmNoYXNlIGxpbWl0cycsXG4gIH0sXG5cbiAgbWVzc2FnZXM6IHtcbiAgICB1cGRhdGU6ICdVc2VyIEdyb3VwIHt7IGl0ZW0ubmFtZSB9fSB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgY3JlYXRlOiAnVXNlciBHcm91cCB7eyBpdGVtLm5hbWUgfX0gY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGRlbGV0ZVRpdGxlOiAnRGVsZXRlIHRoaXMgdXNlciBncm91cD8nLFxuICAgIGRlbGV0ZTpcbiAgICAgICdUaGUgdXNlcnMgaW4gdGhpcyBncm91cCBhcmUgbm90IGFmZmVjdGVkIHdoZW4gdGhlIHVzZXIgZ3JvdXAgaXMgZGVsZXRlZC4nLFxuICAgIGRlbGV0ZWQ6ICdVc2VyIEdyb3VwIHt7IGl0ZW0ubmFtZSB9fSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG5cbiAgYnJlYWRjcnVtYnM6IHtcbiAgICBsaXN0OiAnQWxsIHVzZXIgZ3JvdXBzJyxcbiAgICBkZXRhaWxzOiAne3tuYW1lfX0nLFxuICAgIHVzZXJzOiAnVXNlcnMnLFxuICAgIHBlcm1pc3Npb25zOiAnUHVyY2hhc2UgbGltaXRzJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyR3JvdXBBc3NpZ25lZFVzZXJzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIHVzZXJzJyxcbiAgc3VidGl0bGU6ICdVc2VyIGdyb3VwOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1VzZXIge3tpdGVtLm5hbWV9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnVXNlciB7e2l0ZW0ubmFtZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyR3JvdXBVc2VycyA9IHtcbiAgdGl0bGU6ICdNYW5hZ2UgdXNlcnMnLFxuICBzdWJ0aXRsZTogJ1VzZXIgZ3JvdXA6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIGFzc2lnbmVkOiAnVXNlciB7e2l0ZW0ubmFtZX19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdVc2VyIHt7aXRlbS5uYW1lfX0gdW5hc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbkFsbDogJ1VuYXNzaWduIEFsbCcsXG4gIHVuYXNzaWduQWxsQ29uZmlybWF0aW9uOiAnQWxsIHVzZXJzIHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5leHBvcnQgY29uc3Qgb3JnVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9ucyA9IHtcbiAgdGl0bGU6ICdBc3NpZ25lZCBwdXJjaGFzZSBsaW1pdHMnLFxuICBzdWJ0aXRsZTogJ0xpbWl0OiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1B1cmNoYXNlIGxpbWl0cyB7e2l0ZW0uY29kZX19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdQdXJjaGFzZSBsaW1pdHMge3tpdGVtLmNvZGV9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVXNlckdyb3VwUGVybWlzc2lvbnMgPSB7XG4gIHRpdGxlOiAnTWFuYWdlIHB1cmNoYXNlIGxpbWl0cycsXG4gIHN1YnRpdGxlOiAnTGltaXQ6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIGFzc2lnbmVkOiAnUHVyY2hhc2UgbGltaXRzIHt7aXRlbS5jb2RlfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ1B1cmNoYXNlIGxpbWl0cyB7e2l0ZW0uY29kZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG4iXX0=