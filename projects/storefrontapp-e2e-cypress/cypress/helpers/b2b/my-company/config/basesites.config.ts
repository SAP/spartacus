export const baseSitesConfig = {
  baseSites: [
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCategoryCode: 'caps',
      defaultPreviewProductCode: '300441142',
      requiresAuthentication: false,
      stores: [
        {
          currencies: [
            {
              isocode: 'GBP',
            },
          ],
          defaultCurrency: {
            isocode: 'GBP',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'en',
            },
          ],
        },
      ],
      theme: 'alpha',
      uid: 'apparel-uk',
      urlEncodingAttributes: ['language'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=apparel-uk)(|\\&.*)$',
        '(?i)^https?://apparel-uk\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://apparel\\.uk\\.[^/]+(|/.*|\\?.*)$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'de',
      },
      defaultPreviewCategoryCode: 'caps',
      defaultPreviewProductCode: '300441142',
      requiresAuthentication: false,
      stores: [
        {
          currencies: [
            {
              isocode: 'EUR',
            },
          ],
          defaultCurrency: {
            isocode: 'EUR',
          },
          defaultLanguage: {
            isocode: 'de',
          },
          languages: [
            {
              isocode: 'de',
            },
          ],
        },
      ],
      theme: 'alpha',
      uid: 'apparel-de',
      urlEncodingAttributes: ['language'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=apparel-de)(|\\&.*)$',
        '(?i)^https?://apparel-de\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://apparel\\.de\\.[^/]+(|/.*|\\?.*)$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCatalogId: 'apparelProductCatalog',
      defaultPreviewCategoryCode: 'caps',
      defaultPreviewProductCode: '300441142',
      requiresAuthentication: false,
      stores: [
        {
          currencies: [
            {
              isocode: 'GBP',
            },
          ],
          defaultCurrency: {
            isocode: 'GBP',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'en',
            },
          ],
        },
      ],
      theme: 'sparta',
      uid: 'apparel-uk-spa',
      urlEncodingAttributes: ['storefront', 'language', 'currency'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=apparel-uk-spa)(|\\&.*)$',
        '(?i)^https?://apparel-uk-spa\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://api\\.hybrisdev\\.com(:[\\d]+)?/rest/.*$',
        '(?i)^https?://localhost(:[\\d]+)?/rest/.*$',
        '(?i)^https?://[^/]+/apparel-uk-spa(|/.*|\\?.*|#.*)$',
        '(?i)^https?://[^/]+/apparel-uk-spa(|/.*|\\?.*)$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCategoryCode: '1355',
      defaultPreviewProductCode: '2116282',
      requiresAuthentication: true,
      stores: [
        {
          currencies: [
            {
              isocode: 'USD',
            },
          ],
          defaultCurrency: {
            isocode: 'USD',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'ja',
            },
            {
              isocode: 'en',
            },
            {
              isocode: 'de',
            },
            {
              isocode: 'zh',
            },
          ],
        },
      ],
      theme: 'lambda',
      uid: 'powertools',
      urlEncodingAttributes: ['storefront', 'language', 'currency'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=powertools)(|\\&.*)$',
        '(?i)^https?://powertools\\.[^/]+(|/.*|\\?.*)$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCatalogId: 'powertoolsProductCatalog',
      defaultPreviewCategoryCode: '1355',
      defaultPreviewProductCode: '2116282',
      requiresAuthentication: true,
      stores: [
        {
          currencies: [
            {
              isocode: 'USD',
            },
          ],
          defaultCurrency: {
            isocode: 'USD',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'ja',
            },
            {
              isocode: 'en',
            },
            {
              isocode: 'de',
            },
            {
              isocode: 'zh',
            },
          ],
        },
      ],
      theme: 'sparta',
      uid: 'powertools-spa',
      urlEncodingAttributes: ['storefront', 'language', 'currency'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=powertools-spa)(|\\&.*)$',
        '(?i)^https?://powertools-spa\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://api\\.hybrisdev\\.com(:[\\d]+)?/rest/.*$',
        '(?i)^https?://localhost(:[\\d]+)?/rest/.*$',
        '(?i)^https?://[^/]+/powertools-spa(|/.*|\\?.*|#.*)$',
        '(?i)^https?://[^/]+/powertools-spa(|/.*|\\?.*)$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCatalogId: 'electronicsProductCatalog',
      defaultPreviewCategoryCode: '575',
      defaultPreviewProductCode: '2053367',
      requiresAuthentication: false,
      stores: [
        {
          currencies: [
            {
              isocode: 'JPY',
            },
            {
              isocode: 'USD',
            },
          ],
          defaultCurrency: {
            isocode: 'USD',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'ja',
            },
            {
              isocode: 'en',
            },
            {
              isocode: 'de',
            },
            {
              isocode: 'zh',
            },
          ],
        },
      ],
      theme: 'alpha',
      uid: 'electronics',
      urlEncodingAttributes: ['storefront', 'language'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=electronics)(|\\&.*)$',
        '(?i)^https?://electronics\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://api\\.hybrisdev\\.com(:[\\d]+)?/rest/.*$',
        '(?i)^https?://localhost(:[\\d]+)?/rest/.*$',
      ],
    },
    {
      defaultLanguage: {
        isocode: 'en',
      },
      defaultPreviewCatalogId: 'electronicsProductCatalog',
      defaultPreviewCategoryCode: '575',
      defaultPreviewProductCode: '2053367',
      requiresAuthentication: false,
      stores: [
        {
          currencies: [
            {
              isocode: 'JPY',
            },
            {
              isocode: 'USD',
            },
          ],
          defaultCurrency: {
            isocode: 'USD',
          },
          defaultLanguage: {
            isocode: 'en',
          },
          languages: [
            {
              isocode: 'ja',
            },
            {
              isocode: 'en',
            },
            {
              isocode: 'de',
            },
            {
              isocode: 'zh',
            },
          ],
        },
      ],
      theme: 'sparta',
      uid: 'electronics-spa',
      urlEncodingAttributes: ['storefront', 'language', 'currency'],
      urlPatterns: [
        '(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=electronics-spa)(|\\&.*)$',
        '(?i)^https?://electronics-spa\\.[^/]+(|/.*|\\?.*)$',
        '(?i)^https?://api\\.hybrisdev\\.com(:[\\d]+)?/rest/.*$',
        '(?i)^https?://localhost(:[\\d]+)?/rest/.*$',
        '(?i)^https?://[^/]+/electronics-spa(|/.*|\\?.*|#.*)$',
        '(?i)^https?://localhost(:[\\d]+)?/?$',
        '(?i)^https?://[^/]+/electronics-spa(|/.*|\\?.*)$',
      ],
    },
  ],
};
