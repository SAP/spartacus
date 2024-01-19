import {
  // defaultQuoteAwareComponentsConfig,
  defaultQuoteComponentsConfig,
  defaultQuoteRequestComponentsConfig,
} from './quote-root.module';

describe('QuoteRootModule', () => {
  //it('should define quoteAware feature linked to the respective component', () => {
  //  const featureConfigQuoteAware = defaultQuoteAwareComponentsConfig();
  //  expect(
  //    featureConfigQuoteAware.featureModules.quote_aware.cmsComponents
  //  ).toEqual(['QuoteAwareComponent']);
  // });

  it('should define quoteRequestComponent feature linked to the quote request component that is loaded with the cart page', () => {
    const featureConfigQuoteRequest = defaultQuoteRequestComponentsConfig();
    expect(
      featureConfigQuoteRequest.featureModules.quote_request.cmsComponents
    ).toEqual(['QuoteRequestComponent']);
  });

  it('should define quote feature that should contain the CMS components forming the quote details page', () => {
    const cmsComponentsQuote =
      defaultQuoteComponentsConfig().featureModules.quote.cmsComponents;
    expect(cmsComponentsQuote).toContain('QuoteLinksComponent');
    expect(cmsComponentsQuote).toContain('QuoteCommentsComponent');
    expect(cmsComponentsQuote).toContain('QuoteHeaderOverviewComponent');
    expect(cmsComponentsQuote).toContain('QuoteItemsComponent');
    expect(cmsComponentsQuote).toContain('QuoteSummaryComponent');
  });

  it('should define quote feature that should contain the quote list component forming the quote list page', () => {
    const featureConfigQuoteRequest = defaultQuoteComponentsConfig();
    expect(
      featureConfigQuoteRequest.featureModules.quote.cmsComponents
    ).toContain('AccountMyQuotesComponent');
  });
});
