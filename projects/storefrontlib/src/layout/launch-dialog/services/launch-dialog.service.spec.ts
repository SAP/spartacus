import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BreakpointService } from '../../breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../config/layout-config';
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
      default: {
        inline: true,
        component: {},
      },
    },
    TEST_URL: {
      default: {
        cxRoute: 'url',
      },
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

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(BREAKPOINT.lg);
  }
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
        { provide: BreakpointService, useClass: MockBreakpointService },
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
      const urlConfig =
        mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER].default;
      service.launch('TEST_URL' as LAUNCH_CALLER);
      expect(routingRenderStrategy.render).toHaveBeenCalledWith(
        urlConfig as LaunchRoute,
        'TEST_URL' as LAUNCH_CALLER,
        undefined
      );

      const inlineConfig =
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER].default;
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
      const urlConfig =
        mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER].default;
      const inlineConfig =
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER].default;

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
        mockLaunchConfig.launch['TEST_INLINE' as LAUNCH_CALLER].default;
      service['findConfiguration']('TEST_INLINE' as LAUNCH_CALLER)
        .subscribe((config) => {
          expect(config).toEqual(inlineConfig);
        })
        .unsubscribe();

      const urlConfig =
        mockLaunchConfig.launch['TEST_URL' as LAUNCH_CALLER].default;
      service['findConfiguration']('TEST_URL' as LAUNCH_CALLER)
        .subscribe((config) => {
          expect(config).toEqual(urlConfig);
        })
        .unsubscribe();
    });

    it('should return "null" is there is no config for caller', () => {
      service['findConfiguration']('TEST_NULL' as LAUNCH_CALLER)
        .subscribe((config) => expect(config).toBeNull())
        .unsubscribe();
    });
  });
});
