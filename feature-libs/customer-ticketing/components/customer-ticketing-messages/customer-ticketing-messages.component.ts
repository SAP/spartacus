import { Component } from '@angular/core';
import { MessageEvent, MessagingConfigs } from '@spartacus/storefront';
import {
  CustomerTicketingConfig,
  CustomerTicketingFacade,
  TicketDetails,
  TicketEvent,
} from 'feature-libs/customer-ticketing/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-messages',
  templateUrl: './customer-ticketing-messages.component.html',
})
export class CustomerTicketingMessagesComponent {
  ticketDetails$: Observable<TicketDetails | undefined> =
    this.customerTicketingFacade.getTicket();

  constructor(
    protected customerTicketingConfig: CustomerTicketingConfig,
    protected customerTicketingFacade: CustomerTicketingFacade
  ) {}

  messageEvents$: Observable<Array<MessageEvent> | undefined> =
    this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  onSend(event: { files: FileList | undefined; message: string }) {
    this.customerTicketingFacade
      .createTicketEvent(this.prepareTicketEvent(event.message))
      .subscribe((createdEvent: TicketEvent) => {
        if (event.files?.item && createdEvent.code)
          this.customerTicketingFacade.uploadAttachment(
            event.files.item(0),
            createdEvent.code
          );
      });
  }

  protected prepareMessageEvents(): Observable<
    Array<MessageEvent> | undefined
  > {
    return this.ticketDetails$.pipe(
      map((ticket) =>
        ticket?.ticketEvents?.reverse().map(
          (event): MessageEvent => ({
            ...event,
            text: event.message,
            rightAlign: event.addedByAgent,
          })
        )
      )
    );
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      attachmentRestrictions:
        this.customerTicketingConfig.customerTicketing?.attachmentRestrictions,
      charactersLimit:
        this.customerTicketingConfig.customerTicketing?.inputCharactersLimit,
      enableFileUploadOption: true,
    };
  }

  protected prepareTicketEvent(messageText: string): TicketEvent {
    return {
      message: messageText,
    };
  }
}
