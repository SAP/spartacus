import {
  giveRegistrationConsentTest,
  testAsAnonymousUser,
} from '../../helpers/anonymous-consents';

context('Anonymous consents', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  describe('when anonymous user', () => {
    before(() => {
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    testAsAnonymousUser();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });

  describe('when registering a user and checking registration consent', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });
    giveRegistrationConsentTest();
  });

  // ------------------
  // uncomment after talking because this doesn't work when user does not click the register consent
  // describe('moving from the anonymous user to the registered user', () => {
  //   before(() => {
  //     cy.window().then(win => {
  //       win.sessionStorage.clear();
  //       win.localStorage.clear();
  //     });
  //     cy.reload();
  //     cy.visit('/');
  //   });

  //   movingFromAnonymousToRegisteredUser();
  // });
  // ------------------

  // sessionuser not keeping consent, and can't test registered user because it's not allowing from my previous commment
  // where the user can't login because no register consent was not on
  // describe('moving from anonymous user to the logged in user', () => {
  //   before(() => {
  //     // sessionLogin();
  //     cy.reload();
  //     cy.visit('/');
  //   });

  //   moveAnonymousUserToLoggedInUser();
  // });
});

// CONTINUE BELOW TOMORROW **

// describe('when a user is logged in', () => {
//   before(() => {
//     cy.window().then(win => win.sessionStorage.clear());
//     cy.requireLoggedIn();
//     cy.reload();
//     cy.visit('/');
//   });

//   describe('footer link tests', () => {
//     loggedInUserFooterLinkTest();
//   });
//   describe('banner tests', () => {
//     loggedInUserBannerTest();
//   });
// });

// describe('moving from logged in user to anonymous user', () => {
//   before(() => {
//     cy.window().then(win => win.sessionStorage.clear());
//     cy.visit('/');
//   });

//   movingFromLoggedInUserToAnonymousUser();
// });
