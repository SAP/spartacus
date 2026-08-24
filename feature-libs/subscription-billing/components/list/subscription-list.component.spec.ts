import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import {
  SubscriptionFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { SubscriptionListComponent } from './subscription-list.component';

const listWithData: SubscriptionList = {
  pagination: {
    currentPage: 0,
    pageSize: 2,
    sort: 'byDocumentNumberDesc',
    totalPages: 233,
    totalResults: 1162,
  },
  results: [
    {
      documentNumber: '2081',
      id: '019985A4-8221-4596-82AF-7C4A9728119E',
      name: 'Mobile 2020 Plan',
      orderCode: '0005210258',
      productCode: 'Mobile_2020_Plan_cpq',
      status: 'Active',
    },
    {
      documentNumber: '2080',
      id: '0199806E-395A-4B04-8B9C-27C5B5E2FB8E',
      name: 'Mobile 2020 Plan',
      orderCode: '0005212095',
      productCode: 'Mobile_2020_Plan_cpq',
      status: 'Active',
    },
  ],
  sorts: [
    {
      code: 'byDocumentNumberDesc',
      name: 'Document Number (desc)',
      selected: true,
    },
    {
      code: 'byDocumentNumberAsc',
      name: 'Document Number (asc)',
      selected: false,
    },
    { code: 'byDateDesc', name: 'Date (desc)', selected: false },
    { code: 'byDateAsc', name: 'Date (asc)', selected: false },
  ],
};

const listWithNoData: SubscriptionList = {
  pagination: {},
  results: [],
  sorts: [],
};

class MockSubscriptionFacade implements Partial<SubscriptionFacade> {
  getSubscriptionList(
    _pageSize?: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<SubscriptionList | undefined> {
    return of(listWithData);
  }
}
class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}
@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('SubscriptionListComponent', () => {
  let component: SubscriptionListComponent;
  let fixture: ComponentFixture<SubscriptionListComponent>;
  let facade: SubscriptionFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SubscriptionListComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: SubscriptionFacade,
          useClass: MockSubscriptionFacade,
        },
      ],
    })
      .overrideComponent(SubscriptionListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
    facade = TestBed.inject(SubscriptionFacade);
    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show list with pagination and sort if data is present', () => {
    vi.spyOn(facade, 'getSubscriptionList').mockReturnValue(of(listWithData));
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.subscription-list-sort.top'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.subscription-list-sort.bottom'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.subscription')).length
    ).toEqual(2);
  });
  it('should show no subscription is data is not present', () => {
    vi.spyOn(facade, 'getSubscriptionList').mockReturnValue(of(listWithNoData));
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.subscription-list-sort.top'))
        .length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('.subscription-list-sort.bottom'))
        .length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('.subscription')).length
    ).toEqual(0);
  });
  it('should set the sort order correctly', async () => {
    vi.spyOn(facade, 'getSubscriptionList').mockReturnValue(of(listWithData));
    component.changeSortCode('byDocumentNumberAsc');
    await Promise.resolve();
    fixture.detectChanges();
    expect(facade.getSubscriptionList).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      'byDocumentNumberAsc'
    );
  });

  it('should set the page number correctly', async () => {
    vi.spyOn(facade, 'getSubscriptionList').mockReturnValue(of(listWithData));
    component.pageChange(2);
    await Promise.resolve();
    fixture.detectChanges();
    expect(facade.getSubscriptionList).toHaveBeenCalledWith(
      expect.anything(),
      2,
      undefined
    );
  });
});
