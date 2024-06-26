import { Type, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureConfigService, LoggerService } from '@spartacus/core';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionDirective } from './configurator-attribute-composition.directive';
import createSpy = jasmine.createSpy;

class TestComponent {}

let configuratorAttributeCompositionTestConfig: ConfiguratorAttributeCompositionConfig =
  { productConfigurator: { assignment: { testComponent: TestComponent } } };

class MockViewContainerRef {
  clear = createSpy('vcr.clear');
  createComponent = createSpy('vcr.createComponent');
}

let productConfigurationDeltaRenderingEnabled = false;
class MockFeatureConfigService {
  isEnabled(name: string): boolean {
    if (name === 'productConfigurationDeltaRendering') {
      return productConfigurationDeltaRenderingEnabled;
    }
    return false;
  }
}

describe('ConfiguratorAttributeCompositionDirective', () => {
  let classUnderTest: ConfiguratorAttributeCompositionDirective;
  let viewContainerRef: ViewContainerRef;
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorAttributeCompositionDirective,
        {
          provide: ConfiguratorAttributeCompositionConfig,
          useValue: configuratorAttributeCompositionTestConfig,
        },
        {
          provide: ViewContainerRef,
          useClass: MockViewContainerRef,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });
    classUnderTest = TestBed.inject(
      ConfiguratorAttributeCompositionDirective as Type<ConfiguratorAttributeCompositionDirective>
    );
    viewContainerRef = TestBed.inject(
      ViewContainerRef as Type<ViewContainerRef>
    );
    loggerService = TestBed.inject(LoggerService as Type<LoggerService>);
    spyOn(loggerService, 'warn').and.callThrough();

    classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should render view when performance feature toggle is off', () => {
      productConfigurationDeltaRenderingEnabled = false;
      classUnderTest.ngOnInit();
      expectComponentRendered(1);
    });

    it('should log when performance feature toggle is off but no component found', () => {
      productConfigurationDeltaRenderingEnabled = false;
      classUnderTest['context'].componentKey = 'not.existing';
      classUnderTest.ngOnInit();
      expectLogOnly();
    });

    it('should do nothing when performance feature toggle is on', () => {
      productConfigurationDeltaRenderingEnabled = true;
      classUnderTest.ngOnInit();
      expectNoInteraction();
    });
  });

  describe('ngOnChanges', () => {
    it('should render view when performance feature toggle is on', () => {
      productConfigurationDeltaRenderingEnabled = true;
      classUnderTest.ngOnChanges();
      expectComponentRendered(1);
    });

    it('should render the attribute only once if it did not change', () => {
      productConfigurationDeltaRenderingEnabled = true;
      classUnderTest.ngOnChanges();
      // re-create another context with the same attribute
      classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest.ngOnChanges();
      expectComponentRendered(1);
    });

    it('should re-render the attribute if it did change', () => {
      productConfigurationDeltaRenderingEnabled = true;
      classUnderTest.ngOnChanges();
      // re-create another context with the different attribute
      classUnderTest['context'] = ConfiguratorTestUtils.getAttributeContext();
      classUnderTest['context'].attribute.selectedSingleValue = 'changed';
      classUnderTest.ngOnChanges();
      expectComponentRendered(2);
    });

    it('should log when performance feature toggle is on but no component found', () => {
      productConfigurationDeltaRenderingEnabled = true;
      classUnderTest['context'].componentKey = 'not.existing';
      classUnderTest.ngOnChanges();
      expectLogOnly();
    });

    it('should do nothing when performance feature toggle is off', () => {
      productConfigurationDeltaRenderingEnabled = false;
      classUnderTest.ngOnChanges();
      expectNoInteraction();
    });
  });

  function expectComponentRendered(times: number) {
    expect(viewContainerRef.clear).toHaveBeenCalledTimes(times);
    expect(viewContainerRef.createComponent).toHaveBeenCalledTimes(times);
    expect(loggerService.warn).not.toHaveBeenCalled();
  }

  function expectNoInteraction() {
    expect(viewContainerRef.clear).not.toHaveBeenCalled();
    expect(viewContainerRef.createComponent).not.toHaveBeenCalled();
    expect(loggerService.warn).not.toHaveBeenCalled();
  }
  function expectLogOnly() {
    expect(viewContainerRef.clear).not.toHaveBeenCalled();
    expect(viewContainerRef.createComponent).not.toHaveBeenCalled();
    expect(loggerService.warn).toHaveBeenCalled();
  }
});
