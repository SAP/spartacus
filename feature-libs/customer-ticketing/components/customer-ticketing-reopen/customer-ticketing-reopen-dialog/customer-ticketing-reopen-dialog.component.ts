import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GetTicketQueryReloadEvent,
  STATUS,
  STATUS_NAME,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';

@Component({
  selector: 'cx-customer-ticketing-reopen-dialog',
  templateUrl: './customer-ticketing-reopen-dialog.component.html',
})
export class CustomerTicketingReopenDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription;

  ngOnInit(): void {
    this.buildForm();
  }

  reopenRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.isDataLoading$.next(true);
      this.subscription = this.customerTicketingFacade
        .createTicketEvent(this.prepareTicketEvent())
        .subscribe((createdEvent: TicketEvent) => {
          if (this.form.get('file')?.value?.length && createdEvent.code) {
            this.customerTicketingFacade
              .uploadAttachment(
                this.form.get('file')?.value?.item(0),
                createdEvent.code
              )
              .subscribe({
                complete: () => {
                  this.isDataLoading$.next(false);
                  this.close('Ticket reopened successfully');
                },
                error: () => {
                  this.close('Something went wrong while reopening ticket');
                },
              });
          } else {
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
            this.isDataLoading$.next(false);
            this.close('Ticket reopened successfully');
          }
        });
    }
  }

  protected prepareTicketEvent(): TicketEvent {
    return {
      message: this.form?.get('message')?.value,
      toStatus: {
        id: STATUS.INPROCESS,
        name: STATUS_NAME.INPROCESS,
      },
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
