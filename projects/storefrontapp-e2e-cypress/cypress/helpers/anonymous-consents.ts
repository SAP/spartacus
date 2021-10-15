import { giveConsent } from '../helpers/consent-management';
import { SampleUser } from '../sample-data/checkout-flow';
import { standardUser } from '../sample-data/shared-users';
import { switchSiteContext } from '../support/utils/switch-site-context';
import { login, register } from './auth-forms';
import { clickHamburger, waitForPage } from './checkout-flow';
import { checkBanner } from './homepage';
import { signOutUser } from './login';
import { LANGUAGE_DE, LANGUAGE_LABEL } from './site-context-selector';
import { generateMail, randomString } from './user';

export const ANONYMOUS_BANNER = 'cx-anonymous-consent-management-banner';
const ANONYMOUS_DIALOG = 'cx-anonymous-consent-dialog';
const BE_CHECKED = 'be.checked';
const NOT_BE_CHECKED = 'not.be.checked';
const BE_DISABLED = 'be.disabled';
const NOT_EXIST = 'not.exist';
const noRegistrationConsent = false;
const clickRegistrationConsent = true;
const firstCheckBoxPosition = 0;
const secondCheckBoxPosition = 1;

export const MARKETING_NEWSLETTER = 'MARKETING_NEWSLETTER';
export const PROFILE = 'PROFILE';
export const STORE_USER_INFORMATION = 'STORE_USER_INFORMATION';
export const noLegalDescriptionInDialog = false;
export const displayLegalDescriptionInDialog = true;

const personalizationConsentLabel = 'personalised';
const userGiveConsentRegistrationTest: SampleUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};
const userTransferConsentTest: SampleUser = {
  firstName: 'Cypress',
  lastName: 'AnonymousUser',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};
const userFromConfigTest: SampleUser = {
  firstName: 'x',
  lastName: 'x',
  email: generateMail(randomString(), true),
  password: 'Password123!',
};

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
  newUser: SampleUser,
  giveRegistrationConsent = false,
  hiddenConsent?
) {
  cy.visit('/login/register');
  register(newUser, giveRegistrationConsent, hiddenConsent);
  cy.get('cx-breadcrumb').contains('Login');

  login(newUser.email, newUser.password);
}

export function navigateToConsentPage() {
  const consentsPage = waitForPage('/my-account/consents', 'getConsentsPage');
  cy.selectUserMenuOption({
    option: 'Consent Management',
  });
  cy.wait(`@${consentsPage}`).its('response.statusCode').should('eq', 200);
}

export function seeBannerAsAnonymous() {
  cy.get(ANONYMOUS_BANNER).should('exist');
}

export function checkBannerHidden() {
  cy.get(ANONYMOUS_BANNER).should('not.be.visible');
}

export function checkDialogDescription() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-dialog-description`).should(NOT_EXIST);
}

export function checkConsentsInConsentPage() {
  cy.get('.cx-consent-toggles cx-consent-management-form').should(NOT_EXIST);
}

export function clickAllowAllFromBanner() {
  cy.get(ANONYMOUS_BANNER).find('.btn-primary').click();
}

export function clickViewDetailsFromBanner() {
  cy.get(ANONYMOUS_BANNER).find('.btn-action').click({ force: true });
}

export function openAnonymousConsentsDialog() {
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
  cy.get(ANONYMOUS_DIALOG).should(NOT_EXIST);
}

export function closeAnonymousConsentsDialog() {
  cy.get(`${ANONYMOUS_DIALOG} button.close`).click({ force: true });
}

export function toggleAnonymousConsent(position) {
  cy.get(`.cx-dialog-row:nth-child(${position})`)
    .find('input')
    .click({ force: true });
}

export function checkInputConsentState(position, state) {
  cy.get('input[type="checkbox"]').eq(position).should(state);
}

export function checkAllInputConsentState(state) {
  cy.get('input[type="checkbox"]').each(($match) => {
    cy.wrap($match).should(state);
  });
}

export function selectAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`).eq(1).click({ force: true });
}

