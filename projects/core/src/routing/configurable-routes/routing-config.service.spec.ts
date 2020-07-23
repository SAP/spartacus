import { TestBed } from '@angular/core/testing';
import { RouteLoadStrategy, RoutingConfig } from './config/routing-config';
import { RoutingConfigService } from './routing-config.service';

class MockRoutingConfig extends RoutingConfig {
  routing = {
    routes: {
      page1: { paths: ['path1', 'path10'] },
    },
    loadStrategy: RouteLoadStrategy.ONCE,
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

    service = TestBed.inject(RoutingConfigService);
  });

  describe('getRouteConfig', () => {
    it('should return configured paths for given route name', async () => {
      service['_routesConfig'] = {
        page1: { paths: ['path1', 'path10'] },
      };
      const expectedResult = { paths: ['path1', 'path10'] };
      expect(service.getRouteConfig('page1')).toEqual(expectedResult);
    });
  });

  describe('getLoadStrategy', () => {
    it('should return default load strategy', async () => {
      const config = TestBed.inject(RoutingConfig);
      delete config.routing.loadStrategy;
      expect(service.getLoadStrategy()).toEqual(RouteLoadStrategy.ALWAYS);
    });

    it('should return load strategy', async () => {
      expect(service.getLoadStrategy()).toEqual(RouteLoadStrategy.ONCE);
    });
  });

  describe('getRouteName', () => {
    it('should return the route name for the given path', () => {
      expect(service.getRouteName('path1')).toBe('page1');
    });

    it('should return the route name for the given path alias', () => {
      expect(service.getRouteName('path10')).toBe('page1');
    });

    it('should return undefined for unknown path', () => {
      expect(service.getRouteName('path/unknown')).toBe(undefined);
    });
  });
});
