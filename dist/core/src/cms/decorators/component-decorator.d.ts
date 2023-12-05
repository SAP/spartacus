import { Renderer2 } from '@angular/core';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import * as i0 from "@angular/core";
export declare abstract class ComponentDecorator {
    /**
     * Add attributes to CMS Component element dynamically
     * @param element: CMS component element
     * @param renderer
     * @param component: CMS component data
     */
    abstract decorate(element: Element, renderer: Renderer2, component?: ContentSlotComponentData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentDecorator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentDecorator>;
}
