import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorType } from 'feature-libs/product-configurator/common';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorSerializer } from './cpq-configurator-serializer';

const configId = '1';
const attrCodeFirst = 111;
const attrCode = 222;
const attributeName = '9999';
const selectedSingleValue = 'SomeValue';
const value1: Configurator.Value = { valueCode: 'ValueCode1', selected: true };
const value2: Configurator.Value = { valueCode: 'ValueCode2', selected: false };
const value3: Configurator.Value = { valueCode: 'ValueCode3', selected: true };
const userInput = '123';
const expectedValueIdsMulti = 'ValueCode1,ValueCode3,';
const expectedValueIdsMultiNoSelection = ',';
const expectedProcessedSingleValueNoValue = ',';
const firstGroupId = '1';

const firstAttribute: Configurator.Attribute = {
  attrCode: attrCodeFirst,
  name: attributeName,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: selectedSingleValue,
  quantity: 5,
  groupId: firstGroupId,
};

const attributeRB: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: selectedSingleValue,
};

const attributeRB_PRODUCT: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.RADIOBUTTON_PRODUCT,
  selectedSingleValue: selectedSingleValue,
};

const attributeDDLB: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.DROPDOWN,
  selectedSingleValue: selectedSingleValue,
};

const attributeDDLB_PRODUCT: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.DROPDOWN_PRODUCT,
  selectedSingleValue: selectedSingleValue,
};

const attributeSSI: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
  selectedSingleValue: selectedSingleValue,
};

const attributeCB: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.CHECKBOX,
  values: [value1, value2, value3],
};

const attributeCBList: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.CHECKBOXLIST,
  values: [value1, value2, value3],
};

const attributeCBListNoSelection: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.CHECKBOXLIST,
  values: [],
};

const attributeCBList_PRODUCT: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.CHECKBOXLIST_PRODUCT,
  values: [value1, value2, value3],
};

const attributeMSI: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
  values: [value1, value2, value3],
};

const attributeString: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.STRING,
  userInput: userInput,
};

const attributeNumeric: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.NUMERIC,
  userInput: userInput,
};

const groups: Configurator.Group[] = [
  {
    configurable: true,
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    attributes: [firstAttribute, attributeRB],
  },
  {
    configurable: true,
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    attributes: [attributeDDLB, attributeCB],
  },
];

const configuration: Configurator.Configuration = {
  configId: configId,
  groups: groups,
  owner: { key: 'A', configuratorType: ConfiguratorType.CPQ },
};

