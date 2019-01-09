import { ProductDetailsPage } from '../page-objects/product-details.po';

const PRODUCT_ID = '1992693';
const PRODUCT_NAME = 'DSC-T90';

describe('Configurable routing', () => {
  let productPage: ProductDetailsPage;

  beforeEach(async () => {
    productPage = new ProductDetailsPage();
  });

  it('aliases should show correct page', async () => {
    await productPage.navigateTo(PRODUCT_ID);
    expect(await productPage.productTitle.getText()).toEqual(PRODUCT_NAME);
    await productPage.navigateToByAlias(PRODUCT_ID, PRODUCT_NAME);
    expect(await productPage.productTitle.getText()).toEqual(PRODUCT_NAME);
  });
});
