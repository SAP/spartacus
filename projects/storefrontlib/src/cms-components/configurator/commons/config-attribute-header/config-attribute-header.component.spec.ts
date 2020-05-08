import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator, I18nTestingModule } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
import { ConfigAttributeHeaderComponent } from './config-attribute-header.component';
import { GenericConfigurator } from "../../../../../../../dist/core/src/model";


describe('ConfigAttributeHeaderComponent', () => {
  let classUnderTest: ConfigAttributeHeaderComponent;
  let fixture: ComponentFixture<ConfigAttributeHeaderComponent>;
  const currentAttribute: Configurator.Attribute = {
    name: 'attributeId',
    uiType: Configurator.UiType.RADIOBUTTON,
    images: [
      {
        url: 'someImageURL',
      },
    ],
  };
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigAttributeHeaderComponent],
      providers: [
        ConfigUIKeyGeneratorService,
      ],
    })
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeHeaderComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.attribute = currentAttribute;
    classUnderTest.attribute.label = 'label of attribute';
    classUnderTest.attribute.name = '123';
    classUnderTest.attribute.incomplete = true;
    classUnderTest.attribute.required = false;
    classUnderTest.ownerType =  GenericConfigurator.OwnerType.CART_ENTRY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should provide public access to uiKeyGenerator', () => {
    expect(classUnderTest.uiKeyGenerator).toBe(
      TestBed.inject(ConfigUIKeyGeneratorService)
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
    ).toEqual(classUnderTest.attribute.label);
    expectElementNotPresent(
      htmlElem,
      '.cx-config-attribute-label-required-icon'
    );
  });

  it('should render a label as required', () => {
    classUnderTest.attribute.required = true;
    fixture.detectChanges();
    expectElementPresent(htmlElem, '.cx-config-attribute-label-required-icon');
  });

  it('should render an image', () => {
    expectElementPresent(htmlElem, '.cx-config-attribute-img');
  });

  it('should return single select message key for radio button attributes', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.RADIOBUTTON;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return single select message key for ddlb attributes', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.DROPDOWN;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return single select message key for single-selection-image attributes', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return multi select message key for check box list attributes', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.CHECKBOX;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'multiSelectRequiredMessage'
    );
  });

  it('should return multi select message key for multi-selection-image list attributes', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'multiSelectRequiredMessage'
    );
  });

  it('should return no key for not implemented attribute', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
    expect(classUnderTest.getRequiredMessageKey()).toBe(undefined);
  });

  it('should return no key for read only attribute', () => {
    classUnderTest.attribute.uiType = Configurator.UiType.READ_ONLY;
    expect(classUnderTest.getRequiredMessageKey()).toBe(undefined);
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
