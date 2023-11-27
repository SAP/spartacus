import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  OccConfig,
  TranslationService,
} from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorUISettingsConfig } from '../../../components/config/configurator-ui-settings.config';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantNormalizer } from './occ-configurator-variant-normalizer';

const configId = '192826';
const attributeName = 'name';
const csticKey = 'test';
const valueKey = 'BK';
const valueName = 'Black';
const valueKey2 = 'BE';
const selectedFlag = true;
const requiredFlag = true;
const generalGroupName = '_GEN';
const generalGroupDescription = 'General';
const groupKey = generalGroupName;
const groupId = '1';
const conflictHeaderGroupName = Configurator.GroupType.CONFLICT_HEADER_GROUP;
const conflictHeaderGroupDescription = 'Resolve issues for options...';
const conflictGroupName = 'Color';
const conflictGroupPrefix = 'Conflict for ';
const conflictExplanation =
  'The selected value is conflicting withour selections.';

const groupName = 'GROUP1';
const groupDescription = 'The Group Name';
const maxlength = 3;
let flatGroups: Configurator.Group[] = [];
let groups: Configurator.Group[] = [];

const occImage: OccConfigurator.Image = {
  altText: 'Alternate Text for Image',
  format: OccConfigurator.ImageFormatType.VALUE_IMAGE,
  imageType: OccConfigurator.ImageType.PRIMARY,
  url: 'media?This%20%is%20%a%20%URL',
};

const occAttribute: OccConfigurator.Attribute = {
  name: attributeName,
  images: [occImage],
  key: csticKey,
  validationType: 'NUMERIC',
};
const occAttributeWithValues: OccConfigurator.Attribute = {
  name: attributeName,
  visible: true,
  required: requiredFlag,
  type: OccConfigurator.UiType.RADIO_BUTTON,
  key: groupKey,
  domainValues: [
    { key: valueKey, images: [occImage] },
    { key: valueKey2, selected: selectedFlag },
  ],
};
const attributeRBWithValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: 'SomeValue',
};
const attributeRBWoValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.RADIOBUTTON,
  selectedSingleValue: '',
};
const attributeDDWithValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.DROPDOWN,
  selectedSingleValue: 'SomeValue',
};
const attributeDDWoValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.DROPDOWN,
  selectedSingleValue: '',
};
const attributeSSIWithValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
  selectedSingleValue: 'SomeValue',
};
const attributeSSIWoValues: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
  selectedSingleValue: '',
};
const attributeStringWoValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.STRING,
};
const attributeStringWithValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.STRING,
  userInput: 'SomeValue',
};
const attributeNumericWoValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.NUMERIC,
};
const attributeNumericWithValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.NUMERIC,
  userInput: '123',
};
const attributeCheckboxWOValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.CHECKBOXLIST,
  values: [
    {
      name: 'name1',
      valueCode: valueKey,
      selected: false,
    },
    {
      name: 'name2',
      valueCode: valueKey2,
      selected: false,
    },
  ],
};
const attributeCheckboxWithValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.CHECKBOXLIST,
  values: [
    {
      name: 'name1',
      valueCode: valueKey,
      selected: true,
    },
    {
      name: 'name2',
      valueCode: valueKey2,
      selected: false,
    },
  ],
};
const attributeMSIWOValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
  values: [
    {
      name: 'name1',
      valueCode: valueKey,
      selected: false,
    },
    {
      name: 'name2',
      valueCode: valueKey2,
      selected: false,
    },
  ],
};
const attributeMSIWithValue: Configurator.Attribute = {
  name: attributeName,
  required: requiredFlag,
  uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
  values: [
    {
      name: 'name1',
      valueCode: valueKey,
      selected: true,
    },
    {
      name: 'name2',
      valueCode: valueKey2,
      selected: false,
    },
  ],
};
const configuration: OccConfigurator.Configuration = {
  configId: configId,
  complete: true,
  consistent: true,
  rootProduct: 'CONF_PRODUCT',
  hideBasePriceAndSelectedOptions: true,
  immediateConflictResolution: true,
  groups: [
    {
      attributes: [occAttributeWithValues],
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '3',
      subGroups: [
        {
          attributes: [occAttributeWithValues],
          groupType: OccConfigurator.GroupType.CSTIC_GROUP,
          id: groupId,
        },
      ],
    },
    {
      attributes: [occAttributeWithValues],
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '2',
    },
  ],
  kbKey: {
    kbName: 'CONF_PRODUCT_KB',
    kbLogsys: 'RR5CLNT910',
    kbVersion: '1',
    kbBuildNumber: '2',
  },
};

