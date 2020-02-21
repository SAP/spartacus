import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { RoutingConfigService } from './routing-config.service';

class MockRoutingConfigService {
  getRouteConfig() {}
}

class MockRouter {
  config: Routes;
  resetConfig(newConfig): void {
    this.config = newConfig;
  }
}

class MockUrlMatcherFactoryService {
  getMultiplePathsUrlMatcher = jasmine
    .createSpy('getMultiplePathsUrlMatcher')
    .and.callFake(paths => paths);
  getFalsyUrlMatcher = jasmine
    .createSpy('getFalsyUrlMatcher')
    .and.returnValue(false);
}

describe('ConfigurableRoutesService', () => {
  let service: ConfigurableRoutesService;
  let router: Router;
  let routingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurableRoutesService,
        {
          provide: RoutingConfigService,
          useClass: MockRoutingConfigService,
        },
        {
          provide: UrlMatcherFactoryService,
          useClass: MockUrlMatcherFactoryService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    });

    service = TestBed.inject(ConfigurableRoutesService);
    router = TestBed.inject(Router);
    routingConfigService = TestBed.inject(RoutingConfigService);

    router.config = [];
  });

  describe('configureRouter', () => {
    it('should NOT configure "path" of routes that are NOT configurable', async () => {
      router.config = [{ path: 'path1' }, { path: 'path2' }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(undefined);
      await service.init();
      expect(router.config).toEqual([{ path: 'path1' }, { path: 'path2' }]);
    });

    it('should keep child routes for routes that are NOT configurable', async () => {
      router.config = [
        { path: 'path1' },
        { path: 'path2', children: [{ path: 'subPath' }] },
      ];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(undefined);
      await service.init();
      expect(router.config).toEqual([
        { path: 'path1' },
        { path: 'path2', children: [{ path: 'subPath' }] },
      ]);
    });

    it('should NOT configure "redirectTo" of routes that are NOT configurable', async () => {
      router.config = [
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' },
      ];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(undefined);
      await service.init();
      expect(router.config).toEqual([
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' },
      ]);
    });

    it('should generate route matching configured path', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
        paths: ['path1'],
      });
      await service.init();
      expect(router.config[0].path).toEqual('path1');
    });

    it('should generate route matching configured multiple paths', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
        paths: ['path1', 'path100'],
      });
      await service.init();
      expect(router.config[0].matcher).toEqual(['path1', 'path100']);
    });

    it('should generate route that will never match if there are no configured paths in config', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(null);
      await service.init();
      expect(router.config[0].matcher).toBe(false);
    });

    it('should generate route that will never match if it was disabled by config', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
        paths: ['path1', 'path100'],
        disabled: true,
      });
      await service.init();
      expect(router.config[0].matcher).toBe(false);
    });

    // tslint:disable-next-line:max-line-length
    it('should console.warn in non-production environment if route refers a page name that does not exist in config', async () => {
      spyOn(console, 'warn');
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(undefined);
      await service.init();
      expect(console.warn).toHaveBeenCalled();
    });

    // tslint:disable-next-line:max-line-length
    it('should NOT console.warn in production environment if route refers a page name that does not exist in config', async () => {
      spyOn(console, 'warn');
      spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(undefined);
      await service.init();
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should configure configurable routes placed among non-configurable routes', async () => {
      router.config = [
        // normal routes
        { path: 'path1' },

        // configurable routes
        { path: null, data: { cxRoute: 'page2' } },

        // normal routes
        { path: 'path3', redirectTo: 'path30' },

        // configurable routes
        { path: null, data: { cxRoute: 'page4' } },

        // normal routes
        { path: 'path5' },
      ];
      spyOn(routingConfigService, 'getRouteConfig').and.returnValues(
        { paths: ['path2', 'path20', 'path200'] },
        { paths: ['path4'] }
      );
      await service.init();
      expect(router.config).toEqual([
        // normal routes
        { path: 'path1' },

        // configurable routes
        {
          data: { cxRoute: 'page2' },
          matcher: ['path2', 'path20', 'path200'] as any,
        },

        // normal routes
        { path: 'path3', redirectTo: 'path30' },

        // configurable routes
        {
          path: 'path4',
          data: { cxRoute: 'page4' },
        },

        // normal routes
        { path: 'path5' },
      ]);
    });
  });
});
