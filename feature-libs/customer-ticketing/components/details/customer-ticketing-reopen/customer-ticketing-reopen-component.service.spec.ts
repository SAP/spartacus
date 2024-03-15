import { TestBed } from '@angular/core/testing';
import {
  CustomerTicketingFacade,
  STATUS,
  STATUS_NAME,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Observable, of } from 'rxjs';
import { CustomerTicketingReopenComponentService } from './customer-ticketing-reopen-component.service';

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
describe('CustomerTicketingReopenComponentService', () => {
  let service: CustomerTicketingReopenComponentService;
  let facade: CustomerTicketingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingReopenComponentService,
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
      ],
    });
    facade = TestBed.inject(CustomerTicketingFacade);
    service = TestBed.inject(CustomerTicketingReopenComponentService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('enableReopenButton()', () => {
    it('should be false if the status is not closed', () => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));

      service.enableReopenButton().subscribe((data) => {
        expect(data).toEqual(false);
      });
    });
    it('should be false if available status is not open or inprocess', () => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      mockTicket.availableStatusTransitions = [
        { id: 'OTHERS', name: 'OTHERS' },
      ];
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));
      service.enableReopenButton().subscribe((data) => {
        expect(data).toEqual(false);
      });
    });
    it('should be true if status is close and available status is open/inprocess', () => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.OPEN, name: STATUS_NAME.OPEN },
      ];
      spyOn(facade, 'getTicket').and.returnValue(of(mockTicket));
      service.enableReopenButton().subscribe((data) => {
        expect(data).toEqual(true);
      });
    });
  });
});
