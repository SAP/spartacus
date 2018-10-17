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

    // should go to search results page
    await searchResults.waitForReady();

    // should show 10 results on page and should have Photosmart camera
    const items = searchResults.productListItems;
    expect(await items.count()).toBe(10);

    // FIXME - by now results do not come ordered from occ. Get top element when it does.
    // const h3 = items[0].element(by.tagName('h3'));
    // h3.getText().then((text) => {
    //   expect(text).toBe('Photosmart E317 Digital Camera');
    // });
    const product = searchResults.productByNameInResults(
      'Photosmart E317 Digital Camera'
    );
    expect(await product.isDisplayed()).toBeTruthy();
  });

  it('should list with results', async () => {
    // go to search results page
    await searchResults.navigateTo('camera');

    // should have 144 results and 15 pages
    const text = await searchResults.getHeaderText();
    expect(text).toContain('144 results for cameras');

    // go to next page
    // FIXME - commented out by now, as it is broken on spartacus
    // const nextButton = pagination.element(by.css('pagination-next'));
    // nextButton.click();
  });
});
