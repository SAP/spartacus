import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../../../model/configurator.model';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantSerializer } from './occ-configurator-variant-serializer';

describe('OccConfiguratorVariantNormalizer', () => {
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
    complete: false,
    configId: '1234-56-7890',
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
        cstics: [
          {
            name: 'EXP_NUMBER',
            langdepname: 'Expected Number',
            required: true,
            type: OccConfigurator.UiType.NOT_IMPLEMENTED,
          },

          {
            name: 'CPQ_CPU',
            langdepname: 'Processor',
            required: true,
            type: OccConfigurator.UiType.RADIO_BUTTON,
            value: 'INTELI5_35',
          },
          {
            name: 'CPQ_RAM',
            langdepname: 'RAM',
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
        cstics: [],
      },
      {
        configurable: true,
        description: 'Software',
        groupType: OccConfigurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.3',
        name: '3',
        cstics: [],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorVariantSerializer],
    });

    occConfiguratorVariantSerializer = TestBed.get(
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
});
