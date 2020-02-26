import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { TranslationService } from '../../../../../i18n/translation.service';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfig } from '../../../../config/occ-config';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantNormalizer
  implements
    Converter<OccConfigurator.Configuration, Configurator.Configuration> {
  constructor(
    protected config: OccConfig,
    protected translation: TranslationService
  ) {}

  convert(
    source: OccConfigurator.Configuration,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    target = {
      configId: source.configId,
      complete: source.complete,
      productCode: source.kbKey.productCode,
      groups: [],
      flatGroups: [],
      isCartEntryUpdateRequired: false,
    };

    source.groups.forEach(group =>
      this.convertGroup(group, target.groups, target.flatGroups)
    );
    return target;
  }

  convertGroup(
    source: OccConfigurator.Group,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    source.cstics.forEach(cstic =>
      this.convertCharacteristic(cstic, attributes)
    );

    const group = {
      description: source.description,
      configurable: source.configurable,
      groupType: this.convertGroupType(source.groupType),
      name: source.name,
      id: source.id,
      attributes: attributes,
      subGroups: [],
    };

    this.setGeneralDescription(group);

    if (source.subGroups) {
      source.subGroups.forEach(sourceSubGroup =>
        this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList)
      );
    }

    if (group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP) {
      flatGroupList.push(group);
    }

    groupList.push(group);
  }

  convertCharacteristic(
    cstic: OccConfigurator.Characteristic,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      name: cstic.name,
      label: cstic.langdepname,
      required: cstic.required,
      uiType: this.convertCharacteristicType(cstic.type),
      values: [],
      userInput: cstic.formattedValue ? cstic.formattedValue : cstic.value,
      maxlength: cstic.maxlength,
      selectedSingleValue: null,
      images: [],
    };

    if (cstic.images) {
      cstic.images.forEach(occImage =>
        this.convertImage(occImage, attribute.images)
      );
    }

    if (cstic.domainvalues) {
      cstic.domainvalues.forEach(value =>
        this.convertValue(value, attribute.values)
      );
      this.setSelectedSingleValue(attribute);
    }

    attributeList.push(attribute);
  }

  setSelectedSingleValue(attribute: Configurator.Attribute) {
    const selectedValues = attribute.values
      .map(entry => entry)
      .filter(entry => entry.selected);
    if (selectedValues && selectedValues.length === 1) {
      attribute.selectedSingleValue = selectedValues[0].valueCode;
    }
  }

  convertValue(
    occValue: OccConfigurator.Value,
    values: Configurator.Value[]
  ): void {
    const value: Configurator.Value = {
      valueCode: occValue.key,
      valueDisplay: occValue.langdepname,
      name: occValue.name,
      selected: occValue.selected,
      images: [],
    };

    if (occValue.images) {
      occValue.images.forEach(occImage =>
        this.convertImage(occImage, value.images)
      );
    }

    values.push(value);
  }

  convertImage(
    occImage: OccConfigurator.Image,
    images: Configurator.Image[]
  ): void {
    const image: Configurator.Image = {
      /**
       * Traditionally, in an on-prem world, medias and other backend related calls
       * are hosted at the same platform, but in a cloud setup, applications are
       * typically distributed cross different environments. For media, we use the
       * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
       * if none provided.
       */
      url:
        (this.config.backend.media.baseUrl ||
          this.config.backend.occ.baseUrl ||
          '') + occImage.url,
      altText: occImage.altText,
      galleryIndex: occImage.galleryIndex,
      type: this.convertImageType(occImage.imageType),
      format: this.convertImageFormatType(occImage.format),
    };

    images.push(image);
  }

  convertCharacteristicType(type: OccConfigurator.UiType): Configurator.UiType {
    let uiType: Configurator.UiType;
    switch (type) {
      case OccConfigurator.UiType.RADIO_BUTTON: {
        uiType = Configurator.UiType.RADIOBUTTON;
        break;
      }
      case OccConfigurator.UiType.DROPDOWN: {
        uiType = Configurator.UiType.DROPDOWN;
        break;
      }
      case OccConfigurator.UiType.STRING: {
        uiType = Configurator.UiType.STRING;
        break;
      }
      case OccConfigurator.UiType.READ_ONLY: {
        uiType = Configurator.UiType.READ_ONLY;
        break;
      }
      case OccConfigurator.UiType.CHECK_BOX_LIST: {
        uiType = Configurator.UiType.CHECKBOX;
        break;
      }
      case OccConfigurator.UiType.MULTI_SELECTION_IMAGE: {
        uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
        break;
      }
      case OccConfigurator.UiType.SINGLE_SELECTION_IMAGE: {
        uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
        break;
      }
      default: {
        uiType = Configurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  convertGroupType(
    groupType: OccConfigurator.GroupType
  ): Configurator.GroupType {
    switch (groupType) {
      case OccConfigurator.GroupType.CSTIC_GROUP:
        return Configurator.GroupType.ATTRIBUTE_GROUP;
      case OccConfigurator.GroupType.INSTANCE:
        return Configurator.GroupType.SUB_ITEM_GROUP;
    }
  }

  setGeneralDescription(group: Configurator.Group): void {
    if (group.name !== '_GEN') {
      return;
    }
    this.translation
      .translate('configurator.group.general')
      .pipe(take(1))
      .subscribe(generalText => (group.description = generalText));
  }

  convertImageType(
    imageType: OccConfigurator.ImageType
  ): Configurator.ImageType {
    switch (imageType) {
      case OccConfigurator.ImageType.GALLERY:
        return Configurator.ImageType.GALLERY;
      case OccConfigurator.ImageType.PRIMARY:
        return Configurator.ImageType.PRIMARY;
    }
  }

  convertImageFormatType(
    formatType: OccConfigurator.ImageFormatType
  ): Configurator.ImageFormatType {
    switch (formatType) {
      case OccConfigurator.ImageFormatType.VALUE_IMAGE:
        return Configurator.ImageFormatType.VALUE_IMAGE;
      case OccConfigurator.ImageFormatType.CSTIC_IMAGE:
        return Configurator.ImageFormatType.ATTRIBUTE_IMAGE;
    }
  }
}
