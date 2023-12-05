import { ComponentRef, ElementRef, Injector, NgModuleRef, ViewContainerRef } from '@angular/core';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DefaultComponentHandler } from './default-component.handler';
import { ComponentHandler } from './component-handler';
import * as i0 from "@angular/core";
/**
 * Lazy component handler used for launching lazy loaded cms components implemented
 * as native Angular components.
 */
export declare class LazyComponentHandler implements ComponentHandler {
    protected defaultHandler: DefaultComponentHandler;
    constructor(defaultHandler: DefaultComponentHandler);
    /**
     * We want to mach dynamic import signature () => import('')
     */
    hasMatch(componentMapping: CmsComponentMapping): boolean;
    private isNotClass;
    getPriority(): Priority;
    launcher(componentMapping: CmsComponentMapping, viewContainerRef: ViewContainerRef, elementInjector?: Injector, module?: NgModuleRef<any>): Observable<{
        elementRef: ElementRef;
        componentRef?: ComponentRef<any>;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyComponentHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LazyComponentHandler>;
}
