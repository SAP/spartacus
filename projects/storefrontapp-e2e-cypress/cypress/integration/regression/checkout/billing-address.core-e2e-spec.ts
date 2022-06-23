import * as checkout from '../../../helpers/checkout-flow';
import { Address } from '../../../helpers/checkout-forms';
import { user } from '../../../sample-data/checkout-flow';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';

const usaAddress: Address = {
  city: 'Los Angeles',
  line1: '340 Main Street',
  line2: '',
  country: 'United States',
  postal: '90291',
  state: 'California',
};

const canadaAddress: Address = {
  city: 'Montreal',
  line1: '111 Boulevard Robert-Bourassa',
  line2: '',
  country: 'Canada',
  postal: '9000',
  state: 'Quebec',
};

const polandAddress: Address = {
  city: 'Wrocław',
  line1: 'Dmowskiego 17',
  line2: '',
  country: 'Poland',
  postal: '50-203',
};

context('Payment billing address', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should go to checkout', () => {
    checkout.registerUser();
    verifyGlobalMessageAfterRegistration();
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndLogin();
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.verifyReviewOrderPage();
  });

  it('should add new payment forms', () => {
    checkout.goToPaymentDetails();
    checkout.clickAddNewPayment();
    checkout.fillPaymentFormWithCheapProduct(user, {
      ...user,
      address: usaAddress,
    });
    checkout.verifyReviewOrderPage();
    checkout.goToPaymentDetails();
    checkout.clickAddNewPayment();
    checkout.fillPaymentFormWithCheapProduct(user, {
      ...user,
      address: canadaAddress,
    });
    checkout.verifyReviewOrderPage();
    checkout.goToPaymentDetails();
    checkout.clickAddNewPayment();
    checkout.fillPaymentFormWithCheapProduct(user, {
      ...user,
      address: polandAddress,
    });
    checkout.verifyReviewOrderPage();
  });
});
