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
import { firstValueFrom, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors';
import { CustomerTicketingService } from './customer-ticketing.service';

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
  getUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getParams = vi.fn().mockReturnValue(of(mockRoutingParams));
}

class MockCustomerTicketingConnector
  implements Partial<CustomerTicketingConnector>
{
  getTicket = vi.fn().mockReturnValue(of(mockTicketDetails));
  getTickets = vi.fn().mockReturnValue(of(mockTicketList));
  createTicketEvent = vi.fn().mockReturnValue(of(mockCreateEventResponse));
  getTicketAssociatedObjects = vi
    .fn()
    .mockReturnValue(of(mockTicketAssociatedObjects));
  getTicketCategories = vi.fn().mockReturnValue(of(mockCategories));
  uploadAttachment = vi.fn().mockReturnValue(of(`uploadAttachment`));
  downloadAttachment = vi.fn().mockReturnValue(of(`downloadAttachment`));
  createTicket = vi.fn().mockReturnValue(of(mockCreatedTicketResponse));
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
    it('should call customerTicketingConnector.getTicket', async () => {
      const data = await firstValueFrom(service.getTicket());
      expect(connector.getTicket).toHaveBeenCalledWith(
        mockUserId,
        mockRoutingParams.ticketCode
      );
      expect(data).toEqual(mockTicketDetails);
    });

    it('should contain the query state', async () => {
      const state = await firstValueFrom(service.getTicketState());
      expect(connector.getTicket).toHaveBeenCalledWith(
        mockUserId,
        mockRoutingParams.ticketCode
      );
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockTicketDetails,
      });
    });
  });

  describe('getTickets', () => {
    const mockCurrentPage = 1;
    const mockPageSize = 5;
    const mockSort = 'byId';

    it('should call customerTicketingConnector.getTickets', async () => {
      const data = await firstValueFrom(
        service.getTickets(mockCurrentPage, mockPageSize, mockSort)
      );
      expect(connector.getTickets).toHaveBeenCalledWith(
        mockUserId,
        mockCurrentPage,
        mockPageSize,
        mockSort
      );
      expect(data).toEqual(mockTicketList);
    });

    it('should contain the query state', async () => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byId';

      const state = await firstValueFrom(
        service.getTicketsState(mockCurrentPage, mockPageSize, mockSort)
      );
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
    });
  });

  describe('getTicketCategories', () => {
    it('should call customerTicketingConnector.getTicketCategories', async () => {
      const data = await firstValueFrom(service.getTicketCategories());
      expect(connector.getTicketCategories);
      expect(data).toEqual(mockCategories);
    });

    it('should contain the query state', async () => {
      const state = await firstValueFrom(service.getTicketCategoriesState());
      expect(connector.getTicketCategories);
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockCategories,
      });
    });
  });

  describe('getTicketAssociatedObjects', () => {
    it('should call customerTicketingConnector.getTicketAssociatedObjects', async () => {
      const data = await firstValueFrom(service.getTicketAssociatedObjects());
      expect(connector.getTicketAssociatedObjects).toHaveBeenCalledWith(
        mockUserId
      );
      expect(data).toEqual(mockTicketAssociatedObjects);
    });

    it('should contain the query state', async () => {
      const state = await firstValueFrom(
        service.getTicketAssociatedObjectsState()
      );
      expect(connector.getTicketAssociatedObjects).toHaveBeenCalledWith(
        mockUserId
      );
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockTicketAssociatedObjects,
      });
    });

    it('should handle error response', () => {
      const errorResponse = {
        loading: false,
        data: null,
        error: 'Some error message',
      };

      vi.spyOn(service, 'getTicketAssociatedObjectsState').mockReturnValue(
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
    it('should call customerTicketingConnector.createTicketEvent', async () => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: 'mockTicket',
          name: 'mockTicket',
        },
      };
      const data = await firstValueFrom(
        service.createTicketEvent(mockTicketEvent)
      );
      expect(connector.createTicketEvent).toHaveBeenCalledWith(
        mockUserId,
        mockRoutingParams.ticketCode,
        mockTicketEvent
      );
      expect(data).toEqual(mockCreateEventResponse);
    });

    it('should dispatch TicketClosedEvent if the toStatus id is CLOSED', () => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.CLOSED,
          name: STATUS_NAME.CLOSED,
        },
      };

      vi.spyOn(eventService, 'dispatch');
      service.createTicketEvent(mockTicketEvent).pipe(take(1)).subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith({}, TicketClosedEvent);
    });

    it('should dispatch TicketReopenedEvent if the toStatus id is OPEN or INPROCESS', () => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.OPEN,
          name: STATUS_NAME.OPEN,
        },
      };

      vi.spyOn(eventService, 'dispatch');
      service.createTicketEvent(mockTicketEvent).pipe(take(1)).subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        TicketReopenedEvent
      );
    });

    it('should not dispatch TicketReopenedEvent if containsAttachment is true', () => {
      const mockTicketEvent: TicketEvent = {
        toStatus: {
          id: STATUS.INPROCESS,
          name: STATUS_NAME.INPROCESS,
        },
      };

      vi.spyOn(eventService, 'dispatch');
      service
        .createTicketEvent(mockTicketEvent, true)
        .pipe(take(1))
        .subscribe();

      expect(eventService.dispatch).not.toHaveBeenCalledWith(
        {},
        TicketReopenedEvent
      );
    });

    it('should dispatch NewMessageEvent if containsAttachment is false and there is no status change', () => {
      const mockTicketEvent: TicketEvent = {
        message: 'MockMessage',
      };

      vi.spyOn(eventService, 'dispatch');
      service
        .createTicketEvent(mockTicketEvent, false)
        .pipe(take(1))
        .subscribe();

      expect(eventService.dispatch).toHaveBeenCalledWith({}, NewMessageEvent);
    });
  });

  describe('uploadAttachment', () => {
    it('should call customerTicketingConnector.uploadAttachment', async () => {
      await firstValueFrom(
        service.uploadAttachment('' as unknown as File, 'mockCode', 'mockId')
      );
      expect(connector.uploadAttachment).toHaveBeenCalledWith(
        mockUserId,
        'mockId',
        'mockCode',
        '' as unknown as File
      );
    });
  });

  describe('downloadAttachment', () => {
    it('should call customerTicketingConnector.downloadAttachment', async () => {
      await firstValueFrom(service.downloadAttachment('mockCode', 'mockId'));
      expect(connector.downloadAttachment).toHaveBeenCalledWith(
        mockUserId,
        '1',
        'mockCode',
        'mockId'
      );
    });
  });

  describe('createTicket', () => {
    it('should call customerTicketingConnector.createTicket', async () => {
      const mockTicketStarter: TicketStarter = {
        message: 'Test',
        subject: 'Test',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
      };
      const data = await firstValueFrom(
        service.createTicket(mockTicketStarter)
      );
      expect(connector.createTicket).toHaveBeenCalledWith(
        mockUserId,
        mockTicketStarter
      );
      expect(data).toEqual(mockCreatedTicketResponse);
    });
  });
});
