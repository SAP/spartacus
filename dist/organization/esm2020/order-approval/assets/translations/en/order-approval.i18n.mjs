/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orderApprovalDetails = {
    back: 'Back To List',
    showForm_APPROVE: 'Approve Order...',
    showForm_REJECT: 'Reject Order...',
    form: {
        title_APPROVE: 'Approve order {{orderCode}} totalling {{orderTotal}}',
        title_REJECT: 'Reject order {{orderCode}} totalling {{orderTotal}}',
        submit_APPROVE: 'Approve',
        submit_REJECT: 'Reject',
        cancel: 'Cancel',
        comment_APPROVE: {
            label: 'Comment (optional, maximum 255 characters)',
            placeholder: '',
        },
        comment_REJECT: {
            label: 'Comment (maximum 255 characters)',
            placeholder: '',
        },
    },
    permissionResults: {
        header: 'Customer Approval Details',
        permission: 'Permission',
        approver: 'Approver',
        status: 'Status',
        approverComments: 'Approver Comments',
        noApprovalComments: 'None',
        permissionType_B2BBudgetExceededPermission: 'The budget associated with the chosen cost center has been exceeded',
        permissionType_B2BOrderThresholdPermission: 'Order total exceeded the per-order limit',
        permissionType_B2BOrderThresholdTimespanPermission: 'Order total exceeded the per-timespan limit',
    },
};
export const orderApprovalList = {
    orderCode: 'Order #',
    POCode: 'PO #',
    placedBy: 'Placed by',
    date: 'Date',
    status: 'Status',
    total: 'Total',
    none: 'None',
    emptyList: 'There are no orders to approve at this time.',
    orderApprovalList: 'Order Approval List',
};
export const orderApprovalGlobal = {
    notification: {
        noSufficientPermissions: 'No sufficient permissions to access this page.',
    },
};
export const orderApproval = {
    orderApprovalDetails,
    orderApprovalList,
    orderApprovalGlobal,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vb3JkZXItYXBwcm92YWwvYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi9vcmRlci1hcHByb3ZhbC5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRztJQUNsQyxJQUFJLEVBQUUsY0FBYztJQUNwQixnQkFBZ0IsRUFBRSxrQkFBa0I7SUFDcEMsZUFBZSxFQUFFLGlCQUFpQjtJQUNsQyxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUUsc0RBQXNEO1FBQ3JFLFlBQVksRUFBRSxxREFBcUQ7UUFDbkUsY0FBYyxFQUFFLFNBQVM7UUFDekIsYUFBYSxFQUFFLFFBQVE7UUFDdkIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsZUFBZSxFQUFFO1lBQ2YsS0FBSyxFQUFFLDRDQUE0QztZQUNuRCxXQUFXLEVBQUUsRUFBRTtTQUNoQjtRQUNELGNBQWMsRUFBRTtZQUNkLEtBQUssRUFBRSxrQ0FBa0M7WUFDekMsV0FBVyxFQUFFLEVBQUU7U0FDaEI7S0FDRjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLE1BQU0sRUFBRSwyQkFBMkI7UUFDbkMsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsZ0JBQWdCLEVBQUUsbUJBQW1CO1FBQ3JDLGtCQUFrQixFQUFFLE1BQU07UUFDMUIsMENBQTBDLEVBQ3hDLHFFQUFxRTtRQUN2RSwwQ0FBMEMsRUFDeEMsMENBQTBDO1FBQzVDLGtEQUFrRCxFQUNoRCw2Q0FBNkM7S0FDaEQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUc7SUFDL0IsU0FBUyxFQUFFLFNBQVM7SUFDcEIsTUFBTSxFQUFFLE1BQU07SUFDZCxRQUFRLEVBQUUsV0FBVztJQUNyQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsOENBQThDO0lBQ3pELGlCQUFpQixFQUFFLHFCQUFxQjtDQUN6QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUc7SUFDakMsWUFBWSxFQUFFO1FBQ1osdUJBQXVCLEVBQUUsZ0RBQWdEO0tBQzFFO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUMzQixvQkFBb0I7SUFDcEIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtDQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZGVyQXBwcm92YWxEZXRhaWxzID0ge1xuICBiYWNrOiAnQmFjayBUbyBMaXN0JyxcbiAgc2hvd0Zvcm1fQVBQUk9WRTogJ0FwcHJvdmUgT3JkZXIuLi4nLFxuICBzaG93Rm9ybV9SRUpFQ1Q6ICdSZWplY3QgT3JkZXIuLi4nLFxuICBmb3JtOiB7XG4gICAgdGl0bGVfQVBQUk9WRTogJ0FwcHJvdmUgb3JkZXIge3tvcmRlckNvZGV9fSB0b3RhbGxpbmcge3tvcmRlclRvdGFsfX0nLFxuICAgIHRpdGxlX1JFSkVDVDogJ1JlamVjdCBvcmRlciB7e29yZGVyQ29kZX19IHRvdGFsbGluZyB7e29yZGVyVG90YWx9fScsXG4gICAgc3VibWl0X0FQUFJPVkU6ICdBcHByb3ZlJyxcbiAgICBzdWJtaXRfUkVKRUNUOiAnUmVqZWN0JyxcbiAgICBjYW5jZWw6ICdDYW5jZWwnLFxuICAgIGNvbW1lbnRfQVBQUk9WRToge1xuICAgICAgbGFiZWw6ICdDb21tZW50IChvcHRpb25hbCwgbWF4aW11bSAyNTUgY2hhcmFjdGVycyknLFxuICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgIH0sXG4gICAgY29tbWVudF9SRUpFQ1Q6IHtcbiAgICAgIGxhYmVsOiAnQ29tbWVudCAobWF4aW11bSAyNTUgY2hhcmFjdGVycyknLFxuICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgIH0sXG4gIH0sXG4gIHBlcm1pc3Npb25SZXN1bHRzOiB7XG4gICAgaGVhZGVyOiAnQ3VzdG9tZXIgQXBwcm92YWwgRGV0YWlscycsXG4gICAgcGVybWlzc2lvbjogJ1Blcm1pc3Npb24nLFxuICAgIGFwcHJvdmVyOiAnQXBwcm92ZXInLFxuICAgIHN0YXR1czogJ1N0YXR1cycsXG4gICAgYXBwcm92ZXJDb21tZW50czogJ0FwcHJvdmVyIENvbW1lbnRzJyxcbiAgICBub0FwcHJvdmFsQ29tbWVudHM6ICdOb25lJyxcbiAgICBwZXJtaXNzaW9uVHlwZV9CMkJCdWRnZXRFeGNlZWRlZFBlcm1pc3Npb246XG4gICAgICAnVGhlIGJ1ZGdldCBhc3NvY2lhdGVkIHdpdGggdGhlIGNob3NlbiBjb3N0IGNlbnRlciBoYXMgYmVlbiBleGNlZWRlZCcsXG4gICAgcGVybWlzc2lvblR5cGVfQjJCT3JkZXJUaHJlc2hvbGRQZXJtaXNzaW9uOlxuICAgICAgJ09yZGVyIHRvdGFsIGV4Y2VlZGVkIHRoZSBwZXItb3JkZXIgbGltaXQnLFxuICAgIHBlcm1pc3Npb25UeXBlX0IyQk9yZGVyVGhyZXNob2xkVGltZXNwYW5QZXJtaXNzaW9uOlxuICAgICAgJ09yZGVyIHRvdGFsIGV4Y2VlZGVkIHRoZSBwZXItdGltZXNwYW4gbGltaXQnLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyQXBwcm92YWxMaXN0ID0ge1xuICBvcmRlckNvZGU6ICdPcmRlciAjJyxcbiAgUE9Db2RlOiAnUE8gIycsXG4gIHBsYWNlZEJ5OiAnUGxhY2VkIGJ5JyxcbiAgZGF0ZTogJ0RhdGUnLFxuICBzdGF0dXM6ICdTdGF0dXMnLFxuICB0b3RhbDogJ1RvdGFsJyxcbiAgbm9uZTogJ05vbmUnLFxuICBlbXB0eUxpc3Q6ICdUaGVyZSBhcmUgbm8gb3JkZXJzIHRvIGFwcHJvdmUgYXQgdGhpcyB0aW1lLicsXG4gIG9yZGVyQXBwcm92YWxMaXN0OiAnT3JkZXIgQXBwcm92YWwgTGlzdCcsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JkZXJBcHByb3ZhbEdsb2JhbCA9IHtcbiAgbm90aWZpY2F0aW9uOiB7XG4gICAgbm9TdWZmaWNpZW50UGVybWlzc2lvbnM6ICdObyBzdWZmaWNpZW50IHBlcm1pc3Npb25zIHRvIGFjY2VzcyB0aGlzIHBhZ2UuJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmRlckFwcHJvdmFsID0ge1xuICBvcmRlckFwcHJvdmFsRGV0YWlscyxcbiAgb3JkZXJBcHByb3ZhbExpc3QsXG4gIG9yZGVyQXBwcm92YWxHbG9iYWwsXG59O1xuIl19