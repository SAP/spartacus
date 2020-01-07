import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderAmendType } from './order-amend.model';
import { OrderAmendService } from './order-amend.service';

@Injectable({
  providedIn: 'root',
})
export class OrderCancellationService extends OrderAmendService {
  amendType = OrderAmendType.CANCEL;

  getEntries(): Observable<OrderEntry[]> {
    return this.getOrder().pipe(
      map(order =>
        order.entries.filter(
          entry => entry.entryNumber !== -1 && entry.cancellableQuantity > 0
        )
      )
    );
  }
}
