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
import { TicketList } from '@spartacus/customer-ticketing/root';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';

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

describe('CustomerTicketingListComponent', () => {
  let component: CustomerTicketingListComponent;
  let fixture: ComponentFixture<CustomerTicketingListComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display tickets', () => {
    const TWO_TICKETS = '(2)';

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
      params:
        mockTicketList && mockTicketList.tickets
          ? { ticketCode: mockTicketList.tickets[1].id }
          : {},
    });
  });
});
