import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CustomerTicketingAdapter,
  CUSTOMER_TICKETING_NORMALIZER,
} from '@spartacus/customer-ticketing/core';
import { TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCustomerTicketingAdapter implements CustomerTicketingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getTicket(customerId: string, ticketId: string): Observable<TicketDetails> {
    return this.http
      .get<TicketDetails>(this.getTicketEndpoint(customerId, ticketId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_NORMALIZER)
      );
  }

  protected getTicketEndpoint(customerId: string, ticketId: string): string {
    return this.occEndpoints.buildUrl('getTicket', {
      urlParams: {
        customerId,
        ticketId,
      },
    });
  }

  createTicketEvent(
    customerId: string,
    ticketId: string,
    ticketEvent: TicketEvent
  ): Observable<TicketEvent> {
    ticketEvent = this.converter.convert(
      ticketEvent,
      CUSTOMER_TICKETING_NORMALIZER
    );
    return this.http
      .post<TicketEvent>(
        this.getCreateTicketEventEndpoint(customerId, ticketId),
        ticketEvent,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getCreateTicketEventEndpoint(
    customerId: string,
    ticketId: string
  ): string {
    return this.occEndpoints.buildUrl('createTicketEvent', {
      urlParams: {
        customerId,
        ticketId,
      },
    });
  }
}
