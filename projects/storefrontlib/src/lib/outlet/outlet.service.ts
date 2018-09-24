import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  private templatesRefs = {};

  add(outlet: string, template: TemplateRef<any>) {
    this.templatesRefs[outlet] = template;
  }

  get(outlet: string): TemplateRef<any> {
    return this.templatesRefs[outlet] ? this.templatesRefs[outlet] : null;
  }
}
