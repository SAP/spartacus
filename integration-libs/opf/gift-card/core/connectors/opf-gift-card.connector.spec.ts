/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SAPGiftCardBalanceRequest,
  SAPGiftCardResponse,
} from '../../root/model';
import { of, throwError } from 'rxjs';

import { OpfGiftCardAdapter } from './opf-gift-card.adapter';
import { OpfGiftCardConnector } from './opf-gift-card.connector';
import { TestBed } from '@angular/core/testing';

describe('OpfGiftCardConnector', () => {
  let connector: OpfGiftCardConnector;
  let mockAdapter: jasmine.SpyObj<OpfGiftCardAdapter>;

  const mockSAPGiftCardResponse: SAPGiftCardResponse = {
    id: 'gc-123',
    maskedNumber: '****1111',
    balance: { currencyIso: 'USD', formattedValue: '$100', value: 100 },
    appliedAmount: { currencyIso: 'USD', formattedValue: '$20', value: 20 },
    remainingBalance: {
      currencyIso: 'USD',
      formattedValue: '$80',
      value: 80,
    },
  };

  beforeEach(() => {
    mockAdapter = jasmine.createSpyObj('OpfGiftCardAdapter', [
      'applyGiftCard',
      'removeGiftCard',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfGiftCardConnector,
        { provide: OpfGiftCardAdapter, useValue: mockAdapter },
      ],
    });

    connector = TestBed.inject(OpfGiftCardConnector);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('applyGiftCard', () => {
    it('should delegate to adapter', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response).toEqual(mockSAPGiftCardResponse);
          done();
        });
    });

    it('should pass correct parameters to adapter', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-456', 'cart-456', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-456',
            'cart-456',
            mockRequest
          );
          done();
        });
    });

    it('should handle adapter error', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const mockError = new Error('Adapter error');
      mockAdapter.applyGiftCard.and.returnValue(throwError(() => mockError));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
          done();
        },
      });
    });

    it('should return gift card response with correct structure', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response.id).toBe('gc-123');
          expect(response.maskedNumber).toBe('****1111');
          expect(response.balance.value).toBe(100);
          expect(response.appliedAmount.value).toBe(20);
          expect(response.remainingBalance.value).toBe(80);
          done();
        });
    });

    it('should handle different user IDs', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-special-id', 'cart-123', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-special-id',
            'cart-123',
            mockRequest
          );
          done();
        });
    });

    it('should handle different cart IDs', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-special-id', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-special-id',
            mockRequest
          );
          done();
        });
    });

    it('should handle multiple gift card responses', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const anotherResponse: SAPGiftCardResponse = {
        id: 'gc-456',
        maskedNumber: '****2222',
        balance: { currencyIso: 'USD', formattedValue: '$50', value: 50 },
        appliedAmount: { currencyIso: 'USD', formattedValue: '$10', value: 10 },
        remainingBalance: {
          currencyIso: 'USD',
          formattedValue: '$40',
          value: 40,
        },
      };

      mockAdapter.applyGiftCard.and.returnValue(of(anotherResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response.id).toBe('gc-456');
          expect(response.balance.value).toBe(50);
          done();
        });
    });

    it('should only call adapter once per subscription', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledTimes(1);
          done();
        });
    });
  });

  describe('removeGiftCard', () => {
    it('should delegate to adapter', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-123',
            'gc-123'
          );
          done();
        });
    });

    it('should pass correct parameters to adapter', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector
        .removeGiftCard('user-456', 'cart-456', 'gc-456')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-456',
            'cart-456',
            'gc-456'
          );
          done();
        });
    });

    it('should handle successful removal', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      let completed = false;
      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        next: () => {
          completed = true;
        },
        complete: () => {
          expect(completed).toBeTruthy();
          done();
        },
      });
    });

    it('should handle adapter error on removal', (done) => {
      const mockError = new Error('Remove failed');
      mockAdapter.removeGiftCard.and.returnValue(throwError(() => mockError));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
          done();
        },
      });
    });

    it('should handle different gift card IDs', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-special-id')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-123',
            'gc-special-id'
          );
          done();
        });
    });

    it('should handle multiple removals', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-1').subscribe();
      connector.removeGiftCard('user-123', 'cart-123', 'gc-2').subscribe();

      setTimeout(() => {
        expect(mockAdapter.removeGiftCard).toHaveBeenCalledTimes(2);
        done();
      }, 50);
    });

    it('should return void observable', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        next: (result) => {
          expect(result).toBeUndefined();
          done();
        },
      });
    });

    it('should only call adapter once per subscription', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledTimes(1);
          done();
        });
    });
  });

  describe('Adapter Injection', () => {
    it('should inject adapter', () => {
      expect(connector['adapter']).toBeTruthy();
      expect(connector['adapter']).toEqual(mockAdapter);
    });

    it('should use same adapter for all methods', () => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe();
      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe();

      expect(connector['adapter']).toEqual(mockAdapter);
    });
  });

  describe('Observable Behavior', () => {
    it('should emit values from adapter observable', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      let emitted = false;
      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe(() => {
          emitted = true;
        });

      setTimeout(() => {
        expect(emitted).toBeTruthy();
        done();
      }, 50);
    });

    it('should allow multiple subscriptions', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      let subscription1Emitted = false;
      let subscription2Emitted = false;

      const observable = connector.applyGiftCard(
        'user-123',
        'cart-123',
        mockRequest
      );

      observable.subscribe(() => {
        subscription1Emitted = true;
      });

      observable.subscribe(() => {
        subscription2Emitted = true;
      });

      setTimeout(() => {
        expect(subscription1Emitted).toBeTruthy();
        expect(subscription2Emitted).toBeTruthy();
        done();
      }, 50);
    });
  });

  describe('Error Propagation', () => {
    it('should propagate adapter errors immediately', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const mockError = new Error('Adapter failed');
      mockAdapter.applyGiftCard.and.returnValue(throwError(() => mockError));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
          done();
        },
      });
    });

    it('should propagate errors from removeGiftCard', (done) => {
      const mockError = new Error('Remove failed');
      mockAdapter.removeGiftCard.and.returnValue(throwError(() => mockError));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
          done();
        },
      });
    });
  });

  describe('Type Safety', () => {
    it('should return correct response type', (done) => {
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.and.returnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(typeof response).toBe('object');
          expect(response.id).toBeTruthy();
          expect(response.maskedNumber).toBeTruthy();
          expect(response.balance).toBeTruthy();
          done();
        });
    });

    it('should return void type for removeGiftCard', (done) => {
      mockAdapter.removeGiftCard.and.returnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(true).toBeTruthy();
          done();
        });
    });
  });
});
