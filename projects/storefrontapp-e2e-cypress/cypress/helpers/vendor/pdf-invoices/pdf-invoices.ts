/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SampleCartProduct,
  SampleProduct,
  SampleUser,
} from '../../../sample-data/checkout-flow';

export const pdfInvoicesPastOrderId: string = '200000';
export const poNumber: string = '111';

export const pdfInvoicesB2bAccountShipToUser: SampleUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  fullName: 'Stefan Reviewer',
  address: {
    city: 'Washington, 200000',
    line1: 'Address line0, Washington',
  },
};

export const cartWithB2bProductAndStandardShipping: SampleCartProduct = {
  estimatedShipping: '$5.26',
  total: '$2,094.97',
  totalAndShipping: '$2,100.23',
};

export const pdfInvoicesProduct: SampleProduct = {
  name: 'Plier Set (3 Pack)',
  code: '637227',
};

export const invoiceA = {
  createdAt: '2023-09-16T18:29:59+0000',
  invoiceId: '200000a',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceB = {
  createdAt: '2023-09-01T18:29:59+0000',
  invoiceId: '200000b',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const invoiceC = {
  createdAt: '2023-07-21T18:29:59+0000',
  invoiceId: '200000c',
  netAmount: {
    currencyIso: 'USD',
    value: 398,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 400,
  },
};

export const invoiceD = {
  createdAt: '2023-06-23T18:29:59+0000',
  invoiceId: '200000d',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceE = {
  createdAt: '2023-05-12T18:29:59+0000',
  invoiceId: '200000e',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const invoiceF = {
  createdAt: '2022-12-11T18:29:59+0000',
  invoiceId: '200000f',
  netAmount: {
    currencyIso: 'USD',
    value: 398,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 400,
  },
};

export const invoiceG = {
  createdAt: '2022-11-08T04:59:59+0000',
  invoiceId: '200000g',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceH = {
  createdAt: '2022-10-06T03:59:59+0000',
  invoiceId: '200000h',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const invoiceI = {
  createdAt: '2022-06-05T03:59:59+0000',
  invoiceId: '200000i',
  netAmount: {
    currencyIso: 'USD',
    value: 398,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 400,
  },
};

export const invoiceJ = {
  createdAt: '2022-05-04T03:59:59+0000',
  invoiceId: '200000j',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceK = {
  createdAt: '2021-04-06T03:59:59+0000',
  invoiceId: '200000k',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const invoiceL = {
  createdAt: '2021-02-02T04:59:59+0000',
  invoiceId: '200000l',
  netAmount: {
    currencyIso: 'USD',
    value: 398,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 400,
  },
};

export const invoiceM = {
  createdAt: '2019-11-18T04:59:59+0000',
  invoiceId: '200000m',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceN = {
  createdAt: '2018-12-01T04:59:59+0000',
  invoiceId: '200000n',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const invoiceO = {
  createdAt: '2017-11-22T04:59:59+0000',
  invoiceId: '200000o',
  netAmount: {
    currencyIso: 'USD',
    value: 398,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 400,
  },
};

export const invoiceP = {
  createdAt: '2016-11-20T04:59:59+0000',
  invoiceId: '200000p',
  netAmount: {
    currencyIso: 'USD',
    value: 115,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 117,
  },
};

export const invoiceQ = {
  createdAt: '2016-11-18T04:59:59+0000',
  invoiceId: '200000q',
  netAmount: {
    currencyIso: 'USD',
    value: 118,
  },
  totalAmount: {
    currencyIso: 'USD',
    value: 120,
  },
};

export const initialInvoicesData = {
  page1: [invoiceA, invoiceB, invoiceC, invoiceD, invoiceE],
  page2: [invoiceF, invoiceG, invoiceH, invoiceI, invoiceJ],
  page3: [invoiceK, invoiceL, invoiceM, invoiceN, invoiceO],
  page4: [invoiceP, invoiceQ],
};

export const sortByDateAscInvoicesData = {
  page1: [invoiceQ, invoiceP, invoiceO, invoiceN, invoiceM],
  page2: [invoiceL, invoiceK, invoiceJ, invoiceI, invoiceH],
  page3: [invoiceG, invoiceF, invoiceE, invoiceD, invoiceC],
  page4: [invoiceB, invoiceA],
};

export const sortByDateDescInvoicesData = {
  ...initialInvoicesData,
};

export const sortByNetAmtAscInvoicesData = {
  page1: [invoiceP, invoiceA, invoiceD, invoiceJ, invoiceG],
  page2: [invoiceM, invoiceE, invoiceK, invoiceH, invoiceB],
  page3: [invoiceN, invoiceQ, invoiceO, invoiceC, invoiceI],
  page4: [invoiceL, invoiceF],
};

export const sortByNetAmtDescInvoicesData = {
  page1: [invoiceO, invoiceC, invoiceI, invoiceL, invoiceF],
  page2: [invoiceE, invoiceK, invoiceH, invoiceB, invoiceN],
  page3: [invoiceQ, invoiceP, invoiceA, invoiceD, invoiceJ],
  page4: [invoiceG, invoiceM],
};

export const sortByTotalAmtAscInvoicesData = {
  ...sortByNetAmtAscInvoicesData,
};

export const sortByTotalAmtDescInvoicesData = {
  ...sortByNetAmtDescInvoicesData,
};

export const sortByInvoiceIdAscInvoicesData = {
  ...initialInvoicesData,
};

export const sortByInvoiceIdDescInvoicesData = {
  page1: [invoiceQ, invoiceP, invoiceO, invoiceN, invoiceM],
  page2: [invoiceL, invoiceK, invoiceJ, invoiceI, invoiceH],
  page3: [invoiceG, invoiceF, invoiceE, invoiceD, invoiceC],
  page4: [invoiceB, invoiceA],
};

export function verifyPDFInvoicesOrderDetailPage() {
  checkTableData(initialInvoicesData.page1);
}

export function verifyInvoicesTablePagination(
  invoicesData = initialInvoicesData
) {
  let index = 2;

  for (let invoiceData in invoicesData) {
    checkTableData(invoicesData[invoiceData]);
    if (index <= 4) {
      moveToNextPage(index);
      index += 1;
    }
  }
}
export function verifyInvoicesTableDownlodPDF() {
  throw new Error('Function not implemented.');
}

export function verifyInvoicesTableSortByDateAscending() {
  clickOnSortOptions('Date Ascending');
  verifyInvoicesTablePagination(sortByDateAscInvoicesData);
}

export function verifyInvoicesTableSortByDateDescending() {
  clickOnSortOptions('Date Descending');
  verifyInvoicesTablePagination(sortByDateDescInvoicesData);
}

export function verifyInvoicesTableSortByInvoiceNumAscending() {
  clickOnSortOptions('Invoice Number Ascending');
  verifyInvoicesTablePagination(sortByInvoiceIdAscInvoicesData);
}

export function verifyInvoicesTableSortByInvoiceNumDescending() {
  clickOnSortOptions('Invoice Number Descending');
  verifyInvoicesTablePagination(sortByInvoiceIdDescInvoicesData);
}

export function verifyInvoicesTableSortByNetAmountAscending() {
  clickOnSortOptions('Net Amount Ascending');
  verifyInvoicesTablePagination(sortByNetAmtAscInvoicesData);
}

export function verifyInvoicesTableSortByNetAmountDescending() {
  clickOnSortOptions('Net Amount Descending');
  verifyInvoicesTablePagination(sortByNetAmtDescInvoicesData);
}

export function verifyInvoicesTableSortByTotalAmountAscending() {
  clickOnSortOptions('Total Amount Ascending');
  verifyInvoicesTablePagination(sortByTotalAmtAscInvoicesData);
}

export function verifyInvoicesTableSortByTotalAmountDescending() {
  clickOnSortOptions('Total Amount Descending');
  verifyInvoicesTablePagination(sortByTotalAmtDescInvoicesData);
}

export function clickOnSortOptions(sortOptionText: string) {
  cy.get('cx-sorting').click();
  cy.get('.ng-option').contains(sortOptionText).click();
}

export function checkTableData(
  rows: Array<{
    invoiceId?: string;
    externalSystemId?: string;
    createdAt?: string;
    netAmount?: {
      currencyIso?: string;
      value?: number;
      formattedValue?: string;
    };
    totalAmount?: {
      currencyIso?: string;
      value?: number;
      formattedValue?: string;
    };
  }>
) {
  cy.get('.cx-invoices-list-row').its('length').should('eq', rows.length);

  const columns: Array<{
    field: string;
    class: string;
    occurrence: number;
  }> = [
    { field: 'invoiceId', class: 'code', occurrence: 0 },
    { field: 'createdAt', class: 'date', occurrence: 0 },
    { field: 'netAmount', class: 'monetary', occurrence: 0 },
    { field: 'totalAmount', class: 'monetary', occurrence: 1 },
  ];
  // For each row, check each column
  rows.forEach((row, rowNumber) => {
    columns.forEach((column) => {
      //Handle amount fields separately
      if (
        (column.field === 'netAmount' || column.field === 'totalAmount') &&
        row[column.field]
      ) {
        //handle amount fields
        if (row[column.field].formattedValue) {
          cy.get('.cx-invoices-list-row')
            .eq(rowNumber)
            .find(`.cx-invoices-list-${column.class}`)
            .eq(column.occurrence)
            .contains(row[column.field].formattedValue);
        } else {
          cy.get('.cx-invoices-list-row')
            .eq(rowNumber)
            .find(`.cx-invoices-list-${column.class}`)
            .eq(column.occurrence)
            .contains(
              `${row[column.field].currencyIso} ${row[column.field].value}`
            );
        }
      } else if (column.field === 'createdAt' && row[column.field]) {
        //handle date fields
        cy.get('.cx-invoices-list-row')
          .eq(rowNumber)
          .find(`.cx-invoices-list-${column.class}`)
          .eq(column.occurrence)
          .contains(formatDateToLongLocaleDate(row[column.field]));
      } else if (row[column.field]) {
        //handle other fields
        cy.get('.cx-invoices-list-row')
          .eq(rowNumber)
          .find(`.cx-invoices-list-${column.class}`)
          .eq(column.occurrence)
          .contains(row[column.field]);
      }
    });
  });
}

export function downloadFirstInvoice() {
  cy.intercept({
    method: 'GET',
    path: `**/users/current/**/invoices/**/download**`,
  }).as('getAttachments');
  cy.get('.cx-invoices-list-row button').first().click();
  cy.wait('@getAttachments').its('response.statusCode').should('eq', 200);
}

export function downloadLastInvoiceAcrossPages() {
  for (let index = 2; index <= 4; index++) {
    downloadFirstInvoice();
    moveToNextPage(index);
  }
}

//Format the date into a long date, eg. September 15, 2023
export function formatDateToLongLocaleDate(date: string) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function moveToNextPage(index: number) {
  cy.get('cx-pagination').findByText(index).first().click();
}
