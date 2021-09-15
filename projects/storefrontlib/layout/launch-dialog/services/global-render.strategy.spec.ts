import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../../config/layout-config';
import { LaunchGlobalDialog, LAUNCH_CALLER } from '../config';
import { GlobalRenderStrategy } from './global-render.strategy';

@Component({
  template: '',
})
class TestComponent {}

@Component({
  selector: 'cx-root-app',
  template: '',
})
class MockRootComponent {}

const mockLaunchConfig: LayoutConfig = {
  launch: {
    TEST_GLOBAL: {
      global: true,
      component: TestComponent,
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      component: TestComponent,
    },
  },
};

const hostView = 'hostView';
const testComponentNativeNode = '<div></div>';

class MockComponentFactoryResolver {
  resolveComponentFactory() {
    return {
      create: () => {
        return {
          hostView,
          location: { nativeElement: testComponentNativeNode },
        };
      },
    } as any;
  }
}

describe('GlobalRenderStrategy', () => {
  let fixture: ComponentFixture<MockRootComponent>;
  let globalRenderStrategy: GlobalRenderStrategy;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalRenderStrategy,
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
      ],
      declarations: [MockRootComponent],
    }).compileComponents();

    appRef = TestBed.inject(ApplicationRef);
    fixture = TestBed.createComponent(MockRootComponent);
    appRef.components.push(fixture.componentRef);
    globalRenderStrategy = TestBed.inject(GlobalRenderStrategy);
  });

  it('should be created', () => {
    expect(globalRenderStrategy).toBeTruthy();
  });

  describe('render', () => {
    it('should create component in ApplicationRef', () => {
      spyOn(appRef, 'attachView');
      spyOn(fixture.componentRef.location.nativeElement, 'appendChild');
      const config = mockLaunchConfig?.launch?.[
        'TEST_GLOBAL'
      ] as LaunchGlobalDialog;
      globalRenderStrategy.render(config, 'TEST_GLOBAL' as LAUNCH_CALLER);

      expect(appRef.attachView).toHaveBeenCalledWith(hostView as any);
      expect(
        fixture.componentRef.location.nativeElement.appendChild
      ).toHaveBeenCalledWith(testComponentNativeNode);
    });
  });

  describe('match', () => {
    it('should return TRUE for an global config', () => {
      const config = mockLaunchConfig?.launch?.[
        'TEST_GLOBAL'
      ] as LaunchGlobalDialog;
      expect(globalRenderStrategy.hasMatch(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockLaunchConfig?.launch?.[
        'TEST_OUTLET'
      ] as LaunchGlobalDialog;
      expect(globalRenderStrategy.hasMatch(config)).toBeFalsy();
    });
  });
});
