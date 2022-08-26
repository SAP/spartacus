import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  I18nTestingModule,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import {
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentStatus,
  DocumentQueryParams,
  DocumentFields,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';

import { MockTranslationService } from 'projects/core/src/i18n/testing/mock-translation.service';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { mockAccountSummaryList } from '../account-summary-mock-data';

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

@Component({
  template: '',
  selector: 'cx-account-summary-document-filter',
})
class MockAccountSummaryDocumentFilterComponent {
  @Input() documentTypeOptions: any;
  @Input() initialFilters: any;
  @Output() filterListEvent = new EventEmitter<DocumentQueryParams>();
}
class MockAccountSummaryFacade implements Partial<AccountSummaryFacade> {
  getDocumentList(params: DocumentQueryParams): Observable<AccountSummaryList> {
    return of(params ? mockAccountSummaryList : {});
  }
}

describe('AccountSummaryDocumentComponent', () => {
  let component: AccountSummaryDocumentComponent;
  let fixture: ComponentFixture<AccountSummaryDocumentComponent>;
  let accountSummaryFacade: AccountSummaryFacade;
  let translationService: TranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [
        AccountSummaryDocumentComponent,
        MockAccountSummaryDocumentFilterComponent,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        { provide: AccountSummaryFacade, useClass: MockAccountSummaryFacade },
      ],
    }).compileComponents();
    accountSummaryFacade = TestBed.inject(AccountSummaryFacade);
    translationService = TestBed.inject(TranslationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read document list', () => {
    let accountSummaryList: AccountSummaryList;
    component.accountSummary$
      .asObservable()
      .pipe(take(1))
      .subscribe((value: AccountSummaryList) => (accountSummaryList = value));
    expect(accountSummaryList).toEqual(mockAccountSummaryList);
    expect(component.documentTypeOptions).toEqual(
      mockAccountSummaryList.orgDocumentTypes
    );
    expect(component.sortOptions).toEqual(mockAccountSummaryList.sorts);
  });

  it('Should change page and sort', () => {
    // Spy functions to ensure new documents are being fetched
    spyOn<any>(component, 'fetchDocuments').and.callThrough();
    spyOn(accountSummaryFacade, 'getDocumentList').and.callThrough();

    // By default page will be 0
    expect(component.queryParams.page).toEqual(0);

    // Change the page
    const newPage = 5;
    component.pageChange(newPage);

    // The query params should be updated with the new page
    expect(component['fetchDocuments']).toHaveBeenCalled();
    expect(component.queryParams.page).toEqual(newPage);

    // A new call with updated parameters is made to Account Summary Facade
    expect(accountSummaryFacade.getDocumentList).toHaveBeenCalledWith({
      ...component.queryParams,
      page: newPage,
      fields: DocumentFields.DEFAULT,
    });

    // Getting ready to change sort, make sure that current sort is different than new sort code
    const newSortCode = 'NEW_SORT_CODE';
    expect(component.queryParams.sort).not.toEqual(newSortCode);

    // Change the sort
    component.changeSortCode(newSortCode);

    // Expect sort to be updated and page to be set back to 0
    expect(component.queryParams.sort).toEqual(newSortCode);
    expect(component.queryParams.page).not.toEqual(newPage);
    expect(component.queryParams.page).toEqual(0);

    expect(accountSummaryFacade.getDocumentList).toHaveBeenCalledWith({
      ...component.queryParams,
      sort: newSortCode,
      page: 0,
      fields: DocumentFields.DEFAULT,
    });
  });

  it('should chagne filters', () => {
    // Spy functions to ensure new documents are being fetched
    spyOn<any>(component, 'fetchDocuments').and.callThrough();
    spyOn(accountSummaryFacade, 'getDocumentList').and.callThrough();

    // Change the filters
    const status = DocumentStatus.CLOSED;
    const startRange = '7';
    const endRange = '11';
    const filterByKey = FilterByOptions.DUE_DATE_RANGE;
    const filterByValue = 'AbC';

    component.filterChange({
      status,
      startRange,
      endRange,
      filterByKey,
      filterByValue,
    });

    // The query params should be updated with the new page
    expect(component['fetchDocuments']).toHaveBeenCalled();
    expect(component.queryParams.page).toEqual(0);
    expect(component.queryParams.status).toEqual(status);
    expect(component.queryParams.startRange).toEqual(startRange);
    expect(component.queryParams.endRange).toEqual(endRange);
    expect(component.queryParams.filterByKey).toEqual(filterByKey);
    expect(component.queryParams.filterByValue).toEqual(filterByValue);

    // A new call with updated parameters is made to Account Summary Facade
    expect(accountSummaryFacade.getDocumentList).toHaveBeenCalledWith({
      ...component.queryParams,
      page: 0,
      fields: DocumentFields.DEFAULT,
      status,
      startRange,
      endRange,
      filterByKey,
      filterByValue,
    });
  });

  it('Should populate sort', () => {
    // By default there are 14 sort options
    expect(component.sortOptions?.length).toEqual(14);

    // Call addNamesToSortModel with two sort options
    const sorts: Array<SortModel> = [{ code: 'abc' }, { code: 'def' }];
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component['addNamesToSortModel'](sorts);

    // Expect that translate was called twice
    expect(component.sortOptions?.length).toEqual(2);
    // Expect that the length of sortOptions is 2
    expect(translationService['translate']).toHaveBeenCalledTimes(2);
    // Expect that names have been assigned
    component.sortOptions.forEach((sort, index) => {
      expect(sort.code).toEqual(sorts[index].code);
      expect(sort.name).toEqual('test');
    });
  });

  it('Should have table headers', () => {
    const tableElement = fixture.debugElement.query(
      By.css('.cx-account-summary-document-table')
    );

    const tableHeaders = tableElement.queryAll(By.css('th'));
    expect(tableHeaders?.length).toEqual(8);
    expect(tableHeaders[0].properties.innerText).toEqual(
      'orgAccountSummary.document.id'
    );
    expect(tableHeaders[1].properties.innerText).toEqual(
      'orgAccountSummary.document.type'
    );
    expect(tableHeaders[2].properties.innerText).toEqual(
      'orgAccountSummary.document.date'
    );
    expect(tableHeaders[3].properties.innerText).toEqual(
      'orgAccountSummary.document.dueDate'
    );
    expect(tableHeaders[4].properties.innerText).toEqual(
      'orgAccountSummary.document.originalAmount'
    );
    expect(tableHeaders[5].properties.innerText).toEqual(
      'orgAccountSummary.document.openAmount'
    );
    expect(tableHeaders[6].properties.innerText).toEqual(
      'orgAccountSummary.document.status'
    );
    expect(tableHeaders[7].children[0].attributes.title).toEqual(
      'orgAccountSummary.document.attachment'
    );
  });

  it('Should have populated table data', () => {
    const convertCurrency = (formattedCurrency: string): number =>
      formattedCurrency
        ? Number(formattedCurrency.replace(/[^0-9.-]+/g, ''))
        : 0;

    const isDate = (formattedDate: string): boolean =>
      /[a-zA-Z]+ \d{1,2}, \d{4}/gm.test(formattedDate);

    const tableElement = fixture.debugElement.query(
      By.css('.cx-account-summary-document-table')
    );

    const tableRows = tableElement.queryAll(By.css('tr'));
    expect(tableRows?.length).toEqual(10);

    tableRows?.forEach((row, rowNumber) => {
      const tableCells = row.queryAll(
        By.css('.cx-account-summary-document-value')
      );

      expect(tableCells?.length).toEqual(8);

      expect(tableCells[0].nativeElement.innerText).toEqual(
        mockAccountSummaryList.orgDocuments?.[rowNumber]?.id
      );

      expect(tableCells[1].nativeElement.innerText).toEqual(
        mockAccountSummaryList.orgDocuments?.[rowNumber]?.orgDocumentType?.name
      );

      expect(isDate(tableCells[2].nativeElement.innerText)).toEqual(
        !!mockAccountSummaryList.orgDocuments?.[rowNumber]?.createdAtDate
      );

      expect(isDate(tableCells[3].nativeElement.innerText)).toEqual(
        !!mockAccountSummaryList.orgDocuments?.[rowNumber]?.dueAtDate
      );

      expect(convertCurrency(tableCells[4].nativeElement.innerText)).toEqual(
        mockAccountSummaryList.orgDocuments?.[rowNumber]?.amount
      );

      expect(convertCurrency(tableCells[5].nativeElement.innerText)).toEqual(
        mockAccountSummaryList.orgDocuments?.[rowNumber]?.openAmount
      );

      expect(tableCells[6].nativeElement.innerText).toEqual(
        mockAccountSummaryList.orgDocuments?.[rowNumber]?.status
      );

      expect(!!tableCells[7].query(By.css('cx-icon'))).toEqual(
        !!mockAccountSummaryList.orgDocuments?.[rowNumber]
          ?.orgDocumentAttachment
      );
    });
  });
});
