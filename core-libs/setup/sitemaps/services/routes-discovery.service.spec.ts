/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import { RoutingConfig, RoutingConfigService } from '@spartacus/core';
import { SitemapConfig } from '../config/sitemap-config';
import {
  ANGULAR_ROUTE_ENUMERATOR,
  AngularRouteEnumerator,
  AngularRouteEnumeratorContext,
  AngularRouteEnumeratorResult,
} from '../model/angular-route-enumerator';
import {
  ROUTE_PARAMS_ENUMERATOR,
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';
import { RoutesDiscoveryOptions } from '../model/sitemap.model';
import { RoutesDiscoveryService } from './routes-discovery.service';

class MockProductEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'product';
  override readonly languageDependent = true;

  async enumerate(
    _context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    return {
      params: [
        {
          code: '301233',
          name: 'VIDEOTAPE 3 N 860 P',
          slug: 'videotape-3-n-860-p',
        },
        { code: '456', name: 'Camera', slug: 'camera' },
      ],
    };
  }
}

class MockStaticEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = '*';

  async enumerate(): Promise<RouteParamsEnumeratorResult> {
    return { params: [{}] };
  }
}

describe('RoutesDiscoveryService', () => {
  let service: RoutesDiscoveryService;

  const context: RouteParamsEnumeratorContext = {
    baseSiteId: 'electronics-spa',
    language: 'en',
    currency: 'USD',
    occBaseUrl: 'http://localhost:9002',
  };

  const resolvedOptions: Required<
    Omit<RoutesDiscoveryOptions, 'include' | 'exclude'>
  > &
    Pick<RoutesDiscoveryOptions, 'include' | 'exclude'> = {
    includeAuthFlowRoutes: false,
    includeProtectedRoutes: false,
    include: undefined,
    exclude: undefined,
  };

  function configureTestBed(routingConfig: RoutingConfig) {
    TestBed.configureTestingModule({
      providers: [
        RoutesDiscoveryService,
        RoutingConfigService,
        {
          provide: RoutingConfig,
          useValue: routingConfig,
        },
        {
          provide: SitemapConfig,
          useValue: {
            sitemap: {
              maxUrlsPerSitemap: 50000,
              routes: {
                includeAuthFlowRoutes: false,
                includeProtectedRoutes: false,
                excludes: [],
              },
            },
          },
        },
        {
          provide: ROUTE_PARAMS_ENUMERATOR,
          useClass: MockProductEnumerator,
          multi: true,
        },
        {
          provide: ROUTE_PARAMS_ENUMERATOR,
          useClass: MockStaticEnumerator,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(RoutesDiscoveryService);
  }

  describe('adaptParamsForMapping', () => {
    it('should generate full URL path when paramsMapping is configured (name -> slug)', async () => {
      configureTestBed({
        routing: {
          routes: {
            product: {
              paths: ['product/:productCode/:name', 'product/:productCode'],
              paramsMapping: { productCode: 'code', name: 'slug' },
            },
          },
        },
      });

      const routes = await service.discoverSemanticRoutes(
        context,
        resolvedOptions
      );

      // With paramsMapping { name: 'slug' }, the enumerator returns { code, name, slug }.
      // adaptParamsForMapping should ensure SemanticPathService
      // can fill :name using params.slug.
      expect(routes.length).toBe(2);
      expect(routes[0].path).toBe('product/301233/videotape-3-n-860-p');
      expect(routes[1].path).toBe('product/456/camera');
    });

    it('should generate full URL path without paramsMapping (default behavior)', async () => {
      configureTestBed({
        routing: {
          routes: {
            product: {
              paths: ['product/:productCode/:name', 'product/:productCode'],
              paramsMapping: { productCode: 'code' },
            },
          },
        },
      });

      const routes = await service.discoverSemanticRoutes(
        context,
        resolvedOptions
      );

      // Without name->slug mapping, SemanticPathService uses params.name directly
      expect(routes.length).toBe(2);
      expect(routes[0].path).toBe('product/301233/VIDEOTAPE 3 N 860 P');
      expect(routes[1].path).toBe('product/456/Camera');
    });

    it('should fallback to shorter path when param value is truly missing', async () => {
      configureTestBed({
        routing: {
          routes: {
            product: {
              paths: ['product/:productCode/:name', 'product/:productCode'],
              paramsMapping: { productCode: 'code', name: 'nonExistentField' },
            },
          },
        },
      });

      // MockProductEnumerator returns { code, name, slug }.
      // paramsMapping: { name: 'nonExistentField' } - params doesn't have 'nonExistentField'.
      // adaptParamsForMapping copies params.name -> params.nonExistentField,
      // so SemanticPathService can fill :name using params.nonExistentField.
      const routes = await service.discoverSemanticRoutes(
        context,
        resolvedOptions
      );

      expect(routes.length).toBe(2);
      expect(routes[0].path).toBe('product/301233/VIDEOTAPE 3 N 860 P');
      expect(routes[1].path).toBe('product/456/Camera');
    });
  });
});

const defaultSitemapConfigValue = {
  sitemap: {
    maxUrlsPerSitemap: 50000,
    routes: {
      includeAuthFlowRoutes: false,
      includeProtectedRoutes: false,
      excludes: [],
    },
  },
};

const sharedContext: RouteParamsEnumeratorContext = {
  baseSiteId: 'electronics-spa',
  language: 'en',
  currency: 'USD',
  occBaseUrl: 'http://localhost:9002',
};

describe('discoverAllRoutes', () => {
  let service: RoutesDiscoveryService;

  function setup(
    routerConfig: Route[],
    sitemapConfig: any = defaultSitemapConfigValue,
    extraProviders: any[] = []
  ) {
    TestBed.configureTestingModule({
      providers: [
        RoutesDiscoveryService,
        RoutingConfigService,
        { provide: Router, useValue: { config: routerConfig } },
        { provide: RoutingConfig, useValue: { routing: { routes: {} } } },
        { provide: SitemapConfig, useValue: sitemapConfig },
        ...extraProviders,
      ],
    });
    service = TestBed.inject(RoutesDiscoveryService);
  }

  it('should exclude routes with data.cxRoute even when not semantically discovered (e.g. login excluded by authFlow)', async () => {
    // login is excluded from semantic discovery by includeAuthFlowRoutes:false,
    setup([
      { path: 'login', data: { cxRoute: 'login' } },
      { path: 'logout', data: { cxRoute: 'logout' } },
      { path: 'faq' },
    ]);

    const routes = await service.discoverAllRoutes(sharedContext);

    expect(routes.find((r) => r.path === 'login')).toBeUndefined();
    expect(routes.find((r) => r.path === 'logout')).toBeUndefined();
    expect(routes.find((r) => r.path === 'faq')).toBeDefined();
  });

  it('should exclude ** wildcard routes', async () => {
    setup([{ path: '**' }, { path: 'faq' }]);

    const routes = await service.discoverAllRoutes(sharedContext);

    expect(routes.map((r) => r.path)).toEqual(['faq']);
  });

  it('should exclude matcher-only routes with no path', async () => {
    setup([{ matcher: () => null } as Route, { path: 'faq' }]);

    const routes = await service.discoverAllRoutes(sharedContext);

    expect(routes.map((r) => r.path)).toEqual(['faq']);
  });

  it('should respect the include option', async () => {
    setup([{ path: 'faq' }, { path: 'about' }, { path: 'terms' }]);

    const routes = await service.discoverAllRoutes(sharedContext, {
      include: ['faq', 'about'],
    });

    expect(routes.map((r) => r.path)).toEqual(['faq', 'about']);
  });

  it('should respect the exclude option', async () => {
    setup([{ path: 'faq' }, { path: 'about' }]);

    const routes = await service.discoverAllRoutes(sharedContext, {
      exclude: ['about'],
    });

    expect(routes.map((r) => r.path)).toEqual(['faq']);
  });

  it('should respect config excludes from SitemapConfig', async () => {
    setup([{ path: 'faq' }, { path: 'about' }], {
      sitemap: {
        ...defaultSitemapConfigValue.sitemap,
        routes: {
          ...defaultSitemapConfigValue.sitemap.routes,
          excludes: ['about'],
        },
      },
    });

    const routes = await service.discoverAllRoutes(sharedContext);

    expect(routes.map((r) => r.path)).toEqual(['faq']);
  });

  it('should combine semantic and angular-only routes', async () => {
    setup([{ path: 'faq' }]);

    jest
      .spyOn(service, 'discoverSemanticRoutes')
      .mockResolvedValue([{ cxRoute: 'home', params: {}, path: '' }]);

    const routes = await service.discoverAllRoutes(sharedContext);

    expect(routes.find((r) => r.cxRoute === 'home')).toBeDefined();
    expect(routes.find((r) => r.path === 'faq')).toBeDefined();
  });
});

describe('discoverAngularRoutes', () => {
  let service: RoutesDiscoveryService;

  function setup(angularEnumerators: any[] = []) {
    TestBed.configureTestingModule({
      providers: [
        RoutesDiscoveryService,
        RoutingConfigService,
        { provide: Router, useValue: { config: [] } },
        { provide: RoutingConfig, useValue: { routing: { routes: {} } } },
        { provide: SitemapConfig, useValue: defaultSitemapConfigValue },
        ...angularEnumerators,
      ],
    });
    service = TestBed.inject(RoutesDiscoveryService);
  }

  function discover(route: Route) {
    return (service as any).discoverAngularRoutes(route, sharedContext);
  }

  it('should return [] for a route with no path', async () => {
    setup();
    expect(await discover({})).toEqual([]);
  });

  it('should return a single entry for a static leaf route', async () => {
    setup();
    expect(await discover({ path: 'faq' })).toEqual([
      { cxRoute: 'faq', params: {}, path: 'faq' },
    ]);
  });

  it('should return [] for a parameterized route with no matching enumerator', async () => {
    setup();
    expect(await discover({ path: 'help/:topicId' })).toEqual([]);
  });

  it('should return enumerated paths for a parameterized route with a matching enumerator', async () => {
    class HelpEnumerator extends AngularRouteEnumerator {
      readonly routePath = 'help/:topicId';
      async enumerate(
        _context: AngularRouteEnumeratorContext
      ): Promise<AngularRouteEnumeratorResult> {
        return { paths: ['help/angular', 'help/typescript'] };
      }
    }
    setup([
      {
        provide: ANGULAR_ROUTE_ENUMERATOR,
        useClass: HelpEnumerator,
        multi: true,
      },
    ]);

    const result = await discover({ path: 'help/:topicId' });

    expect(result).toEqual([
      { cxRoute: 'help/:topicId', params: {}, path: 'help/angular' },
      { cxRoute: 'help/:topicId', params: {}, path: 'help/typescript' },
    ]);
  });

  it('should filter out enumerated paths that still contain unenumerated :params', async () => {
    class BuggyEnumerator extends AngularRouteEnumerator {
      readonly routePath = 'help/:topicId';
      async enumerate(
        _context: AngularRouteEnumeratorContext
      ): Promise<AngularRouteEnumeratorResult> {
        return { paths: ['help/angular', 'help/:topicId'] };
      }
    }
    setup([
      {
        provide: ANGULAR_ROUTE_ENUMERATOR,
        useClass: BuggyEnumerator,
        multi: true,
      },
    ]);

    const result = await discover({ path: 'help/:topicId' });

    expect(result).toEqual([
      { cxRoute: 'help/:topicId', params: {}, path: 'help/angular' },
    ]);
  });

  it('should prepend a static parent path to all discovered children', async () => {
    setup();
    const route: Route = {
      path: 'account',
      children: [{ path: 'orders' }, { path: 'profile' }],
    };

    const result = await discover(route);

    expect(result).toEqual([
      { cxRoute: 'orders', params: {}, path: 'account/orders' },
      { cxRoute: 'profile', params: {}, path: 'account/profile' },
    ]);
  });

  it('should combine enumerated parent paths with children for a parameterized parent', async () => {
    class AccountEnumerator extends AngularRouteEnumerator {
      readonly routePath = 'account/:userId';
      async enumerate(
        _context: AngularRouteEnumeratorContext
      ): Promise<AngularRouteEnumeratorResult> {
        return { paths: ['account/u1', 'account/u2'] };
      }
    }
    setup([
      {
        provide: ANGULAR_ROUTE_ENUMERATOR,
        useClass: AccountEnumerator,
        multi: true,
      },
    ]);
    const route: Route = {
      path: 'account/:userId',
      children: [{ path: 'orders' }, { path: 'profile' }],
    };

    const result = await discover(route);

    expect(result).toEqual([
      { cxRoute: 'orders', params: {}, path: 'account/u1/orders' },
      { cxRoute: 'profile', params: {}, path: 'account/u1/profile' },
      { cxRoute: 'orders', params: {}, path: 'account/u2/orders' },
      { cxRoute: 'profile', params: {}, path: 'account/u2/profile' },
    ]);
  });

  it('should return [] for a parameterized parent with children but no enumerator', async () => {
    setup();
    const route: Route = {
      path: 'account/:userId',
      children: [{ path: 'orders' }],
    };

    expect(await discover(route)).toEqual([]);
  });

  it('should filter out enumerated parent paths that still contain unenumerated :params', async () => {
    class BuggyParentEnumerator extends AngularRouteEnumerator {
      readonly routePath = 'account/:userId';
      async enumerate(
        _context: AngularRouteEnumeratorContext
      ): Promise<AngularRouteEnumeratorResult> {
        return { paths: ['account/u1', 'account/:userId'] };
      }
    }
    setup([
      {
        provide: ANGULAR_ROUTE_ENUMERATOR,
        useClass: BuggyParentEnumerator,
        multi: true,
      },
    ]);
    const route: Route = {
      path: 'account/:userId',
      children: [{ path: 'orders' }],
    };

    const result = await discover(route);

    expect(result).toEqual([
      { cxRoute: 'orders', params: {}, path: 'account/u1/orders' },
    ]);
  });

  it('should handle nested static children recursively', async () => {
    setup();
    const route: Route = {
      path: 'help',
      children: [
        {
          path: 'guides',
          children: [{ path: 'overview' }, { path: 'advanced' }],
        },
      ],
    };

    const result = await discover(route);

    expect(result).toEqual([
      { cxRoute: 'overview', params: {}, path: 'help/guides/overview' },
      { cxRoute: 'advanced', params: {}, path: 'help/guides/advanced' },
    ]);
  });
});
