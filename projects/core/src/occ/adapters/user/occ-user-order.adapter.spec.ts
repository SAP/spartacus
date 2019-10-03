import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ConverterService, OccUserOrderAdapter } from '@spartacus/core';
import { FeatureConfigService } from 'projects/core/src/features-config';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { Order } from '../../../model/order.model';
import {
  ORDER_HISTORY_NORMALIZER,
  CONSIGNMENT_TRACKING_NORMALIZER,
} from '../../../user/connectors/order/converters';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from './unit-test.helper';

const userId = '123';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
};
const consignmentCode = 'a00001004';

class MockFeatureConfigService {
  isLevel(_featureLevel: string): boolean {
    return true;
  }
}

// Deprecated as of 1.1
const usersEndpoint = '/users';
const orderEndpoint = '/orders';

describe('OccUserOrderAdapter', () => {
  let occUserOrderAdapter: OccUserOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserOrderAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    occUserOrderAdapter = TestBed.get(OccUserOrderAdapter as Type<
      OccUserOrderAdapter
    >);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    converter = TestBed.get(ConverterService as Type<ConverterService>);
    occEnpointsService = TestBed.get(OccEndpointsService as Type<
      OccEndpointsService
    >);
    featureConfigService = TestBed.get(FeatureConfigService as Type<
      FeatureConfigService
    >);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserOrders', () => {
    it('should fetch user Orders with default options', async(() => {
      const PAGE_SIZE = 5;
      occUserOrderAdapter.loadHistory(userId, PAGE_SIZE).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET method and url`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'orderHistory',
        {
          userId,
        },
        { pageSize: PAGE_SIZE.toString() }
      );
    }));

    it('should fetch user Orders with defined options', async(() => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';

      occUserOrderAdapter
        .loadHistory(userId, PAGE_SIZE, currentPage, sort)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET method`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'orderHistory',
        {
          userId,
        },
        {
          pageSize: PAGE_SIZE.toString(),
          currentPage: currentPage.toString(),
          sort,
        }
      );
    }));

    it('should use converter', () => {
      occUserOrderAdapter.loadHistory(userId).subscribe();
      httpMock
        .expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET';
        }, `GET method`)
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_HISTORY_NORMALIZER);
    });
  });

  describe('getOrder', () => {
    it('should fetch a single order', async(() => {
      occUserOrderAdapter.load(userId, orderData.code).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET a single order`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('orderDetail', {
        userId,
        orderId: orderData.code,
      });
    }));

    it('should use converter', () => {
      occUserOrderAdapter.load(userId, orderData.code).subscribe();
      httpMock.expectOne(req => req.method === 'GET').flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });

  /**
   * @deprecated Since 1.1
   * Remove when legacy code is removed.
   */
  describe('legacy', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(false);
    });
    describe('getUserOrders', () => {
      it('should fetch user Orders with default options', async(() => {
        const PAGE_SIZE = 5;
        occUserOrderAdapter.loadHistory(userId, PAGE_SIZE).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === usersEndpoint + `/${userId}` + orderEndpoint &&
            req.method === 'GET'
          );
        }, `GET method and url`);
      }));

      it('should fetch user Orders with defined options', async(() => {
        const PAGE_SIZE = 5;
        const currentPage = 1;
        const sort = 'byDate';

        occUserOrderAdapter
          .loadHistory(userId, PAGE_SIZE, currentPage, sort)
          .subscribe();
        const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === usersEndpoint + `/${userId}` + orderEndpoint &&
            req.method === 'GET'
          );
        }, `GET method`);

        expect(mockReq.request.params.get('pageSize')).toEqual(
          PAGE_SIZE.toString()
        );
      }));

      it('should use converter', () => {
        occUserOrderAdapter.loadHistory(userId).subscribe();
        httpMock
          .expectOne((req: HttpRequest<any>) => {
            return req.method === 'GET';
          }, `GET method`)
          .flush({});
        expect(converter.pipeable).toHaveBeenCalledWith(
          ORDER_HISTORY_NORMALIZER
        );
      });
    });

    describe('getOrder', () => {
      it('should fetch a single order', async(() => {
        occUserOrderAdapter.load(userId, orderData.code).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url ===
              usersEndpoint +
                `/${userId}` +
                orderEndpoint +
                '/' +
                orderData.code && req.method === 'GET'
          );
        }, `GET a single order`);
      }));

      it('should use converter', () => {
        occUserOrderAdapter.load(userId, orderData.code).subscribe();
        httpMock.expectOne(req => req.method === 'GET').flush({});
        expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
      });
    });
    describe('getConsignmentTracking', () => {
      it('should fetch a consignment tracking', async(() => {
        const tracking: ConsignmentTracking = {
          trackingID: '1234567890',
          trackingEvents: [],
        };
        occUserOrderAdapter
          .getConsignmentTracking(orderData.code, consignmentCode)
          .subscribe(result => expect(result).toEqual(tracking));
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'GET';
        }, `GET a consignment tracking`);
        expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
          'consignmentTracking',
          {
            orderCode: orderData.code,
            consignmentCode: consignmentCode,
          }
        );
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(tracking);
      }));

      it('should use converter', () => {
        occUserOrderAdapter
          .getConsignmentTracking(orderData.code, consignmentCode)
          .subscribe();
        httpMock
          .expectOne(req => {
            return req.method === 'GET';
          })
          .flush({});
        expect(converter.pipeable).toHaveBeenCalledWith(
          CONSIGNMENT_TRACKING_NORMALIZER
        );
      });
    });
  });
});
