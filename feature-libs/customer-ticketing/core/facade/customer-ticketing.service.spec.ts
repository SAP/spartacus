import { inject, TestBed } from '@angular/core/testing';
import {
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { TicketDetails } from '@spartacus/customer-ticketing/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors';
import { CustomerTicketingService } from './customer-ticketing.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockRoutingParams = { ticketCode: '1' };
const mockTicketDetails: TicketDetails = {
  id: '1',
  subject: 'MockTicket',
};

class MockUserIdService implements Partial<UserIdService> {
  getUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getParams = createSpy().and.returnValue(of(mockRoutingParams));
}

class MockCustomerTicketingConnector
  implements Partial<CustomerTicketingConnector>
{
  getTicket = createSpy().and.returnValue(of(mockTicketDetails));
}

describe('CustomerTicketingService', () => {
  let service: CustomerTicketingService;
  let connector: CustomerTicketingConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: CustomerTicketingConnector,
          useClass: MockCustomerTicketingConnector,
        },
      ],
    });

    service = TestBed.inject(CustomerTicketingService);
    connector = TestBed.inject(CustomerTicketingConnector);
  });

  it('should inject customerTicketingService', inject(
    [CustomerTicketingService],
    (customerTicketingService: CustomerTicketingService) => {
      expect(customerTicketingService).toBeTruthy();
    }
  ));

  describe('getTicket', () => {
    it('should call customerTicketingConnector.getTicket', (done) => {
      service
        .getTicket()
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getTicket).toHaveBeenCalledWith(
            mockUserId,
            mockRoutingParams.ticketCode
          );
          expect(data).toEqual(mockTicketDetails);
          done();
        });
    });

    it('should contain the query state', (done) => {
      service
        .getTicketState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getTicket).toHaveBeenCalledWith(
            mockUserId,
            mockRoutingParams.ticketCode
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockTicketDetails,
          });
          done();
        });
    });
  });
});
