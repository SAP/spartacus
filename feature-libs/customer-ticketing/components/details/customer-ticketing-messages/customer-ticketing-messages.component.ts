/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  MessageEvent,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import {
  CustomerTicketingConfig,
  CustomerTicketingFacade,
  TicketDetails,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingMessagesComponentService } from './customer-ticketing-messages-component.service';
@Component({
  selector: 'cx-customer-ticketing-messages',
  templateUrl: './customer-ticketing-messages.component.html',
})
export class CustomerTicketingMessagesComponent implements OnDestroy {
  @ViewChild(MessagingComponent) messagingComponent: MessagingComponent;
  protected customerTicketingMessagesComponentService = inject(
    CustomerTicketingMessagesComponentService
  );

  ticketDetails$: Observable<TicketDetails | undefined> =
    this.customerTicketingFacade.getTicket();

  constructor(
    protected customerTicketingConfig: CustomerTicketingConfig,
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected eventService: EventService
  ) {}

  subscription = new Subscription();

  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  onSend(event: { files: FileList | undefined; message: string }) {
    const mustWaitForAttachment =
      (event.files instanceof FileList && event.files?.length > 0) ?? false;
    this.subscription.add(
      this.customerTicketingFacade
        .createTicketEvent(
          this.prepareTicketEvent(event.message),
          mustWaitForAttachment
        )
        .subscribe((createdEvent: TicketEvent) => {
          if (event.files && event.files?.length && createdEvent.code) {
            this.customerTicketingFacade.uploadAttachment(
              event.files.item(0) as File,
              createdEvent.code
            );
          }
          this.messagingComponent?.resetForm();
        })
    );
  }

  downloadAttachment(event: {
    messageCode: string | undefined;
    attachmentId: string | undefined;
    fileName: string | undefined;
  }) {
    this.subscription.add(
      this.customerTicketingFacade
        .downloadAttachment(event.messageCode, event.attachmentId)
        .subscribe((data) => {
          const downloadURL = window.URL.createObjectURL(data as Blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = event.fileName ?? '';
          link.click();
        })
    );
  }

  protected prepareMessageEvents(): Observable<Array<MessageEvent>> {
    return this.ticketDetails$.pipe(
      map(
        (ticket) =>
          ticket?.ticketEvents?.map(
            (event: TicketEvent): MessageEvent => ({
              ...event,
              text: event.message ?? '',
              rightAlign: event.addedByAgent || false,
              attachments: event.ticketEventAttachments ?? [],
            })
          ) ?? []
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
      displayAddMessageSection: this.ticketDetails$.pipe(
        map((ticket) =>
          this.customerTicketingMessagesComponentService.displayAddMessageSection(
            ticket
          )
        )
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
