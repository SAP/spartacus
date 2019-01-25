import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { Router, Routes } from '@angular/router';
import { RoutesConfig } from './routes-config';

class MockServerConfig {
  production = false;
}

class MockRoutesConfigLoader {
  routesConfig: RoutesConfig = {
    translations: {
      default: {}
    }
  };
}

class MockRouter {
  config: Routes;
  resetConfig(newConfig): void {
    this.config = newConfig;
  }
}

describe('ConfigurableRoutesService', () => {
  let service: ConfigurableRoutesService;
  let serverConfig: MockServerConfig;
  let router: Router;
  let loader: RoutesConfigLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurableRoutesService,
        {
          provide: RoutesConfigLoader,
          useClass: MockRoutesConfigLoader
        },
        { provide: ServerConfig, useClass: MockServerConfig },
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    });

    service = TestBed.get(ConfigurableRoutesService);
    serverConfig = TestBed.get(ServerConfig);
    router = TestBed.get(Router);
    loader = TestBed.get(RoutesConfigLoader);

    router.config = [];
  });

  describe('translateRouterConfig', () => {
    it('should NOT translate "paths" of routes that are NOT configurable', () => {
      router.config = [{ path: 'path1' }, { path: 'path2' }];
      service.translateRouterConfig('default');
      expect(router.config).toEqual([{ path: 'path1' }, { path: 'path2' }]);
    });

    it('should NOT translate "redirectTo" of routes that are NOT configurable', () => {
      router.config = [
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' }
      ];
      service.translateRouterConfig('default');
      expect(router.config).toEqual([
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' }
      ]);
    });

    it('should translate "path" of configurable routes using translations for given language code', () => {
      router.config = [
        { path: null, data: { cxPath: 'page1' } },
        { path: null, data: { cxPath: 'page2' } }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path2');
    });

    it('should translate "redirectTo" of configurable routes using translations for given language code', () => {
      router.config = [
        { path: 'path1', data: { cxRedirectTo: 'page1' } },
        { path: 'path2', data: { cxRedirectTo: 'page2' } }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path100'] },
          page2: { paths: ['path200'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[0].redirectTo).toEqual('path100');
      expect(router.config[1].path).toEqual('path2');
      expect(router.config[1].redirectTo).toEqual('path200');
    });

    it('should translate "path" of configurable routes using "default" translations if unknown language code was given', () => {
      spyOn(console, 'warn');
      router.config = [
        { path: null, data: { cxPath: 'page1' } },
        { path: null, data: { cxPath: 'page2' } }
      ];
      loader.routesConfig.translations = {
        default: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        }
      };
      service.translateRouterConfig('testUnknownLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path2');
    });

    it('should translate "redirectTo" of configurable routes using "default" translations if unknown language code was given', () => {
      spyOn(console, 'warn');
      router.config = [
        { path: 'path1', data: { cxRedirectTo: 'page1' } },
        { path: 'path2', data: { cxRedirectTo: 'page2' } }
      ];
      loader.routesConfig.translations = {
        default: {
          page1: { paths: ['path100'] },
          page2: { paths: ['path200'] }
        }
      };
      service.translateRouterConfig('testUnknownLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[0].redirectTo).toEqual('path100');
      expect(router.config[1].path).toEqual('path2');
      expect(router.config[1].redirectTo).toEqual('path200');
    });

    it('should console.warn in non-production environment if there are no translations for given language code', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      service.translateRouterConfig('testUnknownLanguage');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if there are no translations for given language code', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      service.translateRouterConfig('testUnknownLanguage');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should console.warn in non-production environment if a route has configurable both "path" and "redirectTo"', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      router.config = [
        { path: null, data: { cxPath: 'page1', cxRedirectTo: 'page2' } }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(console.warn).toHaveBeenCalled();
    });
    it('should NOT console.warn in production environment if a route has configurable both "path" and "redirectTo"', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      router.config = [
        { path: null, data: { cxPath: 'page1', cxRedirectTo: 'page2' } }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should generate many routes with different paths when translations config contain many paths for a given page', () => {
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1', 'path100'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config.length).toEqual(2);
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path100');
    });

    it('should generate route for "redirectTo" with with first configured path in translations config for a given page', () => {
      router.config = [
        { path: 'path', redirectTo: null, data: { cxRedirectTo: 'page1' } }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1', 'path100'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config.length).toEqual(1);
      expect(router.config[0].redirectTo).toEqual('path1');
    });

    it('should not generate routes if they do not have configured paths in translations config', () => {
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      loader.routesConfig.translations = {
        testLanguage: {
          page1: null
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config.length).toEqual(0);
    });

    it('should console.warn in non-production environment if route refers a page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      loader.routesConfig.translations = {
        testLanguage: {}
      };
      service.translateRouterConfig('testLanguage');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if route refers a page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      loader.routesConfig.translations = {
        testLanguage: {}
      };
      service.translateRouterConfig('testLanguage');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should translate configurable routes placed among non-cofigurable routes', () => {
      router.config = [
        // normal routes
        { path: 'path1' },

        // configurable routes
        { path: null, data: { cxPath: 'page2' } },

        // normal routes
        { path: 'path3', redirectTo: 'path30' },

        // configurable routes
        { path: 'path4', redirectTo: null, data: { cxRedirectTo: 'page4' } },

        // normal routes
        { path: 'path5' }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          page2: { paths: ['path2', 'path20', 'path200'] },
          page4: { paths: ['path40', 'path400'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config.length).toBe(7);
      expect(router.config).toEqual([
        // normal routes
        { path: 'path1' },

        // configurable routes
        { path: 'path2', data: { cxPath: 'page2' } },
        { path: 'path20', data: { cxPath: 'page2' } },
        { path: 'path200', data: { cxPath: 'page2' } },

        // normal routes
        { path: 'path3', redirectTo: 'path30' },

        // configurable routes
        {
          path: 'path4',
          redirectTo: 'path40',
          data: { cxRedirectTo: 'page4' }
        },

        // normal routes
        { path: 'path5' }
      ]);
    });

    it('should move wildcard route to the end of the list, even after custom route', () => {
      router.config = [
        { path: null, data: { cxPath: 'testWildcardRoute' } },
        { path: null, data: { cxPath: 'page1' } },
        { path: 'custom-route' }
      ];
      loader.routesConfig.translations = {
        testLanguage: {
          testWildcardRoute: { paths: ['**'] },
          page1: { paths: ['path1'] }
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(router.config).toEqual([
        { path: 'path1', data: { cxPath: 'page1' } },
        { path: 'custom-route' },
        { path: '**', data: { cxPath: 'testWildcardRoute' } }
      ]);
    });
  });

  describe('getNestedRoutesTranslations', () => {
    it('should return configured paths translations for given page name', () => {
      loader.routesConfig.translations = {
        testLanguage: {
          page1: { paths: ['path1', 'path10'] }
        }
      };
      const expectedResult = [{ paths: ['path1', 'path10'] }];
      service.translateRouterConfig('testLanguage');
      expect(service.getNestedRoutesTranslations(['page1'])).toEqual(
        expectedResult
      );
    });

    it('should console.warn in non-production environment if given page name does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      loader.routesConfig.translations = {
        testLanguage: {}
      };
      service.translateRouterConfig('testLanguage');
      expect(service.getNestedRoutesTranslations(['page1'])).toBe(null);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in non-production environment if given page name has "null" in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      loader.routesConfig.translations = {
        testLanguage: {
          page1: null
        }
      };
      service.translateRouterConfig('testLanguage');
      expect(service.getNestedRoutesTranslations(['page1'])).toBe(null);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if given page name does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      loader.routesConfig.translations = {
        testLanguage: {}
      };
      service.translateRouterConfig('testLanguage');
      expect(service.getNestedRoutesTranslations(['page1'])).toBe(null);
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
