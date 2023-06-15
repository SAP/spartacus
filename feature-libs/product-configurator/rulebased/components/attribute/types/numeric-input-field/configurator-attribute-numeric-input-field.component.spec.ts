import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  I18nTestingModule,
  LanguageService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeNumericInputFieldComponent } from './configurator-attribute-numeric-input-field.component';
import {
  ConfiguratorAttributeNumericInputFieldService,
  ConfiguratorAttributeNumericInterval,
} from './configurator-attribute-numeric-input-field.component.service';

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

let DEBOUNCE_TIME: number;
let testVersion: string;

const userInput = '345.00';
const NUMBER_DECIMAL_PLACES = 2;
const ATTRIBUTE_NAME = 'attributeName';
const VALUE_OUTSIDE_ALL_INTERVALS = '5';

const attribute: Configurator.Attribute = {
  name: ATTRIBUTE_NAME,
  label: ATTRIBUTE_NAME,
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
  numDecimalPlaces: NUMBER_DECIMAL_PLACES,
  numTotalLength: 10,
  negativeAllowed: false,
};

const attributeInterval: Configurator.Attribute = {
  name: ATTRIBUTE_NAME,
  label: ATTRIBUTE_NAME,
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
  numDecimalPlaces: NUMBER_DECIMAL_PLACES,
  numTotalLength: 10,
  negativeAllowed: false,
  intervalInDomain: true,
  values: [
    { valueCode: 'a', name: '7 - 11' },
    { valueCode: 'b', name: '17' },
  ],
};

const attributeWoNumericalMetadata: Configurator.Attribute = {
  name: 'attributeName',
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
};

function checkForValidationMessage(
  component: ConfiguratorAttributeNumericInputFieldComponent,
  fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>,
  htmlElem: HTMLElement,
  expectedMessages: any
) {
  component.attributeInputForm.markAsDirty();

  fixture.detectChanges();
  const validationDiv = htmlElem.getElementsByClassName('cx-validation-msg');
  expect(validationDiv).toBeDefined();
  expect(validationDiv.length).toBe(expectedMessages);
}
class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

class MockFeatureConfigService {
  isLevel(version: string): boolean {
    return version === testVersion;
  }
}

