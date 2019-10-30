import { giveConsent } from '../helpers/consent-management';
import { standardUser } from '../sample-data/shared-users';
import { switchSiteContext } from '../support/utils/switch-site-context';
import { login, register, RegisterUser } from './auth-forms';
import { waitForPage } from './checkout-flow';
import { checkBanner } from './homepage';
import { signOutUser } from './login';
import { LANGUAGE_DE, LANGUAGE_LABEL } from './site-context-selector';
import { generateMail, randomString } from './user';

const ANONYMOUS_BANNER = 'cx-anonymous-consent-management-banner';
const ANONYMOUS_DIALOG = 'cx-anonymous-consent-dialog';
const BE_CHECKED = 'be.checked';
const NOT_BE_CHECKED = 'not.be.checked';
export const MARKETING_NEWSLETTER = 'MARKETING_NEWSLETTER';
export const PERSONALIZATION = 'PERSONALIZATION';
export const STORE_USER_INFORMATION = 'STORE_USER_INFORMATION';

const marketingConsentLabel = 'marketing consent';
const personalizationConsentLabel = 'personalization';
const storeUserConsentLabel = 'store user information';

const userGiveConsentRegistrationTest: RegisterUser = {
  firstName: '1',
  lastName: '2',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};

const userTransferConsentTest: RegisterUser = {
  firstName: 'a',
  lastName: 'b',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};

const userFromConfigTest: RegisterUser = {
  firstName: 'a',
  lastName: 'b',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};

// As the consent state is synchronized with the back-end in a stateless way (using an http header)
// We have to wait for the last one XHR request to finish before mutating the ngrx state;
// Otherwise, the state would be overridden by anonymous-consents-interceptor.ts.
// Currently, there's no support for this, thus the cy.wait(5000)
// will remove once all the test case for improvements are done
export function waitFiveSeconds() {
  cy.wait(5000);
}

export function anonoymousConsentConfig(
  registerConsent: string,
  showLegalDescriptionInDialog: boolean,
  requiredConsents: string[],
  consentManagementPage: {
    showAnonymousConsents: boolean;
    hideConsents: string[];
  }
) {
  cy.cxConfig({
    anonymousConsents: {
      registerConsent,
      showLegalDescriptionInDialog,
      requiredConsents,
      consentManagementPage,
    },
  });
}

export function registerNewUserAndLogin(
  newUser: RegisterUser,
  giveRegistrationConsent = false
) {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.getByText(/Sign in \/ Register/i).click();
  cy.wait(`@${loginPage}`);
  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.getByText('Register').click();
  cy.wait(`@${registerPage}`);
  register(newUser, giveRegistrationConsent);
  cy.get('cx-breadcrumb').contains('Login');

  login(newUser.email, newUser.password);
}

export function navigateToHome() {
  cy.get('cx-generic-link a[title="SAP Commerce"]').click({ force: true });
}

export function navigateToConsentPage() {
  const consentsPage = waitForPage('/my-account/consents', 'getConsentsPage');
  cy.selectUserMenuOption({
    option: 'Consent Management',
  });
  cy.wait(`@${consentsPage}`);
}

export function seeBannerAsAnonymous() {
  cy.get(ANONYMOUS_BANNER).should('exist');
}

export function checkBannerHidden() {
  cy.get(ANONYMOUS_BANNER).should('not.be.visible');
}

export function checkDialogDescroption() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-dialog-description`).should('not.exist');
}

export function checkConsentsInConsentPage() {
  cy.get('.cx-consent-toggles cx-consent-management-form').should('not.exist');
}

export function clickAllowAllFromBanner() {
  cy.get(ANONYMOUS_BANNER)
    .find('.btn-primary')
    .click();
}

export function clickViewDetailsFromBanner() {
  cy.get(ANONYMOUS_BANNER)
    .find('.btn-action')
    .click({ force: true });
}

export function openDialogUsingFooterLink() {
  cy.get('cx-anonymous-consent-open-dialog').within(() => {
    const link = cy.get('button');
    link.should('exist');
    link.click({ force: true });
  });
}

export function checkDialogOpen() {
  cy.get(ANONYMOUS_DIALOG).should('exist');
}

export function checkDialogClosed() {
  cy.get(ANONYMOUS_DIALOG).should('not.exist');
}

export function closeDialog() {
  cy.get(`${ANONYMOUS_DIALOG} button.close`).click({ force: true });
}

export function toggleAnonymousConsent(position) {
  cy.get(`.cx-dialog-row:nth-child(${position})`)
    .find('input')
    .click({ force: true });
}

export function checkInputConsentState(position, state) {
  cy.get('input[type="checkbox"]')
    .eq(position)
    .should(state);
}

export function checkAllInputConsentState(state) {
  cy.get('input[type="checkbox"]').each($match => {
    cy.wrap($match).should(state);
  });
}

export function selectAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`)
    .eq(1)
    .click({ force: true });
}

