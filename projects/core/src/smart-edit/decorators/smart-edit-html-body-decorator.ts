import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { PageDecorator } from '../../cms/decorators/page-decorator';
import { Page } from '../../cms/model/page.model';
import { WindowRef } from '../../window/window-ref';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditHtmlBodyDecorator extends PageDecorator {
  constructor(
    protected rendererFactory: RendererFactory2,
    protected winRef: WindowRef,
    protected smartEditService: SmartEditService
  ) {
    super();
  }

  decorate(_element: Element, _renderer: Renderer2, cmsPage: Page): void {
    if (cmsPage) {
      const renderer = this.rendererFactory.createRenderer('body', null);
      const element = this.winRef.document.body;

      // remove old page contract
      const previousContract = [];
      Array.from(element.classList).forEach((attr) =>
        previousContract.push(attr)
      );
      previousContract.forEach((attr) => renderer.removeClass(element, attr));

      // add new page contract
      this.smartEditService.addSmartEditContract(
        element,
        renderer,
        cmsPage.properties
      );
    }
  }
}
