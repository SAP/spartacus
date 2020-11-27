import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CpqConfiguratorNormalizer } from './cpq-configurator-normalizer';
import { Cpq } from './cpq.models';
import { Configurator } from './../core/model/configurator.model';

const cpqProductSystemId = 'PRODUCT_SYSTEM_ID';

const cpqValuePavId = 1;
const cpqValueCode = 'VALUE_CODE';
const cpqValueDisplay = 'VALUE_DISPLAY';
const cpqValueDescription = 'VALUE_DESCRIPTION';
const cpqValueProductSystemId = 'VALUE_PRODUCT_SYSTEM_ID';

const cpqValuePavId2 = 2;
const cpqValueCode2 = 'VALUE_CODE_2';
const cpqValueDisplay2 = 'VALUE_DISPLAY_2';
const cpqValueDescription2 = 'VALUE_DESCRIPTION_2';
const cpqValueProductSystemId2 = 'VALUE_PRODUCT_SYSTEM_ID_2';

const cpqAttributePaId = 1;
const cpqAttributeNameStdAttrCode = 1;
const cpqAttributeName = 'ATTRIBUTE_NAME';
const cpqAttributeDescription = 'VALUE_DESCRIPTION';
const cpqAttributeLabel = 'VALUE_LABEL';
const cpqAttributeDisplayAs = Cpq.DisplayAs.RADIO_BUTTON;
const cpqAttributeRequired = true;
const cpqAttributeIncomplete = true;
const cpqAttributeIsLineItem = true;
const cpqAttributeHasConflict = true;
const cpqAttributeUserInput = '';

const cpqAttributePaId2 = 2;
const cpqAttributeNameStdAttrCode2 = 2;
const cpqAttributeName2 = 'ATTRIBUTE_NAME_2';
const cpqAttributeDescription2 = 'VALUE_DESCRIPTION_2';
const cpqAttributeLabel2 = 'VALUE_LABEL_2';
const cpqAttributeDisplayAs2 = Cpq.DisplayAs.INPUT;
const cpqAttributeRequired2 = false;
const cpqAttributeIncomplete2 = false;
const cpqAttributeIsLineItem2 = false;
const cpqAttributeHasConflict2 = false;
const cpqAttributeUserInput2 = 'USER_INPUT_2';

const cpqGroupId = 1;
const cpqGroupName = 'GROUP_NAME';
const cpqGroupDisplayName = 'GROUP_DISPLAY_NAME';
const cpqGroupIsIncomplete = false;
const cpqGroupIsSelected = true;

const cpqGroupId2 = 2;
const cpqGroupName2 = 'GROUP_NAME2';
const cpqGroupDisplayName2 = 'GROUP_DISPLAY_NAME2';
const cpqGroupIsIncomplete2 = false;
const cpqGroupIsSelected2 = false;

const cpqValue: Cpq.Value = {
  paV_ID: cpqValuePavId,
  valueCode: cpqValueCode,
  valueDisplay: cpqValueDisplay,
  description: cpqValueDescription,
  productSystemId: cpqValueProductSystemId,
  selected: true,
};

const cpqValue2: Cpq.Value = {
  paV_ID: cpqValuePavId2,
  valueCode: cpqValueCode2,
  valueDisplay: cpqValueDisplay2,
  description: cpqValueDescription2,
  productSystemId: cpqValueProductSystemId2,
  selected: false,
};

const cpqAttribute: Cpq.Attribute = {
  pA_ID: cpqAttributePaId,
  stdAttrCode: cpqAttributeNameStdAttrCode,
  name: cpqAttributeName,
  description: cpqAttributeDescription,
  label: cpqAttributeLabel,
  displayAs: cpqAttributeDisplayAs,
  required: cpqAttributeRequired,
  incomplete: cpqAttributeIncomplete,
  isLineItem: cpqAttributeIsLineItem,
  hasConflict: cpqAttributeHasConflict,
  userInput: cpqAttributeUserInput,
  values: [cpqValue, cpqValue2],
};

