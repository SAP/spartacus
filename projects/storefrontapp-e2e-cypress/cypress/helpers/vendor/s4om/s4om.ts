/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  b2bDeliveryAddress,
  b2bDeliveryModeStub,
  cartWithB2bProductAndPremiumShipping,
  poNumber,
  POWERTOOLS_BASESITE,
  recurrencePeriodMap,
} from '../../../sample-data/b2b-checkout';
import {
  SampleCartProduct,
  SampleProduct,
  SampleUser,
} from '../../../sample-data/checkout-flow';
import { AccountData } from '../../../support/require-logged-in.commands';
import { interceptGet, interceptPost } from '../../../support/utils/intercept';
import { tabbingOrderConfig } from '../../accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder } from '../../accessibility/tabbing-order';
import {
  TabbingOrderConfig,
  TabbingOrderTypes,
} from '../../accessibility/tabbing-order.model';
import { login } from '../../auth-forms';
import {
  interceptCheckoutB2BDetailsEndpoint,
  interceptPutDeliveryModeEndpoint,
} from '../../b2b/b2b-checkout';
import { clearActiveCart, goToCart, validateEmptyCart } from '../../cart';
import { waitForPage, waitForProductPage } from '../../checkout-flow';
import { LOCATORS } from '../../pickup-in-store-utils';

export const s4omB2BUser: AccountData = {
  registrationData: {
    email: 'james.weber@harvestlive.inc',
    password: 'welcome',
    firstName: 'James',
    lastName: 'Weber',
    titleCode: 'mr',
  },
  user: '91',
};

export const s4omB2bAccountShipToUser: SampleUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  fullName: 'James Weber',
  address: {
    city: 'Chicago',
    line1: 'Sunset',
  },
};

export const cartWithS4OMB2bProductAndPremiumShipping: SampleCartProduct = {
  estimatedShipping: '$16.99',
  total: '$12.55',
  totalAndShipping: '$30.72',
};

export const s4omProduct: SampleProduct = {
  name: 'Multi Eco 33i',
  code: 'TG11',
};

export const s4omProductLink: string = s4omProduct.code + '/multi-eco-33i';
export const s4omPONumber: string = poNumber;
export const s4omCostCenter: string = '17100003_CC';
export const s4omB2BUnit: string = 'Dell Bont Industries';
export const s4omPastOrderId: string = '103300';

const acceptAndSubmitOrder = [
  {
    value: 'I am confirming that I have read and agreed with',
    type: TabbingOrderTypes.CHECKBOX_WITH_LABEL,
  },
  {
    value: 'Terms & Conditions',
    type: TabbingOrderTypes.LINK,
  },
  { value: 'Place Order', type: TabbingOrderTypes.BUTTON },
];

