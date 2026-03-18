import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  SubscriptionBill,
  SubscriptionBillingFacade,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SubscriptionBillingListComponent } from '@spartacus/subscription-billing/components';
import { ActivatedRoute } from '@angular/router';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';

const listWithData: SubscriptionBillsList = {
  pagination: {
    currentPage: 0,
    pageSize: 1,
    sort: 'byBillingDateDesc',
    totalPages: 410,
    totalResults: 2047,
  },
  results: [
    {
      billAt: '2026-04-11T00:00:00+0000',
      documentNumber: '5776',
      id: '019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015',
      items: [
        {
          netAmount: 'USD0.00',
          productCode: 'SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq',
          productName: 'SAPCPQ_EDITRATIO_FORMAT_TIERS',
          subscriptionDocumentNumber: '807',
          subscriptionId: '86B01278-B670-4812-B69C-55E41439D59E',
          usageCharges: [
            {
              netAmount: 'USD185.00',
              typeName: 'Charge',
            },
          ],
        },
      ],
      netAmount: 'USD0.00',
      numberOfSubscriptions: 1,
      periodEndAt: '2026-04-09T00:00:00+0000',
      periodStartAt: '2026-01-09T00:00:00+0000',
    },
  ],
  sorts: [
    {
      code: 'byDocumentNumberDesc',
      name: 'Bill ID (desc)',
      selected: false,
    },
    {
      code: 'byDocumentNumberAsc',
      name: 'Bill ID (asc)',
      selected: false,
    },
    {
      code: 'byBillingDateDesc',
      name: 'Bill Date (desc)',
      selected: true,
    },
    {
      code: 'byBillingDateAsc',
      name: 'Bill Date (asc)',
      selected: false,
    },
  ],
};

const listWithMultipleItems: SubscriptionBillsList = {
  ...listWithData,
  results: [
    {
      ...listWithData.results?.[0],
      items: [
        {
          netAmount: 'USD0.00',
          productCode: 'SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq',
          productName: 'SAPCPQ_EDITRATIO_FORMAT_TIERS',
          subscriptionDocumentNumber: '807',
          subscriptionId: '86B01278-B670-4812-B69C-55E41439D59E',
          usageCharges: [
            {
              netAmount: 'USD185.00',
              typeName: 'Charge',
            },
          ],
        },
        {
          netAmount: 'USD355.00',
          productCode: 'SB_-_recurring_types_cpq',
          productName: 'SB - recurring types',
          subscriptionDocumentNumber: '946',
          subscriptionId: 'E5FC4D4D-9BF0-4233-9C9B-1D4690C7640A',
          usageCharges: [
            {
              netAmount: 'USD185.00',
              typeName: 'Charge',
            },
            {
              netAmount: 'USD170.00',
              typeName: 'Charge',
            },
          ],
        },
        {
          netAmount: 'USD20.00',
          productCode: 'Mobile_2020_Plan_cpq',
          productName: 'Mobile 2020 Plan',
          subscriptionDocumentNumber: '864',
          subscriptionId: 'E9163E7A-F195-47A1-B8C7-563DCB6FEAD5',
          usageCharges: [
            {
              netAmount: 'USD20.00',
              typeName: 'Charge',
            },
          ],
        },
      ],
    },
  ],
};

const listWithNoData: SubscriptionBillsList = {
  pagination: {},
  results: [],
  sorts: [],
};

class MockSubscriptionBillingFacade
  implements Partial<SubscriptionBillingFacade>
{
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
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxDate',
})
class MockDatePipe implements PipeTransform {
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

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$: Observable<any> = of({ minDate: null, maxDate: null });
  dialogClose = of({ minDate: null, maxDate: null });
  openDialogAndSubscribe(
    _: LAUNCH_CALLER | string,
    __?: ElementRef,
    ___?: any
  ): void {}
  closeDialog(_: any) {}
}

describe('SubscriptionBillingListComponent', () => {
  let component: SubscriptionBillingListComponent;
  let fixture: ComponentFixture<SubscriptionBillingListComponent>;
  let facadeSpy: SubscriptionBillingFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SubscriptionBillingListComponent,
        MockUrlPipe,
        MockDatePipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ActivatedRoute, useValue: new MockActivatedRoute({}) },
        {
          provide: SubscriptionBillingFacade,
          useClass: MockSubscriptionBillingFacade,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
    facadeSpy = TestBed.inject(SubscriptionBillingFacade);
    fixture = TestBed.createComponent(SubscriptionBillingListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list with pagination, sort and date filters if data is present', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-sorting-bar')).length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-pagination-bar'))
        .length
    ).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('tbody tr td')).length).toEqual(
      5
    );
    expect(
      fixture.debugElement.queryAll(By.css('.dateRangeInputContainer')).length
    ).toEqual(1);
  });

  it('should show no subscription bills if data is not present', () => {
    component.billingList$ = of(listWithNoData);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-sorting-bar')).length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.billing-list-pagination-bar'))
        .length
    ).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('tbody tr td')).length).toEqual(
      0
    );
    expect(
      fixture.debugElement.queryAll(By.css('.text-center h3')).length
    ).toEqual(1);
  });

  it('should set the sort order correctly', () => {
    spyOn(facadeSpy, 'getSubscriptionBillsList').and.returnValue(
      of(listWithData)
    );
    component.onSortCodeChange('byDocumentNumberAsc');
    fixture.detectChanges();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: 'byDocumentNumberAsc',
      dateFilter: undefined,
    });
  });

  it('should set the date filter correctly', () => {
    component.billsDateFilterForm.controls.from.setValue('2026-01-31');
    component.billsDateFilterForm.controls.to.setValue('2026-12-31');
    component.onFilterDateChange();
    fixture.detectChanges();
    expect(component.minDate).toEqual('2026-01-31');
    expect(component.maxDate).toEqual('2026-12-31');

    component.onDateFilterSubmit();
    fixture.detectChanges();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: undefined,
      dateFilter: `startAt:${component.minDate}:endAt:${component.maxDate}`,
    });

    component.onResetFilterDate();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: undefined,
      dateFilter: undefined,
    });

    component.minDate = '2026-12-31';
    component.maxDate = '2026-12-31';
    component.onResetFilterDate();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: undefined,
      dateFilter: undefined,
    });

    component.onResetDateRange();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: undefined,
      dateFilter: undefined,
    });

    component.maxDate = '2026-12-31';
    component.onResetDateRange();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();
    expect(component.listParams).toEqual({
      pageNumber: 0,
      sortCode: undefined,
      dateFilter: undefined,
    });
  });

  it('should set the page number correctly', () => {
    component.onPageChange('2');
    fixture.detectChanges();
    expect(component.listParams).toEqual({
      pageNumber: 2,
      sortCode: undefined,
      dateFilter: undefined,
    });
  });

  it('get all subscription items except the first one to display in description tooltip', () => {
    let tooltipString = component.getTrailingSubscriptionItems(
      listWithMultipleItems.results?.[0] as SubscriptionBill
    );
    expect(tooltipString).toEqual('SB - recurring types, Mobile 2020 Plan');
    tooltipString = component.getTrailingSubscriptionItems(
      listWithData.results?.[0] as SubscriptionBill
    );
    expect(tooltipString).toEqual('');
  });
});
