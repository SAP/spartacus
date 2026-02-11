// /*
//  * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { UserPaymentService } from '@spartacus/core';
// import { OpfPaymentDetails } from '../../public_api';
// import { OpfTokenisationService } from './opf-tokenisation.service';

// class MockUserPaymentService implements Partial<UserPaymentService> {
//   getPaymentMethods() {
//     return of([]);
//   }

//   getPaymentMethodsLoading() {
//     return of(false);
//   }

//   loadPaymentMethods() {}

//   deletePaymentMethod(_paymentMethodId: string) {}

//   setPaymentMethodAsDefault(_paymentMethodId: string) {}
// }

// describe('OpfTokenisationService', () => {
//   let service: OpfTokenisationService;
//   let mockUserPaymentService: MockUserPaymentService;

//   beforeEach(() => {
//     mockUserPaymentService = new MockUserPaymentService();

//     TestBed.configureTestingModule({
//       providers: [
//         OpfTokenisationService,
//         { provide: UserPaymentService, useValue: mockUserPaymentService },
//       ],
//     });

//     service = TestBed.inject(OpfTokenisationService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('getPaymentMethods', () => {
//     it('should delegate to UserPaymentService.getPaymentMethods()', () => {
//       const mockPayments: OpfPaymentDetails[] = [
//         { id: 'method1' } as any,
//         { id: 'method2' } as any,
//       ];
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of(mockPayments)
//       );

//       let result: OpfPaymentDetails[] = [];
//       service
//         .getPaymentMethods()
//         .subscribe((data) => {
//           result = data;
//         })
//         .unsubscribe();

//       expect(mockUserPaymentService.getPaymentMethods).toHaveBeenCalled();
//       expect(result).toEqual(mockPayments);
//     });

//     it('should return empty array when no payment methods exist', () => {
//       spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
//         of([])
//       );

//       let result: OpfPaymentDetails[] = [];
//       service
//         .getPaymentMethods()
//         .subscribe((data) => {
//           result = data;
//         })
//         .unsubscribe();

//       expect(result).toEqual([]);
//     });
//   });

//   describe('getPaymentMethodsLoading', () => {
//     it('should delegate to UserPaymentService.getPaymentMethodsLoading()', () => {
//       spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
//         of(true)
//       );

//       let result: boolean = false;
//       service
//         .getPaymentMethodsLoading()
//         .subscribe((data) => {
//           result = data;
//         })
//         .unsubscribe();

//       expect(
//         mockUserPaymentService.getPaymentMethodsLoading
//       ).toHaveBeenCalled();
//       expect(result).toEqual(true);
//     });

//     it('should return false when not loading', () => {
//       spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
//         of(false)
//       );

//       let result: boolean = true;
//       service
//         .getPaymentMethodsLoading()
//         .subscribe((data) => {
//           result = data;
//         })
//         .unsubscribe();

//       expect(result).toEqual(false);
//     });
//   });

//   describe('loadPaymentMethods', () => {
//     it('should delegate to UserPaymentService.loadPaymentMethods()', () => {
//       spyOn(mockUserPaymentService, 'loadPaymentMethods');

//       service.loadPaymentMethods();

//       expect(mockUserPaymentService.loadPaymentMethods).toHaveBeenCalled();
//     });
//   });

//   describe('deletePaymentMethod', () => {
//     it('should delegate to UserPaymentService.deletePaymentMethod() with paymentMethodId', () => {
//       spyOn(mockUserPaymentService, 'deletePaymentMethod');
//       const paymentMethodId = 'method-123';

//       service.deletePaymentMethod(paymentMethodId);

//       expect(mockUserPaymentService.deletePaymentMethod).toHaveBeenCalledWith(
//         paymentMethodId
//       );
//     });

//     it('should handle deletion of multiple payment methods', () => {
//       spyOn(mockUserPaymentService, 'deletePaymentMethod');

//       service.deletePaymentMethod('method-1');
//       service.deletePaymentMethod('method-2');

//       expect(mockUserPaymentService.deletePaymentMethod).toHaveBeenCalledWith(
//         'method-1'
//       );
//       expect(mockUserPaymentService.deletePaymentMethod).toHaveBeenCalledWith(
//         'method-2'
//       );
//       expect(mockUserPaymentService.deletePaymentMethod).toHaveBeenCalledTimes(
//         2
//       );
//     });
//   });

//   describe('setPaymentMethodAsDefault', () => {
//     it('should delegate to UserPaymentService.setPaymentMethodAsDefault() with paymentMethodId', () => {
//       spyOn(mockUserPaymentService, 'setPaymentMethodAsDefault');
//       const paymentMethodId = 'method-123';

//       service.setPaymentMethodAsDefault(paymentMethodId);

//       expect(
//         mockUserPaymentService.setPaymentMethodAsDefault
//       ).toHaveBeenCalledWith(paymentMethodId);
//     });

//     it('should allow setting different payment methods as default', () => {
//       spyOn(mockUserPaymentService, 'setPaymentMethodAsDefault');

//       service.setPaymentMethodAsDefault('method-1');
//       service.setPaymentMethodAsDefault('method-2');

//       expect(
//         mockUserPaymentService.setPaymentMethodAsDefault
//       ).toHaveBeenCalledWith('method-1');
//       expect(
//         mockUserPaymentService.setPaymentMethodAsDefault
//       ).toHaveBeenCalledWith('method-2');
//       expect(
//         mockUserPaymentService.setPaymentMethodAsDefault
//       ).toHaveBeenCalledTimes(2);
//     });
//   });

//   describe('facade contract compliance', () => {
//     it('should implement all OpfTokenisationFacade methods', () => {
//       expect(typeof service.getPaymentMethods).toBe('function');
//       expect(typeof service.getPaymentMethodsLoading).toBe('function');
//       expect(typeof service.loadPaymentMethods).toBe('function');
//       expect(typeof service.deletePaymentMethod).toBe('function');
//       expect(typeof service.setPaymentMethodAsDefault).toBe('function');
//     });
//   });
// });
