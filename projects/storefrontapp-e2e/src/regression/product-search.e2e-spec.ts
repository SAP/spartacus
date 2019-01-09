import { HomePage } from '../page-objects/home.po';
import { SearchResultsPage } from '../page-objects/search-results.po';
import { E2EUtil } from '../e2e-util';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('Product search', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let productDetails: ProductDetailsPage;
  let addedToCartModal: AddedToCartModal;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    productDetails = new ProductDetailsPage();
    addedToCartModal = new AddedToCartModal();
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

  it('should be able to search with specific product type in mind', async () => {
    // Search for a product
    await home.navigateTo();
    await home.waitForReady();
    await home.header.performSearch('sony');
    await searchResults.waitForReady();
    await E2EUtil.wait4TextInElement(
      searchResults.page,
      '131 results for sony'
    );
    const items = searchResults.productListItems;
    expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by brand
    await searchResults.getSingleFilterFacet(25).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '86 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by price
    await searchResults.getSingleFilterFacet(8).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '21 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by category
    await searchResults.getSingleFilterFacet(19).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '4 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Remove price filtering
    await searchResults.getSingleFacetToClear(1).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '26 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by mounting
    await searchResults.getSingleFilterFacet(11).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '2 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('Remote Control Tripod VCT-80AV');
    });

    // Remove mounting filtering
    await searchResults.getSingleFacetToClear(2).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '26 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by lens type
    await searchResults.getSingleFilterFacet(16).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '1 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DT 16-80mm F3.5-4.5');
    });

    // Remove lens type filtering
    await searchResults.getSingleFacetToClear(2).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '26 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('10.2 Megapixel D-SLR with Standard Zoom Lens');
    });

    // Filter by megapixels
    await searchResults.getSingleFilterFacet(14).click();
    await E2EUtil.wait4TextInElement(searchResults.page, '4 results for Sony');
    searchResults.getFirstProductDataFromList().then(text => {
      expect(text).toContain('DSLR-A380 + DT 18 - 55 mm');
    });

    // Add product to cart
    const product2 = await searchResults.productByNameInResults(
      'DSLR-A350 + 18-70mm'
    );
    await searchResults.clickAddToCartButton4Product(product2);
    await addedToCartModal.waitForReady();
    expect(await addedToCartModal.modalTitle.getText()).toEqual(
      '1 item(s) added to your cart'
    );
    await addedToCartModal.closeButton.click();
    expect(addedToCartModal.modal.isPresent()).toBe(false);
  });
});
