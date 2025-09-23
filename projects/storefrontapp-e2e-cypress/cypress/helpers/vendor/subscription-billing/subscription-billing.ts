import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { SampleProduct } from '../../../sample-data/checkout-flow';
import { interceptPaymentTypesEndpoint } from '../../b2b/b2b-checkout';
import { waitForProductPage, addCheapProductToCart } from '../../checkout-flow';
import { waitForPage } from '../../navigation';

export const subscriptionUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  firstName: 'James',
  lastName: 'Weber',
  titleCode: 'mr',
};

export const subscriptionProduct: SampleProduct = {
  code: 'Mobile_2020_Plan_cpq',
  name: 'Mobile 2020 Plan',
};

export const nonServiceProduct: SampleProduct = {
  name: 'D10VC2',
  code: '3887119',
};

export function addProductToCart(product: SampleProduct) {
    console.log('Adding product to cart: ', product);
  const productPage = waitForProductPage(product.code, 'getProductPage');
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${product.code}`);
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  addCheapProductToCart(product);
}

export function proceedToCheckout() {
  const getPaymentTypes = interceptPaymentTypesEndpoint();
  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${getPaymentTypes}`).its('response.statusCode').should('eq', 200);
}
