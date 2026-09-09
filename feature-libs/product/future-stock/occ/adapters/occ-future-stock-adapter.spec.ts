import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccConfig } from '@spartacus/core';
import {
  FUTURE_STOCK_LIST_NORMALIZER,
  FUTURE_STOCK_NORMALIZER,
  ProductFutureStock,
  ProductFutureStockList,
} from '@spartacus/product/future-stock/core';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccFutureStockAdapter } from './occ-future-stock.adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { vi } from 'vitest';

const userId = '111111';
const productCode = 'code';

const futureStockMock: ProductFutureStock = {
  futureStocks: [
    {
      date: new Date(),
      formattedDate: '31/12/2056',
      stock: {
        isValueRounded: false,
        stockLevel: 25,
        stockLevelStatus: 'inStock',
      },
    },
  ],
  productCode: '3318057',
};

const futureStockListMock: ProductFutureStockList = {
  productFutureStocks: [
    {
      date: new Date(),
      formattedDate: '31/12/2056',
      stock: {
        isValueRounded: false,
        stockLevel: 25,
        stockLevelStatus: 'inStock',
      },
    },
    {
      date: new Date(),
      formattedDate: '31/11/2016',
      stock: {
        isValueRounded: true,
        stockLevel: 15,
        stockLevelStatus: 'inStock',
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
        product: {
          getFutureStock: '/users/${userId}/futureStocks/${productCode}',
          getFutureStocks: '/users/${userId}/futureStocks',
        },
      },
    },
  },
};

describe('OccFutureStockAdapter', () => {
  let service: OccFutureStockAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccFutureStockAdapter,
        {
          provide: OccConfig,
          useValue: MockOccModuleConfig,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OccFutureStockAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    vi.spyOn(converter, 'pipeable');
    vi.spyOn(converter, 'pipeableMany');
    vi.spyOn(converter, 'convert');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getFutureStock()', () => {
    it(' should return future stock', async () => {
      let result: any;
      service
        .getFutureStock(userId, productCode)
        .pipe(take(1))
        .subscribe((r) => {
          result = r;
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(futureStockMock);
      expect(result).toEqual(futureStockMock);
      expect(converter.pipeable).toHaveBeenCalledWith(FUTURE_STOCK_NORMALIZER);
    });

    it('should throw error', async () => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Error message';

      let caughtStatus: number;
      service
        .getFutureStock(userId, productCode)
        .pipe(take(1))
        .subscribe({
          error: (err) => {
            caughtStatus = err.status;
          },
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(data, mockErrorResponse);
      expect(caughtStatus).toEqual(mockErrorResponse.status);
    });
  });

  describe('getFutureStocks()', () => {
    it('should return future stocks', async () => {
      let result: any;
      service
        .getFutureStocks(userId, productCode)
        .pipe(take(1))
        .subscribe((r) => {
          result = r;
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(futureStockListMock);
      expect(result).toEqual(futureStockListMock);
      expect(converter.pipeable).toHaveBeenCalledWith(
        FUTURE_STOCK_LIST_NORMALIZER
      );
    });

    it('should throw error', async () => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Error message';

      let caughtStatus: number;
      service
        .getFutureStocks(userId, productCode)
        .pipe(take(1))
        .subscribe({
          error: (err) => {
            caughtStatus = err.status;
          },
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(data, mockErrorResponse);
      expect(caughtStatus).toEqual(mockErrorResponse.status);
    });
  });
});
