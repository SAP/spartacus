import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  LaunchConfig,
  LaunchInlineDialog,
  LaunchRoute,
  TRIGGER_CALLER,
} from '../config/launch-config';
import { LaunchComponentService } from './launch-component.service';
import { LaunchRenderStrategy } from './launch-render.strategy';

const mockLaunchConfig: LaunchConfig = {
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
class MockRoutingRenderStrategy extends LaunchRenderStrategy {
  public render(
    _config: LaunchRoute,
    _caller: TRIGGER_CALLER,
    _vcr?: ViewContainerRef
  ) {}

  public match(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}

@Injectable({
  providedIn: 'root',
})
class MockInlineRenderStrategy extends LaunchRenderStrategy {
  public render(
    _config: LaunchInlineDialog,
    _caller: TRIGGER_CALLER,
    _vcr: ViewContainerRef
  ) {}

  public match(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }
}

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('LaunchComponentService', () => {
  let service: LaunchComponentService;
  let routingRenderStrategy: MockRoutingRenderStrategy;
  let inlineRenderStrategy: MockInlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaunchComponentService,
        {
          provide: LaunchRenderStrategy,
          useExisting: MockRoutingRenderStrategy,
          multi: true,
        },
        {
          provide: LaunchRenderStrategy,
          useExisting: MockInlineRenderStrategy,
          multi: true,
        },
        { provide: LaunchConfig, useValue: mockLaunchConfig },
      ],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.inject(LaunchComponentService);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;
    routingRenderStrategy = TestBed.inject(MockRoutingRenderStrategy);
    inlineRenderStrategy = TestBed.inject(MockInlineRenderStrategy);

    spyOn(routingRenderStrategy, 'render');
    spyOn(routingRenderStrategy, 'remove');
    spyOn(inlineRenderStrategy, 'render');
    spyOn(inlineRenderStrategy, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('launch', () => {
    it('should call the proper renderer', () => {
      const urlConfig = mockLaunchConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      service.launch('TEST_URL' as TRIGGER_CALLER);
      expect(routingRenderStrategy.render).toHaveBeenCalledWith(
        urlConfig as LaunchRoute,
        'TEST_URL' as TRIGGER_CALLER,
        undefined
      );

      const inlineConfig =
        mockLaunchConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];
      service.launch('TEST_INLINE' as TRIGGER_CALLER, component.vcr);
      expect(inlineRenderStrategy.render).toHaveBeenCalledWith(
        inlineConfig as LaunchInlineDialog,
        'TEST_INLINE' as TRIGGER_CALLER,
        component.vcr
      );
    });
  });

  describe('clear', () => {
    it('should call the proper remove', () => {
      const urlConfig = mockLaunchConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      const inlineConfig =
        mockLaunchConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];

      service.clear('TEST_URL' as TRIGGER_CALLER);
      expect(routingRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_URL' as TRIGGER_CALLER,
        urlConfig
      );

      service.clear('TEST_INLINE' as TRIGGER_CALLER);
      expect(inlineRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_INLINE' as TRIGGER_CALLER,
        inlineConfig
      );
    });
  });

  describe('findConfiguration', () => {
    it('should return configuration for caller', () => {
      const inlineConfig =
        mockLaunchConfig.trigger['TEST_INLINE' as TRIGGER_CALLER];
      expect(
        service['findConfiguration']('TEST_INLINE' as TRIGGER_CALLER)
      ).toEqual(inlineConfig);

      const urlConfig = mockLaunchConfig.trigger['TEST_URL' as TRIGGER_CALLER];
      expect(
        service['findConfiguration']('TEST_URL' as TRIGGER_CALLER)
      ).toEqual(urlConfig);
    });
  });
});