describe('ConfigAttributeNumericInputFieldComponent', () => {
  let component: ConfiguratorAttributeNumericInputFieldComponent;

  let fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>;
  let mockLanguageService;
  const locale = 'en';
  let htmlElem: HTMLElement;
  let configuratorAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService;
  let configuratorUISettingsConfig: ConfiguratorUISettingsConfig = {
    ...defaultConfiguratorUISettingsConfig,
    productConfigurator: {
      ...defaultConfiguratorUISettingsConfig.productConfigurator,
    },
  };

  beforeEach(
    waitForAsync(() => {
      configuratorUISettingsConfig.productConfigurator =
        defaultConfiguratorUISettingsConfig.productConfigurator;
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of(locale)),
        setActive: jasmine.createSpy(),
      };
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeNumericInputFieldComponent,
          MockFocusDirective,
          MockCxIconComponent,
        ],
        imports: [ReactiveFormsModule, I18nTestingModule, FeaturesConfigModule],
        providers: [
          { provide: LanguageService, useValue: mockLanguageService },
          {
            provide: ConfiguratorUISettingsConfig,
            useValue: configuratorUISettingsConfig,
          },
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        ],
      })
        .overrideComponent(ConfiguratorAttributeNumericInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeNumericInputFieldComponent
    );
    configuratorAttributeNumericInputFieldService = TestBed.inject(
      ConfiguratorAttributeNumericInputFieldService
    );

    component = fixture.componentInstance;
    component.attribute = attribute;
    component.language = locale;
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
    spyOn(
      configuratorAttributeNumericInputFieldService,
      'getPatternForValidationMessage'
    );
    DEBOUNCE_TIME =
      defaultConfiguratorUISettingsConfig.productConfigurator
        ?.updateDebounceTime?.input ?? component['FALLBACK_DEBOUNCE_TIME'];

    testVersion = '6.2';

    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
  });

  function checkForValidity(
    input: string,
    negativeAllowed: boolean,
    isValid: boolean
  ) {
    component.attribute.negativeAllowed = negativeAllowed;
    component.ngOnInit();
    component.attributeInputForm.setValue(input);
    checkForValidationMessage(component, fixture, htmlElem, isValid ? 0 : 1);
  }

  function checkForIntervalValidity(
    input: string,
    numberOfValidationIssues: number
  ) {
    component.attribute = attributeInterval;
    component.ngOnInit();
    component.attributeInputForm.setValue(input);
    checkForValidationMessage(
      component,
      fixture,
      htmlElem,
      numberOfValidationIssues
    );
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not consider empty required input field as invalid, despite that it will be marked as error on the UI, so that engine is still called', () => {
    component.attribute.required = true;
    fixture.detectChanges();
    expect(component.attributeInputForm.valid).toBe(true);
  });

  describe('ngOnInit', () => {
    const attributeEmpty: Configurator.Attribute = {
      name: 'Required',
      required: true,
      incomplete: true,
      userInput: '',
    };

    it('should set form value', () => {
      component.ngOnInit();
      expect(component.attributeInputForm.value).toEqual(userInput);
    });

    it('should call service for pattern generation with meta data from attribute', () => {
      component.ngOnInit();
      expect(
        configuratorAttributeNumericInputFieldService.getPatternForValidationMessage
      ).toHaveBeenCalledWith(
        NUMBER_DECIMAL_PLACES,
        component.attribute.numTotalLength,
        component.attribute.negativeAllowed,
        'en'
      );
    });

    it('should call service for pattern generation with defaults in case attribute does not carry meta data', () => {
      component.attribute = attributeWoNumericalMetadata;
      component.ngOnInit();
      const defaultSettings = component['getDefaultSettings']();
      expect(
        configuratorAttributeNumericInputFieldService.getPatternForValidationMessage
      ).toHaveBeenCalledWith(
        defaultSettings.numDecimalPlaces,
        defaultSettings.numTotalLength,
        defaultSettings.negativeAllowed,
        'en'
      );
    });

    it('should display no validation issue if input is fine, an unknown locale was requested, and we fall back to en locale', () => {
      component.language = 'unknown locale';
      component.ngOnInit();
      checkForValidationMessage(component, fixture, htmlElem, 0);
    });

    it('should mark input as touched in case empty, and we navigated from cart', () => {
      component.ownerType = CommonConfigurator.OwnerType.CART_ENTRY;
      component.attribute = attributeEmpty;

      component.ngOnInit();
      expect(component.attributeInputForm.touched).toBe(true);
    });

    it('should not mark input as touched in case empty, and we navigated from product', () => {
      component.ownerType = CommonConfigurator.OwnerType.PRODUCT;
      component.attribute = attributeEmpty;

      component.ngOnInit();
      expect(component.attributeInputForm.touched).toBe(false);
    });
  });

  describe('Validation', () => {
    it('should display an issue if alphanumeric characters occur', () => {
      checkForValidity('122A23', false, false);
    });

    it('should display an issue if negative sign is included but not allowed to', () => {
      checkForValidity('-122323', false, false);
    });

    it('should display no issue if negative sign is included and allowed', () => {
      checkForValidity('-122323', true, true);
    });

    it('should display an issue if input is too long', () => {
      checkForValidity('123456789.34', false, false);
    });

    it('should display an issue if input is too long and negatives allowed', () => {
      checkForValidity('123456789.34', true, false);
    });

    it('should display an issue if input length matches meta data exactly', () => {
      checkForValidity('12345678.34', false, true);
    });

    it('should display an issue if input length matches meta data exactly and negatives are allowed', () => {
      checkForValidity('12345678.34', true, true);
    });

    it('should display no issue for negative value if input length matches meta data exactly and negatives are allowed', () => {
      checkForValidity('-12345678.34', true, true);
    });

    it('should display no issue for single minus if negatives are allowed', () => {
      checkForValidity('-', true, true);
    });
  });

  describe('Interval validation', () => {
    it('should display an issue if input does not match interval', () => {
      checkForIntervalValidity(VALUE_OUTSIDE_ALL_INTERVALS, 1);
    });

    it('should display no issue if input does not match interval but we did not opt for the 6.2 release', () => {
      testVersion = '6.1';
      checkForIntervalValidity(VALUE_OUTSIDE_ALL_INTERVALS, 0);
    });

    it('should display no issue if input does not match interval but feature config service is not available', () => {
      component['featureConfigservice'] = undefined;
      checkForIntervalValidity(VALUE_OUTSIDE_ALL_INTERVALS, 0);
    });

    it('should display no issue if input in part of interval', () => {
      checkForIntervalValidity('8', 0);
    });

    it('should display no issue if input matches interval (in case for single valued interval', () => {
      checkForIntervalValidity('17', 0);
    });

    it('should display only one issue if input breaks both validations', () => {
      checkForIntervalValidity('A', 1);
    });
  });

  it('should not set control value in case the model attribute does not carry a value', () => {
    component.attribute.userInput = undefined;
    component.ngOnInit();
    expect(component.attributeInputForm.value).toBe('');
  });

  it('should raise event in case input was changed', () => {
    component.onChange();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  });

  it('should raise no event in case input was changed and control is invalid', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('122A23');
    component.onChange();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledTimes(0);
  });

  it('should delay emit inputValue for debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  }));

  it('should delay emit inputValue for debounce period in case ui settings config is missing, because it falls back to default time', fakeAsync(() => {
    configuratorUISettingsConfig.productConfigurator = undefined;
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  }));

  it('should only emit once with last value if inputValue is changed within debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    component.attributeInputForm.setValue('123456');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      'INITIAL',
      {
        ...component.attribute,
        userInput: '123456',
        selectedSingleValue: '123456',
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }));

  it('should emit twice if inputValue is changed after debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    component.attributeInputForm.setValue('123456');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledTimes(2);
  }));

  it('should not emit inputValue after destroy', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    component.ngOnDestroy();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
  }));

  describe('Accessibility', () => {
    it("should contain input element with class name 'form-control' and 'aria-describedby' attribute attribute that indicates the ID of the element that describe the elements", fakeAsync(() => {
      component.attribute.userInput = '123';
      fixture.detectChanges();
      component.ngOnInit();
      htmlElem = fixture.debugElement.nativeElement;
      tick(DEBOUNCE_TIME);
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-control',
        0,
        'aria-describedby',
        'cx-configurator--label--attributeName'
      );
    }));

    it("should contain div element with class name 'cx-validation-msg' and 'aria-live' attribute that enables the screen reader to read out a error as soon as it occurs", fakeAsync(() => {
      component.attribute.userInput = '123';
      component.attributeInputForm.markAsTouched({ onlySelf: true });
      component.attributeInputForm.setErrors({
        wrongFormat: true,
      });
      fixture.detectChanges();
      component.ngOnInit();
      tick(DEBOUNCE_TIME);
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-validation-msg',
        0,
        'aria-live',
        'assertive'
      );
    }));

    it("should contain div element with class name 'cx-validation-msg' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", fakeAsync(() => {
      component.attribute.userInput = '123';
      component.attributeInputForm.markAsTouched({ onlySelf: true });
      component.attributeInputForm.setErrors({
        wrongFormat: true,
      });
      fixture.detectChanges();
      component.ngOnInit();
      tick(DEBOUNCE_TIME);
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-validation-msg',
        0,
        'aria-atomic',
        'true'
      );
    }));
  });

  describe('getIntervalText', () => {
    let interval: ConfiguratorAttributeNumericInterval = {
      minValue: 5,
      maxValue: 7,
      minValueIncluded: true,
      maxValueIncluded: true,
    };

    let minValueFormatted = '5.00';
    let maxValueFormatted = '7.00';

    it('should return aria text for standard interval', fakeAsync(() => {
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValueFormatted +
          ' minValue:' +
          minValueFormatted
      );
    }));

    it('should return aria text for half open interval, upper value not included', fakeAsync(() => {
      interval.minValueIncluded = true;
      interval.maxValueIncluded = false;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValueFormatted +
          ' minValue:' +
          minValueFormatted +
          ' ' +
          'configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded'
      );
    }));

    it('should return aria text for half open interval, lower value not included', fakeAsync(() => {
      interval.minValueIncluded = false;
      interval.maxValueIncluded = true;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValueFormatted +
          ' minValue:' +
          minValueFormatted +
          ' ' +
          'configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded'
      );
    }));

    it('should return aria text for open interval', fakeAsync(() => {
      interval.minValueIncluded = false;
      interval.maxValueIncluded = false;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValueFormatted +
          ' minValue:' +
          minValueFormatted +
          ' ' +
          'configurator.a11y.numericIntervalStandardOpen'
      );
    }));

    it('should return aria text for infinite interval with min value', fakeAsync(() => {
      interval.minValue = 5;
      interval.maxValue = undefined;
      interval.minValueIncluded = false;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericInfiniteIntervalMinValue value:' +
          minValueFormatted
      );
    }));

    it('should return aria text for infinite interval with min value included', fakeAsync(() => {
      interval.minValue = 5;
      interval.maxValue = undefined;
      interval.minValueIncluded = true;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericInfiniteIntervalMinValueIncluded value:' +
          minValueFormatted
      );
    }));

    it('should return aria text for infinite interval with max value', fakeAsync(() => {
      interval.minValue = undefined;
      interval.maxValue = 7;
      interval.maxValueIncluded = false;
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericInfiniteIntervalMaxValue value:' +
          maxValueFormatted
      );
    }));

    it('should return aria text for infinite interval with max value included', fakeAsync(() => {
      interval.minValue = undefined;
      interval.maxValue = 7;
      interval.maxValueIncluded = true;

      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericInfiniteIntervalMaxValueIncluded value:' +
          maxValueFormatted
      );
    }));

    it('should return text for single value', fakeAsync(() => {
      interval.minValue = 5;
      interval.maxValue = 5;
      interval.minValueIncluded = false;
      interval.maxValueIncluded = false;

      fixture.detectChanges();
      tick(DEBOUNCE_TIME);
      expect(component['getIntervalText'](interval)).toBe(
        'configurator.a11y.numericIntervalSingleValue value:' +
          minValueFormatted
      );
    }));
  });

  describe('getIntervalTexts', () => {
    let interval1: ConfiguratorAttributeNumericInterval = {
      minValue: 5,
      maxValue: 7,
      minValueIncluded: true,
      maxValueIncluded: true,
    };
    let interval2: ConfiguratorAttributeNumericInterval = {
      minValue: 10,
      maxValue: undefined,
      minValueIncluded: true,
      maxValueIncluded: false,
    };

    let minValue1Formatted = '5.00';
    let maxValue1Formatted = '7.00';
    let minValue2Formatted = '10.00';

    it('should return concatenated aria text for multiple intervals', fakeAsync(() => {
      component.intervals = [];
      component.intervals.push(interval1);
      component.intervals.push(interval2);

      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component.getHelpTextForInterval()).toBe(
        'configurator.a11y.combinedIntervalsText combinedInterval:' +
          'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValue1Formatted +
          ' minValue:' +
          minValue1Formatted +
          ' newInterval:' +
          'configurator.a11y.numericInfiniteIntervalMinValueIncluded value:' +
          minValue2Formatted
      );
    }));

    it('should return concatenated aria text for multiple intervals with single value', fakeAsync(() => {
      let interval3: ConfiguratorAttributeNumericInterval = {
        minValue: 12,
        maxValue: 12,
        minValueIncluded: false,
        maxValueIncluded: false,
      };

      let minValue3Formatted = '12.00';

      component.intervals = [];
      component.intervals.push(interval1);
      component.intervals.push(interval3);
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component.getHelpTextForInterval()).toBe(
        'configurator.a11y.combinedIntervalsText combinedInterval:' +
          'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValue1Formatted +
          ' minValue:' +
          minValue1Formatted +
          ' newInterval:configurator.a11y.numericIntervalSingleValue value:' +
          minValue3Formatted
      );
    }));
  });

  describe('getAriaLabelComplete', () => {
    let interval: ConfiguratorAttributeNumericInterval = {
      minValue: 5,
      maxValue: 7,
      minValueIncluded: true,
      maxValueIncluded: true,
    };

    let minValueFormatted = '5.00';
    let maxValueFormatted = '7.00';

    it('should return aria text for entered value including text for standard interval', fakeAsync(() => {
      component.intervals = [];
      component.intervals.push(interval);
      component.attribute.intervalInDomain = true;
      component.attribute.label = 'Intervaltest';
      component.attribute.userInput = '123';
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component.getAriaLabelComplete()).toBe(
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' ' +
          'value:' +
          component.attribute.userInput +
          ' ' +
          'configurator.a11y.numericIntervalStandard maxValue:' +
          maxValueFormatted +
          ' minValue:' +
          minValueFormatted
      );
    }));

    it('should return aria text for blank value including text for infinite interval with min value', fakeAsync(() => {
      interval.minValue = 5;
      interval.maxValue = undefined;
      interval.minValueIncluded = false;

      component.intervals = [];
      component.intervals.push(interval);
      component.attribute.intervalInDomain = true;
      component.attribute.label = 'Intervaltest';
      component.attribute.userInput = '';
      fixture.detectChanges();
      tick(DEBOUNCE_TIME);

      expect(component.getAriaLabelComplete()).toBe(
        'configurator.a11y.valueOfAttributeBlank attribute:' +
          component.attribute.label +
          ' ' +
          'configurator.a11y.numericInfiniteIntervalMinValue value:' +
          minValueFormatted
      );
    }));
  });
});
