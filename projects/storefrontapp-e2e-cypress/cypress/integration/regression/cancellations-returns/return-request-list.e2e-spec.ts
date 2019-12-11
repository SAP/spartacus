import * as methods from '../../../helpers/cancellations-returns';

describe('Return Request List for Cancellations and Returns', () => {
  before(() => {
    cy.visit('/');
    // methods.signIn();
    methods.registerUser();
    methods.signIn();
  });

  it('should see order history tab and return request list tab', () => {
    methods.checkTabs();
  });

  it('should open the return request list tab and see a list', () => {
    methods.checkReturnRequestList();
  });

  it('should open order detail page when clicking order# on return list', () => {
    methods.checkOrderNumberLink();
  });

  it('should open return detail page when clicking return# on return list', () => {
    methods.checkReturnNumberLink();
  });
});
