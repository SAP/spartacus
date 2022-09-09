import { Component, OnInit } from '@angular/core';
import {
  STATUS,
  STATUS_NAME,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { CustomerTicketingDialogComponent } from '../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';

@Component({
  selector: 'cx-customer-ticketing-close-dialog',
  templateUrl: './customer-ticketing-close-dialog.component.html',
})
export class CustomerTicketingCloseDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit
{
  ngOnInit(): void {
    this.buildForm();
  }

  closeRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.customerTicketingDetailsService.createTicketEvent(
        this.prepareTicketEvent()
      );
    }
  }

  protected prepareTicketEvent(): TicketEvent {
    return {
      message: this.form?.get('message')?.value,
      toStatus: {
        id: STATUS.CLOSE,
        name: STATUS_NAME.CLOSE,
      },
    };
  }
}
