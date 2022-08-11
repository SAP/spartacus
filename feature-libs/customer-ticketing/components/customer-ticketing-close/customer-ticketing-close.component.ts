import { Component } from '@angular/core';
import { STATUS } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingService } from '../customer-ticketing.service';

@Component({
  selector: 'cx-customer-ticketing-close',
  templateUrl: './customer-ticketing-close.component.html',
})
export class CustomerTicketingCloseComponent {
  constructor(protected customerTicketingService: CustomerTicketingService) {}

  isStatusOpen$: Observable<boolean> = this.customerTicketingService
    .getTicketStatus()
    .pipe(map((status) => status === STATUS.OPEN));
}
