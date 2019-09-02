const STORES = [
  {
    name: 'Nakano',
    addressLine1: 'Waseda Dori',
    addressLine2: 'Tokio',
  },
  {
    name: 'Yokohama Hotel JAL City Kannai Yokohama',
  },
  {
    name: 'Kobe Bay Sheraton Hotel and Towers',
  },
];

context('Store finder', () => {
  const googleMap = 'cx-store-finder-map .cx-store-map .gm-style';
  const searchResults = 'cx-store-finder-list .cx-columns .cx-list-items';
  const resultListItem = 'cx-store-finder-list-item';
  const storeName = '.cx-store-name';
  const pagination = 'cx-pagination';
  const activePage = `${pagination} .page-item.active`;

  before(() => {
    cy.visit('/store-finder');
  });

  it('should show stores that matches search query', () => {
    cy.get('cx-store-finder-search').within(() => {
      cy.get('input').type('Tokyo');
      cy.get('.search').click();
    });
    // we should get 20 results in first page
    cy.get(searchResults).should('have.length', '20');
    cy.get(resultListItem)
      .first()
      .within(() => {
        cy.get(storeName).should('contain', STORES[0].name);
        cy.get('.cx-store-address')
          .should('contain', STORES[0].addressLine1)
          .should('contain', STORES[0].addressLine2);
      });
    // map exists
    cy.get(googleMap);
  });

  it('should allow to select store from result list', () => {
    cy.get(searchResults)
      .eq(2)
      .click();

    cy.get('.cx-store-details').should('exist');
  });

  it('should allow to go to the next result page', () => {
    cy.get(pagination)
      .get('.cx-pagination .page-item')
      .last()
      .click();
    cy.get(activePage).should('contain', '2');
    cy.get(resultListItem)
      .first()
      .find(storeName)
      .should('contain', STORES[1].name);
  });

  it('should allow to go to the previous result page', () => {
    cy.get(pagination)
      .get('.cx-pagination .page-item')
      .first()
      .click();
    cy.get(activePage).should('contain', '1');
    cy.get(resultListItem)
      .first()
      .find(storeName)
      .should('contain', STORES[0].name);
  });

  it('should allow to go to 2 result page', () => {
    cy.get(`${pagination} .page-item`)
      .contains('2')
      .click({ force: true }); // electron thinks map is over pagination
    cy.get(activePage).should('contain', '2');

    cy.get(resultListItem)
      .first()
      .find(storeName)
      .should('contain', STORES[1].name);
  });

  it('should allow to view all stores', () => {
    cy.getByText('View all stores').click();
    cy.get('.country-header-link')
      .getByText('Japan')
      .click();
    cy.get(resultListItem).should('have.length', 49);
  });

  it('should allow to see store details', () => {
    cy.server();
    cy.route(
      `${Cypress.env('API_URL')}/rest/v2/electronics-spa/stores/${
        STORES[2].name
      }?fields=FULL&lang=en&curr=USD`
    ).as('store');
    cy.get(resultListItem)
      .first()
      .click();
    cy.wait('@store').then(xhr => {
      const body: any = xhr.response.body;
      const features = body.features.entry;
      const openHours = body.openingHours.weekDayOpeningList;
      // map exists
      cy.get(googleMap);
      cy.get('cx-store-finder-store-description').within(() => {
        cy.get('.cx-contact').should('contain', body.address.phone);

        features.forEach(feature => {
          cy.getByText(feature.value);
        });

        openHours.forEach(day => {
          cy.getByText(day.weekDay)
            .closest('.row')
            .contains(
              day.closed
                ? 'Closed'
                : `${day.openingTime.formattedHour} - ${
                    day.closingTime.formattedHour
                  }`
            );
        });
      });
    });
  });

  it('should call back action and go to country all stores', () => {
    cy.visit('/store-finder/country/JP');
    cy.get('.cx-store-name')
      .first()
      .click();
    cy.get('.cx-store').should('exist');
    cy.get('.btn-action')
      .should('have.text', ' Back to list ')
      .click();
    cy.url().should('include', '/store-finder/country/JP');
  });
});
