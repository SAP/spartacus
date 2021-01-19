import * as sampleData from '../../sample-data/b2b-bulk-pricing';

function visitProduct(productCode){
    cy.server();
    const aliasName = 'bulkPrices';
    cy.route('GET', `*orgProducts/${productCode}?fields=*price(DEFAULT),volumePrices(FULL)*`).as(
        aliasName
    );
    cy.visit(`/product/${productCode}`);
    cy.wait(`@${aliasName}`).its('status').should('eq', 200);
}

export function visitProductWithBulkPrices() {    
    visitProduct(sampleData.PRODUCT);
    checkTableData();
}

export function checkTableData(){
    const selector = "cx-bulk-pricing-table .table";
    cy.get(selector).contains('td', sampleData.expectedData[0].quantity);
    cy.get(selector).contains('td', sampleData.expectedData[0].price);
    cy.get(selector).contains('td', sampleData.expectedData[0].discount);
}

export function visitProductWithNoBulkPrices(){
    //cy.visit(`/product/${sampleData.PRODUCT_NO_PRICING}`);
    visitProduct(sampleData.PRODUCT_NO_PRICING);
}


export function checkNoTableRendered(){
    cy.get('cx-bulk-pricing-table .container').should('not.exist');
}