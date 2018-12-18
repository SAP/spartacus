import { HomePage } from '../page-objects/home.po';
import { MultiStepCheckoutPage } from '../page-objects/checkout/multi-step-checkout.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { E2EUtil } from '../e2e-util';
import { LoginForm } from '../page-objects/login/login-form.po';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { browser } from 'protractor';

fdescribe('Terms and Conditions', () => {
  const home: HomePage = new HomePage();
  const checkoutPage = new MultiStepCheckoutPage();

  beforeAll(async () => {
    // Go to Home
    await home.navigateTo();
    await home.waitForReady();
  });

  it('should navigate to the T&C Page correctly', async () => {
    // Register a new user.
    await LoginHelper.registerNewUser();
    await LoginHelper.logOutViaHeader();

    const categoryDslr = await home.navigateViaSplashBanner();
    await categoryDslr.waitForReady();

    // Go to product page.
    const productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.waitForReady();

    // Add-to-Cart.
    await productDetailsPage.itemCounterUpButton.click();
    await productDetailsPage.addToCartButton.click();
    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();
    const item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);
    await atcModal.goToCheckoutButton.click();

    // Log in. Go to checkout page.
    const form = new LoginForm();
    await form.waitForReady();
    await form.fillInForm(LoginHelper.userEmail, LoginHelper.userPassword);
    await form.submitLogin();

    // Fill in the shipping address
    const shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    const addressForm = shippingAddress.addressForm;
    await addressForm.waitForReady();
    await addressForm.fillIn();
    await addressForm.nextButton.click();

    // Choose the delivery
    const deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    // Fill in the payment form
    const paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();

    const paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    // Open Terms and conditions
    const reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();
    const termsAndConditionsPage = await checkoutPage.openTermsAndConditions();
    await termsAndConditionsPage.waitForReady();

    expect(await browser.getCurrentUrl()).toBe(
      'http://localhost:4200/terms-and-conditions'
    );
  });
});
