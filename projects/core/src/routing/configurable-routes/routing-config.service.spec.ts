import { TestBed } from '@angular/core/testing';
import { RoutingConfig } from './config/routing-config';
import { RoutingConfigService } from './routing-config.service';
import { RoutesConfig } from './routes-config';

class MockRoutingConfig {
  routing: RoutesConfig = {
    translations: {
      default: {
        page1: {
          paths: ['default-path1'],
          paramsMapping: { param1: 'mappedParam1' },
        },
        page2: { paths: ['default-path2', 'default-path20'] },
        page3: { paths: ['default-path3'] },
      },
      en: {
        page1: { paths: ['en-path1', 'en-path10'] },
        page2: { paths: ['en-path2'] },
      },
    },
  };
}

describe('RoutingConfigService', () => {
  let service: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutingConfigService,
        {
          provide: RoutingConfig,
          useClass: MockRoutingConfig,
        },
      ],
    });

    service = TestBed.get(RoutingConfigService);
  });

  describe('init', () => {
    it('should place routes config under "translations" property', () => {
      expect(service.translations).toBeFalsy();
      service.init();
      expect(service.translations).toBeTruthy();
    });

    it(`should extend languages' routes translations with default ones`, () => {
      service.init();
      expect(service.translations).toEqual(
        jasmine.objectContaining({
          default: {
            page1: {
              paths: ['default-path1'],
              paramsMapping: { param1: 'mappedParam1' },
            },
            page2: { paths: ['default-path2', 'default-path20'] },
            page3: { paths: ['default-path3'] },
          },
          en: {
            page1: {
              paths: ['en-path1', 'en-path10'],
              paramsMapping: { param1: 'mappedParam1' },
            },
            page2: { paths: ['en-path2'] },
            page3: { paths: ['default-path3'] },
          },
        })
      );
    });
  });

  describe('getRouteTranslation', () => {
    it('should return configured paths translations for given page name', async () => {
      service['_translations'] = {
        en: {
          page1: { paths: ['path1', 'path10'] },
        },
      };
      const expectedResult = { paths: ['path1', 'path10'] };
      expect(service.getRouteTranslation('page1')).toEqual(expectedResult);
    });
  });
});
