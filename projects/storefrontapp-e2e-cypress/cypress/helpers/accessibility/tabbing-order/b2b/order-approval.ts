import * as orderApprovalHelper from '../../../../helpers/b2b/b2b-order-approval';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

//const containerSelector = '.AccountPageTemplate';

export function approvalListTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getOrderApprovalList();
  cy.visit('/my-account/approval-dashboard');
  verifyTabbingOrder('cx-order-approval-list table', config);
}
