import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeNumericInputFieldComponent } from './config-attribute-numeric-input-field.component';
import createSpy = jasmine.createSpy;
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
  let htmlElem: HTMLElement;
  const decimalPipe: DecimalPipe = new DecimalPipe('en');
  beforeEach(async(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: createSpy().and.returnValue(of('en')),
      setActive: createSpy(),
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

  it('should be able to create an event from the user input', () => {
    const event: ConfigFormUpdateEvent = component.createEventFromInput();
    expect(event).toBeDefined();
    expect(event.changedAttribute).toBeDefined();
    expect(event.changedAttribute.userInput).toBe(userInput);
  });

  it('should display no validation issue if input is fine', () => {
    component.ngOnInit();
    fixture.detectChanges();
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display no validation issue if no separators are present and maximum length not reached', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('2');
    checkForValidationMessage(component, fixture, htmlElem, 0);
  });

  it('should display a validation issue if input contains to many decimal separators', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('234.23.12');
    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should display a validation issue if input is too long', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('23234576654345');
    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should display a validation issue if input including decimal places is too long', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('232345766543.45');
    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should compile pattern for validation message', () => {
    component.compilePatternForValidationMessage(decimalPipe, 3, 10);
    expect(component.numericFormatPattern).toBe('#,###,###.###');
  });

  it('should compile pattern for validation message in case no decimal places are present', () => {
    component.compilePatternForValidationMessage(decimalPipe, 0, 10);
    expect(component.numericFormatPattern).toBe('#,###,###,###');
  });
});
