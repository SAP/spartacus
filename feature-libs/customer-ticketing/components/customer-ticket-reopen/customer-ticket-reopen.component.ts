import { Component, OnInit } from '@angular/core';
import { STATUS_CLOSE } from 'feature-libs/customer-ticketing/root/customer-ticketing-constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingService } from '../customer-ticketing.service';

@Component({
  selector: 'cx-customer-ticket-reopen',
  templateUrl: './customer-ticket-reopen.component.html',
})
export class CustomerTicketReopenComponent implements OnInit {
  constructor(protected customerTicketingService: CustomerTicketingService) {}

  ngOnInit(): void {}

  isStatusClose$: Observable<boolean> = this.customerTicketingService
    .getTicketStatus()
    .pipe(map((status) => status === STATUS_CLOSE));
}
