import { TestBed } from '@angular/core/testing';
import { RoutingConfig } from './config/routing-config';
import { RoutesConfig } from './routes-config';
import { RoutingConfigService } from './routing-config.service';

class MockRoutingConfig {
  routing: { routes: RoutesConfig } = {
    routes: {
      page1: { paths: ['path1', 'path10'] },
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
});
