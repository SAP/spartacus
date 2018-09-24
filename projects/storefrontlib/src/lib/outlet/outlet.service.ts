import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  features = {};

  constructor() {}

  add(outlet: string, template: TemplateRef<any>) {
    console.log('add new', outlet);
    this.features[outlet] = template;
  }

  get(outlet: string): TemplateRef<HTMLElement> {
    console.log('get existing', outlet);
    return this.features[outlet] ? this.features[outlet] : null;
  }
}
