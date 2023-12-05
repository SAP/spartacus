/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgUnit = {
    header: 'All units ({{count}})',
    unit: 'Unit',
    name: 'Name',
    uid: 'ID',
    approvalProcess: 'Approval process',
    parentUnit: 'Parent Unit',
    active: 'Status',
    hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. The cost centers and delivery addresses available to a buyer when checking out, depend on their unit. Users have access to all child units of their primary unit.',
    details: {
        title: 'Unit Details',
        subtitle: 'Unit: {{ item.name }}',
        hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Disabling a unit disables all children of the unit, including child units, users, approvers, and cost centers. Disabled units cannot be edited.',
    },
    edit: {
        title: 'Edit Unit',
        subtitle: 'Unit: {{ item.name }}',
    },
    create: {
        title: 'Create Unit',
        subtitle: '',
    },
    messages: {
        deactivateTitle: 'Disable this unit?',
        deactivate: `Disabling a unit has wide-ranging affects on your commerce organization. ALL the unit's child units, users, budgets, and cost centers will also disabled.`,
        confirmEnabled: 'Unit {{item.name}} enabled successfully',
        confirmDisabled: 'Unit {{item.name}} disabled successfully',
        update: 'Unit {{ item.name }} updated successfully',
        create: 'Unit {{ item.name }} created successfully',
    },
    info: {
        disabledEdit: 'Enable the unit to allow editing.',
        disabledEnable: 'Parent must be enabled before this unit may be enabled.',
        disabledDisable: 'Root unit can not be disabled.',
    },
    links: {
        units: 'Child Units',
        users: 'Users',
        approvers: 'Approvers',
        shippingAddresses: 'Delivery Addresses',
        costCenters: 'Cost Centers',
    },
    tree: {
        expandAll: 'Expand all',
        collapseAll: 'Collapse all',
        expand: 'Expand',
        collapse: 'collapse',
    },
    children: {
        create: {
            title: 'Create child unit',
            subtitle: '',
        },
        messages: {
            create: 'Unit {{ item.name }} created successfully',
        },
    },
    costCenters: {
        create: {
            title: 'Create cost center',
            subtitle: '',
        },
    },
    form: {
        parentOrgUnit: 'Parent business unit',
        create: 'Create Unit',
        parentOrgUnitNotes: 'This unit is the top-level unit for your organization. It cannot be assigned to another unit.',
    },
    users: {
        header: 'Users in {{code}}',
        changeUserRoles: 'Change user roles',
        newUser: 'New user',
    },
    assignRoles: {
        header: 'Manage roles in {{code}}',
        instructions: {
            check: "To assign a role to a user, select the role's check box.",
            uncheck: "To remove a role, clear the role's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    approvers: {
        header: 'Approvers in {{code}}',
        assign: 'Manage approvers',
        new: 'New approver',
    },
    assignApprovers: {
        header: 'Manage approvers in {{code}}',
        instructions: {
            check: "To assign an approver to this unit, select the user's check box.",
            uncheck: "To remove an approver, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
        hint: "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
    },
    breadcrumbs: {
        list: 'All units',
        details: '{{name}}',
        children: 'Child units',
        users: 'Users',
        approvers: 'Approvers',
        addresses: 'Delivery addresses',
        addressDetails: '{{formattedAddress}}',
        costCenters: 'Cost Centers',
    },
};
export const orgUnitChildren = {
    title: 'Child units',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'Child unit can not be created for disabled unit.',
    },
    hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Users "inherit" child units, meaning buyers have access to cost centers and delivery addresses of child units when checking out.',
};
export const orgUnitAssignedRoles = {
    header: 'Manage roles in {{code}}',
    name: 'Name',
    email: 'Email',
    roles: 'Roles',
    roleCustomer: 'Customer',
    roleApprover: 'Approver',
    roleManager: 'Manager',
    roleAdministrator: 'Admin',
};
export const orgUnitApprovers = {
    title: 'Manage approvers',
    subtitle: 'Unit: {{item.name}}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
};
export const orgUnitAssignedApprovers = {
    title: 'Assigned approvers',
    subtitle: 'Unit: {{item.name}}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
    hint: "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
};
export const orgUnitAssignedUsers = {
    title: 'Assigned users',
    subtitle: 'Unit: {{item.name}}',
};
export const orgUnitUsers = {
    title: 'Assigned users',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'User can not be created for disabled unit.',
    },
    hint: 'Users are the buyers, approvers, managers, and administrators of your organization. Each user is assigned a role for making or approving purchases. Users "inherit" child units, meaning buyers have access to cost centers and delivery addresses of child units when checking out.',
};
export const orgUnitUserRoles = {
    title: 'User roles and rights',
    subtitle: 'User: {{item.name}}',
    messages: {
        rolesUpdated: 'Roles successfully updated for {{item.name}}',
    },
};
export const orgUnitCostCenters = {
    title: 'Assigned cost centers',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'Cost center can not be created for disabled unit.',
    },
    hint: 'All orders placed through your organization\'s purchase account are linked to a cost center for tracking purposes. A buyer selects a cost center when checking out using the "Account" purchase method. Each unit can have multiple cost centers, but a single cost center can only be assigned to a single unit. To define ultimate spending limits, budgets are assigned to cost centers. ',
};
export const orgUnitAddress = {
    title: 'Delivery addresses',
    subtitle: 'Unit: {{item.name}}',
    country: 'Country/Region',
    titles: 'Title',
    firstName: 'First name',
    lastName: 'Last name',
    formattedAddress: 'Address',
    address1: 'Address',
    address2: '2nd address (optional)',
    city: 'City',
    state: 'State',
    zipCode: 'Zip code',
    phoneNumber: 'Phone number (optional)',
    streetAddress: 'Street Address',
    aptSuite: 'Apt, Suite',
    selectOne: 'Select One...',
    hint: 'When a buyer is checking out using the "Account" purchase method, they much choose a cost center. The delivery addresses available to the buyer depend on the unit of the cost center chosen.',
    details: {
        title: 'Address details',
        subtitle: 'Unit: {{item.name}}',
    },
    edit: {
        title: 'Edit Address',
    },
    create: {
        title: 'Create Address',
    },
    form: {
        subtitle: 'Unit: {{item.name}}',
    },
    messages: {
        create: 'Address {{ item.firstName }} {{ item.lastName }} created successfully',
        update: 'Address {{ item.firstName }} {{ item.lastName }} updated successfully',
        delete: 'The address cannot be brought back. Existing orders are not affected.',
        deleteTitle: 'Delete this address?',
        deleted: 'Address {{ item.firstName }} {{ item.lastName }} deleted successfully',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi91bml0cy5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osR0FBRyxFQUFFLElBQUk7SUFDVCxlQUFlLEVBQUUsa0JBQWtCO0lBQ25DLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSx3UUFBd1E7SUFDOVEsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLGNBQWM7UUFDckIsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxJQUFJLEVBQUUsc1BBQXNQO0tBQzdQO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLFdBQVc7UUFDbEIsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxRQUFRLEVBQUU7UUFDUixlQUFlLEVBQUUsb0JBQW9CO1FBQ3JDLFVBQVUsRUFBRSwySkFBMko7UUFDdkssY0FBYyxFQUFFLHlDQUF5QztRQUN6RCxlQUFlLEVBQUUsMENBQTBDO1FBQzNELE1BQU0sRUFBRSwyQ0FBMkM7UUFDbkQsTUFBTSxFQUFFLDJDQUEyQztLQUNwRDtJQUNELElBQUksRUFBRTtRQUNKLFlBQVksRUFBRSxtQ0FBbUM7UUFDakQsY0FBYyxFQUFFLHlEQUF5RDtRQUN6RSxlQUFlLEVBQUUsZ0NBQWdDO0tBQ2xEO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLGFBQWE7UUFD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QixTQUFTLEVBQUUsZUFBZTtJQUUxQixJQUFJLEVBQUUsK0xBQStMO0lBQ3JNLE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxpQkFBaUI7UUFDeEIsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxjQUFjO0tBQ3RCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLGdCQUFnQjtLQUN4QjtJQUNELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRCxRQUFRLEVBQUU7UUFDUixNQUFNLEVBQ0osdUVBQXVFO1FBQ3pFLE1BQU0sRUFDSix1RUFBdUU7UUFDekUsTUFBTSxFQUNKLHVFQUF1RTtRQUN6RSxXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLE9BQU8sRUFDTCx1RUFBdUU7S0FDMUU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXQgPSB7XG4gIGhlYWRlcjogJ0FsbCB1bml0cyAoe3tjb3VudH19KScsXG4gIHVuaXQ6ICdVbml0JyxcbiAgbmFtZTogJ05hbWUnLFxuICB1aWQ6ICdJRCcsXG4gIGFwcHJvdmFsUHJvY2VzczogJ0FwcHJvdmFsIHByb2Nlc3MnLFxuICBwYXJlbnRVbml0OiAnUGFyZW50IFVuaXQnLFxuICBhY3RpdmU6ICdTdGF0dXMnLFxuICBoaW50OiAnVW5pdHMgcmVwcmVzZW50IGRlcGFydG1lbnRzLCBzdG9yZXMsIHJlZ2lvbnMsIG9yIGFueSBvdGhlciBsb2dpY2FsIGdyb3VwaW5nIHRoYXQgbWFrZXMgc2Vuc2UgdG8geW91LiBUaGUgY29zdCBjZW50ZXJzIGFuZCBkZWxpdmVyeSBhZGRyZXNzZXMgYXZhaWxhYmxlIHRvIGEgYnV5ZXIgd2hlbiBjaGVja2luZyBvdXQsIGRlcGVuZCBvbiB0aGVpciB1bml0LiBVc2VycyBoYXZlIGFjY2VzcyB0byBhbGwgY2hpbGQgdW5pdHMgb2YgdGhlaXIgcHJpbWFyeSB1bml0LicsXG4gIGRldGFpbHM6IHtcbiAgICB0aXRsZTogJ1VuaXQgRGV0YWlscycsXG4gICAgc3VidGl0bGU6ICdVbml0OiB7eyBpdGVtLm5hbWUgfX0nLFxuICAgIGhpbnQ6ICdVbml0cyByZXByZXNlbnQgZGVwYXJ0bWVudHMsIHN0b3JlcywgcmVnaW9ucywgb3IgYW55IG90aGVyIGxvZ2ljYWwgZ3JvdXBpbmcgdGhhdCBtYWtlcyBzZW5zZSB0byB5b3UuIERpc2FibGluZyBhIHVuaXQgZGlzYWJsZXMgYWxsIGNoaWxkcmVuIG9mIHRoZSB1bml0LCBpbmNsdWRpbmcgY2hpbGQgdW5pdHMsIHVzZXJzLCBhcHByb3ZlcnMsIGFuZCBjb3N0IGNlbnRlcnMuIERpc2FibGVkIHVuaXRzIGNhbm5vdCBiZSBlZGl0ZWQuJyxcbiAgfSxcbiAgZWRpdDoge1xuICAgIHRpdGxlOiAnRWRpdCBVbml0JyxcbiAgICBzdWJ0aXRsZTogJ1VuaXQ6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIH0sXG4gIGNyZWF0ZToge1xuICAgIHRpdGxlOiAnQ3JlYXRlIFVuaXQnLFxuICAgIHN1YnRpdGxlOiAnJyxcbiAgfSxcblxuICBtZXNzYWdlczoge1xuICAgIGRlYWN0aXZhdGVUaXRsZTogJ0Rpc2FibGUgdGhpcyB1bml0PycsXG4gICAgZGVhY3RpdmF0ZTogYERpc2FibGluZyBhIHVuaXQgaGFzIHdpZGUtcmFuZ2luZyBhZmZlY3RzIG9uIHlvdXIgY29tbWVyY2Ugb3JnYW5pemF0aW9uLiBBTEwgdGhlIHVuaXQncyBjaGlsZCB1bml0cywgdXNlcnMsIGJ1ZGdldHMsIGFuZCBjb3N0IGNlbnRlcnMgd2lsbCBhbHNvIGRpc2FibGVkLmAsXG4gICAgY29uZmlybUVuYWJsZWQ6ICdVbml0IHt7aXRlbS5uYW1lfX0gZW5hYmxlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNvbmZpcm1EaXNhYmxlZDogJ1VuaXQge3tpdGVtLm5hbWV9fSBkaXNhYmxlZCBzdWNjZXNzZnVsbHknLFxuICAgIHVwZGF0ZTogJ1VuaXQge3sgaXRlbS5uYW1lIH19IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBjcmVhdGU6ICdVbml0IHt7IGl0ZW0ubmFtZSB9fSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZEVkaXQ6ICdFbmFibGUgdGhlIHVuaXQgdG8gYWxsb3cgZWRpdGluZy4nLFxuICAgIGRpc2FibGVkRW5hYmxlOiAnUGFyZW50IG11c3QgYmUgZW5hYmxlZCBiZWZvcmUgdGhpcyB1bml0IG1heSBiZSBlbmFibGVkLicsXG4gICAgZGlzYWJsZWREaXNhYmxlOiAnUm9vdCB1bml0IGNhbiBub3QgYmUgZGlzYWJsZWQuJyxcbiAgfSxcblxuICBsaW5rczoge1xuICAgIHVuaXRzOiAnQ2hpbGQgVW5pdHMnLFxuICAgIHVzZXJzOiAnVXNlcnMnLFxuICAgIGFwcHJvdmVyczogJ0FwcHJvdmVycycsXG4gICAgc2hpcHBpbmdBZGRyZXNzZXM6ICdEZWxpdmVyeSBBZGRyZXNzZXMnLFxuICAgIGNvc3RDZW50ZXJzOiAnQ29zdCBDZW50ZXJzJyxcbiAgfSxcblxuICB0cmVlOiB7XG4gICAgZXhwYW5kQWxsOiAnRXhwYW5kIGFsbCcsXG4gICAgY29sbGFwc2VBbGw6ICdDb2xsYXBzZSBhbGwnLFxuICAgIGV4cGFuZDogJ0V4cGFuZCcsXG4gICAgY29sbGFwc2U6ICdjb2xsYXBzZScsXG4gIH0sXG5cbiAgY2hpbGRyZW46IHtcbiAgICBjcmVhdGU6IHtcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIGNoaWxkIHVuaXQnLFxuICAgICAgc3VidGl0bGU6ICcnLFxuICAgIH0sXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIGNyZWF0ZTogJ1VuaXQge3sgaXRlbS5uYW1lIH19IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB9LFxuICB9LFxuXG4gIGNvc3RDZW50ZXJzOiB7XG4gICAgY3JlYXRlOiB7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBjb3N0IGNlbnRlcicsXG4gICAgICBzdWJ0aXRsZTogJycsXG4gICAgfSxcbiAgfSxcblxuICBmb3JtOiB7XG4gICAgcGFyZW50T3JnVW5pdDogJ1BhcmVudCBidXNpbmVzcyB1bml0JyxcbiAgICBjcmVhdGU6ICdDcmVhdGUgVW5pdCcsXG4gICAgcGFyZW50T3JnVW5pdE5vdGVzOlxuICAgICAgJ1RoaXMgdW5pdCBpcyB0aGUgdG9wLWxldmVsIHVuaXQgZm9yIHlvdXIgb3JnYW5pemF0aW9uLiBJdCBjYW5ub3QgYmUgYXNzaWduZWQgdG8gYW5vdGhlciB1bml0LicsXG4gIH0sXG4gIHVzZXJzOiB7XG4gICAgaGVhZGVyOiAnVXNlcnMgaW4ge3tjb2RlfX0nLFxuICAgIGNoYW5nZVVzZXJSb2xlczogJ0NoYW5nZSB1c2VyIHJvbGVzJyxcbiAgICBuZXdVc2VyOiAnTmV3IHVzZXInLFxuICB9LFxuICBhc3NpZ25Sb2xlczoge1xuICAgIGhlYWRlcjogJ01hbmFnZSByb2xlcyBpbiB7e2NvZGV9fScsXG4gICAgaW5zdHJ1Y3Rpb25zOiB7XG4gICAgICBjaGVjazogXCJUbyBhc3NpZ24gYSByb2xlIHRvIGEgdXNlciwgc2VsZWN0IHRoZSByb2xlJ3MgY2hlY2sgYm94LlwiLFxuICAgICAgdW5jaGVjazogXCJUbyByZW1vdmUgYSByb2xlLCBjbGVhciB0aGUgcm9sZSdzIGNoZWNrIGJveC5cIixcbiAgICAgIGNoYW5nZXM6ICdDaGFuZ2VzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LicsXG4gICAgfSxcbiAgfSxcbiAgYXBwcm92ZXJzOiB7XG4gICAgaGVhZGVyOiAnQXBwcm92ZXJzIGluIHt7Y29kZX19JyxcbiAgICBhc3NpZ246ICdNYW5hZ2UgYXBwcm92ZXJzJyxcbiAgICBuZXc6ICdOZXcgYXBwcm92ZXInLFxuICB9LFxuICBhc3NpZ25BcHByb3ZlcnM6IHtcbiAgICBoZWFkZXI6ICdNYW5hZ2UgYXBwcm92ZXJzIGluIHt7Y29kZX19JyxcbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIGNoZWNrOiBcIlRvIGFzc2lnbiBhbiBhcHByb3ZlciB0byB0aGlzIHVuaXQsIHNlbGVjdCB0aGUgdXNlcidzIGNoZWNrIGJveC5cIixcbiAgICAgIHVuY2hlY2s6IFwiVG8gcmVtb3ZlIGFuIGFwcHJvdmVyLCBjbGVhciB0aGUgdXNlcidzIGNoZWNrIGJveC5cIixcbiAgICAgIGNoYW5nZXM6ICdDaGFuZ2VzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LicsXG4gICAgfSxcbiAgICBoaW50OiBcIlVzZXJzIGRpc3BsYXllZCB1bmRlciB0aGUgQXBwcm92ZXJzIGxpc3QgYXJlIGFzc2lnbmVkIGFwcHJvdmFsIHByaXZpbGVnZXMgZm9yIHRoZSBidXllcnMgb2YgdGhpcyB1bml0IGFuZCBvZiBjaGlsZCB1bml0cy4gTm90ZSB0aGF0IGEgdXNlciB3aG8gaGFzIHRoZSBhcHByb3ZlciByb2xlIGlzIHNlcGFyYXRlIGZyb20gYW4gYXBwcm92ZXIgd2hvIGFwcGVhcnMgdW5kZXIgdGhlIEFwcHJvdmVycyBsaXN0LiBJZiBhbiBhcHByb3ZlciBkb2Vzbid0IGV4aXN0IGZvciBhIHVuaXQsIG9yIGlmIGFwcHJvdmVycyBkbyBub3QgaGF2ZSBzdWZmaWNpZW50IGFwcHJvdmFsIHB1cmNoYXNlIHByaXZpbGVnZXMsIGFuIGFwcHJvdmVyIGhpZ2hlciB1cCB0aGUgdW5pdCBoaWVyYXJjaHkgaXMgZm91bmQsIHVudGlsIGFuIGFkbWluaXN0cmF0aW9uIGlzIGNob3Nlbi5cIixcbiAgfSxcblxuICBicmVhZGNydW1iczoge1xuICAgIGxpc3Q6ICdBbGwgdW5pdHMnLFxuICAgIGRldGFpbHM6ICd7e25hbWV9fScsXG4gICAgY2hpbGRyZW46ICdDaGlsZCB1bml0cycsXG4gICAgdXNlcnM6ICdVc2VycycsXG4gICAgYXBwcm92ZXJzOiAnQXBwcm92ZXJzJyxcbiAgICBhZGRyZXNzZXM6ICdEZWxpdmVyeSBhZGRyZXNzZXMnLFxuICAgIGFkZHJlc3NEZXRhaWxzOiAne3tmb3JtYXR0ZWRBZGRyZXNzfX0nLFxuICAgIGNvc3RDZW50ZXJzOiAnQ29zdCBDZW50ZXJzJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVbml0Q2hpbGRyZW4gPSB7XG4gIHRpdGxlOiAnQ2hpbGQgdW5pdHMnLFxuICBzdWJ0aXRsZTogJ1VuaXQ6IHt7aXRlbS5uYW1lfX0nLFxuICBpbmZvOiB7XG4gICAgZGlzYWJsZWRDcmVhdGU6ICdDaGlsZCB1bml0IGNhbiBub3QgYmUgY3JlYXRlZCBmb3IgZGlzYWJsZWQgdW5pdC4nLFxuICB9LFxuICBoaW50OiAnVW5pdHMgcmVwcmVzZW50IGRlcGFydG1lbnRzLCBzdG9yZXMsIHJlZ2lvbnMsIG9yIGFueSBvdGhlciBsb2dpY2FsIGdyb3VwaW5nIHRoYXQgbWFrZXMgc2Vuc2UgdG8geW91LiBVc2VycyBcImluaGVyaXRcIiBjaGlsZCB1bml0cywgbWVhbmluZyBidXllcnMgaGF2ZSBhY2Nlc3MgdG8gY29zdCBjZW50ZXJzIGFuZCBkZWxpdmVyeSBhZGRyZXNzZXMgb2YgY2hpbGQgdW5pdHMgd2hlbiBjaGVja2luZyBvdXQuJyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVbml0QXNzaWduZWRSb2xlcyA9IHtcbiAgaGVhZGVyOiAnTWFuYWdlIHJvbGVzIGluIHt7Y29kZX19JyxcbiAgbmFtZTogJ05hbWUnLFxuICBlbWFpbDogJ0VtYWlsJyxcbiAgcm9sZXM6ICdSb2xlcycsXG4gIHJvbGVDdXN0b21lcjogJ0N1c3RvbWVyJyxcbiAgcm9sZUFwcHJvdmVyOiAnQXBwcm92ZXInLFxuICByb2xlTWFuYWdlcjogJ01hbmFnZXInLFxuICByb2xlQWRtaW5pc3RyYXRvcjogJ0FkbWluJyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVbml0QXBwcm92ZXJzID0ge1xuICB0aXRsZTogJ01hbmFnZSBhcHByb3ZlcnMnLFxuICBzdWJ0aXRsZTogJ1VuaXQ6IHt7aXRlbS5uYW1lfX0nLFxuICBhc3NpZ25lZDogJ1VzZXIge3tpdGVtLm5hbWV9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnVXNlciB7e2l0ZW0ubmFtZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVbml0QXNzaWduZWRBcHByb3ZlcnMgPSB7XG4gIHRpdGxlOiAnQXNzaWduZWQgYXBwcm92ZXJzJyxcbiAgc3VidGl0bGU6ICdVbml0OiB7e2l0ZW0ubmFtZX19JyxcbiAgYXNzaWduZWQ6ICdVc2VyIHt7aXRlbS5uYW1lfX0gYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgdW5hc3NpZ25lZDogJ1VzZXIge3tpdGVtLm5hbWV9fSB1bmFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIGhpbnQ6IFwiVXNlcnMgZGlzcGxheWVkIHVuZGVyIHRoZSBBcHByb3ZlcnMgbGlzdCBhcmUgYXNzaWduZWQgYXBwcm92YWwgcHJpdmlsZWdlcyBmb3IgdGhlIGJ1eWVycyBvZiB0aGlzIHVuaXQgYW5kIG9mIGNoaWxkIHVuaXRzLiBOb3RlIHRoYXQgYSB1c2VyIHdobyBoYXMgdGhlIGFwcHJvdmVyIHJvbGUgaXMgc2VwYXJhdGUgZnJvbSBhbiBhcHByb3ZlciB3aG8gYXBwZWFycyB1bmRlciB0aGUgQXBwcm92ZXJzIGxpc3QuIElmIGFuIGFwcHJvdmVyIGRvZXNuJ3QgZXhpc3QgZm9yIGEgdW5pdCwgb3IgaWYgYXBwcm92ZXJzIGRvIG5vdCBoYXZlIHN1ZmZpY2llbnQgYXBwcm92YWwgcHVyY2hhc2UgcHJpdmlsZWdlcywgYW4gYXBwcm92ZXIgaGlnaGVyIHVwIHRoZSB1bml0IGhpZXJhcmNoeSBpcyBmb3VuZCwgdW50aWwgYW4gYWRtaW5pc3RyYXRpb24gaXMgY2hvc2VuLlwiLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBc3NpZ25lZFVzZXJzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIHVzZXJzJyxcbiAgc3VidGl0bGU6ICdVbml0OiB7e2l0ZW0ubmFtZX19Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVbml0VXNlcnMgPSB7XG4gIHRpdGxlOiAnQXNzaWduZWQgdXNlcnMnLFxuICBzdWJ0aXRsZTogJ1VuaXQ6IHt7aXRlbS5uYW1lfX0nLFxuICBpbmZvOiB7XG4gICAgZGlzYWJsZWRDcmVhdGU6ICdVc2VyIGNhbiBub3QgYmUgY3JlYXRlZCBmb3IgZGlzYWJsZWQgdW5pdC4nLFxuICB9LFxuICBoaW50OiAnVXNlcnMgYXJlIHRoZSBidXllcnMsIGFwcHJvdmVycywgbWFuYWdlcnMsIGFuZCBhZG1pbmlzdHJhdG9ycyBvZiB5b3VyIG9yZ2FuaXphdGlvbi4gRWFjaCB1c2VyIGlzIGFzc2lnbmVkIGEgcm9sZSBmb3IgbWFraW5nIG9yIGFwcHJvdmluZyBwdXJjaGFzZXMuIFVzZXJzIFwiaW5oZXJpdFwiIGNoaWxkIHVuaXRzLCBtZWFuaW5nIGJ1eWVycyBoYXZlIGFjY2VzcyB0byBjb3N0IGNlbnRlcnMgYW5kIGRlbGl2ZXJ5IGFkZHJlc3NlcyBvZiBjaGlsZCB1bml0cyB3aGVuIGNoZWNraW5nIG91dC4nLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRVc2VyUm9sZXMgPSB7XG4gIHRpdGxlOiAnVXNlciByb2xlcyBhbmQgcmlnaHRzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7e2l0ZW0ubmFtZX19JyxcbiAgbWVzc2FnZXM6IHtcbiAgICByb2xlc1VwZGF0ZWQ6ICdSb2xlcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCBmb3Ige3tpdGVtLm5hbWV9fScsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVW5pdENvc3RDZW50ZXJzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIGNvc3QgY2VudGVycycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZENyZWF0ZTogJ0Nvc3QgY2VudGVyIGNhbiBub3QgYmUgY3JlYXRlZCBmb3IgZGlzYWJsZWQgdW5pdC4nLFxuICB9LFxuICBoaW50OiAnQWxsIG9yZGVycyBwbGFjZWQgdGhyb3VnaCB5b3VyIG9yZ2FuaXphdGlvblxcJ3MgcHVyY2hhc2UgYWNjb3VudCBhcmUgbGlua2VkIHRvIGEgY29zdCBjZW50ZXIgZm9yIHRyYWNraW5nIHB1cnBvc2VzLiBBIGJ1eWVyIHNlbGVjdHMgYSBjb3N0IGNlbnRlciB3aGVuIGNoZWNraW5nIG91dCB1c2luZyB0aGUgXCJBY2NvdW50XCIgcHVyY2hhc2UgbWV0aG9kLiBFYWNoIHVuaXQgY2FuIGhhdmUgbXVsdGlwbGUgY29zdCBjZW50ZXJzLCBidXQgYSBzaW5nbGUgY29zdCBjZW50ZXIgY2FuIG9ubHkgYmUgYXNzaWduZWQgdG8gYSBzaW5nbGUgdW5pdC4gVG8gZGVmaW5lIHVsdGltYXRlIHNwZW5kaW5nIGxpbWl0cywgYnVkZ2V0cyBhcmUgYXNzaWduZWQgdG8gY29zdCBjZW50ZXJzLiAnLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBZGRyZXNzID0ge1xuICB0aXRsZTogJ0RlbGl2ZXJ5IGFkZHJlc3NlcycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG5cbiAgY291bnRyeTogJ0NvdW50cnkvUmVnaW9uJyxcbiAgdGl0bGVzOiAnVGl0bGUnLFxuICBmaXJzdE5hbWU6ICdGaXJzdCBuYW1lJyxcbiAgbGFzdE5hbWU6ICdMYXN0IG5hbWUnLFxuICBmb3JtYXR0ZWRBZGRyZXNzOiAnQWRkcmVzcycsXG4gIGFkZHJlc3MxOiAnQWRkcmVzcycsXG4gIGFkZHJlc3MyOiAnMm5kIGFkZHJlc3MgKG9wdGlvbmFsKScsXG4gIGNpdHk6ICdDaXR5JyxcbiAgc3RhdGU6ICdTdGF0ZScsXG4gIHppcENvZGU6ICdaaXAgY29kZScsXG4gIHBob25lTnVtYmVyOiAnUGhvbmUgbnVtYmVyIChvcHRpb25hbCknLFxuICBzdHJlZXRBZGRyZXNzOiAnU3RyZWV0IEFkZHJlc3MnLFxuICBhcHRTdWl0ZTogJ0FwdCwgU3VpdGUnLFxuICBzZWxlY3RPbmU6ICdTZWxlY3QgT25lLi4uJyxcblxuICBoaW50OiAnV2hlbiBhIGJ1eWVyIGlzIGNoZWNraW5nIG91dCB1c2luZyB0aGUgXCJBY2NvdW50XCIgcHVyY2hhc2UgbWV0aG9kLCB0aGV5IG11Y2ggY2hvb3NlIGEgY29zdCBjZW50ZXIuIFRoZSBkZWxpdmVyeSBhZGRyZXNzZXMgYXZhaWxhYmxlIHRvIHRoZSBidXllciBkZXBlbmQgb24gdGhlIHVuaXQgb2YgdGhlIGNvc3QgY2VudGVyIGNob3Nlbi4nLFxuICBkZXRhaWxzOiB7XG4gICAgdGl0bGU6ICdBZGRyZXNzIGRldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIH0sXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgQWRkcmVzcycsXG4gIH0sXG4gIGNyZWF0ZToge1xuICAgIHRpdGxlOiAnQ3JlYXRlIEFkZHJlc3MnLFxuICB9LFxuICBmb3JtOiB7XG4gICAgc3VidGl0bGU6ICdVbml0OiB7e2l0ZW0ubmFtZX19JyxcbiAgfSxcbiAgbWVzc2FnZXM6IHtcbiAgICBjcmVhdGU6XG4gICAgICAnQWRkcmVzcyB7eyBpdGVtLmZpcnN0TmFtZSB9fSB7eyBpdGVtLmxhc3ROYW1lIH19IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGU6XG4gICAgICAnQWRkcmVzcyB7eyBpdGVtLmZpcnN0TmFtZSB9fSB7eyBpdGVtLmxhc3ROYW1lIH19IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBkZWxldGU6XG4gICAgICAnVGhlIGFkZHJlc3MgY2Fubm90IGJlIGJyb3VnaHQgYmFjay4gRXhpc3Rpbmcgb3JkZXJzIGFyZSBub3QgYWZmZWN0ZWQuJyxcbiAgICBkZWxldGVUaXRsZTogJ0RlbGV0ZSB0aGlzIGFkZHJlc3M/JyxcbiAgICBkZWxldGVkOlxuICAgICAgJ0FkZHJlc3Mge3sgaXRlbS5maXJzdE5hbWUgfX0ge3sgaXRlbS5sYXN0TmFtZSB9fSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG59O1xuIl19