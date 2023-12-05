import { ViewportScroller } from '@angular/common';
import { ComponentRef, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnNavigateConfig } from './config';
import * as i0 from "@angular/core";
export declare class OnNavigateService {
    protected config: OnNavigateConfig;
    protected router: Router;
    protected viewportScroller: ViewportScroller;
    protected injector: Injector;
    protected subscription: Subscription;
    get hostComponent(): ComponentRef<any>;
    constructor(config: OnNavigateConfig, router: Router, viewportScroller: ViewportScroller, injector: Injector);
    /**
     * Reads configuration and enables features based on flags set.
     */
    initializeWithConfig(): void;
    /**
     * Resets view back to the original position when performing a back navigation and to the top when performing a front navigation
     * and sets the focus back to the top of the page before skiplinks for any type of navigation
     * @param enable Enable or disable this feature
     */
    setResetViewOnNavigate(enable: boolean): void;
    /**
     * Verifies if the current route is a child route from the given ignore config route
     *
     * @param route
     * @returns boolean whether the route is a child route
     */
    private isChildRoute;
    /**
     * Verifies if the previous and current route are the same without the query string
     *
     * @param previousRoute
     * @param currentRoute
     * @returns boolean depending on the previous and current route are equal without the query strings
     */
    private isPathEqual;
    static ɵfac: i0.ɵɵFactoryDeclaration<OnNavigateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnNavigateService>;
}
