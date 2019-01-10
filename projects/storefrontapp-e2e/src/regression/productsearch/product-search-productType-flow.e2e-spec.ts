import { HomePage } from '../../page-objects/home.po';
import { SearchResultsPage } from '../../page-objects/search-results.po';
import { E2EUtil } from '../../e2e-util';
import { AddedToCartModal } from '../../page-objects/cmslib/added-to-cart-modal.po';

fdescribe('Product search', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let addedToCartModal: AddedToCartModal;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    addedToCartModal = new AddedToCartModal();
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
