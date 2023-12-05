import { Observable } from 'rxjs';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';
import { BasePageMetaResolver } from './base-page-meta.resolver';
import { PageMetaResolver } from './page-meta.resolver';
import { CanonicalPageResolver, PageBreadcrumbResolver, PageDescriptionResolver, PageRobotsResolver, PageTitleResolver } from './page.resolvers';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`.
 * More specific resolvers for content pages can be implemented by making them more
 * specific, for example by using the page template (see `CartPageMetaResolver`).
 *
 * The page title, description, breadcrumbs and robot information are resolved from the
 * content page data. The canonical URL is resolved from the URL.
 */
export declare class ContentPageMetaResolver extends PageMetaResolver implements PageTitleResolver, PageDescriptionResolver, PageBreadcrumbResolver, PageRobotsResolver, CanonicalPageResolver {
    protected basePageMetaResolver: BasePageMetaResolver;
    constructor(basePageMetaResolver: BasePageMetaResolver);
    resolveTitle(): Observable<string | undefined>;
    resolveDescription(): Observable<string | undefined>;
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    resolveCanonicalUrl(): Observable<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentPageMetaResolver>;
}
