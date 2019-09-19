import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Attribute, I18nTestingModule, UiType } from '@spartacus/core';
import { UIKeyGeneratorService } from '../service/ui-key-generator.service';
import { AttributeHeaderComponent } from './attribute-header.component';

describe('AttributeHeaderComponent', () => {
  let classUnderTest: AttributeHeaderComponent;
  let fixture: ComponentFixture<AttributeHeaderComponent>;
  const currentAttribute: Attribute = {
    name: 'attributeId',
    uiType: UiType.RADIOBUTTON,
  };
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AttributeHeaderComponent],
      providers: [UIKeyGeneratorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeHeaderComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.currentAttribute = currentAttribute;
    classUnderTest.currentAttribute.label = 'label of attribute';
    classUnderTest.currentAttribute.name = '123';
    classUnderTest.currentAttribute.incomplete = true;
    classUnderTest.currentAttribute.required = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should provide public access to uiKeyGenerator', () => {
    expect(classUnderTest.uiKeyGenerator).toBe(
      TestBed.get(UIKeyGeneratorService)
    );
  });

  it('should render a label', () => {
    expectElementPresent(htmlElem, 'label');
    expectElementToContainText(
      htmlElem,
      '.cx-config-attribute-label',
      'label of attribute'
    );
    const id = htmlElem
      .querySelector('.cx-config-attribute-label')
      .getAttribute('id');
    expect(id.indexOf('123')).toBeGreaterThan(
      0,
      'id of label does not contain the StdAttrCode'
    );
    expect(
      htmlElem
        .querySelector('.cx-config-attribute-label')
        .getAttribute('aria-label')
    ).toEqual(classUnderTest.currentAttribute.label);
    expectElementNotPresent(
      htmlElem,
      '.cx-config-attribute-label-required-icon'
    );
  });

  it('should render a label as required', () => {
    classUnderTest.currentAttribute.required = true;
    fixture.detectChanges();
    expectElementPresent(htmlElem, '.cx-config-attribute-label-required-icon');
  });

  it('should render a required message if attribute has no value, yet.', () => {
    classUnderTest.currentAttribute.required = true;
    fixture.detectChanges();
    expectElementPresent(
      htmlElem,
      '.cx-config-attribute-header-required-message'
    );
  });

  it("shouldm't render a required message if  attribute is incomplete, but  not required.", () => {
    classUnderTest.currentAttribute.required = false;
    classUnderTest.currentAttribute.incomplete = true;
    fixture.detectChanges();
    expectElementNotPresent(
      htmlElem,
      '.cx-config-attribute-header-required-message'
    );
  });

  // Unit Tests
  it('should return default message key for input attributes', () => {
    classUnderTest.currentAttribute.uiType = UiType.INPUT;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'defaultRequiredMessage'
    );
  });
  it('should return single select message key for radio button attributes', () => {
    classUnderTest.currentAttribute.uiType = UiType.RADIOBUTTON;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return single select message key for ddlb attributes', () => {
    classUnderTest.currentAttribute.uiType = UiType.DDLB;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return multi select message key for check box list attributes', () => {
    classUnderTest.currentAttribute.uiType = UiType.CHECKBOX;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'multiSelectRequiredMessage'
    );
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

export function expectElementsToContainTexts(
  htmlElement: Element,
  querySelector: string,
  expectedTexts: string[]
) {
  const elements: NodeListOf<Element> = htmlElement.querySelectorAll(
    querySelector
  );
  expectNumberOfElements(htmlElement, querySelector, expectedTexts.length);
  let index = 0;
  elements.forEach((elem: Element) => {
    expect(elem.textContent.trim()).toBe(
      expectedTexts[index],
      ' for index ' + index
    );
    index++;
  });
}

export function expectNumberOfElements(
  htmlElement: Element,
  querySelector: string,
  expectedNumber: number
) {
  const actualNumber = htmlElement.querySelectorAll(querySelector).length;
  expect(actualNumber).toBe(
    expectedNumber,
    "expected element identified by selector '" +
      querySelector +
      "' to be present " +
      expectedNumber +
      ' times, but it was ' +
      actualNumber +
      ' times! innerHtml: ' +
      htmlElement.innerHTML
  );
}

export function expectElementNotPresent(
  htmlElement: Element,
  querySelector: string
) {
  expect(htmlElement.querySelectorAll(querySelector).length).toBe(
    0,
    "expected element identified by selector '" +
      querySelector +
      "' to be NOT present, but it is! innerHtml: " +
      htmlElement.innerHTML
  );
}
