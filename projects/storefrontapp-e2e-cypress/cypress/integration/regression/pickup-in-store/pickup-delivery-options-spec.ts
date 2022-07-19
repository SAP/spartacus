import { configureApparelProduct } from '../../../helpers/product-details';
import { viewportContext } from '../../../helpers/viewport-context';

function mockLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
        (cb, err) => {
          console.log('Inside the getCurrentPosition callback')
          if ((latitude || latitude === 0) && (longitude || longitude === 0)) {
            return cb({ coords: { latitude, longitude } });
          }

          throw err({ code: 1 });
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

    it('test', () => {});
  });
});
