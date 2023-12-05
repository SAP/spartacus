import { RendererFactory2 } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchRoute, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export declare class RoutingRenderStrategy extends LaunchRenderStrategy {
    protected document: any;
    protected rendererFactory: RendererFactory2;
    protected routingService: RoutingService;
    constructor(document: any, rendererFactory: RendererFactory2, routingService: RoutingService);
    /**
     * Navigates to the route configured for the caller
     */
    render(config: LaunchRoute, _caller: LAUNCH_CALLER | string): void;
    hasMatch(config: LaunchRoute): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingRenderStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoutingRenderStrategy>;
}
