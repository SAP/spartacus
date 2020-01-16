import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../../../model/configurator.model';
import { ConverterService } from '../../../../../util/converter.service';
import { OccConfig } from '../../../../config/occ-config';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantNormalizer } from './occ-configurator-variant-normalizer';

const csticName = 'name';
const valueKey = 'BK';
const valueName = 'Black';
const valueKey2 = 'BE';
const selectedFlag = true;
const requiredFlag = true;

const occImage: OccConfigurator.Image = {
  altText: 'Alternate Text for Image',
  format: OccConfigurator.ImageFormatType.VALUE_IMAGE,
  imageType: OccConfigurator.ImageType.PRIMARY,
  url: 'media?This%20%is%20%a%20%URL',
};

const occCstic: OccConfigurator.Characteristic = {
  name: csticName,
  images: [occImage],
};
const occCsticWithValues: OccConfigurator.Characteristic = {
  name: csticName,
  required: requiredFlag,
  type: OccConfigurator.UiType.RADIO_BUTTON,
  domainvalues: [
    { key: valueKey, images: [occImage] },
    { key: valueKey2, selected: selectedFlag },
  ],
};
const configuration: OccConfigurator.Configuration = {
  complete: true,
  kbKey: { productCode: 'CONF_PRODUCT' },
  groups: [
    {
      cstics: [occCsticWithValues],
      subGroups: [{ cstics: [occCsticWithValues] }],
    },
    {
      cstics: [occCsticWithValues],
    },
  ],
};

const occValue: OccConfigurator.Value = {
  key: valueKey,
  langdepname: valueName,
};

class MockConverterService {
  convert() {}
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

describe('OccConfiguratorVariantNormalizer', () => {
  let occConfiguratorVariantNormalizer: OccConfiguratorVariantNormalizer;
  let occConfig: OccConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    occConfiguratorVariantNormalizer = TestBed.get(
      OccConfiguratorVariantNormalizer as Type<OccConfiguratorVariantNormalizer>
    );
    occConfig = TestBed.get(OccConfig as Type<OccConfig>);
  });

  it('should be created', () => {
    expect(occConfiguratorVariantNormalizer).toBeTruthy();
  });

  it('should convert a configuration', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    expect(result.complete).toBe(true);
  });

  it('should convert subgroups', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    expect(result.groups[0].subGroups[0].attributes.length).toBe(1);
  });

  it('should convert empty subgroups to empty array', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    expect(result.groups[1].subGroups.length).toBe(0);
  });

  it('should convert attributes and values', () => {
    const result = occConfiguratorVariantNormalizer.convert(configuration);
    const attributes = result.groups[0].attributes;
    expect(attributes).toBeDefined();
    expect(attributes.length).toBe(1);
    const attribute = attributes[0];
    expect(attribute.name).toBe(csticName);
    expect(attribute.required).toBe(requiredFlag);
    expect(attribute.selectedSingleValue).toBe(valueKey2);
    expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON);
    const values = attribute.values;
    expect(values.length).toBe(2);
  });

  it('should convert values', () => {
    const values: Configurator.Value[] = [];
    occConfiguratorVariantNormalizer.convertValue(occValue, values);
    expect(values.length).toBe(1);
    expect(values[0].valueCode).toBe(valueKey);
  });

  it('should convert attributes and do not complain if no domain values are present', () => {
    const attributes: Configurator.Attribute[] = [];
    occConfiguratorVariantNormalizer.convertCharacteristic(
      occCstic,
      attributes
    );
    expect(attributes.length).toBe(1);
    expect(attributes[0].name).toBe(csticName);
  });

  it('should set selectedSingleValue', () => {
    const configAttribute: Configurator.Attribute = {
      name: csticName,
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
      name: csticName,
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
      occConfiguratorVariantNormalizer.convertCharacteristicType(
        OccConfigurator.UiType.RADIO_BUTTON
      )
    ).toBe(Configurator.UiType.RADIOBUTTON);
  });

  it('should return UIType Drop Down for Drop Down occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertCharacteristicType(
        OccConfigurator.UiType.DROPDOWN
      )
    ).toBe(Configurator.UiType.DROPDOWN);
  });

  it('should return UIType Checkbox for Checkbox occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertCharacteristicType(
        OccConfigurator.UiType.CHECK_BOX_LIST
      )
    ).toBe(Configurator.UiType.CHECKBOX);
  });

  it('should return UIType Not Implemented for unkonwn occ configurator type', () => {
    expect(
      occConfiguratorVariantNormalizer.convertCharacteristicType(
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
        OccConfigurator.GroupType.INSTANCE
      )
    ).toBe(Configurator.GroupType.SUB_ITEM_GROUP);
  });

  it('should convert image with media URL configured', () => {
    const images = [];

    occConfiguratorVariantNormalizer.convertImage(occImage, images);

    expect(images.length).toBe(1);
    expect(images[0].url).toBe(
      'https://mediaBackendBaseUrl/media?This%20%is%20%a%20%URL'
    );

    occConfiguratorVariantNormalizer.convertImage(occImage, images);
    expect(images.length).toBe(2);
  });

  it('should convert image with no media URL configured', () => {
    const images = [];
    occConfig.backend.media.baseUrl = null;

    occConfiguratorVariantNormalizer.convertImage(occImage, images);

    expect(images.length).toBe(1);
    expect(images[0].url).toBe(
      'https://occBackendBaseUrl/media?This%20%is%20%a%20%URL'
    );
  });
});
