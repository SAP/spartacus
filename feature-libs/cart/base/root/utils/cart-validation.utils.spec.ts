/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartModification } from '../models/cart.model';
import {
  cartModificationMatchesCode,
  parseCartModificationQuantityInfo,
} from './cart-validation.utils';

describe('cart-validation.utils', () => {
  describe('parseCartModificationQuantityInfo', () => {
    it('should parse Min from a below-min statusMessage', () => {
      const message =
        'The minimum required quantity for product code productCode1 has not been met. Min=5, Actual=1.';
      expect(parseCartModificationQuantityInfo(message)).toEqual({
        min: 5,
        max: undefined,
      });
    });

    it('should parse Max only', () => {
      expect(
        parseCartModificationQuantityInfo(
          'Maximum exceeded. Max=10, Actual=12.'
        )
      ).toEqual({ min: undefined, max: 10 });
    });

    it('should parse both Min and Max', () => {
      expect(
        parseCartModificationQuantityInfo('Limits Min=20 Max=100 Actual=5.')
      ).toEqual({ min: 20, max: 100 });
    });

    it('should be case-insensitive', () => {
      expect(
        parseCartModificationQuantityInfo('min=3 and MAX=7')
      ).toEqual({ min: 3, max: 7 });
    });

    it('should return an empty object when no tokens are present', () => {
      expect(parseCartModificationQuantityInfo('no numbers here')).toEqual({
        min: undefined,
        max: undefined,
      });
    });

    it('should return an empty object for an undefined message', () => {
      expect(parseCartModificationQuantityInfo(undefined)).toEqual({
        min: undefined,
        max: undefined,
      });
    });
  });

  describe('cartModificationMatchesCode', () => {
    const withEntry: CartModification = {
      entry: { product: { code: 'productCode1' } },
    };
    const entryLess: CartModification = {
      statusCode: 'below_min_quantity',
      statusMessage:
        'The minimum required quantity for product code productCode1 has not been met. Min=5, Actual=1.',
    };

    it('should match by entry product code regardless of toggle', () => {
      expect(
        cartModificationMatchesCode(withEntry, 'productCode1', false)
      ).toBe(true);
    });

    it('should match an entry-less modification by code in statusMessage when enabled', () => {
      expect(cartModificationMatchesCode(entryLess, 'productCode1', true)).toBe(
        true
      );
    });

    it('should NOT match an entry-less modification when disabled', () => {
      expect(
        cartModificationMatchesCode(entryLess, 'productCode1', false)
      ).toBe(false);
    });

    it('should NOT match when the code is empty', () => {
      expect(cartModificationMatchesCode(entryLess, '', true)).toBe(false);
    });

    it('should match an all-zero code embedded in the statusMessage', () => {
      const zero: CartModification = {
        statusCode: 'below_min_quantity',
        statusMessage:
          'The minimum required quantity for product code 00000 has not been met. Min=5, Actual=1.',
      };
      expect(cartModificationMatchesCode(zero, '00000', true)).toBe(true);
    });

    it('should NOT match a different code', () => {
      expect(cartModificationMatchesCode(entryLess, 'productCode2', true)).toBe(
        false
      );
    });
  });
});
