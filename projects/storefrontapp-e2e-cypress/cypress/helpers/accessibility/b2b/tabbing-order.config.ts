import * as orderApprovalSampleData from '../../../sample-data/b2b-order-approval';
import { TabbingOrderConfig, TabbingOrderTypes } from '../tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  orderApprovalList: [
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order.code,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'None',
      type: TabbingOrderTypes.LINK,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order
          .orgCustomer.name,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'October 7, 2020',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Pending Approval',
      type: TabbingOrderTypes.LINK,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order
          .totalPrice.formattedValue,
      type: TabbingOrderTypes.LINK,
    },
  ],
};
