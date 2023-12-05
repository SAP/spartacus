import { Injector, OnDestroy } from '@angular/core';
import { SiteContextParamsService } from './site-context-params.service';
import { SiteContextUrlSerializer } from './site-context-url-serializer';
import * as i0 from "@angular/core";
export declare class SiteContextRoutesHandler implements OnDestroy {
    private siteContextParams;
    private serializer;
    private injector;
    constructor(siteContextParams: SiteContextParamsService, serializer: SiteContextUrlSerializer, injector: Injector);
    private subscription;
    private contextValues;
    private router;
    private location;
    /**
     * Tells whether there is a pending navigation at the moment, so we can avoid an infinite loop caused by the cyclic dependency:
     * - `subscribeChanges` method triggers a navigation on update of site context state
     * - `subscribeRouting` method updates the site context state on navigation
     */
    private isNavigating;
    /**
     * Initializes the two-way synchronization between the site context state and the URL.
     */
    init(): void;
    /**
     * After each change of the site context state, it modifies the current URL in place.
     * But it happens only for the parameters configured to be persisted in the URL.
     */
    private subscribeChanges;
    /**
     * After each Angular NavigationStart event it updates the site context state based on
     * site context params encoded in the anticipated URL.
     */
    private subscribeRouting;
    /**
     * Updates the site context state based on the context params encoded in the given URL
     *
     * @param url URL with encoded context params
     */
    private setContextParamsFromRoute;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextRoutesHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextRoutesHandler>;
}
