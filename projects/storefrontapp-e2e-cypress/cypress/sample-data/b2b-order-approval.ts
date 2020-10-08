export const ORDER_CODE = '00000001';

export const b2bApprover = {
  name: 'Hanna Schmidt',
  uid: 'hanna.schmidt@rustic-hw.com',
};
export const b2bUser = {
  name: 'William Hunter',
  uid: 'william.hunter@rustic-hw.com',
};

export const pendingOrder = {
  code: ORDER_CODE,
  permissionResults: [
    {
      approverName: b2bApprover.name,
      permissionType: {
        code: 'B2BBudgetExceededPermission',
        name: 'Budget Exceeded Permission',
      },
      statusDisplay: 'Pending Approval',
    },
    {
      approverName: b2bApprover.name,
      permissionType: {
        code: 'B2BOrderThresholdPermission',
        name: 'Allowed Order Threshold (per order)',
      },
      statusDisplay: 'Pending Approval',
    },
  ],
};

export const approvalOrderList = {
  orderApprovals: [
    {
      approvalDecisionRequired: false,
      code: '0000008V',
      order: {
        code: ORDER_CODE,
        created: '2020-10-07T21:15:27+0000',
        statusDisplay: 'pending.approval',
        orgCustomer: {
          uid: b2bUser.uid,
          name: b2bUser.name,
        },
      },
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 1,
  },
  sorts: [
    { code: 'byDate', selected: true },
    { code: 'byOrderNumber', selected: false },
  ],
};
