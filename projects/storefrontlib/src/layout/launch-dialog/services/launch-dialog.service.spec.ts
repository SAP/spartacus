import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  LaunchConfig,
  LaunchInlineDialog,
  LaunchRoute,
  LAUNCH_CALLER,
} from '../config/launch-config';
import { LaunchDialogService } from './launch-dialog.service';
import { LaunchRenderStrategy } from './launch-render.strategy';

const mockLaunchConfig: LaunchConfig = {
  launch: {
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
    _caller: LAUNCH_CALLER,
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
    _caller: LAUNCH_CALLER,
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

describe('LaunchDialogService', () => {
  let service: LaunchDialogService;
  let routingRenderStrategy: MockRoutingRenderStrategy;
  let inlineRenderStrategy: MockInlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaunchDialogService,
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

    service = TestBed.inject(LaunchDialogService);
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
      const urlConfig = mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER];
      service.launch('TEST_URL' as LAUNCH_CALLER);
      expect(routingRenderStrategy.render).toHaveBeenCalledWith(
        urlConfig as LaunchRoute,
        'TEST_URL' as LAUNCH_CALLER,
        undefined
      );

      const inlineConfig =
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER];
      service.launch('TEST_INLINE' as LAUNCH_CALLER, component.vcr);
      expect(inlineRenderStrategy.render).toHaveBeenCalledWith(
        inlineConfig as LaunchInlineDialog,
        'TEST_INLINE' as LAUNCH_CALLER,
        component.vcr
      );
    });
  });

  describe('clear', () => {
    it('should call the proper remove', () => {
      const urlConfig = mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER];
      const inlineConfig =
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER];

      service.clear('TEST_URL' as LAUNCH_CALLER);
      expect(routingRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_URL' as LAUNCH_CALLER,
        urlConfig
      );

      service.clear('TEST_INLINE' as LAUNCH_CALLER);
      expect(inlineRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_INLINE' as LAUNCH_CALLER,
        inlineConfig
      );
    });
  });

  describe('findConfiguration', () => {
    it('should return configuration for caller', () => {
      const inlineConfig =
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER];
      expect(
        service['findConfiguration']('TEST_INLINE' as LAUNCH_CALLER)
      ).toEqual(inlineConfig);

      const urlConfig = mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER];
      expect(service['findConfiguration']('TEST_URL' as LAUNCH_CALLER)).toEqual(
        urlConfig
      );
    });
  });
});
