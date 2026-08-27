import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
  OrderInvoiceList,
} from '@spartacus/pdf-invoices/root';
import { firstValueFrom, throwError } from 'rxjs';
import { vi } from 'vitest';
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
      providers: [
        OccPDFInvoicesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
    it(`should show PDF Invoices for given user id, order id`, async () => {
      const resultPromise = firstValueFrom(
        occPDFInvoicesAdapter.getInvoicesForOrder(
          mockUserId,
          mockOrderId,
          mockInvoiceQueryParams
        )
      );

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

      const result = await resultPromise;
      expect(result).toEqual(mockInvoicesList);
    });

    it(`should result in error when Error is thrown`, async () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(
        throwError(mockNoOrderIdBadRequestResponse)
      );

      let result: HttpErrorModel | undefined;
      await firstValueFrom(
        occPDFInvoicesAdapter.getInvoicesForOrder(
          mockUserId,
          mockOrderId,
          mockInvoiceQueryParams
        )
      ).catch((err: any) => {
        result = err;
      });

      expect(result).toEqual(
        tryNormalizeHttpError(
          mockNoOrderIdBadRequestResponse,
          new MockLoggerService()
        )
      );
    });
  });

  describe(`get invoice PDF for an invoice id`, () => {
    const mockFile: File = new File([], 'MockOrderInvoice', {
      type: 'application/pdf',
    });
    it(`should download PDF Invoices for given user id, order id`, async () => {
      const resultPromise = firstValueFrom(
        occPDFInvoicesAdapter.getInvoicePDF(
          mockUserId,
          mockOrderId,
          mockInvoiceId
        )
      );

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

      const result = await resultPromise;
      expect(result).toEqual(mockFile);
    });

    it(`should download PDF Invoices for given user id, order id and external system id`, async () => {
      const resultPromise = firstValueFrom(
        occPDFInvoicesAdapter.getInvoicePDF(
          mockUserId,
          mockOrderId,
          mockInvoiceId,
          mockExternalSystemId
        )
      );

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

      const result = await resultPromise;
      expect(result).toEqual(mockFile);
    });

    it(`should result in error when Invoice download Error is thrown`, async () => {
      vi.spyOn(httpClient, 'get').mockReturnValue(
        throwError(mockDownloadPDFBadRequestResponse)
      );

      let result: HttpErrorModel | undefined;
      await firstValueFrom(
        occPDFInvoicesAdapter.getInvoicePDF(
          mockUserId,
          mockOrderId,
          mockInvoiceId,
          mockExternalSystemId
        )
      ).catch((err: any) => {
        result = err;
      });

      expect(result).toEqual(
        tryNormalizeHttpError(
          mockDownloadPDFBadRequestResponse,
          new MockLoggerService()
        )
      );
    });
  });
});
