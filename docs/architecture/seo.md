# SEO Capabilities
As a storefront framework, Spartacus cares about Search Engine Optimisation. This is a large topic but main focus for Spartacus has been on the architectural side so that we provide a solid foundation that allows for SEO capabilities rather than implement all kinds of features. 

We're covering the following topics: 
- Stateful URLs
- Configurable URLs
- Indexable Page response (SSR)
- HTML tags

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

SSR is provided by Spartacus and is planned to be a default deployment option Commerce Cloud.

## Html tags
### Title tag
Adding an html page title has several advantages:
* the page can be uniquely addressed in the browser (browser history, bookmarks, tabs, etc)
* the page title will increase ranking the page in search engines
* the page title will identify content in search engines

Spartacus is shipped with `pageTitleResolvers` which resovle a page title for a specific page. Most titles are cms driven, but in some occassions the title is computed based on produt content, search results, cart items, etc. 
The page title resolvers are used for the title tag, but customer can provide a custom serivce to customize the title tag content.  

The page title will be updated dynamically during navigation, but can be delivered statically using SSR.
