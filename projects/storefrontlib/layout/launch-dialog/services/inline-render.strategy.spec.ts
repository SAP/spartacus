import {
  Component,
  ComponentRef,
  EnvironmentInjector,
  Injector,
  NgModuleRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../../config/layout-config';
import { LaunchInlineDialog, LAUNCH_CALLER } from '../config';
import { InlineRenderStrategy } from './inline-render.strategy';

/** cast to the desired signature so matcher does not get confused */
type ViewContainerRef_createComponent = <C>(
  componentType: Type<C>,
  options?: {
    index?: number;
    injector?: Injector;
    ngModuleRef?: NgModuleRef<unknown>;
    environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>;
    projectableNodes?: Node[][];
  }
) => ComponentRef<C>;

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

const mockLaunchConfig: LayoutConfig = {
  launch: {
    TEST_INLINE: {
      inline: true,
      component: TestContainerComponent,
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      component: TestContainerComponent,
    },
  },
};

describe('InlineRenderStrategy', () => {
  let service: InlineRenderStrategy;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InlineRenderStrategy],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.inject(InlineRenderStrategy);
    component = TestBed.createComponent(
      TestContainerComponent
    ).componentInstance;

    spyOn(component.vcr, 'createComponent');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render', () => {
    it('should create component in the container ref', () => {
      const config = mockLaunchConfig.launch[
        'TEST_INLINE'
      ] as LaunchInlineDialog;
      service.render(config, 'TEST_INLINE' as LAUNCH_CALLER, component.vcr);

      expect(
        // eslint-disable-next-line deprecation/deprecation
        component.vcr.createComponent as ViewContainerRef_createComponent
      ).toHaveBeenCalledWith(
        TestContainerComponent as Type<TestContainerComponent>
      );
    });
  });

  describe('match', () => {
    it('should return TRUE for an inline config', () => {
      const config = mockLaunchConfig.launch[
        'TEST_INLINE'
      ] as LaunchInlineDialog;
      expect(service.hasMatch(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockLaunchConfig.launch[
        'TEST_OUTLET'
      ] as LaunchInlineDialog;
      expect(service.hasMatch(config)).toBeFalsy();
    });
  });
});
