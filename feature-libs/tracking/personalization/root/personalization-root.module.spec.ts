import { TestBed } from '@angular/core/testing';
import { CmsConfig } from '@spartacus/core';
import {
  defaultPersonalizationComponentsConfig,
  PersonalizationRootModule,
} from './personalization-root.module';
import { PERSONALIZATION_FEATURE } from './feature-name';

const MockCmsConfig: CmsConfig = {
  featureModules: {
    [PERSONALIZATION_FEATURE]: {
      cmsComponents: ['PersonalizationScriptComponent'],
    },
  },
};

describe('FeatureModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalizationRootModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(PersonalizationRootModule);
    expect(module).toBeTruthy();
  });

  it('defaultPersonalizationComponentsConfig', () => {
    const result = defaultPersonalizationComponentsConfig();
    expect(result).toEqual(MockCmsConfig);
  });
});
