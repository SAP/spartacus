/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { Occ } from '@spartacus/core';
import { OpfGiftCardCartOccNormalizer } from './opf-gift-card-cart-occ-normalizer';
import { TestBed } from '@angular/core/testing';

describe('OpfGiftCardCartOccNormalizer', () => {
  let normalizer: OpfGiftCardCartOccNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfGiftCardCartOccNormalizer],
    });
    normalizer = TestBed.inject(OpfGiftCardCartOccNormalizer);
  });

  describe('convert', () => {
    it('should be created', () => {
      expect(normalizer).toBeTruthy();
    });

    describe('sapGiftCards mapping to opfGiftCards', () => {
      it('should convert sapGiftCards array to opfGiftCards', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: [
            {
              id: 'gc-001',
              maskedNumber: '****1234',
              balance: {
                value: 100,
                currencyIso: 'USD',
              },
              appliedAmount: {
                value: 50,
                currencyIso: 'USD',
              },
              remainingBalance: {
                value: 50,
                currencyIso: 'USD',
              },
            },
            {
              id: 'gc-002',
              maskedNumber: '****5678',
              balance: {
                value: 200,
                currencyIso: 'USD',
              },
              appliedAmount: {
                value: 0,
                currencyIso: 'USD',
              },
              remainingBalance: {
                value: 200,
                currencyIso: 'USD',
              },
            },
          ],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards).toBeDefined();
        expect(result.opfGiftCards?.length).toBe(2);
        expect(result.opfGiftCards?.[0]).toEqual({
          id: 'gc-001',
          maskedNumber: '****1234',
          balance: {
            value: 100,
            currencyIso: 'USD',
          },
          appliedAmount: {
            value: 50,
            currencyIso: 'USD',
          },
          remainingBalance: {
            value: 50,
            currencyIso: 'USD',
          },
        });
        expect(result.opfGiftCards?.[1]).toEqual({
          id: 'gc-002',
          maskedNumber: '****5678',
          balance: {
            value: 200,
            currencyIso: 'USD',
          },
          appliedAmount: {
            value: 0,
            currencyIso: 'USD',
          },
          remainingBalance: {
            value: 200,
            currencyIso: 'USD',
          },
        });
      });

      it('should handle empty sapGiftCards array', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: [],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards).toBeDefined();
        expect(result.opfGiftCards?.length).toBe(0);
      });

      it('should not set opfGiftCards if sapGiftCards is undefined', () => {
        const source: any = {
          code: 'cart-001',
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards).toBeUndefined();
      });

      it('should not set opfGiftCards if sapGiftCards is not an array', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: 'not-an-array',
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards).toBeUndefined();
      });

      it('should not set opfGiftCards if sapGiftCards is null', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: null,
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards).toBeUndefined();
      });
    });

    describe('sapGiftCardSummary mapping to opfGiftCardSummary', () => {
      it('should convert sapGiftCardSummary to opfGiftCardSummary', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 300,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 50,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 250,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: true,
          },
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result.opfGiftCardSummary).toEqual({
          totalBalance: {
            value: 300,
            currencyIso: 'USD',
          },
          totalAppliedAmount: {
            value: 50,
            currencyIso: 'USD',
          },
          totalRemainingBalance: {
            value: 250,
            currencyIso: 'USD',
          },
          giftCardsCoverFullAmount: true,
        });
      });

      it('should default giftCardsCoverFullAmount to false if undefined', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 300,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 50,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 250,
              currencyIso: 'USD',
            },
          },
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCardSummary?.giftCardsCoverFullAmount).toBe(false);
      });

      it('should not set opfGiftCardSummary if sapGiftCardSummary is undefined', () => {
        const source: any = {
          code: 'cart-001',
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCardSummary).toBeUndefined();
      });

      it('should not set opfGiftCardSummary if sapGiftCardSummary is null', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCardSummary: null,
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCardSummary).toBeUndefined();
      });
    });

    describe('_availableOperations mapping to availableOperations', () => {
      it('should convert _availableOperations array to availableOperations', () => {
        const source: any = {
          code: 'cart-001',
          _availableOperations: [
            {
              key: 'REMOVE_GIFT_CARD',
              value: {
                available: true,
                name: 'Remove Gift Card',
              },
            },
            {
              key: 'UPDATE_QUANTITY',
              value: {
                available: false,
                name: 'Update Quantity',
              },
            },
          ],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.availableOperations).toBeDefined();
        expect(result.availableOperations?.length).toBe(2);
        expect(result.availableOperations?.[0]).toEqual({
          key: 'REMOVE_GIFT_CARD',
          value: {
            available: true,
            name: 'Remove Gift Card',
          },
        });
        expect(result.availableOperations?.[1]).toEqual({
          key: 'UPDATE_QUANTITY',
          value: {
            available: false,
            name: 'Update Quantity',
          },
        });
      });

      it('should handle empty _availableOperations array', () => {
        const source: any = {
          code: 'cart-001',
          _availableOperations: [],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.availableOperations).toBeDefined();
        expect(result.availableOperations?.length).toBe(0);
      });

      it('should not set availableOperations if _availableOperations is undefined', () => {
        const source: any = {
          code: 'cart-001',
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.availableOperations).toBeUndefined();
      });

      it('should not set availableOperations if _availableOperations is not an array', () => {
        const source: any = {
          code: 'cart-001',
          _availableOperations: 'not-an-array',
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.availableOperations).toBeUndefined();
      });

      it('should not set availableOperations if _availableOperations is null', () => {
        const source: any = {
          code: 'cart-001',
          _availableOperations: null,
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.availableOperations).toBeUndefined();
      });
    });

    describe('Combined mapping', () => {
      it('should convert all three properties together', () => {
        const source: any = {
          code: 'cart-001',
          totalItems: 1,
          sapGiftCards: [
            {
              id: 'gc-001',
              maskedNumber: '****1234',
              balance: {
                value: 100,
                currencyIso: 'USD',
              },
              appliedAmount: {
                value: 50,
                currencyIso: 'USD',
              },
              remainingBalance: {
                value: 50,
                currencyIso: 'USD',
              },
            },
          ],
          sapGiftCardSummary: {
            totalBalance: {
              value: 100,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 50,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 50,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: false,
          },
          _availableOperations: [
            {
              key: 'REMOVE_GIFT_CARD',
              value: {
                available: true,
                name: 'Remove Gift Card',
              },
            },
          ],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.code).toBe('cart-001');
        expect(result.totalItems).toBe(1);
        expect(result.opfGiftCards?.length).toBe(1);
        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result.availableOperations?.length).toBe(1);
      });

      it('should use provided target cart', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: [
            {
              id: 'gc-001',
              maskedNumber: '****1234',
              balance: {
                value: 100,
                currencyIso: 'USD',
              },
              appliedAmount: {
                value: 50,
                currencyIso: 'USD',
              },
              remainingBalance: {
                value: 50,
                currencyIso: 'USD',
              },
            },
          ],
        };

        const target: Cart = {
          code: 'cart-existing',
          totalItems: 5,
        };

        const result = normalizer.convert(source as Occ.Cart, target);

        expect(result.code).toBe('cart-existing');
        expect(result.totalItems).toBe(5);
        expect(result.opfGiftCards?.length).toBe(1);
        expect(result).toBe(target);
      });
    });

    describe('Edge cases', () => {
      it('should handle minimal source object', () => {
        const source: any = {};

        const result = normalizer.convert(source as Occ.Cart);

        expect(result).toBeDefined();
        expect(result.opfGiftCards).toBeUndefined();
        expect(result.opfGiftCardSummary).toBeUndefined();
        expect(result.availableOperations).toBeUndefined();
      });

      it('should preserve other cart properties', () => {
        const source: any = {
          code: 'cart-001',
          guid: 'guid-123',
          totalPrice: {
            value: 500,
            currencyIso: 'USD',
          },
          totalItems: 3,
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.code).toBe('cart-001');
        expect(result.guid).toBe('guid-123');
        expect(result.totalPrice).toEqual({
          value: 500,
          currencyIso: 'USD',
        });
        expect(result.totalItems).toBe(3);
      });

      it('should handle gift card with partial fields', () => {
        const source: any = {
          code: 'cart-001',
          sapGiftCards: [
            {
              id: 'gc-001',
              maskedNumber: '****1234',
            },
          ],
        };

        const result = normalizer.convert(source as Occ.Cart);

        expect(result.opfGiftCards?.[0]).toEqual({
          id: 'gc-001',
          maskedNumber: '****1234',
          balance: undefined,
          appliedAmount: undefined,
          remainingBalance: undefined,
        });
      });
    });
  });
});
