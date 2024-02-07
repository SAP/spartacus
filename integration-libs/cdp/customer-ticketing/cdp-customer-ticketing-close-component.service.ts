import { Injectable } from '@angular/core';
import { CustomerTicketingCloseComponentService } from '@spartacus/customer-ticketing/components';
import { Observable, of } from 'rxjs';

@Injectable()
export class CdpCustomerTicketingCloseComponentService extends CustomerTicketingCloseComponentService {
  enableCloseButton(): Observable<boolean | undefined> {
    return of(false);
  }
}
