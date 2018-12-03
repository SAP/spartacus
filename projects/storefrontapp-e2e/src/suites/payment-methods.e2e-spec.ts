import { HomePage } from '../page-objects/home.po';
import { MultiStepCheckoutPage } from '../page-objects/checkout/multi-step-checkout.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { E2EUtil } from '../e2e-util';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { PaymentManagementPage } from '../page-objects/account/payment-managment.po';

describe('Payment management page', () => {
  const home: HomePage = new HomePage();
  const checkoutPage = new MultiStepCheckoutPage();

  const PRODUCT_CODE = '1446509';

  beforeAll(async done => {
    await home.navigateTo();
    await home.waitForReady();
    await LoginHelper.registerNewUser();

    let productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.navigateTo(PRODUCT_CODE);
    await productDetailsPage.waitForReady();
    await productDetailsPage.itemCounterUpButton.click();
    await productDetailsPage.addToCartButton.click();

    // Added-to-Cart modal opens. Close it.
    let atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    let item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);

    await atcModal.goToCheckoutButton.click();
    let shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    const addressForm = shippingAddress.addressForm;
    await addressForm.waitForReady();

    await addressForm.fillIn();
    await addressForm.nextButton.click();

    let deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    let paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();

    let paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    // Review: Select T&C and submit.
    let reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    let orderConfirmationPage = await checkoutPage.placeOrder();
    await orderConfirmationPage.waitForReady();
    productDetailsPage = new ProductDetailsPage();
    await productDetailsPage.navigateTo(PRODUCT_CODE);
    await productDetailsPage.waitForReady();
    await productDetailsPage.itemCounterUpButton.click();
    await productDetailsPage.addToCartButton.click();

    // Added-to-Cart modal opens. Close it.
    atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);

    await atcModal.goToCheckoutButton.click();
    shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    await shippingAddress.selectDefaultAddress();
    await shippingAddress.nextButton.click();

    deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();
    await paymentMethod.addNewPaymentMethodButton.click();

    paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn({
      cardYear: '2023'
    });
    await paymentForm.nextButton.click();

    // Review: Select T&C and submit.
    reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    orderConfirmationPage = await checkoutPage.placeOrder();
    await orderConfirmationPage.waitForReady();
    done();
  }, 150000);

  it('should be able to change default payment method', async done => {
    // Go to my-account and assess that the new order is the newest in the list.
    const paymentManagementPage = new PaymentManagementPage();
    await paymentManagementPage.navigateTo();
    await paymentManagementPage.waitForReady();
    let card1 = await paymentManagementPage.getCard(0);
    let card2 = await paymentManagementPage.getCard(1);
    expect(await card1.expiry.getText()).toContain('Expires: 7/2020');
    expect(await card2.expiry.getText()).toContain('Expires: 7/2023');
    await card2.selectDefaultLink.click();
    await paymentManagementPage.waitForReady();
    card1 = await paymentManagementPage.getCard(0);
    card2 = await paymentManagementPage.getCard(1);
    expect(await card1.expiry.getText()).toContain('Expires: 7/2023');
    expect(await card2.expiry.getText()).toContain('Expires: 7/2020');
    done();
  });

  it('should be able to delete payment method', async done => {
    const paymentManagementPage = new PaymentManagementPage();
    await paymentManagementPage.navigateTo();
    await paymentManagementPage.waitForReady();
    const card2 = await paymentManagementPage.getCard(1);
    await card2.deleteLink.click();
    await card2.confirmDelete.click();
    await paymentManagementPage.waitForReady();
    expect(
      (await paymentManagementPage.getCard(1)).card.isPresent()
    ).toBeFalsy();

    // Logout at the end of test
    await LoginHelper.logOutViaHeader();
    done();
  });
});
