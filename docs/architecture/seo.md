# SEO Capabilities
As a storefront framework, Spartacus cares about Search Engine Optimisation. This is a large topic but main focus for Spartacus has been on the architectural side so that we provide a solid foundation that allows for SEO capabilities rather than implement all kinds of features. 

We're covering the following topics: 
- Stateful URLs
- Configurable URLs
- Indexable Page response (SSR)
- HTML tags
  - title
  - description
  - robots

## Stateful URLs
Using URLs to have a stateful address for each piece of the storefront services a multiple goals. It will not only help users to better navigate the storefront, but also crawlers will be able to crawl each and every page. Crawlers can identify more pages that can shared through social media, bots, or search indexes. 

In order to serve a stateful URL for everyting, we're covering a number of features:
- Deeplinks can be used to address any page
- The URL routing configuration can take the multi-site context into account so that a stateful URL for special variants of the storefront can be launched and cached. 

### Configurable URLs
URLs for Content pages are configurable in the CMS by using a CMS page label. This is a page label that doesn't allow for translation. 

URLs for non-content pages are configurable in Spartacus. This is mainly related to product and category pages. Attributes, such the product name can be configured to be part of the URL. 

i.e. the default configuration for a product page is storefront.com/product/1234, but customers can improve the URL in order to add the product or cateogry title to the URL.

Configurable URLs will help to improve SEO in general, but also help to migrate an existing solution to Spartacus; customers can keep their existing URLs and configure the equivalent URLs in spartacus. 

**notes**: 
- the product code is used for resolving the product data from the backend. The rest of the URL can be configured for SEO reasons. 
- some customers have product titles with special characters or even user characters that won't wrok (i.e. using a slash in the code or title). This migh require special treatment of the attributes before/after they're used in the URL. 


## Indexable Pages
Server Side Rendering (SSR) is a technique to render the javascript logic server side, and provide rich content in the response. The SSR response contains the full HTML that is required by crawlers (Google, Facebook, etc.) in order to index or retrieve data from the response. 

SSR is provided by Spartacus and is planned to be a default deployment option at Commerce Cloud.

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

### Title resolver
Adding an html page title has several advantages:
* the page can be uniquely addressed in the browser (browser history, bookmarks, tabs, etc)
* the page title will increase ranking the page in search engines
* the page title will identify content in search engines

A special resolver is provided for pages that require a specific heading. The page title for a Search Engine Result Page (SERP) is not necessary the same as the page heading shown in the UI. The product title is a good example. For a great SERP, a pdp would typically disclose the product title, category and brand:

`Product Title | Main category | Brand`

Such a title however will look bad in the UI and a very different title is used for that. In order to support flexibility, Spartacus uses a specific `PageHeadingResolver` that can be implemented in the page resolving logic. 

### Description resolver
Each page on the storefront can contain a so-called description tag. The description tag is used at the SERP (search engine result page) to improve the click-through-rate (CTR). It is not used to improve page ranking. It is generally considered best practice to create a description tag for each page, although there are occassion where the search engine is better capable to generate the description based on the context.

### Robots tag
The ability of a page to be indexed or not can be controlled by a metatag:

```html
<meta name="robots" value="FOLLOW, NOINDEX">
```

There are 4 potential values that can be used to guide search engines:
| value    | description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| INDEX    | Instructs the search engine to index the page                                    |
| NOINDEX  | Instructs the search engine to *not* index the page                              |
| FOLLOW   | Instructs the search engine to follow the links on the page for further indexing |
| NOFOLLOW | Instructs the search engine to follow the links on the page for further indexing |

Spartacus provides a separate `PageRobotsResolver` interface that can be used to control the robots meta tag. The `PageMetaService` uses `FOLLOW, NOINDEX` whenever no value is provided by the `PageMeta`.

The `CheckoutPageMetaResolver` demonstrates the usage of the  `PageRobotsResolver` and will instruct search engines to not index the page nor follow any links on the page. 
