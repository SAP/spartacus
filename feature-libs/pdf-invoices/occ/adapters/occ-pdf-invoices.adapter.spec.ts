import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  normalizeHttpError,
} from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
  OrderInvoiceList,
} from '@spartacus/pdf-invoices/root';
import { throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccPDFInvoicesAdapter } from './occ-pdf-invoices.adapter';

const mockUserId = 'userId1';
const mockOrderId = '15092023';
const mockExternalSystemId = 'IMPERIAL';
const mockInvoiceId = 'Invoice-15-09-2023';
const mockInvoiceQueryParams: InvoiceQueryParams = {
  currentPage: 0,
  pageSize: 10,
  sort: 'invoiceID:asc',
  fields: InvoicesFields.FULL,
};

const mockInvoicesList: OrderInvoiceList = {
  invoices: [
    {
      invoiceId: '123',
      externalSystemId: mockExternalSystemId,
      createdAt: new Date(),
      netAmount: {
        currencyIso: 'USD',
        value: 123,
      },
      totalAmount: {
        currencyIso: 'USD',
        value: 123,
      },
    },
  ],
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        pdfInvoicesListInvoices: 'users/${userId}/orders/${orderId}/invoices',
        pdfInvoicesDownloadInvoicePDF:
          'users/${userId}/orders/${orderId}/invoices/${invoiceId}/download',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const mockNoOrderIdBadRequestResponse = new HttpErrorResponse({
  error: {
    errors: [
      {
        message:
          'Order with guid [15092023] not found for current user in current BaseStore',
        type: 'UnknownIdentifierError',
      },
    ],
  },
});

const mockDownloadPDFBadRequestResponse = new HttpErrorResponse({
  error: {
    errors: [
      {
        message: 'Invoice with id [Imperial] not found for order [15092023]',
        type: 'UnknownIdentifierError',
      },
    ],
  },
});

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('OccPDFInvoicesAdapter', () => {
  let occPDFInvoicesAdapter: OccPDFInvoicesAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccPDFInvoicesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    occPDFInvoicesAdapter = TestBed.inject(OccPDFInvoicesAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(occPDFInvoicesAdapter).toBeTruthy();
  });

  describe(`get invoices for an order`, () => {
    it(`should show PDF Invoices for given user id, order id`, (done) => {
      occPDFInvoicesAdapter
        .getInvoicesForOrder(mockUserId, mockOrderId, mockInvoiceQueryParams)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockInvoicesList);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockUserId}/orders/${mockOrderId}/invoices?currentPage=${
              mockInvoiceQueryParams.currentPage
            }&pageSize=${
              mockInvoiceQueryParams.pageSize
            }&sort=${encodeURIComponent(mockInvoiceQueryParams.sort)}&fields=${
              mockInvoiceQueryParams.fields
            }`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(mockInvoicesList);
      expect(mockReq.request.responseType).toEqual('json');
    });

    it(`should result in error when Error is thrown`, (done) => {
      spyOn(httpClient, 'get').and.returnValue(
        throwError(mockNoOrderIdBadRequestResponse)
      );

      let result: HttpErrorModel | undefined;
      const subscription = occPDFInvoicesAdapter
        .getInvoicesForOrder(mockUserId, mockOrderId, mockInvoiceQueryParams)
        .pipe(take(1))
        .subscribe({
          error: (err: any) => {
            result = err;
            done();
          },
        });

      expect(result).toEqual(
        normalizeHttpError(
          mockNoOrderIdBadRequestResponse,
          new MockLoggerService()
        )
      );

      subscription.unsubscribe();
    });
  });

  describe(`get invoice PDF for an invoice id`, () => {
    const mockFile: File = new File([], 'MockOrderInvoice', {
      type: 'application/pdf',
    });
    it(`should download PDF Invoices for given user id, order id`, (done) => {
      occPDFInvoicesAdapter
        .getInvoicePDF(mockUserId, mockOrderId, mockInvoiceId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockFile);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockUserId}/orders/${mockOrderId}/invoices/${mockInvoiceId}/download`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('blob');
      mockReq.flush(mockFile);
    });

    it(`should download PDF Invoices for given user id, order id and external system id`, (done) => {
      occPDFInvoicesAdapter
        .getInvoicePDF(
          mockUserId,
          mockOrderId,
          mockInvoiceId,
          mockExternalSystemId
        )
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockFile);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockUserId}/orders/${mockOrderId}/invoices/${mockInvoiceId}/download?externalSystemId=${mockExternalSystemId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(mockFile);
      expect(mockReq.request.responseType).toEqual('blob');
    });

    it(`should result in error when Invoice download Error is thrown`, (done) => {
      spyOn(httpClient, 'get').and.returnValue(
        throwError(mockDownloadPDFBadRequestResponse)
      );

      let result: HttpErrorModel | undefined;
      const subscription = occPDFInvoicesAdapter
        .getInvoicePDF(
          mockUserId,
          mockOrderId,
          mockInvoiceId,
          mockExternalSystemId
        )
        .pipe(take(1))
        .subscribe({
          error: (err: any) => {
            result = err;
            done();
          },
        });

      expect(result).toEqual(
        normalizeHttpError(
          mockDownloadPDFBadRequestResponse,
          new MockLoggerService()
        )
      );

      subscription.unsubscribe();
    });
  });
});
