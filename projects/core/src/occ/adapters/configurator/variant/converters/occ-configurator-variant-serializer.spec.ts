import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../../../model/configurator.model';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantSerializer } from './occ-configurator-variant-serializer';

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantSerializer: OccConfiguratorVariantSerializer;

  const sourceConfiguration: Configurator.Configuration = {
    complete: false,
    configId: '1234-56-7890',
    consistent: true,
    productCode: 'CPQ_LAPTOP',
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
});
