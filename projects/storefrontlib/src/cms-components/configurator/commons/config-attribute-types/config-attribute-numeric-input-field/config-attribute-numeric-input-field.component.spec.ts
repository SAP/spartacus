import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
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
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: jasmine.createSpy().and.returnValue(of('en')),
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

  it('should display a validation issue if alphanumeric characters occur', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('122A23');

    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should display a validation issue if input is too long', () => {
    component.ngOnInit();
    component.attributeInputForm.setValue('23234,576654345');
    checkForValidationMessage(component, fixture, htmlElem, 1);
  });

  it('should compile pattern for validation message', () => {
    component.compilePatternForValidationMessage(3, 10);
    expect(component.numericFormatPattern).toBe('#,###,###.###');
  });

  it('should compile pattern for validation message in case no decimal places are present', () => {
    component.compilePatternForValidationMessage(0, 10);
    expect(component.numericFormatPattern).toBe('#,###,###,###');
  });

  it('should accept integer that exactly matches the maximum length ', () => {
    expect(
      component.performValidationAccordingToMetaData('1,234', ',', '.', 4, 0)
    ).toBe(false);
  });

  it('should accept multiple thousand separators', () => {
    expect(
      component.performValidationAccordingToMetaData('1,23,4', ',', '.', 4, 0)
    ).toBe(false);
  });

  it('should not accept multiple decimal separators', () => {
    expect(
      component.performValidationAccordingToMetaData(
        '1234.22.22',
        ',',
        '.',
        9,
        4
      )
    ).toBe(true);
  });

  it('should not accept integer that exceeds the maximum length ', () => {
    expect(
      component.performValidationAccordingToMetaData('1,234', ',', '.', 3, 0)
    ).toBe(true);
  });

  it('should not accept if numeric input is malformed according to swiss locale settings', () => {
    const input = '1,234';
    expect(
      component.performValidationAccordingToMetaData(input, "'", '.', 4, 0)
    ).toBe(true);
  });
});
