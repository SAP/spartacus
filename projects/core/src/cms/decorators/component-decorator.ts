import { Injectable, Renderer2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ComponentDecorator implements Applicable {
  /**
   * Add attributes to CMS Component element dynamically
   * @param element: CMS component element
   * @param renderer
   * @param component: CMS component data containing properties
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    component?: ContentSlotComponentData
  ): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
