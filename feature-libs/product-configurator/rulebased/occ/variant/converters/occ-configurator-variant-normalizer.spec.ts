import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  OccConfig,
  TranslationService,
} from '@spartacus/core';
import { ConfiguratorUISettingsConfig } from '../../../components/config/configurator-ui-settings.config';
import { Observable, of } from 'rxjs';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantNormalizer } from './occ-configurator-variant-normalizer';

const configId = '192826';
const attributeName = 'name';
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
  key: groupKey,
};
const occAttributeWithValues: OccConfigurator.Attribute = {
  name: attributeName,
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
    const values = attribute.values;
    expect(values?.length).toBe(2);
  });

  it('should convert values', () => {
    const values: Configurator.Value[] = [];
    occConfiguratorVariantNormalizer.convertValue(occValue, values);
    expect(values.length).toBe(1);
    expect(values[0].valueCode).toBe(valueKey);
  });

  it('should convert attributes and do not complain if no domain values are present', () => {
    const attributes: Configurator.Attribute[] = [];
    occConfiguratorVariantNormalizer.convertAttribute(occAttribute, attributes);
    expect(attributes.length).toBe(1);
    expect(attributes[0].name).toBe(attributeName);
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

  it('should return UIType Radio Button for Radio Button occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.RADIO_BUTTON
      )
    ).toBe(Configurator.UiType.RADIOBUTTON);
  });

  it('should convert numeric attribute type correctly', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.NUMERIC
      )
    ).toBe(Configurator.UiType.NUMERIC);
  });

  it('should convert read-only attribute type correctly', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.READ_ONLY
      )
    ).toBe(Configurator.UiType.READ_ONLY);
  });

  it('should return UIType Drop Down for Drop Down occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.DROPDOWN
      )
    ).toBe(Configurator.UiType.DROPDOWN);
  });

  it('should return UIType Checkbox for Checkbox occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.CHECK_BOX_LIST
      )
    ).toBe(Configurator.UiType.CHECKBOXLIST);
  });

  it('should return UIType Checkbox for Checkbox occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.SINGLE_SELECTION_IMAGE
      )
    ).toBe(Configurator.UiType.SINGLE_SELECTION_IMAGE);
  });

  it('should return UIType String for String occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.STRING
      )
    ).toBe(Configurator.UiType.STRING);
  });

  it('should return UIType checkox for checkbox occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.CHECK_BOX
      )
    ).toBe(Configurator.UiType.CHECKBOX);
  });

  it('should return UIType multi selection image for corresponding occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.MULTI_SELECTION_IMAGE
      )
    ).toBe(Configurator.UiType.MULTI_SELECTION_IMAGE);
  });

  it('should return UIType Not Implemented for unkonwn occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertAttributeType(
        OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT
      )
    ).toBe(Configurator.UiType.NOT_IMPLEMENTED);
  });

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

  it('should convert image with media URL configured', () => {
    const images: Configurator.Image[] = [];
    const media = occConfig?.backend?.media;
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
    if (media) {
      media.baseUrl = undefined;
      occConfiguratorVariantNormalizer.convertImage(occImage, images);

      expect(images.length).toBe(1);
      expect(images[0].url).toBe(
        'https://occBackendBaseUrl/media?This%20%is%20%a%20%URL'
      );
    }
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
      attributeRBWithValues.selectedSingleValue =
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE;
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
      attributeDDWithValues.selectedSingleValue =
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE;
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
  });

  describe('convertAttribute', () => {
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
    beforeEach(() => {
      if (
        configUISettingsConfig?.productConfigurator?.addRetractOption !==
        undefined
      ) {
        configUISettingsConfig.productConfigurator.addRetractOption = true;
      }
    });

    it('should not add a retract value to the list of values because the retract mode is not activated', () => {
      if (
        configUISettingsConfig?.productConfigurator?.addRetractOption !==
        undefined
      ) {
        configUISettingsConfig.productConfigurator.addRetractOption = false;
      }
      const values: Configurator.Value[] = [];
      const sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.RADIO_BUTTON
      );
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it('should not add a retract value to the list of values', () => {
      const values: Configurator.Value[] = [];
      const sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.CHECK_BOX
      );
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(0);
    });

    it('should add a retract value for a drop-down list to the list of values', () => {
      const values: Configurator.Value[] = [];
      const sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.DROPDOWN
      );
      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE
      );
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it("should add a retract value with 'Make a selection' message for a drop-down list to the list of values", () => {
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

      const values: Configurator.Value[] = [];
      let sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.DROPDOWN
      );
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];
      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE
      );
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
      expect(values[0].selected).toBe(true);
    });

    it("should add a retract value with 'No option selected' message for a drop-down list to the list of values", () => {
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

      const values: Configurator.Value[] = [];
      let sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.DROPDOWN
      );
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];
      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE
      );
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
      expect(values[0].selected).toBe(false);
    });

    it("should add a retract value with 'No option selected' message for a radio buttons list to the list of values", () => {
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

      const values: Configurator.Value[] = [];
      const sourceAttribute = createOccAttribute(
        'key',
        'name',
        OccConfigurator.UiType.RADIO_BUTTON
      );
      sourceAttribute.domainValues = [occValue1, occValue2, occValue3];
      expect(values.length).toEqual(0);
      occConfiguratorVariantNormalizer['addRetractValue'](
        sourceAttribute,
        values
      );
      expect(values.length).toEqual(1);
      expect(values[0].valueCode).toEqual(
        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE
      );
      expect(values[0].valueDisplay).toEqual(
        'configurator.attribute.noOptionSelectedMsg'
      );
      expect(values[0].selected).toBe(false);
    });
  });
});
