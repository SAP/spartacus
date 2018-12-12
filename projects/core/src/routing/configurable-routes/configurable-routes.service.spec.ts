import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../config/server-config/server-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { Router, Routes } from '@angular/router';
import { ConfigurableRoutes } from './configurable-route';
import { RoutesConfig } from './routes-config';

class MockServerConfig extends ServerConfig {
  production = false;
}
const mockRoutesConfigLoader: { routesConfig: RoutesConfig } = {
  routesConfig: {
    translations: {
      default: {}
    },
    parameterNamesMapping: {}
  }
};
// const mockServerConfig: ServerConfig = { production: false };
class MockRouter {
  config: Routes | ConfigurableRoutes;
  resetConfig(newConfig): void {
    this.config = newConfig;
  }
}

describe('ConfigurableRoutesService', () => {
  let service: ConfigurableRoutesService;
  let serverConfig: MockServerConfig;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurableRoutesService,
        {
          provide: RoutesConfigLoader,
          useValue: mockRoutesConfigLoader
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

    router.config = [];
  });

  it('should get routes config from loader', () => {
    expect(service['_routesConfig']).toEqual(
      mockRoutesConfigLoader.routesConfig
    );
  });

  describe('changeLanguage', () => {
    it('should NOT translate "paths" of routes that are NOT configurable', () => {
      router.config = [{ path: 'path1' }, { path: 'path2' }];
      service.changeLanguage('default');
      expect(router.config).toEqual([{ path: 'path1' }, { path: 'path2' }]);
    });

    it('should NOT translate "redirectTo" of routes that are NOT configurable', () => {
      router.config = [
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' }
      ];
      service.changeLanguage('default');
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
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1'],
          page2: ['path2']
        }
      };
      service.changeLanguage('testLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path2');
    });

    it('should translate "redirectTo" of configurable routes using translations for given language code', () => {
      router.config = [
        { path: 'path1', data: { cxRedirectTo: 'page1' } },
        { path: 'path2', data: { cxRedirectTo: 'page2' } }
      ];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path100'],
          page2: ['path200']
        }
      };
      service.changeLanguage('testLanguage');
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
      service['_routesConfig'].translations = {
        default: {
          page1: ['path1'],
          page2: ['path2']
        }
      };
      service.changeLanguage('testUnknownLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path2');
    });

    it('should translate "redirectTo" of configurable routes using "default" translations if unknown language code was given', () => {
      spyOn(console, 'warn');
      router.config = [
        { path: 'path1', data: { cxRedirectTo: 'page1' } },
        { path: 'path2', data: { cxRedirectTo: 'page2' } }
      ];
      service['_routesConfig'].translations = {
        default: {
          page1: ['path100'],
          page2: ['path200']
        }
      };
      service.changeLanguage('testUnknownLanguage');
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[0].redirectTo).toEqual('path100');
      expect(router.config[1].path).toEqual('path2');
      expect(router.config[1].redirectTo).toEqual('path200');
    });

    it('should console.warn in non-production environment if there are no translations for given language code', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      service.changeLanguage('testUnknownLanguage');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if there are no translations for given language code', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      service.changeLanguage('testUnknownLanguage');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should console.warn in non-production environment if a route has configurable both "path" and "redirectTo"', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      router.config = [
        { path: null, data: { cxPath: 'page1', cxRedirectTo: 'page2' } }
      ];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1'],
          page2: ['path2']
        }
      };
      service.changeLanguage('testLanguage');
      expect(console.warn).toHaveBeenCalled();
    });
    it('should NOT console.warn in production environment if a route has configurable both "path" and "redirectTo"', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      router.config = [
        { path: null, data: { cxPath: 'page1', cxRedirectTo: 'page2' } }
      ];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1'],
          page2: ['path2']
        }
      };
      service.changeLanguage('testLanguage');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should generate many routes with different paths when translations config contain many paths for a given page', () => {
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1', 'path100']
        }
      };
      service.changeLanguage('testLanguage');
      expect(router.config.length).toEqual(2);
      expect(router.config[0].path).toEqual('path1');
      expect(router.config[1].path).toEqual('path100');
    });

    it('should generate route for "redirectTo" with with first configured path in translations config for a given page', () => {
      router.config = [
        { path: 'path', redirectTo: null, data: { cxRedirectTo: 'page1' } }
      ];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1', 'path100']
        }
      };
      service.changeLanguage('testLanguage');
      expect(router.config.length).toEqual(1);
      expect(router.config[0].redirectTo).toEqual('path1');
    });

    it('should not generate routes if they do not have configured paths in translations config', () => {
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: null
        }
      };
      service.changeLanguage('testLanguage');
      expect(router.config.length).toEqual(0);
    });

    it('should console.warn in non-production environment if route refers a page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      service['_routesConfig'].translations = {
        testLanguage: {}
      };
      service.changeLanguage('testLanguage');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if route refers a page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      router.config = [{ path: null, data: { cxPath: 'page1' } }];
      service['_routesConfig'].translations = {
        testLanguage: {}
      };
      service.changeLanguage('testLanguage');
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
      service['_routesConfig'].translations = {
        testLanguage: {
          page2: ['path2', 'path20', 'path200'],
          page4: ['path40', 'path400']
        }
      };
      service.changeLanguage('testLanguage');
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
  });

  describe('getPathsForPage', () => {
    it('should return configured paths translations for given page name', () => {
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: ['path1', 'path10']
        }
      };
      service.changeLanguage('testLanguage');
      expect(service.getPathsForPage('page1')).toEqual(['path1', 'path10']);
    });

    it('should console.warn in non-production environment if given page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      service['_routesConfig'].translations = {
        testLanguage: {}
      };
      service.changeLanguage('testLanguage');
      expect(service.getPathsForPage('page1')).toBe(undefined);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should NOT console.warn in non-production environment if given page name has "null" in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = false;
      service['_routesConfig'].translations = {
        testLanguage: {
          page1: null
        }
      };
      service.changeLanguage('testLanguage');
      expect(service.getPathsForPage('page1')).toBe(null);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should NOT console.warn in production environment if given page name that does not exist in translations config', () => {
      spyOn(console, 'warn');
      serverConfig.production = true;
      service['_routesConfig'].translations = {
        testLanguage: {}
      };
      service.changeLanguage('testLanguage');
      expect(service.getPathsForPage('page1')).toBe(undefined);
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('getParameterNamesMapping', () => {
    it('should return configured parameter names mapping for given page name', () => {
      service['_routesConfig'].parameterNamesMapping = {
        page1: {
          param1: 'otherParam1',
          param10: 'otherParam10'
        },
        page2: {
          param2: 'otherParam2'
        }
      };
      expect(service.getParameterNamesMapping('page1')).toEqual({
        param1: 'otherParam1',
        param10: 'otherParam10'
      });
    });
    it('should return empty object if there are no configured parameter names mapping for given page name', () => {
      service['_routesConfig'].parameterNamesMapping = {};
      expect(service.getParameterNamesMapping('page1')).toEqual({});
    });
  });
});
