import { TestBed } from '@angular/core/testing';
import { ConfigInitializer } from '../config/config-initializer/config-initializer';
import { FeatureConfigService } from '../features-config/services/feature-config.service';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { SiteContextConfig } from './config/site-context-config';
import { initSiteContextConfig } from './site-context.module';

class MockSiteContextConfigInitializer implements ConfigInitializer {
  readonly scopes = ['context'];
  readonly configFactory = async () => ({});
}

// TODO(#11515): remove it in 4.0
class MockFeatureConfigService {
  isLevel() {
    return true;
  }
}

class MockSiteContextConfig {
  context = {};
}

describe('SiteContextModule', () => {
  let config: SiteContextConfig;
  let initializer: SiteContextConfigInitializer;
  let featureService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SiteContextConfigInitializer,
          useClass: MockSiteContextConfigInitializer,
        },
        { provide: SiteContextConfig, useClass: MockSiteContextConfig },
        // TODO(#11515): remove it in 4.0
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    config = TestBed.inject(SiteContextConfig);
    initializer = TestBed.inject(SiteContextConfigInitializer);
    featureService = TestBed.inject(FeatureConfigService);

    spyOn(initializer, 'configFactory').and.callThrough();
  });

  it(`should not resolve SiteContextConfig when it was already configured statically `, () => {
    config.context = {
      baseSite: ['electronics'],
    };
    const result = initSiteContextConfig(initializer, config, featureService);
    expect(result).toEqual(null);
  });

  it(`should resolve SiteContextConfig when it was not configured statically `, () => {
    config.context = {};
    const result = initSiteContextConfig(initializer, config, featureService);
    expect(result).toEqual(initializer);
  });
});
