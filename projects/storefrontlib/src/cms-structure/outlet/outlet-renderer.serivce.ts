import { Injectable } from '@angular/core';
import { OutletDirective } from './outlet.directive';

@Injectable({
  providedIn: 'root',
})
export class OutletRendererService {
  private outletRefs = new Map<string, OutletDirective>();

  render(outlet: string): void {
    if (this.outletRefs.size !== 0) {
      this.outletRefs.get(outlet).dynamicRender();
    }
  }

  registerOutlet(cxOutlet: string, context: OutletDirective): void {
    this.outletRefs.set(cxOutlet, context);
  }
}
