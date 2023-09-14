import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  I18nTestingModule,
  LanguageService,
  Translatable,
  TranslationService,
} from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
  OrderInvoiceList,
  PDFInvoicesFacade,
} from '@spartacus/pdf-invoices/root';
import { FileDownloadService, IconTestingModule } from '@spartacus/storefront';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { InvoicesListComponent } from './invoices-list.component';
import createSpy = jasmine.createSpy;

const blob = new Blob();

const mockOrderInvoiceList: OrderInvoiceList = {
  invoices: [
    {
      createdAt: new Date('2023-09-15T18:29:59+0000'),
      invoiceId: '200000a',
      netAmount: {
        currencyIso: 'USD',
        value: 115,
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 117,
      },
    },
    {
      createdAt: new Date('2023-08-31T18:29:59+0000'),
      invoiceId: '200000b',
      netAmount: {
        currencyIso: 'USD',
        value: 118,
        formattedValue: '$118', //to test formatted value in UI
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 120,
        formattedValue: '$120', //to test formatted value in UI
      },
    },
    {
      createdAt: new Date('2023-07-20T18:29:59+0000'),
      invoiceId: '200000c',
      netAmount: {
        currencyIso: 'USD',
        value: 398,
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 400,
      },
    },
    {
      createdAt: new Date('2023-06-22T18:29:59+0000'),
      externalSystemId: 'S4SALES', //to test external id being passed for download
      invoiceId: '200000d',
      netAmount: {
        currencyIso: 'USD',
        value: 115,
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 117,
      },
    },
    {
      createdAt: new Date('2023-05-11T18:29:59+0000'),
      invoiceId: '200000e',
      netAmount: {
        currencyIso: 'USD',
        value: 118,
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 120,
      },
    },
  ],
  pagination: {
    count: 5,
    page: 0,
    totalCount: 16,
    totalPages: 4,
  },
  sorts: [
    {
      asc: true,
      code: 'invoiceId',
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

class MockPDFInvoicesFacade implements Partial<PDFInvoicesFacade> {
  getInvoicesForOrder(
    params: InvoiceQueryParams,
    _userId?: string,
    _orderId?: string
  ): Observable<OrderInvoiceList> {
    return of(params ? mockOrderInvoiceList : {});
  }
  getInvoicePDF(
    invoiceId: string,
    _externalSystemId?: string,
    _userId?: string,
    _orderId?: string
  ): Observable<Blob> {
    if (invoiceId) {
      return of(blob);
    } else {
      return EMPTY;
    }
  }
}

class MockFileDownloadService {
  download = createSpy('MockFileDownloadService.download Spy');
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en');
  }
}

class MockTranslationService implements Partial<TranslationService> {
  translate(value: string, options: any) {
    return of(value + Object.values(options));
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

const mockInvoicesNotEnabledError: HttpErrorModel = {
  details: [
    {
      message:
        'There is no resource for path /occ/v2/powertools-spa/users/userId1/orders/15092023/invoices',
      type: 'UnknownResourceError',
    },
  ],
};

describe('InvoicesListComponent', () => {
  let component: InvoicesListComponent;
  let fixture: ComponentFixture<InvoicesListComponent>;
  let pdfInvoicesFacade: PDFInvoicesFacade;
  let translationService: TranslationService;
  let downloadService: FileDownloadService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [
        InvoicesListComponent,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        { provide: PDFInvoicesFacade, useClass: MockPDFInvoicesFacade },
        { provide: FileDownloadService, useClass: MockFileDownloadService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
    pdfInvoicesFacade = TestBed.inject(PDFInvoicesFacade);
    translationService = TestBed.inject(TranslationService);
    downloadService = TestBed.inject(FileDownloadService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show feature not enabled error when the API returns error', () => {
    spyOn(pdfInvoicesFacade, 'getInvoicesForOrder').and.returnValue(
      throwError(mockInvoicesNotEnabledError)
    );
    spyOn(component, 'getNotEnabledError').and.callThrough();

    // Change the page
    const newPage = 3;
    component.pageChange(newPage);
    expect(component.getNotEnabledError).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'pdfInvoices.featureNotEnabled' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should read document list', (done) => {
    let orderInvoiceList: OrderInvoiceList = {};
    let queryParams: InvoiceQueryParams = {};
    component.invoicesList$
      .pipe(take(1))
      .subscribe((value: OrderInvoiceList) => {
        orderInvoiceList = value;
      });
    expect(orderInvoiceList).toEqual(mockOrderInvoiceList);
    expect(component.pagination).toEqual({
      currentPage: 0,
      pageSize: 5,
      totalPages: 4,
      totalResults: 16,
      sort: 'invoiceId:asc',
    });
    component.queryParams$
      .pipe(take(1))
      .subscribe((value: InvoiceQueryParams) => {
        queryParams = value;
        done();
      });
    expect(queryParams).toEqual({
      currentPage: 0,
      pageSize: 5,
      fields: InvoicesFields.FULL,
      sort: 'invoiceId:asc',
    });
  });

  it('Should change page and invoke the API', () => {
    // Spy functions to ensure new invoices are being fetched
    spyOn<any>(component, 'updateQueryParams').and.callThrough();
    spyOn(pdfInvoicesFacade, 'getInvoicesForOrder').and.callThrough();

    // By default currentPage will be 0
    expect(component._initQueryParams.currentPage).toEqual(0);

    // Change the page
    const newPage = 3;
    component.pageChange(newPage);

    // The query params should be updated with the new page
    expect(component['updateQueryParams']).toHaveBeenCalled();
    expect(component._initQueryParams.currentPage).toEqual(newPage);

    // A new call with updated parameters is made to PDF Invoices Facade
    expect(pdfInvoicesFacade.getInvoicesForOrder).toHaveBeenCalledWith({
      ...component._initQueryParams,
      currentPage: newPage,
      fields: InvoicesFields.DEFAULT,
    });
  });

  it('Should change sort and invoke the API', () => {
    // Spy functions to ensure new invoices are being fetched
    spyOn<any>(component, 'updateQueryParams').and.callThrough();
    spyOn(pdfInvoicesFacade, 'getInvoicesForOrder').and.callThrough();
    // Getting ready to change sort, make sure that current sort is different and should be one of the sortOptions key
    const newSortCode = 'byTotalAmountAsc';
    expect(component._initQueryParams.sort).not.toEqual(newSortCode);

    // Change the sort
    component.sortChange(newSortCode);

    // Expect sort to be updated and currentPage to be set back to 0
    expect(component._initQueryParams.sort).toEqual(
      component['sortMapping'][newSortCode]
    );
    const newPage = 3;
    expect(component._initQueryParams.currentPage).not.toEqual(newPage);
    expect(component._initQueryParams.currentPage).toEqual(0);

    expect(pdfInvoicesFacade.getInvoicesForOrder).toHaveBeenCalledWith({
      ...component._initQueryParams,
      sort: component['sortMapping'][newSortCode],
      currentPage: 0,
      fields: InvoicesFields.DEFAULT,
    });
  });

  it('Should populate sort options with translations', () => {
    // By default there are 8 sort options
    expect(component.sortOptions?.length).toEqual(8);

    // Expect that translate was called for each of the sort Mappings
    expect(component.sortOptions?.length).toEqual(8);
    // Expect that the length of sortOptions is 2
    expect(translationService['translate']).toHaveBeenCalledTimes(8);
    // Expect that names have been assigned
    component.sortOptions.forEach((sort) => {
      expect(sort?.code && component['sortMapping'][sort?.code]).not.toBeNull();
      expect(sort.name).toEqual('test');
    });
  });

  it('Should have table headers', () => {
    const tableElement = fixture.debugElement.query(
      By.css('.cx-invoices-list-table')
    );

    const tableHeaders = tableElement.queryAll(By.css('th'));
    expect(tableHeaders?.length).toEqual(5);
    expect(tableHeaders[0].properties.innerText).toEqual(
      'pdfInvoices.invoicesTable.invoiceId'
    );
    expect(tableHeaders[1].properties.innerText).toEqual(
      'pdfInvoices.invoicesTable.createdAt'
    );
    expect(tableHeaders[2].properties.innerText).toEqual(
      'pdfInvoices.invoicesTable.netAmount'
    );
    expect(tableHeaders[3].properties.innerText).toEqual(
      'pdfInvoices.invoicesTable.totalAmount'
    );
    expect(tableHeaders[4].children[0].attributes.title).toEqual(
      'pdfInvoices.invoicesTable.attachment'
    );
  });

  it('Should have populated table data', () => {
    const isDate = (formattedDate: string): boolean =>
      /[a-zA-Z]+ \d{1,2}, \d{4}/gm.test(formattedDate);

    const tableElement = fixture.debugElement.query(
      By.css('.cx-invoices-list-table')
    );

    const tableRows = tableElement.queryAll(By.css('tr'));
    expect(tableRows?.length).toEqual(5);

    tableRows?.forEach((row, rowNumber) => {
      const tableCells = row.queryAll(By.css('.cx-invoices-list-value'));

      expect(tableCells?.length).toEqual(5);

      expect(tableCells[0].nativeElement.innerText).toEqual(
        mockOrderInvoiceList.invoices?.[rowNumber]?.invoiceId
      );

      expect(isDate(tableCells[1].nativeElement.innerText)).toEqual(
        !!mockOrderInvoiceList.invoices?.[rowNumber]?.createdAt
      );

      if (
        mockOrderInvoiceList.invoices?.[rowNumber]?.netAmount?.formattedValue
      ) {
        expect(tableCells[2].nativeElement.innerText).toEqual(
          mockOrderInvoiceList.invoices?.[rowNumber]?.netAmount?.formattedValue
        );
      } else {
        expect(tableCells[2].nativeElement.innerHTML).toEqual(
          ` ${mockOrderInvoiceList.invoices?.[rowNumber]?.netAmount?.currencyIso}&nbsp;${mockOrderInvoiceList.invoices?.[rowNumber]?.netAmount?.value} `
        );
      }

      if (
        mockOrderInvoiceList.invoices?.[rowNumber]?.totalAmount?.formattedValue
      ) {
        expect(tableCells[3].nativeElement.innerText).toEqual(
          mockOrderInvoiceList.invoices?.[rowNumber]?.totalAmount
            ?.formattedValue
        );
      } else {
        expect(tableCells[3].nativeElement.innerHTML).toEqual(
          ` ${mockOrderInvoiceList.invoices?.[rowNumber]?.totalAmount?.currencyIso}&nbsp;${mockOrderInvoiceList.invoices?.[rowNumber]?.totalAmount?.value} `
        );
      }

      expect(!!tableCells[4].query(By.css('cx-icon'))).toEqual(
        !!mockOrderInvoiceList.invoices?.[rowNumber]
      );
    });
  });

  it('should download the invoice file', async () => {
    const invoicePDF = (mockOrderInvoiceList.invoices &&
      mockOrderInvoiceList.invoices[0]) || {
      invoiceId: '',
      externalSystemId: '',
    };

    spyOn(pdfInvoicesFacade, 'getInvoicePDF').and.returnValue(of(blob));
    const fakeUrl = 'blob:http://localhost:4321/15-09-2023-1234';
    spyOn(URL, 'createObjectURL').and.returnValue(fakeUrl);

    expect(invoicePDF).not.toBeUndefined();
    component.downloadPDFInvoice(
      invoicePDF.invoiceId || '',
      invoicePDF.externalSystemId
    );
    fixture.detectChanges();

    expect(pdfInvoicesFacade.getInvoicePDF).toHaveBeenCalledWith(
      invoicePDF.invoiceId,
      undefined
    );

    expect(downloadService.download).toHaveBeenCalledWith(
      fakeUrl,
      `${invoicePDF.invoiceId}.pdf`
    );
  });

  it('should download the attachment file with external system id', async () => {
    const invoicePDF = (mockOrderInvoiceList.invoices &&
      mockOrderInvoiceList.invoices[0]) || {
      invoiceId: '',
      externalSystemId: '',
    };

    spyOn(pdfInvoicesFacade, 'getInvoicePDF').and.returnValue(of(blob));
    const fakeUrl = 'blob:http://localhost:4321/15-09-2023-1234';
    spyOn(URL, 'createObjectURL').and.returnValue(fakeUrl);

    component.downloadPDFInvoice(
      invoicePDF.invoiceId || '',
      invoicePDF.externalSystemId
    );
    fixture.detectChanges();

    expect(pdfInvoicesFacade.getInvoicePDF).toHaveBeenCalledWith(
      invoicePDF.invoiceId,
      invoicePDF.externalSystemId
    );

    expect(downloadService.download).toHaveBeenCalledWith(
      fakeUrl,
      `${invoicePDF.invoiceId}.pdf`
    );
  });
});
