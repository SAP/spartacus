// import { TestBed } from '@angular/core/testing';
// import { WindowRef } from '@spartacus/core';
// import { OppsCouponCodesService } from './opps-coupon-codes.service';
// import { OppsConfig } from '../public_api';
// const MockWindowRef = {
//   localStorage: {
//     setItem: (_key: string, _value: string) => {},
//     getItem: (_key: string): string => {
//       return 'pink,blue';
//     },
//     removeItem: (_key: string) => {},
//   },
//   isBrowser(): boolean {
//     return true;
//   },
//   location: {
//     href: 'http://localhost:4200/electronics-spa/en/USD/?couponcodes=pink,blue',
//   },
// };
// const MockConfig: OppsConfig = {
//   opps: {
//     couponcodes: {
//       localStorageKey: 'opps-couponcodes',
//       urlParameter: 'couponcodes',
//     },
//   },
// };
// describe('OppsCouponCodesService', () => {
//   let service: OppsCouponCodesService;
//   //let winRef: WindowRef;
//   //let config: OppsConfig;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { WindowRef, useValue: MockWindowRef },
//         { OppsConfig, useValue: MockConfig },
//       ],
//     });
//     service = TestBed.inject(OppsCouponCodesService);
//     //winRef = TestBed.inject(WindowRef);
//     //config = TestBed.inject(OppsConfig);
//   });
//   it('should inject service', () => {
//     expect(service).toBeTruthy();
//   });
//   //   it('should save coupon codes to local storage', () => {
//   //     service.saveUrlCouponCodes();
//   //     expect(service.setCouponCodes).toHaveBeenCalledWith('pink,blue');
//   //   });
//   //   it('should set coupon codes to local storage', () => {
//   //     service.setCouponCodes('pink,blue');
//   //     expect(winRef.localStorage.setItem).toHaveBeenCalledWith( 'opps-couponcodes', 'pink,blue');
//   //   });
//   //   it('should get coupon codes from local storage', () => {
//   //     service.getCouponCodes();
//   //     expect(winRef.localStorage.getItem).toHaveBeenCalledWith('opps-couponcodes');
//   //   });
//   //   it('should clear coupon codes from local storage', () => {
//   //     service.clearCouponCodes();
//   //     expect(winRef.localStorage.removeItem).toHaveBeenCalledWith('opps-couponcodes');
//   //   });
// });
