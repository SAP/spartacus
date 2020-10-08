import * as orderApprovalSampleData from '../../../sample-data/b2b-order-approval';
import { TabbingOrderConfig, TabbingOrderTypes } from '../tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  orderApprovalList: [
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
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
    {
      type: TabbingOrderTypes.NG_SELECT,
    },
  ],

  orderApprovalDetail: [
    {
      value: 'Back To List',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: ' Reject Order... ',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: ' Approve Order... ',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
};
