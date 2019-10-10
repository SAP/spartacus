export function seeBannerAsAnonymous() {
  cy.get('cx-anonymous-consent-management-banner').should('exist');
}

export function checkBannerHidden() {
  cy.get('cx-anonymous-consent-management-banner').should('not.be.visible');
}

export function openDialogUsingFooterLink() {
  cy.get('.anonymous-consents').within(() => {
    const link = cy.get('a');
    link.should('exist');
    link.click();
  });
}

export function checkDialogOpen() {
  cy.get('cx-anonymous-consents-dialog').should('exist');
}

export function checkDialogClosed() {
  cy.get('cx-anonymous-consents-dialog').should('not.exist');
}

export function closeDialog() {
  cy.get('cx-anonymous-consents-dialog button.close').click();
}

export function checkConsentsGiven() {
  cy.get('.cx-toggle-text').each($match => {
    console.log($match);
    console.log(cy.wrap($match));
    cy.wrap($match).should('contain.text', 'ON');
  });
}

export function checkConsentsWithdrawn() {
  cy.get('.cx-toggle-text').each($match => {
    console.log($match);
    console.log(cy.wrap($match));
    cy.wrap($match).should('contain.text', 'OFF');
  });
}

export function bannerTest() {
  it('should be able to see the banner as an anonymous user', () => {
    seeBannerAsAnonymous();
  });
  it('should close the banner and give all consents by clicking on Allow All in the banner', () => {
    cy.get('cx-anonymous-consent-management-banner')
      .find('.btn-primary')
      .click();
    checkBannerHidden();
  });
  describe('when View Details button is clicked', () => {
    before(() => {
      cy.window().then(win => win.localStorage.clear());
      cy.visit('/');
    });
    it('should close the banner and open the dialog', () => {
      cy.get('cx-anonymous-consent-management-banner')
        .find('.btn-action')
        .click();
      checkBannerHidden();
      checkDialogOpen();
      closeDialog();
    });
  });
}

export function loggedInUserBannerTest() {
  it('should not render the banner', () => {
    cy.get('cx-anonymous-consent-management-banner').should('not.exist');
  });
}

export function footerLinkTest() {
  describe('when anonymous', () => {
    it('should see the footer link and open the dialog', () => {
      openDialogUsingFooterLink();
      checkDialogOpen();
      closeDialog();
    });
  });
}

export function loggedInUserFooterLinkTest() {
  it('should not render the footer link', () => {
    cy.get('.anonymous-consents').should('not.exist');
  });
}

export function dialogTest() {
  describe('dialog tests', () => {
    beforeEach(() => {
      openDialogUsingFooterLink();
    });

    afterEach(() => {
      closeDialog();
    });

    describe('Allow all', () => {
      it('should allow all consents and close the dialog', () => {
        cy.get('cx-anonymous-consents-dialog').within(() => {
          cy.get('.cx-dialog-buttons > :nth-child(3)').click();
        });
        checkDialogClosed();
        openDialogUsingFooterLink();
        checkConsentsGiven();
      });
    });

    describe('Reject all', () => {
      it('should withdraw all consents and close the dialog', () => {
        cy.get('cx-anonymous-consents-dialog').within(() => {
          cy.get('.cx-dialog-buttons > :nth-child(1)').click();
        });
        checkDialogClosed();
        openDialogUsingFooterLink();
        checkConsentsWithdrawn();
      });
    });
  });
}
