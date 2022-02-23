import {
  Component,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LayoutConfig } from '../../config/layout-config';
import {
  DIALOG_TYPE,
  LaunchInlineDialog,
  LaunchOptions,
  LaunchRoute,
  LAUNCH_CALLER,
} from '../config/launch-config';
import { LaunchDialogService } from './launch-dialog.service';
import { LaunchRenderStrategy } from './launch-render.strategy';

const mockLaunchConfig: LayoutConfig = {
  launch: {
    TEST_INLINE: {
      inline: true,
      component: {},
    },
    TEST_URL: {
      cxRoute: 'url',
    },
    TEST_DIALOG: {
      inline: true,
      component: {},
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
  let componentRef: ComponentRef<TestContainerComponent>;

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
        { provide: LayoutConfig, useValue: mockLaunchConfig },
      ],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.inject(LaunchDialogService);
    component = TestBed.createComponent(
      TestContainerComponent
    ).componentInstance;
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
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
      spyOn(service, 'launch').and.returnValue(of(componentRef));
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
      spyOn(service, 'clear');
      spyOn(componentRef, 'destroy');
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
  });

  describe('openDialogAndSubscribe', () => {
    it('should call "openDialog" method', () => {
      spyOn(service, 'openDialog');

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
});