const cpqAttribute2: Cpq.Attribute = {
  pA_ID: cpqAttributePaId2,
  stdAttrCode: cpqAttributeNameStdAttrCode2,
  name: cpqAttributeName2,
  description: cpqAttributeDescription2,
  label: cpqAttributeLabel2,
  displayAs: cpqAttributeDisplayAs2,
  required: cpqAttributeRequired2,
  incomplete: cpqAttributeIncomplete2,
  isLineItem: cpqAttributeIsLineItem2,
  hasConflict: cpqAttributeHasConflict2,
  userInput: cpqAttributeUserInput2,
  values: [],
};

const cpqAttributes: Cpq.Attribute[] = [cpqAttribute];

const cpqTab: Cpq.Tab = {
  id: cpqGroupId,
  name: cpqGroupName,
  displayName: cpqGroupDisplayName,
  isIncomplete: cpqGroupIsIncomplete,
  isSelected: cpqGroupIsSelected,
};

const cpqTab2: Cpq.Tab = {
  id: cpqGroupId2,
  name: cpqGroupName2,
  displayName: cpqGroupDisplayName2,
  isIncomplete: cpqGroupIsIncomplete2,
  isSelected: cpqGroupIsSelected2,
};

const cpqConfiguration: Cpq.Configuration = {
  productSystemId: cpqProductSystemId,
  incompleteMessages: [],
  incompleteAttributes: [],
  invalidMessages: [],
  failedValidations: [],
  errorMessages: [],
  conflictMessages: [],
  numberOfConflicts: 0,
  tabs: [cpqTab, cpqTab2],
  attributes: [cpqAttribute],
};

const cpqConfigurationIncompleteInconsistent: Cpq.Configuration = {
  productSystemId: cpqProductSystemId,
  incompleteMessages: ['incomplete message'],
  incompleteAttributes: [],
  invalidMessages: [],
  failedValidations: [],
  errorMessages: [],
  conflictMessages: ['conflict message'],
  numberOfConflicts: 1,
  tabs: [],
  attributes: [],
};

