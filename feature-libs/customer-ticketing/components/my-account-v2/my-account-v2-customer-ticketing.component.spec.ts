import { Pipe, PipeTransform } from '@angular/core';
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
import { MyAccountV2CustomerTicketingComponent } from './my-account-v2-customer-ticketing.component';

const mockTicketList: TicketList = {
  pagination: {},
  sorts: [],
  tickets: [
    {
      id: '0000001',
      modifiedAt: '2021-01-13T10:06:57+0000',
      subject: 'My drill is broken.',
      ticketCategory: {
        id: 'ENQUIRY',
        name: 'Enquiry',
      },
    },
  ],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
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

describe('MyAccountV2CustomerTicketingComponent', () => {
  let component: MyAccountV2CustomerTicketingComponent;
  let fixture: ComponentFixture<MyAccountV2CustomerTicketingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          MyAccountV2CustomerTicketingComponent,
          MockTranslatePipe,
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

      fixture = TestBed.createComponent(MyAccountV2CustomerTicketingComponent);
      component = fixture.componentInstance;
      component.tickets$ = of(mockTicketList);
      fixture.detectChanges();
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display heading', () => {
    const heading = fixture.debugElement.query(
      By.css('.cx-my-account-customer-ticket-heading')
    );
    expect(heading.nativeElement).not.toBeNull();
    const link = fixture.debugElement.query(By.css('#show-more-requests'));
    expect(link).not.toBeNull();
  });

  it('should show 1 return request', () => {
    const details = fixture.debugElement.query(
      By.css('.cx-my-account-customer-ticket-details')
    );
    expect(details.nativeElement).not.toBeNull();
    const noTicket = fixture.debugElement.query(
      By.css('.cx-my-account-no-ticket')
    );
    expect(noTicket).toBeNull();
  });
  it('should show no return request', () => {
    component.tickets$ = of({ tickets: [] });
    fixture.detectChanges();
    const details = fixture.debugElement.query(
      By.css('.cx-my-account-customer-ticket-details')
    );
    expect(details).toBeNull();
    const noTicket = fixture.debugElement.query(
      By.css('.cx-my-account-no-ticket')
    );
    expect(noTicket).not.toBeNull();
  });
});
