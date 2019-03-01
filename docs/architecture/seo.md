# SEO Capabilities

Search engine optimization (SEO) is an important element of the Spartacus storefront framework. The implementation of SEO in Spartacus is focused on the architecture, rather than on features, so that we can provide a solid foundation that allows for a wide range of SEO capabilities.

The SEO implementation in Spartacus includes the following:

- Stateful URLs
- Configurable URLs
- Indexable Pages

## Stateful URLs

Spartacus provides a URL with a stateful address for every piece of the storefront. This makes it easier for users to navigate the storefront, and also allows web crawlers to index each and every page. As a result, more pages can be shared through social media, bots, and search indexes.

To serve stateful URLs for everything, we allow deep links to address any page. The URL routing configuration can also take into account a multi-site context, so that stateful URLs for special variants of the storefront can be launched and cached.

### Configurable URLs

You can configure URLs for content pages by using a CMS page label in the CMS (back end). These page labels cannot be localized.

You can configure URLs for non-content pages in Spartacus. These are mainly related to product and category pages. You can configure attributes, such the product name, to be part of the URL. For example, the default configuration for a product page is `storefront.com/product/1234`, but you can modify the URL to include the product or category title. 

Configurable URLs help to improve SEO in general, but can also be used to help migrate an existing solution to Spartacus: customers can keep their existing URLs, and configure the equivalent URLs in Spartacus.

**Note**: The product code is used for resolving the product data from the back end. The rest of the URL can be configured for SEO purposes.

**Note**: Some customers have product titles with special characters that will not work (for example, having a slash in the code or title). This might require special treatment of the attributes before or after they are used in the URL.

## Indexable Pages

Server-side rendering (SSR) is a technique that renders the JavaScript logic on the server side, and then provides rich content in the response. The SSR response contains the full HTML that is required by web crawlers to index or retrieve data from the response.

SSR is provided by Spartacus, and is planned to be a default deployment option in Commerce Cloud.
