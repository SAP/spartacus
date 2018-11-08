import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { Header } from '../page-objects/cmslib/header.po';
import { E2EUtil } from '../e2e-util';

describe('Product details', () => {
  const PRODUCT_NAME = 'Battery Video Light';
  let productDetailsPage: ProductDetailsPage;
  let header: Header;
  beforeEach(async () => {
    productDetailsPage = new ProductDetailsPage();
    header = new Header();
    await productDetailsPage.navigateTo('266685');
  });

  it('should contain correct product details', async () => {
    expect(await productDetailsPage.productTitle.getText()).toEqual(
      PRODUCT_NAME
    );
    expect(await productDetailsPage.productCode.getText()).toContain(
      'ID 266685'
    );

    expect(await productDetailsPage.productDetails.getText()).toContain(
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    );
  });

  it('should contain correct tabs', async () => {
    expect(await productDetailsPage.tabs.count()).toEqual(4);
    expect(await productDetailsPage.tabs.get(0).getText()).toEqual(
      'Product Details'
    );
    expect(await productDetailsPage.tabs.get(1).getText()).toEqual('Specs');
    expect(await productDetailsPage.tabs.get(2).getText()).toContain('Reviews');
    expect(await productDetailsPage.tabs.get(3).getText()).toEqual('Shipping');
  });

  it('should contain tabs with correct text', async () => {
    await productDetailsPage.tabs.get(0).click();
    let text = await productDetailsPage.tabContent.getText();
    expect(text).toContain(
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    );
    expect(text).toContain(
      'Can be switched to 10-watt or 20-watt settings (NP-FM50 batteries can only be used at 10-watt setting).'
    );
    expect(text).toContain(
      'Includes shoe adaptor for increased functionality.'
    );
    await productDetailsPage.tabs.get(1).click();

    text = await productDetailsPage.tabContent.getText();
    expect(text).toContain('Weight & dimensions');
    expect(text).toContain('Colour');
    expect(text).toContain('Technical details');

    await productDetailsPage.tabs.get(2).click();

    text = await productDetailsPage.tabContent.getText();
    expect(text).toContain('Overall Rating');

    await productDetailsPage.tabs.get(3).click();

    text = await productDetailsPage.tabContent.getText();
    expect(text).toContain('Lorem ipsum dolor sit amet,');
  });

  it('should contain correct review tab', async () => {
    await productDetailsPage.tabs.get(2).click();

    expect(await productDetailsPage.reviews.count()).toBe(5);
    expect(await productDetailsPage.writeReviewBtn).toBeTruthy();
    await productDetailsPage.writeReviewBtn.click();
    expect(await productDetailsPage.writeReviewForm).toBeTruthy();
    expect(await productDetailsPage.rating).toBeTruthy();
  });

  it('should contain correct review form', async () => {
    await productDetailsPage.tabs.get(2).click();

    await productDetailsPage.writeReviewBtn.click();
    expect(
      await productDetailsPage.reviewSubmitBtn.getAttribute('disabled')
    ).toBeTruthy();
    await productDetailsPage.reviewInputField
      .get(0)
      .sendKeys('My review title');
    await productDetailsPage.reviewTextareaField
      .get(0)
      .sendKeys('My best comment I have ever posted');
    await productDetailsPage.reviewInputField
      .get(1)
      .sendKeys('My best comment I have ever posted');
    expect(
      await productDetailsPage.reviewSubmitBtn.getAttribute('disabled')
    ).toBeTruthy();

    await productDetailsPage.ratingStar.get(2).click();
    expect(
      await productDetailsPage.reviewSubmitBtn.getAttribute('disabled')
    ).toBeFalsy();
    await productDetailsPage.reviewSubmitBtn.click();
    expect(await productDetailsPage.reviews).toBeTruthy();
  });

  it('should be able to add different quantities of product to cart', async () => {
    await productDetailsPage.addToCartButton.click();
    // Added-to-Cart modal opens. Close it.
    const atcModal = new AddedToCartModal();
    await atcModal.waitForReady();

    const item = await atcModal.item;
    await E2EUtil.wait4VisibleElement(item);
    expect(await item.getText()).toContain(PRODUCT_NAME);

    // close modal
    await atcModal.closeButton.click();

    // There should be 1 item in cart
    expect(await header.miniCartButton.getText()).toBe('1');

    // Let's change qty 3 times (from 1 to 4)
    for (let i = 0; i <= 2; i++) {
      await productDetailsPage.itemCounterUpButton.click();
    }
    await productDetailsPage.addToCartButton.click();
    await atcModal.waitForReady();
    // close modal
    await atcModal.closeButton.click();

    // There should be 5 items in cart
    expect(await header.miniCartButton.getText()).toBe('5');
  });
});
