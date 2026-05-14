import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfigInitializer } from './i18n-config-initializer';

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable() {
    return of({ context: { language: ['testLang'] } });
  }
}

describe(`I18nConfigInitializer`, () => {
  let initializer: I18nConfigInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    });

    initializer = TestBed.inject(I18nConfigInitializer);
  });

  describe(`resolveConfig`, () => {
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
