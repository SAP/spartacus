import { Type, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionDirective } from './configurator-attribute-composition.directive';
import createSpy = jasmine.createSpy;

class TestComponent {}

class MockViewContainerRef {
  clear = createSpy('vcr.clear');
  createComponent = createSpy('vcr.createComponent');
}

describe('ConfiguratorAttributeCompositionDirective', () => {
  let classUnderTest: ConfiguratorAttributeCompositionDirective;
  let viewContainerRef: ViewContainerRef;
  let loggerService: LoggerService;

  function init() {
    classUnderTest = TestBed.inject(
      ConfiguratorAttributeCompositionDirective as Type<ConfiguratorAttributeCompositionDirective>
    );
    viewContainerRef = TestBed.inject(
      ViewContainerRef as Type<ViewContainerRef>
    );
    loggerService = TestBed.inject(LoggerService as Type<LoggerService>);
    spyOn(loggerService, 'warn').and.callThrough();

    classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest.ngOnChanges();
      expectComponentRendered(1);
    });

    it('should re-render the attribute if it changed', () => {
      classUnderTest.ngOnChanges();
      // re-create another context with the different attribute
      classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest['context'].attribute.selectedSingleValue = 'changed';
      classUnderTest.ngOnChanges();
      expectComponentRendered(2);
    });

    it('should re-render the attribute if group changes', () => {
      classUnderTest.ngOnChanges();
      // re-create another context with the different attribute
      classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest['context'].group.id = 'changed';
      classUnderTest.ngOnChanges();
      expectComponentRendered(2);
    });

    it('should log if performance feature toggle is on but no component found', () => {
      classUnderTest['context'].componentKey = 'not.existing';
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
