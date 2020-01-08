import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { OrderAmendService } from '../order-amend.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderConfirmationComponent {
  orderCode: string;

  form$ = this.orderAmendService
    .getForm()
    .pipe(tap(form => (this.orderCode = form.value.orderCode)));

  entries$ = this.orderAmendService.getAmendedEntries();

  constructor(protected orderAmendService: OrderAmendService) {}

  submit(form: FormGroup): void {
    form.disable();
    this.orderAmendService.save();
  }
}
