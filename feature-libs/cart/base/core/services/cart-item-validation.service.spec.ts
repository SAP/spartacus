/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  CartValidationFacade,
} from '@spartacus/cart/base/root';
import { FeatureToggles } from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from '@spartacus/core/testing/mock-feature-toggles';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { CartConfigService } from './cart-config.service';
import { CartItemValidationService } from './cart-item-validation.service';

const belowMinModification: CartModification = {
  statusCode: 'below_min_quantity',
  statusMessage:
    'The minimum required quantity for product code PR0000 has not been met. Min=5, Actual=1.',
};

describe('CartItemValidationService', () => {
  let service: CartItemValidationService;
  let results$: ReplaySubject<CartModification[]>;
  let featureToggles: MockFeatureTogglesController;
  let cartValidationEnabled: boolean;

  beforeEach(() => {
    results$ = new ReplaySubject<CartModification[]>(1);
    cartValidationEnabled = true;

    TestBed.configureTestingModule({
      providers: [
        CartItemValidationService,
        {
          provide: CartValidationFacade,
          useValue: { getValidationResults: () => results$.asObservable() },
        },
        {
          provide: CartConfigService,
          useValue: { isCartValidationEnabled: () => cartValidationEnabled },
        },
        provideMockFeatureToggles({
          cartValidationDisplayBackendMessages: true,
        }),
        {
          provide: FeatureToggles,
          useExisting: MockFeatureTogglesController,
        },
      ],
    });

    service = TestBed.inject(CartItemValidationService);
    featureToggles = TestBed.inject(MockFeatureTogglesController);
  });

  describe('isEnabled', () => {
    it('should be true when config and toggle are on', () => {
      expect(service.isEnabled()).toBe(true);
    });

    it('should be false when the toggle is off', () => {
      featureToggles.set('cartValidationDisplayBackendMessages', false);
      expect(service.isEnabled()).toBe(false);
    });

    it('should be false when cart validation config is off', () => {
      cartValidationEnabled = false;
      expect(service.isEnabled()).toBe(false);
    });
  });

  describe('getQuantityInfo$', () => {
    it('should parse min/max for a matching modification', async () => {
      results$.next([belowMinModification]);
      const info = await firstValueFrom(service.getQuantityInfo$('PR0000'));
      expect(info).toEqual({ min: 5, max: undefined });
    });

    it('should be empty when no modification matches', async () => {
      results$.next([belowMinModification]);
      const info = await firstValueFrom(service.getQuantityInfo$('PR0001'));
      expect(info).toEqual({});
    });

    it('should be empty when disabled', async () => {
      featureToggles.set('cartValidationDisplayBackendMessages', false);
      results$.next([belowMinModification]);
      const info = await firstValueFrom(service.getQuantityInfo$('PR0000'));
      expect(info).toEqual({});
    });
  });

  describe('hasValidationIssue$', () => {
    it('should be true for a matching modification', async () => {
      results$.next([belowMinModification]);
      expect(await firstValueFrom(service.hasValidationIssue$('PR0000'))).toBe(
        true
      );
    });

    it('should be false when no modification matches', async () => {
      results$.next([belowMinModification]);
      expect(await firstValueFrom(service.hasValidationIssue$('PR0001'))).toBe(
        false
      );
    });

    it('should be false when disabled', async () => {
      cartValidationEnabled = false;
      results$.next([belowMinModification]);
      expect(await firstValueFrom(service.hasValidationIssue$('PR0000'))).toBe(
        false
      );
    });
  });
});
