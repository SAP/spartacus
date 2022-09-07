import { Component, OnInit } from '@angular/core';
import {
  STATUS,
  STATUS_NAME,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { CustomerTicketingDialogComponent } from '../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';

@Component({
  selector: 'cx-customer-ticketing-reopen-dialog',
  templateUrl: './customer-ticketing-reopen-dialog.component.html',
})
export class CustomerTicketingReopenDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit
{
  ngOnInit(): void {
    this.buildForm();
  }

  reopenRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.customerTicketingDetailsService.createTicketEvent(
        this.prepareTicketEvent()
      );
    }
  }

  prepareTicketEvent(): TicketEvent {
    return {
      message: this.form?.get('message')?.value,
      toStatus: {
        id: STATUS.INPROCESS,
        name: STATUS_NAME.INPROCESS,
      },
    };
  }
}
