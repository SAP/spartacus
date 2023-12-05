import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from '../../i18n/translation.service';
import { CmsService } from '../facade/cms.service';
import { BreadcrumbMeta, Page, PageRobotsMeta } from '../model/page.model';
import { CanonicalUrlOptions } from './config/page-meta.config';
import { CanonicalPageResolver, PageBreadcrumbResolver, PageDescriptionResolver, PageRobotsResolver, PageTitleResolver } from './page.resolvers';
import { PageLinkService } from './routing/page-link.service';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';
import * as i0 from "@angular/core";
export declare class BasePageMetaResolver implements PageTitleResolver, PageDescriptionResolver, PageBreadcrumbResolver, PageRobotsResolver, CanonicalPageResolver {
    protected cmsService: CmsService;
    protected translation: TranslationService;
    protected routingPageMetaResolver: RoutingPageMetaResolver;
    protected router: Router;
    protected pageLinkService: PageLinkService;
    constructor(cmsService: CmsService, translation: TranslationService, routingPageMetaResolver: RoutingPageMetaResolver, router: Router, pageLinkService: PageLinkService);
    /**
     * Helper to provide access to the current CMS page
     */
    protected page$: Observable<Page>;
    protected title$: Observable<string | undefined>;
    protected description$: Observable<string | undefined>;
    protected robots$: Observable<PageRobotsMeta[]>;
    /**
     * Breadcrumb for the home page.
     */
    protected homeBreadcrumb$: Observable<BreadcrumbMeta[]>;
    /**
     * All the resolved breadcrumbs (including those from Angular child routes).
     */
    protected breadcrumb$: Observable<BreadcrumbMeta[]>;
    resolveTitle(): Observable<string | undefined>;
    resolveDescription(): Observable<string | undefined>;
    /**
     * Resolves a single breadcrumb item to the home page for each `ContentPage`.
     * The home page label is resolved from the translation service.
     */
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    resolveCanonicalUrl(options?: CanonicalUrlOptions): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BasePageMetaResolver>;
}
