import * as orderApprovalHelper from '../../../../helpers/b2b/b2b-order-approval';
import { approvalOrderDetail } from '../../../../sample-data/b2b-order-approval';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

export function approvalListTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getStubbedOrderApprovalList();
  cy.visit('/my-account/approval-dashboard');
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function approvalDetailTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function approvalFormTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  cy.get('cx-order-approval-detail-form .btn-primary').eq(1).click();
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function rejectionFormTabbingOrder(config: TabElement[]) {
  orderApprovalHelper.getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  cy.get('cx-order-approval-detail-form .btn-primary').eq(0).click();
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}
