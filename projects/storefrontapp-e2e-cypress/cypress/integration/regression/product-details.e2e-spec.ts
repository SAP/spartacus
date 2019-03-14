context('Product details', () => {
  const productContainer = 'cx-product-details';
  const summaryContainer = `${productContainer} cx-product-summary`;
  const tabsContainer = 'cx-product-tabs .details';
  const tabsHeaderList = `${tabsContainer} > h3`;
  const activeTabContainer = `${tabsContainer} .active .container`;
  const reviewContainer = 'cx-product-reviews';
  const reviewList = `${reviewContainer} .review`;
  const writeAReviewButton = `${reviewContainer} .header button`;
  const writeAReviewForm = `${reviewContainer} form`;
  const addToCartButton = `${summaryContainer} cx-add-to-cart button`;
  const atcModal = `cx-added-to-cart-dialog`;
  const atcModalTitle = `${atcModal} .cx-dialog-title`;
  const atcModalItem = `${atcModal} cx-cart-item`;
  const atcModalCloseButton = `${atcModal} [aria-label="Close"]`;
  const header = `cx-header`;
  const headerCartButton = `${header} cx-mini-cart`;
  const itemCounter = 'cx-item-counter';
  const itemCounterButtons = `${itemCounter} button`;

  const PRODUCT_NAME = 'Battery Video Light';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/product/266685');
  });

  beforeEach(() => {
    cy.viewport(575, 700);
  });

  it('should contain correct product details', () => {
    cy.get(`${summaryContainer} .name`).should('contain', PRODUCT_NAME);
    cy.get(`${summaryContainer} .code`).should('contain', 'ID 266685');
    cy.get(`${summaryContainer} .description`).should(
      'contain',
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    );
  });

  it('should contain correct tabs', () => {
    cy.get(tabsHeaderList)
      .eq(0)
      .should('contain', 'Product Details');
    cy.get(tabsHeaderList)
      .eq(1)
      .should('contain', 'Specs');
    cy.get(tabsHeaderList)
      .eq(2)
      .should('contain', 'Reviews');
    cy.get(tabsHeaderList)
      .eq(3)
      .should('contain', 'Shipping');
  });

  it('should contain tabs with correct text', () => {
    cy.get(tabsHeaderList)
      .eq(0)
      .click();
    cy.get(activeTabContainer)
      .should(
        'contain',
        '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
      )
      .should(
        'contain',
        'Can be switched to 10-watt or 20-watt settings (NP-FM50 batteries can only be used at 10-watt setting).'
      )
      .should('contain', 'Includes shoe adaptor for increased functionality.');
    cy.get(tabsHeaderList)
      .eq(1)
      .click();
    cy.get(activeTabContainer)
      .should('contain', 'Weight & dimensions')
      .should('contain', 'Colour')
      .should('contain', 'Technical details');
    cy.get(tabsHeaderList)
      .eq(2)
      .click();
    cy.get(activeTabContainer).should('contain', 'Overall Rating');
    cy.get(tabsHeaderList)
      .eq(3)
      .click();
    cy.get(activeTabContainer).should('contain', 'Lorem ipsum dolor sit amet,');
  });

  it('should contain correct review tab', () => {
    cy.get(tabsHeaderList)
      .eq(2)
      .click();
    cy.get(reviewList).should('have.length', 5);
    cy.get(writeAReviewButton).should('be.visible');
    cy.get(`${reviewContainer} ngb-rating`)
      .eq(0)
      .should('be.visible');
  });

  it('should contain correct review form', () => {
    cy.get(writeAReviewButton).click();
    cy.get(writeAReviewForm).should('be.visible');
    cy.get(writeAReviewForm)
      .getByText('Cancel')
      .should('be.not.disabled');
    cy.get(writeAReviewForm)
      .getByText('Submit')
      .should('be.disabled');
    cy.get(`${writeAReviewForm} input`)
      .eq(0)
      .type('My review title');
    cy.get(`${writeAReviewForm} textarea`).type(
      'My best comment I have ever posted'
    );
    cy.get(`${writeAReviewForm} .star`)
      .eq(2)
      .click();
    cy.get(`${writeAReviewForm} input`)
      .eq(1)
      .type('Me');
    cy.get(writeAReviewForm)
      .getByText('Submit')
      .should('be.not.disabled');
    cy.get(writeAReviewForm)
      .getByText('Submit')
      .click();
    cy.get(writeAReviewForm).should('be.not.visible');
    cy.get(reviewList).should('be.visible');
  });

  it('should be able to add different quantities of product to cart', () => {
    cy.get(addToCartButton).click();
    cy.get(atcModal).should('be.visible');
    cy.get(atcModalTitle).should('contain', 'Item(s) added to your cart');
    cy.get(`${atcModalItem} .cx-name`).should('contain', PRODUCT_NAME);
    cy.get(atcModalCloseButton).click();
    cy.get(headerCartButton).should('contain', '1');
    for (let i = 0; i <= 2; i++) {
      cy.get(itemCounterButtons)
        .getByText('+')
        .click();
    }
    cy.get(addToCartButton).click();
    cy.get(atcModalCloseButton).click();
    cy.get(headerCartButton).should('contain', '5');
  });
});
