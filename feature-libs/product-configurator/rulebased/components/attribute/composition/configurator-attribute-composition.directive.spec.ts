import { Component, inject, signal, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoggerService, LoggerTestingModule } from '@spartacus/core';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionDirective } from './configurator-attribute-composition.directive';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';

@Component({
  selector: 'cx-test-attribute',
  template: '{{ context.group.id }}',
})
class TestComponent {
  protected context = inject(ConfiguratorAttributeCompositionContext);
}

@Component({
  template: '<ng-template [cxConfiguratorAttributeComponent]="context()" />',
  imports: [ConfiguratorAttributeCompositionDirective],
})
class TestHostComponent {
  context = signal(ConfiguratorTestUtils.getAttributeContext());
}

class MockViewContainerRef {
  clear = vi.fn();
  createComponent = vi.fn();
}

describe('ConfiguratorAttributeCompositionDirective', () => {
  let classUnderTest: ConfiguratorAttributeCompositionDirective;
  let viewContainerRef: ViewContainerRef;
  let loggerService: LoggerService;
  let context: ConfiguratorAttributeCompositionContext;

  function init() {
    classUnderTest = TestBed.inject(ConfiguratorAttributeCompositionDirective);
    viewContainerRef = TestBed.inject(ViewContainerRef);
    loggerService = TestBed.inject(LoggerService);
    vi.spyOn(loggerService, 'warn');

    context = ConfiguratorTestUtils.getAttributeContext();
    vi.spyOn(classUnderTest, 'context').mockImplementation(() => context);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggerTestingModule],
      providers: [
        ConfiguratorAttributeCompositionDirective,
        {
          provide: ConfiguratorAttributeCompositionConfig,
          useValue: {
            productConfigurator: {
              assignment: { testComponent: TestComponent },
            },
          },
        },
        {
          provide: ViewContainerRef,
          useClass: MockViewContainerRef,
        },
      ],
    });
  });

  it('should create', () => {
    init();
    expect(classUnderTest).toBeDefined();
  });

  it('binds the aliased signal input and rerenders the attribute when its group changes', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const firstAttribute =
      fixture.nativeElement.querySelector('cx-test-attribute');
    expect(firstAttribute.textContent).toBe(
      fixture.componentInstance.context().group.id
    );

    fixture.componentInstance.context.update((context) => ({
      ...context,
      group: {
        ...context.group,
        id: 'changed-group',
      },
    }));
    fixture.detectChanges();

    const nextAttribute =
      fixture.nativeElement.querySelector('cx-test-attribute');
    expect(nextAttribute.textContent).toBe('changed-group');
    expect(nextAttribute).not.toBe(firstAttribute);
  });

  it('should handle missing assignment config', () => {
    TestBed.overrideProvider(ConfiguratorAttributeCompositionConfig, {
      useValue: {
        productConfigurator: { assignment: undefined },
      },
    });
    init();
    expect(classUnderTest['attrComponentAssignment']).toBeDefined();
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      init();
    });

    it('should render view if performance feature toggle is on', () => {
      classUnderTest.ngOnChanges();
      expectComponentRendered(1);
    });

    it('should render the attribute only once if it did not change', () => {
      classUnderTest.ngOnChanges();
      // re-create another context with the same attribute
      context = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest.ngOnChanges();
      expectComponentRendered(1);
    });

    it('should re-render the attribute if it changed', () => {
      classUnderTest.ngOnChanges();
      // re-create another context with the different attribute
      context = ConfiguratorTestUtils.getAttributeContext();
      context.attribute.selectedSingleValue = 'changed';
      classUnderTest.ngOnChanges();
      expectComponentRendered(2);
    });

    it('should re-render the attribute if group changes', () => {
      classUnderTest.ngOnChanges();
      // re-create another context with the different attribute
      context = ConfiguratorTestUtils.getAttributeContext();
      context.group.id = 'changed';
      classUnderTest.ngOnChanges();
      expectComponentRendered(2);
    });

    it('should log if performance feature toggle is on but no component found', () => {
      context.componentKey = 'not.existing';
      classUnderTest.ngOnChanges();
      expectComponentNotRendered(true);
    });
  });

  function expectComponentRendered(times: number) {
    expect(viewContainerRef.clear).toHaveBeenCalledTimes(times);
    expect(viewContainerRef.createComponent).toHaveBeenCalledTimes(times);
    expect(loggerService.warn).not.toHaveBeenCalled();
  }

  function expectComponentNotRendered(expectLog: boolean) {
    expect(viewContainerRef.clear).not.toHaveBeenCalled();
    expect(viewContainerRef.createComponent).not.toHaveBeenCalled();
    if (expectLog) {
      expect(loggerService.warn).toHaveBeenCalled();
    } else {
      expect(loggerService.warn).not.toHaveBeenCalled();
    }
  }
});
