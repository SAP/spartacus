import { Inject, Injectable, Renderer2 } from '@angular/core';
//import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { resolveApplicable } from '../../util';
import { ComponentDecorator } from '../decorators/component-decorator';
import { HtmlBodyDecorator } from '../decorators/html-body-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicAttributeService {
  constructor(
    //protected smartEditService?: SmartEditService,
    @Inject(ComponentDecorator)
    protected componentDecorators?: ComponentDecorator[],
    @Inject(SlotDecorator)
    protected slotDecorators?: SlotDecorator[],
    @Inject(HtmlBodyDecorator)
    protected htmlBodyDecorators?: HtmlBodyDecorator[]
  ) {}

  /**
   * Add dynamic attributes to DOM.
   * @param element: slot or cms component element
   * @param renderer
   * @param cmsRenderingContext: an object containing properties in each cms item response data
   */
  addDynamicAttributes(
    element: Element,
    renderer: Renderer2,
    cmsRenderingContext?: {
      componentData?: ContentSlotComponentData;
      slotData?: ContentSlotData;
      cmsPageData?: Page;
    }
  ): void {
    this.getComponentDecorator()?.decorate(
      element,
      renderer,
      cmsRenderingContext.componentData
    );

    this.getSlotDecorator()?.decorate(
      element,
      renderer,
      cmsRenderingContext.slotData
    );

    this.getHtmlBodyDecorator()?.decorate(
      element,
      renderer,
      cmsRenderingContext.cmsPageData
    );
  }

  protected getComponentDecorator(): ComponentDecorator {
    return resolveApplicable(this.componentDecorators);
  }

  protected getSlotDecorator(): ComponentDecorator {
    return resolveApplicable(this.slotDecorators);
  }

  protected getHtmlBodyDecorator(): HtmlBodyDecorator {
    return resolveApplicable(this.htmlBodyDecorators);
  }
}
