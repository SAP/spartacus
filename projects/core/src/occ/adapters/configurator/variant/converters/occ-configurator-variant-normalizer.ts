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
    const resultTarget: Configurator.Configuration = {
      ...target,
      configId: source.configId,
      complete: source.complete,
      totalNumberOfIssues: source.totalNumberOfIssues,
      productCode: source.rootProduct,
      groups: [],
      flatGroups: [],
    };
    source.groups.forEach((group) =>
      this.convertGroup(group, resultTarget.groups, resultTarget.flatGroups)
    );
    return resultTarget;
  }

  convertGroup(
    source: OccConfigurator.Group,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    if (source.attributes) {
      source.attributes.forEach((sourceAttribute) =>
        this.convertAttribute(sourceAttribute, attributes)
      );
    }

    const group = {
      description: source.description,
      configurable: source.configurable,
      groupType: this.convertGroupType(source.groupType),
      name: source.name,
      id: source.id,
      attributes: attributes,
      subGroups: [],
    };

    this.setGroupDescription(group);

    if (source.subGroups) {
      source.subGroups.forEach((sourceSubGroup) =>
        this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList)
      );
    }

    if (
      group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP ||
      group.groupType === Configurator.GroupType.CONFLICT_GROUP
    ) {
      flatGroupList.push(group);
    }

    groupList.push(group);
  }

  getGroupId(key: string, name: string): string {
    return key.replace('@' + name, '');
  }

  convertAttribute(
    sourceAttribute: OccConfigurator.Attribute,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      name: sourceAttribute.name,
      label: sourceAttribute.langDepName,
      required: sourceAttribute.required,
      uiType: this.convertAttributeType(sourceAttribute.type),
      values: [],
      groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
      userInput: sourceAttribute.formattedValue,
      maxlength:
        sourceAttribute.maxlength + (sourceAttribute.negativeAllowed ? 1 : 0),
      numDecimalPlaces: sourceAttribute.numberScale,
      negativeAllowed: sourceAttribute.negativeAllowed,
      numTotalLength: sourceAttribute.typeLength,
      selectedSingleValue: null,
      images: [],
      hasConflicts: sourceAttribute?.conflicts?.length > 0 ? true : false,
    };

    if (sourceAttribute.images) {
      sourceAttribute.images.forEach((occImage) =>
        this.convertImage(occImage, attribute.images)
      );
    }

    if (sourceAttribute.domainValues) {
      sourceAttribute.domainValues.forEach((value) =>
        this.convertValue(value, attribute.values)
      );
      this.setSelectedSingleValue(attribute);
    }

    //Has to be called after setSelectedSingleValue because it depends on the value of this property
    this.compileAttributeIncomplete(attribute);
    attributeList.push(attribute);
  }

  setSelectedSingleValue(attribute: Configurator.Attribute) {
    const selectedValues = attribute.values
      .map((entry) => entry)
      .filter((entry) => entry.selected);
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
      valueDisplay: occValue.langDepName,
      name: occValue.name,
      selected: occValue.selected,
      images: [],
    };

    if (occValue.images) {
      occValue.images.forEach((occImage) =>
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

  convertAttributeType(type: OccConfigurator.UiType): Configurator.UiType {
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
      case OccConfigurator.UiType.NUMERIC: {
        uiType = Configurator.UiType.NUMERIC;
        break;
      }
      case OccConfigurator.UiType.READ_ONLY: {
        uiType = Configurator.UiType.READ_ONLY;
        break;
      }
      case OccConfigurator.UiType.CHECK_BOX_LIST: {
        uiType = Configurator.UiType.CHECKBOXLIST;
        break;
      }
      case OccConfigurator.UiType.CHECK_BOX: {
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
      case OccConfigurator.GroupType.CONFLICT_HEADER:
        return Configurator.GroupType.CONFLICT_HEADER_GROUP;
      case OccConfigurator.GroupType.CONFLICT:
        return Configurator.GroupType.CONFLICT_GROUP;
    }
  }

  setGroupDescription(group: Configurator.Group): void {
    switch (group.groupType) {
      case Configurator.GroupType.CONFLICT_HEADER_GROUP:
        this.translation
          .translate('configurator.group.conflictHeader')
          .pipe(take(1))
          .subscribe(
            (conflictHeaderText) => (group.description = conflictHeaderText)
          );
        break;
      case Configurator.GroupType.CONFLICT_GROUP:
        const conflictDescription = group.description;
        this.translation
          .translate('configurator.group.conflictGroup', {
            attribute: group.name,
          })
          .pipe(take(1))
          .subscribe(
            (conflictGroupText) => (group.description = conflictGroupText)
          );
        group.name = conflictDescription;
        break;
      default:
        if (group.name !== '_GEN') {
          return;
        }
        this.translation
          .translate('configurator.group.general')
          .pipe(take(1))
          .subscribe((generalText) => (group.description = generalText));
    }
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

  compileAttributeIncomplete(attribute: Configurator.Attribute) {
    //Default value for incomplete is false
    attribute.incomplete = false;

    switch (attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        if (!attribute.selectedSingleValue) {
          attribute.incomplete = true;
        }
        break;
      }
      case Configurator.UiType.NUMERIC:
      case Configurator.UiType.STRING: {
        if (!attribute.userInput) {
          attribute.incomplete = true;
        }
        break;
      }

      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        const isOneValueSelected =
          attribute.values.find((value) => value.selected) !== undefined
            ? true
            : false;

        if (!isOneValueSelected) {
          attribute.incomplete = true;
        }
        break;
      }
    }
  }
}
