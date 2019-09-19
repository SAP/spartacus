import { Attribute, UiType } from '@spartacus/core';
import { AttributeHeaderComponent } from './attribute-header.component';

describe('AttributeHeaderComponent (in unit test)', () => {
  let classUnderUnitTest: AttributeHeaderComponent;
  const currentAttribute: Attribute = {
    name: 'attributeId',
    uiType: UiType.RADIOBUTTON,
  };

  beforeEach(() => {
    classUnderUnitTest = new AttributeHeaderComponent(null);
    classUnderUnitTest.currentAttribute = currentAttribute;
  });

  it('should create', () => {
    expect(classUnderUnitTest).toBeTruthy();
  });

  it('should return default message key for input attributes', () => {
    classUnderUnitTest.currentAttribute.uiType = UiType.INPUT;
    expect(classUnderUnitTest.getRequiredMessageKey()).toContain(
      'defaultRequiredMessage'
    );
  });

  it('should return single select message key for radio button attributes', () => {
    classUnderUnitTest.currentAttribute.uiType = UiType.RADIOBUTTON;
    expect(classUnderUnitTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return single select message key for ddlb attributes', () => {
    classUnderUnitTest.currentAttribute.uiType = UiType.DDLB;
    expect(classUnderUnitTest.getRequiredMessageKey()).toContain(
      'singleSelectRequiredMessage'
    );
  });

  it('should return multi select message key for check box list attributes', () => {
    classUnderUnitTest.currentAttribute.uiType = UiType.CHECKBOX;
    expect(classUnderUnitTest.getRequiredMessageKey()).toContain(
      'multiSelectRequiredMessage'
    );
  });
});
