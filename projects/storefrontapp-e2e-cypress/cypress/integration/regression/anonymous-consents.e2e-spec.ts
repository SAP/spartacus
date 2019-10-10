import {
  bannerTest,
  changeLanguageTest,
  dialogTest,
  footerLinkTest,
  giveRegistrationConsentTest,
  loggedInUserBannerTest,
  loggedInUserFooterLinkTest,
  moveAnonymousUserToLoggedInUser,
  movingFromAnonymousToRegisteredUser,
  movingFromLoggedInUserToAnonymousUser,
} from '../../helpers/anonymous-consents';

describe('Anonymous consents', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.visit('/');
  });
  describe('when anonymous user', () => {
    describe('footer link tests', () => {
      footerLinkTest();
    });
    describe('banner tests', () => {
      bannerTest();
    });
    describe('dialog tests', () => {
      dialogTest();
    });
  });
});
describe('when a user is logged in', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.requireLoggedIn();
    cy.reload();
    cy.visit('/');
  });

  describe('footer link tests', () => {
    loggedInUserFooterLinkTest();
  });
  describe('banner tests', () => {
    loggedInUserBannerTest();
  });
});

describe('moving from anonymous user to the logged in user', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.visit('/');
  });

  moveAnonymousUserToLoggedInUser();
});

describe('moving from the anonymous user to the registered user', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.visit('/');
  });

  movingFromAnonymousToRegisteredUser();
});

describe('moving from logged in user to anonymous user', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.visit('/');
  });

  movingFromLoggedInUserToAnonymousUser();
});

describe('changing language should not affect consents state', () => {
  before(() => {
    cy.window().then(win => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
    cy.visit('/');
  });

  changeLanguageTest();
});

describe('give registration consent', () => {
  before(() => {
    cy.window().then(win => win.localStorage.clear());
    cy.visit('/');
  });

  giveRegistrationConsentTest();
});
