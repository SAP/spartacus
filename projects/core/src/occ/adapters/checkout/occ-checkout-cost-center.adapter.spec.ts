import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, Cart } from '@spartacus/core';
import { OccConfig } from '../../index';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';

const MockOccModuleConfig: OccConfig = {
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
const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';

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
    service = TestBed.inject(
      OccCheckoutCostCenterAdapter as Type<OccCheckoutCostCenterAdapter>
    );
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    converter = TestBed.inject(ConverterService as Type<ConverterService>);

    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('setCostCenter', () => {
    it('should set cost center cart', () => {
      const costCenterId = 'testCostCenterId';

      let result;
      service
        .setCostCenter(userId, cartId, costCenterId)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/costcenter'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('costCenterId')).toEqual(costCenterId);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
