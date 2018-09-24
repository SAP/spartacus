import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  features = {};

  constructor() {}

  add(outlet: string, template: TemplateRef<any>) {
    this.features[outlet] = template;
  }

  get(outlet: string): TemplateRef<any> {
    return this.features[outlet] ? this.features[outlet] : null;
  }
}
