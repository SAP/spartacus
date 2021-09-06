import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CART_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccSavedCartAdapter } from './occ-saved-cart.adapter';

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const mockCartName = 'test-cart-name';
const mockCartDescription = 'test-cart-description';
const mockSavedCartResult = {
  savedCartData: {
    name: mockCartName,
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
    description: mockCartDescription,
  },
};
const mockSavedCartList = {
  carts: [
    {
      ...mockSavedCartResult.savedCartData,
    },
  ],
};

describe('OccSavedCartAdapter', () => {
  let adapter: OccSavedCartAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSavedCartAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    adapter = TestBed.inject(OccSavedCartAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('should load a single cart from savedCart endpoint', () => {
    it('should load saved cart details for given cart code', () => {
      adapter
        .load(mockUserId, mockCartId)
        .subscribe((data) =>
          expect(data).toEqual(mockSavedCartResult.savedCartData)
        );

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === `/savedCart`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockSavedCartResult);
      expect(converterService.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });

  describe('should load a list of carts from savedCarts endpoint', () => {
    it('should load a list of saved carts', () => {
      adapter
        .loadList(mockUserId)
        .subscribe((data) => expect(data).toEqual(mockSavedCartList.carts));

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === `/savedCarts`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockSavedCartList);
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        CART_NORMALIZER
      );
    });
  });

  describe('should restore a saved cart  from restoreSavedCart endpoint', () => {
    it('should restore a saved cart', () => {
      adapter
        .restoreSavedCart(mockUserId, mockCartId)
        .subscribe((data) =>
          expect(data).toEqual(mockSavedCartResult.savedCartData)
        );

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'PATCH' && req.url === `/restoreSavedCart`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockSavedCartResult);
      expect(converterService.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });

  describe('should save a cart from saveCart endpoint', () => {
    it('should save a cart', () => {
      adapter
        .saveCart(mockUserId, mockCartId, mockCartName, mockCartDescription)
        .subscribe((data) =>
          expect(data).toEqual(mockSavedCartResult.savedCartData)
        );

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'PATCH' && req.url === `/saveCart`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockSavedCartResult);
      expect(converterService.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });

  describe('should clone a saved cart from cloneSavedCart endpoint', () => {
    it('should clone a saved cart', () => {
      adapter
        .cloneSavedCart(mockUserId, mockCartId, mockCartName)
        .subscribe((data) =>
          expect(data).toEqual(mockSavedCartResult.savedCartData)
        );

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === `/cloneSavedCart`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockSavedCartResult);
      expect(converterService.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });
});
