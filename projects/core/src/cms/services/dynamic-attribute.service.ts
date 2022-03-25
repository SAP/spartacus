import { Injectable, Renderer2 } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';

/**
 * Service that used to add dynamic attributes to CMS component
 * and slot elements.
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  private componentDecorators$ = this.unifiedInjector
    .getMulti(ComponentDecorator)
    .pipe(shareReplay(1));

  private slotDecorators$ = this.unifiedInjector
    .getMulti(SlotDecorator)
    .pipe(shareReplay(1));

  constructor(protected unifiedInjector: UnifiedInjector) {}

  /**
   * Add dynamic attributes to CMS component element
   * @param element: CMS component element
   * @param renderer
   * @param componentData: component data
   */
  addAttributesToComponent(
    element: Element,
    renderer: Renderer2,
    componentData?: ContentSlotComponentData
  ) {
    (getLastValueSync(this.componentDecorators$) || []).forEach((decorator) =>
      decorator.decorate(element, renderer, componentData)
    );
  }

  /**
   * Add dynamic attributes to CMS slot element
   * @param element: CMS slot element
   * @param renderer
   * @param slotData: slot data
   */
  addAttributesToSlot(
    element: Element,
    renderer: Renderer2,
    slotData?: ContentSlotData
  ) {
    (getLastValueSync(this.slotDecorators$) || []).forEach((decorator) =>
      decorator.decorate(element, renderer, slotData)
    );
  }
}