export function clearAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`)
    .first()
    .click({ force: true });
}

export function checkConsentExist(text) {
  cy.get(`${ANONYMOUS_DIALOG} .cx-dialog-row`)
    .find('label')
    .each($match => {
      cy.wrap($match).should('contain', text);
    });
}

export function checkConsentNotExist(text) {
  cy.get(`${ANONYMOUS_DIALOG} .cx-dialog-row`)
    .find('label')
    .each($match => {
      cy.wrap($match).should('not.contain', text);
    });
}

export function loggedInUserBannerTest() {
  cy.get(ANONYMOUS_BANNER).should('not.exist');
}

export function loggedInUserFooterLinkTest() {
  cy.get('.anonymous-consents').should('not.exist');
}

export function sessionLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function registerUserAndCheckMyAccountConsent(
  user,
  consentCheckBox,
  position
) {
  registerNewUserAndLogin(user, consentCheckBox);
  checkBanner();
  navigateToConsentPage();
  checkInputConsentState(position, BE_CHECKED);
}

export function testAsAnonymousUser() {
  it('should be able to see the banner', () => {
    // waitFiveSeconds();
    seeBannerAsAnonymous();
  });

  it('should close the banner and give all consents by clicking on "ALLOW ALL" in the banner', () => {
    clickAllowAllFromBanner();
    checkBannerHidden();
  });

  it('should click the footer to check if all consents were accepted and withdraw all consents afterwards', () => {
    openDialogUsingFooterLink();
    checkAllInputConsentState(BE_CHECKED);
    clearAllConsent();
  });

  it('should click the footer to check if all consents were rejected and accept all consents again', () => {
    openDialogUsingFooterLink();

    checkAllInputConsentState(NOT_BE_CHECKED);

    selectAllConsent();
  });
}

export function giveRegistrationConsentTest() {
  it('should give the registration consent', () => {
    // waitFiveSeconds();
    registerUserAndCheckMyAccountConsent(
      userGiveConsentRegistrationTest,
      true,
      0
    );
  });
}

export function movingFromAnonymousToRegisteredUser() {
  it('should transfer anonoymous consents when registered', () => {
    // waitFiveSeconds();
    openDialogUsingFooterLink();
    toggleAnonymousConsent(2);
    closeDialog();

    registerUserAndCheckMyAccountConsent(userTransferConsentTest, false, 1);
  });
}

export function moveAnonymousUserToLoggedInUser() {
  it('should ignore the anonymous consents and load the previously given registered consents', () => {
    // waitFiveSeconds();

    navigateToConsentPage();
    giveConsent();

    navigateToHome();
    checkBanner();
    signOutUser();

    clickViewDetailsFromBanner();
    toggleAnonymousConsent(2);
    closeDialog();

    const loginPage = waitForPage('/login', 'getLoginPage');
    cy.getByText(/Sign in \/ Register/i).click();
    cy.wait(`@${loginPage}`);

    login(
      standardUser.registrationData.email,
      standardUser.registrationData.password
    );
    checkBanner();

    navigateToConsentPage();
    checkInputConsentState(0, BE_CHECKED);
    checkInputConsentState(1, NOT_BE_CHECKED);
  });
}

export function testAsLoggedInUser() {
  it('should not render the banner', () => {
    // waitFiveSeconds();
    checkBanner();
    loggedInUserBannerTest();
  });

  it('should not render the footer link', () => {
    loggedInUserFooterLinkTest();
  });

  it('should restore anonoymous consents when logging out', () => {
    checkBanner();
    signOutUser();

    clickViewDetailsFromBanner();
    toggleAnonymousConsent(2);
    closeDialog();

    const loginPage = waitForPage('/login', 'getLoginPage');
    cy.getByText(/Sign in \/ Register/i).click();
    cy.wait(`@${loginPage}`);

    login(
      standardUser.registrationData.email,
      standardUser.registrationData.password
    );

    checkBanner();
    signOutUser();

    openDialogUsingFooterLink();
    checkInputConsentState(1, BE_CHECKED);
  });
}

export function changeLanguageTest() {
  it('should pull the new consent templates but preserve the consents state', () => {
    // waitFiveSeconds();

    clickViewDetailsFromBanner();
    selectAllConsent();

    openDialogUsingFooterLink();
    checkAllInputConsentState(BE_CHECKED);
    closeDialog();

    cy.route('GET', `*${LANGUAGE_DE}*`).as('switchedContext');
    switchSiteContext(LANGUAGE_DE, LANGUAGE_LABEL);
    cy.wait('@switchedContext');

    openDialogUsingFooterLink();
    checkAllInputConsentState(BE_CHECKED);
  });
}

export function showAnonymousConfigTest() {
  it('should not display the consents on the consents management page', () => {
    navigateToConsentPage();
    checkConsentsInConsentPage();

    signOutUser();
  });

  it('should not display the legal in the dialog', () => {
    clickViewDetailsFromBanner();
    checkDialogDescroption();
    closeDialog();
  });
}

export function anonymousConfigTestFlow() {
  it('should not have the store user information consent visible', () => {
    openDialogUsingFooterLink();
    checkConsentNotExist(personalizationConsentLabel);
  });
}
