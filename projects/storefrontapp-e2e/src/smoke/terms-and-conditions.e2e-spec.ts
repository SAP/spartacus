import { HomePage } from '../page-objects/home.po';
import { MultiStepCheckoutPage } from '../page-objects/checkout/multi-step-checkout.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { E2EUtil } from '../e2e-util';
import { LoginForm } from '../page-objects/login/login-form.po';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { browser } from 'protractor';

fdescribe('Path to Terms and Conditions', () => {
  const home: HomePage = new HomePage();
  const checkoutPage = new MultiStepCheckoutPage();

  const USER_FULL_NAME = `${LoginHelper.DEFAULT_FIRST_NAME} ${
    LoginHelper.DEFAULT_LAST_NAME
  }`;
  const PRODUCT_NAME = 'Alpha 350';
  const PRODUCT_CODE = '1446509';

  beforeAll(async () => {
    await home.navigateTo();
    await home.waitForReady();
  });

  it('should register successfully', async () => {
    await LoginHelper.registerNewUser();
    expect(await home.header.isLoggedIn()).toBeTruthy();
    expect(await home.header.loginComponent.getText()).toContain(
      USER_FULL_NAME
    );
    await LoginHelper.logOutViaHeader();
  });

  it('should go through category to product page', async () => {
    const categoryDslr = await home.navigateViaSplashBanner();
    await categoryDslr.waitForReady();

    const productDetailsPage = await categoryDslr.openProduct(6);
    await productDetailsPage.waitForReady();
    expect(await productDetailsPage.productTitle.getText()).toEqual(
      PRODUCT_NAME
    );
    expect(await productDetailsPage.productCode.getText()).toContain(
      PRODUCT_CODE
    );
  });

  it('should navigate through checkout to T&C Page', async () => {
    const productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.itemCounterUpButton.click();
    await productDetailsPage.addToCartButton.click();

    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    const item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);
    await atcModal.goToCheckoutButton.click();

    const form = new LoginForm();
    await form.waitForReady();
    await form.fillInForm(LoginHelper.userEmail, LoginHelper.userPassword);
    await form.submitLogin();

    const shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    const addressForm = shippingAddress.addressForm;
    await addressForm.waitForReady();
    await addressForm.fillIn();
    await addressForm.nextButton.click();

    const deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    const paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();
    const paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    const reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();
    const termsAndConditionsPage = await checkoutPage.openTermsAndConditions();
    await termsAndConditionsPage.waitForReady();

    expect(await browser.getCurrentUrl()).toBe(
      'http://localhost:4200/terms-and-conditions'
    );
  });
});
