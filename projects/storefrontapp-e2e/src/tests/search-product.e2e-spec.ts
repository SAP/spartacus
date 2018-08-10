import { SearchResultsPage } from './../pages/searchResults.po';
import { browser, by, ExpectedConditions } from 'protractor';

describe('Search Results', () => {
  let searchResults: SearchResultsPage;

  beforeEach(() => {
    searchResults = new SearchResultsPage();
  });

  it('should list cameras in page', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'));

    // should show 10 results on page and should have Photosmart camera
    const results = searchResults.getProductListItems();

    results.then(items => {
      expect(items.length).toBe(10);

      // FIXME - by now results do not come ordered from occ. Get top element when it does.
      // const h3 = items[0].element(by.tagName('h3'));
      // h3.getText().then((text) => {
      //   expect(text).toBe('Photosmart E317 Digital Camera');
      // });
    });

    searchResults
      .findProductByNameInResultsPage('Photosmart E317 Digital Camera')
      .then(product => {
        expect(product.isDisplayed()).toBeTruthy();
      });
  });

  it('should list with pagination', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'));

    // should have 144 results and 15 pages
    const pagination = searchResults.getPagination();
    pagination
      .all(by.tagName('div'))
      .first()
      .getText()
      .then(text => {
        expect(text).toContain('144 Products');
        expect(text).toContain('Page: 1 of 15');
      });

    // go to next page
    // FIXME - commented out by now, as it is broken on spartacus
    // const nextButton = pagination.element(by.css('pagination-next'));
    // nextButton.click();
  });
});
