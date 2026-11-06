/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDetails } from '@spartacus/core';
import {
  isTokenisationCardExpired,
  sortPaymentMethodsForDisplay,
} from './opf-tokenisation-card-expiry.util';

describe('opf-tokenisation-card-expiry.util', () => {
  // Fixed reference: May 2026
  const CURRENT_YEAR = 2026;
  const CURRENT_MONTH = 5;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(CURRENT_YEAR, CURRENT_MONTH - 1, 15));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('isTokenisationCardExpired', () => {
    describe('missing data', () => {
      it('should return false when expiryMonth is missing', () => {
        expect(
          isTokenisationCardExpired({ expiryYear: '30' } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when expiryYear is missing', () => {
        expect(
          isTokenisationCardExpired({ expiryMonth: '03' } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when both expiryMonth and expiryYear are missing', () => {
        expect(isTokenisationCardExpired({} as PaymentDetails)).toBeFalsy();
      });
    });

    describe('invalid values', () => {
      it('should return false when expiryMonth is not a number', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: 'abc',
            expiryYear: '30',
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when expiryYear is not a number', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '03',
            expiryYear: 'abc',
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when expiryMonth is 0', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '0',
            expiryYear: '20',
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when expiryMonth is 13', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '13',
            expiryYear: '20',
          } as PaymentDetails)
        ).toBeFalsy();
      });
    });

    describe('2-digit year normalisation', () => {
      it('should treat 2-digit year as 2000+year (e.g. "30" → 2030)', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '03',
            expiryYear: '30',
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should treat 2-digit past year as expired (e.g. "20" → 2020)', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '03',
            expiryYear: '20',
          } as PaymentDetails)
        ).toBe(true);
      });
    });

    describe('4-digit year', () => {
      it('should return false for a future 4-digit year', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '03',
            expiryYear: '2030',
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return true for a past 4-digit year', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: '03',
            expiryYear: '2020',
          } as PaymentDetails)
        ).toBe(true);
      });
    });

    describe('current year boundary', () => {
      it('should return true when month is before current month in current year', () => {
        // April 2026 < May 2026
        expect(
          isTokenisationCardExpired({
            expiryMonth: String(CURRENT_MONTH - 1),
            expiryYear: String(CURRENT_YEAR),
          } as PaymentDetails)
        ).toBe(true);
      });

      it('should return false when month equals current month in current year', () => {
        expect(
          isTokenisationCardExpired({
            expiryMonth: String(CURRENT_MONTH),
            expiryYear: String(CURRENT_YEAR),
          } as PaymentDetails)
        ).toBeFalsy();
      });

      it('should return false when month is after current month in current year', () => {
        // June 2026 > May 2026
        expect(
          isTokenisationCardExpired({
            expiryMonth: String(CURRENT_MONTH + 1),
            expiryYear: String(CURRENT_YEAR),
          } as PaymentDetails)
        ).toBeFalsy();
      });
    });
  });
  describe('sortPaymentMethodsForDisplay', () => {
    const active1: PaymentDetails = {
      id: 'active-1',
      expiryMonth: '03',
      expiryYear: '30',
    };
    const active2: PaymentDetails = {
      id: 'active-2',
      expiryMonth: '03',
      expiryYear: '30',
    };
    const expired1: PaymentDetails = {
      id: 'expired-1',
      expiryMonth: '03',
      expiryYear: '20',
    };
    const expired2: PaymentDetails = {
      id: 'expired-2',
      expiryMonth: '01',
      expiryYear: '20',
    };
    const defaultCard: PaymentDetails = {
      id: 'default-1',
      expiryMonth: '03',
      expiryYear: '30',
      defaultPayment: true,
    };
    const defaultCard2: PaymentDetails = {
      id: 'default-2',
      expiryMonth: '03',
      expiryYear: '30',
      defaultPayment: true,
    };
    // A card marked as default AND expired — default flag takes priority
    const expiredDefault: PaymentDetails = {
      id: 'expired-default',
      expiryMonth: '03',
      expiryYear: '20',
      defaultPayment: true,
    };

    it('should return an empty array when input is empty', () => {
      expect(sortPaymentMethodsForDisplay([])).toEqual([]);
    });

    it('should return a single active card unchanged', () => {
      expect(sortPaymentMethodsForDisplay([active1])).toEqual([active1]);
    });

    it('should return a single expired card unchanged', () => {
      expect(sortPaymentMethodsForDisplay([expired1])).toEqual([expired1]);
    });

    it('should return a single default card unchanged', () => {
      expect(sortPaymentMethodsForDisplay([defaultCard])).toEqual([
        defaultCard,
      ]);
    });

    it('should place default card first, then active, then expired', () => {
      const input = [expired1, active1, defaultCard];
      expect(sortPaymentMethodsForDisplay(input)).toEqual([
        defaultCard,
        active1,
        expired1,
      ]);
    });

    it('should place multiple defaults first, preserving their relative order', () => {
      const input = [active1, defaultCard2, defaultCard];
      expect(sortPaymentMethodsForDisplay(input)).toEqual([
        defaultCard2,
        defaultCard,
        active1,
      ]);
    });

    it('should place multiple expired cards at the end, preserving their relative order', () => {
      const input = [expired2, active1, expired1];
      expect(sortPaymentMethodsForDisplay(input)).toEqual([
        active1,
        expired2,
        expired1,
      ]);
    });

    it('should handle all three categories together in correct order', () => {
      const input = [expired1, active2, defaultCard, active1, expired2];
      expect(sortPaymentMethodsForDisplay(input)).toEqual([
        defaultCard,
        active2,
        active1,
        expired1,
        expired2,
      ]);
    });

    it('should treat a card with defaultPayment=true as default even if it is expired', () => {
      const input = [active1, expiredDefault, expired1];
      const result = sortPaymentMethodsForDisplay(input);
      // expiredDefault goes to default bucket (first), not expired bucket (last)
      expect(result[0]).toEqual(expiredDefault);
      expect(result[result.length - 1]).toEqual(expired1);
    });

    it('should preserve original order of active non-default cards', () => {
      const result = sortPaymentMethodsForDisplay([active2, active1]);
      expect(result).toEqual([active2, active1]);
    });
  });
});
