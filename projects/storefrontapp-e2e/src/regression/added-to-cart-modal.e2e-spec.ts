import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { CartPage } from '../page-objects/cart/cart.po';
import { HomePage } from '../page-objects/home.po';
import { AutocompletePanel } from '../page-objects/cmslib/autocomplete-panel.po';
import { E2EUtil } from '../e2e-util';

describe('Added to cart modal', () => {
  let productDetails: ProductDetailsPage;
  let addedToCartModal: AddedToCartModal;
  let cart: CartPage;
  let home: HomePage;
  const productId = '3595723';
  const productId2 = '3325048';

  beforeAll(async () => {
    productDetails = new ProductDetailsPage();
    addedToCartModal = new AddedToCartModal();
    cart = new CartPage();
    home = new HomePage();
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
      await addedToCartModal.viewCartButton.getAttribute('href')
    ).toContain('/cart');
    expect(
      await addedToCartModal.goToCheckoutButton.getAttribute('href')
    ).toContain('/checkout');
    // closing modal works
    await addedToCartModal.closeButton.click();
    expect(addedToCartModal.modal.isPresent()).toBe(false);
  });

  it('adding same product twice to cart', async () => {
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

    // closing modal works
    await addedToCartModal.closeButton.click();
    expect(addedToCartModal.modal.isPresent()).toBe(false);
  });

  it('adding different products to cart', async () => {
    // uncomment this section after fixing cart resetting on each full page load
    // await home.navigateTo();

    // add another item to cart
    await home.header.performSearch(productId2, true);

    const autocompletePanel = new AutocompletePanel();
    await autocompletePanel.waitForReady();

    // select product from the suggestion list, then add it to cart
    await autocompletePanel.selectProduct('DSC-W180');

    // wait until product details page is loaded
    await productDetails.waitForReady();
    await productDetails.addToCart();
    await addedToCartModal.waitForReady();

    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
    // quantity is correctly updated
    expect(await addedToCartModal.itemQuantity.getText()).toEqual('1');
    expect(await addedToCartModal.totalCount.getText()).toContain('6 items');

    // empty cart
    await addedToCartModal.viewCartButton.click();
    expect(await cart.page.getText()).toContain('Shopping Cart (ID ');
    await cart.deleteEntryByName('EF 100mm f/2.8L Macro IS USM');

    // check that the cart has 1 item now
    await E2EUtil.wait4TextInElement(cart.page, 'Cart total (1 items):');
    expect(await cart.checkCartEntry('DSC-W180', 1, '$121.88', '$121.88'));

    await cart.deleteEntryByName('DSC-W180');
    await E2EUtil.wait4TextInElement(cart.page, 'Your shopping cart is empty');
    expect(await cart.page.getText()).toContain('Your shopping cart is empty');
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
