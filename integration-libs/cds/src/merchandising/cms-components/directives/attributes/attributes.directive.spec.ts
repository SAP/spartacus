import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AttributesModule } from './attributes.module';

const testAttributeName = 'test-attribute';
const testAttributeValue = 'test-attribute-value';
const attributeNamePrefix = 'attribute-prefix';

@Component({
  selector: 'cx-test-cmp',
  template: `
    <div
      [cxAttributes]="attributes"
      [cxAttributesNamePrefix]="attributesNamePrefix"
    ></div>
  `,
})
class TestComponent {
  attributes: { [attribute: string]: any };
  attributesNamePrefix: string;
}

describe('cxAttributes directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let divWithDirective: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AttributesModule],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    divWithDirective = fixture.debugElement.query(By.css('div'));
  });

  it('should not add any custom attributes if none are provided', () => {
    const expectedAttributes = {
      'ng-reflect-cx-attributes-name-prefix': attributeNamePrefix,
    };

    testComponent.attributesNamePrefix = attributeNamePrefix;

    fixture.detectChanges();
    expect(divWithDirective.attributes).toEqual(expectedAttributes);
  });

  it('should add custom attributes with no prefix if only attributes are provided', () => {
    const mockAttributes = { [testAttributeName]: testAttributeValue };

    const expectedAttributes = {};
    expectedAttributes[testAttributeName] = testAttributeValue;

    testComponent.attributes = mockAttributes;

    fixture.detectChanges();
    expect(divWithDirective.attributes).toEqual(
      jasmine.objectContaining(expectedAttributes)
    );
  });

  it('should add custom attributes with a prefix if both attributes and a prefix are provided', () => {
    const mockAttributes = { [testAttributeName]: testAttributeValue };

    const expectedAttributes = {};
    expectedAttributes[`${attributeNamePrefix}-${testAttributeName}`] =
      testAttributeValue;

    testComponent.attributes = mockAttributes;
    testComponent.attributesNamePrefix = attributeNamePrefix;

    fixture.detectChanges();
    expect(divWithDirective.attributes).toEqual(
      jasmine.objectContaining(expectedAttributes)
    );
  });

  it('should not add any custom attributes that have falsey values', () => {
    const mockAttributes = {
      [testAttributeName]: testAttributeValue,
      'undefined-attribute': undefined,
      'null-attribute': null,
    };

    const expectedAttributes = {};
    expectedAttributes[`${attributeNamePrefix}-${testAttributeName}`] =
      testAttributeValue;

    testComponent.attributes = mockAttributes;
    testComponent.attributesNamePrefix = attributeNamePrefix;

    fixture.detectChanges();
    expect(divWithDirective.attributes).toEqual(
      jasmine.objectContaining(expectedAttributes)
    );
  });
});
