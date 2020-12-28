import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { LayoutConfig } from '../../config/layout-config';
import { LaunchRoute, LAUNCH_CALLER } from '../config/index';
import { RoutingRenderStrategy } from './routing-render.strategy';

const mockLaunchConfig: LayoutConfig = {
  launch: {
    TEST_URL: {
      cxRoute: 'url',
    },
    TEST_URL_PARAMS: {
      cxRoute: 'url',
      params: ['test'],
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      component: {},
    },
  },
};

class MockRoutingService {
  go() {}
}

describe('RoutingRenderStrategy', () => {
  let service: RoutingRenderStrategy;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutingRenderStrategy,
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.inject(RoutingRenderStrategy);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'go');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    it('should call RoutingService go', () => {
      const config = mockLaunchConfig.launch['TEST_URL'] as LaunchRoute;

      service.render(config, 'TEST_URL' as LAUNCH_CALLER);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
      });
    });

    it('should include params', () => {
      const config = mockLaunchConfig.launch['TEST_URL_PARAMS'] as LaunchRoute;

      service.render(config, 'TEST_URL_PARAMS' as LAUNCH_CALLER);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
        params: config.params,
      });
    });
  });

  describe('match', () => {
    it('should return TRUE for an inline config', () => {
      const config = mockLaunchConfig.launch['TEST_URL'] as LaunchRoute;
      expect(service.hasMatch(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockLaunchConfig.launch['TEST_OUTLET'] as LaunchRoute;
      expect(service.hasMatch(config)).toBeFalsy();
    });
  });
});
