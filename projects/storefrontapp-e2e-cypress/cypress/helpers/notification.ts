import { generateMail, randomString } from './user';
import { login } from './auth-forms';
import { standardUser } from '../sample-data/shared-users';
import { apiUrl } from '../support/utils/login';

export const normalProductCode = '872912';
export const firstProductCodeSelector =
  'cx-my-interests .cx-product-interests-product-item:first .cx-code';
export const firstProductAscending = '4205431';
export const firstProductDescending = '898520';
export const secondPageResp = {
  pagination: {
    count: 1,
    page: 1,
    totalCount: 11,
    totalPages: 2,
  },
  sorts: [
    {
      asc: false,
      code: 'name',
    },
  ],
  results: [
    {
      product: {
        code: '872912',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
  ],
};
export const firstPageResp = {
  pagination: {
    count: 10,
    page: 0,
    totalCount: 10,
    totalPages: 2,
  },
  results: [
    {
      product: {
        code: '898520',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '1934793',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '553637',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '2053266',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '932577',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '816379',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '3357724',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '358639',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '592506',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
    {
      product: {
        code: '4205431',
      },
      productInterestEntry: [
        {
          dateAdded: '2020-02-14T07:58:44+0000',
          expirationDate: '2020-05-14T07:58:44+0000',
          interestType: 'BACK_IN_STOCK',
        },
      ],
    },
  ],
  sorts: [
    {
      asc: false,
      code: 'name',
    },
  ],
};
// notification preference
export function navigateToNotificationPreferencePage() {
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
}

export function verifyNotificationPrefAsAnonymous() {
  cy.visit('/my-account/notification-preference');
  cy.location('pathname').should('contain', '/login');
}

export function enableNotificationChannel() {
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .check();
}

export function disableNotificationChannel() {
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .uncheck();
}

export function verifyNotificationChannel() {
  enableNotificationChannel();
  verifyChannelEnabled();
  disableNotificationChannel();
  verifyChannelDisabled();
}

export function updateEmail(): String {
  const password = 'Password123.';
  const newUid = generateMail(randomString(), true);
  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="password"]').type(password);
  cy.get('cx-update-email-form button[type="submit"]').click();
  login(newUid, password);
  return newUid;
}

export function verifyChannelValueUpdating() {
  verifyEmailChannel(standardUser.registrationData.email);
  const newEmail = updateEmail();
  verifyEmailChannel(newEmail);
}

export function verifyChannelDisabled() {
  cy.visit('/');
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .should('not.be.checked');
}

export function verifyChannelEnabled() {
  cy.visit('/');
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .should('be.checked');
}

export function verifyEmailChannel(email: String) {
  navigateToNotificationPreferencePage();
  cy.get('cx-notification-preference').within(() => {
    cy.get('.pref-channel .form-check-label').should(
      'contain',
      'Email: ' + email
    );
    cy.get('[type="checkbox"]')
      .first()
      .should('not.be.checked');
  });
}
//stock notification
export function verifyStockNotificationAsGuest() {
  navigateToPDP(normalProductCode);
  cy.get('.stock-notification-notes > label > a').click();
  cy.location('pathname').should('contain', '/login');
}

export function navigateToPDP(productCode: string) {
  cy.visit(`/electronics-spa/en/USD/product/${productCode}`);
}

export function verifyStockNotificationWithoutChannel() {
  navigateToPDP(normalProductCode);
  cy.get('.stock-notification-notes > label > a').click();
  cy.location('pathname').should('contain', '/notification-preference');
}

export function verifyCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
  });
}

export function subscribeStockNotification(productCode: string) {
  clickNotifyMeBtn(productCode);
  cy.get('.cx-dialog-actions > .btn').click();
}

export function unsubscribeStockNotification(productCode: string) {
  navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
}

export function clickNotifyMeBtn(productCode: string) {
  navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).click();
    });
}

export function verifyStockNotification() {
  enableNotificationChannel();
  clickNotifyMeBtn(normalProductCode);
  verifyNavigateToNotificationPreferenceInDialog();
  unsubscribeStockNotification(normalProductCode);
  verifyUnsubscribe();
  clickNotifyMeBtn(normalProductCode);
  verifyNavigateToMyInterestsInDialog();
}

export function verifyUnsubscribe() {
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
}

export function verifyNavigateToNotificationPreferenceInDialog() {
  cy.get('.link-prefs').click();
  cy.location('pathname').should(
    'contain',
    '/my-account/notification-preference'
  );
}

export function verifyNavigateToMyInterestsInDialog() {
  cy.get('.link-interests').click();
  verifyCustomerInterest(normalProductCode);
}
//Customer interest
export function verifyMyInterestsAsAnonymous() {
  cy.visit('/my-account/my-interests');
  cy.location('pathname').should('contain', '/login');
}

export function verifySubscriptionAndCustomerInterest(productCode: string) {
  subscribeStockNotification(productCode);
  navigateToMyInterestsPage();
  verifyCustomerInterest(productCode);
}

export function verifyCustomerInterests() {
  verifySubscriptionAndCustomerInterest(normalProductCode);
  removeCustomerInterest(normalProductCode);
}

export function removeCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get('.cx-product-interests-remove-button > button').click();
  });
  cy.get('.cx-product-interests-message').should('exist');
}

export function verifyRemovingCustomerInterestInPDP() {
  subscribeStockNotification(normalProductCode);
  navigateToMyInterestsPage();
  navigateToPDPInCustomerInterest(normalProductCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
  navigateToMyInterestsPage();
  cy.get('.cx-product-interests-message').should('exist');
}

export function navigateToPDPInCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get(
      '.cx-product-interests-product-image-link > .is-initialized > img'
    ).click();
  });
}

export function stubForPaginableInterests(resp: any, url: string) {
  cy.server({
    response: resp,
  });
  cy.route('GET', url).as('paginable_interests');
}

export function verifyPagingAndSorting() {
  stubForPaginableInterests(
    firstPageResp,
    `${apiUrl}/rest/v2/electronics-spa/users/current/productinterests?fields=sorts,pagination,results(productInterestEntry,product(code))&sort=name:desc&pageSize=10&lang=en&curr=USD`
  );
  stubForPaginableInterests(
    secondPageResp,
    `${apiUrl}/rest/v2/electronics-spa/users/current/productinterests?fields=sorts,pagination,results(productInterestEntry,product(code))&sort=name:desc&pageSize=10&currentPage=1&lang=en&curr=USD`
  );
  navigateToMyInterestsPage();
  cy.get(firstProductCodeSelector).should('contain', firstProductAscending);
  cy.get('.top cx-sorting .ng-select').ngSelect('Name (descending)');
  cy.get(firstProductCodeSelector).should('contain', firstProductDescending);
  cy.get('.cx-product-interests-product-item').should('have.length', 10);
  cy.get('cx-pagination:first .page-link').should('have.length', 4);
  cy.get('.page-link')
    .last()
    .click();
  cy.get('.cx-code > span').should('contain.text', 'ID 872912');
}

export function navigateToMyInterestsPage() {
  cy.selectUserMenuOption({
    option: 'My Interests',
  });
}
