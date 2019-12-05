import { formats } from '../../../sample-data/viewports';
import * as notification from '../../../helpers/notification';
import * as orderDetail from '../../../helpers/consignment-tracking';

describe(`${formats.mobile.width + 1}p resolution - My interests`, () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    notification.enableNotificationChannel();
  });

  it('should show/remove interest', () => {
    notification.verifyCustomerInterests();
  });

  it('should remove the subscrption in PDP', () => {
    notification.verifyRemovingCustomerInterestInPDP();
  });
});

describe(`${formats.mobile.width +
  1}p resolution - My interests paging and sorting`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    orderDetail.loginUsingUserWithOrder();
  });

  it('should page and sort', () => {
    notification.verifyPagingAndSorting();
  });
});
