import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  TriggerConfig,
  TriggerInlineMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/trigger-config';
import { RenderStrategy } from './render.strategy';
import { TriggerService } from './trigger.service';

const mockTriggerConfig: TriggerConfig = {
  trigger: {
    TEST_INLINE: {
      inline: true,
      component: {},
    },
    TEST_URL: {
      cxRoute: 'url',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
class MockRoutingRenderStrategy extends RenderStrategy {
  public render(
    _config: TriggerUrlMapping,
    _caller: TRIGGER_CALLER,
    _vcr?: ViewContainerRef
  ) {}

  public isStrategyForConfiguration(config: TriggerUrlMapping) {
    return Boolean(config.cxRoute);
  }
}

@Injectable({
  providedIn: 'root',
})
class MockInlineRenderStrategy extends RenderStrategy {
  public render(
    _config: TriggerInlineMapping,
    _caller: TRIGGER_CALLER,
    _vcr: ViewContainerRef
  ) {}

  public isStrategyForConfiguration(config: TriggerInlineMapping) {
    return Boolean(config.inline);
  }
}

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('TriggerService', () => {
  let service: TriggerService;
  let routingRenderStrategy: MockRoutingRenderStrategy;
  let inlineRenderStrategy: MockInlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TriggerService,
        {
          provide: RenderStrategy,
          useExisting: MockRoutingRenderStrategy,
          multi: true,
        },
        {
          provide: RenderStrategy,
          useExisting: MockInlineRenderStrategy,
          multi: true,
        },
        { provide: TriggerConfig, useValue: mockTriggerConfig },
      ],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.inject(TriggerService);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;
    routingRenderStrategy = TestBed.inject(MockRoutingRenderStrategy);
    inlineRenderStrategy = TestBed.inject(MockInlineRenderStrategy);

    spyOn(routingRenderStrategy, 'render');
    spyOn(routingRenderStrategy, 'removeRendered');
    spyOn(inlineRenderStrategy, 'render');
    spyOn(inlineRenderStrategy, 'removeRendered');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    it('should call the proper renderer', () => {
      const urlConfig = mockTriggerConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      service.render('TEST_URL' as TRIGGER_CALLER);
      expect(routingRenderStrategy.render).toHaveBeenCalledWith(
        urlConfig as TriggerUrlMapping,
        'TEST_URL' as TRIGGER_CALLER,
        undefined
      );

      const inlineConfig =
        mockTriggerConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];
      service.render('TEST_INLINE' as TRIGGER_CALLER, component.vcr);
      expect(inlineRenderStrategy.render).toHaveBeenCalledWith(
        inlineConfig as TriggerInlineMapping,
        'TEST_INLINE' as TRIGGER_CALLER,
        component.vcr
      );
    });
  });

  describe('removeRendered', () => {
    it('should call the proper remove', () => {
      const urlConfig = mockTriggerConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      const inlineConfig =
        mockTriggerConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];

      service.removeRendered('TEST_URL' as TRIGGER_CALLER);
      expect(routingRenderStrategy.removeRendered).toHaveBeenCalledWith(
        'TEST_URL' as TRIGGER_CALLER,
        urlConfig
      );

      service.removeRendered('TEST_INLINE' as TRIGGER_CALLER);
      expect(inlineRenderStrategy.removeRendered).toHaveBeenCalledWith(
        'TEST_INLINE' as TRIGGER_CALLER,
        inlineConfig
      );
    });
  });

  describe('findConfiguration', () => {
    it('should return configuration for caller', () => {
      const inlineConfig =
        mockTriggerConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];
      expect(
        service['findConfiguration']('TEST_INLINE' as TRIGGER_CALLER)
      ).toEqual(inlineConfig);

      const urlConfig = mockTriggerConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      expect(
        service['findConfiguration']('TEST_URL' as TRIGGER_CALLER)
      ).toEqual(urlConfig);
    });
  });
});
