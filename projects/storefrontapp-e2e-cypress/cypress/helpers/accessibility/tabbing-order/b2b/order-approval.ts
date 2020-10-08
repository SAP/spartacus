import * as orderApprovalHelper from '../../../../helpers/b2b/b2b-order-approval';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';
import { approvalOrderDetail } from '../../../../sample-data/b2b-order-approval';

export function approvalListTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getOrderApprovalList();
  cy.visit('/my-account/approval-dashboard');
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function approvalDetailTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}
