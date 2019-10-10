import {
  bannerTest,
  dialogTest,
  footerLinkTest,
  loggedInUserBannerTest,
  loggedInUserFooterLinkTest,
  moveAnonymousUserToLoggedInUser,
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
