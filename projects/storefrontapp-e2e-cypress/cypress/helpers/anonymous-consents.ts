import { giveConsent } from '../helpers/consent-management';
import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import { registerUser, waitForPage } from './checkout-flow';
import { checkBanner } from './homepage';
import { signOutUser } from './login';
import {
  LANGUAGES,
  LANGUAGE_DE,
  LANGUAGE_LABEL,
  LANGUAGE_REQUEST,
  siteContextChange,
  stub,
} from './site-context-selector';
import { generateMail, randomString } from './user';

const ANONYMOUS_BANNER = 'cx-anonymous-consent-management-banner';
const ANONYMOUS_DIALOG = 'cx-anonymous-consents-dialog';

export function seeBannerAsAnonymous() {
  cy.get(ANONYMOUS_BANNER).should('exist');
}

export function checkBannerHidden() {
  cy.get(ANONYMOUS_BANNER).should('not.be.visible');
}

export function clickAllowAllFromBanner() {
  cy.get(ANONYMOUS_BANNER)
    .find('.btn-primary')
    .click({ force: true });
}

export function clickViewDetailsFromBanner() {
  cy.get(ANONYMOUS_BANNER)
    .find('.btn-action')
    .click({ force: true });
}

export function openDialogUsingFooterLink() {
  cy.get('.anonymous-consents').within(() => {
    const link = cy.get('a');
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

export function giveOrRemoveAnonymousConsent(position) {
  cy.get(`.cx-dialog-row:nth-child(${position})`)
    .find('input')
    .click({ force: true });
}

export function checkConsentsGiven() {
  cy.get('.cx-toggle-text').each($match => {
    cy.wrap($match).should('contain.text', 'ON');
  });
}

export function checkConsentsWithdrawn() {
  cy.get('.cx-toggle-text').each($match => {
    cy.wrap($match).should('contain.text', 'OFF');
  });
}

export function rejectAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`)
    .contains('Reject All')
    .click({ force: true });
}

export function acceptAllConsent() {
  cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`)
    .contains('Allow All')
    .click({ force: true });
}

// export function loggedInUserBannerTest() {
//   it('should not render the banner', () => {
//     cy.get(ANONYMOUS_BANNER).should('not.exist');
//   });
// }

// export function loggedInUserFooterLinkTest() {
//   it('should not render the footer link', () => {
//     cy.get('.anonymous-consents').should('not.exist');
//   });
// }

export function sessionLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function moveAnonymousUserToLoggedInUser() {
  it('should ignore the anonymous consents and load the previously given registered consents', () => {
    cy.selectUserMenuOption({
      option: 'Consent Management',
    });

    giveConsent();
    signOutUser();
    checkBanner();

    clickViewDetailsFromBanner();
    giveOrRemoveAnonymousConsent(2);
    closeDialog();

    const loginPage = waitForPage('/login', 'getLoginPage');
    cy.getByText(/Sign in \/ Register/i).click();
    cy.wait(`@${loginPage}`);

    login(
      standardUser.registrationData.email,
      standardUser.registrationData.password
    );
    checkBanner();

    cy.selectUserMenuOption({
      option: 'Consent Management',
    });

    cy.get('input[type="checkbox"]')
      .first()
      .should('be.checked');
  });
}

export function movingFromAnonymousToRegisteredUser() {
  it('should transfer anonoymous consents when registered', () => {
    openDialogUsingFooterLink();
    giveOrRemoveAnonymousConsent(2);
    closeDialog();

    registerUserAndCheckMyAccountConsent(false, 2);
  });
}

// export function movingFromLoggedInUserToAnonymousUser() {
//   it('should restore anonoymous consents when logging out', () => {
//     const newUser = registerUser();
//     cy.visit(PAGE_URL_LOGIN);
//     login(newUser.email, newUser.password);
//     signOutUser();

//     openDialogUsingFooterLink();
//     giveOrRemoveAnonymousConsent(2);
//     closeDialog();

//     cy.visit(PAGE_URL_LOGIN);
//     login(newUser.email, newUser.password);
//     signOutUser();

//     openDialogUsingFooterLink();
//     cy.get('.cx-toggle-text:nth-child(2)').should('contain.text', 'ON');
//   });
// }

export function changeLanguageTest() {
  it('should pull the new consent templates but preserve the consents state', () => {
    openDialogUsingFooterLink();
    acceptAllConsent();

    siteContextChange('/', LANGUAGES, LANGUAGE_DE, LANGUAGE_LABEL);
    openDialogUsingFooterLink();
    checkConsentsGiven();
  });
}

export function registerUserAndCheckMyAccountConsent(
  consentCheckBox,
  position
) {
  const newUser = registerUser(consentCheckBox);
  login(newUser.email, newUser.password);
  checkBanner();
  cy.selectUserMenuOption({
    option: 'Consent Management',
  });
  cy.get(`input[type="checkbox"]:nth-child(${position})`)
    .first()
    .should('be.checked');
}

export function giveRegistrationConsentTest() {
  it('should give the registration consent', () => {
    registerUserAndCheckMyAccountConsent(true, 1);
  });
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
    // cy.wait(5000);
    openDialogUsingFooterLink();

    checkConsentsGiven();

    rejectAllConsent();
  });

  it('should click the footer to check if all consents were rejected and accept all consents again', () => {
    openDialogUsingFooterLink();

    checkConsentsWithdrawn();

    acceptAllConsent();
  });

  // I would put this here, but there's a problem (user can't login because it says dispatch had an error)
  // it('should transfer anonoymous consents when registered', () => {
  // openDialogUsingFooterLink();
  // checkConsentsGiven();

  // giveOrRemoveAnonymousConsent(2);
  // giveOrRemoveAnonymousConsent(1);
  // giveOrRemoveAnonymousConsent(3);
  // closeDialog();

  // registerUserAndCheckMyAccountConsent(false, 2);
  // });

  stub(LANGUAGE_REQUEST, LANGUAGES);

  it('should pull the new consent templates but preserve the consents state', () => {
    openDialogUsingFooterLink();
    checkConsentsGiven();

    siteContextChange('/', LANGUAGES, LANGUAGE_DE, LANGUAGE_LABEL);

    openDialogUsingFooterLink();
    checkConsentsGiven();
  });
}
