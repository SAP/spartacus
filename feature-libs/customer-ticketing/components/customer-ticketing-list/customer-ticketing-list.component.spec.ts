import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';
import {
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { TicketList } from '@spartacus/customer-ticketing/root';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    return of();
  }
}

class MockcustomerTicketingFacade {
  getTickets(
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<TicketList> {
    return mockTicketList$.asObservable();
  }

  clearTicketList() {}
}

const mockTicketList$ = new BehaviorSubject<TicketList>(mockTicketList);

describe('CustomerTicketingListComponent should init', () => {
  let component: CustomerTicketingListComponent;
  let fixture: ComponentFixture<CustomerTicketingListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CustomerTicketingListComponent,
          MockPaginationComponent,
          MockSortingComponent,
          MockUrlPipe,
        ],
        providers: [
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: 'customerTicketingFacade',
            useClass: MockcustomerTicketingFacade,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

describe('CustomerTicketingListComponent should display', () => {
  let component: CustomerTicketingListComponent;
  let fixture: ComponentFixture<CustomerTicketingListComponent>;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        CustomerTicketingListComponent,
        MockPaginationComponent,
        MockSortingComponent,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: 'CustomerTicketingFacade',
          useClass: MockcustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerTicketingListComponent);
    component = fixture.componentInstance;
    component.tickets$ = of(mockTicketList);
    routingService = TestBed.inject(RoutingService);
    fixture.detectChanges();
  });

  it('should display tickets', () => {
    const tickets = fixture.nativeElement.querySelectorAll(
      '.cx-ticket-list-item'
    );
    expect(tickets.length).toEqual(2);
  });

  it('should display ticket id', () => {
    const ticketId = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-id'
    );
    expect(ticketId.textContent).toContain('0000001');
  });

  it('should display ticket subject', () => {
    const ticketSubject = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-subject'
    );
    expect(ticketSubject.textContent).toContain('My drill is broken.');
  });

  it('should display ticket category', () => {
    const ticketCategory = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-category'
    );
    expect(ticketCategory.textContent).toContain('Enquiry');
  });

  it('should display ticket status', () => {
    const ticketStatus = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-status'
    );
    expect(ticketStatus.textContent).toContain('Closed');
  });

  it('should display ticket created date', () => {
    const ticketCreatedDate = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-created-date'
    );
    expect(ticketCreatedDate.textContent).toContain('13/01/2021');
  });

  it('should display ticket modified date', () => {
    const ticketModifiedDate = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-modified-date'
    );
    expect(ticketModifiedDate.textContent).toContain('13/01/2021');
  });

  it('should display ticket event message', () => {
    const ticketEventMessage = fixture.nativeElement.querySelector(
      '.cx-ticket-list-item .cx-ticket-event-message'
    );
    expect(ticketEventMessage.textContent).toContain(
      'It is broken when I receive it. Please send one replacement to me.'
    );
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
      By.css('.cx-customer-ticketing-table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'supportTickets',
      params:
        mockTicketList && mockTicketList.tickets
          ? mockTicketList.tickets[1]
          : {},
    });
  });
});
