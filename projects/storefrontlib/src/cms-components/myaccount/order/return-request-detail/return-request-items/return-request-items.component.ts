import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReturnRequest, OrderEntry } from '@spartacus/core';
import { ReturnRequestService } from '../return-request.service';

@Component({
  selector: 'cx-return-request-items',
  templateUrl: './return-request-items.component.html',
})
export class ReturnRequestItemsComponent {
  constructor(protected returnRequestService: ReturnRequestService) {}

  orderEntries: OrderEntry[];

  returnRequest$: Observable<
    ReturnRequest
  > = this.returnRequestService.getReturnRequest().pipe(
    tap(returnRequest => {
      this.orderEntries = returnRequest.returnEntries.map(
        returnEntry => returnEntry.orderEntry
      );
    })
  );
}