export function clearAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`).first().click({ force: true });
}

export function checkConsentNotExist(text) {
  cy.get(`${ANONYMOUS_DIALOG} .cx-dialog-row`)
    .find('label')
    .each(($match) => {
      cy.wrap($match).should('not.contain', text);
    });
}

export function loggedInUserBannerTest() {
  cy.get(ANONYMOUS_BANNER).should(NOT_EXIST);
}

export function loggedInUserFooterLinkTest() {
  cy.get('.anonymous-consents').should(NOT_EXIST);
}

export function sessionLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function registerUserAndCheckMyAccountConsent(
  user,
  consentCheckBox,
  position,
  hiddenConsent?
) {
  registerNewUserAndLogin(user, consentCheckBox, hiddenConsent);
  checkBanner();
  navigateToConsentPage();
  checkInputConsentState(position, BE_CHECKED);
}

export function testAsAnonymousUser() {
  it('should click the footer to check if all consents were accepted and withdraw all consents afterwards', () => {
    openAnonymousConsentsDialog();
    checkAllInputConsentState(BE_CHECKED);
    clearAllConsent();
  });

  it('should click the footer to check if all consents were rejected and accept all consents again', () => {
    openAnonymousConsentsDialog();

    checkAllInputConsentState(NOT_BE_CHECKED);

    selectAllConsent();
  });
}

export function giveRegistrationConsentTest() {
  it('should give the registration consent', () => {
    registerUserAndCheckMyAccountConsent(
      userGiveConsentRegistrationTest,
      clickRegistrationConsent,
      firstCheckBoxPosition
    );
  });
}

export function movingFromAnonymousToRegisteredUser() {
  it('should transfer anonymous consents and load the previously given registered consents when registered', () => {
    openAnonymousConsentsDialog();
    cy.log('Giving second consent as anonymous user');
    toggleAnonymousConsent(2);
    closeAnonymousConsentsDialog();

    // a new email is needed for a fresh user (due to viewports)
    userTransferConsentTest.email = generateMail(randomString(), true);
    registerUserAndCheckMyAccountConsent(
      userTransferConsentTest,
      noRegistrationConsent,
      secondCheckBoxPosition
    );

    cy.log('Giving first consent as logged in user');
    giveConsent();

    cy.log('Signing out logged in user');
    signOutUser();

    clickViewDetailsFromBanner();

    cy.log('Toggling second consent as anonymous user');
    toggleAnonymousConsent(2);
    closeAnonymousConsentsDialog();

    const loginPage = waitForPage('/login', 'getLoginPage');
    cy.onMobile(() => {
      clickHamburger();
    });
    cy.get('cx-login [role="link"]').click();
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

    login(userTransferConsentTest.email, userTransferConsentTest.password);

    cy.log('Checking logged in user consents overriding anonymous consents');
    navigateToConsentPage();
    checkInputConsentState(0, BE_CHECKED);
    checkInputConsentState(1, BE_CHECKED);
  });
}

export function testAsLoggedInUser() {
  it('should not render the banner and footer link', () => {
    cy.visit('/login');
    login(userTransferConsentTest.email, userTransferConsentTest.password);

    checkBanner();
    loggedInUserBannerTest();
    loggedInUserFooterLinkTest();

    signOutUser();

    openAnonymousConsentsDialog();
    checkInputConsentState(0, NOT_BE_CHECKED);
    checkInputConsentState(1, NOT_BE_CHECKED);
    checkInputConsentState(2, NOT_BE_CHECKED);
  });
}

export function changeLanguageTest() {
  it('should pull the new consent templates but preserve the consents state', () => {
    clickViewDetailsFromBanner();
    selectAllConsent();

    openAnonymousConsentsDialog();
    checkAllInputConsentState(BE_CHECKED);
    closeAnonymousConsentsDialog();

    cy.intercept({
      method: 'GET',
      query: {
        lang: LANGUAGE_DE,
      },
    }).as('switchedContext');
    cy.onMobile(() => {
      clickHamburger();
    });
    switchSiteContext(LANGUAGE_DE, LANGUAGE_LABEL);
    cy.wait('@switchedContext').its('response.statusCode').should('eq', 200);

    openAnonymousConsentsDialog();
    checkAllInputConsentState(BE_CHECKED);
  });
}

export function showAnonymousConfigTest() {
  it('should not display consents on the consents management page', () => {
    navigateToConsentPage();
    checkConsentsInConsentPage();

    signOutUser();
  });

  it('should not display the legal in the dialog', () => {
    clickViewDetailsFromBanner();
    checkDialogDescription();
    closeAnonymousConsentsDialog();
  });
}

export function anonymousConfigTestFlow() {
  it('should check new register consent and personalizing not visible in consent management page', () => {
    //first, check that marketing consent in the dialog is disabled
    openAnonymousConsentsDialog();
    checkInputConsentState(0, BE_DISABLED);
    closeAnonymousConsentsDialog();

    //then, register a user and check its consents
    registerUserAndCheckMyAccountConsent(
      userFromConfigTest,
      giveRegistrationConsentTest,
      secondCheckBoxPosition,
      personalizationConsentLabel
    );

    checkInputConsentState(0, BE_DISABLED);
    checkInputConsentState(3, NOT_EXIST);
  });
}
