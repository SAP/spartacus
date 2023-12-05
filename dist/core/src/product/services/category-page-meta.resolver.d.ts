import { Observable } from 'rxjs';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta, Page, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageBreadcrumbResolver, PageRobotsResolver, PageTitleResolver } from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { ProductSearchPage } from '../../model/product-search.model';
import { ProductSearchService } from '../facade/product-search.service';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for the Product Listing Page.
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
export declare class CategoryPageMetaResolver extends PageMetaResolver implements PageTitleResolver, PageBreadcrumbResolver, PageRobotsResolver {
    protected productSearchService: ProductSearchService;
    protected cms: CmsService;
    protected translation: TranslationService;
    protected basePageMetaResolver: BasePageMetaResolver;
    protected searchPage$: Observable<ProductSearchPage | Page>;
    constructor(productSearchService: ProductSearchService, cms: CmsService, translation: TranslationService, basePageMetaResolver: BasePageMetaResolver);
    resolveTitle(): Observable<string>;
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[]>;
    protected resolveBreadcrumbData(page: ProductSearchPage, label: string): BreadcrumbMeta[];
    protected hasProductListComponent(page: Page): boolean;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    /**
     * Resolves the canonical url for the category listing page.
     *
     * The default options will be used to resolve the url, which means that
     * all query parameters are removed and https and www are added explicitly.
     */
    resolveCanonicalUrl(): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoryPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CategoryPageMetaResolver>;
}
