import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeReadOnlyComponent } from './config-attribute-read-only.component';

describe('ConfigAttributeReadOnlyComponent', () => {
  let component: ConfigAttributeReadOnlyComponent;
  let fixture: ComponentFixture<ConfigAttributeReadOnlyComponent>;
  let htmlElem: HTMLElement;
  const myValues: Configurator.Value[] = [
    {
      valueCode: 'val1',
      valueDisplay: 'Value 1',
      selected: false,
    },
    {
      valueCode: 'val2',
      valueDisplay: 'Value 2',
      selected: true,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeReadOnlyComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeReadOnlyComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeReadOnlyComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = {
      name: 'valueName',
      stdAttrCode: 444,
      uiType: Configurator.UiType.READ_ONLY,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selectedSingleValue for attribute without domain', () => {
    expectElementPresent(
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    expectElementToContainText(
      htmlElem,
      '.cx-config-attribute-value-label-read-only',
      'selectedValue'
    );
  });

  it('should display valueDisplay of selected value for attribute with domain', () => {
    component.attribute.values = myValues;
    fixture.detectChanges();
    expectElementPresent(
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    expectElementToContainText(
      htmlElem,
      '.cx-config-attribute-value-label-read-only',
      'Value 2'
    );
  });

  it('should display valueDisplay of all selected values for attribute with domain', () => {
    myValues[0].selected = true;
    component.attribute.values = myValues;
    fixture.detectChanges();
    expectElementPresent(
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    expect(
      htmlElem.querySelectorAll('.cx-config-attribute-value-label-read-only')
        .length
    ).toBe(2);
  });
});

export function expectElementPresent(
  htmlElement: Element,
  querySelector: string
) {
  expect(htmlElement.querySelectorAll(querySelector).length).toBeGreaterThan(
    0,
    "expected element identified by selector '" +
      querySelector +
      "' to be present, but it is NOT! innerHtml: " +
      htmlElement.innerHTML
  );
}

export function expectElementToContainText(
  htmlElement: Element,
  querySelector: string,
  expectedText: string
) {
  expect(htmlElement.querySelector(querySelector).textContent.trim()).toBe(
    expectedText
  );
}
