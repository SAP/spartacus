import { TestBed } from '@angular/core/testing';
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
    [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
  },
};

describe('PickupInStoreRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PickupInStoreRootModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(PickupInStoreRootModule);
    expect(module).toBeDefined();
  });

  it('defaultPersonalizationComponentsConfig', () => {
    const result = defaultPickupInStoreComponentsConfig();
    expect(result).toEqual(MockCmsConfig);
  });
});
