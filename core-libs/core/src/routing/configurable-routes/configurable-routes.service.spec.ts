import { vi } from 'vitest';
import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from '../url-matcher';
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

const combinedUrlMatcher: UrlMatcher = () => null;

class MockUrlMatcherService implements Partial<UrlMatcherService> {
  getFromPaths = vi.fn()
    .mockImplementation((paths) => paths);
  getFalsy = vi.fn().mockReturnValue(false);
  getCombined = vi.fn()
    .mockReturnValue(combinedUrlMatcher);
}

const testUrlMatcherFromFactory: UrlMatcher = () => null;
const testUrlMatcherFactory: UrlMatcherFactory = vi.fn()
  .mockImplementation((_route: Route) => testUrlMatcherFromFactory);

const TEST_URL_MATCHER_FACTORY = new InjectionToken<UrlMatcherFactory>(
  'TEST_URL_MATCHER_FACTORY',
  { providedIn: 'root', factory: () => testUrlMatcherFactory }
);

describe('ConfigurableRoutesService', () => {
  let service: ConfigurableRoutesService;
  let router: Router;
  let routingConfigService: RoutingConfigService;
  let urlMatcherService: UrlMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurableRoutesService,
        {
          provide: RoutingConfigService,
          useClass: MockRoutingConfigService,
        },
        {
          provide: UrlMatcherService,
          useClass: MockUrlMatcherService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    });

    service = TestBed.inject(ConfigurableRoutesService);
    urlMatcherService = TestBed.inject(UrlMatcherService);
    router = TestBed.inject(Router);
    routingConfigService = TestBed.inject(RoutingConfigService);

    router.config = [];
  });

  describe('configureRouter', () => {
    it('should NOT configure "path" of routes that are NOT configurable', async () => {
      router.config = [{ path: 'path1' }, { path: 'path2' }];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce(undefined);
      await service.init();
      expect(router.config).toEqual([{ path: 'path1' }, { path: 'path2' }]);
    });

    it('should keep child routes for routes that are NOT configurable', async () => {
      router.config = [
        { path: 'path1' },
        { path: 'path2', children: [{ path: 'subPath' }] },
      ];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce(undefined);
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
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce(undefined);
      await service.init();
      expect(router.config).toEqual([
        { path: 'path1', redirectTo: 'path100' },
        { path: 'path2', redirectTo: 'path200' },
      ]);
    });

    it('should generate route matching configured path', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce({
        paths: ['path1'],
      });
      await service.init();
      expect(router.config[0].path).toEqual('path1');
    });

    it('should generate route matching configured multiple paths', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce({
        paths: ['path1', 'path100'],
      });
      await service.init();
      expect(router.config[0].matcher).toEqual(['path1', 'path100']);
    });

    it('should generate route that will never match if there are no configured paths in config', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce(null);
      await service.init();
      expect(router.config[0].matcher).toEqual([]);
    });

    it('should generate route that will never match if it was disabled by config', async () => {
      router.config = [{ path: null, data: { cxRoute: 'page1' } }];
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce({
        paths: ['path1', 'path100'],
        disabled: true,
      });
      await service.init();
      expect(router.config[0].matcher).toBe(false);
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
      vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce(
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

  it('should configure matchers over paths', async () => {
    const matcher1: UrlMatcher = () => null;
    const matcher2: UrlMatcher = () => null;

    router.config = [{ path: null, data: { cxRoute: 'page' } }];
    vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce({
      paths: ['path'],
      matchers: [matcher1, matcher2],
    });
    await service.init();
    expect(urlMatcherService.getCombined).toHaveBeenCalledWith([
      matcher1,
      matcher2,
    ]);
    expect(router.config[0]).toEqual({
      matcher: combinedUrlMatcher,
      data: { cxRoute: 'page' },
    });
  });

  it('should resolve token with url matcher factory and create url matcher based on route', async () => {
    const matcher1: UrlMatcher = () => null;
    const originalRoute = { path: null, data: { cxRoute: 'page' } };
    router.config = [originalRoute];
    vi.spyOn(routingConfigService, 'getRouteConfig').mockReturnValueOnce({
      paths: ['path'],
      matchers: [matcher1, TEST_URL_MATCHER_FACTORY],
    });
    vi.spyOn(service['injector'], 'get');

    await service.init();
    expect(service['injector'].get).toHaveBeenCalledWith(
      TEST_URL_MATCHER_FACTORY
    );
    expect(testUrlMatcherFactory).toHaveBeenCalledWith(originalRoute);
    expect(urlMatcherService.getCombined).toHaveBeenCalledWith([
      matcher1,
      testUrlMatcherFromFactory,
    ]);
    expect(router.config[0]).toEqual({
      matcher: combinedUrlMatcher,
      data: { cxRoute: 'page' },
    });
  });
});
