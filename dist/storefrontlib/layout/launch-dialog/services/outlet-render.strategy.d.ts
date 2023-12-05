import { ComponentFactory, ComponentFactoryResolver, ComponentRef, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { OutletService } from '../../../cms-structure/outlet/index';
import { OutletRendererService } from '../../../cms-structure/outlet/outlet-renderer.service';
import { LaunchOutletDialog, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export declare class OutletRenderStrategy extends LaunchRenderStrategy {
    protected document: any;
    protected rendererFactory: RendererFactory2;
    protected outletService: OutletService<ComponentFactory<any>>;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected outletRendererService: OutletRendererService;
    constructor(document: any, rendererFactory: RendererFactory2, outletService: OutletService<ComponentFactory<any>>, componentFactoryResolver: ComponentFactoryResolver, outletRendererService: OutletRendererService);
    /**
     * Renders the element in the configured outlet
     *
     * @param config
     * @param caller
     * @param vcr
     */
    render(config: LaunchOutletDialog, caller: LAUNCH_CALLER | string): Observable<ComponentRef<any> | undefined> | void;
    hasMatch(config: LaunchOutletDialog): boolean;
    remove(caller: LAUNCH_CALLER | string, config: LaunchOutletDialog): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutletRenderStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OutletRenderStrategy>;
}
