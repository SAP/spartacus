import { TestBed } from '@angular/core/testing';
import { OppsConfig } from 'integration-libs/opps/root/config/opps-config';
import { WindowRef } from 'projects/core/src/window';
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
      spyOnProperty(winRef, 'location').and.returnValue(mockLocation);
      service.saveUrlCouponCodes();
      expect(service.getCouponCodes()).toEqual('summer');
    });
    it('should set/get coupon codes to/from local storage', () => {
      spyOn(winRef.localStorage, 'setItem').and.callThrough();
      spyOn(winRef.localStorage, 'getItem').and.callThrough();
      service.setCouponCodes('black,pink');
      expect(service.getCouponCodes()).toEqual('black,pink');
      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'test-key',
        'black,pink'
      );
      expect(winRef.localStorage?.getItem).toHaveBeenCalledWith('test-key');
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
      spyOn(service, 'setCouponCodes').and.callThrough();
      spyOnProperty(winRef, 'location').and.returnValue(mockLocation);
      service.saveUrlCouponCodes();
      expect(service.setCouponCodes).not.toHaveBeenCalled();
    });
    it('should not set coupon in local storage', () => {
      spyOn(winRef.localStorage, 'setItem').and.callThrough();
      service.setCouponCodes('black,pink');
      expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
    });
    it('should not fetch any coupon from local storage', () => {
      spyOn(winRef.localStorage, 'getItem').and.callThrough();
      service.getCouponCodes();
      expect(winRef.localStorage?.getItem).not.toHaveBeenCalled();
    });
  });
});
