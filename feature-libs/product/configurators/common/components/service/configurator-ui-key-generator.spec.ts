import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorUIKeyGenerator } from './configurator-ui-key-generator';

describe('ConfigUIKeyGeneratorService', () => {
  const currentAttribute: Configurator.Attribute = {
    name: 'attributeId',
    uiType: Configurator.UiType.RADIOBUTTON,
  };

  it('should generate value key', () => {
    expect(
      ConfiguratorUIKeyGenerator.createValueUiKey(
        'prefix',
        'attributeId',
        'valueId'
      )
    ).toBe('cx-configurator--prefix--attributeId--valueId');
  });

  it('should generate attribute key', () => {
    expect(
      ConfiguratorUIKeyGenerator.createAttributeUiKey('prefix', 'attributeId')
    ).toBe('cx-configurator--prefix--attributeId');
  });

  it('should return only attribute id for aria-labelledby', () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy('prefix', 'attributeId')
    ).toEqual('cx-configurator--label--attributeId');
  });

  it("should return only attribute id for aria-labelledby because value id is 'undefined'", () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
        'prefix',
        'attributeId',
        undefined
      )
    ).toEqual('cx-configurator--label--attributeId');
  });

  it("should return only attribute id for aria-labelledby because value id is 'null'", () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
        'prefix',
        'attributeId',
        null
      )
    ).toEqual('cx-configurator--label--attributeId');
  });

  it('should return attribute id, value id  and without quantity for aria-labelledby', () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId'
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it('should return attribute id, value id  and with undefined quantity for aria-labelledby', () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId',
        undefined
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it("should return attribute id, value id  and with quantity equals 'null' for aria-labelledby", () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
        'prefix',
        'attributeId',
        'valueId',
        null
      )
    ).toEqual(
      'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
    );
  });

  it("should return attribute id, value id  and with quantity equals 'true' for aria-labelledby", () => {
    expect(
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
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
      ConfiguratorUIKeyGenerator.createAriaLabelledBy(
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
      ConfiguratorUIKeyGenerator.createAttributeIdForConfigurator(
        currentAttribute
      )
    ).toBe('cx-configurator--radioGroup--attributeId');
  });

  it('should generate value id for configurator', () => {
    expect(
      ConfiguratorUIKeyGenerator.createAttributeValueIdForConfigurator(
        currentAttribute,
        'valueId'
      )
    ).toBe('cx-configurator--radioGroup--attributeId--valueId');
  });
});
