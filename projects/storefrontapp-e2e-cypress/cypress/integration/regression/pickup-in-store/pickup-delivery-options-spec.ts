import { viewportContext } from '../../../helpers/viewport-context';

function mockLocation(
  latitude: number,
  longitude: number
): Partial<Cypress.VisitOptions> {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
        (successCallback, errorCallback, _options) => {
          if (typeof latitude === 'number' && typeof longitude === 'number') {
            return successCallback({ coords: { latitude, longitude } });
          }

          throw errorCallback({ code: 1 });
        }
      );
    },
  };
}

describe('Pickup delivery options', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/product/300310300', mockLocation(53, 0));
    });

    it('should open the pickup locations dialog', () => {
      cy.get('cx-pickup-delivery-options').should('exist');
      cy.get('#delivery').should('have.attr', 'aria-checked', 'true');
      cy.get('#pickup').click();
      cy.get('cx-delivery-pickup-options-dialog').should('exist');
    });
  });
});
