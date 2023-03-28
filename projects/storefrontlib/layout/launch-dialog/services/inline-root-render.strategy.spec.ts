import { ApplicationRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../../config/layout-config';
import { LaunchInlineRootDialog, LAUNCH_CALLER } from '../config';
import { InlineRootRenderStrategy } from './inline-root-render.strategy';

@Component({
  selector: 'cx-test-component',
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
    TEST_INLINE_ROOT: {
      inlineRoot: true,
      component: TestComponent,
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      component: TestComponent,
    },
  },
};

describe('InlineRootRenderStrategy', () => {
  let fixture: ComponentFixture<MockRootComponent>;
  let inlineRootRenderStrategy: InlineRootRenderStrategy;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InlineRootRenderStrategy],
      declarations: [MockRootComponent],
    }).compileComponents();

    appRef = TestBed.inject(ApplicationRef);
    fixture = TestBed.createComponent(MockRootComponent);
    appRef.components.push(fixture.componentRef);
    inlineRootRenderStrategy = TestBed.inject(InlineRootRenderStrategy);
  });

  it('should be created', () => {
    expect(inlineRootRenderStrategy).toBeTruthy();
  });

  describe('render', () => {
    it('should create component in ApplicationRef', () => {
      spyOn(appRef, 'attachView');
      spyOn(fixture.componentRef.location.nativeElement, 'appendChild');
      const config = mockLaunchConfig?.launch?.[
        'TEST_INLINE_ROOT'
      ] as LaunchInlineRootDialog;
      inlineRootRenderStrategy.render(
        config,
        'TEST_INLINE_ROOT' as LAUNCH_CALLER
      );

      expect(appRef.attachView).toHaveBeenCalled();
      expect(
        fixture.componentRef.location.nativeElement.appendChild
      ).toHaveBeenCalledWith(jasmine.any(HTMLElement));
    });
  });

  describe('match', () => {
    it('should return TRUE for an inline root config', () => {
      const config = mockLaunchConfig?.launch?.[
        'TEST_INLINE_ROOT'
      ] as LaunchInlineRootDialog;
      expect(inlineRootRenderStrategy.hasMatch(config)).toBeTruthy();
    });

    it('should return FALSE for a different config', () => {
      const config = mockLaunchConfig?.launch?.[
        'TEST_OUTLET'
      ] as LaunchInlineRootDialog;
      expect(inlineRootRenderStrategy.hasMatch(config)).toBeFalsy();
    });
  });
});
