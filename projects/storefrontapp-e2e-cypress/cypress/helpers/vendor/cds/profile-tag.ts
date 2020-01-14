export const ProfileTagHelper = {
  assertPageViewEvent(xhr: Cypress.WaitXHR) {
    ProfileTagHelper.assertConsentReference(xhr);
    expect(xhr.requestBody['_profile_custom'].schema).to.equal(
      'context/core/pageViewed'
    );
  },
  assertProductViewEvent(xhr: Cypress.WaitXHR) {
    ProfileTagHelper.assertConsentReference(xhr);
    expect(xhr.requestBody['_profile_custom'].schema).to.equal(
      'context/commerce/ProductView'
    );
  },
  assertConsentReference(xhr: Cypress.WaitXHR) {
    expect(xhr.requestHeaders['consent-reference']).to.equal(
      ProfileTagHelper.consentReferenceResponse.id
    );
  },
  consentReferenceResponse: {
    id: 'faa6e4b3-887c-4c99-94a9-7b14414df604',
    link:
      'http://htv730345051.api.eu.context.cloud.sap/htv730345051/consents/faa6e4b3-887c-4c99-94a9-7b14414df604',
    consentReferenceToken:
      'aepsqnr50TJfVEzegIibGDLiskrJEuiG0jTj6qaWxNSXgk1GZmIz5KsfqVJpqZP3Tg3PZAG5GGHW6DiN_8L-rA',
  },
  configResponse: {
    siteId: 'dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
    siteConsent: 'implicit',
    consentListener: '',
    pages: [
      {
        description: 'Page View',
        name: 'Home',
        pageId: 1,
        pageType: 'General',
        consent: 'inherit',
        selectedRegexObject: 'location',
        regexValue: '\\/electronics-spa\\/en\\/USD\\/$',
        mappings: [
          {
            type: 'custom_mapping',
            name: 'Home',
            schema: 'context/core/pageViewed',
            trigger: {
              type: 'onload',
            },
            selectors: [],
          },
        ],
      },
      {
        description: 'Product Detail Page (includes AddToCart)',
        name: 'Product Detail Page',
        pageId: 2,
        pageType: 'General',
        consent: 'inherit',
        selectedRegexObject: 'location',
        regexValue: '\\/product\\/',
        mappings: [
          {
            type: 'custom_mapping',
            name: 'Product Details Page View',
            schema: 'context/commerce/ProductView',
            trigger: {
              type: 'onload',
            },
            selectors: [
              {
                key: 'productCategory',
                type: 'dom',
                postProcessing: [
                  {
                    func: 'split',
                    params: ['/'],
                  },
                  {
                    func: 'pop',
                    params: [],
                  },
                  {
                    func: 'split',
                    params: ['?'],
                  },
                  {
                    func: 'shift',
                    params: [],
                  },
                ],
                selector:
                  'body > main > header > div.breadcrumb-section > ol > li:nth-last-child(2) a',
                attributeValue: 'href',
              },
              {
                key: 'productSku',
                type: 'text',
                postProcessing: [],
                selector: 'body > main .product-details .code',
              },
              {
                key: 'productName',
                type: 'text',
                postProcessing: [],
                selector:
                  'body > main > header > div.breadcrumb-section > ol > li:last-child',
              },
              {
                key: 'productPrice',
                type: 'text',
                postProcessing: [
                  {
                    func: 'split',
                    params: ['$'],
                  },
                  {
                    func: 'pop',
                    params: [],
                  },
                  {
                    func: 'split',
                    params: ['??'],
                  },
                  {
                    func: 'pop',
                    params: [],
                  },
                ],
                selector: 'body > main .product-main-info .price',
              },
            ],
          },
        ],
      },
    ],
  },
};
