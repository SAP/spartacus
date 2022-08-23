import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccConfig, OccEndpoints } from '@spartacus/core';
import { TicketDetails } from '@spartacus/customer-ticketing/root';
import { take } from 'rxjs/operators';
import { OccCustomerTicketingAdapter } from './occ-customer-ticketing.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicket: 'users/${customerId}/tickets/${ticketId}',
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
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getTicket', () => {
    it('should get ticket details for the given ticket id', (done) => {
      const mockTicketiDetails: TicketDetails = {
        id: '1',
        subject: 'mockTicket',
      };

      service
        .getTicket(mockCustomerId, mockTicketId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockTicketiDetails);
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
      mockReq.flush(mockTicketiDetails);
    });
  });
});
