import { TestBed } from '@angular/core/testing';
import { ConfigInitializer } from '../config/config-initializer/config-initializer';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { SiteContextConfig } from './config/site-context-config';
import { initSiteContextConfig } from './site-context.module';

class MockSiteContextConfigInitializer implements Partial<ConfigInitializer> {
  readonly scopes = ['context'];
  readonly configFactory = async () => ({});
}

class MockSiteContextConfig implements Partial<SiteContextConfig> {
  context = {};
}

describe('SiteContextModule', () => {
  let config: SiteContextConfig;
  let initializer: SiteContextConfigInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SiteContextConfigInitializer,
          useClass: MockSiteContextConfigInitializer,
        },
        { provide: SiteContextConfig, useClass: MockSiteContextConfig },
      ],
    });

    config = TestBed.inject(SiteContextConfig);
    initializer = TestBed.inject(SiteContextConfigInitializer);

    spyOn(initializer, 'configFactory').and.callThrough();
  });

  it(`should resolve SiteContextConfig`, () => {
    config.context = {};
    const result = initSiteContextConfig(initializer);
    expect(result).toEqual(initializer);
  });
});
