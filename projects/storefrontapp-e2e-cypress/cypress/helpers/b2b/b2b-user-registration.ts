/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder as tabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { SampleUser } from '../../sample-data/checkout-flow';
import { interceptPost } from '../../support/utils/intercept';
import * as alerts from '../global-message';
import { clickHamburger } from '../homepage';

export const ORGANIZATION_USER_REGISTER_BUTTON_SELECTOR =
  'cx-link.cx-organization-user-register-button';

export const ORGANIZATION_USER_REGISTER_FORM_COMPONENT_SELECTOR =
  'cx-user-registration-form';

export const enum ORGANIZATION_USER_REGISTRATION_RESULT_ALERT {
  SUCCESS = 'success',
  ERROR = 'error',
}

const form = ORGANIZATION_USER_REGISTER_FORM_COMPONENT_SELECTOR;

export function navigateToOrganizationUserRegisterPage() {
  cy.onMobile(() => {
    clickHamburger();
  });
  cy.findByText(/Sign in \/ Register/i).click();
  cy.get(ORGANIZATION_USER_REGISTER_BUTTON_SELECTOR).find('a').click();
}

export function fillOrganizationUserRegistrationForm(
  { titleCode, firstName, lastName, email, address, phone }: SampleUser,
  message?: string
) {
  const companyName = 'My Company Inc.';
  cy.get(form).should('be.visible');
  cy.get(form).within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect(titleCode);
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="companyName"]').type(companyName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('#country-select').ngSelect(address?.country);
    cy.get('[formcontrolname="line1"]').type(address?.line1);
    cy.get('[formcontrolname="line2"]').type(address?.line2);
    cy.get('[formcontrolname="town"]').type(address?.city);
    cy.get('[formcontrolname="postalCode"]').type(address?.postal);

    if (address?.state) {
      cy.get('#region-select').ngSelect(address?.state);
    }

    if (phone) {
      cy.get('[formcontrolname="phoneNumber"]').type(phone);
    }

    if (message) {
      cy.get('[formcontrolname="message"]').type(message);
    }
  });
}

/**
 * Method submits prefiled form and by default waits till registration request will be completed.
 *
 * @param {boolean} [waitForRequestCompletion=true]
 * specifies if cypress should wait till registration request be completed.
 */
export function submitOrganizationUserRegistrationForm(
  waitForRequestCompletion: boolean = true
) {
  interceptPost('registerOrganizationUser', '*/orgUsers*');

  cy.get(form).within(() => {
    cy.get('button[type=submit]').click();
  });

  if (waitForRequestCompletion) {
    cy.wait('@registerOrganizationUser')
      .its('response.statusCode')
      .should('eq', 201);
  }
}

export function verifyGlobalMessageAfterRegistration(message: string) {
  cy.get('body').within(() => {
    const alert = alerts.getAlert();

    alert.should('contain', message);
  });
}

export function verifyRedirectionToLoginPage() {
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

export function verifyFormErrors() {
  const requiredFirstNameFieldMessage = 'Field First name is required';
  const requiredLastNameFieldMessage = 'Field Last name is required';
  const requiredCompanyNameFieldMessage = 'Field Company name is required';
  const requiredEmailNameFieldMessage = 'Field E-mail is required';
  const notValidEmailMessage =
    'Field E-mail has not a valid email format. Match pattern: example@yourdomain.com';

  cy.get(form).within(() => {
    cy.get('[formcontrolname="firstName"] + cx-form-errors').contains(
      requiredFirstNameFieldMessage
    );
    cy.get('[formcontrolname="lastName"] + cx-form-errors').contains(
      requiredLastNameFieldMessage
    );
    cy.get('[formcontrolname="companyName"] + cx-form-errors').contains(
      requiredCompanyNameFieldMessage
    );
    cy.get('[formcontrolname="email"] + cx-form-errors').contains(
      requiredEmailNameFieldMessage
    );

    cy.get('[formcontrolname="email"] + cx-form-errors').within(() => {
      cy.get('p').contains(requiredEmailNameFieldMessage);
      cy.get('p+p').should('contain', notValidEmailMessage);
    });

    cy.get('cx-form-errors p').should('have.length', 5);
  });
}
