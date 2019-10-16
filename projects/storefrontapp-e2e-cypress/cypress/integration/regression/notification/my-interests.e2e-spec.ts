import * as orderDetail from '../../../helpers/consignment-tracking';

describe('my interests', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    orderDetail.loginUsingUserWithOrder();
  });

  it('should subscribe stock notification using configurable product', () => {});

  it('should subscribe stock notification using variant product', () => {});

  it('should subscribe stock notification using normal product', () => {});

  it('should remove customer interest', () => {});

  it('should navigate to PDP when clicking product', () => {});

  it('?should page and sort', () => {});
});
