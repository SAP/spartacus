import { TestBed } from '@angular/core/testing';
import { OppsConfig } from '../config/opps-config';
import { WindowRef } from '@spartacus/core';
import { OppsCouponCodesService } from './opps-coupon-codes.service';
const mockLocation = {
  href: 'http://localhost:4200/electronics-spa/en/USD/?test-param=summer',
};
const MockConfig1: OppsConfig = {
  opps: {
    couponcodes: {
      urlParameter: 'test-param',
      localStorageKey: 'test-key',
    },
  },
};
const MockConfig2: OppsConfig = {
  opps: {
    couponcodes: {},
  },
};
describe('OppsCouponCodesService', () => {
  let service: OppsCouponCodesService;
  let winRef: WindowRef;
  describe('if url parameter and local storage key is configured', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: OppsConfig, useValue: MockConfig1 },
          OppsCouponCodesService,
        ],
      });
      service = TestBed.inject(OppsCouponCodesService);
      winRef = TestBed.inject(WindowRef);
    });
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });
    it('should save coupons to local storage', () => {
      vi.spyOn(winRef, 'location', 'get').mockReturnValue(mockLocation as any);
      service.saveUrlCouponCodes();
      expect(service.getCouponCodes()).toEqual('summer');
    });
    it('should set/get coupon codes to/from local storage', () => {
      const mockSetItem = vi.fn();
      const mockGetItem = vi.fn().mockReturnValue('black,pink');
      vi.spyOn(winRef, 'localStorage', 'get').mockReturnValue({
        setItem: mockSetItem,
        getItem: mockGetItem,
      } as any);
      service.setCouponCodes('black,pink');
      expect(service.getCouponCodes()).toEqual('black,pink');
      expect(mockSetItem).toHaveBeenCalledWith('test-key', 'black,pink');
      expect(mockGetItem).toHaveBeenCalledWith('test-key');
    });
  });

  describe('if local storage key and url parameter is not configured', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: OppsConfig, useValue: MockConfig2 },
          OppsCouponCodesService,
        ],
      });
      service = TestBed.inject(OppsCouponCodesService);
      winRef = TestBed.inject(WindowRef);
    });
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });
    it('should not save coupon in url', () => {
      vi.spyOn(service, 'setCouponCodes');
      vi.spyOn(winRef, 'location', 'get').mockReturnValue(mockLocation as any);
      service.saveUrlCouponCodes();
      expect(service.setCouponCodes).not.toHaveBeenCalled();
    });
    it('should not set coupon in local storage', () => {
      const mockSetItem = vi.fn();
      vi.spyOn(winRef, 'localStorage', 'get').mockReturnValue({
        setItem: mockSetItem,
      } as any);
      service.setCouponCodes('black,pink');
      expect(mockSetItem).not.toHaveBeenCalled();
    });
    it('should not fetch any coupon from local storage', () => {
      const mockGetItem = vi.fn();
      vi.spyOn(winRef, 'localStorage', 'get').mockReturnValue({
        getItem: mockGetItem,
      } as any);
      service.getCouponCodes();
      expect(mockGetItem).not.toHaveBeenCalled();
    });
  });
});
