import * as notification from '../../../helpers/notification';
import { formats } from '../../../sample-data/viewports';

context(`${formats.mobile.width + 1}my interests`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.requireLoggedIn();
    cy.visit('/');
    notification.enableNotificationPreferenceChannel();
  });

  notification.myInterestTests();
});
