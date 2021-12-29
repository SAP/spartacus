import { Injectable } from '@angular/core';
import { Converter, OccConfig, TranslationService } from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { take } from 'rxjs/operators';
import { ConfiguratorUISettingsConfig } from '../../../components/config/configurator-ui-settings.config';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantNormalizer
  implements
    Converter<OccConfigurator.Configuration, Configurator.Configuration>
{
  static readonly RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';

  constructor(
    protected config: OccConfig,
    protected translation: TranslationService,
    protected uiSettingsConfig: ConfiguratorUISettingsConfig
  ) {}

  convert(
    source: OccConfigurator.Configuration,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const resultTarget: Configurator.Configuration = {
      ...target,
      owner: target?.owner ?? ConfiguratorModelUtils.createInitialOwner(),
      interactionState: target?.interactionState ?? {},
      configId: source.configId,
      complete: source.complete,
      consistent: source.consistent,
      totalNumberOfIssues: source.totalNumberOfIssues,
      productCode: source.rootProduct,
      groups: [],
      flatGroups: [],
    };
    const flatGroups: Configurator.Group[] = [];
    source.groups?.forEach((group) =>
      this.convertGroup(group, resultTarget.groups, flatGroups)
    );
    resultTarget.flatGroups = flatGroups;

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

    const group: Configurator.Group = {
      description: source.description,
      configurable: source.configurable,
      complete: source.complete,
      consistent: source.consistent,
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
    const numberOfConflicts = sourceAttribute?.conflicts
      ? sourceAttribute?.conflicts?.length
      : 0;

    const attributeImages: Configurator.Image[] = [];
    const attributeValues: Configurator.Value[] = [];

    if (sourceAttribute.images) {
      sourceAttribute.images.forEach((occImage) =>
        this.convertImage(occImage, attributeImages)
      );
    }

    this.addRetractValue(sourceAttribute, attributeValues);

    if (sourceAttribute.domainValues) {
      sourceAttribute.domainValues.forEach((value) =>
        this.convertValue(value, attributeValues)
      );
    }

    const attribute: Configurator.Attribute = {
      name: sourceAttribute.name,
      label: sourceAttribute.langDepName,
      required: sourceAttribute.required,
      uiType: this.convertAttributeType(
        sourceAttribute.type ?? OccConfigurator.UiType.NOT_IMPLEMENTED
      ),
      groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
      userInput: sourceAttribute.formattedValue,
      maxlength:
        (sourceAttribute.maxlength ?? 0) +
        (sourceAttribute.negativeAllowed ? 1 : 0),
      numDecimalPlaces: sourceAttribute.numberScale,
      negativeAllowed: sourceAttribute.negativeAllowed,
      numTotalLength: sourceAttribute.typeLength,
      selectedSingleValue: undefined,
      hasConflicts: numberOfConflicts > 0,
      images: attributeImages,
      values: attributeValues,
    };

    this.setSelectedSingleValue(attribute);

    //Has to be called after setSelectedSingleValue because it depends on the value of this property
    this.compileAttributeIncomplete(attribute);
    attributeList.push(attribute);
  }

  setSelectedSingleValue(attribute: Configurator.Attribute) {
    if (attribute.values) {
      const selectedValues = attribute.values
        .map((entry) => entry)
        .filter((entry) => entry.selected);
      if (selectedValues && selectedValues.length === 1) {
        attribute.selectedSingleValue = selectedValues[0].valueCode;
      }
    }
  }

  protected isRetractValueSelected(
    sourceAttribute: OccConfigurator.Attribute
  ): boolean {
    return sourceAttribute.domainValues &&
      sourceAttribute.domainValues.filter((value) => value.selected).length
      ? false
      : true;
  }

  protected setRetractValueDisplay(
    attributeType: Configurator.UiType,
    value: Configurator.Value
  ) {
    if (
      attributeType === Configurator.UiType.DROPDOWN ||
      attributeType === Configurator.UiType.RADIOBUTTON
    ) {
      if (attributeType === Configurator.UiType.DROPDOWN && value.selected) {
        this.translation
          .translate('configurator.attribute.dropDownSelectMsg')
          .pipe(take(1))
          .subscribe((text) => (value.valueDisplay = text));
      } else {
        this.translation
          .translate('configurator.attribute.noOptionSelectedMsg')
          .pipe(take(1))
          .subscribe((text) => (value.valueDisplay = text));
      }
    }
  }

  protected addRetractValue(
    sourceAttribute: OccConfigurator.Attribute,
    values: Configurator.Value[]
  ) {
    if (this.uiSettingsConfig?.productConfigurator?.addRetractOption) {
      const attributeType = this.convertAttributeType(
        sourceAttribute.type ?? OccConfigurator.UiType.NOT_IMPLEMENTED
      );

      if (
        attributeType === Configurator.UiType.RADIOBUTTON ||
        attributeType === Configurator.UiType.DROPDOWN
      ) {
        const value: Configurator.Value = {
          valueCode: OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE,
          valueDisplay: '',
          selected: this.isRetractValueSelected(sourceAttribute),
        };

        this.setRetractValueDisplay(attributeType, value);

        values.push(value);
      }
    }
  }

  convertValue(
    occValue: OccConfigurator.Value,
    values: Configurator.Value[]
  ): void {
    const valueImages: Configurator.Image[] = [];
    if (occValue.images) {
      occValue.images.forEach((occImage) =>
        this.convertImage(occImage, valueImages)
      );
    }

    const value: Configurator.Value = {
      valueCode: occValue.key,
      valueDisplay: occValue.langDepName,
      name: occValue.name,
      selected: occValue.selected,
      images: valueImages,
    };

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
        (this.config?.backend?.media?.baseUrl ||
          this.config?.backend?.occ?.baseUrl ||
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
      case Configurator.UiType.DROPDOWN: {
        if (
          !attribute.selectedSingleValue ||
          attribute.selectedSingleValue ===
            OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE
        ) {
          attribute.incomplete = true;
        }
        break;
      }
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
          attribute.values?.find((value) => value.selected) !== undefined;
        attribute.incomplete = !isOneValueSelected;
        break;
      }
    }
  }
}
