import { Injectable, Renderer2 } from '@angular/core';
import { ComponentDecorator } from '../../cms/decorators/component-decorator';
import { ContentSlotComponentData } from '../../cms/model/content-slot-component-data.model';
import { Priority } from '../../util/applicable';
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
    this.smartEditService.addSmartEditContract(
      component.properties,
      element,
      renderer
    );
  }

  hasMatch(): boolean {
    return this.smartEditService.isLaunchedInSmartEdit();
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
