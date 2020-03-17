import { ComponentFactory, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InlineRenderService {
  public render(template: ComponentFactory<any>, vcr: ViewContainerRef) {
    vcr.createComponent(template);
  }
}
