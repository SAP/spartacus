import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccConfig } from '@spartacus/core';
import {
  FUTURE_STOCK_LIST_NORMALIZER,
  FUTURE_STOCK_NORMALIZER,
  ProductFutureStock,
  ProductFutureStockList,
} from '@spartacus/product/future-stock/core';
import { take } from 'rxjs/operators';
import { OccFutureStockAdapter } from './occ-future-stock.adapter';

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
      imports: [HttpClientTestingModule],
      providers: [
        OccFutureStockAdapter,
        {
          provide: OccConfig,
          useValue: MockOccModuleConfig,
        },
      ],
    });

    service = TestBed.inject(OccFutureStockAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getFutureStock()', () => {
    it(' should return future stock', (done) => {
      service
        .getFutureStock(userId, productCode)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(futureStockMock);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(futureStockMock);
      expect(converter.pipeable).toHaveBeenCalledWith(FUTURE_STOCK_NORMALIZER);
    });

    it('should throw error', (done) => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Error message';

      service
        .getFutureStock(userId, productCode)
        .pipe(take(1))
        .subscribe({
          error: (err) => {
            expect(err.status).toEqual(mockErrorResponse.status);
            done();
          },
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(data, mockErrorResponse);
    });
  });

  describe('getFutureStocks()', () => {
    it('should return future stocks', (done) => {
      service
        .getFutureStocks(userId, productCode)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(futureStockListMock);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(futureStockListMock);
      expect(converter.pipeable).toHaveBeenCalledWith(
        FUTURE_STOCK_LIST_NORMALIZER
      );
    });

    it('should throw error', (done) => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Error message';

      service
        .getFutureStocks(userId, productCode)
        .pipe(take(1))
        .subscribe({
          error: (err) => {
            expect(err.status).toEqual(mockErrorResponse.status);
            done();
          },
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(data, mockErrorResponse);
    });
  });
});
