import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Cart,
  ConverterService,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        setCartCostCenter:
          'users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};
const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

describe('OccCheckoutCostCenterAdapter', () => {
  let service: OccCheckoutCostCenterAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutCostCenterAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutCostCenterAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('setCostCenter', () => {
    it('should set cost center cart', () => {
      const costCenterId = 'testCostCenterId';

      service
        .setCostCenter(userId, cartId, costCenterId)
        .subscribe((result) => {
          expect(result).toEqual(cartData);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT&costCenterId=${costCenterId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });
});
