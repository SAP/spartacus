import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PageHeadingResolver, BasePageMetaResolver, PageDescriptionResolver, PageMetaResolver, PageRobotsMeta, PageRobotsResolver, PageTitleResolver, TranslationService, PageBreadcrumbResolver, BreadcrumbMeta, SemanticPathService } from '@spartacus/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingPageMetaResolver extends PageMetaResolver implements PageHeadingResolver, PageBreadcrumbResolver, PageTitleResolver, PageDescriptionResolver, PageRobotsResolver {
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected basePageMetaResolver: BasePageMetaResolver;
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected translation: TranslationService;
    protected semanticPath: SemanticPathService;
    protected readonly CUSTOMER_SERVICE_TRANSLATION_KEY = "customerTicketing.customerService";
    protected readonly CUSTOMER_SERVICE_SEMANTIC_ROUTE = "supportTickets";
    constructor(translationService: TranslationService, activeCartFacade: ActiveCartFacade, basePageMetaResolver: BasePageMetaResolver, customerTicketingFacade: CustomerTicketingFacade, translation: TranslationService, semanticPath: SemanticPathService);
    resolveTitle(): Observable<string | undefined>;
    /**
     * @override
     * Resolves the page heading for the Customer Ticket Details Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading(): Observable<string | undefined>;
    resolveDescription(): Observable<string | undefined>;
    resolveRobots(): Observable<PageRobotsMeta[]>;
    resolveBreadcrumbs(): Observable<BreadcrumbMeta[]>;
    protected customerServiceBreadCrumb$: Observable<BreadcrumbMeta[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingPageMetaResolver>;
}
