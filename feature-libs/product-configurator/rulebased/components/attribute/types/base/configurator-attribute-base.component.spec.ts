import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';

const attributeCode = 1;
const currentAttribute: Configurator.Attribute = {
  name: 'attributeId',
  attrCode: attributeCode,
  uiType: Configurator.UiType.RADIOBUTTON,
};

const attributeIncomplete: Configurator.Attribute = { name: 'name' };

describe('ConfigUIKeyGeneratorService', () => {
  let classUnderTest: ConfiguratorAttributeBaseComponent;

  beforeEach(() => {
    classUnderTest = new ConfiguratorAttributeBaseComponent();
  });

  it('should generate value key', () => {
    expect(
      classUnderTest.createValueUiKey('prefix', 'attributeId', 'valueId')
    ).toBe('cx-configurator--prefix--attributeId--valueId');
  });

  it('should generate attribute key', () => {
    expect(classUnderTest.createAttributeUiKey('prefix', 'attributeId')).toBe(
      'cx-configurator--prefix--attributeId'
    );
  });

  it('should return only attribute id for aria-labelledby', () => {
    expect(
      classUnderTest.createAriaLabelledBy('prefix', 'attributeId')
    ).toEqual('cx-configurator--label--attributeId');
  });

  it("should return only attribute id for aria-labelledby because value id is 'undefined'", () => {
    expect(
      classUnderTest.createAriaLabelledBy('prefix', 'attributeId', undefined)
    ).toEqual('cx-configurator--label--attributeId');
  });

  it('should return attribute id, value id  and without quantity for aria-labelledby', () => {
    expect(
      classUnderTest.createAriaLabelledBy('prefix', 'attributeId', 'valueId')
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it('should return attribute id, value id  and with undefined quantity for aria-labelledby', () => {
    expect(
      classUnderTest.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId',
        undefined
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it("should return attribute id, value id  and with quantity equals 'true' for aria-labelledby", () => {
    expect(
      classUnderTest.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId',
        true
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it("should return attribute id, value id  and with quantity equals 'false' for aria-labelledby", () => {
    expect(
      classUnderTest.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId',
        false
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--option--price--attributeId--valueId'
    );
  });

  it('should generate attribute id for configurator', () => {
    expect(
      classUnderTest.createAttributeIdForConfigurator(currentAttribute)
    ).toBe('cx-configurator--radioGroup--attributeId');
  });

  it('should generate value id for configurator', () => {
    expect(
      classUnderTest.createAttributeValueIdForConfigurator(
        currentAttribute,
        'valueId'
      )
    ).toBe('cx-configurator--radioGroup--attributeId--valueId');
  });

  it('should generate focus id for attribute value', () => {
    expect(classUnderTest.createFocusId('attrCode', 'valueCode')).toBe(
      'attrCode--valueCode--focus'
    );
  });

  describe('getUiType', () => {
    it('should return ui type from attribute if set on attribute level', () => {
      expect(classUnderTest['getUiType'](currentAttribute)).toBe(
        Configurator.UiType.RADIOBUTTON
      );
    });
    it('should return ui type "not implemented" if not available on attribute', () => {
      expect(classUnderTest['getUiType'](attributeIncomplete)).toBe(
        Configurator.UiType.NOT_IMPLEMENTED
      );
    });
  });

  describe('getAttributeCode', () => {
    it('should return code from attribute if available', () => {
      expect(classUnderTest['getAttributeCode'](currentAttribute)).toBe(
        attributeCode
      );
    });
    it('should throw exception if no code available', () => {
      expect(() =>
        classUnderTest['getAttributeCode'](attributeIncomplete)
      ).toThrow();
    });
  });
});
