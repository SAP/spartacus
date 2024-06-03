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
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeInputFieldComponent } from './configurator-attribute-input-field.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}
class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

const isCartEntryOrGroupVisited = true;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(isCartEntryOrGroupVisited);
  }
}

describe('ConfiguratorAttributeInputFieldComponent', () => {
  let component: ConfiguratorAttributeInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeInputFieldComponent>;
  let htmlElem: HTMLElement;
  let DEBOUNCE_TIME: number;
  const ownerKey = 'theOwnerKey';
  const name = 'attributeName';
  const groupId = 'theGroupId';
  const userInput = 'theUserInput';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeInputFieldComponent,
          MockFocusDirective,
        ],
        imports: [ReactiveFormsModule, I18nTestingModule],
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
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '*' },
            },
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeInputFieldComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

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
    DEBOUNCE_TIME =
      defaultConfiguratorUISettingsConfig.productConfigurator
        ?.updateDebounceTime?.input ?? component['FALLBACK_DEBOUNCE_TIME'];
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
});