describe('CpqConfiguratorSerializer', () => {
  let cpqConfiguratorSerializer: CpqConfiguratorSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorSerializer],
    });

    cpqConfiguratorSerializer = TestBed.inject(
      CpqConfiguratorSerializer as Type<CpqConfiguratorSerializer>
    );

    configuration.updateType = Configurator.UpdateType.ATTRIBUTE;
  });

  function verifyUpdateAttributeSingleValue(
    updateAttribute: Cpq.UpdateAttribute
  ) {
    expect(updateAttribute.configurationId).toBe(configId);
    expect(updateAttribute.standardAttributeCode).toBe(attrCode.toString());
    expect(updateAttribute.changeAttributeValue.attributeValueIds).toBe(
      selectedSingleValue
    );
    expect(updateAttribute.changeAttributeValue.userInput).toBeUndefined();
  }

  function verifyUpdateAttributeMultiValue(
    updateAttribute: Cpq.UpdateAttribute
  ) {
    expect(updateAttribute.configurationId).toBe(configId);
    expect(updateAttribute.standardAttributeCode).toBe(attrCode.toString());
    expect(updateAttribute.changeAttributeValue.attributeValueIds).toBe(
      expectedValueIdsMulti
    );
    expect(updateAttribute.changeAttributeValue.userInput).toBeUndefined();
  }

  function verifyUpdateAttributeUserInput(
    updateAttribute: Cpq.UpdateAttribute
  ) {
    expect(updateAttribute.configurationId).toBe(configId);
    expect(updateAttribute.standardAttributeCode).toBe(attrCode.toString());
    expect(
      updateAttribute.changeAttributeValue.attributeValueIds
    ).toBeUndefined();
    expect(updateAttribute.changeAttributeValue.userInput).toBe(userInput);
  }

  it('should be created', () => {
    expect(cpqConfiguratorSerializer).toBeTruthy();
  });

  describe('single selection types', () => {
    it('should convert radio button', () => {
      verifyUpdateAttributeSingleValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeRB, configId)
      );
    });

    it('should convert radio button (product)', () => {
      verifyUpdateAttributeSingleValue(
        cpqConfiguratorSerializer['convertAttribute'](
          attributeRB_PRODUCT,
          configId
        )
      );
    });

    it('should convert dropdown', () => {
      verifyUpdateAttributeSingleValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeDDLB, configId)
      );
    });

    it('should convert dropdown (product)', () => {
      verifyUpdateAttributeSingleValue(
        cpqConfiguratorSerializer['convertAttribute'](
          attributeDDLB_PRODUCT,
          configId
        )
      );
    });

    it('should convert single-selection-image', () => {
      verifyUpdateAttributeSingleValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeSSI, configId)
      );
    });
  });

  describe('multi selection types', () => {
    it('should convert checkbox', () => {
      verifyUpdateAttributeMultiValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeCB, configId)
      );
    });

    it('should convert checkboxlist', () => {
      verifyUpdateAttributeMultiValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeCBList, configId)
      );
    });

    it('should convert checkboxlist (product)', () => {
      verifyUpdateAttributeMultiValue(
        cpqConfiguratorSerializer['convertAttribute'](
          attributeCBList_PRODUCT,
          configId
        )
      );
    });

    it('should convert multi-selection-image', () => {
      verifyUpdateAttributeMultiValue(
        cpqConfiguratorSerializer['convertAttribute'](attributeMSI, configId)
      );
    });
  });

  it('should convert user input attribute types correctly', () => {
    const updateAttributeString: Cpq.UpdateAttribute = cpqConfiguratorSerializer[
      'convertAttribute'
    ](attributeString, configId);
    const updateAttributeNumeric: Cpq.UpdateAttribute = cpqConfiguratorSerializer[
      'convertAttribute'
    ](attributeNumeric, configId);

    verifyUpdateAttributeUserInput(updateAttributeString);
    verifyUpdateAttributeUserInput(updateAttributeNumeric);
  });

  it('should convert user input attribute type with empty input correctly', () => {
    const attributeWithEmptyUserInput: Configurator.Attribute = {
      ...attributeString,
      userInput: '',
    };
    const updateAttributeWithEmptyUserInput: Cpq.UpdateAttribute = cpqConfiguratorSerializer[
      'convertAttribute'
    ](attributeWithEmptyUserInput, configId);
    expect(
      updateAttributeWithEmptyUserInput.changeAttributeValue.userInput
    ).toBe(' ');
  });

  it('should process single selected value correctly', () => {
    const processedValue: string = cpqConfiguratorSerializer[
      'processSelectedSingleValue'
    ](selectedSingleValue);
    expect(processedValue).toBe(selectedSingleValue);
  });

  it('should process single selected value correctly when no value is selected', () => {
    const singleValue = undefined;
    const processedValue: string = cpqConfiguratorSerializer[
      'processSelectedSingleValue'
    ](singleValue);
    expect(processedValue).toBe(expectedProcessedSingleValueNoValue);
  });

  it('should prepare value ids correctly', () => {
    const valueIds: string = cpqConfiguratorSerializer['prepareValueIds'](
      attributeCBList
    );
    expect(valueIds).toBe(expectedValueIdsMulti);
  });

  it('should prepare value ids correctly when nothing is selected', () => {
    const valueIds: string = cpqConfiguratorSerializer['prepareValueIds'](
      attributeCBListNoSelection
    );
    expect(valueIds).toBe(expectedValueIdsMultiNoSelection);
  });

  it('should find first updated attribute correctly', () => {
    const attribute: Configurator.Attribute = cpqConfiguratorSerializer[
      'findFirstChangedAttribute'
    ](configuration);
    expect(attribute).toBe(firstAttribute);
  });

  it('should convert configuration correctly', () => {
    const updateAttribute: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convert(
      configuration
    );
    expect(updateAttribute.configurationId).toBe(configId);
    expect(updateAttribute.standardAttributeCode).toBe(
      attrCodeFirst.toString()
    );
    expect(updateAttribute.changeAttributeValue.attributeValueIds).toBe(
      selectedSingleValue
    );
    expect(updateAttribute.changeAttributeValue.userInput).toBeUndefined();
    expect(updateAttribute.tabId).toBe(firstGroupId);
  });

  it('should convert quantity changes', () => {
    configuration.updateType = Configurator.UpdateType.ATTRIBUTE_QUANTITY;
    const updateValues = cpqConfiguratorSerializer.convert(configuration);
    expect(updateValues.configurationId).toBe(configId);
    expect(updateValues.standardAttributeCode).toBe(attrCodeFirst.toString());
    expect(updateValues.changeAttributeValue.quantity).toBe(5);
    expect(updateValues.changeAttributeValue.attributeValueIds).toBeUndefined();
    expect(updateValues.changeAttributeValue.userInput).toBeUndefined();
    expect(updateValues.tabId).toBe(firstGroupId);
  });
});
