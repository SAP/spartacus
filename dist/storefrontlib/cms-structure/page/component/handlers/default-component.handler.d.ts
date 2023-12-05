import { ComponentRef, ElementRef, Injector, NgModuleRef, ViewContainerRef } from '@angular/core';
import { ComponentHandler } from './component-handler';
import { Observable } from 'rxjs';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Default component handler used for dynamically launching cms components implemented
 * as native Angular components.
 */
export declare class DefaultComponentHandler implements ComponentHandler {
    hasMatch(componentMapping: CmsComponentMapping): boolean;
    getPriority(): Priority;
    launcher(componentMapping: CmsComponentMapping, viewContainerRef: ViewContainerRef, elementInjector?: Injector, module?: NgModuleRef<any>): Observable<{
        elementRef: ElementRef;
        componentRef?: ComponentRef<any>;
    }>;
    protected getComponentFactory(injector: Injector, component: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultComponentHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultComponentHandler>;
}
