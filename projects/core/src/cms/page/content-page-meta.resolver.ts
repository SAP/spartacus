import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageType } from '../../model/cms.model';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';
import { BasePageMetaResolver } from './base-page-meta.resolver';
import { PageMetaResolver } from './page-meta.resolver';
import {
  CanonicalPageResolver,
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from './page.resolvers';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`.
 * More specific resolvers for content pages can be implemented by making them more
 * specific, for example by using the page template (see `CartPageMetaResolver`).
 *
 * The page title, description, breadcrumbs and robot information are resolved from the
 * content page data. The canonical URL is resolved from the URL.
 */
@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver
  extends PageMetaResolver
  implements
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver,
    PageRobotsResolver,
    CanonicalPageResolver
{
  constructor(protected basePageMetaResolver: BasePageMetaResolver) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return this.basePageMetaResolver.resolveBreadcrumbs();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }

  resolveCanonicalUrl(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveCanonicalUrl();
  }
}
