import { Observable } from 'rxjs';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';

/**
 * Resolves the page heading value which is used in the UI (typically
 * the `<H1>`). The page heading might differ from the page title,
 * which is used in the browser (history, tabs) and outside the storefront
 * by search crawlers (Google Search, Bing) and social crawlers (facebook,
 * pinterest).
 *
 * While there are multiple standard resolvers available, nothing stops you
 * from adding custom resolvers to the list of `PageMetaService.resolverMethods`.
 */
export interface PageHeadingResolver {
  /**
   * Resolves the page heading.
   */
  resolveHeading(): Observable<string | undefined>;
}

/**
 * Resolves the page title which is first and foremost used for the page
 * title tag, but could also be used as a fallback for the page heading.
 */
export interface PageTitleResolver {
  /**
   * Resolves the page title.
   */
  resolveTitle(): Observable<string | undefined>;
}

/**
 * Resolves the page description. The page description is typically used
 * in the Search Engine Result Page (SERP).
 */
export interface PageDescriptionResolver {
  /**
   * Resolves the page description.
   */
  resolveDescription(): Observable<string | undefined>;
}

/**
 * Resolves breadcrumbs for the page, which are used in the
 * `BreadcrumbComponent` and Structural Data.
 */
export interface PageBreadcrumbResolver {
  /**
   * Resolves the breadcrumbs for the page.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined>;
}

/**
 * Provides a method to resolve the the main image for the page.
 * This is typically used for social sharing (for example by using
 * the `og:image` metatag).
 */
export interface PageImageResolver {
  /**
   * Resolves the main image for the page.
   */
  resolveImage(): Observable<string | undefined>;
}

/**
 * Resolves the robot information for the page. This is used by
 * search engines to understand whether the page and subsequential links
 * should be indexed.
 *
 */
export interface PageRobotsResolver {
  /**
   * Resolves the robot meta data for the page.
   *
   * The robot meta data is used by search engines to indicate whether a page
   * should be indexed and whether links on the page should be followed for
   * further indexing.
   *
   * Robots meta tags are an alternative (or supplement) to the robots.txt as well
   * as the sitemaps.
   */
  resolveRobots(): Observable<PageRobotsMeta[] | undefined>;
}

export interface CanonicalPageResolver {
  /**
   * Resolves the canonical url for the page.
   *
   * The canonical url is used by search engines to optimize the search index. Without
   * a canonical url, url variations for the same page might be considered duplicates
   * which have a negative impact on SEO.
   */
  resolveCanonicalUrl(): Observable<string | undefined>;
}
