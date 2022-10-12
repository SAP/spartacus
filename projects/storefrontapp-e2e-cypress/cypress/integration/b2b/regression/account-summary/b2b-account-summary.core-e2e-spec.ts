import * as b2bAccountSummary from '../../../../helpers/b2b/b2b-account-summary';
import * as sampleData from '../../../../sample-data/b2b-account-summary';

describe(`My Company - Account Summary`, () => {
  before(() => {
    Cypress.env('BASE_SITE', sampleData.POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Core Features', () => {
    describe(`As Admin`, () => {
      before(() => {
        b2bAccountSummary.loginAsAdmin();
        b2bAccountSummary.visitAccountSummaryDetailsPage(
          sampleData.rusticUnitId
        );
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('Should validate header details', () => {
        b2bAccountSummary.validateHeaderDetails(sampleData.headerDetailTiles);
      });

      it('Should validate documents', () => {
        // Check the default data
        b2bAccountSummary.checkTableData(sampleData.documentsDefault);

        // Sort by Document Number Descending
        b2bAccountSummary.sortDocuments(
          sampleData.sortByDocumentNumberDescending
        );

        // Set filter by Document Number Range (POCR-0000001 - POCR-0000005)
        b2bAccountSummary.filterByDocumentNumberRange(
          sampleData.documentNumberRangeStart,
          sampleData.documentNumberRangeEnd
        );

        // Expect 4 documents to appear and in reverse order
        b2bAccountSummary.checkTableData(sampleData.documentsFilteredOpen);

        // The document POCR-0000005 didn't appear because it's in status Closed and the default filter status is Open.

        // Set status filter to All
        b2bAccountSummary.filterByStatus(sampleData.statusAll);

        // Check table again, this time expecting 5 results and POCR-0000005 having status 'Closed'
        b2bAccountSummary.checkTableData(sampleData.documentsFilteredAll);
      });
    });

    describe(`As Non Admin`, () => {
      before(() => {
        b2bAccountSummary.loginAsNonAdmin();
        b2bAccountSummary.visitAccountSummaryDetailsPage(
          sampleData.rusticUnitId
        );
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('Expect to not be authorized', () => {
        cy.contains('No sufficient permissions to access this page');
      });
    });
  });
});
