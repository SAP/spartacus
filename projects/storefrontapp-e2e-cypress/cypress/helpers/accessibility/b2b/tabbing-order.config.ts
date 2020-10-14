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
      value: orderApprovalSampleData.none;
      type: TabbingOrderTypes.LINK,
    },
    {
      value:
        orderApprovalSampleData.approvalOrderList.orderApprovals[0].order
          .orgCustomer.name,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: orderApprovalSampleData.orderPlacedDate,
      type: TabbingOrderTypes.LINK,
    },
    {
      value: orderApprovalSampleData.statusPendingApproval,
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

  orderApprovalForm: [
    {
      value: 'comment',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Approve',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
  orderRejectionForm: [
    {
      value: 'comment',
      type: TabbingOrderTypes.FORM_FIELD,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.LINK,
    },
    {
      value: 'Reject',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Angle Grinder RT-AG 115',
      type: TabbingOrderTypes.LINK,
    },
  ],
};
