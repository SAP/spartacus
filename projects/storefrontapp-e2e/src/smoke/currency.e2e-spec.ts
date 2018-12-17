import { browser, ExpectedConditions as EC } from 'protractor';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddressForm } from '../page-objects/checkout/address-form.po';
import { MultiStepCheckoutPage } from '../page-objects/checkout/multi-step-checkout.po';
import { LoginHelper } from './../page-objects/login/login.helper';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';

describe('Currency switcher', () => {
  let productPage: ProductDetailsPage;
  let checkout: MultiStepCheckoutPage;
  // product id and prices for this product
  const PRODUCT_ID = '3595723';
  const PRICE_USD = '$2,002.48';
  const PRICE_JPY = '¥170,610';

  beforeEach(async () => {
    productPage = new ProductDetailsPage();
    checkout = new MultiStepCheckoutPage();
  });

  afterEach(async () => {
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    await productPage.header.currencySwitcher.click();
    await productPage.header.currencyOption('USD').click();
  });

  it('switch should work and currency should be persistent', async () => {
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    const location = await browser.getCurrentUrl();
    expect(await productPage.productPrice.getText()).toContain(PRICE_USD);
    await productPage.header.currencySwitcher.click();
    await productPage.header.currencyOption('JPY').click();
    // currency should change
    await browser.wait(
      EC.textToBePresentInElement(productPage.productPrice, PRICE_JPY),
      5000
    );
    // location after changing currency shouldn't change
    expect(await browser.getCurrentUrl()).toBe(location);
    // reload keeps the currency settings
    await browser.refresh();
    await productPage.waitForReady();
    expect(await productPage.productPrice.getText()).toContain(PRICE_JPY);
  });

  it('user input should not be removed on currency change', async () => {
    const TEST_FIRST_NAME = 'testFirstName';
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    // currency switch with forms can only be checked on checkout
    // for that we need to log in
    await LoginHelper.registerNewUser();
    // add to cart product - required product in cart to go to checkout page
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    await productPage.addToCart();
    // go to checkout page
    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();
    await atcModal.goToCheckoutButton.click();
    const addressForm = new AddressForm(checkout.shippingAddress.container);
    await addressForm.waitForReady();
    await addressForm.firstName.sendKeys(TEST_FIRST_NAME);
    await checkout.header.currencySwitcher.click();
    await checkout.header.currencyOption('JPY').click();
    // currency should change
    await browser.wait(
      EC.textToBePresentInElement(checkout.orderSummary, PRICE_JPY),
      5000
    );
    expect(addressForm.firstName.getAttribute('value')).toEqual(
      TEST_FIRST_NAME
    );
    // cleanup - log out
    await LoginHelper.logOutViaHeader();
  });
});
