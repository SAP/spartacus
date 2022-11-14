import * as sampleData from '../../sample-data/b2b-order-details';
import * as quickOrder from "./b2b-quick-order";




export function loginB2bUnitOrderViewer() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccount);
}

export function loginB2bUnitOrderViewer2() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccount2);
}

export function loginB2bUnitOrderViewerManager() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccountManager);
}

export function loginB2bCommonUser() {
  cy.requireLoggedIn(sampleData.b2bUserAccount);
}


export function addOrder() {
  quickOrder.visitQuickOrderPage();
  quickOrder.addProductToTheList('3881074');
  quickOrder.addToCart();
  cy.visit(`/powertools-spa/en/USD/cart`);
  cy.contains('Proceed to Checkout').should('be.visible').click({force:true});
  cy.get('input[id="paymentType-ACCOUNT"]').click({force:true});
  cy.wait(100);
  cy.contains('Continue').should('be.visible').click({force:true});
  cy.wait(100);
  cy.wait(1000);
  cy.contains('Continue').should('be.visible').click();
  cy.wait(100);
  cy.get('div.col-md-12>button').eq(1).should('be.visible').click();
  cy.wait(1000);
  cy.get('input[ng-reflect-name=termsAndConditions]').should('be.visible').click({force:true});
  cy.wait(100);
  cy.get('form.cx-place-order-form>button').should('be.visible').click({force:true});
  cy.wait(100);
}
