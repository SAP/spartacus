import {
  bannerTest,
  dialogTest,
  footerLinkTest,
  loggedInUserBannerTest,
  loggedInUserFooterLinkTest,
} from '../../helpers/anonymous-consents';

describe('Anonymous consents', () => {
  before(() => {
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
describe.only('when logged in user', () => {
  before(() => {
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
