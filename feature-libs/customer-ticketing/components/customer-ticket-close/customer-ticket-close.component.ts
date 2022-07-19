import { Component, OnInit } from '@angular/core';
import { STATUS_OPEN } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingService } from '../customer-ticketing.service';

@Component({
  selector: 'cx-customer-ticket-close',
  templateUrl: './customer-ticket-close.component.html',
})
export class CustomerTicketCloseComponent implements OnInit {
  constructor(protected customerTicketingService: CustomerTicketingService) {}

  ngOnInit(): void {}

  isStatusOpen$: Observable<boolean> = this.customerTicketingService
    .getTicketStatus()
    .pipe(map((status) => status === STATUS_OPEN));
}
