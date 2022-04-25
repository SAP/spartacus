import { user } from '../../sample-data/checkout-flow';
import { focusableSelectors } from '../../support/utils/a11y-tab';
import { register as authRegister } from '../auth-forms';
import { waitForPage } from '../checkout-flow';
import { loginUser } from '../login';
import { TabbingOrderTypes, TabElement } from './tabbing-order.model';

export const testProductUrl = '/product/779841';
export const testProductListUrl = '/Brands/all/c/brands?currentPage=1';

export function verifyTabElement(tabElement: TabElement) {
  // Check generic cases without value
  switch (tabElement.type) {
    case TabbingOrderTypes.GENERIC_ELEMENT: {
      cy.focused().should('exist');
      return;
    }
    case TabbingOrderTypes.GENERIC_CHECKBOX: {
      cy.focused().should('have.attr', 'type', 'checkbox');
      return;
    }
    case TabbingOrderTypes.GENERIC_BUTTON: {
      cy.focused().should('have.attr', 'type', 'button');
      return;
    }
    case TabbingOrderTypes.GENERIC_INPUT: {
      cy.focused().should('have.prop', 'tagName').should('eq', 'INPUT');
      return;
    }
    case TabbingOrderTypes.GENERIC_NG_SELECT: {
      cy.focused().should('have.attr', 'type', 'ng-select');
      return;
    }
    case TabbingOrderTypes.CX_PRODUCT_VIEW: {
      cy.focused()
        .should('have.class', 'cx-product-layout')
        .should('have.prop', 'tagName')
        .should('eq', 'BUTTON');
      return;
    }
  }

  // Check non-generic cases requiring value
  if (!(tabElement.value && tabElement.value.length)) {
    return;
  }

  const regexpCheck = (value: string) => {
    value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regexp = new RegExp(value, 'i');

    cy.focused()
      .invoke('text')
      .then((text) => {
        expect(text).to.match(regexp);
      });
  };

  switch (tabElement.type) {
    case TabbingOrderTypes.GENERIC_ELEMENT_WITH_VALUE: {
      cy.focused().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.FORM_FIELD: {
      cy.focused().should('have.attr', 'formcontrolname', tabElement.value);
      return;
    }
    case TabbingOrderTypes.LINK: {
      regexpCheck(tabElement.value as string);
      return;
    }
    case TabbingOrderTypes.BUTTON: {
      cy.focused().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.NG_SELECT: {
      cy.focused()
        .parentsUntil('ng-select')
        .last()
        .parent()
        .should('have.attr', 'formcontrolname', tabElement.value);
      return;
    }
    case TabbingOrderTypes.CHECKBOX_WITH_LABEL: {
      cy.focused().parent().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.IMG_LINK: {
      cy.focused().should('have.attr', 'href', tabElement.value);
      return;
    }
    case TabbingOrderTypes.RADIO: {
      cy.focused()
        .should('have.attr', 'type', 'radio')
        .should('have.attr', 'formcontrolname', tabElement.value);
      return;
    }
    case TabbingOrderTypes.H3: {
      cy.focused().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.CX_MEDIA: {
      cy.focused().find('img').should('have.attr', 'alt', tabElement.value);
      return;
    }
    case TabbingOrderTypes.CX_ICON: {
      cy.focused().should('have.prop', 'tagName').should('eq', 'CX_ICON');
      return;
    }
    case TabbingOrderTypes.SELECT: {
      cy.focused().get('select').parent().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.NAV_CATEGORY_DROPDOWN: {
      cy.focused().parent().should('contain', tabElement.value);
      return;
    }
    case TabbingOrderTypes.INDEX_OF_ELEMENT: {
      const selector = tabElement.value[0];
      const index = tabElement.value[1];

      cy.focused().then((focusedElement) => {
        cy.get(selector).eq(index).should('match', focusedElement.get()[0]);
      });
    }
  }
}

export function verifyTabbingOrder(
  containerSelector: string,
  elements: TabElement[]
) {
  cy.get(containerSelector)
    .find(focusableSelectors.join(','))
    .then((focusableElements) =>
      focusableElements.filter((_, element) => element.offsetParent != null)
    )
    .as('children')
    .should('have.length', elements.length);

  cy.get('@children').first().focus();

  elements.forEach((element: TabElement, index: number) => {
    // skip tabbing on first element
    if (index !== 0) {
      cy.pressTab();
    }
    verifyTabElement(element);
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

export function addProduct(productCode?: string): void {
  const cartPage = waitForPage('/cart', 'getCartPage');
  const productUrl = productCode ? `/product/${productCode}` : testProductUrl;

  cy.visit(productUrl);
  cy.findAllByText(/Add to cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.findAllByText(/View cart/i)
      .first()
      .click();
  });
  cy.wait(`@${cartPage}`);
}

export function checkoutNextStep(url: string) {
  const nextStep = waitForPage(url, 'getNextStep');
  cy.get('.btn.btn-block.btn-primary')
    .filter(':not(:disabled)')
    .first()
    .click({ force: true });
  cy.wait(`@${nextStep}`);
}
