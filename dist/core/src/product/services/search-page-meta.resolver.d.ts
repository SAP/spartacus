import { Observable } from 'rxjs';
import { PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageRobotsResolver, PageTitleResolver } from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for the Search Result Page based on the
 * `PageType.CATEGORY_PAGE` and the `SearchResultsListPageTemplate` template.
 *
 * Only the page title is resolved in the standard implementation.
 */
export declare class SearchPageMetaResolver extends PageMetaResolver implements PageMetaResolver, PageTitleResolver, PageRobotsResolver {
    protected routingService: RoutingService;
    protected productSearchService: ProductSearchService;
    protected translation: TranslationService;
    protected basePageMetaResolver: BasePageMetaResolver;
    protected total$: Observable<number | undefined>;
    protected query$: Observable<string>;
    constructor(routingService: RoutingService, productSearchService: ProductSearchService, translation: TranslationService, basePageMetaResolver: BasePageMetaResolver);
    resolveTitle(): Observable<string>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    /**
     * Resolves the canonical page for the search page.
     *
     * The default options will be used to resolve the url, which means that
     * the all query parameters are removed and https and www are added explicitly.
     */
    resolveCanonicalUrl(): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchPageMetaResolver>;
}
