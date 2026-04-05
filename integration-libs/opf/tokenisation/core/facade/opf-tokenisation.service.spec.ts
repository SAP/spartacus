/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPaymentService } from '@spartacus/core';
import { OpfTokenisationService } from './opf-tokenisation.service';
import { OpfPaymentDetails } from '../../root/model';

class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods() {
    return of([]);
  }
  getPaymentMethodsLoading() {
    return of(false);
  }
  loadPaymentMethods() {}
  deletePaymentMethod(_paymentMethodId: string) {}
}

describe('OpfTokenisationService', () => {
  let service: OpfTokenisationService;
  let userPaymentService: UserPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfTokenisationService,
        { provide: UserPaymentService, useClass: MockUserPaymentService },
      ],
    });

    service = TestBed.inject(OpfTokenisationService);
    userPaymentService = TestBed.inject(UserPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPaymentMethods', () => {
    it('should delegate to UserPaymentService.getPaymentMethods', (done) => {
      const mockPayments: OpfPaymentDetails[] = [
        { id: 'method1' } as OpfPaymentDetails,
        { id: 'method2' } as OpfPaymentDetails,
      ];
      spyOn(userPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );

      service.getPaymentMethods().subscribe((result) => {
        expect(userPaymentService.getPaymentMethods).toHaveBeenCalled();
        expect(result).toEqual(mockPayments);
        done();
      });
    });
  });

  describe('getPaymentMethodsLoading', () => {
    it('should delegate to UserPaymentService.getPaymentMethodsLoading', (done) => {
      spyOn(userPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(true)
      );

      service.getPaymentMethodsLoading().subscribe((result) => {
        expect(userPaymentService.getPaymentMethodsLoading).toHaveBeenCalled();
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('loadPaymentMethods', () => {
    it('should delegate to UserPaymentService.loadPaymentMethods', () => {
      spyOn(userPaymentService, 'loadPaymentMethods');

      service.loadPaymentMethods();

      expect(userPaymentService.loadPaymentMethods).toHaveBeenCalled();
    });
  });

  describe('deletePaymentMethod', () => {
    it('should delegate to UserPaymentService.deletePaymentMethod with correct id', () => {
      spyOn(userPaymentService, 'deletePaymentMethod');

      service.deletePaymentMethod('method-123');

      expect(userPaymentService.deletePaymentMethod).toHaveBeenCalledWith(
        'method-123'
      );
    });
  });
});
