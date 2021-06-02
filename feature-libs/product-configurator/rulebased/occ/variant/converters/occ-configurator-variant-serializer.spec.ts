import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { ConfiguratorTestUtils } from '@spartacus/product-configurator/rulebased';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantSerializer } from './occ-configurator-variant-serializer';

describe('OccConfiguratorVariantSerializer', () => {
  let occConfiguratorVariantSerializer: OccConfiguratorVariantSerializer;
  const GROUP_ID = '1-CPQ_LAPTOP.1';

  const groupWithoutAttributes: Configurator.Group = {
    id: GROUP_ID,
  };

  const groupWithSubGroup: Configurator.Group = {
    id: GROUP_ID,
    subGroups: [groupWithoutAttributes],
  };

  const sourceConfiguration: Configurator.Configuration = {
    ...ConfiguratorTestUtils.createConfiguration(
      '1234-56-7890',
      ConfiguratorModelUtils.createInitialOwner()
    ),
    complete: false,
    consistent: true,
    productCode: 'CPQ_LAPTOP',
    groups: [
      {
        configurable: true,
        description: 'Core components',
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        id: GROUP_ID,
        name: '1',
        attributes: [
          {
            label: 'Expected Number',
            name: 'EXP_NUMBER',
            required: true,
            uiType: Configurator.UiType.NOT_IMPLEMENTED,
            values: [],
          },
          {
            label: 'Processor',
            name: 'CPQ_CPU',
            required: true,
            selectedSingleValue: 'INTELI5_35',
            uiType: Configurator.UiType.RADIOBUTTON,
            values: [],
          },
          {
            label: 'RAM',
            name: 'CPQ_RAM',
            required: false,
            selectedSingleValue: '32GB',
            uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
            values: [],
          },
        ],
      },
      {
        configurable: true,
        description: 'Peripherals & Accessories',
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        id: '1-CPQ_LAPTOP.2',
        name: '2',
        attributes: [],
      },
      {
        configurable: true,
        description: 'Software',
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        id: '1-CPQ_LAPTOP.3',
        name: '3',
        attributes: [],
      },
    ],
  };

  const targetOccConfiguration: OccConfigurator.Configuration = {
    complete: false,
    configId: '1234-56-7890',
    groups: [
      {
        configurable: true,
        description: 'Core components',
        groupType: OccConfigurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.1',
        name: '1',
        attributes: [
          {
            name: 'EXP_NUMBER',
            langDepName: 'Expected Number',
            required: true,
            type: OccConfigurator.UiType.NOT_IMPLEMENTED,
          },

          {
            name: 'CPQ_CPU',
            langDepName: 'Processor',
            required: true,
            type: OccConfigurator.UiType.RADIO_BUTTON,
            value: 'INTELI5_35',
          },
          {
            name: 'CPQ_RAM',
            langDepName: 'RAM',
            required: false,
            type: OccConfigurator.UiType.SINGLE_SELECTION_IMAGE,
            value: '32GB',
          },
        ],
      },
      {
        configurable: true,
        description: 'Peripherals & Accessories',
        groupType: OccConfigurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.2',
        name: '2',
        attributes: [],
      },
      {
        configurable: true,
        description: 'Software',
        groupType: OccConfigurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.3',
        name: '3',
        attributes: [],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorVariantSerializer],
    });

    occConfiguratorVariantSerializer = TestBed.inject(
      OccConfiguratorVariantSerializer as Type<OccConfiguratorVariantSerializer>
    );
  });

  it('should convert configuration to occConfiguration', () => {
    const convertedConfiguration = occConfiguratorVariantSerializer.convert(
      sourceConfiguration
    );
    expect(convertedConfiguration.complete).toEqual(
      targetOccConfiguration.complete
    );
    expect(convertedConfiguration.configId).toEqual(
      targetOccConfiguration.configId
    );
  });

  it('should convert groups', () => {
    const occGroups: OccConfigurator.Group[] = [];
    occConfiguratorVariantSerializer.convertGroup(
      sourceConfiguration.groups[0],
      occGroups
    );
    expect(occGroups.length).toBe(1);
    expect(occGroups[0].id).toBe(GROUP_ID);
  });

  it('should handle groups without attributes well', () => {
    const occGroups: OccConfigurator.Group[] = [];
    occConfiguratorVariantSerializer.convertGroup(
      groupWithoutAttributes,
      occGroups
    );
    expect(occGroups.length).toBe(1);
  });

  it('should take sub groups into account', () => {
    const occGroups: OccConfigurator.Group[] = [];

    occConfiguratorVariantSerializer.convertGroup(groupWithSubGroup, occGroups);
    expect(occGroups.length).toBe(1);
    expect(occGroups[0].subGroups.length).toBe(1);
    expect(occGroups[0].subGroups[0].id).toBe(GROUP_ID);
  });

  it('should map group types properly', () => {
    expect(
      occConfiguratorVariantSerializer.convertGroupType(
        Configurator.GroupType.ATTRIBUTE_GROUP
      )
    ).toBe(OccConfigurator.GroupType.CSTIC_GROUP);

    expect(
      occConfiguratorVariantSerializer.convertGroupType(
        Configurator.GroupType.SUB_ITEM_GROUP
      )
    ).toBe(OccConfigurator.GroupType.INSTANCE);
  });

  it('should fill formatted value for numeric attributes', () => {
    const numericAttribute: Configurator.Attribute = {
      name: 'attr',
      userInput: '12.21',
      retractTriggered: false,
      uiType: Configurator.UiType.NUMERIC,
    };
    const occAttributes = [];
    occConfiguratorVariantSerializer.convertAttribute(
      numericAttribute,
      occAttributes
    );
    expect(occAttributes[0].formattedValue).toBe(numericAttribute.userInput);
    expect(occAttributes[0].retractTriggered).toBe(false);
  });

  it('should fill value for string attributes', () => {
    const stringAttribute: Configurator.Attribute = {
      name: 'attr',
      userInput: 'abc',
      retractTriggered: false,
      uiType: Configurator.UiType.STRING,
    };
    const occAttributes = [];
    occConfiguratorVariantSerializer.convertAttribute(
      stringAttribute,
      occAttributes
    );
    expect(occAttributes[0].value).toBe(stringAttribute.userInput);
    expect(occAttributes[0].retractTriggered).toBe(false);
  });

  it('should fill domainvalues for multivalued attributes', () => {
    const mvAttribute: Configurator.Attribute = {
      name: 'attr',
      userInput: '',
      retractTriggered: false,
      uiType: Configurator.UiType.CHECKBOX,
      values: [
        { valueCode: 'code1', valueDisplay: 'name1' },
        { valueCode: 'code2', valueDisplay: 'name2' },
      ],
    };
    const occAttributes = [];
    occConfiguratorVariantSerializer.convertAttribute(
      mvAttribute,
      occAttributes
    );
    expect(occAttributes[0].domainValues.length).toBe(2);
    expect(occAttributes[0].domainValues[0].key).toBe('code1');
    expect(occAttributes[0].domainValues[1].langDepName).toBe('name2');
  });

  it('should consider that an attribute was retracted', () => {
    const attributeWithRetraction: Configurator.Attribute = {
      name: 'attr',
      retractTriggered: true,
    };
    const occAttributes = [];
    occConfiguratorVariantSerializer.convertAttribute(
      attributeWithRetraction,
      occAttributes
    );
    expect(occAttributes[0].retractTriggered).toBe(true);
  });

  it('should map ui types properly', () => {
    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.NUMERIC
      )
    ).toBe(OccConfigurator.UiType.NUMERIC);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.RADIOBUTTON
      )
    ).toBe(OccConfigurator.UiType.RADIO_BUTTON);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.READ_ONLY
      )
    ).toBe(OccConfigurator.UiType.NOT_IMPLEMENTED);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.DROPDOWN
      )
    ).toBe(OccConfigurator.UiType.DROPDOWN);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.STRING
      )
    ).toBe(OccConfigurator.UiType.STRING);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.CHECKBOXLIST
      )
    ).toBe(OccConfigurator.UiType.CHECK_BOX_LIST);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.CHECKBOX
      )
    ).toBe(OccConfigurator.UiType.CHECK_BOX);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.MULTI_SELECTION_IMAGE
      )
    ).toBe(OccConfigurator.UiType.MULTI_SELECTION_IMAGE);

    expect(
      occConfiguratorVariantSerializer.convertCharacteristicType(
        Configurator.UiType.SINGLE_SELECTION_IMAGE
      )
    ).toBe(OccConfigurator.UiType.SINGLE_SELECTION_IMAGE);
  });
});
