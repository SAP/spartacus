import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';

describe('Added to cart modal', () => {
  let productDetails: ProductDetailsPage;
  let addedToCartModal: AddedToCartModal;
  const productId = '3595723';
  const productId2 = '3325048';

  beforeEach(async () => {
    productDetails = new ProductDetailsPage();
    addedToCartModal = new AddedToCartModal();
  });

  it('basic modal behavior', async () => {
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartModal.waitForReady();
    // correct number of items are added to cart
    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '2 item(s) added to your cart'
    );
    // good product is added to cart
    expect(await addedToCartModal.itemName.getText()).toEqual(
      await productDetails.productTitle.getText()
    );
    // quantity is set correctly
    expect(await addedToCartModal.itemQuantity.getText()).toEqual('2');
    expect(await addedToCartModal.totalCount.getText()).toContain('2 items');
    // actin buttons links correctly
    expect(
      await addedToCartModal.viewCartButton.getAttribute('routerlink')
    ).toContain('/cart');
    expect(
      await addedToCartModal.goToCheckoutButton.getAttribute('routerlink')
    ).toContain('/checkout');
    // closing modal works
    await addedToCartModal.closeButton.click();
    expect(addedToCartModal.modal.isPresent()).toBe(false);
  });

  it('adding same product twice to cart', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartModal.waitForReady();
    await addedToCartModal.closeButton.click();

    // add next 3 items of the same product to cart
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartModal.waitForReady();

    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '3 item(s) added to your cart'
    );
    // quantity is correctly updated
    expect(await addedToCartModal.itemQuantity.getText()).toEqual('5');
    expect(await addedToCartModal.totalCount.getText()).toContain('5 items');
  });

  // TODO enable this test after fixing cart resetting on each full page load
  xit('adding different products to cart', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();

    // add another item to cart
    await productDetails.navigateTo(productId2);
    await productDetails.waitForReady();
    await productDetails.addToCart();

    await addedToCartModal.waitForReady();

    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
    // quantity is correctly updated
    expect(await addedToCartModal.itemQuantity.getText()).toEqual('1');
    expect(await addedToCartModal.totalCount.getText()).toContain('3 items');
  });

  it('refreshing page should not show modal', async () => {
    await productDetails.navigateTo(productId);
    await productDetails.addToCart();

    await productDetails.navigateTo(productId);
    await productDetails.waitForReady();

    expect(await addedToCartModal.modal.isPresent()).toBe(false);
  });

  it('total price is correctly estimated', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartModal.waitForReady();
    function extractPriceFromText(text) {
      return parseFloat(
        text
          .trim()
          .substring(1)
          .replace(',', '')
      );
    }
    const price = extractPriceFromText(
      await addedToCartModal.itemPrice.getText()
    );
    const quantity = parseInt(
      (await addedToCartModal.itemQuantity.getText()).trim(),
      10
    );
    const totalPrice = extractPriceFromText(
      await addedToCartModal.itemTotalPrice.getText()
    );
    expect(totalPrice).toEqual(price * quantity);
  });
});
