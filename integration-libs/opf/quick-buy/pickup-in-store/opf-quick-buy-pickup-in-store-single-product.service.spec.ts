/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { OpfQuickBuyDefaultSingleProductService } from '@spartacus/opf/quick-buy/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { of } from 'rxjs';
import { OpfQuickBuyPickupInStoreSingleProductService } from './opf-quick-buy-pickup-in-store-single-product.service';

describe('OpfQuickBuyPickupInStoreSingleProductService', () => {
  let service: OpfQuickBuyPickupInStoreSingleProductService;
  let intendedPickupLocation: jasmine.SpyObj<IntendedPickupLocationFacade>;

  beforeEach(() => {
    intendedPickupLocation = jasmine.createSpyObj(
      'IntendedPickupLocationFacade',
      ['getPickupOption', 'getIntendedLocation']
    );

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

  it('should return pickup store when pickup option is selected', (done) => {
    intendedPickupLocation.getPickupOption.and.returnValue(of('pickup'));
    intendedPickupLocation.getIntendedLocation.and.returnValue(
      of({ name: 'Chiba' } as any)
    );

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options).toEqual({
        quantity: 1,
        pickupStore: 'Chiba',
      });
      done();
    });
  });

  it('should not return pickup store when delivery option is selected', (done) => {
    intendedPickupLocation.getPickupOption.and.returnValue(of('delivery'));
    intendedPickupLocation.getIntendedLocation.and.returnValue(
      of({ name: 'Chiba' } as any)
    );

    service.getSingleProductCartOptions('product-1').subscribe((options) => {
      expect(options).toEqual({
        quantity: 1,
      });
      done();
    });
  });
});
