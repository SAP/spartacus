import { Inject, Injectable, Renderer2 } from '@angular/core';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
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
    smartEditService?: SmartEditService,
    componentDecorators?: ComponentDecorator[],
    slotDecorators?: SlotDecorator[],
    // tslint:disable-next-line:unified-signatures
    htmlBodyDecorators?: HtmlBodyDecorator[]
  );
  /**
   * @deprecated since 3.0
   */
  constructor(smartEditService?: SmartEditService);
  constructor(
    // TODO: remove this SmartEditService in major release
    protected smartEditService?: SmartEditService,
    @Inject(ComponentDecorator)
    protected componentDecorators?: ComponentDecorator[],
    @Inject(SlotDecorator)
    protected slotDecorators?: SlotDecorator[],
    @Inject(HtmlBodyDecorator)
    protected htmlBodyDecorators?: HtmlBodyDecorator[]
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
  }

  addAttributesToComponent(
    element: Element,
    renderer: Renderer2,
    componentData?: ContentSlotComponentData
  ) {
    this.getComponentDecorator()?.decorate(element, renderer, componentData);
  }

  addAttributesToSlot(
    element: Element,
    renderer: Renderer2,
    slotData?: ContentSlotData
  ) {
    this.getSlotDecorator()?.decorate(element, renderer, slotData);
  }

  addAttributesToHtmlBody(cmsPage?: Page) {
    this.getHtmlBodyDecorator()?.decorate(cmsPage);
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
