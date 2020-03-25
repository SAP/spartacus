import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OutletRendererService {
  private outletRefs = new Map<string, any>();

  render(outlet: string): void {
    this.outletRefs.get(outlet).dynamicRender();
  }

  registerOutlet(cxOutlet: string, context: any): void {
    this.outletRefs.set(cxOutlet, context);
  }
}
