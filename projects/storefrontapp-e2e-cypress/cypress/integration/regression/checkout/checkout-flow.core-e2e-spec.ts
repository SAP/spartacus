import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';


let commands = []

Cypress.on('test:after:run', (attributes) => {
  /* eslint-disable no-console */
  console.log('Test "%s" has finished in %dms',
    attributes.title, attributes.duration)
  console.table(commands)
  commands.length = 0
})

Cypress.on('command:start', (c) => {
  commands.push({
    name: c.attributes.name,
    started: +new Date(),
  })
})

Cypress.on('command:end', (c) => {
  const lastCommand = commands[commands.length - 1]

  if (lastCommand.name !== c.attributes.name) {
    throw new Error('Last command is wrong')
  }

  lastCommand.endedAt = +new Date()
  lastCommand.elapsed = lastCommand.endedAt - lastCommand.started
})

context('Checkout flow', () => {
  viewportContext([/*'mobile',*/ 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.fillAddressFormWithCheapProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user);
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });
  });
});
