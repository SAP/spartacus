/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Occ } from '@spartacus/core';
import { OpfGiftCardOrderOccNormalizer } from './opf-gift-card-order-occ-normalizer';
import { Order } from '@spartacus/order/root';
import { TestBed } from '@angular/core/testing';

describe('OpfGiftCardOrderOccNormalizer', () => {
  let normalizer: OpfGiftCardOrderOccNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfGiftCardOrderOccNormalizer],
    });
    normalizer = TestBed.inject(OpfGiftCardOrderOccNormalizer);
  });

  describe('convert', () => {
    it('should be created', () => {
      expect(normalizer).toBeTruthy();
    });

    describe('sapGiftCardSummary mapping to opfGiftCardSummary', () => {
      it('should convert sapGiftCardSummary to opfGiftCardSummary', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 100,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 400,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: true,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result.opfGiftCardSummary).toEqual({
          totalBalance: {
            value: 500,
            currencyIso: 'USD',
          },
          totalAppliedAmount: {
            value: 100,
            currencyIso: 'USD',
          },
          totalRemainingBalance: {
            value: 400,
            currencyIso: 'USD',
          },
          giftCardsCoverFullAmount: true,
        });
      });

      it('should default giftCardsCoverFullAmount to false if undefined', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 100,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 400,
              currencyIso: 'USD',
            },
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary?.giftCardsCoverFullAmount).toBe(false);
      });

      it('should default giftCardsCoverFullAmount to false if explicitly false', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 0,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: false,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary?.giftCardsCoverFullAmount).toBe(false);
      });

      it('should not set opfGiftCardSummary if sapGiftCardSummary is undefined', () => {
        const source: any = {
          code: 'order-001',
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary).toBeUndefined();
      });

      it('should not set opfGiftCardSummary if sapGiftCardSummary is null', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: null,
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary).toBeUndefined();
      });
    });

    describe('Combined mapping with order properties', () => {
      it('should use provided target order', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 100,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 400,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: true,
          },
        };

        const target: Order = {
          code: 'order-existing',
          guid: 'guid-existing',
        };

        const result = normalizer.convert(source as Occ.Order, target);

        // Target code should remain unchanged (not overridden by source)
        expect(result.code).toBe('order-existing');
        expect(result.guid).toBe('guid-existing');
        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result).toBe(target);
      });
    });

    describe('Edge cases', () => {
      it('should handle minimal source object with no gift card data', () => {
        const source: any = {
          code: 'order-001',
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result).toBeDefined();
        expect(result.code).toBe('order-001');
        expect(result.opfGiftCardSummary).toBeUndefined();
      });

      it('should handle completely empty source object', () => {
        const source: any = {};

        const result = normalizer.convert(source as Occ.Order);

        expect(result).toBeDefined();
        expect(result.opfGiftCardSummary).toBeUndefined();
      });

      it('should handle gift card summary with zero amounts', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 0,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 0,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 0,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: false,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result.opfGiftCardSummary?.totalBalance.value).toBe(0);
        expect(result.opfGiftCardSummary?.totalAppliedAmount.value).toBe(0);
        expect(result.opfGiftCardSummary?.giftCardsCoverFullAmount).toBe(false);
      });

      it('should handle gift card summary with partial fields', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary).toBeDefined();
        expect(result.opfGiftCardSummary?.totalBalance).toEqual({
          value: 500,
          currencyIso: 'USD',
        });
        expect(result.opfGiftCardSummary?.totalAppliedAmount).toBeUndefined();
        expect(
          result.opfGiftCardSummary?.totalRemainingBalance
        ).toBeUndefined();
      });

      it('should preserve existing order properties while mapping gift card data', () => {
        const source: any = {
          code: 'order-001',
          guid: 'guid-001',
          statusDisplay: 'Pending',
          entries: [
            {
              entryNumber: 0,
              product: {
                code: 'product-001',
              },
            },
          ],
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 100,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 400,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: false,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.code).toBe('order-001');
        expect(result.guid).toBe('guid-001');
        expect(result.statusDisplay).toBe('Pending');
        expect(result.entries?.length).toBe(1);
        expect(result.opfGiftCardSummary).toBeDefined();
      });

      it('should handle large numeric values in gift card summary', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 999999.99,
              currencyIso: 'USD',
            },
            totalAppliedAmount: {
              value: 999999.99,
              currencyIso: 'USD',
            },
            totalRemainingBalance: {
              value: 0,
              currencyIso: 'USD',
            },
            giftCardsCoverFullAmount: true,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary?.totalBalance.value).toBe(999999.99);
        expect(result.opfGiftCardSummary?.totalAppliedAmount.value).toBe(
          999999.99
        );
        expect(result.opfGiftCardSummary?.totalRemainingBalance.value).toBe(0);
      });

      it('should handle different currency codes', () => {
        const source: any = {
          code: 'order-001',
          sapGiftCardSummary: {
            totalBalance: {
              value: 500,
              currencyIso: 'EUR',
            },
            totalAppliedAmount: {
              value: 100,
              currencyIso: 'EUR',
            },
            totalRemainingBalance: {
              value: 400,
              currencyIso: 'EUR',
            },
            giftCardsCoverFullAmount: false,
          },
        };

        const result = normalizer.convert(source as Occ.Order);

        expect(result.opfGiftCardSummary?.totalBalance.currencyIso).toBe('EUR');
        expect(result.opfGiftCardSummary?.totalAppliedAmount.currencyIso).toBe(
          'EUR'
        );
        expect(
          result.opfGiftCardSummary?.totalRemainingBalance.currencyIso
        ).toBe('EUR');
      });
    });
  });
});
