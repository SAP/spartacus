import { Location } from '@angular/common';
import { Product, ProductService, RoutingService, WindowRef } from '@spartacus/core';
import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorExitButtonComponent {
    protected productService: ProductService;
    protected routingService: RoutingService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected breakpointService: BreakpointService;
    protected windowRef: WindowRef;
    protected location: Location;
    container$: Observable<{
        routerData: ConfiguratorRouter.Data;
        configuration: Configurator.Configuration;
        product: Product | undefined;
    }>;
    constructor(productService: ProductService, routingService: RoutingService, configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorCommonsService: ConfiguratorCommonsService, breakpointService: BreakpointService, windowRef: WindowRef, location: Location);
    protected navigateToCart(): void;
    /**
     * Navigates to the product detail page of the product that is being configured.
     */
    exitConfiguration(): void;
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop(): Observable<boolean>;
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.sm`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.sm` returns `true`, otherwise `false`.
     */
    isMobile(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorExitButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorExitButtonComponent, "cx-configurator-exit-button", never, {}, {}, never, never, false, never>;
}
