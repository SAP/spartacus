import { TestBed } from '@angular/core/testing';
import { OutletPosition, OutletService } from '../../../../cms-structure/index';
import { TriggerConfig, TriggerOutletMapping } from '../config';
import { OutletRenderStrategy } from './outlet-render-strategy.service';

const mockTriggerConfig: TriggerConfig = {
  trigger: {
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      position: OutletPosition.AFTER,
    },
    TEST_OUTLET_NP: {
      outlet: 'cx-outlet-test',
    },
  },
};

const testTemplate = {} as any;

class MockOutletService {
  add() {}
}

describe('OutletRenderStrategy', () => {
  let service: OutletRenderStrategy;
  let outletService: OutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OutletRenderStrategy,
        { provide: OutletService, useClass: MockOutletService },
      ],
    });

    service = TestBed.get(OutletRenderStrategy);
    outletService = TestBed.get(OutletService);

    spyOn(outletService, 'add');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    it('should add template to outlet', () => {
      const config = mockTriggerConfig.trigger[
        'TEST_OUTLET'
      ] as TriggerOutletMapping;
      service.render(config, testTemplate);

      expect(outletService.add).toHaveBeenCalledWith(
        config.outlet,
        testTemplate,
        config.position
      );
    });

    it('should default to position BEFORE if one is not provided', () => {
      const config = mockTriggerConfig.trigger[
        'TEST_OUTLET_NP'
      ] as TriggerOutletMapping;
      service.render(config, testTemplate);

      expect(outletService.add).toHaveBeenCalledWith(
        config.outlet,
        testTemplate,
        OutletPosition.BEFORE
      );
    });
  });
});