export const s4omAccountReviewOrderGeneral = [
  { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
  { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
  { value: 'DeliveryMode', type: TabbingOrderTypes.LINK },
  {
    value: '/powertools-spa/en/USD/checkout/payment-type',
    type: TabbingOrderTypes.IMG_LINK,
  },
  {
    value: '/powertools-spa/en/USD/checkout/payment-type',
    type: TabbingOrderTypes.IMG_LINK,
  },
  {
    value: '/powertools-spa/en/USD/checkout/delivery-address',
    type: TabbingOrderTypes.IMG_LINK,
  },
  {
    value: '/powertools-spa/en/USD/checkout/delivery-address',
    type: TabbingOrderTypes.IMG_LINK,
  },
  {
    value: '/powertools-spa/en/USD/checkout/delivery-mode',
    type: TabbingOrderTypes.IMG_LINK,
  },
  {
    value: 'Multi Eco 33i',
    type: TabbingOrderTypes.CX_MEDIA,
  },
  {
    value: 'Multi Eco 33i',
    type: TabbingOrderTypes.LINK,
  },
  {
    value: 'orderType',
    type: TabbingOrderTypes.RADIO,
  },
  {
    value: 'orderType',
    type: TabbingOrderTypes.RADIO,
  },
];

export const s4omDeliveryModeTabbingConfig: TabbingOrderConfig = {
  ...tabbingOrderConfig,
  deliveryMode: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'requestedDeliveryDate', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
};

export const s4omTabbingOrderConfig: TabbingOrderConfig = {
  ...tabbingOrderConfig,
  checkoutReviewOrder: [
    { value: 'PaymentDetails', type: TabbingOrderTypes.LINK },
    {
      value: '/powertools-spa/en/USD/checkout/payment-details',
      type: TabbingOrderTypes.IMG_LINK,
    },
    ...acceptAndSubmitOrder,
  ],
  checkoutReviewOrderAccount: [
    ...s4omAccountReviewOrderGeneral,
    ...acceptAndSubmitOrder,
  ],
};

export function loginS4OMB2bUser() {
  let user: Partial<AccountData & { fullName: string }> = s4omB2BUser;
  user.fullName =
    s4omB2BUser.registrationData.firstName +
    ' ' +
    s4omB2BUser.registrationData.lastName;

  cy.window().then((win) => win.sessionStorage.clear());
  cy.visit('/login');
  cy.get(LOCATORS.ALLOW_COOKIES_BUTTON).click();
  login(
    s4omB2BUser.registrationData.email,
    s4omB2BUser.registrationData.password
  );
  cy.get('.cx-login-greet').should('contain', user.fullName);
}

export function addB2bS4ProductToCart() {
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${s4omProductLink}`);
  const productPage = waitForProductPage(s4omProduct.code, 'getProductPage');

  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', s4omProduct.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', s4omProduct.name);
  });

  interceptPost(`cart_entry`, `/orgUsers/current/carts/*/entries*`);

  interceptGet(
    'cart_refresh',
    '/users/*/carts/*?fields=DEFAULT,potentialProductPromotions*'
  );
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();

  //Obtain schedule line info from Cart Entry
  cy.wait('@cart_entry')
    .then((xhr) => {
      expect(xhr.request.method).to.eq('POST');
      if (
        xhr &&
        xhr.response &&
        xhr.response.body &&
        xhr.response.body.entry &&
        xhr.response.body.entry.scheduleLines
      ) {
        window.sessionStorage.setItem(
          'TG11-scheduleLines',
          JSON.stringify(xhr.response.body.entry.scheduleLines)
        );
      }
    })
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(`@cart_refresh`);

  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', s4omProduct.name);
  });
}

export function resetCart() {
  addB2bS4ProductToCart(); //add product so that cart is not empty
  clearItemsFromCart(); //clear all items from cart
}

export function clearItemsFromCart() {
  goToCart();
  clearActiveCart();
  validateEmptyCart();
}

export function goToCart() {
  goToCart();
}

export function verifyScheduleLineInfo() {
  let scheduleLines = window.sessionStorage.getItem('TG11-scheduleLines');
  cy.wrap('scheduleLines').should('not.be.null');

  scheduleLines = JSON.parse(scheduleLines);
  cy.wrap('scheduleLines').should('have.length.at.least', 1);

  for (let i = 0; i < scheduleLines.length; i++) {
    cy.get('[aria-describedby="cx-schedule-line-info-' + i + '"]').within(
      () => {
        const confirmedDate = new Date(
          scheduleLines[i]['confirmedAt']
        ).toLocaleDateString('en', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });

        cy.contains(confirmedDate);
        cy.contains('Qty');
        cy.contains(scheduleLines[i]['confirmedQuantity']);
      }
    );
  }
}

export function proceedtoCheckOutS4Product() {
  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);
}

export function selectS4OMAccountShippingAddress() {
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();
  cy.get('.cx-delivery-address-card-inner > cx-card .card-header', {
    timeout: 15000,
  }).should('contain', 'Selected'); //delivery address loads slow
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
  });

  cy.get('cx-card .card-header').should('contain', 'Selected');

  /**
   * Delivery mode PUT intercept is not in selectAccountDeliveryMode()
   * because it doesn't choose a delivery mode and the intercept might have missed timing depending on cypress's performance
   */

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    tabbingOrderConfig.shippingAddressAccount
  );

  cy.get('button.btn-primary').should('be.enabled').click();
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
}

export function selectAccountDeliveryMode() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint(
    b2bDeliveryModeStub,
    b2bDeliveryAddress.id
  );
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();

  cy.get('.cx-checkout-title').should('contain', 'Delivery Method');

  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('cx-delivery-mode input').eq(1).click();

  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-delivery-mode input').first().should('not.be.checked');

  cy.get(
    'input[type=radio][formcontrolname=deliveryModeId]:not(:disabled)'
  ).then(() => {
    // Accessibility
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      s4omDeliveryModeTabbingConfig.deliveryMode
    );
  });

  const orderReview = waitForPage('/checkout/review-order', 'getReviewOrder');

  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });

  cy.wait(`@${orderReview}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function reviewB2bOrderDetail(
  sampleUser: SampleUser = s4omB2bAccountShipToUser,
  sampleProduct: SampleProduct = s4omProduct,
  cartData: SampleCartProduct,
  isAccount: boolean = true,
  replenishment?: string,
  poNum: string = s4omPONumber,
  costCtr: string = s4omCostCenter,
  b2bUnt: string = s4omB2BUnit,
  isOrderConfirmation: boolean = true
) {
  if (isOrderConfirmation) {
    cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
    cy.get('h2').should('contain', 'Thank you for your order!');
  } else {
    cy.get('h1').should('contain', 'Order Details');
  }

  cy.get('cx-order-overview .container').within(() => {
    cy.get('.cx-summary-card:nth-child(1)').within(() => {
      cy.get('cx-card:nth-child(1)')
        .first()
        .within(() => {
          if (!replenishment) {
            cy.get('.cx-card-title').should('contain', 'Order Number');
          } else {
            cy.get('.cx-card-title').should('contain', 'Replenishment #');
          }
          cy.get('.cx-card-label').should('not.be.empty');
        });
      if (!replenishment) {
        cy.get('cx-card:nth-child(2)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Placed on');
          cy.get('.cx-card-label').should('not.be.empty');
        });
        cy.get('cx-card:nth-child(3)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Status');
          cy.get('.cx-card-label').should('not.be.empty');
        });
      } else {
        cy.get('cx-card:nth-child(2)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Status');
          cy.get('.cx-card-label').should('not.be.empty');
        });
      }
    });

    if (!replenishment) {
      cy.get('.cx-summary-card:nth-child(2)').within(() => {
        cy.get('.cx-card')
          .eq(0)
          .within(() => {
            cy.contains(poNum);
          });
        cy.get('.cx-card')
          .eq(1)
          .within(() => {
            if (isAccount) {
              cy.contains('Account');
            } else {
              cy.contains('Credit Card');
            }
          });
        cy.get('.cx-card')
          .eq(2)
          .within(() => {
            if (isAccount) {
              cy.contains(costCtr);
              cy.contains(`(${b2bUnt})`);
            }
          });
      });
    } else {
      cy.get('.cx-summary-card:nth-child(2) .cx-card').within(() => {
        cy.contains('Frequency');
        cy.contains(recurrencePeriodMap.get(replenishment));
      });

      cy.get('.cx-summary-card:nth-child(3) .cx-card').within(() => {
        cy.contains(poNum);
        if (isAccount) {
          cy.contains('Account');
          cy.contains(costCtr);
          cy.contains(`(${b2bUnt})`);
        } else {
          cy.contains('Credit Card');
        }
      });
    }

    if (!replenishment) {
      cy.get('.cx-summary-card:nth-child(3)').within(() => {
        cy.get('.cx-card')
          .eq(0)
          .within(() => {
            cy.contains(sampleUser.fullName);
            cy.contains(sampleUser.address.line1);
          });
        cy.get('.cx-card')
          .eq(1)
          .within(() => {
            if (
              cartData.estimatedShipping ===
              cartWithB2bProductAndPremiumShipping.estimatedShipping
            ) {
              cy.contains('Premium Delivery');
            } else {
              cy.contains('Standard Delivery');
            }
          });
      });
    } else {
      cy.get('.cx-summary-card:nth-child(4) .cx-card').within(() => {
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
        cy.contains('Premium Delivery');
      });
    }

    if (!isAccount) {
      cy.get('.cx-summary-card:nth-child(4) .cx-card').within(() => {
        cy.contains('Payment');
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
      });
    }
  });

  cy.get('.cx-item-list-row .cx-code').should('contain', sampleProduct.code);

  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    cartData.totalAndShipping
  );
}

export function setOrderConfirmationIdInSessionStorage(alias: string) {
  cy.get('cx-order-overview .container').within(() => {
    cy.get('.cx-summary-card:nth-child(1)').within(() => {
      cy.get('cx-card:nth-child(1)')
        .first()
        .within(() => {
          cy.get('.cx-card-title').should('contain', 'Order Number');
          cy.get('.cx-card-label').then(($el) => {
            window.sessionStorage.setItem(alias, $el.text().trim());
          });
        });
    });
  });
  return alias;
}

export function findRowInOrderHistoryTable(
  orderAPIAlias: string,
  orderId: string,
  poNum: string,
  costCenter?: string
) {
  cy.get('cx-order-history h2').should('contain', 'Order history');

  let index = 2; //start navigating from the second page
  cy.get('#order-history-table').as('orderHistoryTable');
  const goToNextPage = () => {
    cy.get('@orderHistoryTable').then(($odt) => {
      if ($odt.html().includes(orderId)) {
        cy.get('.cx-order-history-code a').should('contain', orderId);
        cy.get('.cx-order-history-po a').should('contain', poNum);
        if (costCenter) {
          cy.get('.cx-order-history-po a').should('contain', costCenter);
        }
      } else {
        cy.get('cx-pagination').findByText(index).first().click();
        index++;
        cy.wait(`@${orderAPIAlias}`).then(goToNextPage);
      }
    });
  };
  goToNextPage();
}
