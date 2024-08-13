import {
  HttpClientModule,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OCC_USER_ID_ANONYMOUS,
  OccConfig,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccOmfOrderHistoryAdapter } from './occ-omf-order-history.adapter';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { OmfConfig } from './config/omf-config';
import { OrderSelectors } from '@spartacus/order/core';
const userId = '123';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
  guid: 'guid_01',
};
const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
  get queryParams() {
    return of({ guid: orderData.guid });
  },
};

const mockOrderState = {
  value: { orders: [orderData] },
};

const mockConfig: OmfConfig = {
  omf: {
    guidHttpHeaderName: 'my-guid-header',
  },
};

describe('OccOmfOrderHistoryAdapter', () => {
  let adapter: OccOmfOrderHistoryAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        LoggerService,
        OccOmfOrderHistoryAdapter,
        { provide: OmfConfig, useValue: mockConfig },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    adapter = TestBed.inject(OccOmfOrderHistoryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    store = TestBed.inject(Store);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadOrder', () => {
    it('should fetch a single order with guid passed in API request header for logged in user', waitForAsync(() => {
      spyOn(adapter, 'getOrderGuid').and.returnValue(of(orderData.guid));
      spyOn(adapter, 'getRequestHeader').and.returnValue(
        new HttpHeaders().set('Custom-Guid-Header', orderData.guid ?? '')
      );
      spyOn(InterceptorUtil, 'createHeader').withArgs(
        USE_CLIENT_TOKEN,
        true,
        jasmine.anything()
      );
      adapter.load(userId, orderData.code ?? '').subscribe();
      const request = httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET a single order`);
      expect(request.request.headers.has('Custom-Guid-Header')).toBe(true);
      expect(request.request.headers.get('Custom-Guid-Header')).toEqual(
        orderData.guid
      );
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('orderDetail', {
        urlParams: { userId, orderId: orderData.code },
      });
      expect(InterceptorUtil.createHeader).not.toHaveBeenCalledWith(
        USE_CLIENT_TOKEN,
        true,
        jasmine.anything()
      );
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
      request.flush(orderData);
      httpMock.verify();
    }));
    it('should fetch a single order with guid passed in API request header for anonymous user', waitForAsync(() => {
      spyOn(adapter, 'getOrderGuid').and.returnValue(of(orderData.guid));
      spyOn(adapter, 'getRequestHeader').and.returnValue(
        new HttpHeaders().set('Custom-Guid-Header', orderData.guid ?? '')
      );
      spyOn(InterceptorUtil, 'createHeader')
        .withArgs(USE_CLIENT_TOKEN, true, jasmine.anything())
        .and.callThrough();
      adapter.load(OCC_USER_ID_ANONYMOUS, orderData.code ?? '').subscribe();
      const request = httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET a single order`);
      expect(request.request.headers.has('Custom-Guid-Header')).toBe(true);
      expect(request.request.headers.get('Custom-Guid-Header')).toEqual(
        orderData.guid
      );
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('orderDetail', {
        urlParams: { userId: OCC_USER_ID_ANONYMOUS, orderId: orderData.code },
      });
      expect(InterceptorUtil.createHeader).toHaveBeenCalledWith(
        USE_CLIENT_TOKEN,
        true,
        jasmine.anything()
      );
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
      request.flush(orderData);
      httpMock.verify();
    }));
  });
  describe('getRequestHeader', () => {
    it('should construct a request header with guid', () => {
      const header = adapter.getRequestHeader(orderData.guid);
      expect(header.has('my-guid-header')).toBe(true);
      expect(header.get('my-guid-header')).toEqual(orderData.guid);
    });
  });
  describe('getOrderGuid', () => {
    it('should return guid from route query params', (done) => {
      adapter.getOrderGuid(orderData.code ?? '').subscribe((guid) => {
        expect(guid).toEqual(orderData.guid);
        done();
      });
    });
    it('should return guid from store', (done) => {
      spyOnProperty(mockActivatedRoute, 'queryParams', 'get').and.returnValue(
        of({ guid: null })
      );
      spyOn(store, 'select').and.callFake((selector: any) => {
        if (selector === OrderSelectors.getOrdersState) {
          return of(mockOrderState);
        }
        return of(null);
      });
      adapter.getOrderGuid(orderData.code ?? '').subscribe((guid) => {
        expect(guid).toEqual(orderData.guid);
        done();
      });
    });
    it('should return undefined from store if order is not present in store', (done) => {
      spyOnProperty(mockActivatedRoute, 'queryParams', 'get').and.returnValue(
        of({ guid: null })
      );
      spyOn(store, 'select').and.callFake((selector: any) => {
        if (selector === OrderSelectors.getOrdersState) {
          return of({ value: { orders: [orderData] } });
        }
        return of(null);
      });
      adapter.getOrderGuid('guid_02').subscribe((guid) => {
        expect(guid).toEqual(undefined);
        done();
      });
    });
    it('should return undefined from store if store is empty', (done) => {
      spyOnProperty(mockActivatedRoute, 'queryParams', 'get').and.returnValue(
        of({ guid: null })
      );
      spyOn(store, 'select').and.callFake((selector: any) => {
        if (selector === OrderSelectors.getOrdersState) {
          return of({ value: {} });
        }
        return of(null);
      });
      adapter.getOrderGuid('guid_02').subscribe((guid) => {
        expect(guid).toEqual(undefined);
        done();
      });
    });
  });
});
