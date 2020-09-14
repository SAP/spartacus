import {
  ChangeDetectionStrategy,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
import { ConfiguratorAttributeNumericInputFieldComponent } from './configurator-attribute-numeric-input-field.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config;
}

function checkForValidationMessage(
  component: ConfiguratorAttributeNumericInputFieldComponent,
  fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>,
  htmlElem: HTMLElement,
  expectedMessages
) {
  component.attributeInputForm.markAsDirty();

  fixture.detectChanges();
  const validationDiv = htmlElem.getElementsByClassName(
    'cx-config-attribute-numeric-input-validation-message'
  );
  expect(validationDiv).toBeDefined();
  expect(validationDiv.length).toBe(expectedMessages);
}

describe('ConfigAttributeNumericInputFieldComponent', () => {
  let component: ConfiguratorAttributeNumericInputFieldComponent;
  const userInput = '345.00';
  let fixture: ComponentFixture<ConfiguratorAttributeNumericInputFieldComponent>;
  let mockLanguageService;
  let locale = 'en';
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: jasmine.createSpy().and.returnValue(of(locale)),
      setActive: jasmine.createSpy(),
    };
    TestBed.configureTestingModule({
      declarations: [
        ConfiguratorAttributeNumericInputFieldComponent,
        MockTranslateUrlPipe,
        MockFocusDirective,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        ConfiguratorUIKeyGenerator,
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(ConfiguratorAttributeNumericInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeNumericInputFieldComponent
    );
    component = fixture.componentInstance;
    component.attribute = {
      name: 'attributeName',
      uiType: Configurator.UiType.STRING,
      userInput: userInput,
      numDecimalPlaces: 2,
      numTotalLength: 10,
      negativeAllowed: false,
    };
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    component.ngOnInit();
    expect(component.attributeInputForm.value).toEqual(userInput);
  });

  it('should display no validation issue if input is fine, an unknown locale was requested, and we fall back to en locale', () => {
    locale = 'Unkonwn';
    component.ngOnInit();
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display a validation issue if alphanumeric characters occur', () => {
    checkForValidity('122A23', false, false);
  });

  it('should display a validation issue if negative sign is included but not allowed to', () => {
    checkForValidity('-122323', false, false);
  });

  it('should display no validation issue if negative sign is included and allowed', () => {
    checkForValidity('-122323', true, true);
  });

  it('should display a validation issue if input is too long', () => {
    checkForValidity('123456789.34', false, false);
  });

  it('should display a validation issue if input is too long and negatives allowed', () => {
    checkForValidity('123456789.34', true, false);
  });

  it('should display no validation issue if input length matches meta data exactly', () => {
    checkForValidity('12345678.34', false, true);
  });

  it('should display no validation issue if input length matches meta data exactly and negatives are allowed', () => {
    checkForValidity('12345678.34', true, true);
  });

  it('should display no validation issue for negative value if input length matches meta data exactly and negatives are allowed', () => {
    checkForValidity('-12345678.34', true, true);
  });

  it('should display no validation issue for single minus if negatives are allowed', () => {
    checkForValidity('-', true, true);
  });

  it('should not set control value in case the model attribute does not carry a value', () => {
    component.attribute.userInput = null;
    component.ngOnInit();
    expect(component.attributeInputForm.value).toBe('');
  });

  it('should raise event in case input was changed', () => {
    spyOn(component.inputChange, 'emit').and.callThrough();
    component.onChange();
    expect(component.inputChange.emit).toHaveBeenCalled();
  });

  it('should raise no event in case input was changed and control is invalid', () => {
    spyOn(component.inputChange, 'emit').and.callThrough();
    component.ngOnInit();
    component.attributeInputForm.setValue('122A23');
    component.onChange();
    expect(component.inputChange.emit).toHaveBeenCalledTimes(0);
  });
});
