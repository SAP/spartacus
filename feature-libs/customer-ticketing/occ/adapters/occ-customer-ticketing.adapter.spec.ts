import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccConfig, OccEndpoints } from '@spartacus/core';
import { TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';
import { CUSTOMER_TICKETING_NORMALIZER } from 'feature-libs/customer-ticketing/core';
import { take } from 'rxjs/operators';
import { OccCustomerTicketingAdapter } from './occ-customer-ticketing.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicket: 'users/${customerId}/tickets/${ticketId}',
        createTicketEvent: 'users/${customerId}/tickets/${ticketId}/events',
      } as OccEndpoints,
    },
  },
};

const mockCustomerId = 'current';
const mockTicketId = '1';

describe('OccCustomerTicketingAdapter', () => {
  let service: OccCustomerTicketingAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCustomerTicketingAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCustomerTicketingAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getTicket', () => {
    it('should get ticket details for the given ticket id', (done) => {
      const mockTicketDetails: TicketDetails = {
        id: '1',
        subject: 'mockTicket',
      };

      service
        .getTicket(mockCustomerId, mockTicketId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockTicketDetails);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === `users/${mockCustomerId}/tickets/${mockTicketId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockTicketDetails);
    });
  });

  describe('createTicketEvent', () => {
    it('should create ticket event for the given ticket id', (done) => {
      const mockCreatedEvent: TicketEvent = {
        message: 'mock message',
        code: 'mockCode',
      };

      const mockTicketEvent: TicketEvent = {
        message: 'mock message',
      };

      service
        .createTicketEvent(mockCustomerId, mockTicketId, mockTicketEvent)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockCreatedEvent);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${mockCustomerId}/tickets/${mockTicketId}/events`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockCreatedEvent);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CUSTOMER_TICKETING_NORMALIZER
      );
      expect(converter.convert).toHaveBeenCalledWith(
        mockTicketEvent,
        CUSTOMER_TICKETING_NORMALIZER
      );
    });
  });

  describe('getTickets', () => {
    it('should get tickets for the given customer id', (done) => {
      const mockTicketList = {
        tickets: [
          {
            id: '1',
            subject: 'mockTicket',
          },
        ],
      };

      service
        .getTickets(mockCustomerId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockTicketList);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' && req.url === `users/${mockCustomerId}/tickets`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockTicketList);
    });

    it('should display no tickets for the given customer id', (done) => {
      const mockTicketList = {
        tickets: [{}],
      };

      service
        .getTickets(mockCustomerId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockTicketList);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' && req.url === `users/${mockCustomerId}/tickets`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockTicketList);
    });
  });
});
