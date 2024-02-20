import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  HttpErrorModel,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import {
  CUSTOMER_TICKETING_CREATE_NORMALIZER,
  CUSTOMER_TICKETING_EVENT_NORMALIZER,
  CUSTOMER_TICKETING_FILE_NORMALIZER,
} from '@spartacus/customer-ticketing/core';
import {
  AssociatedObjectsList,
  CategoriesList,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { take } from 'rxjs/operators';
import { OccCustomerTicketingAdapter } from './occ-customer-ticketing.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicket: 'users/${customerId}/tickets/${ticketId}',
        createTicketEvent: 'users/${customerId}/tickets/${ticketId}/events',
        getTickets: 'users/${customerId}/tickets',
        uploadAttachment:
          'users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments',
        downloadAttachment:
          'users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments/${attachmentId}',
        createTicket: 'users/${customerId}/tickets',
        getTicketCategories: '/ticketCategories',
        getTicketAssociatedObjects:
          'users/${customerId}/ticketAssociatedObjects',
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
        CUSTOMER_TICKETING_EVENT_NORMALIZER
      );
    });
  });

  describe('getTickets', () => {
    it('should get tickets for the given customer id', (done) => {
      const mockTicketList: TicketList = {
        pagination: {
          currentPage: 0,
          pageSize: 5,
          sort: 'byId',
          totalPages: 1,
          totalResults: 2,
        },
        sorts: [
          { code: 'byId', selected: true },
          { code: 'byChangedDate', selected: false },
        ],
        tickets: [
          {
            availableStatusTransitions: [
              {
                id: 'CLOSED',
                name: 'Closed',
              },
            ],
            id: '0000001',
            createdAt: '2021-01-13T10:06:57+0000',
            modifiedAt: '2021-01-13T10:06:57+0000',
            status: {
              id: 'CLOSED',
              name: 'Closed',
            },
            subject: 'My drill is broken.',
            ticketCategory: {
              id: 'ENQUIRY',
              name: 'Enquiry',
            },
            ticketEvents: [
              {
                author: 'Mark Rivers',
                createdAt: '2021-01-13T10:06:57+0000',
                message:
                  'It is broken when I receive it. Please send one replacement to me.',
                toStatus: {
                  id: 'CLOSED',
                  name: 'Closed',
                },
              },
            ],
          },
          {
            availableStatusTransitions: [
              {
                id: 'CLOSED',
                name: 'Closed',
              },
            ],
            id: '0000002',
            createdAt: '2021-01-14T10:06:57+0000',
            modifiedAt: '2021-01-14T10:06:57+0000',
            status: {
              id: 'OPEN',
              name: 'Open',
            },
            subject: 'Need fix for my door',
            ticketCategory: {
              id: 'ENQUIRY',
              name: 'Enquiry',
            },
            ticketEvents: [
              {
                author: 'Bob',
                createdAt: '2021-01-14T10:06:57+0000',
                message: 'Door received broken',
                toStatus: {
                  id: 'OPEN',
                  name: 'Open',
                },
              },
            ],
          },
        ],
      };
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byId';

      service
        .getTickets(mockCustomerId, PAGE_SIZE, currentPage, sort)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockTicketList);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/tickets?pageSize=${PAGE_SIZE}&currentPage=${currentPage}&sort=${sort}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockTicketList);
    });
  });

  describe('uploadAttachment', () => {
    it('should uoload attachment for the given event code and ticket id', (done) => {
      const attachmentResponse = {
        id: 'mockId',
      };
      const mockEventCode = 'mockEventCode';

      service
        .uploadAttachment(
          mockCustomerId,
          mockTicketId,
          mockEventCode,
          '' as unknown as File
        )
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(attachmentResponse);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            `users/${mockCustomerId}/tickets/${mockTicketId}/events/${mockEventCode}/attachments`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(attachmentResponse);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CUSTOMER_TICKETING_FILE_NORMALIZER
      );
    });
  });

  describe('downloadAttachment', () => {
    it('should download attachment for the given event code and ticket id', (done) => {
      const attachmentResponse = new Blob();
      const mockEventCode = 'mockEventCode';
      const mockAttachmentId = 'mockAttachmentId';

      service
        .downloadAttachment(
          mockCustomerId,
          mockTicketId,
          mockEventCode,
          mockAttachmentId
        )
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(attachmentResponse);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/tickets/${mockTicketId}/events/${mockEventCode}/attachments/${mockAttachmentId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('blob');
      mockReq.flush(attachmentResponse);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CUSTOMER_TICKETING_FILE_NORMALIZER
      );
    });
  });

  describe('createTicket', () => {
    it('should create ticket', (done) => {
      const mockTicketStarter: TicketStarter = {
        message: 'Test',
        subject: 'Test',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
      };

      const mockCreatedTicketResponse: TicketDetails = {
        availableStatusTransitions: [
          {
            id: 'CLOSED',
            name: 'Closed',
          },
        ],
        createdAt: '2022-11-09T14:19:40+0000',
        id: '00001362',
        modifiedAt: '2022-11-09T14:19:40+0000',
        status: {
          id: 'OPEN',
          name: 'Open',
        },
        subject: 'Test',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
        ticketEvents: [
          {
            author: 'Mark Rivers',
            code: '000001CI',
            createdAt: '2022-11-09T14:19:40+0000',
            message: 'Test',
          },
        ],
      };

      service
        .createTicket(mockCustomerId, mockTicketStarter)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockCreatedTicketResponse);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' && req.url === `users/${mockCustomerId}/tickets`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockCreatedTicketResponse);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CUSTOMER_TICKETING_CREATE_NORMALIZER
      );
    });
  });

  describe('getTicketAssociatedObjects', () => {
    it('should send a request to the occ API', () => {
      const response: AssociatedObjectsList = {
        ticketAssociatedObjects: [
          { code: 'mock-code', type: 'mock-type', modifiedAt: '' },
        ],
      };

      service.getTicketAssociatedObjects(mockCustomerId).subscribe((actual) => {
        expect(actual).toEqual(response.ticketAssociatedObjects);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `users/${mockCustomerId}/ticketAssociatedObjects`,
        })
        .flush(response);
    });

    it('should handle an error from the occ API', () => {
      const errorStatus = 500;
      const errorText = 'INTERNAL SERVER ERROR';

      service.getTicketAssociatedObjects(mockCustomerId).subscribe({
        error: (errObject) => {
          expect(errObject instanceof HttpErrorModel).toBe(true);
          expect((errObject as HttpErrorModel).status).toBe(errorStatus);
          expect((errObject as HttpErrorModel).statusText).toEqual(errorText);
        },
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `users/${mockCustomerId}/ticketAssociatedObjects`,
        })
        .flush({}, { status: errorStatus, statusText: errorText });
    });
  });
  describe('getTicketCategories', () => {
    it('should send a request to the occ API', () => {
      const response: CategoriesList = {
        ticketCategories: [{ id: 'mock-id', name: 'mock-name' }],
      };

      service.getTicketCategories().subscribe((actual) => {
        expect(actual).toEqual(response.ticketCategories as Category[]);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `/ticketCategories`,
        })
        .flush(response);
    });

    it('should handle an error from the occ API', () => {
      const errorStatus = 500;
      const errorText = 'INTERNAL SERVER ERROR';

      service.getTicketCategories().subscribe({
        error: (errObject) => {
          expect(errObject instanceof HttpErrorModel).toBe(true);
          expect((errObject as HttpErrorModel).status).toBe(errorStatus);
          expect((errObject as HttpErrorModel).statusText).toEqual(errorText);
        },
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `/ticketCategories`,
        })
        .flush({}, { status: errorStatus, statusText: errorText });
    });
  });
});
