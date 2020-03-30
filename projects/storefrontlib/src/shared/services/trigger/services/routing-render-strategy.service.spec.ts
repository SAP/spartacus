import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import {
  TriggerConfig,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/index';
import { RoutingRenderStrategy } from './routing-render-strategy.service';

const mockTriggerConfig: TriggerConfig = {
  trigger: {
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

    service = TestBed.get(RoutingRenderStrategy);
    routingService = TestBed.get(RoutingService);

    spyOn(routingService, 'go');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    it('should call RoutingService go', () => {
      const config = mockTriggerConfig.trigger['TEST_URL'] as TriggerUrlMapping;

      service.render(config, 'TEST_URL' as TRIGGER_CALLER);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
      });
    });

    it('should include params', () => {
      const config = mockTriggerConfig.trigger[
        'TEST_URL_PARAMS'
      ] as TriggerUrlMapping;

      service.render(config, 'TEST_URL_PARAMS' as TRIGGER_CALLER);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
        params: config.params,
      });
    });
  });

  describe('match', () => {
    it('should return TRUE for an inline config', () => {
      const config = mockTriggerConfig.trigger['TEST_URL'] as TriggerUrlMapping;
      expect(service.match(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockTriggerConfig.trigger[
        'TEST_OUTLET'
      ] as TriggerUrlMapping;
      expect(service.match(config)).toBeFalsy();
    });
  });
});
