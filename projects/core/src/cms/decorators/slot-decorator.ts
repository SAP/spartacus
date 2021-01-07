import { Injectable, Renderer2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable({
  providedIn: 'root',
})
export abstract class SlotDecorator implements Applicable {
  /**
   * Add dynamic attributes to CMS Slot element. These attributes are extracted from the properties of cms items received from backend.
   * There can by many different groups of properties, one of them is smartedit. But EC allows addons to create different groups.
   * For example, personalization may add 'script' group etc.
   * @param element: CMS slot element
   * @param renderer
   * @param slot: CMS slot data containing properties
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    slot: ContentSlotData
  ): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
