import { Injectable, TemplateRef } from '@angular/core';
import { OutletPosition } from './outlet.model';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  private templatesRefs = {};
  private templatesRefsBefore = {};
  private templatesRefsAfter = {};

  add(
    outlet: string,
    template: TemplateRef<any>,
    position: OutletPosition = OutletPosition.REPLACE
  ): void {
    if (position === OutletPosition.BEFORE) {
      this.templatesRefsBefore[outlet] = template;
    }
    if (position === OutletPosition.REPLACE) {
      this.templatesRefs[outlet] = template;
    }
    if (position === OutletPosition.AFTER) {
      this.templatesRefsAfter[outlet] = template;
    }
  }

  get(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE
  ): TemplateRef<any> {
    let templateRef;
    switch (position) {
      case OutletPosition.BEFORE:
        templateRef = this.templatesRefsBefore[outlet];
        break;
      case OutletPosition.AFTER:
        templateRef = this.templatesRefsAfter[outlet];
        break;
      default:
        templateRef = this.templatesRefs[outlet];
    }
    return templateRef;
    // return this.templatesRefs[outlet] ? this.templatesRefs[outlet] : null;
  }
}
