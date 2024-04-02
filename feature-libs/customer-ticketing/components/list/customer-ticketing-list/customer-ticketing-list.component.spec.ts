import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { EMPTY, Observable, of } from 'rxjs';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';

const mockTicketList: TicketList = {
  pagination: {
    currentPage: 0,
    pageSize: 2,
    sort: 'byId',
    totalPages: 2,
    totalResults: 3,
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

const mockTicketList2: TicketList = {
  pagination: {
    currentPage: 1,
    pageSize: 2,
    sort: 'byId',
    totalPages: 2,
    totalResults: 3,
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
      id: '0000003',
      createdAt: '2021-01-14T10:06:57+0000',
      modifiedAt: '2021-01-14T10:06:57+0000',
      status: {
        id: 'OPEN',
        name: 'Open',
      },
      subject: 'Lawnmower blade gone',
      ticketCategory: {
        id: 'ENQUIRY',
        name: 'Enquiry',
      },
      ticketEvents: [
        {
          author: 'Bob',
          createdAt: '2021-01-14T10:06:57+0000',
          message: 'Mower missing blade',
          toStatus: {
            id: 'OPEN',
            name: 'Open',
          },
        },
      ],
    },
  ],
};

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination: any;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions: any;
  @Input() sortLabels: any;
  @Input() selectedOption: any;
  @Input() placeholder: any;
  @Output() sortListEvent = new EventEmitter<string>();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {
  go() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

class MockCustomerTicketingFacade {
  getTickets(
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<TicketList> {
    return of(mockTicketList);
  }

  clearTicketList() {}
}
@Component({
  selector: 'cx-customer-ticketing-create',
})
class MockCustomerTicketingCreateComponent {}

describe('CustomerTicketingListComponent', () => {
  let component: CustomerTicketingListComponent;
  let fixture: ComponentFixture<CustomerTicketingListComponent>;
  let routingService: RoutingService;
  let customerTicketingFacade: CustomerTicketingFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          CustomerTicketingListComponent,
          MockPaginationComponent,
          MockSortingComponent,
          MockUrlPipe,
          MockCustomerTicketingCreateComponent,
        ],
        providers: [
          {
            provide: CustomerTicketingFacade,
            useClass: MockCustomerTicketingFacade,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();

      const translationService = TestBed.inject(TranslationService);
      spyOn(translationService, 'translate').and.callFake((input) => {
        switch (input) {
          case 'customerTicketing.ticketId':
            return of('ticket-id');
          case 'customerTicketing.changedOn':
            return of(new Date(0).toISOString());
          default:
            return EMPTY;
        }
      });

      customerTicketingFacade = TestBed.inject(CustomerTicketingFacade);

      fixture = TestBed.createComponent(CustomerTicketingListComponent);
      component = fixture.componentInstance;
      routingService = TestBed.inject(RoutingService);
      fixture.detectChanges();
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display tickets', () => {
    const TWO_TICKETS = '(3)';

    const ticketsCount = fixture.debugElement.query(
      By.css('.cx-ticketing-list-title-text')
    );

    expect(ticketsCount.nativeElement.textContent).toContain(TWO_TICKETS);
  });

  it('should fetch ticket list', () => {
    let tickets: TicketList | undefined;
    component.tickets$.subscribe((data) => (tickets = data)).unsubscribe();

    expect(tickets).toEqual(mockTicketList);
  });

  it('should redirect to ticket details page', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(
      By.css('.cx-ticketing-list-table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'supportTicketDetails',
      params: mockTicketList?.tickets
        ? { ticketCode: mockTicketList.tickets[1].id }
        : {},
    });
  });

  it('should display next page', () => {
    spyOn(customerTicketingFacade, 'getTickets').and.returnValue(
      of(mockTicketList2)
    );

    component.pageChange(1);

    fixture.detectChanges();
    const idElements = fixture.debugElement
      .queryAll(By.css('.cx-ticketing-list-id a.cx-ticketing-list-value'))
      .map((debugElement) => debugElement.nativeElement as HTMLElement);
    expect(idElements.length).toBe(1);
    expect(idElements[0].textContent?.includes('0000003')).toBe(true);
  });
});
