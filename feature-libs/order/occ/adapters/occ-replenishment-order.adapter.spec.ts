import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  OccConfig,
  OccEndpointsService,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/core';
import {
  ORDER_HISTORY_NORMALIZER,
  REPLENISHMENT_ORDER_HISTORY_NORMALIZER,
} from '@spartacus/order/core';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccReplenishmentOrderAdapter } from './occ-replenishment-order.adapter';

const mockUserId = 'test-user';
const mockReplenishmentOrderCode = 'test-repl-code';
const PAGE_SIZE = 5;
const CURRENT_PAGE = 1;
const SORT = 'test-sort';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [mockReplenishmentOrder],
  pagination: { totalPages: 3 },
  sorts: [{ selected: true }],
};

const mockOrderHistoryList: OrderHistoryList = {
  orders: [
    {
      code: 'test-order-code',
    },
  ],
  pagination: {},
  sorts: [],
};

describe('OccReplenishmentOrderAdapter', () => {
  let occAdapter: OccReplenishmentOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccReplenishmentOrderAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occAdapter = TestBed.inject(OccReplenishmentOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load', () => {
    it('should load replenishment order details', () => {
      occAdapter
        .load(mockUserId, mockReplenishmentOrderCode)
        .subscribe((data) => {
          expect(data).toEqual(mockReplenishmentOrder);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === '/replenishmentOrderDetails';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'replenishmentOrderDetails',
        {
          urlParams: {
            userId: mockUserId,
            replenishmentOrderCode: mockReplenishmentOrderCode,
          },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockReplenishmentOrder);
    });

    it('should use converter', () => {
      occAdapter.load(mockUserId, mockReplenishmentOrderCode).subscribe();

      httpMock
        .expectOne(
          (req) =>
            req.method === 'GET' && req.url === '/replenishmentOrderDetails'
        )
        .flush({});

      expect(converter.pipeable).toHaveBeenCalledWith(
        REPLENISHMENT_ORDER_NORMALIZER
      );
    });
  });

  describe('loadReplenishmentDetailsHistory', () => {
    it('should load replenishment order history for a specific replnishment order details', () => {
      occAdapter
        .loadReplenishmentDetailsHistory(
          mockUserId,
          mockReplenishmentOrderCode,
          PAGE_SIZE,
          CURRENT_PAGE,
          SORT
        )
        .subscribe((data) => {
          expect(data).toEqual(mockOrderHistoryList);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === '/replenishmentOrderDetailsHistory'
        );
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'replenishmentOrderDetailsHistory',
        {
          urlParams: {
            userId: mockUserId,
            replenishmentOrderCode: mockReplenishmentOrderCode,
          },
          queryParams: {
            pageSize: PAGE_SIZE.toString(),
            currentPage: CURRENT_PAGE.toString(),
            sort: SORT,
          },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockOrderHistoryList);
    });

    it('should use converter', () => {
      occAdapter
        .loadReplenishmentDetailsHistory(mockUserId, mockReplenishmentOrderCode)
        .subscribe();

      httpMock
        .expectOne(
          (req) =>
            req.method === 'GET' &&
            req.url === '/replenishmentOrderDetailsHistory'
        )
        .flush({});

      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_HISTORY_NORMALIZER);
    });
  });

  describe('cancelReplenishmentOrder', () => {
    it('should cancel replenishment order details', () => {
      occAdapter
        .cancelReplenishmentOrder(mockUserId, mockReplenishmentOrderCode)
        .subscribe((data) => {
          expect(data).toEqual(mockReplenishmentOrder);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PATCH' && req.url === '/cancelReplenishmentOrder'
        );
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'cancelReplenishmentOrder',
        {
          urlParams: {
            userId: mockUserId,
            replenishmentOrderCode: mockReplenishmentOrderCode,
          },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockReplenishmentOrder);
    });

    it('should use converter', () => {
      occAdapter
        .cancelReplenishmentOrder(mockUserId, mockReplenishmentOrderCode)
        .subscribe();

      httpMock
        .expectOne(
          (req) =>
            req.method === 'PATCH' && req.url === '/cancelReplenishmentOrder'
        )
        .flush({});

      expect(converter.pipeable).toHaveBeenCalledWith(
        REPLENISHMENT_ORDER_NORMALIZER
      );
    });
  });

  describe('loadHistory', () => {
    it('should fetch user Replenishment Orders with defined options', () => {
      occAdapter
        .loadHistory(mockUserId, PAGE_SIZE, CURRENT_PAGE, SORT)
        .subscribe((data) => {
          expect(data).toEqual(mockReplenishmentOrderList);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === '/replenishmentOrderHistory';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'replenishmentOrderHistory',
        {
          urlParams: { userId: mockUserId },
          queryParams: {
            pageSize: PAGE_SIZE.toString(),
            currentPage: CURRENT_PAGE.toString(),
            sort: SORT,
          },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockReplenishmentOrderList);
    });

    it('should use converter', () => {
      occAdapter.loadHistory(mockUserId).subscribe();

      httpMock
        .expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET';
        }, `GET method`)
        .flush({});

      expect(converter.pipeable).toHaveBeenCalledWith(
        REPLENISHMENT_ORDER_HISTORY_NORMALIZER
      );
    });
  });
});
