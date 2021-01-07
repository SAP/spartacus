import { Injectable, Renderer2 } from '@angular/core';
import { HtmlBodyDecorator } from '../../cms/decorators/html-body-decorator';
import { Page } from '../../cms/model/page.model';
import { Priority } from '../../util/applicable';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditHtmlBodyDecorator extends HtmlBodyDecorator {
  constructor(protected smartEditService: SmartEditService) {
    super();
  }

  decorate(element: Element, renderer: Renderer2, cmsPage: Page): void {
    if (cmsPage) {
      // remove old page contract
      const previousContract = [];
      Array.from(element.classList).forEach((attr) =>
        previousContract.push(attr)
      );
      previousContract.forEach((attr) => element.classList.remove(attr));

      // add new page contract
      this.smartEditService.addSmartEditContract(
        element,
        renderer,
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
