import { Observable } from 'rxjs';
import { PageRobotsMeta } from '../model/page.model';

/**
 * Resolves the page heading which is used in the UI.
 */
export interface PageHeadingResolver {
  resolveHeading(...args): Observable<string>;
}

/**
 * Resolves the page title which is first and foremost
 * used for the page title tag, but could also be used for the
 * page heading in the UI.
 */
export interface PageTitleResolver {
  resolveTitle(...args): Observable<string>;
}

/**
 * Resolves the page description. The page description is used
 * in the Search Engine Result Page (SERP).
 */
export interface PageDescriptionResolver {
  resolveDescription(...args): Observable<string>;
}

/**
 * Resolves breadcrumbs for the page, which is used in the `BreadcrumbComponent`/
 */
export interface PageBreadcrumbResolver {
  resolveBreadcrumbs(...args): Observable<any[]>;
}

/**
 * Resolves the main image for the page. This is typically used
 * for social sharing (using `og:image` metatag)
 */
export interface PageImageResolver {
  resolveImage(...args): Observable<string>;
}

/**
 * Resolves the robot information for the page. This is used by
 * search engines to understand whether the page and subsequential links
 * should be indexed.
 *
 */
export interface PageRobotsResolver {
  resolveRobots(...args): Observable<PageRobotsMeta[]>;
}
