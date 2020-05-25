import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
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

describe('ConfigAttributeInputFieldComponent', () => {
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
    };
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    component.ngOnInit();
    expect(component.attributeInputForm.value).toEqual(userInput);
  });

  it('should display no validation issue if input is fine', () => {
    component.ngOnInit();
    fixture.detectChanges();
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display no validation issue if input is fine, an unknown locale was requested, and we fall back to en locale', () => {
    locale = 'Unkonwn';
    component.ngOnInit();
    fixture.detectChanges();
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display a validation issue if alphanumeric characters occur', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('122A23');

    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should not set control value in case the model attribute does not carry a value', () => {
    component.attribute.userInput = null;
    component.ngOnInit();
    expect(component.attributeInputForm.value).toBe('');
  });

  it('should display a validation issue if input is too long', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('23234,576654345');
    checkForValidationMessage(component, fixture, htmlElem, 1);
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
