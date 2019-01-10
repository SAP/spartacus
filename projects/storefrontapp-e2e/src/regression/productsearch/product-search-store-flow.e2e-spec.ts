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

  it('should be able to search with store filtering in mind', async () => {
    // Search for a product
    await home.navigateTo();
    await home.waitForReady();
    await home.header.performSearch('canon');
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '77 results for canon'
    );
    const items = searchResults.productListItems;
    expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Monopod 100 - Floor Standing Monopod');
    });

    // Navigate to the last page
    await searchResults.paginationLastPageBtn.click();
    await browser.wait(
      EC.textToBePresentInElement(
        searchResults.page,
        'EasyShare V 803 White Glaze'
      ),
      5000
    );
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('8');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('EasyShare V 803 White Glaze');
    });

    // Sort by name descending
    await searchResults.selectSortingType(
      searchResults.SORTING_TYPES.NAME_DESC
    );
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('8');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('500D + 18-55mm IS + EF-S 55-250 IS');
    });

    // Filter by store under "Show more"
    await searchResults.showMoreLessStoresButton.click();
    await searchResults.getSingleFilterFacet(30).click();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '38 results for Osaka Hilton Osaka Hotel'
    );
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('1');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Wide Strap for EOS 450D');
    });

    // Add product to cart
    const product2 = await searchResults.productByNameInResults(
      'PowerShot A480'
    );
    await searchResults.clickAddToCartButton4Product(product2);
    await addedToCartModal.waitForReady();
    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
    await addedToCartModal.closeButton.click();
    expect(addedToCartModal.modal.isPresent()).toBe(false);

    // Remove filtering
    await searchResults.getSingleFacetToClear(0).click();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '77 results for canon:name-desc'
    );
  });
});
