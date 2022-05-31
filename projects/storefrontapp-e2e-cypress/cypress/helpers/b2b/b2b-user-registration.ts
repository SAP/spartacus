import { SampleUser } from '../../sample-data/checkout-flow';
import { clickHamburger } from '../homepage';
import * as alerts from '../global-message';
import { interceptPost } from '../../support/utils/intercept';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder as tabbingOrder } from '../../helpers/accessibility/tabbing-order';

export const ORGANIZATION_USER_REGISTER_BUTTON_SELECTOR =
  'cx-link.cx-organization-user-register-button';

export const ORGANIZATION_USER_REGISTER_FORM_COMPONENT_SELECTOR =
  'cx-user-registration-form';

export function navigateToOrganizationUserRegisterPage() {
  cy.onMobile(() => {
    clickHamburger();
  });
  cy.findByText(/Sign in \/ Register/i).click();
  cy.get(ORGANIZATION_USER_REGISTER_BUTTON_SELECTOR).click();
}

export function fillOrganizationUserRegistrationForm(
  { titleCode, firstName, lastName, email, address, phone }: SampleUser,
  message: string
) {
  const form = ORGANIZATION_USER_REGISTER_FORM_COMPONENT_SELECTOR;

  cy.get(form).should('be.visible');
  cy.get(form).within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect(titleCode);
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('#country-select').ngSelect(address?.country);
    cy.get('[formcontrolname="line1"]').type(address?.line1);
    cy.get('[formcontrolname="line2"]').type(address?.line2);
    cy.get('[formcontrolname="town"]').type(address?.city);
    cy.get('[formcontrolname="postalCode"]').type(address?.postal);

    if (address?.state) {
      cy.get('#region-select').ngSelect(address?.state);
    }

    cy.get('[formcontrolname="phoneNumber"]').type(phone);
    cy.get('[formcontrolname="message"]').type(message);
  });
}

export function submitOrganizationUserRegistrationForm() {
  const form = ORGANIZATION_USER_REGISTER_FORM_COMPONENT_SELECTOR;
  interceptPost('registerOrganizationUser', '*/orgUsers*');

  cy.get(form).within(() => {
    cy.get('button[type=submit]').click();
  });

  cy.wait('@registerOrganizationUser');
}

export function verifyGlobalMessageAfterRegistration() {
  const alert = alerts.getSuccessAlert();

  alert.should(
    'contain',
    'Thank you for registering! A representative will contact you shortly and confirm your access information.'
  );
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/login$/);
  });
}

export function verifyTabbingOrder() {
  tabbingOrder(
    'cx-page-layout.AccountPageTemplate',
    config.userRegistrationForm
  );
}
