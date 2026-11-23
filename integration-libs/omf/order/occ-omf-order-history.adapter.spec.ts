import {
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OCC_USER_ID_ANONYMOUS,
  OccConfig,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { OrderSelectors } from '@spartacus/order/core';
import { Order, ORDER_NORMALIZER, OrderConfig } from '@spartacus/order/root';
import { firstValueFrom, of } from 'rxjs';
import { OmfConfig } from './config/omf-config';
import { OccOmfOrderHistoryAdapter } from './occ-omf-order-history.adapter';

const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
  context: {
    baseSite: [''],
  },
};

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl(endpointKey: string) {
    if (!endpointKey.startsWith('/')) {
      endpointKey = '/' + endpointKey;
    }
    return endpointKey;
  }
  getBaseUrl() {
    return '';
  }
  isConfigured() {
    return true;
  }
}

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

const mockOrderConfig = {
  get showOrderQuoteLink() {
    return false;
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
      imports: [StoreModule.forRoot({})],
      providers: [
        LoggerService,
        OccOmfOrderHistoryAdapter,
        { provide: OmfConfig, useValue: mockConfig },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: OrderConfig, useValue: mockOrderConfig },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccOmfOrderHistoryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    store = TestBed.inject(Store);
    vi.spyOn(converter, 'pipeable');
    vi.spyOn(converter, 'convert');
    vi.spyOn(occEnpointsService, 'buildUrl');
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  describe('loadOrder', () => {
    it('should fetch a single order with guid passed in API request header for logged in user', async () => {
      vi.spyOn(adapter, 'getOrderGuid').mockReturnValue(of(orderData.guid));
      vi.spyOn(adapter, 'getRequestHeader').mockReturnValue(
        new HttpHeaders().set('Custom-Guid-Header', orderData.guid ?? '')
      );
      vi.spyOn(InterceptorUtil, 'createHeader');
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
        expect.anything()
      );
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
      request.flush(orderData);
      httpMock.verify();
    });
    it('should fetch a single order with guid passed in API request header for anonymous user', async () => {
      vi.spyOn(adapter, 'getOrderGuid').mockReturnValue(of(orderData.guid));
      vi.spyOn(adapter, 'getRequestHeader').mockReturnValue(
        new HttpHeaders().set('Custom-Guid-Header', orderData.guid ?? '')
      );
      vi.spyOn(InterceptorUtil, 'createHeader');
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
        expect.anything()
      );
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
      request.flush(orderData);
      httpMock.verify();
    });

    it('should fetch a single order with quote code when showOrderQuoteLink is true', async () => {
      vi.spyOn(mockOrderConfig, 'showOrderQuoteLink', 'get').mockReturnValue(
        true
      );
      adapter.load(userId, orderData.code ?? '').subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET a single order`);
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('orderDetail', {
        urlParams: { userId, orderId: orderData.code },
      });
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('quoteCode', {
        urlParams: { userId, orderId: orderData.code },
      });
    });
    describe('getRequestHeader', () => {
      it('should construct a request header with guid', () => {
        const header = adapter.getRequestHeader(orderData.guid);
        expect(header.has('my-guid-header')).toBe(true);
        expect(header.get('my-guid-header')).toEqual(orderData.guid);
      });

      it('should return empty headers when guid is undefined', () => {
        const header = adapter.getRequestHeader(undefined);
        expect(header.has('my-guid-header')).toBe(false);
      });
    });

    describe('getOrderGuid', () => {
      it('should return guid from route query params', async () => {
        const guid = await firstValueFrom(
          adapter.getOrderGuid(orderData.code ?? '')
        );
        expect(guid).toEqual(orderData.guid);
      });
      it('should return guid from store', async () => {
        vi.spyOn(mockActivatedRoute, 'queryParams', 'get').mockReturnValue(
          of({ guid: null })
        );
        vi.spyOn(store, 'select').mockImplementation((selector: any) => {
          if (selector === OrderSelectors.getOrdersState) {
            return of(mockOrderState);
          }
          return of(null);
        });
        const guid = await firstValueFrom(
          adapter.getOrderGuid(orderData.code ?? '')
        );
        expect(guid).toEqual(orderData.guid);
      });
      it('should return undefined from store if order is not present in store', async () => {
        vi.spyOn(mockActivatedRoute, 'queryParams', 'get').mockReturnValue(
          of({ guid: null })
        );
        vi.spyOn(store, 'select').mockImplementation((selector: any) => {
          if (selector === OrderSelectors.getOrdersState) {
            return of({ value: { orders: [orderData] } });
          }
          return of(null);
        });
        const guid = await firstValueFrom(adapter.getOrderGuid('guid_02'));
        expect(guid).toEqual(undefined);
      });
      it('should return undefined from store if store is empty', async () => {
        vi.spyOn(mockActivatedRoute, 'queryParams', 'get').mockReturnValue(
          of({ guid: null })
        );
        vi.spyOn(store, 'select').mockImplementation((selector: any) => {
          if (selector === OrderSelectors.getOrdersState) {
            return of({ value: {} });
          }
          return of(null);
        });
        const guid = await firstValueFrom(adapter.getOrderGuid('guid_02'));
        expect(guid).toEqual(undefined);
      });
    });
  });
});

describe('OccOmfOrderHistoryAdapter - unconfigured guidHttpHeaderName', () => {
  let adapter: OccOmfOrderHistoryAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        LoggerService,
        OccOmfOrderHistoryAdapter,
        { provide: OmfConfig, useValue: { omf: {} } },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: OrderConfig, useValue: mockOrderConfig },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(OccOmfOrderHistoryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('should return empty headers when guidHttpHeaderName is not configured', () => {
    const header = adapter.getRequestHeader('some-guid');
    expect(header.keys()).toEqual([]);
  });
});
