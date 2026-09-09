import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LayoutConfig } from '../../config/layout-config';
import { LAUNCH_CALLER, LaunchInlineRootDialog } from '../config';
import { InlineRootRenderStrategy } from './inline-root-render.strategy';

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

const hostView = {
  attachToAppRef: vi.fn(),
  detachFromAppRef: vi.fn(),
  destroy: vi.fn(),
};
const testComponentNativeNode = document.createElement('div');

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

describe('InlineRootRenderStrategy', () => {
  let fixture: ComponentFixture<MockRootComponent>;
  let inlineRootRenderStrategy: InlineRootRenderStrategy;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockRootComponent],
      providers: [
        InlineRootRenderStrategy,
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
      ],
    }).compileComponents();

    appRef = TestBed.inject(ApplicationRef);
    fixture = TestBed.createComponent(MockRootComponent);
    appRef.components.push(fixture.componentRef);
    inlineRootRenderStrategy = TestBed.inject(InlineRootRenderStrategy);
  });

  afterEach(() => {
    const idx = appRef.components.indexOf(fixture.componentRef);
    if (idx > -1) {
      appRef.components.splice(idx, 1);
    }
  });

  it('should be created', () => {
    expect(inlineRootRenderStrategy).toBeTruthy();
  });

  describe('render', () => {
    it('should create component in ApplicationRef', () => {
      vi.spyOn(appRef, 'attachView');
      vi.spyOn(fixture.componentRef.location.nativeElement, 'appendChild');
      const config = mockLaunchConfig?.launch?.[
        'TEST_INLINE_ROOT'
      ] as LaunchInlineRootDialog;
      inlineRootRenderStrategy.render(
        config,
        'TEST_INLINE_ROOT' as LAUNCH_CALLER
      );

      expect(appRef.attachView).toHaveBeenCalledWith(hostView as any);
      expect(
        fixture.componentRef.location.nativeElement.appendChild
      ).toHaveBeenCalledWith(testComponentNativeNode);
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
