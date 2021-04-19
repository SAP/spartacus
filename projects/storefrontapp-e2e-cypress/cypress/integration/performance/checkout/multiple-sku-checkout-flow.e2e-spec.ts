import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import * as productSearchFlow from '../../../helpers/product-search';
//import { viewportContext } from '../../../helpers/viewport-context';

context('Checkout flow', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout multiple sku', () => {
      const user = getSampleUser();
      cy.fixture("searchkeywords").then((keywords) => {
        const searchkeywords = keywords.keywords;  
        console.log(searchkeywords);
        checkout.visitHomePage();
        checkout.clickHamburger();
        checkout.registerAndSignInUser(false, user);

        for (var query of searchkeywords){
            console.log(query);
            productSearchFlow.searchForProductAddToCart(query);
        }
        
        productSearchFlow.goToCartPage();
        checkout.proceedToCheckoutSignedInUser();
        checkout.fillAddressFormNoProduct(user);
        checkout.verifyDeliveryMethod();
        checkout.fillPaymentFormNoProduct();
        checkout.placeOrder(false);
        checkout.verifyOrder();
      })
    });
  });
});
