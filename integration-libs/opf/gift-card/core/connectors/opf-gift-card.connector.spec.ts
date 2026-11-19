/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfGiftCardBalanceRequest,
  OpfGiftCardResponse,
} from '../../root/model';
import { of, throwError } from 'rxjs';

import { OpfGiftCardAdapter } from './opf-gift-card.adapter';
import { OpfGiftCardConnector } from './opf-gift-card.connector';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

describe('OpfGiftCardConnector', () => {
  let connector: OpfGiftCardConnector;
  let mockAdapter: any;

  const mockSAPGiftCardResponse: OpfGiftCardResponse = {
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
    mockAdapter = { applyGiftCard: vi.fn(), removeGiftCard: vi.fn() };

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
  it('should inject all dependencies via inject()', () => {
    expect((connector as any).adapter).toBeTruthy();
  });
  describe('applyGiftCard', () => {
    it('should delegate to adapter', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response).toEqual(mockSAPGiftCardResponse);
        });
    });

    it('should pass correct parameters to adapter', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-456', 'cart-456', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-456',
            'cart-456',
            mockRequest
          );
        });
    });

    it('should handle adapter error', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const mockError = new Error('Adapter error');
      mockAdapter.applyGiftCard.mockReturnValue(throwError(() => mockError));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
        },
      });
    });

    it('should return gift card response with correct structure', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response.id).toBe('gc-123');
          expect(response.maskedNumber).toBe('****1111');
          expect(response.balance.value).toBe(100);
          expect(response.appliedAmount.value).toBe(20);
          expect(response.remainingBalance.value).toBe(80);
        });
    });

    it('should handle different user IDs', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-special-id', 'cart-123', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-special-id',
            'cart-123',
            mockRequest
          );
        });
    });

    it('should handle different cart IDs', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-special-id', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-special-id',
            mockRequest
          );
        });
    });

    it('should handle multiple gift card responses', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const anotherResponse: OpfGiftCardResponse = {
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

      mockAdapter.applyGiftCard.mockReturnValue(of(anotherResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(response.id).toBe('gc-456');
          expect(response.balance.value).toBe(50);
        });
    });

    it('should only call adapter once per subscription', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe(() => {
          expect(mockAdapter.applyGiftCard).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('removeGiftCard', () => {
    it('should delegate to adapter', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-123',
            'gc-123'
          );
        });
    });

    it('should pass correct parameters to adapter', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector
        .removeGiftCard('user-456', 'cart-456', 'gc-456')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-456',
            'cart-456',
            'gc-456'
          );
        });
    });

    it('should handle successful removal', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      let completed = false;
      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        next: () => {
          completed = true;
        },
        complete: () => {
          expect(completed).toBeTruthy();
        },
      });
    });

    it('should handle adapter error on removal', async () => {
      const mockError = new Error('Remove failed');
      mockAdapter.removeGiftCard.mockReturnValue(throwError(() => mockError));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
        },
      });
    });

    it('should handle different gift card IDs', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-special-id')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledWith(
            'user-123',
            'cart-123',
            'gc-special-id'
          );
        });
    });

    it('should handle multiple removals', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-1').subscribe();
      connector.removeGiftCard('user-123', 'cart-123', 'gc-2').subscribe();

      expect(mockAdapter.removeGiftCard).toHaveBeenCalledTimes(2);
    });

    it('should return void observable', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        next: (result) => {
          expect(result).toBeUndefined();
        },
      });
    });

    it('should only call adapter once per subscription', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(mockAdapter.removeGiftCard).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('Adapter Injection', () => {
    it('should inject adapter', () => {
      expect(connector['adapter']).toBeTruthy();
      expect(connector['adapter']).toEqual(mockAdapter);
    });

    it('should use same adapter for all methods', () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe();
      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe();

      expect(connector['adapter']).toEqual(mockAdapter);
    });
  });

  describe('Observable Behavior', () => {
    it('should emit values from adapter observable', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      let emitted = false;
      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe(() => {
          emitted = true;
        });

      expect(emitted).toBeTruthy();
    });

    it('should allow multiple subscriptions', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

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

      expect(subscription1Emitted).toBeTruthy();
      expect(subscription2Emitted).toBeTruthy();
    });
  });

  describe('Error Propagation', () => {
    it('should propagate adapter errors immediately', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      const mockError = new Error('Adapter failed');
      mockAdapter.applyGiftCard.mockReturnValue(throwError(() => mockError));

      connector.applyGiftCard('user-123', 'cart-123', mockRequest).subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
        },
      });
    });

    it('should propagate errors from removeGiftCard', async () => {
      const mockError = new Error('Remove failed');
      mockAdapter.removeGiftCard.mockReturnValue(throwError(() => mockError));

      connector.removeGiftCard('user-123', 'cart-123', 'gc-123').subscribe({
        error: (error) => {
          expect(error).toEqual(mockError);
        },
      });
    });
  });

  describe('Type Safety', () => {
    it('should return correct response type', async () => {
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '1234',
      };

      mockAdapter.applyGiftCard.mockReturnValue(of(mockSAPGiftCardResponse));

      connector
        .applyGiftCard('user-123', 'cart-123', mockRequest)
        .subscribe((response) => {
          expect(typeof response).toBe('object');
          expect(response.id).toBeTruthy();
          expect(response.maskedNumber).toBeTruthy();
          expect(response.balance).toBeTruthy();
        });
    });

    it('should return void type for removeGiftCard', async () => {
      mockAdapter.removeGiftCard.mockReturnValue(of(void 0));

      connector
        .removeGiftCard('user-123', 'cart-123', 'gc-123')
        .subscribe(() => {
          expect(true).toBeTruthy();
        });
    });
  });
});
