import { Component, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { MessageEvent, MessagingConfigs } from '@spartacus/storefront';
import {
  CustomerTicketingConfig,
  CustomerTicketingFacade,
  STATUS,
  TicketDetails,
  TicketEvent,
  GetTicketQueryReloadEvent,
} from 'feature-libs/customer-ticketing/root';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-messages',
  templateUrl: './customer-ticketing-messages.component.html',
})
export class CustomerTicketingMessagesComponent implements OnDestroy {
  ticketDetails$: Observable<TicketDetails | undefined> =
    this.customerTicketingFacade.getTicket();

  constructor(
    protected customerTicketingConfig: CustomerTicketingConfig,
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected eventService: EventService
  ) {}

  subscription = new Subscription();

  messageEvents$: Observable<Array<MessageEvent> | undefined> =
    this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  onSend(event: { files: FileList | undefined; message: string }) {
    this.subscription.add(
      this.customerTicketingFacade
        .createTicketEvent(this.prepareTicketEvent(event.message))
        .subscribe((createdEvent: TicketEvent) => {
          if (event.files?.length && createdEvent.code) {
            this.customerTicketingFacade.uploadAttachment(
              event.files.item(0),
              createdEvent.code
            );
          } else {
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
          }
        })
    );
  }

  downloadAttachment(event: {
    messageCode: string;
    attachmentId: string;
    fileName: string;
  }) {
    this.subscription.add(
      this.customerTicketingFacade
        .downloadAttachment(event.messageCode, event.attachmentId)
        .subscribe((data) => {
          const downloadURL = window.URL.createObjectURL(data as any);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = event.fileName;
          link.click();
        })
    );
  }

  protected prepareMessageEvents(): Observable<
    Array<MessageEvent> | undefined
  > {
    return this.ticketDetails$.pipe(
      map((ticket) =>
        ticket?.ticketEvents?.reverse().map(
          (event: TicketEvent): MessageEvent => ({
            ...event,
            text: event.message,
            rightAlign: event.addedByAgent || false,
            attachments: event.ticketEventAttachments,
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
      displayInput: this.ticketDetails$.pipe(
        map((ticket) => ticket?.status?.id !== STATUS.CLOSED)
      ),
    };
  }

  protected prepareTicketEvent(messageText: string): TicketEvent {
    return {
      message: messageText,
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
