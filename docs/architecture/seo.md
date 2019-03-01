# SEO Capabilities

Search engine optimization (SEO) is an important element of the Spartacus storefront framework. The implementation of SEO in Spartacus is focused on the architecture, rather than on features, so that we can provide a solid foundation that allows for a wide range of SEO capabilities.

The SEO implementation in Spartacus includes the following:

- Stateful URLs
- Configurable URLs
- Indexable Pages
- HTML Tags

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

SSR is provided by Spartacus and is planned to be a default deployment option in Commerce Cloud.


## Html tags
HTML and meta tags in partucular are used by search engines, social platform and bots to display page meta data on their platforms. It is considered best practise to prepare the meta tags with care, and evaluate the values regurarly. This will improve ranking, click-through-rate and usability when users will come across a page. Moreover, the browser is keen to leverage the page title during navigation on tabs, history and bookmarks.  


The **PageMeta model** is a set of attributes that can be resolved by so-called `PageMetaResolvers`. The resolvers are extendible on a finegrain level and can contribute to the tags that will be generated. 

```typescript
export interface PageMeta {
  title?: string;
  description?: string;
}
```

HTML5 supports a number of specific metatag properties, such as `description`, `keyworks`, etc. These metatags are used by search engines, social platforms and bots. In order to be more specific on one or the other platform, some social platform introduce a specific set of properties. Facebook for example uses an Open Graph protocol that enables any web page to become a rich object in a social graph. Specific metatags can be used to articulate the experience on the social platform. The code snippet below shows a custom page description for facebook.

```html
<meta property="og:title" content="Custom title for facebook" />
<meta property="og:description" content="Custom description for facebook" />
```

### Page Meta Resolvers
In order to support the potential multitude of meta tags, Spartacus uses a small framework to customize and extend the meta tags per page. 

Spartacus is shipped with `pageMetaResolvers` which resolves the page meta data for a specific page. Some of the meta data might be driven by CMS data, but most meta tags are computed based on product content, category content, search results,etc.

The page meta will be updated dynamically during navigation, but can be delivered statically using SSR.

### Title tag
Adding an html page title has several advantages:
* the page can be uniquely addressed in the browser (browser history, bookmarks, tabs, etc)
* the page title will increase ranking the page in search engines
* the page title will identify content in search engines

### Description tag
Each page on the storefront can contain a so-called description tag. The description tag is used at the SERP (search engine result page) to improve the click-through-rate (CTR). It is not used to improve page ranking. It is generally considered best practice to create a description tag for each page, although there are occassion where the search engine is better capable to generate the description based on the context.
