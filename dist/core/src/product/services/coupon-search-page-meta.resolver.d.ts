import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import { PageBreadcrumbResolver, PageMetaResolver, PageTitleResolver } from '../../cms/page';
import { TranslationService } from '../../i18n/translation.service';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { SemanticPathService } from '../../routing/configurable-routes/url-translation/semantic-path.service';
import * as i0 from "@angular/core";
/**
 * Resolves page meta data for the search result page, in case it's used
 * to query coupons. This is done by adding a `couponcode` query parameter
 * to the search page route.
 *
 * The page resolves an alternative page title and breadcrumb.
 */
export declare class CouponSearchPageResolver extends PageMetaResolver implements PageTitleResolver, PageBreadcrumbResolver {
    protected productSearchService: ProductSearchService;
    protected translation: TranslationService;
    protected authService: AuthService;
    protected route: ActivatedRoute;
    protected semanticPathService: SemanticPathService;
    protected total$: Observable<number>;
    constructor(productSearchService: ProductSearchService, translation: TranslationService, authService: AuthService, route: ActivatedRoute, semanticPathService: SemanticPathService);
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[]>;
    resolveTitle(): Observable<string>;
    getScore(page: Page): number;
    protected get couponCode(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CouponSearchPageResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CouponSearchPageResolver>;
}
