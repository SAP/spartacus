import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import { MockTranslationService } from 'projects/core/src/i18n/testing/mock-translation.service';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';

import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentFields,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { FileDownloadService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

const blob = new Blob();

const mockAccountSummaryList: AccountSummaryList = {
  orgDocumentTypes: [
    {
      code: 'Purchase Order',
      name: 'Purchase Order',
    },
    {
      code: 'Invoice',
      name: 'Invoice',
    },
    {
      code: 'Credit Note',
      name: 'Credit Note',
    },
    {
      code: 'Debit Note',
      name: 'Debit Note',
    },
    {
      code: 'Statement',
      name: 'Statement',
    },
  ],
  orgDocuments: [
    {
      amount: 7851558,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000001',
      openAmount: 7851558,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 796371,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: '2014-07-10',
      id: 'CRNCR-0000001',
      openAmount: 796371,
      orgDocumentType: {
        code: 'Invoice',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 3175103,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000004',
      openAmount: 3175103,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 5094536,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000002',
      openAmount: 5094536,
      attachments: {
        id: 'INPG-00100001',
      },
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 8200511,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000003',
      openAmount: 8200511,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 6929663,
      createdAtDate: '2014-06-12',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000006',
      openAmount: 6929663,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.CLOSED,
    },
    {
      amount: 7907774,
      createdAtDate: '2014-06-12',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000005',
      openAmount: 7907774,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.CLOSED,
    },
    {
      amount: 3754263,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000009',
      openAmount: 3754263,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 3893837,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000010',
      openAmount: 3893837,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 2537717,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000011',
      openAmount: 2537717,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 10,
    sort: 'byCreatedAtDateAsc',
    totalPages: 6,
    totalResults: 55,
  },
  sorts: [
    {
      code: 'byCreatedAtDateAsc',
      selected: true,
    },
    {
      code: 'byCreatedAtDateDesc',
      selected: false,
    },
    {
      code: 'byDueAtDateAsc',
      selected: false,
    },
    {
      code: 'byDueAtDateDesc',
      selected: false,
    },
    {
      code: 'byOriginalAmountAsc',
      selected: false,
    },
    {
      code: 'byOriginalAmountDesc',
      selected: false,
    },
    {
      code: 'byOpenAmountAsc',
      selected: false,
    },
    {
      code: 'byOpenAmountDesc',
      selected: false,
    },
    {
      code: 'byOrgDocumentTypeAsc',
      selected: false,
    },
    {
      code: 'byOrgDocumentTypeDesc',
      selected: false,
    },
    {
      code: 'byStatusAsc',
      selected: false,
    },
    {
      code: 'byStatusDesc',
      selected: false,
    },
    {
      code: 'byOrgDocumentIdAsc',
      selected: false,
    },
    {
      code: 'byOrgDocumentIdDesc',
      selected: false,
    },
  ],
};

class MockAccountSummaryFacade implements Partial<AccountSummaryFacade> {
  getDocumentList(params: DocumentQueryParams): Observable<AccountSummaryList> {
    return of(params ? mockAccountSummaryList : {});
  }

  getDocumentAttachment(
    orgDocumentId?: string,
    orgDocumentAttachmentId?: string
  ): Observable<any> {
    return of(orgDocumentId && orgDocumentAttachmentId ? blob : undefined);
  }
}

class MockFileDownloadService {
  download = createSpy('MockFileDownloadService.download Spy');
}

describe('AccountSummaryDocumentComponent', () => {
  let component: AccountSummaryDocumentComponent;
  let fixture: ComponentFixture<AccountSummaryDocumentComponent>;
  let accountSummaryFacade: AccountSummaryFacade;
  let translationService: TranslationService;
  let downloadService: FileDownloadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AccountSummaryDocumentComponent],
      providers: [
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        { provide: AccountSummaryFacade, useClass: MockAccountSummaryFacade },
        { provide: FileDownloadService, useClass: MockFileDownloadService },
      ],
    }).compileComponents();
    accountSummaryFacade = TestBed.inject(AccountSummaryFacade);
    translationService = TestBed.inject(TranslationService);
    downloadService = TestBed.inject(FileDownloadService);
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

  it('should download the attachment file', async () => {
    const document = {
      id: 'documentTestId',
      attachments: {
        id: 'attachmentTestId',
      },
    };

    spyOn(accountSummaryFacade, 'getDocumentAttachment').and.returnValue(
      of(blob)
    );
    const fakeUrl =
      'blob:http://localhost:9877/50d43852-5f76-41e0-bb36-599d4b99af07';
    spyOn(URL, 'createObjectURL').and.returnValue(fakeUrl);

    component.downloadAttachment(document, document.attachments.id);
    fixture.detectChanges();

    expect(accountSummaryFacade.getDocumentAttachment).toHaveBeenCalledWith(
      document.id,
      document.attachments.id
    );

    expect(downloadService.download).toHaveBeenCalledWith(
      fakeUrl,
      document.attachments.id
    );
  });
});
