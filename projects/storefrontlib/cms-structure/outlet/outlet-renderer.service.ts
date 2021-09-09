import { Injectable } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OutletDirective } from './outlet.directive';

@Injectable({
  providedIn: 'root',
})
export class OutletRendererService {
  private outletRefs = new BehaviorSubject(new Map<string, OutletDirective>());

  /**
   * Dynamically render the templates in the specified array
   *
   * @param outlet
   */
  render(outlet: string): void {
    if (this.outletRefs.value.size !== 0) {
      this.outletRefs.value.get(outlet).render();
    }
  }

  /**
   * Register outlet to be available to render dynamically
   *
   * @param cxOutlet
   * @param context
   */
  register(cxOutlet: string, context: OutletDirective): void {
    this.outletRefs.next(this.outletRefs.value.set(cxOutlet, context));
  }
  /**
   * Returns map of outlets
   *
   */
  getOutletRef(outlet: string): Observable<OutletDirective> {
    return this.outletRefs.asObservable().pipe(
      map((val) => val.get(outlet)),
      filter(isNotNullable)
    );
  }
}
