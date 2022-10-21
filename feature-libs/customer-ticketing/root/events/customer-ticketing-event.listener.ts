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
import { STATUS } from '../model';
import {
  TicketCreatedEvent,
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCategoryQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  GetTicketsQueryReloadEvents,
  TicketEventCreatedEvent,
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
    this.onGetTicketQueryReload();
    this.onLoginAndLogoutEvent();
    this.onTicketCreatedEvent();
  }
  onTicketCreatedEvent() {
    this.subscriptions.add(
      this.eventService.get(TicketCreatedEvent).subscribe(() => {
        this.globalMessageService.add(
          {
            key: 'customerTicketing.ticketCreated',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        this.eventService.dispatch({}, GetTicketsQueryReloadEvents);
      })
    );
  }

  protected onGetTicketQueryReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent),
        this.eventService.get(TicketEventCreatedEvent)
      ).subscribe(() => {
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
        this.eventService.dispatch({}, GetTicketCategoryQueryResetEvent);
        this.eventService.dispatch(
          {},
          GetTicketAssociatedObjectsQueryResetEvent
        );
      })
    );
  }

  protected onTicketEventCreated(): void {
    this.subscriptions.add(
      this.eventService.get(TicketEventCreatedEvent).subscribe(({ status }) => {
        if (status === STATUS.CLOSED) {
          this.globalMessageService.add(
            {
              key: 'customerTicketing.requestClosed',
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        } else if (status === STATUS.INPROCESS || status === STATUS.OPEN) {
          this.globalMessageService.add(
            {
              key: 'customerTicketing.requestReopened',
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
