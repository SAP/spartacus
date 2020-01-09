import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderAmendService } from '../../amend-order.service';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderComponent {
  orderCode: string;

  form$ = this.orderAmendService
    .getForm()
    .pipe(tap(form => (this.orderCode = form.value.orderCode)));

  entries$: Observable<OrderEntry[]> = this.orderAmendService.getEntries();

  constructor(protected orderAmendService: OrderAmendService) {}
}
