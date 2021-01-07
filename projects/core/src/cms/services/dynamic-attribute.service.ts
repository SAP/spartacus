import { Inject, Injectable, Renderer2 } from '@angular/core';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { resolveApplicable } from '../../util';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  constructor(
    protected smartEditService: SmartEditService,
    @Inject(ComponentDecorator)
    protected componentDecorators: ComponentDecorator[],
    @Inject(SlotDecorator)
    protected slotDecorators: SlotDecorator[]
  ) {}

  /**
   * Add dynamic attributes to DOM. These attributes are extracted from the properties of cms items received from backend.
   * There can by many different groups of properties, one of them is smartedit. But EC allows addons to create different groups.
   * For example, personalization may add 'script' group etc.
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
    if (cmsRenderingContext.componentData) {
      this.getComponentDecorator()?.decorate(
        element,
        renderer,
        cmsRenderingContext.componentData
      );
    }

    if (cmsRenderingContext.slotData) {
      this.getSlotDecorator()?.decorate(
        element,
        renderer,
        cmsRenderingContext.slotData
      );
    }
  }

  protected getComponentDecorator(): ComponentDecorator {
    return resolveApplicable(this.componentDecorators);
  }

  protected getSlotDecorator(): ComponentDecorator {
    return resolveApplicable(this.slotDecorators);
  }
}
