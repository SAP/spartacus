import { HomePage } from '../page-objects/home.po';
import { MultiStepCheckoutPage } from '../page-objects/checkout/multi-step-checkout.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { E2EUtil } from '../e2e-util';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { PaymentManagementPage } from '../page-objects/account/payment-management.po';

describe('Payment management page', () => {
  const home: HomePage = new HomePage();
  const checkoutPage = new MultiStepCheckoutPage();

  const PRODUCT_CODE = '1446509';

  beforeAll(async done => {
    /* To check payment methods management we need 2 cards saved for user */
    /* Currently we can only do it with 2 orders */

    // Register new user
    await home.navigateTo();
    await home.waitForReady();
    await LoginHelper.registerNewUser();

    // Add product to cart
    let productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.navigateTo(PRODUCT_CODE);
    await productDetailsPage.waitForReady();
    await productDetailsPage.addToCartButton.click();
    let atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    let item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);

    // Fill shipping address data
    await atcModal.goToCheckoutButton.click();
    let shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    const addressForm = shippingAddress.addressForm;
    await addressForm.waitForReady();

    await addressForm.fillIn();
    await addressForm.nextButton.click();

    // Select delivery method
    let deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    // Fill payment data
    let paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();

    let paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    // Confirm order
    let reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    let orderConfirmationPage = await checkoutPage.placeOrder();
    await orderConfirmationPage.waitForReady();

    // Second order
    productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.navigateTo(PRODUCT_CODE);
    await productDetailsPage.waitForReady();
    await productDetailsPage.addToCartButton.click();
    atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);

    // Use existing shipping address data
    await atcModal.goToCheckoutButton.click();
    shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    await shippingAddress.selectDefaultAddress();
    await shippingAddress.nextButton.click();

    // Select delivery method
    deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    // Add another payment data
    paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();
    await paymentMethod.addNewPaymentMethodButton.click();

    paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn({
      cardYear: '2023'
    });
    await paymentForm.nextButton.click();

    // Confirm order
    reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    orderConfirmationPage = await checkoutPage.placeOrder();
    await orderConfirmationPage.waitForReady();
    done();
  }, 150000);

  it('should be able to change default payment method', async done => {
    // Go to payment management page
    const paymentManagementPage = new PaymentManagementPage();
    await paymentManagementPage.navigateTo();
    await paymentManagementPage.waitForReady();

    // Check if cards exists
    let card1 = await paymentManagementPage.getCard(0);
    let card2 = await paymentManagementPage.getCard(1);
    expect(await card1.expiry.getText()).toContain('Expires: 7/2020');
    expect(await card2.expiry.getText()).toContain('Expires: 7/2023');

    // Change default payment method
    await card2.selectDefaultLink.click();
    await paymentManagementPage.waitForReady();
    card1 = await paymentManagementPage.getCard(0);
    card2 = await paymentManagementPage.getCard(1);
    expect(await card1.expiry.getText()).toContain('Expires: 7/2023');
    expect(await card2.expiry.getText()).toContain('Expires: 7/2020');
    done();
  });

  it('should be able to delete payment method', async done => {
    // Go to payment management page
    const paymentManagementPage = new PaymentManagementPage();
    await paymentManagementPage.navigateTo();
    await paymentManagementPage.waitForReady();

    // Delete second card
    const card2 = await paymentManagementPage.getCard(1);
    await card2.deleteLink.click();
    await card2.confirmDelete.click();
    await paymentManagementPage.waitForReady();

    // Check if card was removed
    expect(
      (await paymentManagementPage.getCard(1)).card.isPresent()
    ).toBeFalsy();

    // Logout at the end of test
    await LoginHelper.logOutViaHeader();
    done();
  });
});
