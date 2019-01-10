import { HomePage } from '../../page-objects/home.po';
import { SearchResultsPage } from '../../page-objects/search-results.po';
import { E2EUtil } from '../../e2e-util';
import { ProductDetailsPage } from '../../page-objects/product-details.po';
import { browser, ExpectedConditions as EC } from 'protractor';

fdescribe('Product search', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let productDetails: ProductDetailsPage;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    productDetails = new ProductDetailsPage();
  });

  // Enable this test once bug (https://jira.hybris.com/browse/CT-2501) is fixed
  xit('should be able to search with product rating in mind', async () => {
    await home.navigateTo();

    // Search and land on search results page
    await home.header.performSearch('DSC-N1');
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '21 results for DSC-N1'
    );

    const items = searchResults.productListItems;
    expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSC-N1');
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

    // Sort by Top rated
    await searchResults.selectSortingType(
      searchResults.SORTING_TYPES.TOP_RATED
    );
    await searchResults.waitForReady();
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('2');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSC-H20 Blue');
    });

    // Navigate to previous page
    await searchResults.paginationPreviousPageBtn.click();
    await E2EUtil.wait4TextInElement(searchResults.page, 'Cyber-shot DSC-W55');
    expect(
      await searchResults.paginationSelectedPageBtnNumber.getText()
    ).toContain('1');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Cyber-shot DSC-W55');
    });

    // Filter by facet Megapixel
    await searchResults.getSingleFilterFacet(10).click();
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '10 results for 10 - 10.9 mp'
    );

    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Cyber-shot DSC-W55');
    });

    // Filter by facet category
    await searchResults.getSingleFilterFacet(14).click();
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '9 results for 10 - 10.9 mp'
    );
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Cyber-shot DSC-W55');
    });

    // Select product and read all the tabs on product details page
    await searchResults.selectProductByName('DSC-S930');
    await productDetails.waitForReady();
    expect(await productDetails.tabs.count()).toEqual(4);

    expect(await productDetails.tabs.get(0).getText()).toEqual(
      'Product Details'
    );
    expect(await productDetails.tabs.get(1).getText()).toEqual('Specs');
    expect(await productDetails.tabs.get(2).getText()).toContain('Reviews');
    expect(await productDetails.tabs.get(3).getText()).toEqual('Shipping');
  });
});
