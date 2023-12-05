import { ComponentRef, EmbeddedViewRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeferLoaderService } from '../../layout/loading/defer-loader.service';
import { IntersectionOptions } from '../../layout/loading/intersection.model';
import { OutletRendererService } from './outlet-renderer.service';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';
import * as i0 from "@angular/core";
export declare class OutletDirective<T = any> implements OnDestroy, OnChanges {
    private vcr;
    private templateRef;
    private outletService;
    private deferLoaderService;
    private outletRendererService;
    private renderedTemplate;
    renderedComponents: Map<OutletPosition, (ComponentRef<any> | EmbeddedViewRef<any>)[]>;
    cxOutlet: string;
    /**
     * Context data to be provided to child view of the outlet
     */
    cxOutletContext: T;
    /**
     * Observable with current outlet context
     */
    private readonly outletContext$;
    /**
     * Defers loading options for the the templates of this outlet.
     */
    cxOutletDefer: IntersectionOptions;
    loaded: EventEmitter<boolean>;
    cxComponentRef: ComponentRef<any> | EmbeddedViewRef<any>;
    cxComponentRefChange: EventEmitter<ComponentRef<any> | EmbeddedViewRef<any>>;
    subscription: Subscription;
    constructor(vcr: ViewContainerRef, templateRef: TemplateRef<any>, outletService: OutletService, deferLoaderService: DeferLoaderService, outletRendererService: OutletRendererService);
    /**
     * Renders view for outlet or defers it, depending on the input `cxOutletDefer`
     */
    render(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private deferLoading;
    /**
     * Renders view for outlet
     */
    private build;
    /**
     * Renders view in a given position for outlet
     */
    private buildOutlet;
    /**
     * Renders view based on the given template or component factory
     */
    private create;
    /**
     * Returns injector with OutletContextData that can be injected to the component
     * rendered in the outlet
     */
    private getComponentInjector;
    /**
     * Returns the closest `HtmlElement`, by iterating over the
     * parent nodes of the given element.
     *
     * We avoid traversing the parent _elements_, as this is blocking
     * ie11 implementations. One of the spare exclusions we make to not
     * supporting ie11.
     *
     * @param element
     */
    private getHostElement;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutletDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OutletDirective<any>, "[cxOutlet]", never, { "cxOutlet": "cxOutlet"; "cxOutletContext": "cxOutletContext"; "cxOutletDefer": "cxOutletDefer"; "cxComponentRef": "cxComponentRef"; }, { "loaded": "loaded"; "cxComponentRefChange": "cxComponentRefChange"; }, never, never, false, never>;
}
