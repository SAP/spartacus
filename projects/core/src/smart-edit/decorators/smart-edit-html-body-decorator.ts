import { Injectable, RendererFactory2 } from '@angular/core';
import { HtmlBodyDecorator } from '../../cms/decorators/html-body-decorator';
import { Page } from '../../cms/model/page.model';
import { Priority } from '../../util/applicable';
import { WindowRef } from '../../window/window-ref';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditHtmlBodyDecorator extends HtmlBodyDecorator {
  constructor(
    protected rendererFactory: RendererFactory2,
    protected winRef: WindowRef,
    protected smartEditService: SmartEditService
  ) {
    super(rendererFactory, winRef);
  }

  decorate(cmsPage: Page): void {
    if (cmsPage) {
      // remove old page contract
      const previousContract = [];
      Array.from(this.element.classList).forEach((attr) =>
        previousContract.push(attr)
      );
      previousContract.forEach((attr) =>
        this.renderer.removeClass(this.element, attr)
      );

      // add new page contract
      this.smartEditService.addSmartEditContract(
        this.element,
        this.renderer,
        cmsPage.properties
      );
    }
  }

  hasMatch(): boolean {
    return this.smartEditService.isLaunchedInSmartEdit();
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
