import { Observable } from 'rxjs';
import { BreadcrumbMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageBreadcrumbResolver, PageDescriptionResolver, PageHeadingResolver, PageImageResolver, PageRobotsResolver, PageTitleResolver } from '../../cms/page/page.resolvers';
import { PageLinkService } from '../../cms/page/routing/page-link.service';
import { TranslationService } from '../../i18n/translation.service';
import { Product } from '../../model/product.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../facade/product.service';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for the Product Detail Page
 * based on the `PageType.PRODUCT_PAGE`.
 *
 * The page title, heading, description, breadcrumbs and
 * first GALLERY image are resolved if available in the data.
 */
export declare class ProductPageMetaResolver extends PageMetaResolver implements PageHeadingResolver, PageTitleResolver, PageDescriptionResolver, PageBreadcrumbResolver, PageImageResolver, PageRobotsResolver {
    protected routingService: RoutingService;
    protected productService: ProductService;
    protected translation: TranslationService;
    protected basePageMetaResolver: BasePageMetaResolver;
    protected pageLinkService: PageLinkService;
    constructor(routingService: RoutingService, productService: ProductService, translation: TranslationService, basePageMetaResolver: BasePageMetaResolver, pageLinkService: PageLinkService);
    protected product$: Observable<Product>;
    /**
     * Resolves the page heading for the Product Detail Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading(): Observable<string>;
    /**
     * Resolves the page title for the Product Detail Page. The page title
     * is resolved with the product name, the first category and the manufacturer.
     * The page title used by the browser (history, tabs) and crawlers.
     */
    resolveTitle(): Observable<string>;
    /**
     * Resolves the page description for the Product Detail Page. The description
     * is based on the `product.summary`.
     */
    resolveDescription(): Observable<string>;
    /**
     * Resolves breadcrumbs for the Product Detail Page. The breadcrumbs are driven by
     * a static home page crumb and a crumb for each category.
     */
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[]>;
    /**
     * Resolves the main page image for the Product Detail Page. The product image
     * is based on the PRIMARY product image. The zoom format is used by default.
     */
    resolveImage(): Observable<string>;
    protected resolveFirstCategory(product: Product): string;
    protected resolveManufacturer(product: Product): string;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    /**
     * Resolves the canonical url for the product page using the default canonical url
     * configuration.
     *
     * In case of a variant product, the baseProduct code is used to resolve the url. It's important
     * to know that this has a few limitations:
     * - We're not always able to get the super baseProduct, in case of multi-level variants.
     *   OCC only exposes the direct baseProduct, which might still not resolve in the correct
     *   canonical URL. This is business driven and subject to change in a customization.
     * - The url resolved for the variant doesn't contain any content other then the product code.
     *   This means that we do not provide any product data to resolve pretty URLs (for example
     *   the product title).
     */
    resolveCanonicalUrl(): Observable<string>;
    /**
     * Resolves the base product whenever the given product is a variant product.
     *
     * Since product variants can be multi-layered, we recursively try to find the base product
     * this might be too opinionated for your business though.
     */
    protected findBaseProduct(product: Product): Observable<Product>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductPageMetaResolver>;
}
