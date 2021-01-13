import { Inject, Injectable, Optional, Renderer2 } from '@angular/core';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  /**
   * @deprecated since 3.0
   */
  constructor(smartEditService?: SmartEditService);
  constructor(
    // TODO: remove this SmartEditService in major release
    protected smartEditService?: SmartEditService,
    @Optional()
    @Inject(ComponentDecorator)
    protected componentDecorators?: ComponentDecorator[],
    @Optional()
    @Inject(SlotDecorator)
    protected slotDecorators?: SlotDecorator[]
  ) {}

  /**
   * @deprecated since 3.0, use functions addAttributesToComponent, addAttributesToSlot and addAttributesToHtmlBody instead
   *
   * Add dynamic attributes to DOM.
   * @param element: slot or cms component element
   * @param renderer
   * @param cmsRenderingContext: an object containing properties in each cms item response data
   */
  addDynamicAttributes(
    element: Element,
    renderer: Renderer2,
    cmsRenderingContext: {
      componentData?: ContentSlotComponentData;
      slotData?: ContentSlotData;
    }
  ): void {
    this.componentDecorators?.forEach((decorator) =>
      decorator.decorate(element, renderer, cmsRenderingContext.componentData)
    );

    this.slotDecorators?.forEach((decorator) =>
      decorator.decorate(element, renderer, cmsRenderingContext.slotData)
    );
  }

  addAttributesToComponent(
    element: Element,
    renderer: Renderer2,
    componentData?: ContentSlotComponentData
  ) {
    this.componentDecorators?.forEach((decorator) =>
      decorator.decorate(element, renderer, componentData)
    );
  }

  addAttributesToSlot(
    element: Element,
    renderer: Renderer2,
    slotData?: ContentSlotData
  ) {
    this.slotDecorators?.forEach((decorator) =>
      decorator.decorate(element, renderer, slotData)
    );
  }
}