describe('CpqConfiguratorNormalizer', () => {
  let cpqConfiguratorNormalizer: CpqConfiguratorNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqConfiguratorNormalizer],
    });

    cpqConfiguratorNormalizer = TestBed.inject(
      CpqConfiguratorNormalizer as Type<CpqConfiguratorNormalizer>
    );
  });

  it('should be created', () => {
    expect(cpqConfiguratorNormalizer).toBeTruthy();
  });

  it('should convert a configuration', () => {
    const result = cpqConfiguratorNormalizer.convert(cpqConfiguration);
    expect(result.productCode).toBe(cpqProductSystemId);
    expect(result.complete).toBe(true);
    expect(result.consistent).toBe(true);
    expect(result.totalNumberOfIssues).toBe(0);
    expect(result.groups.length).toBe(2);
    expect(result.groups[0].id).toBe(cpqGroupId.toString());
    expect(result.groups[0].attributes.length).toBe(1);
    expect(result.groups[1].id).toBe(cpqGroupId2.toString());
    expect(result.groups[1].attributes.length).toBe(0);
  });

  it('should convert an incomplete inconsistent configuration', () => {
    const result = cpqConfiguratorNormalizer.convert(
      cpqConfigurationIncompleteInconsistent
    );
    expect(result.productCode).toBe(cpqProductSystemId);
    expect(result.complete).toBe(false);
    expect(result.consistent).toBe(false);
    expect(result.totalNumberOfIssues).toBe(1);
  });

  it('should convert values', () => {
    const values: Configurator.Value[] = [];
    cpqConfiguratorNormalizer.convertValue(cpqValue, values);
    const value: Configurator.Value = values[0];
    expect(values.length).toBe(1);
    expect(value.valueCode).toBe(cpqValuePavId.toString());
    expect(value.name).toBe(cpqValueCode);
    expect(value.valueDisplay).toBe(cpqValueDisplay);
    expect(value.description).toBe(cpqValueDescription);
    expect(value.productSystemId).toBe(cpqValueProductSystemId);
    expect(value.selected).toBe(true);
  });

  it('should convert attributes with values', () => {
    const attributeList: Configurator.Attribute[] = [];
    cpqConfiguratorNormalizer.convertAttribute(
      cpqAttribute,
      cpqGroupId,
      attributeList
    );
    const attribute: Configurator.Attribute = attributeList[0];
    expect(attributeList.length).toBe(1);
    expect(attribute.attrCode).toBe(cpqAttributePaId);
    expect(attribute.name).toBe(cpqAttributeName);
    expect(attribute.description).toBe(cpqAttributeDescription);
    expect(attribute.label).toBe(cpqAttributeLabel);
    expect(attribute.required).toBe(cpqAttributeRequired);
    expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem);
    expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON);
    expect(attribute.selectedSingleValue).toBe(cpqValuePavId.toString());
    expect(attribute.groupId).toBe(cpqGroupId.toString());
    expect(attribute.userInput).toBe(cpqAttributeUserInput);
    expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict);
    expect(attribute.incomplete).toBe(false);
    const values = attribute.values;
    expect(values.length).toBe(2);
  });

  it('should convert attributes without values', () => {
    const attributeList: Configurator.Attribute[] = [];
    cpqConfiguratorNormalizer.convertAttribute(
      cpqAttribute2,
      cpqGroupId,
      attributeList
    );
    const attribute: Configurator.Attribute = attributeList[0];
    expect(attributeList.length).toBe(1);
    expect(attribute.attrCode).toBe(cpqAttributePaId2);
    expect(attribute.name).toBe(cpqAttributeName2);
    expect(attribute.description).toBe(cpqAttributeDescription2);
    expect(attribute.label).toBe(cpqAttributeLabel2);
    expect(attribute.required).toBe(cpqAttributeRequired2);
    expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem2);
    expect(attribute.uiType).toBe(Configurator.UiType.STRING);
    expect(attribute.selectedSingleValue).toBeNull();
    expect(attribute.groupId).toBe(cpqGroupId.toString());
    expect(attribute.userInput).toBe(cpqAttributeUserInput2);
    expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict2);
    expect(attribute.incomplete).toBe(false);
    const values = attribute.values;
    expect(values.length).toBe(0);
  });

  it('should convert a group', () => {
    const groups: Configurator.Group[] = [];
    const flatGroups: Configurator.Group[] = [];
    cpqConfiguratorNormalizer.convertGroup(
      cpqTab,
      cpqAttributes,
      groups,
      flatGroups
    );
    expect(groups.length).toBe(1);
    expect(flatGroups.length).toBe(1);
    const group: Configurator.Group = groups[0];
    expect(group.id).toBe(cpqGroupId.toString());
    expect(group.name).toBe(cpqGroupName);
    expect(group.description).toBe(cpqGroupDisplayName);
    expect(group.configurable).toBe(true);
    expect(group.complete).toBe(!cpqGroupIsIncomplete);
    expect(group.consistent).toBe(true);
    expect(group.groupType).toBe(Configurator.GroupType.ATTRIBUTE_GROUP);
    expect(group.subGroups.length).toBe(0);
    expect(group.attributes.length).toBe(1);
    expect(group.attributes[0].attrCode).toBe(cpqAttributePaId);
  });

  it('should return UIType RADIOBUTTON for CPQ DisplayAs RADIO_BUTTON', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.RADIO_BUTTON)
    ).toBe(Configurator.UiType.RADIOBUTTON);
  });

  it('should return UIType DROPDOWN for CPQ DisplayAs DROPDOWN', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.DROPDOWN)
    ).toBe(Configurator.UiType.DROPDOWN);
  });

  it('should return UIType CHECKBOXLIST for CPQ DisplayAs CHECK_BOX', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.CHECK_BOX)
    ).toBe(Configurator.UiType.CHECKBOXLIST);
  });

  it('should return UIType STRING for CPQ DisplayAs INPUT', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.INPUT)
    ).toBe(Configurator.UiType.STRING);
  });

  it('should return UIType READ_ONLY for CPQ DisplayAs READ_ONLY', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.READ_ONLY)
    ).toBe(Configurator.UiType.READ_ONLY);
  });

  it('should return UIType NOT_IMPLEMENTED for unknown (not supported) CPQ DisplayAs', () => {
    expect(
      cpqConfiguratorNormalizer.convertAttributeType(Cpq.DisplayAs.LIST_BOX)
    ).toBe(Configurator.UiType.NOT_IMPLEMENTED);
  });

  it('should set selectedSingleValue', () => {
    const configAttribute: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      values: [{ valueCode: 'VK1' }, { valueCode: 'VK2', selected: true }],
    };
    cpqConfiguratorNormalizer.setSelectedSingleValue(configAttribute);
    expect(configAttribute.selectedSingleValue).toBe('VK2');
  });

  it('should not set selectedSingleValue for multi-valued attributes', () => {
    const configAttribute: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      values: [
        { valueCode: 'VK1', selected: true },
        { valueCode: 'VK2', selected: true },
      ],
    };
    cpqConfiguratorNormalizer.setSelectedSingleValue(configAttribute);
    expect(configAttribute.selectedSingleValue).toBeUndefined();
  });

  it('should set incomplete by radio button, dropdown and single-selection-image type correctly', () => {
    const attributeRBWithValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: 'SomeValue',
    };
    const attributeRBWoValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: '',
    };
    const attributeDDWithValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.DROPDOWN,
      selectedSingleValue: 'SomeValue',
    };
    const attributeDDWoValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.DROPDOWN,
      selectedSingleValue: '',
    };
    const attributeSSIWithValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      selectedSingleValue: 'SomeValue',
    };
    const attributeSSIWoValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      selectedSingleValue: '',
    };

    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeRBWoValues);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeRBWithValues);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeDDWoValues);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeDDWithValues);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeSSIWoValues);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeSSIWithValues
    );

    expect(attributeRBWoValues.incomplete).toBe(true);
    expect(attributeRBWithValues.incomplete).toBe(false);
    expect(attributeDDWoValues.incomplete).toBe(true);
    expect(attributeDDWithValues.incomplete).toBe(false);
    expect(attributeSSIWoValues.incomplete).toBe(true);
    expect(attributeSSIWithValues.incomplete).toBe(false);
  });

  it('should set incomplete by input type correctly', () => {
    const attributeStringWithValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.STRING,
      userInput: 'User Input',
    };
    const attributeStringWoValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.STRING,
      userInput: '',
    };
    const attributeNumericWithValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.NUMERIC,
      userInput: '123',
    };
    const attributeNumericWoValues: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.NUMERIC,
      userInput: '',
    };

    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeStringWithValues
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeStringWoValues
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeNumericWithValues
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeNumericWoValues
    );

    expect(attributeStringWithValues.incomplete).toBe(false);
    expect(attributeStringWoValues.incomplete).toBe(true);
    expect(attributeNumericWithValues.incomplete).toBe(false);
    expect(attributeNumericWoValues.incomplete).toBe(true);
  });

  it('should set incomplete by checkbox, checkboxlist and multi-selection-image type correctly', () => {
    const valuesWOSelectedOne: Configurator.Value[] = [
      { name: 'name1', selected: false },
      { name: 'name2', selected: false },
    ];
    const valuesWithSelectedOne: Configurator.Value[] = [
      { name: 'name1', selected: true },
      { name: 'name2', selected: false },
    ];
    const attributeCheckboxWOValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.CHECKBOX,
      values: valuesWOSelectedOne,
    };
    const attributeCheckboxWithValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.CHECKBOX,
      values: valuesWithSelectedOne,
    };
    const attributeCheckboxlistWOValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.CHECKBOXLIST,
      values: valuesWOSelectedOne,
    };
    const attributeCheckboxlistWithValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.CHECKBOXLIST,
      values: valuesWithSelectedOne,
    };
    const attributeMSIWOValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
      values: valuesWOSelectedOne,
    };
    const attributeMSIWithValue: Configurator.Attribute = {
      name: 'ATTRIBUTE_NAME',
      uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
      values: valuesWithSelectedOne,
    };

    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeCheckboxWOValue
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeCheckboxWithValue
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeCheckboxlistWOValue
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(
      attributeCheckboxlistWithValue
    );
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeMSIWOValue);
    cpqConfiguratorNormalizer.compileAttributeIncomplete(attributeMSIWithValue);

    expect(attributeCheckboxWOValue.incomplete).toBe(true);
    expect(attributeCheckboxWithValue.incomplete).toBe(false);
    expect(attributeCheckboxlistWOValue.incomplete).toBe(true);
    expect(attributeCheckboxlistWithValue.incomplete).toBe(false);
    expect(attributeMSIWOValue.incomplete).toBe(true);
    expect(attributeMSIWithValue.incomplete).toBe(false);
  });
});
