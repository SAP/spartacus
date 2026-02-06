import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingDetailsComponent } from './subscription-billing-details.component';
import {
  EventService,
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import {
  SubscriptionBill,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});
const mockSubBills: SubscriptionBill = {
  id: 's1',
  documentNumber: '5776',
  billAt: '2026-04-11T00:00:00+0000',
  periodStartAt: '2026-01-09T00:00:00+0000',
  periodEndAt: '2026-04-09T00:00:00+0000',
  netAmount: 'USD 50.00',
  items: [
    {
      productCode: 'SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq',
      productName: 'SAPCPQ_EDITRATIO_FORMAT_TIERS',
      subscriptionDocumentNumber: '807',
      subscriptionId: '86B01278-B670-4812-B69C-55E41439D59E',
      netAmount: 'USD 50.00',
      usageCharges: [
        {
          typeName: 'Charge',
          netAmount: 'USD 50.00',
        },
      ],
    },
  ],
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
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockLanguageService {
  isocode = new BehaviorSubject('');

  getActive(): Observable<string> {
    return this.isocode;
  }

  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
}

class MockActivatedRoute {
  constructor(public snapshot: any) {}
}

describe('SubscriptionBillingDetailsComponent', () => {
  let component: SubscriptionBillingDetailsComponent;
  let fixture: ComponentFixture<SubscriptionBillingDetailsComponent>;
  let eventService: EventService;
  let facade: SubscriptionBillingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SubscriptionBillingDetailsComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingFacade,
        },
        { provide: ActivatedRoute, useValue: new MockActivatedRoute({}) },
        { provide: LanguageService, useClass: MockLanguageService },
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

  fit('should render the bill details correctly', () => {
    fixture.detectChanges();
    const idEl = fixture.debugElement.query(By.css('.subscription-id'));
    expect(idEl.nativeElement.textContent).toContain('5776');

    const netAmountEl = fixture.debugElement.query(
      By.css('.subscription-bill-item-total')
    );
    expect(netAmountEl).toBeDefined();

    expect(
      fixture.debugElement.query(By.css('.subscription-bill-item-body'))
    ).toBeDefined();

    const billDetailEl = fixture.debugElement.queryAll(
      By.css('.subscription-bill-item-details')
    );
    expect(billDetailEl.length).toEqual(1);
    expect(billDetailEl[0].children.length).toBe(4);
    expect(billDetailEl[0].children[0].nativeElement.textContent).toContain(
      'SAPCPQ_EDITRATIO_FORMAT_TIERS'
    );
    expect(billDetailEl[0].children[1].nativeElement.textContent).toContain(
      'USD 50.00'
    );
    expect(billDetailEl[0].children[2].nativeElement.textContent).toContain(
      'USD 50.00'
    );
  });

  it('should reload data', () => {
    component.ngOnInit();
    expect(eventService.dispatch).toHaveBeenCalled();
    expect(facade.getSubscriptionBillByCode).toHaveBeenCalled();
  });
});
