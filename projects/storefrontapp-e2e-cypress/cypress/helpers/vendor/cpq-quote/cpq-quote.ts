/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const READ_QUOTE = '@READ_QUOTE';
export const READ_VENDOR_QUOTE_LIST = '@READ_VENDOR_QUOTE_LIST';
export const READ_VENDOR_QUOTE = '@READ_VENDOR_QUOTE';
export const DOWNLOAD_ATTACHMENT = '@DOWNLOAD_ATTACHMENT';
export const UPDATE_QUOTE_ITEM = '@UPDATE_QUOTE_ITEM';
export const UPDATE_CART_ITEM = '@UPDATE_CART_ITEM';
export const DELETE_QUOTE_ITEM = '@DELETE_QUOTE_ITEM';
export const ADD_QUOTE_COMMENT = '@ADD_QUOTE_COMMENT';
export const PERFORM_QUOTE_ACTION = '@PERFORM_QUOTE_ACTION';
export const STATUS_SUBMITTED = 'Submitted';
export const STATUS_REQUESTED = 'Requested';
export const STATUS_CANCELED = 'Cancelled';
export const STATUS_DRAFT = 'Draft';
export const STATUS_VENDOR_QUOTE = 'Vendor Quote';
export const STATUS_BUYER_SUBMIT = 'status_buyer_submit';
export const STATUS_BUYER_CANCEL = 'status_buyer_cancel';
export const STATUS_BUYER_CHECKOUT = 'status_buyer_checkout';
export const STATUS_SALES_REPORTER_SUBMIT = 'status_sales_reporter_submit'; 

/**
 * Selectors
 */

const defaultAddToCartComponentSelector = 'cx-add-to-cart';
const listComponentSelector = 'cx-quote-list';
const defaultSavedCartListComponentSelector = 'cx-saved-cart-list';
const linksComponentSelector = 'cx-quote-links';
const headerOverviewComponentSelector = 'cx-quote-header-overview';
const commentsComponentSelector = 'cx-quote-comments';
const itemsComponentSelector = 'cx-quote-items';
const summaryActionsComponentSelector = 'cx-quote-summary-actions';
const requestButtonComponentSelector = 'cx-quote-request-button';
const defaultItemCounterComponentSelector = 'cx-item-counter';
const confirmDialogComponentSelector = 'cx-quote-confirm-dialog';
const defaultMessagingComponentSelector = 'cx-messaging';
const summarySellerEditComponentSelector = 'cx-quote-summary-seller-edit';
 
import * as cart from '../../../helpers/cart';
/**
 * Navigates to the mocked quote from vendor via my account.
 */


/**
 * Creates a simple log with ##### comment <functionName> ######
 *
 * @param comment Could be the description of the function
 * @param functionName Name of the called function
 */
function log(comment: string, functionName: string) {
  cy.log(`##### ${comment} <${functionName}> #####`);
}

/**
 * Navigates to the quote with status as Vendor Quote.
 */
export function navigateToVendorQuote() {
  log(
    'Navigates to the quote with status as Vendor Quote',
    navigateToVendorQuote.name
  );
  cy.get('.cx-status .quote-offer')
    .should('contain.text', 'Vendor Quote').first()
    .and('be.visible')
    .click()
    .then(() => {
      cy.wait(READ_QUOTE);
      cy.get('h1')
        .should('contain.text', 'Quote Details')
    });
}


 
export function checkQuoteListContainsDis() {
  log(
    'Verifies whether the quote list cx-quote-items',
    checkQuoteListContainsDis.name
  );
  cy.get(itemsComponentSelector).should('be.visible');
  cy.get('.cx-item-list-desc#cx-item-list-discount').then(($discountElement) => {
    // If discount data is present, assert that it's displayed
    if ($discountElement.text().trim() !== '') {
      cy.wrap($discountElement).should('be.visible');
    } else {
      // If discount data is not present, assert that it's not displayed
      cy.wrap($discountElement).should('not.exist');
    }
});
}





// cy.get('cx-cpq-quote').then(($discountContainer) => {
//       // If discount percentage container is present, check if the discount percentage is displayed
//       if ($discountContainer.length > 0) {
//         // Check if the discount percentage is visible
//         cy.get('.cx-total').should('be.visible');
//       } else {
//         // If discount percentage container is not present, assert that it's not displayed
//         cy.wrap($discountContainer).should('not.exist');
//       }
//     });






// export function navigateToVendorQuote(vendorQuote?: number) {
//   log(
//     'Navigates to the mocked quote from vendor via my account',
//     navigateToVendorQuote.name
//   );
//   cy.get('.cx-name')
//   .eq(0)
//     .should('contain.text', `Quote ${vendorQuote}`)
//     .and('be.visible')
//     .click()
//     .then(() => {
//       cy.wait(READ_VENDOR_QUOTE);
//       cy.url().should('include', vendorQuote);
//     });
// }

/**
 * Navigates to the mocked quote from vendor via my account.
 */
 

export function displayQuoteDiscount() {
  log('Mocks quote list with one quote containing proposal document from CPQ.', navigateToVendorQuote.name); 

  cy.get('cx-quote-items').contains('tr[cx-cart-item-list]')
  // .contains('tr[cx-cart-item-list-row]', cart.entries[0].product.code)
  // .within(() => {
  //   cy.get('.cx-name').should('contain', cart.entries[0].cpqDiscounts);
  // });;
  // cy.get('ng-container').should('be.visible')
  // cy.get('cx-cart-item-list');
  // cy.get('#cx-item-list-discount')
  // .should('be.visible')
 
  

  // Check if "Discount Percentage" should be displayed based on cpqDiscounts
  // cy.get('@getVendorQuote').its('response.body.entries[0].cpqDiscounts').then((cpqDiscounts) => {
  //   if (cpqDiscounts && cpqDiscounts.length > 0) {
  //     cy.get('#cx-item-list-discount').should('contain', 'Discount Percentage');
  //   }
  // });
}
 