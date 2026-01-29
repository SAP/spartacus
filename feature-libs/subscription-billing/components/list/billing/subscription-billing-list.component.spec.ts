import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
    SubscriptionBillingFacade,
    SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SubscriptionBillingListComponent } from '@spartacus/subscription-billing/components';

const listWithData: SubscriptionBillsList = {
  pagination: {
    currentPage: 0,
    pageSize: 1,
    sort: "byBillingDateDesc",
    totalPages: 410,
    totalResults: 2047
  },
  results: [
    {
      billAt: "2026-04-11T00:00:00+0000",
      documentNumber: "5776",
      id: "019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015",
      items: [
        {
          netAmount: "USD0.00",
          productCode: "SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq",
          productName: "SAPCPQ_EDITRATIO_FORMAT_TIERS",
          subscriptionDocumentNumber: "807",
          subscriptionId: "86B01278-B670-4812-B69C-55E41439D59E",
          usageCharges: [{
            netAmount: "USD185.00",
            typeName: "Charge"
          }]
        }
      ],
      netAmount: "USD0.00",
      numberOfSubscriptions: 1,
      periodEndAt: "2026-04-09T00:00:00+0000",
      periodStartAt: "2026-01-09T00:00:00+0000",
    }
  ],
  sorts: [
    {
      code: "byDocumentNumberDesc",
      name: "Bill ID (desc)",
      selected: false
    },
    {
      code: "byDocumentNumberAsc",
      name: "Bill ID (asc)",
      selected: false
    },
    {
      code: "byBillingDateDesc",
      name: "Bill Date (desc)",
      selected: true
    },
    {
      code: "byBillingDateAsc",
      name: "Bill Date (asc)",
      selected: false
    }
  ],
};

const listWithNoData: SubscriptionBillsList = {
  pagination: {},
  results: [],
  sorts: [],
};

class MockSubscriptionBillingFacade implements Partial<SubscriptionBillingFacade> {
  getSubscriptionBillsList(
    _pageSize?: number,
    _currentPage?: number,
    _sort?: string,
    _dateFilter?: string
  ): Observable<SubscriptionBillsList | undefined> {
    return of(listWithData);
  }
}
class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}
@Pipe({
  name: 'cxUrl',
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('SubscriptionListComponent', () => {
  let component: SubscriptionBillingListComponent;
  let fixture: ComponentFixture<SubscriptionBillingListComponent>;
  let facadeSpy: SubscriptionBillingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SubscriptionBillingListComponent, MockUrlPipe],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingFacade,
        },
      ],
    }).compileComponents();
    facadeSpy = TestBed.inject(SubscriptionBillingFacade);
    fixture = TestBed.createComponent(SubscriptionBillingListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list with pagination and sort if data is present', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-sorting-bar'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-pagination-bar'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('tbody tr')).length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('tbody tr td')).length
    ).toEqual(5);
  });

  it('should show no subscription bills if data is not present', () => {
    component.billingList$ = of(listWithNoData);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-sorting-bar'))
        .length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-pagination-bar'))
        .length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('tbody tr')).length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('tbody tr td')).length
    ).toEqual(0);
  });

  it('should set the sort order correctly', (() => {
    spyOn(facadeSpy, 'getSubscriptionBillsList').and.returnValue(of(listWithData));
    component.onSortCodeChange('byDocumentNumberAsc');
    fixture.detectChanges();
    expect(component.listParams).toEqual({ pageNumber: 0, sortCode: 'byDocumentNumberAsc', dateFilter: undefined });
  }));

  it('should set the date filter correctly', (() => {
    component.billsDateFilterForm.controls.from.setValue('2026-01-31');
    component.billsDateFilterForm.controls.to.setValue('2026-12-31');
    component.onDateFilterChange();
    fixture.detectChanges();
    expect(component.listParams).toEqual({ pageNumber: 0, sortCode: undefined, dateFilter: `startAt:${component.minDate}:endAt:${component.maxDate}` });
  }));
});
