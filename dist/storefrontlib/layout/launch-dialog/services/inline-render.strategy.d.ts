import { ComponentFactoryResolver, ComponentRef, RendererFactory2, ViewContainerRef } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LAUNCH_CALLER, LaunchInlineDialog } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export declare class InlineRenderStrategy extends LaunchRenderStrategy {
    protected document: any;
    protected rendererFactory: RendererFactory2;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected logger: LoggerService;
    constructor(document: any, rendererFactory: RendererFactory2, componentFactoryResolver: ComponentFactoryResolver);
    /**
     * Renders the component from the configuration in the view container ref
     *
     * @param config
     * @param caller
     * @param vcr
     */
    render(config: LaunchInlineDialog, caller: LAUNCH_CALLER | string, vcr: ViewContainerRef): Observable<ComponentRef<any>> | void;
    hasMatch(config: LaunchInlineDialog): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<InlineRenderStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InlineRenderStrategy>;
}
