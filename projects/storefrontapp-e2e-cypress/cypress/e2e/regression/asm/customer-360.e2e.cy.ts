/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as addressBook from '../../../helpers/address-book';
import * as asm from '../../../helpers/asm';
import * as checkout from '../../../helpers/checkout-flow';
import {
  cheapProduct,
  SampleProduct,
  SampleUser,
} from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module - Customer 360', () => {
  let customer: SampleUser;

  function startCustomerEmulation(): void {
    // cy.session('Emulation - Customer 360', () => {
    cy.visit('/');

    customer = checkout.registerUser(false);

    // storefront should have ASM UI disabled by default
    cy.get('cx-asm-main-ui').should('not.exist');

    cy.log('--> Agent logging in');
    checkout.visitHomePage('asm=true');
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('be.visible');

    asm.agentLogin();

    cy.log('--> Starting customer emulation');
    asm.startCustomerEmulation(customer);
    // });
  }

  before(() => {
    clearAllStorage();

    const asmConfig = {
      asm: {
        customer360: {
          tabs: [
            {
              i18nNameKey: 'asm.customer360.overviewTab',
              components: [
                {
                  component: 'AsmCustomer360SavedCartComponent',
                },
                {
                  component: 'AsmCustomer360ActiveCartComponent',
                },
                {
                  component: 'AsmCustomer360ProductInterestsComponent',
                },
              ],
            },
            {
              i18nNameKey: 'asm.customer360.profileTab',
              components: [
                {
                  component: 'AsmCustomer360ProfileComponent',
                },
              ],
            },
            {
              i18nNameKey: 'asm.customer360.activityTab',
              components: [
                {
                  component: 'AsmCustomer360CustomerActivityComponent',
                  config: { pageSize: 5 },
                },
                {
                  component: 'AsmCustomer360ProductReviewsComponent',
                  requestData: {
                    type: 'c360ReviewList',
                  },
                  config: { pageSize: 5 },
                },
              ],
            },
            {
              i18nNameKey: 'asm.customer360.mapsTab',
              components: [
                {
                  component: 'AsmCustomer360MapComponent',
                  requestData: {
                    type: 'c360StoreLocation',
                  },
                  config: {
                    // this key should provide from the customer
                    googleMapsApiKey: 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8',
                    storefinderRadius: 10000000,
                    pageSize: 10,
                  },
                },
              ],
            },
          ],
        },
      },
    };

    cy.cxConfig(asmConfig);
  });

  after(() => {
    // clear all saved carts
  });

  it('should open Customer 360 dialog', () => {
    startCustomerEmulation();

    cy.log('--> Confirm 360 dialog opens');
    cy.get('button')
      .contains('360 Customer View')
      .click()
      .get('.cx-asm-customer-360');

    cy.log('--> Close dialog');

    cy.get('button.close').click();

    cy.log('--> Add items to cart');
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCart();

    cy.get('button.close').click();

    cy.log('--> Open save cart dialog');

    cy.get('cx-mini-cart')
      .click()
      .get('cx-add-to-saved-cart')
      .contains('Save cart for later')
      .click();

    cy.log('--> Submit save cart dialog');

    const saveCartRequest = asm.listenForCartSaveRequest();

    cy.get('cx-saved-cart-form-dialog input[required]')
      .type('Saved cart')
      .get('cx-saved-cart-form-dialog button')
      .contains('Save')
      .click();

    cy.wait(saveCartRequest).its('response.statusCode').should('eq', 200);

    cy.log('--> Add another product');

    const product: SampleProduct = {
      code: '482105',
      name: 'InfoLITHIUM Battery, NP-FM55H',
    };
    cy.visit(`/product/${product.code}`);
    checkout.addCheapProductToCart(product);

    cy.get('button.close').click();

    asm.fillPersonalDetails(customer);

    cy.log('--> Open customer 360 dialog to analyze added info');
    cy.get('button')
      .contains('360 Customer View')
      .click()
      .get('.cx-asm-customer-360');

    cy.log('--> Test active cart');
    cy.get('cx-asm-customer-active-cart')
      .find('cx-asm-product-item')
      .first()
      .within(() => {
        cy.get('.cx-asm-product-item-name').should('have.text', product.name);
        cy.get('.cx-asm-product-item-code').should(
          'have.text',
          ` ${product.code} `
        );
      });

    cy.log('--> Test last saved cart');
    cy.get('cx-asm-customer-saved-cart')
      .find('cx-asm-product-item')
      .first()
      .within(() => {
        cy.get('.cx-asm-product-item-name').should(
          'have.text',
          cheapProduct.name
        );
        cy.get('.cx-asm-product-item-code').should(
          'have.text',
          ` ${cheapProduct.code} `
        );
      });

    cy.log('--> Test profile tab');
    cy.get('.cx-tab-header')
      .contains('Profile')
      .click()
      .get('cx-asm-customer-profile')
      .within(() => {
        const { phone, address } = addressBook.newAddress;

        cy.get('.cx-asm-profile-container.delivery-address').within(() => {
          const { line1, line2, postal } = address;
          cy.get('.address-line1').should('have.text', ` ${line1} `);
          cy.get('.address-line2').should('have.text', ` ${line2} `);
          cy.get('.address-postal').should('have.text', ` ${postal} `);
        });

        cy.get('.cx-asm-profile-container.profile-phone1').should(
          'have.text',
          ` ${phone} `
        );
      });

    cy.log('--> Test activity tab');
    cy.get('.cx-tab-header')
      .contains('Activity')
      .click()
      .get('cx-asm-customer-activity')
      .find('table')
      .within(() => {
        cy.get('.cx-asm-customer-table-row')
          .first()
          .find('td')
          .first()
          .should('have.text', 'Saved Cart');

        cy.get('.cx-asm-customer-table-row')
          .eq(1)
          .find('td')
          .first()
          .should('have.text', 'Cart');
      });

    cy.log('--> Test map tab');
    cy.get('.cx-tab-header').contains('Maps').click();
  });
});
