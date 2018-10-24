import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddedToCartDialog } from '../page-objects/added-to-cart-dialog.po';

describe('Added to cart modal', () => {
  let productDetails: ProductDetailsPage;
  let addedToCartDialog: AddedToCartDialog;
  const productId = '3595723';
  const productId2 = '3325048';

  beforeEach(async () => {
    productDetails = new ProductDetailsPage();
    addedToCartDialog = new AddedToCartDialog();
  });

  it('basic modal behavior', async () => {
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartDialog.waitForReady();
    // correct number of items are added to cart
    expect(await addedToCartDialog.dialogTitle.getText()).toEqual(
      '2 item(s) added to your cart'
    );
    // good product is added to cart
    expect(await addedToCartDialog.itemName.getText()).toEqual(
      await productDetails.productTitle.getText()
    );
    // quantity is set correctly
    expect(await addedToCartDialog.itemQuantity.getText()).toEqual('2');
    expect(await addedToCartDialog.totalCount.getText()).toContain('2 items');
    // actin buttons links correctly
    expect(
      await addedToCartDialog.viewCartButton.getAttribute('href')
    ).toContain('/cart');
    expect(
      await addedToCartDialog.goToCheckoutButton.getAttribute('href')
    ).toContain('/checkout');
    // closing modal works
    await addedToCartDialog.closeButton.click();
    expect(addedToCartDialog.dialog.isPresent()).toBe(false);
  });

  it('adding same product twice to cart', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartDialog.waitForReady();
    await addedToCartDialog.closeButton.click();

    // add next 3 items of the same product to cart
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartDialog.waitForReady();

    expect(await addedToCartDialog.dialogTitle.getText()).toEqual(
      '3 item(s) added to your cart'
    );
    // quantity is correctly updated
    expect(await addedToCartDialog.itemQuantity.getText()).toEqual('5');
    expect(await addedToCartDialog.totalCount.getText()).toContain('5 items');
  });

  // enable this test after fixing cart resetting on each full page load
  xit('adding different products to cart', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();

    // add another item to cart
    await productDetails.navigateTo(productId2);
    await productDetails.waitForReady();
    await productDetails.addToCart();

    await addedToCartDialog.waitForReady();

    expect(await addedToCartDialog.dialogTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
    // quantity is correctly updated
    expect(await addedToCartDialog.itemQuantity.getText()).toEqual('1');
    expect(await addedToCartDialog.totalCount.getText()).toContain('3 items');
  });

  it('refreshing page should not show modal', async () => {
    await productDetails.navigateTo(productId);
    await productDetails.addToCart();

    await productDetails.navigateTo(productId);
    await productDetails.waitForReady();

    expect(await addedToCartDialog.dialog.isPresent()).toBe(false);
  });

  it('total price is correctly estimated', async () => {
    // add 2 items to cart
    await productDetails.navigateTo(productId);
    await productDetails.itemCounterUpButton.click();
    await productDetails.addToCart();
    await addedToCartDialog.waitForReady();
    function extractPriceFromText(text) {
      return parseFloat(
        text
          .trim()
          .substring(1)
          .replace(',', '')
      );
    }
    const price = extractPriceFromText(
      await addedToCartDialog.itemPrice.getText()
    );
    const quantity = parseInt(
      (await addedToCartDialog.itemQuantity.getText()).trim(),
      10
    );
    const totalPrice = extractPriceFromText(
      await addedToCartDialog.itemTotalPrice.getText()
    );
    expect(totalPrice).toEqual(price * quantity);
  });
});
