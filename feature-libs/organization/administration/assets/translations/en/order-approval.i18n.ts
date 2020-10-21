export const orderApproval = {
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
