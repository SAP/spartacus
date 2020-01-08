import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OrderAmendService } from '../order-amend.service';

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

  entries$ = this.orderAmendService.getEntries();

  constructor(protected orderAmendService: OrderAmendService) {}
}
