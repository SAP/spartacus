import { Injectable, Renderer2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable({
  providedIn: 'root',
})
export abstract class SlotDecorator implements Applicable {
  /**
   * Add attributes to CMS Slot element dynamically
   * @param element: CMS slot element
   * @param renderer
   * @param slot: CMS slot data containing properties
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    slot?: ContentSlotData
  ): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
