# SEO Capabilities

Search engine optimization (SEO) is an important element of the Spartacus storefront framework. The implementation of SEO in Spartacus is focused on the architecture, rather than on features, so that we can provide a solid foundation that allows for a wide range of SEO capabilities.

The SEO implementation in Spartacus includes the following:

- Stateful URLs
- Configurable URLs
- Indexable Pages
- HTML Tags
  - Page Meta Resolvers
  - Title Resolver
  - Description Resolver
  - Robots Tag

## Stateful URLs

Spartacus provides a URL with a stateful address for every piece of the storefront. This makes it easier for users to navigate the storefront, and also allows web crawlers to index each and every page. As a result, more pages can be shared through social media, bots, and search indexes.

To serve stateful URLs for everything, we allow deep links to address any page. The URL routing configuration can also take into account a multi-site context, so that stateful URLs for special variants of the storefront can be launched and cached.

## Configurable URLs

You can configure URLs for content pages by using a CMS page label in the CMS (back end). These page labels cannot be localized.

You can configure URLs for non-content pages in Spartacus. These are mainly related to product and category pages. You can configure attributes, such as the product name, to be part of the URL. For example, the default configuration for a product page is `storefront.com/product/1234`, but you can modify the URL to include the product or category title. 

Configurable URLs help to improve SEO in general, but can also be used to help migrate an existing solution to Spartacus: customers can keep their existing URLs, and configure the equivalent URLs in Spartacus.

**Note**: The product code is used for resolving the product data from the back end. The rest of the URL can be configured for SEO purposes.

**Note**: Some customers have product titles with special characters that will not work (for example, having a slash in the code or title). This might require special treatment of the attributes before or after they are used in the URL.

## Indexable Pages

Server-side rendering (SSR) is a technique that renders the JavaScript logic on the server side, and then provides rich content in the response. The SSR response contains the full HTML that is required by web crawlers to index or retrieve data from the response.

SSR is provided by Spartacus, and is planned to be a default deployment option in SaaS Commerce Cloud.

## Html Tags

HTML tags, and meta tags in particular, are used by search engines, social platforms, and bots to display page meta data on their platforms. By carefully preparing the meta tags, and evaluating their values on a regular basis, you can improve the ranking, click-through-rate, and usability of a page. For example, the `title` tag is used by browsers to display the page's title in tabs, in the browser history, and in bookmarks. All of this can affect SEO and the user experience.

The `PageMeta` model is a set of attributes that can be resolved by so-called page meta resolvers. The resolvers are extendible on a fine-grained level, and can contribute to the tags that are generated. The following is an example:

```typescript
export interface PageMeta {
  title?: string;
  description?: string;
}
```

HTML5 supports a variety of meta tag properties, such as `description`, `keywords`, and so on. These meta tags are used by search engines, social platforms and bots. Some social platforms have introduced their own sets of properties that are specific to their platforms. For example, Facebook uses an Open Graph protocol that enables any web page to become a rich object in a social graph. Specific meta tags can be used to articulate the experience on the social platform. The code snippet below shows a custom page description for Facebook:

```html
<meta property="og:title" content="Custom title for Facebook" />
<meta property="og:description" content="Custom description for Facebook" />
```

### Page Meta Resolvers

To support the potential multitude of meta tags, Spartacus uses a small framework to customize and extend the meta tags per page.

Spartacus ships with `pageMetaResolvers` that resolve the page meta data for a specific page. Some of the meta data might be driven by CMS data, but most meta tags are computed based on product content, category content, search results, and so on.

The page meta data is updated dynamically during navigation, but can be delivered statically using SSR.

### Title Resolver

Adding an HTML `title` tag to your page has the following advantages:

- the page can be uniquely addressed in the browser (that is, through the browser history, bookmarks, tabs, and so on)

- the page title increases the ranking of the page in search engines

- the page title identifies content in search engines

Spartacus provides a special resolver for pages that require a specific heading. The page title for a search engine result page (SERP) is not necessarily the same as the page heading shown in the UI. Let's look at the product title as an example. To achieve good results in the SERP, a product details page would typically disclose the product title, category, and brand, as follows:

`Product Title | Main category | Brand`

However, such a title does not look good in the UI, so a different title is used for that. To support flexibility, Spartacus uses a specific `PageHeadingResolver` that can be implemented in the page resolving logic.


### Description Resolver

Each page on the storefront can contain a `description` tag. The description tag is used in the search engine result page to improve the click-through-rate (CTR). It is not used to improve the page ranking. It is generally considered best practice to create a description tag for each page, although there are occasions when the search engine is more capable of generating the description based on the context.

### Robots Tag

You can use the `robots` meta tag to control whether or not a page is indexed. The following is an example:

  ```html
 <meta name="robots" value="FOLLOW, NOINDEX">
 ```

  The following table lists the values that can be used to guide search engines:

 | Value    | Description                                                                            |
 | -------- | -------------------------------------------------------------------------------------- |
 | INDEX    | Instructs the search engine to index the page                                          |
 | NOINDEX  | Instructs the search engine to **not** index the page                                    |
 | FOLLOW   | Instructs the search engine to follow the links on the page for further indexing       |
 | NOFOLLOW | Instructs the search engine to **not** follow the links on the page for further indexing |

  Spartacus provides a separate `PageRobotsResolver` interface that you can use to control the `robots` meta tag. The `PageMetaService` uses `FOLLOW, NOINDEX` whenever no value is provided by the `PageMeta`.

  The `CheckoutPageMetaResolver` demonstrates the usage of the  `PageRobotsResolver` and instructs search engines to not index the page nor follow any links on the page.