import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CustomerTicketingAdapter,
  CUSTOMER_TICKETING_DETAILS_NORMALIZER,
  CUSTOMER_TICKETING_EVENT_NORMALIZER,
  CUSTOMER_TICKETING_FILE_NORMALIZER,
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
        this.converter.pipeable(CUSTOMER_TICKETING_DETAILS_NORMALIZER)
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
      CUSTOMER_TICKETING_EVENT_NORMALIZER
    );

    return this.http
      .post<TicketEvent>(
        this.getCreateTicketEventEndpoint(customerId, ticketId),
        ticketEvent,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_EVENT_NORMALIZER)
      );
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

  uploadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    file: File
  ): Observable<unknown> {
    file = this.converter.convert(file, CUSTOMER_TICKETING_FILE_NORMALIZER);
    let formData: FormData = new FormData();
    formData.append('ticketEventAttachment', file);

    return this.http
      .post(
        this.getUploadAttachmentEndpoint(customerId, ticketId, eventCode),
        formData
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_EVENT_NORMALIZER)
      );
  }

  protected getUploadAttachmentEndpoint(
    customerId: string,
    ticketId: string,
    eventCode: string
  ): string {
    return this.occEndpoints.buildUrl('uploadAttachment', {
      urlParams: {
        customerId,
        ticketId,
        eventCode,
      },
    });
  }
}
