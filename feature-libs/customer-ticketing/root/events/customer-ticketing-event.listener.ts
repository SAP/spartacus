/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  CurrencySetEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import {
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCategoryQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  GetTicketsQueryReloadEvents,
  GetTicketsQueryResetEvents,
  NewMessageEvent,
  TicketClosedEvent,
  TicketCreatedEvent,
  TicketReopenedEvent,
  UploadAttachmentSuccessEvent,
} from './customer-ticketing.events';
@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService
  ) {
    this.onLanguageAndCurrencySetEvent();
    this.onLoginAndLogoutEvent();
    this.onTicketCreatedEvent();
    this.onNewMessage();
    this.onTicketClosed();
    this.onTicketReopened();
    this.onUploadAttachmentSucess();
  }

  protected onTicketCreatedEvent() {
    this.subscriptions.add(
      this.eventService.get(TicketCreatedEvent).subscribe(() => {
        this.globalMessageService.add(
          {
            key: 'createCustomerTicket.ticketCreated',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        this.eventService.dispatch({}, GetTicketsQueryReloadEvents);
      })
    );
  }

  protected onLanguageAndCurrencySetEvent(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, GetTicketsQueryReloadEvents);
        this.eventService.dispatch({}, GetTicketQueryReloadEvent);
      })
    );
  }

  protected onLoginAndLogoutEvent(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, GetTicketQueryResetEvent);
        this.eventService.dispatch({}, GetTicketsQueryResetEvents);
        this.eventService.dispatch({}, GetTicketCategoryQueryResetEvent);
        this.eventService.dispatch(
          {},
          GetTicketAssociatedObjectsQueryResetEvent
        );
      })
    );
  }

  protected onNewMessage(): void {
    this.subscriptions.add(
      this.eventService.get(NewMessageEvent).subscribe(() => {
        this.eventService.dispatch({}, GetTicketQueryReloadEvent);
      })
    );
  }

  protected onTicketClosed(): void {
    this.subscriptions.add(
      this.eventService.get(TicketClosedEvent).subscribe(() => {
        this.eventService.dispatch({}, GetTicketQueryResetEvent);
        this.globalMessageService.add(
          {
            key: 'customerTicketingDetails.requestClosed',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    );
  }

  protected onTicketReopened(): void {
    this.subscriptions.add(
      this.eventService.get(TicketReopenedEvent).subscribe(() => {
        this.eventService.dispatch({}, GetTicketQueryReloadEvent);
        this.globalMessageService.add(
          {
            key: 'customerTicketingDetails.requestReopened',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    );
  }

  protected onUploadAttachmentSucess(): void {
    this.subscriptions.add(
      this.eventService.get(UploadAttachmentSuccessEvent).subscribe(() => {
        this.eventService.dispatch({}, GetTicketQueryReloadEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
