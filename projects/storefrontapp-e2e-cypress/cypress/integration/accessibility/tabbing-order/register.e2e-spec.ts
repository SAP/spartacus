import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';
import {
  getFormFieldByValue,
  checkAllElements,
} from '../../../helpers/accessibility/tabbing-order';
import { RegisterUser } from '../../../helpers/auth-forms';
import { user } from '../../../sample-data/checkout-flow';

context('Register page', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/electronics-spa/en/USD/login/register');
      fillRegistrationForm(user); // fill form to enable submit button
      getFormFieldByValue(tabbingOrderConfig.register[0].value).focus(); // focus the first element
    });

    checkAllElements(tabbingOrderConfig.register);
  });
});

function fillRegistrationForm({
  firstName,
  lastName,
  email,
  password,
}: RegisterUser) {
  cy.get('cx-register form').within(() => {
    cy.get('[formcontrolname="titleCode"]').select('mr');
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[formcontrolname="passwordconf"]').type(password);
    cy.get('[formcontrolname="termsandconditions"]').check();
  });
}
