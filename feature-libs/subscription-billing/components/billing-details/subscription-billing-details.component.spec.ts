import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingDetailsComponent } from './subscription-billing-details.component';
import {
  EventService,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import {
  SubscriptionBill,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});
const mockSubBills: SubscriptionBill = {
  id: 's1',
};
class MockSubscriptionBillingFacade
  implements Partial<SubscriptionBillingFacade>
{
  getSubscriptionBillByCode(): Observable<SubscriptionBill | undefined> {
    return of(mockSubBills);
  }
  getSubscriptionBillCodeFromRoute(): Observable<string | undefined> {
    return of(mockSubBills.id);
  }
}
class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}
class MockEventService implements Partial<EventService> {
  dispatch<T extends object>(_event: T): void {}
}
@Pipe({
  name: 'cxUrl',
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}
describe('SubscriptionBillingDetailsComponent', () => {
  let component: SubscriptionBillingDetailsComponent;
  let fixture: ComponentFixture<SubscriptionBillingDetailsComponent>;
  let eventService: EventService;
  let facade: SubscriptionBillingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SubscriptionBillingDetailsComponent, MockUrlPipe],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingFacade,
        },
      ],
    }).compileComponents();

    eventService = TestBed.inject(EventService);
    facade = TestBed.inject(SubscriptionBillingFacade);
    spyOn(eventService, 'dispatch').and.callThrough();
    spyOn(facade, 'getSubscriptionBillByCode').and.callThrough();
    routerParam$.next({ ticketCode: 's1' });
    fixture = TestBed.createComponent(SubscriptionBillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload data', () => {
    component.ngOnInit();
    expect(eventService.dispatch).toHaveBeenCalled();
    expect(facade.getSubscriptionBillByCode).toHaveBeenCalled();
  });
});
