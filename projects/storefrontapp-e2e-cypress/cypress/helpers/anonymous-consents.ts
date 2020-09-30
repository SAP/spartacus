import { giveConsent } from '../helpers/consent-management';
import { standardUser } from '../sample-data/shared-users';
import { switchSiteContext } from '../support/utils/switch-site-context';
import { login, register, RegisterUser } from './auth-forms';
import { waitForPage } from './checkout-flow';
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
const userGiveConsentRegistrationTest: RegisterUser = {
  firstName: 'John',
  lastName: 'Doe',
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
  newUser: RegisterUser,
  giveRegistrationConsent = false,
  hiddenConsent?
) {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.getByText(/Sign in \/ Register/i).click();
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);
  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.getByText('Register').click();
  cy.wait(`@${registerPage}`).its('status').should('eq', 200);
  register(newUser, giveRegistrationConsent, hiddenConsent);
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
  cy.wait(`@${consentsPage}`).its('status').should('eq', 200);
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
  cy.get(ANONYMOUS_DIALOG).should(NOT_EXIST);
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
  it('should be able to see the banner', () => {
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
    registerUserAndCheckMyAccountConsent(
      userGiveConsentRegistrationTest,
      clickRegistrationConsent,
      firstCheckBoxPosition
    );
  });
}

export function movingFromAnonymousToRegisteredUser() {
  it('should transfer anonoymous consents when registered', () => {
    openDialogUsingFooterLink();
    toggleAnonymousConsent(2);
    closeDialog();

    registerUserAndCheckMyAccountConsent(
      userTransferConsentTest,
      noRegistrationConsent,
      secondCheckBoxPosition
    );
  });
}

export function moveAnonymousUserToLoggedInUser() {
  it('should ignore the anonymous consents and load the previously given registered consents', () => {
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
    cy.wait(`@${loginPage}`).its('status').should('eq', 200);

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
    cy.wait(`@${loginPage}`).its('status').should('eq', 200);

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
    clickViewDetailsFromBanner();
    selectAllConsent();

    openDialogUsingFooterLink();
    checkAllInputConsentState(BE_CHECKED);
    closeDialog();

    cy.route('GET', `*${LANGUAGE_DE}*`).as('switchedContext');
    switchSiteContext(LANGUAGE_DE, LANGUAGE_LABEL);
    cy.wait('@switchedContext').its('status').should('eq', 200);

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
    checkDialogDescription();
    closeDialog();
  });
}

export function anonymousConfigTestFlow() {
  it('should check if marketing consent in the dialog is disabled', () => {
    openDialogUsingFooterLink();
    checkInputConsentState(0, BE_DISABLED);
    closeDialog();
  });

  it('should check new register consent and personalizing not visible in consent management page', () => {
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
