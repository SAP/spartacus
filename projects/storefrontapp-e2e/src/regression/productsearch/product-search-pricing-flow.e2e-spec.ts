import { HomePage } from '../../page-objects/home.po';
import { SearchResultsPage } from '../../page-objects/search-results.po';
import { E2EUtil } from '../../e2e-util';
import { AddedToCartModal } from '../../page-objects/cmslib/added-to-cart-modal.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('Product search', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let addedToCartModal: AddedToCartModal;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    addedToCartModal = new AddedToCartModal();
  });

  it('should be able to search with price in mind', async () => {
    // Click on a Category
    await home.navigateTo();
    await home.waitForReady();

    await home.header.selectCategory('Digital Cameras');
    await E2EUtil.wait4TextInElement(home.header.header, 'Compact Cameras');
    await home.header.selectChildCategory('Compact Cameras');
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '47 results for Digital Compacts'
    );

    const items = searchResults.productListItems;
    expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSC-T90');
    });

    // Navigate to next page
    await searchResults.paginationNextPageBtn.click();
    await browser.wait(
      EC.textToBePresentInElement(searchResults.page, 'DSC-W180'),
      5000
    );
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('2');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSC-W180');
    });

    // Sort by price low to high
    await searchResults.selectSortingType(
      searchResults.SORTING_TYPES.PRICE_LOWEST_FIRST
    );
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('2');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSC-W180');
    });

    // Add product to cart from search listing page
    const product1 = await searchResults.productByNameInResults('DSC-WX1');
    await searchResults.clickAddToCartButton4Product(product1);
    await addedToCartModal.waitForReady();
    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
  });
});
