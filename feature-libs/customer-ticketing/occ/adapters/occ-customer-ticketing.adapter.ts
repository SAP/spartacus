import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { CustomerTicketingAdapter } from '@spartacus/customer-ticketing/core';
import { TicketDetails } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

@Injectable()
export class OccCustomerTicketingAdapter implements CustomerTicketingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  getTicket(customerId: string, ticketId: string): Observable<TicketDetails> {
    return this.http.get<TicketDetails>(
      this.getTicketEndpoint(customerId, ticketId)
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
}
