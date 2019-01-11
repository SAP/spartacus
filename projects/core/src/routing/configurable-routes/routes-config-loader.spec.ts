import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../config';
import { ConfigurableRoutesConfig } from './config/configurable-routes-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { BehaviorSubject, of } from 'rxjs';
import { RoutesConfig } from './routes-config';

class MockHttpClient {
  get = () => new BehaviorSubject(null);
}

class MockServerConfig {
  server = { baseUrl: 'test-base-url' };
}

class MockConfigurableRoutesModuleConfig {
  routesConfig: RoutesConfig = {
    translations: {
      default: {
        page1: {
          paths: ['default-path1'],
          paramsMapping: { param1: 'mappedParam1' }
        },
        page2: { paths: ['default-path2', 'default-path20'] },
        page3: { paths: ['default-path3'] }
      },
      en: {
        page1: { paths: ['en-path1', 'en-path10'] },
        page2: { paths: ['en-path2'] }
      }
    }
  };
}

const mockFetchedRoutesConfig: RoutesConfig = {
  translations: {
    default: {
      page1: {
        paths: ['fetched-default-path1'],
        paramsMapping: { param1: 'fetched-mappedParam1' }
      }
    },
    en: {
      page1: {
        paths: ['fetched-en-path1', 'fetched-en-path10']
      }
    }
  }
};

describe('RoutesConfigLoader', () => {
  let loader: RoutesConfigLoader;
  let http: MockHttpClient;
  let mockConfigurableRoutesConfig: MockConfigurableRoutesModuleConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutesConfigLoader,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: ServerConfig, useClass: MockServerConfig },
        {
          provide: ConfigurableRoutesConfig,
          useClass: MockConfigurableRoutesModuleConfig
        }
      ]
    });

    loader = TestBed.get(RoutesConfigLoader);
    http = TestBed.get(HttpClient);
    mockConfigurableRoutesConfig = TestBed.get(ConfigurableRoutesConfig);
  });

  describe('loadRoutesConfig', () => {
    describe(', when fetch is configured to true,', () => {
      beforeEach(() => {
        mockConfigurableRoutesConfig.routesConfig.fetch = true;
      });

      it('should fetch routes config from url', () => {
        spyOn(http, 'get').and.returnValue(of(null));
        loader.load();
        expect(http.get).toHaveBeenCalled();
      });

      it('should place routes config under "routesConfig" property', async () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        expect(loader.routesConfig).toBeFalsy();
        await loader.load();
        expect(loader.routesConfig).toBeTruthy();
      });

      // tslint:disable-next-line:max-line-length
      it('should extend fetched routes config with static one and extend routes translations for languages with "default" translations', async () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        await loader.load();
        expect(loader.routesConfig).toEqual({
          translations: {
            default: {
              page1: {
                paths: ['fetched-default-path1'],
                paramsMapping: { param1: 'fetched-mappedParam1' }
              },
              page2: {
                paths: ['default-path2', 'default-path20']
              },
              page3: { paths: ['default-path3'] }
            },
            en: {
              page1: {
                paths: ['fetched-en-path1', 'fetched-en-path10'],
                paramsMapping: { param1: 'fetched-mappedParam1' }
              },
              page2: {
                paths: ['en-path2']
              },
              page3: { paths: ['default-path3'] }
            }
          },
          fetch: true
        });
      });
    });

    describe(', when fetch is configured to false,', () => {
      beforeEach(() => {
        mockConfigurableRoutesConfig.routesConfig.fetch = false;
      });

      it('should NOT fetch routes config', () => {
        spyOn(http, 'get');
        loader.load();
        expect(http.get).not.toHaveBeenCalled();
      });

      it('should place routes config under "routesConfig" property', () => {
        expect(loader.routesConfig).toBeFalsy();
        loader.load();
        expect(loader.routesConfig).toBeTruthy();
      });

      it('should use static routes config and extend routes translations for languages with "default"', () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        loader.load();
        expect(loader.routesConfig).toEqual(
          jasmine.objectContaining({
            translations: {
              default: {
                page1: {
                  paths: ['default-path1'],
                  paramsMapping: { param1: 'mappedParam1' }
                },
                page2: { paths: ['default-path2', 'default-path20'] },
                page3: { paths: ['default-path3'] }
              },
              en: {
                page1: {
                  paths: ['en-path1', 'en-path10'],
                  paramsMapping: { param1: 'mappedParam1' }
                },
                page2: { paths: ['en-path2'] },
                page3: { paths: ['default-path3'] }
              }
            }
          })
        );
      });
    });
  });
});
