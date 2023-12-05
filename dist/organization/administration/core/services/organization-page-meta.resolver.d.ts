import { BreadcrumbMeta, ContentPageMetaResolver, PageBreadcrumbResolver, PageDescriptionResolver, PageMetaResolver, PageRobotsMeta, PageRobotsResolver, PageTitleResolver, PageType, RoutingService, SemanticPathService, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for Organization Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} ORGANIZATION_SEMANTIC_ROUTE the default root path for organization pages.
 * @property {string} ORGANIZATION_TRANSLATION_KEY the default i18n key for the organization breadcrumb label.
 */
export declare class OrganizationPageMetaResolver extends PageMetaResolver implements PageBreadcrumbResolver, PageTitleResolver, PageDescriptionResolver, PageRobotsResolver {
    protected contentPageMetaResolver: ContentPageMetaResolver;
    protected translation: TranslationService;
    protected semanticPath: SemanticPathService;
    protected routingService: RoutingService;
    pageTemplate: string;
    pageType: PageType;
    /**
     * Translation key for the breadcrumb of Organization home page
     */
    protected readonly ORGANIZATION_TRANSLATION_KEY = "organization.breadcrumb";
    /**
     * The semantic route of the organization landing page. It's used to recognize whether
     * we are on this page. In such a case we avoid showing the breadcrumb for this page.
     */
    protected readonly ORGANIZATION_SEMANTIC_ROUTE = "organization";
    constructor(contentPageMetaResolver: ContentPageMetaResolver, translation: TranslationService, semanticPath: SemanticPathService, routingService: RoutingService);
    resolveTitle(): Observable<string | undefined>;
    resolveDescription(): Observable<string | undefined>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    /**
     * Returns list of breadcrumbs for:
     * - the home page
     * - the organization home page
     * - the organization's child pages (i.e. cost center list)
     * - sub-routes of the organization's child pages (i.e. cost center details, edit cost center, ...)
     */
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[]>;
    /**
     * Breadcrumb of the Organization page.
     * It's empty when the current page is the Organization page.
     */
    protected organizationPageBreadcrumb$: Observable<BreadcrumbMeta[]>;
    /**
     * Breadcrumbs returned in the method #resolveBreadcrumbs.
     */
    protected breadcrumbs$: Observable<BreadcrumbMeta[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationPageMetaResolver>;
}
