import { TestBed } from '@angular/core/testing';
import { TicketDetails } from '@spartacus/customer-ticketing/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingAdapter } from './customer-ticketing.adapter';
import { CustomerTicketingConnector } from './customer-ticketing.connector';

import createSpy = jasmine.createSpy;

const mockTicketDetails: TicketDetails = {
  id: '1',
  subject: 'mockTicket',
};
class MockCustomerTicketingAdapter
  implements Partial<CustomerTicketingAdapter>
{
  getTicket = createSpy().and.returnValue(of(mockTicketDetails));
}

describe('CustomerTicketingConnentor', () => {
  let service: CustomerTicketingConnector;
  let adapter: CustomerTicketingAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingConnector,
        {
          provide: CustomerTicketingAdapter,
          useClass: MockCustomerTicketingAdapter,
        },
      ],
    });

    service = TestBed.inject(CustomerTicketingConnector);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service.getTicket('current', '1').pipe(take(1)).subscribe();

    expect(adapter.getTicket).toHaveBeenCalledWith('current', '1');
  });
});
