import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CustomerTicketingAdapter,
  CUSTOMER_TICKETING_NORMALIZER,
  CUSTOMER_TICKETING_LIST_NORMALIZER,
} from '@spartacus/customer-ticketing/core';
import { TicketDetails, TicketList } from '@spartacus/customer-ticketing/root';
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

  getTickets(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<TicketList> {
    return this.http
      .get<TicketList>(
        this.getTicketsEndpoint(customerId, pageSize, currentPage, sort)
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_LIST_NORMALIZER)
      );
  }

  protected getTicketsEndpoint(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): string {
    return this.occEndpoints.buildUrl('getTickets', {
      urlParams: {
        customerId,
      },
      queryParams: {
        pageSize,
        currentPage,
        sort,
      },
    });
  }
}
