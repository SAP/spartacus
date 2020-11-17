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
    permissionType_B2BBudgetExceededPermission:
      'The budget associated with the chosen cost center has been exceeded',
    permissionType_B2BOrderThresholdPermission:
      'Order total exceeded the per-order limit',
    permissionType_B2BOrderThresholdTimespanPermission:
      'Order total exceeded the per-timespan limit',
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
