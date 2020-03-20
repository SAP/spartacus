import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { TriggerConfig, TriggerUrlMapping } from '../config/index';
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

      service.render(config);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
      });
    });

    it('should include params', () => {
      const config = mockTriggerConfig.trigger[
        'TEST_URL_PARAMS'
      ] as TriggerUrlMapping;

      service.render(config);

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: config.cxRoute,
        params: config.params,
      });
    });
  });
});
