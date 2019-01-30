import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutletStyleService {
  private templateRefs = {};

  add(outlet: string, elem: ElementRef<any>): void {
    this.templateRefs[outlet] = elem;
  }

  get(outlet: string): ElementRef<any> {
    return this.templateRefs[outlet];
  }
}
