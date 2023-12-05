import { ComponentRef, ElementRef, Injector, NgModuleRef, ViewContainerRef } from '@angular/core';
import { CmsComponentMapping, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ComponentHandler } from '../handlers/component-handler';
import * as i0 from "@angular/core";
/**
 * Responsible for obtaining component handler for specified component mapping
 */
export declare class ComponentHandlerService {
    protected handlers: ComponentHandler[];
    protected logger: LoggerService;
    constructor(handlers: ComponentHandler[]);
    protected invalidMappings: Set<CmsComponentMapping<any>>;
    /**
     * Get best matching component handler
     *
     * @param componentMapping
     */
    protected resolve(componentMapping: CmsComponentMapping): ComponentHandler | undefined;
    /**
     * Get launcher for specified component mapping
     *
     * @param componentMapping
     * @param viewContainerRef
     * @param elementInjector
     */
    getLauncher(componentMapping: CmsComponentMapping, viewContainerRef: ViewContainerRef, elementInjector?: Injector, module?: NgModuleRef<any>): Observable<{
        elementRef: ElementRef;
        componentRef?: ComponentRef<any>;
    }> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentHandlerService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentHandlerService>;
}
