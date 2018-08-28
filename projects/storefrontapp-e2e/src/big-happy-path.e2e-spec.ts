import { AddedToCartModal } from './cmslib/addedToCartModal.po';
import { HomePage } from './pages/home.po';
import { LoginHelper } from './pages/login/login.helper';
import { LoginForm } from './pages/login/login-form.po';
import { OrderHistoryPage } from './pages/account/order-history.po';
import { MultiStepCheckoutPage } from './pages/checkout/multi-step-checkout.po';
import { ProductDetailsPage } from './pages/productDetails.po';
import { E2EUtil } from './util.po';

describe('Big Happy Path', () => {
  const home: HomePage = new HomePage();
  const checkoutPage = new MultiStepCheckoutPage();

  beforeAll(async () => {
    // Go to Home
    await home.navigateTo();
    await home.waitForReady();
  });

  it('should register successfully', async () => {
    // Register a new user.
    await LoginHelper.registerNewUser();

    expect(await home.header.isLoggedIn()).toBeTruthy();
    expect(await home.header.loginComponent.getText()).toContain(
      'Winston Rumfoord'
    );

    // Log out.
    await LoginHelper.logOutViaHeader();
  });

  it('should go to product page from category page', async () => {
    // Go to a category listing.
    const categoryDslr = await home.navigateViaSplashBanner();
    await categoryDslr.waitForReady();

    // Click a product to display its details.
    const productDetailsPage = await categoryDslr.openProduct(6);
    await productDetailsPage.waitForReady();
    expect(await productDetailsPage.productTitle.getText()).toEqual(
      'Alpha 350'
    );
    expect(await productDetailsPage.productCode.getText()).toContain(
      'ID 1446509'
    );
  });

  it('should add product to cart and go to checkout', async () => {
    const productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.addToCartButton.click();

    // 4.	Added-to-Cart modal opens. Close it.
    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    const item = atcModal.cartItem(0);
    await E2EUtil.wait4PresentElement(item);
    expect(await item.getText()).toContain('Alpha 350');

    await atcModal.proceedToCheckoutButton.click();

    // Log in. Should see checkout page.
    const form = new LoginForm();
    await form.fillInForm(LoginHelper.userEmail, LoginHelper.userPassword);
    await form.submitLogin();
  });

  it('should fill in address form', async () => {
    const addressForm = checkoutPage.addressForm;
    await addressForm.waitForReady();

    expect(await addressForm.header.getText()).toContain(
      'Step 1: Shipping Address'
    );
    expect(await checkoutPage.orderSummary.getText()).toContain(
      'Subtotal: $1,301.54'
    );

    await addressForm.fillIn();
    await addressForm.nextButton.click();
  });

  it('should choose delivery', async () => {
    const deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();

    expect(await deliveryForm.header.getText()).toContain(
      'Choose a shipping method'
    );
    expect(await deliveryForm.address.getText()).toContain('Winstoon Rumfoord');
    expect(await deliveryForm.address.getText()).toContain('Tralfamadore');
    expect(await checkoutPage.orderSummary.getText()).toContain(
      'Total: $1,301.54'
    );

    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();
  });

  it('should fill in payment form', async () => {
    const paymentForm = checkoutPage.paymentForm;
    await paymentForm.waitForReady();

    expect(await paymentForm.header.getText()).toContain('Choose a card type');
    expect(await checkoutPage.orderSummary.getText()).toContain(
      'Total: $1,313.53'
    );

    await paymentForm.fillIn();
    await paymentForm.nextButton.click();
  });

  it('should review and place order', async () => {
    // Review: Select T&C and submit.
    const reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    expect(await reviewForm.header.getText()).toContain('Review and Submit');
    expect(await reviewForm.shippingAddress.getText()).toContain(
      'Winstoon Rumfoord'
    );
    expect(await reviewForm.shippingAddress.getText()).toContain(
      'Tralfamadore'
    );
    expect(await reviewForm.shippingMethod.getText()).toContain(
      'Standard Delivery'
    );
    expect(await reviewForm.paymentMethod.getText()).toContain('Visa');
    expect(await reviewForm.billingAddress.getText()).toContain(
      'Winstoon Rumfoord'
    );
    expect(await reviewForm.billingAddress.getText()).toContain('Tralfamadore');
    expect(await checkoutPage.orderSummary.getText()).toContain(
      'Total: $1,313.53'
    );

    const orderConfirmationPage = await reviewForm.placeOrder();
    await orderConfirmationPage.waitForReady();

    expect(await orderConfirmationPage.confirmationHeader.getText()).toContain(
      'Confirmation of Order'
    );
    expect(await orderConfirmationPage.confimationMessage.getText()).toContain(
      'Thank you for your order!'
    );
  });

  it('should be able to check order in order history', async () => {
    // Go to my-account and assess that the new order is the newest in the list.
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
