import { checkoutAsGuestWithVariantsTest } from '../../../helpers/checkout-as-guest-with-variants';
import { configureApparelProduct } from '../../../helpers/checkout-with-variants';

context('Checkout as guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    configureApparelProduct();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  checkoutAsGuestWithVariantsTest();

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
