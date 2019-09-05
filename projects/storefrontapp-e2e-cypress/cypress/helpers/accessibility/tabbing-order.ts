import { TabbingOrderTypes } from './tabbing-order.config';
import { waitForPage } from '../checkout-flow';
import { loginUser } from '../login';
import { register as authRegister, login } from '../auth-forms';
import { generateMail, randomString } from '../user';

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
    case TabbingOrderTypes.NG_SELECT: {
      cy.focused()
        .parentsUntil('ng-select')
        .last()
        .parent()
        .should('have.attr', 'formcontrolname', tabElement.value);
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

// export function register(user) {
//   const loginPage = waitForPage('/login', 'getLoginPage');
//   cy.visit('/login/register');
//   authRegister(user);
//   cy.wait(`@${loginPage}`);
// }

// export function login(user) {
//   const homePage = waitForPage('homepage', 'getHomePage');
//   cy.visit('/login');
//   loginUser();
//   cy.wait(`@${homePage}`);
// }

export function registerAndLogin(): void {
  const user = getNewUser();
  const loginPage = waitForPage('/login', 'getLoginPage');
  const homePage = waitForPage('homepage', 'getHomePage');

  cy.visit('/login/register');
  authRegister(user);
  cy.wait(`@${loginPage}`);
  login(user.email, user.password);
  cy.wait(`@${homePage}`);
}

export function getNewUser() {
  return {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    fullName: 'Winston Rumfoord',
    password: 'Password123.',
    email: generateMail(randomString(), true),
    phone: '555 555 555',
    address: {
      city: 'Tralfamadore',
      line1: 'Chrono-Synclastic Infundibulum',
      line2: 'Betelgeuse',
      country: 'United States',
      state: 'Connecticut',
      postal: '06247',
    },
    payment: {
      card: 'Visa',
      number: '4111111111111111',
      expires: {
        month: '07',
        year: '2022',
      },
      cvv: '123',
    },
  };
}
