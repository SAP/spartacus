import { Component, ComponentFactoryResolver } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OutletRendererService } from 'projects/storefrontlib/src/cms-structure/outlet/outlet-renderer.serivce';
import { OutletPosition, OutletService } from '../../../../cms-structure/index';
import { TriggerConfig, TriggerOutletMapping, TRIGGER_CALLER } from '../config';
import { OutletRenderStrategy } from './outlet-render-strategy.service';

@Component({
  template: '',
})
class TestContainerComponent {}

const mockTriggerConfig: TriggerConfig = {
  trigger: {
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      position: OutletPosition.AFTER,
      component: TestContainerComponent,
    },
    TEST_OUTLET_NP: {
      outlet: 'cx-outlet-test',
      component: TestContainerComponent,
    },
  },
};

const testTemplate = {} as any;

class MockOutletService {
  add() {}
}

class MockOutletRendererService {
  render(_outlet: string) {}
}

class MockComponentFactoryResolver {
  resolveComponentFactory() {
    return testTemplate;
  }
}

describe('OutletRenderStrategy', () => {
  let service: OutletRenderStrategy;
  let outletService: OutletService;
  let outletRendererService: OutletRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OutletRenderStrategy,
        { provide: OutletService, useClass: MockOutletService },
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        { provide: OutletRendererService, useClass: MockOutletRendererService },
      ],
    });

    service = TestBed.get(OutletRenderStrategy);
    outletService = TestBed.get(OutletService);
    outletRendererService = TestBed.get(OutletRendererService);

    spyOn(outletService, 'add');
    spyOn(outletRendererService, 'render');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    describe('should render', () => {
      beforeAll(() => {
        spyOn<any>(service, 'shouldRender').and.returnValue(true);
      });

      it('should add template to outlet', () => {
        const config = mockTriggerConfig.trigger[
          'TEST_OUTLET'
        ] as TriggerOutletMapping;
        service.render(config, 'TEST_OUTLET' as TRIGGER_CALLER);

        expect(outletService.add).toHaveBeenCalledWith(
          config.outlet,
          testTemplate,
          config.position
        );

        expect(outletRendererService.render).toHaveBeenCalledWith(
          config.outlet
        );
      });

      it('should default to position BEFORE if one is not provided', () => {
        const config = mockTriggerConfig.trigger[
          'TEST_OUTLET_NP'
        ] as TriggerOutletMapping;
        service.render(config, 'TEST_OUTLET_NP' as TRIGGER_CALLER);

        expect(outletService.add).toHaveBeenCalledWith(
          config.outlet,
          testTemplate,
          OutletPosition.BEFORE
        );

        expect(outletRendererService.render).toHaveBeenCalledWith(
          config.outlet
        );
      });
    });
    describe('should not render', () => {
      beforeAll(() => {
        spyOn<any>(service, 'shouldRender').and.returnValue(false);
      });

      it('should not render', () => {
        expect(outletService.add).not.toHaveBeenCalled();
        expect(outletRendererService.render).not.toHaveBeenCalled();
      });
    });
  });
});
