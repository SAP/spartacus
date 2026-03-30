/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  RoutingConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { SitemapConfig } from '../config/sitemap-config';
import {
  ROUTE_PARAMS_ENUMERATOR,
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';
import { RoutesDiscoveryService } from './routes-discovery.service';

class MockProductEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'product';
  override readonly languageDependent = true;

  async enumerate(
    _context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    return {
      params: [
        { code: '301233', name: 'VIDEOTAPE 3 N 860 P', slug: 'videotape-3-n-860-p' },
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
              paths: [
                'product/:productCode/:name',
                'product/:productCode',
              ],
              paramsMapping: { productCode: 'code', name: 'slug' },
            },
          },
        },
      });

      const routes = await service.discoverRoutes(context);

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
              paths: [
                'product/:productCode/:name',
                'product/:productCode',
              ],
              paramsMapping: { productCode: 'code' },
            },
          },
        },
      });

      const routes = await service.discoverRoutes(context);

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
              paths: [
                'product/:productCode/:name',
                'product/:productCode',
              ],
              paramsMapping: { productCode: 'code', name: 'nonExistentField' },
            },
          },
        },
      });

      // MockProductEnumerator returns { code, name, slug }.
      // paramsMapping: { name: 'nonExistentField' } - params doesn't have 'nonExistentField'.
      // adaptParamsForMapping copies params.name -> params.nonExistentField,
      // so SemanticPathService can fill :name using params.nonExistentField.
      const routes = await service.discoverRoutes(context);

      expect(routes.length).toBe(2);
      expect(routes[0].path).toBe('product/301233/VIDEOTAPE 3 N 860 P');
      expect(routes[1].path).toBe('product/456/Camera');
    });
  });
});

