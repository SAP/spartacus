import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { OrderAmendService } from '../order-amend.service';

@Component({
  selector: 'cx-cancel-order',
  templateUrl: './cancel-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrderComponent implements OnInit {
  constructor(
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected orderAmendService: OrderAmendService
  ) {}

  orderCode: string;

  entries$ = this.orderAmendService.getEntries();

  ngOnInit(): void {
    this.cancelOrReturnService.clearCancelOrReturnRequestInputs();
  }

  confirmCancel(entryInputs: CancelOrReturnRequestEntryInput[]): void {
    this.cancelOrReturnService.cancelOrReturnRequestInputs = entryInputs;
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderCancelConfirmation',
      this.orderCode
    );
  }
}