const group: OccConfigurator.Group = {
  name: groupName,
  description: groupDescription,
  id: groupId,
  groupType: OccConfigurator.GroupType.CSTIC_GROUP,
  attributes: [occAttributeWithValues],
};

const occConflictGroup: OccConfigurator.Group = {
  name: conflictGroupName,
  description: conflictExplanation,
  groupType: OccConfigurator.GroupType.CONFLICT,
  attributes: [occAttributeWithValues],
  id: groupId,
};

const occValue: OccConfigurator.Value = {
  key: valueKey,
  langDepName: valueName,
};

function createOccAttribute(
  key: string,
  name: string,
  type: OccConfigurator.UiType
): OccConfigurator.Attribute {
  return {
    key: key,
    name: name,
    type: type,
    domainValues: [],
  };
}

function createOccValue(
  key: string,
  langDepName: string,
  isSelected: boolean
): OccConfigurator.Value {
  return {
    key: key,
    langDepName: langDepName,
    selected: isSelected,
  };
}

function createValue(
  valueCode: string,
  isSelected: boolean
): Configurator.Value {
  return {
    valueCode: valueCode,
    valueDisplay: '',
    selected: isSelected,
  };
}

class MockConverterService {
  convert() {}
}

class MockTranslationService {
  translate(key: string, options: any = {}): Observable<string> {
    switch (key) {
      case 'configurator.group.general':
        return of(generalGroupDescription);
      case 'configurator.group.conflictHeader':
        return of(conflictHeaderGroupDescription);
      case 'configurator.group.conflictGroup':
        return of(conflictGroupPrefix + options.attribute);
      default:
        return of(key);
    }
  }
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'https://occBackendBaseUrl/',
      prefix: '',
    },
    media: {
      baseUrl: 'https://mediaBackendBaseUrl/',
    },
  },
};

