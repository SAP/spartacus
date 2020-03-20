import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OutletPosition } from '../../../../cms-structure/outlet/index';
import {
  TriggerConfig,
  TriggerOutletMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/trigger-config';
import { InlineRenderStrategy } from './inline-render-strategy.service';
import { OutletRenderStrategy } from './outlet-render-strategy.service';
import { RoutingRenderStrategy } from './routing-render-strategy.service';
import { TriggerService } from './trigger.service';

const mockTriggerConfig: TriggerConfig = {
  trigger: {
    TEST_INLINE: {
      inline: true,
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      position: OutletPosition.AFTER,
    },
    TEST_MULTI: {
      outlet: 'cx-outlet1',
      multi: true,
    },
    TEST_URL: {
      cxRoute: 'url',
    },
  },
};

const testTemplate = {} as ComponentFactory<any>;
const mockVcr = {} as ViewContainerRef;

class MockRenderService {
  render() {}
}

class MockComponentFactoryResolver {
  resolveComponentFactory() {
    return testTemplate;
  }
}

@Component({
  template: '',
})
class TestContainerComponent {}

describe('TriggerService', () => {
  let service: TriggerService;
  let outletRenderService: OutletRenderStrategy;
  let inlineRenderService: InlineRenderStrategy;
  let routingRenderService: RoutingRenderStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TriggerService,
        { provide: OutletRenderStrategy, useClass: MockRenderService },
        { provide: InlineRenderStrategy, useClass: MockRenderService },
        { provide: RoutingRenderStrategy, useClass: MockRenderService },
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        { provide: TriggerConfig, useValue: mockTriggerConfig },
      ],
    });

    service = TestBed.inject(TriggerService);
    outletRenderService = TestBed.inject(OutletRenderStrategy);
    inlineRenderService = TestBed.inject(InlineRenderStrategy);
    routingRenderService = TestBed.inject(RoutingRenderStrategy);

    spyOn(outletRenderService, 'render');
    spyOn(inlineRenderService, 'render');
    spyOn(routingRenderService, 'render');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render outlet', () => {
    it('should call outlet render service with template', () => {
      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletRenderService.render).toHaveBeenCalledWith(
        mockTriggerConfig.trigger['TEST_OUTLET'] as TriggerOutletMapping,
        testTemplate
      );
    });

    it('should render only once by default', () => {
      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletRenderService.render).toHaveBeenCalledTimes(1);
    });

    it('should render multiple times if multi=true', () => {
      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletRenderService.render).toHaveBeenCalledTimes(3);
    });
  });

  describe('render inline', () => {
    it('should call inline render service with template and view container ref', () => {
      service.render(
        'TEST_INLINE' as TRIGGER_CALLER,
        TestContainerComponent,
        mockVcr
      );

      expect(inlineRenderService.render).toHaveBeenCalledWith(
        testTemplate,
        mockVcr
      );
    });
  });

  describe('render url', () => {
    it('should call routing render service', () => {
      service.render('TEST_URL' as TRIGGER_CALLER);
      expect(routingRenderService.render).toHaveBeenCalledWith(
        mockTriggerConfig.trigger['TEST_URL'] as TriggerUrlMapping
      );
    });
  });
});
