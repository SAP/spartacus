import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';

@Injectable()
export class FutureStockService implements FutureStockFacade {
  /**
   * Get future stock
   */
 getFutureStock(): Observable<any> {
   return of({});
 }
}
