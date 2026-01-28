import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product-configurator/rulebased';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeInputFieldComponent } from './configurator-attribute-input-field.component';

@Directive({ selector: '[cxFocus]' })
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}
class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

let isCartEntryOrGroupVisited = of(true);
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return isCartEntryOrGroupVisited;
  }
}
const DEBOUNCE_TIME: number = 600;
const DEBOUNCE_TIME_DATE: number = 1600;

describe('ConfiguratorAttributeInputFieldComponent', () => {
  let component: ConfiguratorAttributeInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeInputFieldComponent>;
  let htmlElem: HTMLElement;
  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';
  const userInput = 'theUserInput';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        ConfiguratorAttributeInputFieldComponent,
        MockFocusDirective,
      ],
      providers: [
        {
          provide: ConfiguratorUISettingsConfig,
          useValue: defaultConfiguratorUISettingsConfig,
        },
        {
          provide: ConfiguratorAttributeCompositionContext,
          useValue: ConfiguratorTestUtils.getAttributeContext(),
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfigUtilsService,
        },
      ],
    })
      .overrideComponent(ConfiguratorAttributeInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeInputFieldComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = {
      name: name,
      label: name,
      uiType: Configurator.UiType.STRING,
      userInput: undefined,
      required: true,
      incomplete: true,
      groupId: groupId,
    };
    component.ownerType = CommonConfigurator.OwnerType.CART_ENTRY;
    component.ownerKey = ownerKey;
    fixture.detectChanges();

    defaultConfiguratorUISettingsConfig.productConfigurator = {
      updateDebounceTime: {
        input: DEBOUNCE_TIME,
        date: DEBOUNCE_TIME_DATE,
      },
    };

    spyOn(
      component['configuratorCommonsService'],
      'updateConfiguration'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add classes ng-touch and ng-invalid to the input field.', () => {
    component.attribute.required = false;
    fixture.detectChanges();
    const styleClasses = fixture.debugElement.query(
      By.css('input.form-control')
    ).nativeElement.classList;
    expect(styleClasses).toContain('ng-touched');
    expect(styleClasses).not.toContain('ng-invalid');
  });

  it('should add classes ng-touch and ng-invalid to the input field.', () => {
    const styleClasses = fixture.debugElement.query(
      By.css('input.form-control')
    ).nativeElement.classList;
    expect(styleClasses).toContain('ng-touched');
    expect(styleClasses).toContain('ng-invalid');
  });

  it('should not consider empty required input field as invalid, despite that it will be marked as error on the UI, so that engine is still called', () => {
    expect(component.attributeInputForm.valid).toBe(true);
  });

  it('should set form as touched on init', () => {
    expect(component.attributeInputForm.touched).toEqual(true);
  });

  it('should update configuration onChange', () => {
    component.attributeInputForm.setValue(userInput);
    component.onChange();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      ownerKey,
      {
        ...component.attribute,
        userInput: userInput,
        selectedSingleValue: userInput,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  });

  it('should set userInput on init', () => {
    component.attribute.userInput = userInput;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.attributeInputForm.value).toEqual(userInput);
  });

  it('should delay update for debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('testValue');
    fixture.detectChanges();
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalled();
  }));

  it('should only update once with last value if inputValue is changed within debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('testValue');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    component.attributeInputForm.setValue('testValue123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME / 2);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledWith(
      ownerKey,
      {
        ...component.attribute,
        userInput: 'testValue123',
        selectedSingleValue: 'testValue123',
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }));

  it('should update twice if inputValue is changed after debounce period', fakeAsync(() => {
    component.attributeInputForm.setValue('testValue');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    component.attributeInputForm.setValue('testValue123');
    fixture.detectChanges();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).toHaveBeenCalledTimes(2);
  }));

  it('should not update inputValue after destroy', fakeAsync(() => {
    component.attributeInputForm.setValue('123');
    fixture.detectChanges();
    component.ngOnDestroy();
    tick(DEBOUNCE_TIME);
    expect(
      component['configuratorCommonsService'].updateConfiguration
    ).not.toHaveBeenCalled();
  }));

  describe('Accessibility', () => {
    it("should contain input element with class name 'form-control', without set value, and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-control',
        0,
        'aria-label',
        'configurator.a11y.valueOfAttributeBlank attribute:' +
          component.attribute.label
      );
    });

    it("should contain input element with class name 'form-control' with a set value and 'aria-label' attribute that defines an accessible name to label the current element", fakeAsync(() => {
      component.attribute.userInput = '123';
      fixture.detectChanges();
      component.ngOnInit();
      tick(DEBOUNCE_TIME);
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-control',
        0,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          component.attribute.userInput
      );
    }));

    it("should contain input element with class name 'form-control' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-control',
        0,
        'aria-describedby',
        'cx-configurator--label--attributeName'
      );
    });
  });

  describe('Accessibility support for attributes of type sap_date', () => {
    beforeEach(() => {
      component.attribute.uiType = Configurator.UiType.SAP_DATE;
      fixture.detectChanges();
    });
    describe('in case value is empty', () => {
      it('should render input element with aria-label attribute that defines an accessible name to label the current element', () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'input',
          'form-control',
          0,
          'aria-label',
          'configurator.a11y.valueOfAttributeBlank attribute:' +
            component.attribute.label
        );
      });

      it('should render hidden label with aria-label attribute that explains that date picker can be reached by hitting space ', () => {
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          'cx-visually-hidden',
          0,
          'aria-label',
          'configurator.a11y.valueOfDateAttributeBlank attribute:' +
            component.attribute.label
        );
      });
    });
    describe('in case value is present', () => {
      beforeEach(() => {
        component.attribute.userInput = '2024-12-31';
        fixture.detectChanges();
      });
      it("should contain input element with class name 'form-control' with an 'aria-label' attribute that also mentions the value", () => {
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'input',
          'form-control',
          0,
          'aria-label',
          'configurator.a11y.valueOfAttributeFull attribute:' +
            component.attribute.label +
            ' value:' +
            component.attribute.userInput
        );
      });

      it('should render hidden label with aria-label attribute that explains that date picker can be reached by hitting space ', () => {
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          'cx-visually-hidden',
          0,
          'aria-label',
          'configurator.a11y.valueOfDateAttributeFull attribute:' +
            component.attribute.label +
            ' value:' +
            component.attribute.userInput
        );
      });
    });
  });

  describe('isRequired', () => {
    it('should tell from attribute if form input required for string and numeric attribute without domain', () => {
      expect(component.isRequired).toBe(true);

      component.attribute.uiType = Configurator.UiType.NUMERIC;
      expect(component.isRequired).toBe(true);

      component.attribute.required = false;
      expect(component.isRequired).toBe(false);
    });

    it('should handle situation where required is not defined on attribute level', () => {
      component.attribute.required = undefined;
      expect(component.isRequired).toBe(false);
    });

    it('should always return false for attribute types with domain', () => {
      component.attribute.required = true;
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      expect(component.isRequired).toBe(false);

      component.attribute.required = undefined;
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      expect(component.isRequired).toBe(false);
    });
  });

  describe('isUserInputEmpty', () => {
    it('should return false if a value is present', () => {
      component.attribute.userInput = 'abc';
      expect(component.isUserInputEmpty).toBe(false);
    });

    it('should return true if the user input only contains blanks', () => {
      component.attribute.userInput = '  ';
      expect(component.isUserInputEmpty).toBe(true);
    });

    it('should return true if there is no user input', () => {
      component.attribute.userInput = undefined;
      expect(component.isUserInputEmpty).toBe(true);
    });
  });

  describe('compileShowRequiredErrorMessage', () => {
    it('should create observable that emits false in case configuration is in initial state', () => {
      const falseEmittingObs = cold('a', { a: false });
      isCartEntryOrGroupVisited = falseEmittingObs;
      component['compileShowRequiredErrorMessage']();
      expect(component.showRequiredErrorMessage$).toBeObservable(
        falseEmittingObs
      );
    });
  });

  describe('calculateDebounceTime', () => {
    it('should return debounce time from configuration if available', () => {
      expect(component['calculateDebounceTime']()).toBe(DEBOUNCE_TIME);
    });

    it('should return fallback if nothing available in configuration', () => {
      component['config'].productConfigurator = {};
      expect(component['calculateDebounceTime']()).toBe(
        component['FALLBACK_DEBOUNCE_TIME']
      );
    });

    it('should return debounce time for dates in case provided', () => {
      component['debounceForDateActive'] = true;
      component.attribute.uiType = Configurator.UiType.SAP_DATE;
      expect(component['calculateDebounceTime']()).toBe(DEBOUNCE_TIME_DATE);
    });

    it('should return zero if debounceForDateActive is false', () => {
      component['debounceForDateActive'] = false;
      component.attribute.uiType = Configurator.UiType.SAP_DATE;
      expect(component['calculateDebounceTime']()).toBe(0);
    });

    it('should return fallback debounce time for dates in case not provided in configuration', () => {
      component['debounceForDateActive'] = true;
      component.attribute.uiType = Configurator.UiType.SAP_DATE;
      component['config'].productConfigurator = {};
      expect(component['calculateDebounceTime']()).toBe(
        component['FALLBACK_DEBOUNCE_TIME_DATE']
      );
    });
  });

  describe('activateDebounceDate', () => {
    it('should activate the debounce time for date input', () => {
      expect(component['debounceForDateActive']).toBe(false);
      component.activateDebounceDate();
      expect(component['debounceForDateActive']).toBe(true);
    });
  });

  describe('inputType', () => {
    it('should return "text" for UI type string', () => {
      expect(component.inputType).toBe('text');
    });

    it('should return "date" for UI type sap_date', () => {
      component.attribute.uiType = Configurator.UiType.SAP_DATE;
      expect(component.inputType).toBe('date');
    });

    it('should return "date" for UI type DDLB with additional value and validation type sap date', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.SAP_DATE;
      expect(component.inputType).toBe('date');
    });

    it('should return "date" for UI type RB with additional value and validation type sap date', () => {
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.SAP_DATE;
      expect(component.inputType).toBe('date');
    });

    it('should return "text" for UI type DDLB with additional value and validation type NONE', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      component.attribute.validationType = Configurator.ValidationType.NONE;
      expect(component.inputType).toBe('text');
    });
  });
});
