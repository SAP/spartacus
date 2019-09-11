import { TabbingOrderTypes } from './tabbing-order.config';
import { waitForPage } from '../checkout-flow';
import { loginUser } from '../login';
import { register as authRegister } from '../auth-forms';
import { user } from '../../sample-data/checkout-flow';

export interface TabElement {
  value?: string;
  type: TabbingOrderTypes;
}

export function checkElement(tabElement: TabElement) {
  // Check generic cases without value
  switch (tabElement.type) {
    case TabbingOrderTypes.GENERIC_CHECKBOX: {
      cy.focused().should('have.attr', 'type', 'checkbox');
      return;
    }
    case TabbingOrderTypes.GENERIC_BUTTON: {
      cy.focused().should('have.attr', 'type', 'button');
      return;
    }
  }

  // Check non-generic cases requiring value
  if (!(tabElement.value && tabElement.value.length)) {
    return;
  }

  switch (tabElement.type) {
    case TabbingOrderTypes.FORM_FIELD: {
      cy.focused().should('have.attr', 'formcontrolname', tabElement.value);
      break;
    }
    case TabbingOrderTypes.LINK: {
      cy.focused().should('contain', tabElement.value);
      break;
    }
    case TabbingOrderTypes.BUTTON: {
      cy.focused().should('contain', tabElement.value);
      break;
    }
    case TabbingOrderTypes.CHECKBOX_WITH_LABEL: {
      cy.focused()
        .parent()
        .should('contain', tabElement.value);
      break;
    }
    case TabbingOrderTypes.IMG_LINK: {
      cy.focused().should('have.attr', 'href', tabElement.value);
      break;
    }
    case TabbingOrderTypes.GENERIC_INPUT: {
      cy.focused().should('have.attr', 'type', 'text');
      break;
    }
    case TabbingOrderTypes.ITEM_COUNTER: {
      cy.focused()
        .parentsUntil('cx-item-counter')
        .last()
        .parent()
        .should('have.attr', 'formcontrolname', tabElement.value);
      break;
    }
  }
}

export function checkAllElements(tabElements: TabElement[]) {
  tabElements.forEach((element: TabElement, index: number) => {
    // skip tabbing on first element
    if (index !== 0) {
      cy.tab();
    }

    checkElement(element);
  });
}

export function getFormFieldByValue(value: string) {
  return cy.get(`[formcontrolname="${value}"]`);
}

export function register() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.visit('/login/register');
  authRegister(user);
  cy.wait(`@${loginPage}`);
}

export function login() {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit('/login');
  loginUser();
  cy.wait(`@${homePage}`);
}

export function registerAndLogin(): void {
  const loginPage = waitForPage('/login', 'getLoginPage');
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit('/login/register');
  authRegister(user);
  cy.wait(`@${loginPage}`);
  loginUser();
  cy.wait(`@${homePage}`);
}

export function addProduct(): void {
  const categoryPageUrl = '/Open-Catalogue/Cameras/Digital-Cameras/c/575';
  const cartPage = waitForPage('/cart', 'getCartPage');

  cy.visit(categoryPageUrl);
  cy.getByText(/Add to cart/i).click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/View cart/i).click();
  });
  cy.wait(`@${cartPage}`);
}
