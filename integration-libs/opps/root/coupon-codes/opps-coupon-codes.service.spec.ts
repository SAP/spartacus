import { TestBed } from '@angular/core/testing';
import { OppsConfig } from 'integration-libs/opps/root/config/opps-config';
import { WindowRef } from 'projects/core/src/window';
import { OppsCouponCodesService } from './opps-coupon-codes.service';
const mockLocation = {
  href: 'http://localhost:4200/electronics-spa/en/USD/?test-param=summer',
};
const MockConfig: OppsConfig = {
  opps: {
    couponcodes: {
      urlParameter: 'test-param',
      localStorageKey: 'test-key',
    },
  },
};
describe('OppsCouponCodesService', () => {
  let service: OppsCouponCodesService;
  let winRef: WindowRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OppsConfig, useValue: MockConfig },
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
  it('should remove coupon codes from local storage', () => {
    spyOn(winRef.localStorage, 'removeItem').and.callThrough();
    service.clearCouponCodes();
    expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith('test-key');
    expect(service.getCouponCodes()).toBeNull();
  });
});
