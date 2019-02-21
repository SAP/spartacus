const STORES = [
  {
    name: 'Nakano',
    addressLine1: 'Waseda Dori',
    addressLine2: 'Tokio'
  },
  {
    name: 'Yokohama Hotel JAL City Kannai Yokohama'
  },
  {
    name: 'Kobe Bay Sheraton Hotel and Towers'
  }
];

const MAP_SELECTOR = 'cx-store-finder-map .cx-store-map .gm-style';
const SEARCH_RESULTS =
  'cx-store-finder-list .cx-store-finder-list__column-set .cx-store-finder-list__list-items';

/*
- [missing link] Test Store Finder button
  Click on the “store finder icon” -> Land on “Find a store” page
- [x] Test search store
  Search “Tokyo”, click on “Find Stores button”

Verify results:
- [no such information on page] 1-10 from 49 stores found
- [x] 20 results found
- [store is not highlighted on search] First store highlighted
- [there is another one - x] First store is Sapporo Sheraton Sapporo Hotel
- [stores doesn't have images] Store image & address listed (where applicable)
- [x] A google map displayed (where applicable)
- [x] Store hours displayed
- [x] Store feature displayed

- [x] Test Pagination on the search result
  Click on Next , Next, Previous
- [x] Test selecting other stores from the list
- [no other locations - search result not working] Test searching for other location, for eg “New York” and click on the “search button”
*/

context.only('Store finder', () => {
  before(() => {
    cy.visit('/store-finder');
  });

  it('should show stores that matches search query', () => {
    cy.get('cx-store-finder-search').within(() => {
      cy.get('input').type('Tokyo');
      cy.get('.btn-primary').click();
    });
    // we should get 20 results in first page
    cy.get(SEARCH_RESULTS).should('have.length', '20');
    cy.get('cx-store-finder-list-item')
      .first()
      .within(() => {
        cy.get('.cx-store-name').should('contain', STORES[0].name);
        cy.get('.cx-store-address').should('contain', STORES[0].addressLine1);
        cy.get('.cx-store-address').should('contain', STORES[0].addressLine2);
      });
    // map exists
    cy.get(MAP_SELECTOR);
  });

  it('should allow to select store from result list', () => {
    cy.get(SEARCH_RESULTS)
      .eq(2)
      .click()
      .should('have.class', 'cx-store-finder-list__selected-store-item');
  });

  it('should allow to go to the next result page', () => {
    cy.get('cx-pagination')
      .getAllByLabelText('Next')
      .click();
    cy.get('cx-pagination .page-item.active').should('contain', '2');
    cy.get('cx-store-finder-list-item')
      .first()
      .find('.cx-store-name')
      .should('contain', STORES[1].name);
  });

  it('should allow to go to the previous result page', () => {
    cy.get('cx-pagination')
      .getAllByLabelText('Previous')
      .click();
    cy.get('cx-pagination .page-item.active').should('contain', '1');
    cy.get('cx-store-finder-list-item')
      .first()
      .find('.cx-store-name')
      .should('contain', STORES[0].name);
  });

  it('should allow to go to 2 result page', () => {
    cy.get('cx-pagination .page-item')
      .getByText('2')
      .click();
    cy.get('cx-pagination .page-item.active').should('contain', '2');

    cy.get('cx-store-finder-list-item')
      .first()
      .find('.cx-store-name')
      .should('contain', STORES[1].name);
  });

  it('should allow to view all stores', () => {
    cy.getByText('View all stores').click();
    cy.get('.cx-store-finder-list-count__country-set')
      .getByText('Japan')
      .click();
    cy.get('cx-store-finder-list-item').should('have.length', 49);
  });

  it('should allow to see store details', () => {
    cy.server();
    cy.route(
      `${Cypress.env('API_URL')}/rest/v2/electronics/stores/${
        STORES[2].name
      }?fields=FULL&lang=en&curr=USD`
    ).as('store');
    cy.get('cx-store-finder-list-item')
      .first()
      .click();
    cy.wait('@store').then(xhr => {
      const body: any = xhr.response.body;
      const features = body.features.entry;
      const openHours = body.openingHours.weekDayOpeningList;
      // map exists
      cy.get(MAP_SELECTOR);
      cy.get('cx-store-finder-store-description').within(() => {
        cy.get('.contactInfo').should('contain', body.address.phone);

        features.map(feature => {
          cy.getByText(feature.value);
        });

        openHours.map(day => {
          cy.getByText(day.weekDay)
            .closest('.row')
            .contains(
              day.closed
                ? 'closed'
                : `${day.openingTime.formattedHour} - ${
                    day.closingTime.formattedHour
                  }`
            );
        });
      });
    });
  });
});
