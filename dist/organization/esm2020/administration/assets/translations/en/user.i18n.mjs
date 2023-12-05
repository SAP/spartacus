/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgUser = {
    header: 'All users ({{count}})',
    disabled: '(disabled)',
    uid: 'Email',
    active: 'Status',
    name: 'Name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    orgUnit: 'Unit',
    unit: 'Unit',
    roles: 'Roles',
    rights: 'Rights',
    title: 'Title',
    hint: 'Users are the buyers, approvers, managers, and administrators of your organization. Each user is assigned a role for making or approving purchases. Each user belongs to a unit, and they have access to all child units of their primary unit.',
    unitApprover: `Unit approver`,
    assignApprover: 'Add the user to approvers for the unit',
    actions: '',
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnit: 'Unit',
    },
    details: {
        title: 'User Details',
        subtitle: 'User: {{ item.name }}',
    },
    edit: {
        title: 'Edit User',
        subtitle: 'User: {{ item.name }}',
    },
    create: {
        title: 'Create User',
        subtitle: '',
    },
    links: {
        password: 'Change password',
        approvers: 'Approvers',
        userGroup: 'User groups',
        permission: 'Purchase limits',
        rolesAndRights: 'Roles and Rights',
    },
    messages: {
        deactivateTitle: 'Disable this user?',
        deactivate: 'Disabled users cannot log onto the storefront and place orders.',
        confirmEnabled: 'User {{item.firstName}} {{item.lastName}} enabled successfully',
        confirmDisabled: 'User {{item.firstName}} {{item.lastName}} disabled successfully',
        update: 'User {{item.firstName}} {{item.lastName}} updated successfully',
        create: 'User {{item.firstName}} {{item.lastName}} created successfully',
        updatePassword: 'User {{item.firstName}} {{item.lastName}} password updated successfully',
    },
    info: {
        disabledEdit: 'Enable the user to allow editing.',
        disabledEnable: 'Unit must be enabled before this user may be enabled.',
    },
    approver: {
        link: 'Approvers',
        header: 'Approvers in {{code}}',
        assign: 'Assign Approvers',
        assignHeader: 'Assign Approvers in {{code}}',
        back: 'Back',
        new: 'New approver',
        instructions: {
            check: "To assign an approver to this user, select the user's check box.",
            uncheck: "To remove an approver, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    userGroup: {
        link: 'User groups',
        header: 'User groups in {{code}}',
        assign: 'Assign user groups',
        assignHeader: 'Assign user groups in {{code}}',
        back: 'Back',
        instructions: {
            check: "To assign an user group to this user, select the user's check box.",
            uncheck: "To remove aa user group, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    permission: {
        link: 'Purchase limits',
        header: 'Purchase limits in {{code}}',
        assign: 'Assign purchase limits',
        assignHeader: 'Assign purchase limits in {{code}}',
        back: 'Back',
        instructions: {
            check: 'To assign a purchase limits to this user, select its check box.',
            uncheck: 'To unassign a purchase limits, clear its check box.',
            changes: 'Changes are saved automatically.',
        },
        per: {
            undefined: '',
            MONTH: 'per Month',
            YEAR: 'per Year',
            WEEK: 'per Week',
            QUARTER: 'per Quarter',
        },
    },
    password: {
        title: 'Change password',
        subtitle: 'User: {{ item.email }}',
        newPassword: 'New password',
        confirmPassword: 'Retype new password',
    },
    breadcrumbs: {
        list: 'All users',
        details: '{{name}}',
        userGroups: 'User groups',
        approvers: 'Approvers',
        permissions: 'Purchase limits',
    },
};
export const orgUserAssignedApprovers = {
    title: 'Assigned approvers',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Approver {{ item.name }} assigned successfully',
    unassigned: 'Approver {{ item.name }} unassigned successfully',
};
export const orgUserApprovers = {
    title: 'Manage approvers',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Approver {{ item.name }} assigned successfully',
    unassigned: 'Approver {{ item.name }} unassigned successfully',
};
export const orgUserAssignedPermissions = {
    title: 'Assigned purchase limits',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Purchase limit {{ item.code }} assigned successfully',
    unassigned: 'Purchase limit {{ item.code }} unassigned successfully',
};
export const orgUserPermissions = {
    title: 'Manage purchase limits',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Purchase limit {{ item.code }} assigned successfully',
    unassigned: 'Purchase limit {{ item.code }} unassigned successfully',
};
export const orgUserAssignedUserGroups = {
    title: 'Assigned user groups',
    subtitle: 'User: {{ item.name }}',
    assigned: 'User group {{item.name}} assigned successfully',
    unassigned: 'User group {{item.name}} unassigned successfully',
};
export const orgUserUserGroups = {
    title: 'Manage user groups',
    subtitle: 'User: {{ item.name }}',
    assigned: 'User group {{item.name}} assigned successfully',
    unassigned: 'User group {{item.name}} unassigned successfully',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL3VzZXIuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3JCLE1BQU0sRUFBRSx1QkFBdUI7SUFDL0IsUUFBUSxFQUFFLFlBQVk7SUFDdEIsR0FBRyxFQUFFLE9BQU87SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLE1BQU07SUFDZixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsaVBBQWlQO0lBRXZQLFlBQVksRUFBRSxlQUFlO0lBQzdCLGNBQWMsRUFBRSx3Q0FBd0M7SUFFeEQsT0FBTyxFQUFFLEVBQUU7SUFFWCxNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRSxNQUFNO0tBQ2Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsY0FBYztRQUNyQixRQUFRLEVBQUUsdUJBQXVCO0tBQ2xDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLFdBQVc7UUFDbEIsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFNB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QUFDLE1BQU0sa0JBQWtCLEdBQUc7SUFDaEMsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixRQUFRLEVBQUUsdUJBQXVCO0lBQ2pDLFFBQVEsRUFBRSxzREFBc0Q7SUFDaEUsVUFBVSxFQUFFLHdEQUF3RDtDQUNyRSxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUc7SUFDdkMsS0FBSyxFQUFFLHNCQUFzQjtJQUM3QixRQUFRLEVBQUUsdUJBQXVCO0lBQ2pDLFFBQVEsRUFBRSxnREFBZ0Q7SUFDMUQsVUFBVSxFQUFFLGtEQUFrRDtDQUMvRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUc7SUFDL0IsS0FBSyxFQUFFLG9CQUFvQjtJQUMzQixRQUFRLEVBQUUsdUJBQXVCO0lBQ2pDLFFBQVEsRUFBRSxnREFBZ0Q7SUFDMUQsVUFBVSxFQUFFLGtEQUFrRDtDQUMvRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ1VzZXIgPSB7XG4gIGhlYWRlcjogJ0FsbCB1c2VycyAoe3tjb3VudH19KScsXG4gIGRpc2FibGVkOiAnKGRpc2FibGVkKScsXG4gIHVpZDogJ0VtYWlsJyxcbiAgYWN0aXZlOiAnU3RhdHVzJyxcbiAgbmFtZTogJ05hbWUnLFxuICBmaXJzdE5hbWU6ICdGaXJzdCBuYW1lJyxcbiAgbGFzdE5hbWU6ICdMYXN0IG5hbWUnLFxuICBlbWFpbDogJ0VtYWlsJyxcbiAgb3JnVW5pdDogJ1VuaXQnLFxuICB1bml0OiAnVW5pdCcsXG4gIHJvbGVzOiAnUm9sZXMnLFxuICByaWdodHM6ICdSaWdodHMnLFxuICB0aXRsZTogJ1RpdGxlJyxcbiAgaGludDogJ1VzZXJzIGFyZSB0aGUgYnV5ZXJzLCBhcHByb3ZlcnMsIG1hbmFnZXJzLCBhbmQgYWRtaW5pc3RyYXRvcnMgb2YgeW91ciBvcmdhbml6YXRpb24uIEVhY2ggdXNlciBpcyBhc3NpZ25lZCBhIHJvbGUgZm9yIG1ha2luZyBvciBhcHByb3ZpbmcgcHVyY2hhc2VzLiBFYWNoIHVzZXIgYmVsb25ncyB0byBhIHVuaXQsIGFuZCB0aGV5IGhhdmUgYWNjZXNzIHRvIGFsbCBjaGlsZCB1bml0cyBvZiB0aGVpciBwcmltYXJ5IHVuaXQuJyxcblxuICB1bml0QXBwcm92ZXI6IGBVbml0IGFwcHJvdmVyYCxcbiAgYXNzaWduQXBwcm92ZXI6ICdBZGQgdGhlIHVzZXIgdG8gYXBwcm92ZXJzIGZvciB0aGUgdW5pdCcsXG5cbiAgYWN0aW9uczogJycsXG5cbiAgc29ydEJ5OiAnU29ydCBieScsXG4gIHNvcnQ6IHtcbiAgICBieU5hbWU6ICdOYW1lJyxcbiAgICBieVVuaXQ6ICdVbml0JyxcbiAgfSxcblxuICBkZXRhaWxzOiB7XG4gICAgdGl0bGU6ICdVc2VyIERldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnVXNlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgfSxcbiAgZWRpdDoge1xuICAgIHRpdGxlOiAnRWRpdCBVc2VyJyxcbiAgICBzdWJ0aXRsZTogJ1VzZXI6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIH0sXG4gIGNyZWF0ZToge1xuICAgIHRpdGxlOiAnQ3JlYXRlIFVzZXInLFxuICAgIHN1YnRpdGxlOiAnJyxcbiAgfSxcblxuICBsaW5rczoge1xuICAgIHBhc3N3b3JkOiAnQ2hhbmdlIHBhc3N3b3JkJyxcbiAgICBhcHByb3ZlcnM6ICdBcHByb3ZlcnMnLFxuICAgIHVzZXJHcm91cDogJ1VzZXIgZ3JvdXBzJyxcbiAgICBwZXJtaXNzaW9uOiAnUHVyY2hhc2UgbGltaXRzJyxcbiAgICByb2xlc0FuZFJpZ2h0czogJ1JvbGVzIGFuZCBSaWdodHMnLFxuICB9LFxuXG4gIG1lc3NhZ2VzOiB7XG4gICAgZGVhY3RpdmF0ZVRpdGxlOiAnRGlzYWJsZSB0aGlzIHVzZXI/JyxcbiAgICBkZWFjdGl2YXRlOlxuICAgICAgJ0Rpc2FibGVkIHVzZXJzIGNhbm5vdCBsb2cgb250byB0aGUgc3RvcmVmcm9udCBhbmQgcGxhY2Ugb3JkZXJzLicsXG4gICAgY29uZmlybUVuYWJsZWQ6XG4gICAgICAnVXNlciB7e2l0ZW0uZmlyc3ROYW1lfX0ge3tpdGVtLmxhc3ROYW1lfX0gZW5hYmxlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNvbmZpcm1EaXNhYmxlZDpcbiAgICAgICdVc2VyIHt7aXRlbS5maXJzdE5hbWV9fSB7e2l0ZW0ubGFzdE5hbWV9fSBkaXNhYmxlZCBzdWNjZXNzZnVsbHknLFxuICAgIHVwZGF0ZTogJ1VzZXIge3tpdGVtLmZpcnN0TmFtZX19IHt7aXRlbS5sYXN0TmFtZX19IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBjcmVhdGU6ICdVc2VyIHt7aXRlbS5maXJzdE5hbWV9fSB7e2l0ZW0ubGFzdE5hbWV9fSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgdXBkYXRlUGFzc3dvcmQ6XG4gICAgICAnVXNlciB7e2l0ZW0uZmlyc3ROYW1lfX0ge3tpdGVtLmxhc3ROYW1lfX0gcGFzc3dvcmQgdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICB9LFxuICBpbmZvOiB7XG4gICAgZGlzYWJsZWRFZGl0OiAnRW5hYmxlIHRoZSB1c2VyIHRvIGFsbG93IGVkaXRpbmcuJyxcbiAgICBkaXNhYmxlZEVuYWJsZTogJ1VuaXQgbXVzdCBiZSBlbmFibGVkIGJlZm9yZSB0aGlzIHVzZXIgbWF5IGJlIGVuYWJsZWQuJyxcbiAgfSxcblxuICBhcHByb3Zlcjoge1xuICAgIGxpbms6ICdBcHByb3ZlcnMnLFxuICAgIGhlYWRlcjogJ0FwcHJvdmVycyBpbiB7e2NvZGV9fScsXG4gICAgYXNzaWduOiAnQXNzaWduIEFwcHJvdmVycycsXG4gICAgYXNzaWduSGVhZGVyOiAnQXNzaWduIEFwcHJvdmVycyBpbiB7e2NvZGV9fScsXG4gICAgYmFjazogJ0JhY2snLFxuICAgIG5ldzogJ05ldyBhcHByb3ZlcicsXG4gICAgaW5zdHJ1Y3Rpb25zOiB7XG4gICAgICBjaGVjazogXCJUbyBhc3NpZ24gYW4gYXBwcm92ZXIgdG8gdGhpcyB1c2VyLCBzZWxlY3QgdGhlIHVzZXIncyBjaGVjayBib3guXCIsXG4gICAgICB1bmNoZWNrOiBcIlRvIHJlbW92ZSBhbiBhcHByb3ZlciwgY2xlYXIgdGhlIHVzZXIncyBjaGVjayBib3guXCIsXG4gICAgICBjaGFuZ2VzOiAnQ2hhbmdlcyBhcmUgc2F2ZWQgYXV0b21hdGljYWxseS4nLFxuICAgIH0sXG4gIH0sXG5cbiAgdXNlckdyb3VwOiB7XG4gICAgbGluazogJ1VzZXIgZ3JvdXBzJyxcbiAgICBoZWFkZXI6ICdVc2VyIGdyb3VwcyBpbiB7e2NvZGV9fScsXG4gICAgYXNzaWduOiAnQXNzaWduIHVzZXIgZ3JvdXBzJyxcbiAgICBhc3NpZ25IZWFkZXI6ICdBc3NpZ24gdXNlciBncm91cHMgaW4ge3tjb2RlfX0nLFxuICAgIGJhY2s6ICdCYWNrJyxcbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIGNoZWNrOlxuICAgICAgICBcIlRvIGFzc2lnbiBhbiB1c2VyIGdyb3VwIHRvIHRoaXMgdXNlciwgc2VsZWN0IHRoZSB1c2VyJ3MgY2hlY2sgYm94LlwiLFxuICAgICAgdW5jaGVjazogXCJUbyByZW1vdmUgYWEgdXNlciBncm91cCwgY2xlYXIgdGhlIHVzZXIncyBjaGVjayBib3guXCIsXG4gICAgICBjaGFuZ2VzOiAnQ2hhbmdlcyBhcmUgc2F2ZWQgYXV0b21hdGljYWxseS4nLFxuICAgIH0sXG4gIH0sXG5cbiAgcGVybWlzc2lvbjoge1xuICAgIGxpbms6ICdQdXJjaGFzZSBsaW1pdHMnLFxuICAgIGhlYWRlcjogJ1B1cmNoYXNlIGxpbWl0cyBpbiB7e2NvZGV9fScsXG4gICAgYXNzaWduOiAnQXNzaWduIHB1cmNoYXNlIGxpbWl0cycsXG4gICAgYXNzaWduSGVhZGVyOiAnQXNzaWduIHB1cmNoYXNlIGxpbWl0cyBpbiB7e2NvZGV9fScsXG4gICAgYmFjazogJ0JhY2snLFxuICAgIGluc3RydWN0aW9uczoge1xuICAgICAgY2hlY2s6ICdUbyBhc3NpZ24gYSBwdXJjaGFzZSBsaW1pdHMgdG8gdGhpcyB1c2VyLCBzZWxlY3QgaXRzIGNoZWNrIGJveC4nLFxuICAgICAgdW5jaGVjazogJ1RvIHVuYXNzaWduIGEgcHVyY2hhc2UgbGltaXRzLCBjbGVhciBpdHMgY2hlY2sgYm94LicsXG4gICAgICBjaGFuZ2VzOiAnQ2hhbmdlcyBhcmUgc2F2ZWQgYXV0b21hdGljYWxseS4nLFxuICAgIH0sXG4gICAgcGVyOiB7XG4gICAgICB1bmRlZmluZWQ6ICcnLFxuICAgICAgTU9OVEg6ICdwZXIgTW9udGgnLFxuICAgICAgWUVBUjogJ3BlciBZZWFyJyxcbiAgICAgIFdFRUs6ICdwZXIgV2VlaycsXG4gICAgICBRVUFSVEVSOiAncGVyIFF1YXJ0ZXInLFxuICAgIH0sXG4gIH0sXG5cbiAgcGFzc3dvcmQ6IHtcbiAgICB0aXRsZTogJ0NoYW5nZSBwYXNzd29yZCcsXG4gICAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLmVtYWlsIH19JyxcbiAgICBuZXdQYXNzd29yZDogJ05ldyBwYXNzd29yZCcsXG4gICAgY29uZmlybVBhc3N3b3JkOiAnUmV0eXBlIG5ldyBwYXNzd29yZCcsXG4gIH0sXG5cbiAgYnJlYWRjcnVtYnM6IHtcbiAgICBsaXN0OiAnQWxsIHVzZXJzJyxcbiAgICBkZXRhaWxzOiAne3tuYW1lfX0nLFxuICAgIHVzZXJHcm91cHM6ICdVc2VyIGdyb3VwcycsXG4gICAgYXBwcm92ZXJzOiAnQXBwcm92ZXJzJyxcbiAgICBwZXJtaXNzaW9uczogJ1B1cmNoYXNlIGxpbWl0cycsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVXNlckFzc2lnbmVkQXBwcm92ZXJzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIGFwcHJvdmVycycsXG4gIHN1YnRpdGxlOiAnVXNlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgYXNzaWduZWQ6ICdBcHByb3ZlciB7eyBpdGVtLm5hbWUgfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ0FwcHJvdmVyIHt7IGl0ZW0ubmFtZSB9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG59O1xuZXhwb3J0IGNvbnN0IG9yZ1VzZXJBcHByb3ZlcnMgPSB7XG4gIHRpdGxlOiAnTWFuYWdlIGFwcHJvdmVycycsXG4gIHN1YnRpdGxlOiAnVXNlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgYXNzaWduZWQ6ICdBcHByb3ZlciB7eyBpdGVtLm5hbWUgfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ0FwcHJvdmVyIHt7IGl0ZW0ubmFtZSB9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVXNlckFzc2lnbmVkUGVybWlzc2lvbnMgPSB7XG4gIHRpdGxlOiAnQXNzaWduZWQgcHVyY2hhc2UgbGltaXRzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1B1cmNoYXNlIGxpbWl0IHt7IGl0ZW0uY29kZSB9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnUHVyY2hhc2UgbGltaXQge3sgaXRlbS5jb2RlIH19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyUGVybWlzc2lvbnMgPSB7XG4gIHRpdGxlOiAnTWFuYWdlIHB1cmNoYXNlIGxpbWl0cycsXG4gIHN1YnRpdGxlOiAnVXNlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgYXNzaWduZWQ6ICdQdXJjaGFzZSBsaW1pdCB7eyBpdGVtLmNvZGUgfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ1B1cmNoYXNlIGxpbWl0IHt7IGl0ZW0uY29kZSB9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVXNlckFzc2lnbmVkVXNlckdyb3VwcyA9IHtcbiAgdGl0bGU6ICdBc3NpZ25lZCB1c2VyIGdyb3VwcycsXG4gIHN1YnRpdGxlOiAnVXNlcjoge3sgaXRlbS5uYW1lIH19JyxcbiAgYXNzaWduZWQ6ICdVc2VyIGdyb3VwIHt7aXRlbS5uYW1lfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ1VzZXIgZ3JvdXAge3tpdGVtLm5hbWV9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVXNlclVzZXJHcm91cHMgPSB7XG4gIHRpdGxlOiAnTWFuYWdlIHVzZXIgZ3JvdXBzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1VzZXIgZ3JvdXAge3tpdGVtLm5hbWV9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnVXNlciBncm91cCB7e2l0ZW0ubmFtZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG4iXX0=