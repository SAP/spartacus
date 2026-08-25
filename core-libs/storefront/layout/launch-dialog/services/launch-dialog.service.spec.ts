import {
  Component,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AutoFocusService } from '../../a11y/keyboard-focus/autofocus';
import { LayoutConfig } from '../../config/layout-config';
import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LaunchInlineDialog,
  LaunchOptions,
  LaunchRoute,
} from '../config/launch-config';
import { LaunchDialogService } from './launch-dialog.service';
import { LaunchRenderStrategy } from './launch-render.strategy';

const mockLaunchConfig: LayoutConfig = {
  launch: {
    TEST_INLINE: {
      inline: true,
      component: class test {},
    },
    TEST_URL: {
      cxRoute: 'url',
    },
    TEST_DIALOG: {
      inline: true,
      component: class test {},
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

const urlConfig = mockLaunchConfig.launch?.['TEST_URL'];
const inlineConfig = mockLaunchConfig.launch?.['TEST_INLINE'];

@Injectable({
  providedIn: 'root',
})
class MockRoutingRenderStrategy {
  public render(
    _config: LaunchRoute,
    _caller: LAUNCH_CALLER | string,
    _vcr?: ViewContainerRef
  ) {}

  public remove(_caller: LAUNCH_CALLER | string, _config: LaunchOptions) {}

  public hasMatch(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}

@Injectable({
  providedIn: 'root',
})
class MockInlineRenderStrategy {
  public render(
    _config: LaunchInlineDialog,
    _caller: LAUNCH_CALLER | string,
    _vcr: ViewContainerRef
  ) {}

  public remove(_caller: LAUNCH_CALLER | string, _config: LaunchOptions) {}

  public hasMatch(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }
}

@Component({ template: '' })
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('LaunchDialogService', () => {
  let service: LaunchDialogService;
  let routingRenderStrategy: MockRoutingRenderStrategy;
  let inlineRenderStrategy: MockInlineRenderStrategy;
  let component: TestContainerComponent;
  let componentRef: ComponentRef<TestContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestContainerComponent],
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
        { provide: LayoutConfig, useValue: mockLaunchConfig },
      ],
    }).compileComponents();

    service = TestBed.inject(LaunchDialogService);
    component = TestBed.createComponent(
      TestContainerComponent
    ).componentInstance;
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
    routingRenderStrategy = TestBed.inject(MockRoutingRenderStrategy);
    inlineRenderStrategy = TestBed.inject(MockInlineRenderStrategy);

    vi.spyOn(routingRenderStrategy, 'render');
    vi.spyOn(routingRenderStrategy, 'remove');
    vi.spyOn(inlineRenderStrategy, 'render');
    vi.spyOn(inlineRenderStrategy, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('launch', () => {
    it('should call the proper renderer', () => {
      service.launch('TEST_URL' as LAUNCH_CALLER);
      expect(routingRenderStrategy.render).toHaveBeenCalledWith(
        urlConfig as LaunchRoute,
        'TEST_URL',
        undefined
      );

      service.launch('TEST_INLINE', component.vcr);
      expect(inlineRenderStrategy.render).toHaveBeenCalledWith(
        inlineConfig as LaunchInlineDialog,
        'TEST_INLINE',
        component.vcr
      );
    });

    it('should get any data from the launcher when data is passed', () => {
      service.launch('TEST_INLINE', component.vcr, 'test-data');

      let result: any;

      service.data$.subscribe((data) => (result = data)).unsubscribe();

      expect(result).toEqual('test-data');
    });
  });

  describe('clear', () => {
    it('should call the proper remove', () => {
      service.clear('TEST_URL' as LAUNCH_CALLER);
      expect(routingRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_URL',
        urlConfig
      );

      service.clear('TEST_INLINE' as LAUNCH_CALLER);
      expect(inlineRenderStrategy.remove).toHaveBeenCalledWith(
        'TEST_INLINE',
        inlineConfig
      );
    });
  });

  describe('findConfiguration', () => {
    it('should return configuration for caller', () => {
      expect(service['findConfiguration']('TEST_INLINE')).toEqual(inlineConfig);

      expect(service['findConfiguration']('TEST_URL')).toEqual(urlConfig);
    });
  });

  describe('openDialog', () => {
    beforeEach(() => {
      vi.spyOn(service, 'launch').mockReturnValue(of(componentRef));
    });

    it('should call LaunchDialogService launch', () => {
      service.openDialog(
        'TEST_DIALOG' as LAUNCH_CALLER,
        undefined,
        component.vcr,
        { test: 123 }
      );

      expect(service.launch).toHaveBeenCalledWith(
        'TEST_DIALOG' as LAUNCH_CALLER,
        component.vcr,
        {
          test: 123,
        }
      );
    });

    it('should call LaunchDialogService clear on close and destroy', () => {
      vi.spyOn(service, 'clear');
      vi.spyOn(componentRef, 'destroy');
      service['_dialogClose'].next('close');

      const openDialog = service.openDialog(
        'TEST_DIALOG' as LAUNCH_CALLER,
        undefined,
        component.vcr
      );

      openDialog?.subscribe();

      expect(service.clear).toHaveBeenCalledWith(
        'TEST_DIALOG' as LAUNCH_CALLER
      );
      expect(componentRef.destroy).toHaveBeenCalled();
    });

    it('should call focusElement with the opener nativeElement on close', () => {
      vi.spyOn<any>(service, 'focusElement');
      const openElement = { nativeElement: document.createElement('button') };
      service['_dialogClose'].next('close');

      service
        .openDialog('TEST_DIALOG' as LAUNCH_CALLER, openElement, component.vcr)
        ?.subscribe();

      expect((service as any).focusElement).toHaveBeenCalledWith(
        openElement.nativeElement
      );
    });

    it('should call focusElement with undefined when no opener is provided', () => {
      vi.spyOn<any>(service, 'focusElement');
      service['_dialogClose'].next('close');

      service
        .openDialog('TEST_DIALOG' as LAUNCH_CALLER, undefined, component.vcr)
        ?.subscribe();

      expect((service as any).focusElement).toHaveBeenCalledWith(undefined);
    });
  });

  describe('openDialogAndSubscribe', () => {
    it('should call "openDialog" method', () => {
      vi.spyOn(service, 'openDialog');

      service.openDialogAndSubscribe(
        'TEST_DIALOG' as LAUNCH_CALLER,
        undefined,
        { test: 123 }
      );

      expect(service.openDialog).toHaveBeenCalledWith(
        'TEST_DIALOG' as LAUNCH_CALLER,
        undefined,
        undefined,
        { test: 123 }
      );
    });
  });

  describe('focusElement', () => {
    let autoFocusService: AutoFocusService;

    beforeEach(() => {
      autoFocusService = TestBed.inject(AutoFocusService);
    });

    it('should focus the first focusable descendant when one exists', () => {
      const host = document.createElement('div');
      const focusableChild = document.createElement('button');
      vi.spyOn(autoFocusService, 'findFirstFocusable').mockReturnValue(
        focusableChild
      );
      vi.spyOn(focusableChild, 'focus');

      (service as any).focusElement(host);

      expect(autoFocusService.findFirstFocusable).toHaveBeenCalledWith(host);
      expect(focusableChild.focus).toHaveBeenCalled();
    });

    it('should focus the host itself when no focusable descendant exists', () => {
      const host = document.createElement('div');
      vi.spyOn(autoFocusService, 'findFirstFocusable').mockReturnValue(null);
      vi.spyOn(host, 'focus');

      (service as any).focusElement(host);

      expect(host.focus).toHaveBeenCalled();
    });

    it('should temporarily add tabindex="-1" and remove it after focus when target has no tabindex', () => {
      const host = document.createElement('div');
      vi.spyOn(autoFocusService, 'findFirstFocusable').mockReturnValue(null);

      (service as any).focusElement(host);

      expect(host.hasAttribute('tabindex')).toBeFalsy();
    });

    it('should not remove tabindex if the target already had one', () => {
      const host = document.createElement('div');
      host.setAttribute('tabindex', '0');
      vi.spyOn(autoFocusService, 'findFirstFocusable').mockReturnValue(null);
      vi.spyOn(host, 'focus');

      (service as any).focusElement(host);

      expect(host.getAttribute('tabindex')).toBe('0');
    });

    it('should do nothing when called with undefined', () => {
      vi.spyOn(autoFocusService, 'findFirstFocusable');

      (service as any).focusElement(undefined);

      expect(autoFocusService.findFirstFocusable).not.toHaveBeenCalled();
    });
  });
});
