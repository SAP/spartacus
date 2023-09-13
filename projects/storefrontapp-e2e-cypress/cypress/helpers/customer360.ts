/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkout from '../helpers/checkout-flow';
import { SampleUser, getSampleUser } from '../sample-data/checkout-flow';
import * as customerTicketing from '../helpers/customer-ticketing/customer-ticketing';
import * as asm from '../helpers/asm';
import * as productDetails from '../helpers/product-details';
import { subscribeStockNotification } from './notification';

let user: SampleUser | undefined;

export function setup() {
  user = createUser();
  // signout the user before login to asm and emulate a user
  checkout.signOutUser();
  asmCustomerEmulation(user);
}

function createUser(): SampleUser {
  const user = registerUser();
  placeOrder();
  writeReview();
  saveCart();
  createTicket();
  // to test againt S7 change below 872912 to 1986316
  subscribeStockNotification('872912');
  addProductToCart();
  return user;
}

export function getUser(): SampleUser {
  return user;
}

function asmCustomerEmulation(user: SampleUser) {
  checkout.visitHomePage('asm=true');
  asm.agentLogin('asagent', 'pw4all');
  asm.startCustomerEmulation(user);
}

function registerUser(): SampleUser {
  checkout.visitHomePage();
  const user = checkout.registerUser(false, getSampleUser());
  checkout.loginUser(user);
  return user;
}

function placeOrder(): void {
  checkout.goToCheapProductDetailsPage();
  checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
  checkout.fillAddressFormWithCheapProduct();
  checkout.verifyDeliveryMethod();
  checkout.fillPaymentFormWithCheapProduct();
  checkout.verifyReviewOrderPage();
  checkout.placeOrderWithCheapProduct();
}

function saveCart(): void {
  checkout.goToProductDetailsPage();
  checkout.addProductToCart();
  cy.findByText(/view cart/i).click();
  cy.findByText(/save cart for later/i).click();
  cy.get('cx-saved-cart-form-dialog').within(() => {
    cy.get('[formcontrolname="name"]').type('Entering a name');
    cy.get('[formcontrolname="description"]').type('Entering a description');
  });
  cy.get('button[aria-label="Save"]').click();
}

function createTicket(): void {
  const testTicketDetails: customerTicketing.TestTicketDetails = {
    subject: 'Entering a subject',
    message: 'Typing a message',
    ticketCategory: {
      id: customerTicketing.TestCategory.complaint.toUpperCase(),
      name: customerTicketing.TestCategory.complaint,
    },
  };

  customerTicketing.visitElectronicTicketListingPage();
  customerTicketing.createTicket(testTicketDetails);
}

function addProductToCart(): void {
  checkout.goToProductDetailsPage();
  checkout.addProductToCart();
  cy.findByText(/view cart/i).click();
}

function writeReview(): void {
  checkout.goToProductDetailsPage();
  productDetails.verifyShowReviewsLink();
  productDetails.verifyReviewForm();
}

export function redirect(rowName: string) {
  cy.contains('tr', rowName).children().eq(1).click();
}
