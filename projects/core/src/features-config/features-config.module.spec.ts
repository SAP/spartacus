// # QA Steps - FeatureToggles

import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideConfig, provideDefaultConfig } from '../config';
import {
  FeatureToggles,
  provideDefaultFeatureToggles,
  provideFeatureToggles,
} from './feature-toggles';
import { FeaturesConfigModule } from './features-config.module';
import { FeatureConfigService } from './services/feature-config.service';

const testToggle = 'testToggle';

describe('when FeaturesConfigModule.forRoot() is imported,', () => {
  function setProviders(providers: Provider[]) {
    TestBed.configureTestingModule({
      imports: [FeaturesConfigModule.forRoot()],
      providers,
    });
  }

  describe('when FeatureToggles and FeaturesConfig use different levels (DEFAULT vs ROOT),', () => {
    it('DEFAULT FeatureToggles should be overridden by ROOT FeaturesConfig', () => {
      setProviders([
        provideDefaultFeatureToggles({ [testToggle]: true } as FeatureToggles),
        provideConfig({ features: { [testToggle]: false } }),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(false);
    });

    it('ROOT FeatureToggles should be NOT overridden by DEFAULT FeatureConfig', () => {
      setProviders([
        provideFeatureToggles({ [testToggle]: true } as FeatureToggles),
        provideDefaultConfig({ features: { [testToggle]: false } }),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(true);
    });

    it('DEFAULT FeatureConfig should be overridden by ROOT FeatureToggles', () => {
      setProviders([
        provideDefaultConfig({ features: { [testToggle]: true } }),
        provideFeatureToggles({ [testToggle]: false } as FeatureToggles),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(false);
    });

    it('ROOT FeaturesConfig should be NOT overridden by DEFAULT FeatureToggles', () => {
      setProviders([
        provideConfig({ features: { [testToggle]: true } }),
        provideDefaultFeatureToggles({ [testToggle]: false } as FeatureToggles),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(true);
    });
  });

  describe('when FeatureToggles and FeaturesConfig use the same levels (DEFAULT/ROOT),', () => {
    it('ROOT FeatureToggles should be overridden by ROOT FeaturesConfig', () => {
      setProviders([
        provideFeatureToggles({ [testToggle]: true } as FeatureToggles),
        provideConfig({ features: { [testToggle]: false } }),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(false);
    });

    it('DEFAULT FeatureToggles should be overridden by DEFAULT FeaturesConfig', () => {
      setProviders([
        provideDefaultFeatureToggles({ [testToggle]: true } as FeatureToggles),
        provideDefaultConfig({ features: { [testToggle]: false } }),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(false);
    });

    // The following 2 tests confirm a correct behavior, which might not be intuitive.
    //
    // When mixing `FeaturesConfig` and `FeatureToggles` in the same level (both ROOT, or both DEFAULT)
    // then `FeaturesConfig` takes precedence over `FeatureToggles`, regardless of the order of providers.
    //
    // It's a consequence of the implementation detail - that in `FeatureConfigModule.forRoot()`
    // we provide a new chunk of `FeaturesConfig`, by reading the resolved
    // values of `FeatureToggles` (btw. we do it separately for the DEFAULT level and ROOT level).
    // We provide this chunk early in the DI tree, before the custom `FeatureConfig` chunks are provided.
    // Therefore the custom provided chunks of `FeaturesConfig` win over `FeatureToggles` when they have the same level.

    it('ROOT FeaturesConfig should NOT be overridden by ROOT FeatureToggles', () => {
      setProviders([
        provideConfig({ features: { [testToggle]: true } }),
        provideFeatureToggles({ [testToggle]: false } as FeatureToggles),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(true);
    });

    it('DEFAULT FeaturesConfig should NOT be overridden by DEFAULT FeatureToggles', () => {
      setProviders([
        provideDefaultConfig({ features: { [testToggle]: true } }),
        provideDefaultFeatureToggles({ [testToggle]: false } as FeatureToggles),
      ]);
      const service = TestBed.inject(FeatureConfigService);
      expect(service.isEnabled(testToggle)).toBe(true);
    });
  });
});
