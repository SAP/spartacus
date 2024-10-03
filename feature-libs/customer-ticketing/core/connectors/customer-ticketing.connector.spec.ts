import { TestBed } from '@angular/core/testing';
import {
  TicketDetails,
  TicketEvent,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingAdapter } from './customer-ticketing.adapter';
import { CustomerTicketingConnector } from './customer-ticketing.connector';

import createSpy = jasmine.createSpy;

const mockTicketDetails: TicketDetails = {
  id: '1',
  subject: 'mockTicket',
};

const mockTicketEvent: TicketEvent = {
  message: 'mockMessage',
};

const mockTicketStarter: TicketStarter = {
  message: 'mockMessage',
};

class MockCustomerTicketingAdapter
  implements Partial<CustomerTicketingAdapter>
{
  getTicket = createSpy().and.returnValue(of(mockTicketDetails));
  getTickets = createSpy().and.returnValue(EMPTY);
  getTicketCategories = createSpy().and.returnValue(EMPTY);
  getTicketAssociatedObjects = createSpy().and.returnValue(EMPTY);
  createTicketEvent = createSpy().and.returnValue(of(mockTicketEvent));
  uploadAttachment = createSpy().and.returnValue(EMPTY);
  downloadAttachment = createSpy().and.returnValue(EMPTY);
  createTicket = createSpy().and.returnValue(EMPTY);
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

  it('should call getTicket adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service.getTicket('current', '1').pipe(take(1)).subscribe();

    expect(adapter.getTicket).toHaveBeenCalledWith('current', '1');
  });

  it('should call getTickets adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service.getTickets('current', 0, 0, 'id').pipe(take(1)).subscribe();

    expect(adapter.getTickets).toHaveBeenCalledWith('current', 0, 0, 'id');
  });

  it('should call getTicketCategories adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service.getTicketCategories().pipe(take(1)).subscribe();

    expect(adapter.getTicketCategories).toHaveBeenCalled();
  });

  it('should call getTicketAssociatedObjects adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service.getTicketAssociatedObjects('current').pipe(take(1)).subscribe();

    expect(adapter.getTicketAssociatedObjects).toHaveBeenCalledWith('current');
  });

  it('should call createTicket adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service
      .createTicket('current', mockTicketStarter)
      .pipe(take(1))
      .subscribe();

    expect(adapter.createTicket).toHaveBeenCalledWith(
      'current',
      mockTicketStarter
    );
  });

  it('should call createTicketEvent adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service
      .createTicketEvent('current', '1', mockTicketEvent)
      .pipe(take(1))
      .subscribe();

    expect(adapter.createTicketEvent).toHaveBeenCalledWith(
      'current',
      '1',
      mockTicketEvent
    );
  });

  it('should call uploadAttachment adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service
      .uploadAttachment('current', '1', 'mockEventCode', '' as unknown as File)
      .pipe(take(1))
      .subscribe();

    expect(adapter.uploadAttachment).toHaveBeenCalledWith(
      'current',
      '1',
      'mockEventCode',
      '' as unknown as File
    );
  });

  it('should call downloadAttachment adapter', () => {
    adapter = TestBed.inject(CustomerTicketingAdapter);
    service
      .downloadAttachment('current', '1', 'mockEventCode', 'mockId')
      .pipe(take(1))
      .subscribe();

    expect(adapter.downloadAttachment).toHaveBeenCalledWith(
      'current',
      '1',
      'mockEventCode',
      'mockId'
    );
  });
});
