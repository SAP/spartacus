/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { OpfQuickBuyDefaultSingleProductService } from '@spartacus/opf/quick-buy/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { of } from 'rxjs';
import { OpfQuickBuyPickupInStoreSingleProductService } from './opf-quick-buy-pickup-in-store-single-product.service';

describe('OpfQuickBuyPickupInStoreSingleProductService', () => {
  let service: OpfQuickBuyPickupInStoreSingleProductService;
  let intendedPickupLocation: any;

  beforeEach(() => {
    intendedPickupLocation = { getPickupOption: vi.fn(), getIntendedLocation: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuyDefaultSingleProductService,
        OpfQuickBuyPickupInStoreSingleProductService,
        {
          provide: IntendedPickupLocationFacade,
          useValue: intendedPickupLocation,
        },
      ],
    });

    service = TestBed.inject(OpfQuickBuyPickupInStoreSingleProductService);
  });

  it('should return pickup store when pickup option is selected', async () => {
    intendedPickupLocation.getPickupOption.mockReturnValue(of('pickup'));
    intendedPickupLocation.getIntendedLocation.mockReturnValue(
      of({ name: 'Chiba' } as any)
    );

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options).toEqual({
        quantity: 1,
        pickupStore: 'Chiba',
      });    });
  });

  it('should not return pickup store when delivery option is selected', async () => {
    intendedPickupLocation.getPickupOption.mockReturnValue(of('delivery'));
    intendedPickupLocation.getIntendedLocation.mockReturnValue(
      of({ name: 'Chiba' } as any)
    );

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options).toEqual({
        quantity: 1,
      });    });
  });
});
