import { Injectable, Renderer2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ComponentDecorator implements Applicable {
  /**
   * Add dynamic attributes to CMS Component element. These attributes are extracted from the properties of cms items received from backend.
   * There can by many different groups of properties, one of them is smartedit. But EC allows addons to create different groups.
   * For example, personalization may add 'script' group etc.
   * @param element: CMS component element
   * @param renderer
   * @param component: CMS component data containing properties
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
