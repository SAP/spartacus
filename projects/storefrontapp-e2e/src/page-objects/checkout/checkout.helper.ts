import { MultiStepCheckoutPage } from '../checkout/multi-step-checkout.po';
import { ProductDetailsPage } from '../product-details.po';
import { HomePage } from '../home.po';
import { AddedToCartModal } from '../cmslib/added-to-cart-modal.po';
import { AutocompletePanel } from '../cmslib/autocomplete-panel.po';

export class CheckoutHelper {
  static readonly PRODUCT_CODE = '1934793';

  static async checkout() {
    const checkoutPage = new MultiStepCheckoutPage();
    const productDetails = new ProductDetailsPage();
    const home = new HomePage();
    const atcModal = new AddedToCartModal();
    const autocompletePanel = new AutocompletePanel();

    // search for product
    await home.header.performSearch(CheckoutHelper.PRODUCT_CODE, true);
    await autocompletePanel.waitForReady();
    await autocompletePanel.selectProduct('PowerShot A480');
    await productDetails.waitForReady();

    // add to cart and proceed to checkout
    await productDetails.addToCart();
    await atcModal.waitForReady();
    await atcModal.goToCheckoutButton.click();

    // fill in the shipping address form
    const shippingAddress = checkoutPage.shippingAddress;
    await shippingAddress.waitForReady();
    expect(await shippingAddress.header.getText()).toContain(
      'SHIPPING ADDRESS'
    );
    const addressForm = shippingAddress.addressForm;
    await addressForm.waitForReady();
    await addressForm.fillIn();
    await addressForm.nextButton.click();

    // choose the delivery method
    const deliveryForm = checkoutPage.deliveryForm;
    await deliveryForm.waitForReady();
    expect(await deliveryForm.header.getText()).toContain('SHIPPING METHOD');
    await deliveryForm.setDeliveryMethod();
    await deliveryForm.nextButton.click();

    // fill in the payment info
    const paymentMethod = checkoutPage.paymentMethod;
    await paymentMethod.waitForReady();
    expect(await paymentMethod.header.getText()).toContain('PAYMENT');

    const paymentForm = paymentMethod.paymentForm;
    await paymentForm.waitForReady();
    await paymentForm.fillIn();
    await paymentForm.nextButton.click();

    // review and place order
    const reviewForm = checkoutPage.reviewForm;
    await reviewForm.waitForReady();

    expect(await reviewForm.header.getText()).toContain('REVIEW');

    const orderConfirmationPage = await checkoutPage.placeOrder();
    await orderConfirmationPage.waitForReady();
    expect(await orderConfirmationPage.confirmationHeader.getText()).toContain(
      'Confirmation of Order'
    );
    expect(await orderConfirmationPage.confimationMessage.getText()).toContain(
      'Thank you for your order!'
    );
  }
}
