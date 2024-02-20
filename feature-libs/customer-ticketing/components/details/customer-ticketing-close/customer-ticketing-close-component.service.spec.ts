import { TestBed } from '@angular/core/testing';
import { CustomerTicketingCloseComponentService } from './customer-ticketing-close-component.service';
import {
  CustomerTicketingFacade,
  STATUS,
  STATUS_NAME,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Observable, of } from 'rxjs';

let mockTicket: TicketDetails = {
  status: {
    id: STATUS.OPEN,
    name: STATUS_NAME.OPEN,
  },
  availableStatusTransitions: [
    {
      id: STATUS.CLOSED,
      name: STATUS_NAME.CLOSED,
    },
  ],
};

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  getTicket(): Observable<TicketDetails | undefined> {
    return of(mockTicket);
  }
}
describe('CustomerTicketingCloseComponentService', () => {
  let service: CustomerTicketingCloseComponentService;
  let facade: CustomerTicketingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingCloseComponentService,
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
      ],
    });
    service = TestBed.inject(CustomerTicketingCloseComponentService);
    facade = TestBed.inject(CustomerTicketingFacade);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('enableCloseButton()', () => {
    it('should be false if the status is not open or in process', () => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));

      service.enableCloseButton().subscribe((data) => {
        expect(data).toEqual(false);
      });
    });

    it('should be false if available status is not closed', () => {
      mockTicket.status = { id: STATUS.OPEN, name: STATUS_NAME.OPEN };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.OPEN, name: STATUS_NAME.OPEN },
      ];
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));
      service.enableCloseButton().subscribe((data) => {
        expect(data).toEqual(false);
      });
    });

    it('should be true if status is open and available status is close', () => {
      mockTicket.status = { id: STATUS.OPEN, name: STATUS_NAME.OPEN };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED },
      ];
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));
      service.enableCloseButton().subscribe((data) => {
        expect(data).toEqual(true);
      });
    });
  });
});
