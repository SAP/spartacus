import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CmsConfig } from '@spartacus/core';

import {
  PICKUP_IN_STORE_CORE_FEATURE,
  PICKUP_IN_STORE_FEATURE,
} from './feature-name';
import {
  defaultPickupInStoreComponentsConfig,
  PickupInStoreRootModule,
} from './pickup-in-store-root.module';

const MockCmsConfig: CmsConfig = {
  featureModules: {
    [PICKUP_IN_STORE_FEATURE]: {
      cmsComponents: [
        'CheckoutReviewPickup',
        'MyPreferredStoreComponent',
        'OrderConfirmationPickUpComponent',
        'PickupInStoreDeliveryModeComponent',
      ],
    },
    [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
  },
};

describe('PickupInStoreRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        PickupInStoreRootModule,
      ],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(PickupInStoreRootModule);
    expect(module).toBeDefined();
  });

  it('has CmsConfig for components and the core feature', () => {
    const result = defaultPickupInStoreComponentsConfig();
    expect(result).toEqual(MockCmsConfig);
  });
});
