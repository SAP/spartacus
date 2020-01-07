import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { OrderAmendService } from '../order-amend.service';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderComponent implements OnInit {
  constructor(
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected orderAmendService: OrderAmendService
  ) {}

  orderCode: string;

  entries$ = this.orderAmendService.getEntries();

  ngOnInit(): void {
    this.cancelOrReturnService.clearCancelOrReturnRequestInputs();
  }

  confirmReturn(entryInputs: CancelOrReturnRequestEntryInput[]): void {
    this.cancelOrReturnService.cancelOrReturnRequestInputs = entryInputs;
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderReturnConfirmation',
      this.orderCode
    );
  }
}
