import { HomePage } from '../page-objects/home.po';
import { SearchResultsPage } from '../page-objects/search-results.po';

describe('Product search', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
  });

  it('should be able to search and get results in page', async () => {
    await home.navigateTo();

    await home.header.performSearch('camera');

    await searchResults.waitForReady();

    const items = searchResults.productListItems;
    expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);

    const product = await searchResults.productByNameInResults(
      'Photosmart E317 Digital Camera'
    );
    expect(await product.isDisplayed()).toBeTruthy();
  });

  it('should list with results', async () => {
    await searchResults.navigateTo('camera');
    await searchResults.waitForReady();

    const text = await searchResults.getHeaderText();
    expect(text).toContain('144 results for camera');
  });

  describe('Pagination', () => {
    it('should be able navigate to the next page and display results', async () => {
      await searchResults.paginationNextPageBtn.click();

      expect(
        await searchResults.paginationSelectedPageBtnNumber.getText()
      ).toContain('2');
    });

    it('should be able navigate to the specified page number and display results', async () => {
      await searchResults.paginationThirdPageBtn.click();

      expect(
        await searchResults.paginationSelectedPageBtnNumber.getText()
      ).toContain('3');
    });

    it('should be able navigate to the previous page and display results', async () => {
      await searchResults.paginationPreviousPageBtn.click();

      expect(
        await searchResults.paginationSelectedPageBtnNumber.getText()
      ).toContain('2');
    });
  });

  describe('Product List View Mode', () => {
    it('should be able to switch into grid view', async () => {
      await searchResults.viewModeSwitcher.click();

      const items = searchResults.productGridItems;
      expect(await items.count()).toBe(searchResults.PRODUCTS_PER_PAGE);
    });
  });

  describe('Facets', () => {
    it('should be able to use facet filtering', async () => {
      await searchResults.getSingleFilterFacet(0).click();

      const text = await searchResults.getHeaderText();
      expect(text).toContain('79 results for Chiba');
    });

    it('should be able to clear active facet', async () => {
      await searchResults.getSingleFacetToClear(0).click();

      const text = await searchResults.getHeaderText();
      expect(text).toContain('144 results for camera');
    });
  });

  describe('Sorting', () => {
    it('should be able to use sorting select: Price (lowest first)', async () => {
      await searchResults.navigateTo('camera');
      await searchResults.waitForReady();
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.PRICE_LOWEST_FIRST
      );

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('$1.58');
      });
    });

    it('should be able to use sorting select: Price (highest first)', async () => {
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.PRICE_HIGHEST_FIRST
      );

      await searchResults.productListItems;

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('$6,030.71');
      });
    });

    it('should be able to use sorting select: Name (ascending)', async () => {
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.NAME_ASC
      );

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('10.2 Megapixel D-SLR');
      });
    });

    it('should be able to use sorting select: Name (descending)', async () => {
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.NAME_DESC
      );

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('Wide Strap for EOS 450D');
      });
    });

    it('should be able to use sorting select: Relevance', async () => {
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.RELEVANCE
      );

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('Camera');
      });
    });

    it('should be able to use sorting select: Top Rated', async () => {
      await searchResults.selectSortingType(
        searchResults.SORTING_TYPES.TOP_RATED
      );

      searchResults.getFirstProductDataFromList().then(text => {
        expect(text).toContain('QuickCam for Notebooks Pro');
      });
    });
  });
});
