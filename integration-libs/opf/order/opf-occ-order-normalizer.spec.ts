/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
import { OpfOccOrder } from './model';
import { OpfOccOrderNormalizer } from './opf-occ-order-normalizer';

describe('OpfOccOrderNormalizer', () => {
  let normalizer: OpfOccOrderNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfOccOrderNormalizer],
    });

    normalizer = TestBed.inject(OpfOccOrderNormalizer);
  });

  it('should initialize target object if it is undefined', () => {
    const source: OpfOccOrder = {
      code: '12345',
      sapBillingAddress: { street: '123 Main St', city: 'Test City' } as any,
    } as OpfOccOrder;

    const result = normalizer.convert(source);

    expect(result).toEqual(jasmine.objectContaining(source));
  });

  it('should add sapBillingAddress to paymentInfo if not already present', () => {
    const source: OpfOccOrder = {
      code: '12345',
      sapBillingAddress: { street: '123 Main St', city: 'Test City' } as any,
    } as OpfOccOrder;
    const target: Order = {
      code: '12345',
      paymentInfo: {},
    };

    const result = normalizer.convert(source, target);

    expect(result.paymentInfo).toBeDefined();
    expect(result?.paymentInfo?.billingAddress).toEqual(
      source.sapBillingAddress
    );
  });

  it('should not overwrite billingAddress if already present in paymentInfo', () => {
    const source: OpfOccOrder = {
      code: '12345',
      sapBillingAddress: {
        street: '456 Secondary St',
        city: 'Other City',
      } as any,
    } as OpfOccOrder;
    const target: Order = {
      code: '12345',
      paymentInfo: {
        billingAddress: {
          street: '789 Tertiary St',
          city: 'Existing City',
        } as any,
      },
    };

    const result = normalizer.convert(source, target);

    expect(result?.paymentInfo?.billingAddress).toEqual(
      target?.paymentInfo?.billingAddress
    );
  });

  it('should return the target object when provided', () => {
    const source: OpfOccOrder = {
      code: '12345',
      sapBillingAddress: { street: '123 Main St', city: 'Test City' } as any,
    } as OpfOccOrder;
    const target: Order = {
      code: '12345',
    };

    const result = normalizer.convert(source, target);

    expect(result).toBe(target);
  });
});
