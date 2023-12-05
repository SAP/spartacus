import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PageHeadingResolver, BasePageMetaResolver, PageDescriptionResolver, PageMetaResolver, PageRobotsMeta, PageRobotsResolver, PageTitleResolver, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`
 * and the `MultiStepCheckoutSummaryPageTemplate`. If the checkout page matches this template,
 * the more generic `ContentPageMetaResolver` is overridden by this resolver.
 *
 * The page title and robots are resolved in this implementation only.
 */
export declare class CheckoutPageMetaResolver extends PageMetaResolver implements PageHeadingResolver, PageTitleResolver, PageDescriptionResolver, PageRobotsResolver {
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected basePageMetaResolver: BasePageMetaResolver;
    constructor(translationService: TranslationService, activeCartFacade: ActiveCartFacade, basePageMetaResolver: BasePageMetaResolver);
    /**
     * @override
     * Resolves the page title for the Checkout Page to include checkout step.
     * The page title used by the browser (history, tabs) and crawlers.
     *
     * The title from the page data is ignored for this page title.
     */
    resolveTitle(): Observable<string | undefined>;
    /**
     * Resolves the page heading for the Checkout Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading(): Observable<string>;
    resolveDescription(): Observable<string | undefined>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPageMetaResolver>;
}
