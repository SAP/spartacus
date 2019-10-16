import { Observable } from 'rxjs';
import { PageRobotsMeta } from '../model/page.model';

/**
 * Resolves the page heading which is used in the UI. The page
 * heading might differ from the page title, which is used to address
 * the page in the browser (history, tabs) and outside the storefront
 * (Goolge, bots, etc).
 */
export interface PageHeadingResolver {
  /**
   * Resolves the page heading.
   *
   * @deprecated since version 1.3
   * Use `resolveHeading()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveHeading(...args): Observable<string>;

  /**
   * Resolves the page heading.
   */
  resolveHeading(): Observable<string>;
}

/**
 * Resolves the page title which is first and foremost used
 * for the page title tag, but could also be used for the
 * page heading in the UI.
 */
export interface PageTitleResolver {
  /**
   * Resolves the page title.
   *
   * @deprecated since version 1.3
   * Use `resolveTitle()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveTitle(...args): Observable<string>;

  /**
   * Resolves the page title.
   */
  resolveTitle(): Observable<string>;
}

/**
 * Resolves the page description. The page description is typically used
 * in the Search Engine Result Page (SERP).
 */
export interface PageDescriptionResolver {
  /**
   * Resolves the page description.
   *
   * @deprecated since version 1.3
   * Use `resolveHeading()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveDescription(...args): Observable<string>;

  /**
   * Resolves the page description.
   */
  resolveDescription(): Observable<string>;
}

/**
 * Resolves breadcrumbs for the page, which is used in the `BreadcrumbComponent`
 */
export interface PageBreadcrumbResolver {
  /**
   * Resolves the breadcrumbs for the page.
   *
   * @deprecated since version 1.3
   * Use `resolveBreadcrumbs()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveBreadcrumbs(...args): Observable<any[]>;

  /**
   * Resolves the breadcrumbs for the page.
   */
  resolveBreadcrumbs(): Observable<any[]>;
}

/**
 * Provides a method to resolve the the main image for the page.
 * This is typically used for social sharing (for example by using
 * the `og:image` metatag).
 */
export interface PageImageResolver {
  /**
   * Resolves the main image for the page.
   *
   * @deprecated since version 1.3
   * Use `resolveImage()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveImage(...args): Observable<string>;

  /**
   * Resolves the main image for the page.
   */
  resolveImage(): Observable<string>;
}

/**
 * Resolves the robot information for the page. This is used by
 * search engines to understand whether the page and subsequential links
 * should be indexed.
 *
 */
export interface PageRobotsResolver {
  /**
   * Resolves the robots for the page.
   *
   * @deprecated since version 1.3
   * Use `resolveRobots()` instead.
   */
  // tslint:disable-next-line: unified-signatures
  resolveRobots(...args): Observable<PageRobotsMeta[]>;

  /**
   * Resolves the robots for the page.
   */
  resolveRobots(): Observable<PageRobotsMeta[]>;
}