const MockConfiguratorUISettingsConfig: ConfiguratorUISettingsConfig = {
  productConfigurator: {
    addRetractOption: false,
  },
};

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantNormalizer: OccConfiguratorVariantNormalizer;
  let occConfig: OccConfig;
  let configUISettingsConfig: ConfiguratorUISettingsConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: ConfiguratorUISettingsConfig,
          useValue: MockConfiguratorUISettingsConfig,
        },
      ],
    });

    occConfiguratorVariantNormalizer = TestBed.inject(
      OccConfiguratorVariantNormalizer as Type<OccConfiguratorVariantNormalizer>
    );
    occConfig = TestBed.inject(OccConfig as Type<OccConfig>);
    configUISettingsConfig = TestBed.inject(
      ConfiguratorUISettingsConfig as Type<ConfiguratorUISettingsConfig>
    );
    groups = [];
    flatGroups = [];
  });

  it('should be created', () => {
    expect(occConfiguratorVariantNormalizer).toBeTruthy();
  });

  describe('convert', () => {
    it('should convert "hideBasePriceAndSelectedOptions" setting', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.hideBasePriceAndSelectedOptions).toBe(true);
    });

    it('should convert "immediateConflictResolution" setting to true', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.immediateConflictResolution).toBe(true);
    });

    it('should convert "immediateConflictResolution" setting to false', () => {
      configuration.immediateConflictResolution = false;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.immediateConflictResolution).toBe(false);
    });

    it('should convert "immediateConflictResolution" setting from undefined to false', () => {
      configuration.immediateConflictResolution = undefined;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.immediateConflictResolution).toBe(false);
    });

    it('should convert "newConfiguration" setting to true', () => {
      configuration.newConfiguration = true;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.newConfiguration).toBe(true);
    });

    it('should convert "newConfiguration" setting to false', () => {
      configuration.newConfiguration = false;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.newConfiguration).toBe(false);
    });

    it('should convert "newConfiguration" setting by default to undefined', () => {
      configuration.newConfiguration = undefined;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.newConfiguration).not.toBeDefined();
    });

    it('should convert a configuration and support "complete" and "consistent" attribute', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.complete).toBe(true);
      expect(result.consistent).toBe(true);
    });

    it('should not touch isRequiredCartUpdate and isCartEntryUpdatePending when converting a configuration', () => {
      const result: Configurator.Configuration =
        occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.isCartEntryUpdateRequired).toBeUndefined();
    });

    it('should convert subgroups', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      const subGroups = result.groups[0].subGroups;
      const attributes = subGroups ? subGroups[0].attributes : [];
      expect(attributes?.length).toBe(1);
    });

    it('should convert empty subgroups to empty array', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      const subGroups = result.groups[1].subGroups;
      expect(subGroups ? subGroups.length : 1).toBe(0);
    });

    it('should convert attributes and values', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      const attributes = result.groups[0].attributes;
      expect(attributes).toBeDefined();
      expect(attributes?.length).toBe(1);
      const attribute: Configurator.Attribute = attributes
        ? attributes[0]
        : { name: '' };
      expect(attribute.name).toBe(attributeName);
      expect(attribute.required).toBe(requiredFlag);
      expect(attribute.selectedSingleValue).toBe(valueKey2);
      expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON);
      expect(attribute.visible).toBeTruthy();
      const values = attribute.values;
      expect(values?.length).toBe(2);
    });

    it('should work properly with a predecessor converter', () => {
      const targetFromPredecessor: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration(
          'id',
          ConfiguratorModelUtils.createInitialOwner()
        );
      targetFromPredecessor.owner.key = 'myKey';
      const target = occConfiguratorVariantNormalizer.convert(
        configuration,
        targetFromPredecessor
      );
      expect(target.owner).toBe(targetFromPredecessor.owner);
      expect(target.interactionState).toBe(
        targetFromPredecessor.interactionState
      );
    });

    it('should convert a configuration with kb key', () => {
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.kbKey).toBeDefined();
      expect(result.kbKey?.kbName).toEqual(configuration.kbKey?.kbName);
      expect(result.kbKey?.kbLogsys).toEqual(configuration.kbKey?.kbLogsys);
      expect(result.kbKey?.kbVersion).toEqual(configuration.kbKey?.kbVersion);
      expect(result.kbKey?.kbBuildNumber).toEqual(
        configuration.kbKey?.kbBuildNumber
      );
    });

    it('should convert a configuration with undefined kb key', () => {
      configuration.kbKey = undefined;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.kbKey).toBeUndefined();
    });

    it('should convert flag that indicates that pricing is enabled', () => {
      configuration.pricingEnabled = false;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.pricingEnabled).toBe(false);
    });

    it('should state that pricing is supported if backend does not support that attribute', () => {
      configuration.pricingEnabled = undefined;
      const result = occConfiguratorVariantNormalizer.convert(configuration);
      expect(result.pricingEnabled).toBe(true);
    });
  });

  it('should convert values', () => {
    const values: Configurator.Value[] = [];
    occConfiguratorVariantNormalizer.convertValue(occValue, values);
    expect(values.length).toBe(1);
    expect(values[0].valueCode).toBe(valueKey);
  });

  describe('convertAttribute', () => {
    it('should convert attributes and do not complain if no domain values are present', () => {
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        occAttribute,
        attributes
      );
      expect(attributes.length).toBe(1);
      expect(attributes[0].name).toBe(attributeName);
      expect(attributes[0].validationType).toBe(
        Configurator.ValidationType.NUMERIC
      );
    });

    it('should convert attribute key', () => {
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        occAttribute,
        attributes
      );
      expect(attributes.length).toBe(1);
      expect(attributes[0].key).toBe(csticKey);
    });

    it('should tell if attribute is numeric and know if negative values are allowed', () => {
      const attributes: Configurator.Attribute[] = [];
      const numericOccAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        value: '23.234',
        negativeAllowed: true,
        type: OccConfigurator.UiType.READ_ONLY,
        key: groupKey,
      };
      occConfiguratorVariantNormalizer.convertAttribute(
        numericOccAttribute,
        attributes
      );

      expect(attributes[0].negativeAllowed).toBe(true);
    });

    it('should increase maximum length if negative numbers are allowed', () => {
      const attributes: Configurator.Attribute[] = [];
      const numericOccAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        maxlength: maxlength,
        negativeAllowed: true,
        key: groupKey,
      };
      occConfiguratorVariantNormalizer.convertAttribute(
        numericOccAttribute,
        attributes
      );

      expect(attributes[0].maxlength).toBe(maxlength + 1);
    });

    it('should set user input for input component', () => {
      const attributes: Configurator.Attribute[] = [];
      const numericOccAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: groupKey,
        type: OccConfigurator.UiType.NUMERIC,
        formattedValue: '12',
      };
      occConfiguratorVariantNormalizer.convertAttribute(
        numericOccAttribute,
        attributes
      );
      expect(attributes[0].userInput).toBe(numericOccAttribute.formattedValue);
    });

    it('should not set user input for attributes with domain', () => {
      const attributes: Configurator.Attribute[] = [];
      const numericOccAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: groupKey,
        type: OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT,
        formattedValue: '12',
        value: valueKey,
      };
      occConfiguratorVariantNormalizer.convertAttribute(
        numericOccAttribute,
        attributes
      );
      expect(attributes[0].userInput).toBeUndefined();
    });

    it('should default the attribute type if not specified', () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
      };
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        sourceAttribute,
        attributes
      );
      const resultAttribute = attributes[0];
      expect(resultAttribute.uiType).toBe(Configurator.UiType.NOT_IMPLEMENTED);
    });

    it('should set hasConflicts from the list of conflicts of the source attribute', () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
      };
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        sourceAttribute,
        attributes
      );
      expect(attributes[0].hasConflicts).toBe(false);

      sourceAttribute.conflicts = ['first, second'];
      occConfiguratorVariantNormalizer.convertAttribute(
        sourceAttribute,
        attributes
      );
      expect(attributes[1].hasConflicts).toBe(true);
    });

    it('should set user input to blank string in case formattedValue is not present', () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        type: OccConfigurator.UiType.STRING,
      };
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        sourceAttribute,
        attributes
      );
      expect(attributes[0].userInput).toBe('');
    });

    it('should set user input to formattedValue if present', () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        type: OccConfigurator.UiType.STRING,
        formattedValue: 'Huh',
      };
      const attributes: Configurator.Attribute[] = [];
      occConfiguratorVariantNormalizer.convertAttribute(
        sourceAttribute,
        attributes
      );
      expect(attributes[0].userInput).toBe(sourceAttribute.formattedValue);
    });
  });

  it('should convert a standard group', () => {
    occConfiguratorVariantNormalizer.convertGroup(group, groups, flatGroups);
    expect(groups[0].description).toBe(groupDescription);
  });

  it('should convert a standard group and conflict group but not conflict-header group and sub-item-group', () => {
    occConfiguratorVariantNormalizer.convertGroup(group, groups, flatGroups);
    expect(flatGroups.length).toBe(1);
    occConfiguratorVariantNormalizer.convertGroup(
      occConflictGroup,
      groups,
      flatGroups
    );
    expect(flatGroups.length).toBe(2);
    group.groupType = OccConfigurator.GroupType.INSTANCE;
    occConfiguratorVariantNormalizer.convertGroup(group, groups, flatGroups);
    expect(flatGroups.length).toBe(2);
    occConflictGroup.groupType = OccConfigurator.GroupType.CONFLICT_HEADER;
    occConfiguratorVariantNormalizer.convertGroup(
      occConflictGroup,
      groups,
      flatGroups
    );
    expect(flatGroups.length).toBe(2);
  });

  it('should convert a group with no attributes', () => {
    const groupsWithoutAttributes: OccConfigurator.Group = {
      name: groupName,
      id: groupId,
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
    };

    occConfiguratorVariantNormalizer.convertGroup(
      groupsWithoutAttributes,
      groups,
      flatGroups
    );
    expect(groups[0].name).toBe(groupName);
  });

  it('should convert a general group', () => {
    const generalGroup: OccConfigurator.Group = {
      name: generalGroupName,
      id: groupId,
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
    };

    occConfiguratorVariantNormalizer.convertGroup(
      generalGroup,
      groups,
      flatGroups
    );
    expect(groups[0].description).toBe(generalGroupDescription);
  });

  it('should set description for a general group', () => {
    const generalGroup: Configurator.Group = {
      ...ConfiguratorTestUtils.createGroup(generalGroupName),
      name: generalGroupName,
    };

    occConfiguratorVariantNormalizer.setGroupDescription(generalGroup);
    expect(generalGroup.description).toBe(generalGroupDescription);
  });

  it('should set description for conflict header group', () => {
    const conflictHeaderGroup: Configurator.Group = {
      ...ConfiguratorTestUtils.createGroup(conflictHeaderGroupName),
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      name: conflictHeaderGroupName,
    };

    occConfiguratorVariantNormalizer.setGroupDescription(conflictHeaderGroup);
    expect(conflictHeaderGroup.description).toBe(
      conflictHeaderGroupDescription
    );
  });

  it('should set description for conflict group and should store conflict explanation in group.name', () => {
    const conflictGroup: Configurator.Group = {
      ...ConfiguratorTestUtils.createGroup(conflictGroupName),
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      name: conflictGroupName,
      description: conflictExplanation,
    };

    occConfiguratorVariantNormalizer.setGroupDescription(conflictGroup);
    expect(conflictGroup.description).toBe(
      conflictGroupPrefix + conflictGroupName
    );
    expect(conflictGroup.name).toBe(conflictExplanation);
  });

  it('should set selectedSingleValue', () => {
    const configAttribute: Configurator.Attribute = {
      name: attributeName,
      values: [
        { valueCode: valueKey },
        { valueCode: valueKey2, selected: selectedFlag },
      ],
    };
    occConfiguratorVariantNormalizer.setSelectedSingleValue(configAttribute);
    expect(configAttribute.selectedSingleValue).toBe(valueKey2);
  });

  it('should not set selectedSingleValue for multi-valued attributes', () => {
    const configAttribute: Configurator.Attribute = {
      name: attributeName,
      values: [
        { valueCode: valueKey, selected: selectedFlag },
        { valueCode: valueKey2, selected: selectedFlag },
      ],
    };
    occConfiguratorVariantNormalizer.setSelectedSingleValue(configAttribute);
    expect(configAttribute.selectedSingleValue).toBeUndefined();
  });

  describe('convertAttributeType', () => {
    let sourceAttribute: OccConfigurator.Attribute = createOccAttribute(
      'key',
      'name',
      OccConfigurator.UiType.NOT_IMPLEMENTED
    );

    it('should return UIType Radio Button for Radio Button occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.RADIO_BUTTON;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.RADIOBUTTON);
    });

    it('should convert numeric attribute type correctly', () => {
      sourceAttribute.type = OccConfigurator.UiType.NUMERIC;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.NUMERIC);
    });

    it('should convert read-only attribute type correctly', () => {
      sourceAttribute.type = OccConfigurator.UiType.READ_ONLY;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.READ_ONLY);
    });

    it("should convert read-only attribute type correctly when isRetractBlocked is set to 'true'", () => {
      sourceAttribute.type = OccConfigurator.UiType.READ_ONLY;
      sourceAttribute.retractBlocked = true;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.READ_ONLY);
    });

    it("should return UIType Radio Button attribute type correctly when isConflicting is set to 'true'", () => {
      sourceAttribute.type = OccConfigurator.UiType.READ_ONLY;
      sourceAttribute.retractBlocked = false;
      sourceAttribute.conflicts = ['conflict1'];
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.RADIOBUTTON);
    });

    it('should return UIType Drop Down for Drop Down occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.DROPDOWN;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.DROPDOWN);
    });

    it('should return UIType Checkbox for Checkbox occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.CHECK_BOX_LIST;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.CHECKBOXLIST);
    });

    it('should return UIType single selection image for single selection image occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.SINGLE_SELECTION_IMAGE);
    });

    it('should return UIType String for String occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.STRING;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.STRING);
    });

    it('should return UIType checkox for checkbox occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.CHECK_BOX;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.CHECKBOX);
    });

    it('should return UIType multi selection image for corresponding occ configurator type', () => {
      sourceAttribute.type = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.MULTI_SELECTION_IMAGE);
    });

    it('should handle uiType dropDown with additional value correctly ', () => {
      sourceAttribute.type = OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT);
    });

    it('should handle uiType radioButton with additional value correctly ', () => {
      sourceAttribute.type =
        OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT);
    });

    it('should return UIType Not Implemented for unkonwn occ configurator type', () => {
      sourceAttribute.type = undefined;
      expect(
        occConfiguratorVariantNormalizer.convertAttributeType(sourceAttribute)
      ).toBe(Configurator.UiType.NOT_IMPLEMENTED);
    });
  });

  describe('determineCoreUiType', () => {
    it('should return input in case of a standard UI type', () => {
      expect(
        occConfiguratorVariantNormalizer['determineCoreUiType'](
          OccConfigurator.UiType.CHECK_BOX
        )
      ).toBe(OccConfigurator.UiType.CHECK_BOX);
    });

    it('should return standard UI type in case of a variation', () => {
      expect(
        occConfiguratorVariantNormalizer['determineCoreUiType'](
          OccConfigurator.UiType.CHECK_BOX +
            Configurator.CustomUiTypeIndicator +
            'Custom'
        )
      ).toBe(OccConfigurator.UiType.CHECK_BOX);
    });

    it('should return input in case variation does not follow our defined pattern', () => {
      const notKnownUiType = 'WhateverCustom';
      expect(
        occConfiguratorVariantNormalizer['determineCoreUiType'](notKnownUiType)
      ).toBe(notKnownUiType);
    });
  });

  describe('convertGroupType', () => {
    it('should convert group types properly', () => {
      expect(
        occConfiguratorVariantNormalizer.convertGroupType(
          OccConfigurator.GroupType.CSTIC_GROUP
        )
      ).toBe(Configurator.GroupType.ATTRIBUTE_GROUP);

      expect(
        occConfiguratorVariantNormalizer.convertGroupType(
          OccConfigurator.GroupType.CONFLICT_HEADER
        )
      ).toBe(Configurator.GroupType.CONFLICT_HEADER_GROUP);

      expect(
        occConfiguratorVariantNormalizer.convertGroupType(
          OccConfigurator.GroupType.CONFLICT
        )
      ).toBe(Configurator.GroupType.CONFLICT_GROUP);

      expect(
        occConfiguratorVariantNormalizer.convertGroupType(
          OccConfigurator.GroupType.INSTANCE
        )
      ).toBe(Configurator.GroupType.SUB_ITEM_GROUP);
    });
  });

  it('should convert image types properly', () => {
    expect(
      occConfiguratorVariantNormalizer.convertImageType(
        OccConfigurator.ImageType.GALLERY
      )
    ).toBe(Configurator.ImageType.GALLERY);

    expect(
      occConfiguratorVariantNormalizer.convertImageType(
        OccConfigurator.ImageType.PRIMARY
      )
    ).toBe(Configurator.ImageType.PRIMARY);
  });

  it('should convert image format types properly', () => {
    expect(
      occConfiguratorVariantNormalizer.convertImageFormatType(
        OccConfigurator.ImageFormatType.VALUE_IMAGE
      )
    ).toBe(Configurator.ImageFormatType.VALUE_IMAGE);

    expect(
      occConfiguratorVariantNormalizer.convertImageFormatType(
        OccConfigurator.ImageFormatType.CSTIC_IMAGE
      )
    ).toBe(Configurator.ImageFormatType.ATTRIBUTE_IMAGE);
  });

  describe('convertImage', () => {
    it('should convert image with media URL configured', () => {
      const images: Configurator.Image[] = [];
      const media = occConfig?.backend?.media;
      expect(media).toBeDefined();
      if (media) {
        media.baseUrl = 'https://mediaBackendBaseUrl/';

        occConfiguratorVariantNormalizer.convertImage(occImage, images);

        expect(images.length).toBe(1);
        expect(images[0].url).toBe(
          'https://mediaBackendBaseUrl/media?This%20%is%20%a%20%URL'
        );

        occConfiguratorVariantNormalizer.convertImage(occImage, images);
        expect(images.length).toBe(2);
      }
    });

    it('should convert image with no media URL configured', () => {
      const images: Configurator.Image[] = [];
      const media = occConfig?.backend?.media;
      expect(media).toBeDefined();
      if (media) {
        media.baseUrl = undefined;
        occConfiguratorVariantNormalizer.convertImage(occImage, images);

        expect(images.length).toBe(1);
        expect(images[0].url).toBe(
          'https://occBackendBaseUrl/media?This%20%is%20%a%20%URL'
        );
      }
    });

    it('should convert image with no URL configuration at all', () => {
      const images: Configurator.Image[] = [];
      const media = occConfig?.backend?.media;
      expect(media).toBeDefined();
      const occ = occConfig?.backend?.occ;
      if (media && occ) {
        media.baseUrl = undefined;
        occ.baseUrl = undefined;
        occConfiguratorVariantNormalizer.convertImage(occImage, images);

        expect(images.length).toBe(1);
        expect(images[0].url).toBe('media?This%20%is%20%a%20%URL');
      }
    });
  });

  describe('check the setting of incomplete', () => {
    it('should set incomplete by string type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeStringWoValue
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeStringWithValue
      );

      expect(attributeStringWoValue.incomplete).toBe(true);
      expect(attributeStringWithValue.incomplete).toBe(false);
    });

    it('should set incomplete by numeric type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeNumericWoValue
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeNumericWithValue
      );

      expect(attributeNumericWoValue.incomplete).toBe(true);
      expect(attributeNumericWithValue.incomplete).toBe(false);
    });

    it('should set incomplete by radio button type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeRBWoValues
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeRBWithValues
      );

      expect(attributeRBWoValues.incomplete).toBe(true);
      expect(attributeRBWithValues.incomplete).toBe(false);
    });

    it('should set incomplete for radio button type with retract option correctly', () => {
      attributeRBWithValues.selectedSingleValue = Configurator.RetractValueCode;
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeRBWithValues
      );

      expect(attributeRBWithValues.incomplete).toBe(true);
    });

    it('should set incomplete by drop-down type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeDDWoValues
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeDDWithValues
      );

      expect(attributeDDWoValues.incomplete).toBe(true);
      expect(attributeDDWithValues.incomplete).toBe(false);
    });

    it('should set incomplete for drop-down type with retract option correctly', () => {
      attributeDDWithValues.selectedSingleValue = Configurator.RetractValueCode;
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeDDWithValues
      );

      expect(attributeDDWithValues.incomplete).toBe(true);
    });

    it('should set incomplete by single-selection-image type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeSSIWoValues
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeSSIWithValues
      );

      expect(attributeSSIWoValues.incomplete).toBe(true);
      expect(attributeSSIWithValues.incomplete).toBe(false);
    });

    it('should set incomplete by checkbox type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeCheckboxWOValue
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeCheckboxWithValue
      );

      expect(attributeCheckboxWOValue.incomplete).toBe(true);
      expect(attributeCheckboxWithValue.incomplete).toBe(false);
    });

    it('should set incomplete by multi-selection-image type correctly', () => {
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeMSIWOValue
      );
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeMSIWithValue
      );

      expect(attributeMSIWOValue.incomplete).toBe(true);
      expect(attributeMSIWithValue.incomplete).toBe(false);
    });

    it('should set incomplete for attribute types with additional value', () => {
      attributeDDWithValues.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeDDWithValues
      );
      expect(attributeDDWithValues.incomplete).toBe(true);
    });

    it('should set incomplete for attribute types with additional value, ignoring user input, as that is not sent when retrieving a configuration ', () => {
      //a previous user input is always be part of the domain after a roundtrip
      attributeDDWithValues.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      attributeDDWithValues.userInput = 'NeverBeSentFromBackend';
      occConfiguratorVariantNormalizer.compileAttributeIncomplete(
        attributeDDWithValues
      );
      expect(attributeDDWithValues.incomplete).toBe(true);
    });
  });

  describe('isRetractValueSelected', () => {
    it("should return 'false' because the list of domain values is undefined", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        domainValues: undefined,
      };
      expect(
        occConfiguratorVariantNormalizer['isRetractValueSelected'](
          sourceAttribute
        )
      ).toBe(true);
    });

    it("should return 'false' because the list of domain values is empty", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        domainValues: [],
      };
      expect(
        occConfiguratorVariantNormalizer['isRetractValueSelected'](
          sourceAttribute
        )
      ).toBe(true);
    });

    it("should return 'false' because there is a selected value under domain values", () => {
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        false
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        true
      );

      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        domainValues: [occValue1, occValue2, occValue3],
      };
      expect(
        occConfiguratorVariantNormalizer['isRetractValueSelected'](
          sourceAttribute
        )
      ).toBe(false);
    });

    it("should return 'true' because there is no selected value under domain values", () => {
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        false
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        false
      );

      const sourceAttribute: OccConfigurator.Attribute = {
        name: attributeName,
        key: attributeName,
        domainValues: [occValue1, occValue2, occValue3],
      };
      expect(
        occConfiguratorVariantNormalizer['isRetractValueSelected'](
          sourceAttribute
        )
      ).toBe(true);
    });
  });

  describe('setRetractValueDisplay', () => {
    it('should return no value display', () => {
      const value: Configurator.Value = createValue('valueCode', false);

      occConfiguratorVariantNormalizer['setRetractValueDisplay'](
        Configurator.UiType.LISTBOX,
        value
      );
      expect(value.valueDisplay).toEqual('');
    });

    it("should return 'Make a selection' for drop-down list", () => {
      const value: Configurator.Value = createValue('valueCode', true);

      occConfiguratorVariantNormalizer['setRetractValueDisplay'](
        Configurator.UiType.DROPDOWN,
        value
      );
      expect(value.valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it("should return 'No option selected' for drop-down list", () => {
      const value: Configurator.Value = createValue('valueCode', false);

      occConfiguratorVariantNormalizer['setRetractValueDisplay'](
        Configurator.UiType.DROPDOWN,
        value
      );
      expect(value.valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });

    it("should return 'No option selected' for radion buttons list", () => {
      const value: Configurator.Value = createValue('valueCode', true);

      occConfiguratorVariantNormalizer['setRetractValueDisplay'](
        Configurator.UiType.RADIOBUTTON,
        value
      );
      expect(value.valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });
  });

  describe('addRetractValue', () => {
    let values: Configurator.Value[] = [];
    let sourceAttribute: OccConfigurator.Attribute = createOccAttribute(
      'key',
      'name',
      OccConfigurator.UiType.NOT_IMPLEMENTED
    );

    afterEach(() => {
      values = [];
    });

    it("should not add a retract value to the list of values because retractBlocked is set to 'true'", () => {
      sourceAttribute.type = OccConfigurator.UiType.RADIO_BUTTON;
      sourceAttribute.retractBlocked = true;

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it('should not add a retract value to the list of values because the retract mode is not activated', () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        false;
      sourceAttribute.type = OccConfigurator.UiType.RADIO_BUTTON;
      sourceAttribute.retractBlocked = true;

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it("should not add a retract value to the list of values because attribute type is 'check_box'", () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      sourceAttribute.type = OccConfigurator.UiType.CHECK_BOX;
      sourceAttribute.retractBlocked = false;

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it('should add a retract value for a drop-down list to the list of values', () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      sourceAttribute.type = OccConfigurator.UiType.DROPDOWN;
      sourceAttribute.retractBlocked = false;

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(Configurator.RetractValueCode);
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it('should add a retract value to the list of values for a read-only that is involved in a conflict', () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        false;
      sourceAttribute.type = OccConfigurator.UiType.READ_ONLY;
      sourceAttribute.conflicts = ['conflict1'];
      sourceAttribute.retractBlocked = false;

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(Configurator.RetractValueCode);
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });

    it("should not add a retract value to the list of values because attribute type is 'NOT_IMPLEMENTED'", () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        false
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        false
      );

      sourceAttribute.type = undefined;
      sourceAttribute.retractBlocked = false;
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it("should add a retract value with 'Make a selection' message for a drop-down list to the list of values", () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        false
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        false
      );
      sourceAttribute.type = OccConfigurator.UiType.DROPDOWN;
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(Configurator.RetractValueCode);
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
      expect(values[0].selected).toBe(true);
    });

    it("should add a retract value with 'No option selected' message for a drop-down list to the list of values", () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        true
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        false
      );

      sourceAttribute.type = OccConfigurator.UiType.DROPDOWN;
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(Configurator.RetractValueCode);
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
      expect(values[0].selected).toBe(false);
    });

    it("should add a retract value with 'No option selected' message for a radio buttons list to the list of values", () => {
      (configUISettingsConfig.productConfigurator ??= {}).addRetractOption =
        true;
      const occValue1: OccConfigurator.Value = createOccValue(
        'key1',
        'langDepName1',
        false
      );
      const occValue2: OccConfigurator.Value = createOccValue(
        'key2',
        'langDepName2',
        true
      );
      const occValue3: OccConfigurator.Value = createOccValue(
        'key3',
        'langDepName3',
        false
      );

      sourceAttribute.type = OccConfigurator.UiType.RADIO_BUTTON;
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];

      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(Configurator.RetractValueCode);
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
      expect(values[0].selected).toBe(false);
    });
  });

  describe('hasSourceAttributeConflicts', () => {
    it("should return 'false' because there is no conflicts", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
      };

      const hasSourceAttributeConflicts =
        occConfiguratorVariantNormalizer['hasSourceAttributeConflicts'](
          sourceAttribute
        );
      expect(hasSourceAttributeConflicts).toBeFalsy();
    });

    it("should return 'false' because conflicts list is empty", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        conflicts: [],
      };

      const hasSourceAttributeConflicts =
        occConfiguratorVariantNormalizer['hasSourceAttributeConflicts'](
          sourceAttribute
        );
      expect(hasSourceAttributeConflicts).toBeFalsy();
    });

    it("should return 'true' conflicts list is not empty", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        conflicts: ['conflict1'],
      };

      const hasSourceAttributeConflicts =
        occConfiguratorVariantNormalizer['hasSourceAttributeConflicts'](
          sourceAttribute
        );
      expect(hasSourceAttributeConflicts).toBeTruthy();
    });
  });

  describe('isSourceAttributeTypeReadOnly', () => {
    it("should return 'false' because type is not defined", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
      };

      const isSourceAttributeTypeReadOnly =
        occConfiguratorVariantNormalizer['isSourceAttributeTypeReadOnly'](
          sourceAttribute
        );
      expect(isSourceAttributeTypeReadOnly).toBeFalsy();
    });

    it("should return 'false' because type is not READ_ONLY", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        type: OccConfigurator.UiType.CHECK_BOX_LIST,
      };

      const isSourceAttributeTypeReadOnly =
        occConfiguratorVariantNormalizer['isSourceAttributeTypeReadOnly'](
          sourceAttribute
        );
      expect(isSourceAttributeTypeReadOnly).toBeFalsy();
    });

    it("should return 'true' because type is READ_ONLY", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        type: OccConfigurator.UiType.READ_ONLY,
      };

      const isSourceAttributeTypeReadOnly =
        occConfiguratorVariantNormalizer['isSourceAttributeTypeReadOnly'](
          sourceAttribute
        );
      expect(isSourceAttributeTypeReadOnly).toBeTruthy();
    });
  });

  describe('isRetractBlocked', () => {
    it("should return 'false' because retractBlocked is not defined", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
      };

      const isRetractBlocked =
        occConfiguratorVariantNormalizer['isRetractBlocked'](sourceAttribute);
      expect(isRetractBlocked).toBeFalsy();
    });

    it("should return 'false' because retractBlocked set to 'false'", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        retractBlocked: false,
      };

      const isRetractBlocked =
        occConfiguratorVariantNormalizer['isRetractBlocked'](sourceAttribute);
      expect(isRetractBlocked).toBeFalsy();
    });

    it("should return 'false' because retractBlocked set to 'true'", () => {
      const sourceAttribute: OccConfigurator.Attribute = {
        name: 'sourceAttribute',
        key: 'key',
        retractBlocked: true,
      };

      const isRetractBlocked =
        occConfiguratorVariantNormalizer['isRetractBlocked'](sourceAttribute);
      expect(isRetractBlocked).toBeTruthy();
    });
  });
});
