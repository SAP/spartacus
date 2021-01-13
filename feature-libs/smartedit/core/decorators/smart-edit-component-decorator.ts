import { Injectable, Renderer2 } from '@angular/core';
import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditComponentDecorator extends ComponentDecorator {
  constructor(protected smartEditService: SmartEditService) {
    super();
  }

  decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void {
    if (component) {
      this.smartEditService.addSmartEditContract(
        element,
        renderer,
        component.properties
      );
    }
  }
}
