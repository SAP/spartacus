import { Renderer2 } from '@angular/core';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';
import * as i0 from "@angular/core";
/**
 * Service that used to add dynamic attributes to CMS component
 * and slot elements.
 */
export declare class DynamicAttributeService {
    protected unifiedInjector: UnifiedInjector;
    private componentDecorators$;
    private slotDecorators$;
    constructor(unifiedInjector: UnifiedInjector);
    /**
     * Add dynamic attributes to CMS component element
     * @param element: CMS component element
     * @param renderer
     * @param componentData: component data
     */
    addAttributesToComponent(element: Element, renderer: Renderer2, componentData?: ContentSlotComponentData): void;
    /**
     * Add dynamic attributes to CMS slot element
     * @param element: CMS slot element
     * @param renderer
     * @param slotData: slot data
     */
    addAttributesToSlot(element: Element, renderer: Renderer2, slotData?: ContentSlotData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicAttributeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DynamicAttributeService>;
}
