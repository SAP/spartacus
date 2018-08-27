import { AddedToCartModal } from './cmslib/addedToCartModal.po';
import { HomePage } from './pages/home.po';
import { LoginHelper } from './pages/login/login.helper';
import { LoginForm } from './pages/login/login-form.po';
import { OrderHistoryPage } from './pages/account/order-history.po';
import { MultiStepCheckoutPage } from './pages/checkout/multi-step-checkout.po';

describe('Checkout Happy Path', () => {
  it('should go through checkout', async () => {
    const home: HomePage = new HomePage();

    // 1.	Go to Home
    await home.navigateTo();
    await home.waitForReady();

    // 2.	Register a new user.
    await LoginHelper.registerNewUser();

    // 3.	Log out.
    await LoginHelper.logOutViaHeader();

    // 4.	Go to a category listing.
    const categoryDslr = await home.navigateViaSplashBanner();
    await categoryDslr.waitForReady();

    // 5.	Click a product to display its details.
    const productDetailsPage = await categoryDslr.openProduct(4);
    await productDetailsPage.waitForReady();
    await productDetailsPage.addToCartButton.click();

    // 4.	Added-to-Cart modal opens. Close it.
    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    await atcModal.proceedToCheckoutButton.click();

    const form = new LoginForm();
    await form.fillInForm(LoginHelper.userEmail, LoginHelper.userPassword);
    await form.submitLogin();

    // 8.	Log in. Should see checkout page.
    const checkoutPage = new MultiStepCheckoutPage();

    // 9.	Checkout:
    //   1.	Ship to: Since it's a new user, should see new shipping address form. Enter shipping address.

    const addressForm = checkoutPage.addressForm;
    await addressForm.waitForReady();
    await addressForm.fillIn();
    await addressForm.nextButton.click();

    // 2. Shipping method: Select first method.
    const deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    // 3. Payment: Since it's a new user, should see new payment form. Enter payment details. Use shipping address as payment address.
    const paymentForm = checkoutPage.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    // 4.	Review: Select T&C and submit.
    const reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();
    const orderConfirmationPage = await reviewForm.placeOrder();
    await orderConfirmationPage.waitForReady();

    expect(await orderConfirmationPage.confirmationHeader.getText()).toContain(
      'Confirmation of Order'
    );
    expect(await orderConfirmationPage.confimationMessage.getText()).toContain(
      'Thank you for your order!'
    );

    // 10.	Go to my-account and assess that the new order is the newest in the list.
    const orderHistoryPage = new OrderHistoryPage();
    await orderHistoryPage.goToViaHeader();
    await orderHistoryPage.waitForReady();
    expect(await orderHistoryPage.historyHeader.getText()).toContain(
      '1 orders found in your Order History'
    );

    // Logout at the end of test
    await LoginHelper.logOutViaHeader();
  });
});
