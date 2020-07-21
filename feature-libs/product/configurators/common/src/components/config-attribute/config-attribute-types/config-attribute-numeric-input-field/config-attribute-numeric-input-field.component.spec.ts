import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';
import { ConfigAttributeNumericInputFieldComponent } from './config-attribute-numeric-input-field.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

function checkForValidationMessage(
  component: ConfigAttributeNumericInputFieldComponent,
  fixture: ComponentFixture<ConfigAttributeNumericInputFieldComponent>,
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
  let component: ConfigAttributeNumericInputFieldComponent;
  const userInput = '345.00';
  let fixture: ComponentFixture<ConfigAttributeNumericInputFieldComponent>;
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
        ConfigAttributeNumericInputFieldComponent,
        MockTranslateUrlPipe,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        ConfigUIKeyGeneratorService,
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(ConfigAttributeNumericInputFieldComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigAttributeNumericInputFieldComponent
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
