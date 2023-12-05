import { ComponentRef, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Renderer2, Type, ViewContainerRef } from '@angular/core';
import { ContentSlotComponentData, DynamicAttributeService, EventService } from '@spartacus/core';
import { CmsComponentsService } from '../../services/cms-components.service';
import { ComponentEvent } from './events/component.event';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentHandlerService } from './services/component-handler.service';
import * as i0 from "@angular/core";
/**
 * Directive used to facilitate instantiation of CMS driven dynamic components
 */
export declare class ComponentWrapperDirective implements OnInit, OnDestroy {
    protected vcr: ViewContainerRef;
    protected cmsComponentsService: CmsComponentsService;
    protected injector: Injector;
    protected dynamicAttributeService: DynamicAttributeService;
    protected renderer: Renderer2;
    protected componentHandler: ComponentHandlerService;
    protected cmsInjector: CmsInjectorService;
    protected eventService: EventService;
    cxComponentWrapper: ContentSlotComponentData;
    cxComponentRef: EventEmitter<ComponentRef<any>>;
    /**
     * This property in unsafe, i.e.
     * - cmpRef can be set later because of lazy loading or deferred loading
     * - cmpRef can be not set at all if for example, web components are used as cms components
     */
    protected cmpRef?: ComponentRef<any>;
    private launcherResource?;
    constructor(vcr: ViewContainerRef, cmsComponentsService: CmsComponentsService, injector: Injector, dynamicAttributeService: DynamicAttributeService, renderer: Renderer2, componentHandler: ComponentHandlerService, cmsInjector: CmsInjectorService, eventService: EventService);
    ngOnInit(): void;
    private launchComponent;
    /**
     * Dispatch the component event.
     *
     * The event is dispatched during creation and removal of the component.
     */
    protected dispatchEvent(event: Type<ComponentEvent>, elementRef?: ElementRef): void;
    private decorate;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentWrapperDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ComponentWrapperDirective, "[cxComponentWrapper]", never, { "cxComponentWrapper": "cxComponentWrapper"; }, { "cxComponentRef": "cxComponentRef"; }, never, never, false, never>;
}
