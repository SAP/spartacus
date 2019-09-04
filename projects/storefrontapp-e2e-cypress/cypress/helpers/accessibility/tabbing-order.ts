import { TabbingOrderTypes } from './tabbing-order.config';
import { waitForPage } from '../checkout-flow';
import { loginUser } from '../login';
import { register as authRegister } from '../auth-forms';
import { user } from '../../sample-data/checkout-flow';

export interface TabElement {
  value: string;
  type: TabbingOrderTypes;
}

export function checkElement(tabElement: TabElement) {
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
