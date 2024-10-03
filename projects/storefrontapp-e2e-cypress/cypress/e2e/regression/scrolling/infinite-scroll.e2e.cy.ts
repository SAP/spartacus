/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as infiniteScroll from '../../../helpers/infinite-scroll';
import { searchUrlPrefix } from '../../../helpers/product-search';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('Infinite scroll', () => {
  beforeEach(() => {
    clearAllStorage();

    cy.intercept({
      method: 'GET',
      query: {
        fields: '*',
        query: ':relevance:allCategories:816',
      },
      pathname: searchUrlPrefix,
    }).as(infiniteScroll.defaultQuery);
  });

  it("should enable infinite scroll and display 'Show more' button", () => {
    infiniteScroll.configScroll(true, 0, true);

    infiniteScroll.visitPowerSupplyListingPage();

    cy.wait(infiniteScroll.defaultQueryAlias)
      .its('response.statusCode')
      .should('eq', 200);

    infiniteScroll.verifyInfiniteScrollConfigSetProperly(true, 0, true);

    cy.get(infiniteScroll.defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;

      infiniteScroll.isPaginationNotVisible();
      infiniteScroll.scrollToFooter(totalResults, true);
      infiniteScroll.backToTopIsVisible(true);
    });
  });

  it("should enable infinite scroll and display 'Show more' button after 12th product", () => {
    infiniteScroll.configScroll(true, 12, false);

    infiniteScroll.visitPowerSupplyListingPage();

    cy.wait(infiniteScroll.defaultQueryAlias)
      .its('response.statusCode')
      .should('eq', 200);

    infiniteScroll.verifyInfiniteScrollConfigSetProperly(true, 12, false);

    cy.get(infiniteScroll.defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      infiniteScroll.isPaginationNotVisible();
      infiniteScroll.backToTopIsVisible();
      infiniteScroll.scrollToFooter(totalResults, true, 12);
      infiniteScroll.backToTopIsVisible(true);
    });
  });

  it('should not display Infinite scroll', () => {
    infiniteScroll.configScroll(false, 0, false);

    infiniteScroll.visitPowerSupplyListingPage();

    cy.wait(infiniteScroll.defaultQueryAlias)
      .its('response.statusCode')
      .should('eq', 200);

    infiniteScroll.verifyInfiniteScrollConfigSetProperly(false, 0, false);

    infiniteScroll.isPaginationVisible();
  });
});
