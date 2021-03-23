import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfig } from './i18n-config';
import { I18nConfigInitializer } from './i18n-config-initializer';

class MockI18nConfig {
  i18n = { fallbackLang: undefined };
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService> {
  getStable() {
    return of({ context: { language: ['testLang'] } });
  }
}

describe(`I18nConfigInitializer`, () => {
  let initializer: I18nConfigInitializer;
  let config: I18nConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        { provide: I18nConfig, useClass: MockI18nConfig },
      ],
    });

    initializer = TestBed.inject(I18nConfigInitializer);
    config = TestBed.inject(I18nConfig);
  });

  describe(`resolveConfig - fallbackLang was already configured statically`, () => {
    it(`should return empty object`, async () => {
      config.i18n = {
        fallbackLang: 'en',
      };

      const result = await initializer.configFactory();
      expect(result).toEqual({});
    });
  });

  describe(`resolveConfig - fallbackLang was not already configured statically`, () => {
    it(`should return config based on context.language`, async () => {
      const result = await initializer.configFactory();
      expect(result).toEqual({
        i18n: {
          fallbackLang: 'testLang',
        },
      });
    });
  });
});
