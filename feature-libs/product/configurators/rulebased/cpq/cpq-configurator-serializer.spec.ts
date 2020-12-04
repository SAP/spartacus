import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CpqConfiguratorSerializer } from './cpq-configurator-serializer';
import { Cpq } from './cpq.models';
import { Configurator } from './../core/model/configurator.model';

const configId = '1';
const attrCodeFirst = 111;
const attrCode = 222;
const attributeName = 'AttrName';
const selectedSingleValue = 'SomeValue';
const value1: Configurator.Value = { valueCode: 'ValueCode1', selected: true };
const value2: Configurator.Value = { valueCode: 'ValueCode2', selected: false };
const value3: Configurator.Value = { valueCode: 'ValueCode3', selected: true };
const userInput = '123';
const expectedValueIdsMulti = 'ValueCode1,ValueCode3,';

const firstAttribute: Configurator.Attribute = {
  attrCode: attrCodeFirst,
  name: attributeName,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: selectedSingleValue,
};

const attributeRB: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: selectedSingleValue,
};
const attributeDDLB: Configurator.Attribute = {
  attrCode: attrCode,
  name: attributeName,
  uiType: Configurator.UiType.DROPDOWN,
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

  it('should convert radio button, dropdown and single-selection-image attribute types correctly', () => {
    const updateAttributeRB: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeRB,
      configId
    );
    const updateAttributeDDLB: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeDDLB,
      configId
    );
    const updateAttributeSSI: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeSSI,
      configId
    );
    verifyUpdateAttributeSingleValue(updateAttributeRB);
    verifyUpdateAttributeSingleValue(updateAttributeDDLB);
    verifyUpdateAttributeSingleValue(updateAttributeSSI);
  });

  it('should convert checkbox, checkboxlist and multi-selection-image attribute types correctly', () => {
    const updateAttributeCB: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeCB,
      configId
    );
    const updateAttributeCBList: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeCBList,
      configId
    );
    const updateAttributeMSI: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeMSI,
      configId
    );

    verifyUpdateAttributeMultiValue(updateAttributeCB);
    verifyUpdateAttributeMultiValue(updateAttributeCBList);
    verifyUpdateAttributeMultiValue(updateAttributeMSI);
  });

  it('should convert user input attribute types correctly', () => {
    const updateAttributeString: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeString,
      configId
    );
    const updateAttributeNumeric: Cpq.UpdateAttribute = cpqConfiguratorSerializer.convertAttribute(
      attributeNumeric,
      configId
    );

    verifyUpdateAttributeUserInput(updateAttributeString);
    verifyUpdateAttributeUserInput(updateAttributeNumeric);
  });

  it('should prepare value ids correctly', () => {
    const valueIds: string = cpqConfiguratorSerializer.prepareValueIds(
      attributeCBList
    );
    expect(valueIds).toBe(expectedValueIdsMulti);
  });

  it('should find first updated attribute correctly', () => {
    const attribute: Configurator.Attribute = cpqConfiguratorSerializer.findFirstChangedAttribute(
      configuration
    );
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
  });
});
