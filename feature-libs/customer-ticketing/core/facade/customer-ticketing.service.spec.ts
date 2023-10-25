import { inject, TestBed } from '@angular/core/testing';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  NewMessageEvent,
  STATUS,
  STATUS_NAME,
  TicketClosedEvent,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketReopenedEvent,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { of, throwError } from 'rxjs';
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
const mockTicketList: TicketList = {
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byId',
    totalPages: 2,
    totalResults: 10,
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
const mockCategories = [
  {
    id: 'ENQUIRY',
    name: 'Enquiry',
  },
];

const mockTicketAssociatedObjects = [
  {
    code: '00000626',
    modifiedAt: '2022-06-30T16:16:44+0000',
    type: 'Order',
  },
];

const mockCreateEventResponse: TicketEvent = {
  code: 'mockCode',
  message: 'mock message',
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
  getTickets = createSpy().and.returnValue(of(mockTicketList));
  createTicketEvent = createSpy().and.returnValue(of(mockCreateEventResponse));
  getTicketAssociatedObjects = createSpy().and.returnValue(
    of(mockTicketAssociatedObjects)
  );
  getTicketCategories = createSpy().and.returnValue(of(mockCategories));
  uploadAttachment = createSpy().and.returnValue(of(`uploadAttachment`));
  downloadAttachment = createSpy().and.returnValue(of(`downloadAttachment`));
  createTicket = createSpy().and.returnValue(of(mockCreatedTicketResponse));
}

describe('CustomerTicketingService', () => {
  let service: CustomerTicketingService;
  let connector: CustomerTicketingConnector;
  let eventService: EventService;

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
    eventService = TestBed.inject(EventService);
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

  describe('getTickets', () => {
    const mockCurrentPage = 1;
    const mockPageSize = 5;
    const mockSort = 'byId';

    it('should call customerTicketingConnector.getTickets', (done) => {
      service
        .getTickets(mockCurrentPage, mockPageSize, mockSort)
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getTickets).toHaveBeenCalledWith(
            mockUserId,
            mockCurrentPage,
            mockPageSize,
            mockSort
          );
          expect(data).toEqual(mockTicketList);
          done();
        });
    });

    it('should contain the query state', (done) => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byId';

      service
        .getTicketsState(mockCurrentPage, mockPageSize, mockSort)
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getTickets).toHaveBeenCalledWith(
            mockUserId,
            mockCurrentPage,
            mockPageSize,
            mockSort
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockTicketList,
          });
          done();
        });
    });
  });

  describe('getTicketCategories', () => {
    it('should call customerTicketingConnector.getTicketCategories', (done) => {
      service
        .getTicketCategories()
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getTicketCategories);
          expect(data).toEqual(mockCategories);
          done();
        });
    });

    it('should contain the query state', (done) => {
      service
        .getTicketCategoriesState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getTicketCategories);
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockCategories,
          });
          done();
        });
    });
  });

  describe('getTicketAssociatedObjects', () => {
    it('should call customerTicketingConnector.getTicketAssociatedObjects', (done) => {
      service
        .getTicketAssociatedObjects()
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getTicketAssociatedObjects).toHaveBeenCalledWith(
            mockUserId
          );
          expect(data).toEqual(mockTicketAssociatedObjects);
          done();
        });
    });

    it('should contain the query state', (done) => {
      service
        .getTicketAssociatedObjectsState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getTicketAssociatedObjects).toHaveBeenCalledWith(
            mockUserId
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockTicketAssociatedObjects,
          });
          done();
        });
    });

    it('should handle error response', () => {
      const errorResponse = {
        loading: false,
        data: null,
        error: 'Some error message',
      };

      spyOn(service, 'getTicketAssociatedObjectsState').and.returnValue(
        throwError(errorResponse.error)
      );

      service.getTicketAssociatedObjects().subscribe(
        () => {
          fail('Should not reach here');
        },
        (error) => {
          expect(error).toEqual(errorResponse.error);
        }
      );
    });
  });

  describe('createTicketEvent', () => {
    it('should call customerTicketingConnector.createTicketEvent', (done) => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: 'mockTicket',
          name: 'mockTicket',
        },
      };
      service
        .createTicketEvent(mockTicketEvent)
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.createTicketEvent).toHaveBeenCalledWith(
            mockUserId,
            mockRoutingParams.ticketCode,
            mockTicketEvent
          );
          expect(data).toEqual(mockCreateEventResponse);
          done();
        });
    });

    it('should dispatch TicketClosedEvent if the toStatus id is CLOSED', (done) => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.CLOSED,
          name: STATUS_NAME.CLOSED,
        },
      };

      spyOn(eventService, 'dispatch').and.callThrough();
      service.createTicketEvent(mockTicketEvent).pipe(take(1)).subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith({}, TicketClosedEvent);
      done();
    });

    it('should dispatch TicketReopenedEvent if the toStatus id is OPEN or INPROCESS', (done) => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.OPEN,
          name: STATUS_NAME.OPEN,
        },
      };

      spyOn(eventService, 'dispatch').and.callThrough();
      service.createTicketEvent(mockTicketEvent).pipe(take(1)).subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        TicketReopenedEvent
      );
      done();
    });

    it('should not dispatch TicketReopenedEvent if containsAttachment is true', (done) => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.INPROCESS,
          name: STATUS_NAME.INPROCESS,
        },
      };

      spyOn(eventService, 'dispatch').and.callThrough();
      service
        .createTicketEvent(mockTicketEvent, true)
        .pipe(take(1))
        .subscribe();

      expect(eventService.dispatch).not.toHaveBeenCalledWith(
        {},
        TicketReopenedEvent
      );
      done();
    });

    it('should dispatch NewMessageEvent if containsAttachment is false and there is no status change', (done) => {
      const mockTicketEvent: TicketEvent = {
        message: 'MockMessage',
      };

      spyOn(eventService, 'dispatch').and.callThrough();
      service
        .createTicketEvent(mockTicketEvent, false)
        .pipe(take(1))
        .subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith({}, NewMessageEvent);
      done();
    });
  });

  describe('uploadAttachment', () => {
    it('should call customerTicketingConnector.uploadAttachment', (done) => {
      service
        .uploadAttachment('' as unknown as File, 'mockCode', 'mockId')
        .pipe(take(1))
        .subscribe(() => {
          expect(connector.uploadAttachment).toHaveBeenCalledWith(
            mockUserId,
            'mockId',
            'mockCode',
            '' as unknown as File
          );
          done();
        });
    });
  });

  describe('downloadAttachment', () => {
    it('should call customerTicketingConnector.downloadAttachment', (done) => {
      service
        .downloadAttachment('mockCode', 'mockId')
        .pipe(take(1))
        .subscribe(() => {
          expect(connector.downloadAttachment).toHaveBeenCalledWith(
            mockUserId,
            '1',
            'mockCode',
            'mockId'
          );
          done();
        });
    });
  });

  describe('createTicket', () => {
    it('should call customerTicketingConnector.createTicket', (done) => {
      const mockTicketStarter: TicketStarter = {
        message: 'Test',
        subject: 'Test',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
      };
      service
        .createTicket(mockTicketStarter)
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.createTicket).toHaveBeenCalledWith(
            mockUserId,
            mockTicketStarter
          );
          expect(data).toEqual(mockCreatedTicketResponse);
          done();
        });
    });
  });
});
