import { ComponentFactoryResolver, ComponentRef, Injector, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchInlineRootDialog, LAUNCH_CALLER } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export declare class InlineRootRenderStrategy extends LaunchRenderStrategy {
    protected document: any;
    protected rendererFactory: RendererFactory2;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected injector: Injector;
    constructor(document: any, rendererFactory: RendererFactory2, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    get hostComponent(): ComponentRef<any>;
    render(config: LaunchInlineRootDialog, caller: LAUNCH_CALLER | string): Observable<ComponentRef<any>> | void;
    hasMatch(config: LaunchInlineRootDialog): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<InlineRootRenderStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InlineRootRenderStrategy>;
}
