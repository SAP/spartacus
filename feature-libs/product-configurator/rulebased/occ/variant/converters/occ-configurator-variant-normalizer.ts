/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  /**
   * @deprecated since 6.2
   */
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
      kbKey: source.kbKey ?? undefined,
      pricingEnabled: source.pricingEnabled ?? true,
      hideBasePriceAndSelectedOptions: source.hideBasePriceAndSelectedOptions,
      immediateConflictResolution: source.immediateConflictResolution ?? false,
      newConfiguration: source.newConfiguration, // we need a trinary state true, false, undefined!
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
    const numberOfConflicts = sourceAttribute.conflicts
      ? sourceAttribute.conflicts.length
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
    const uiType = this.convertAttributeType(sourceAttribute);
    const attribute: Configurator.Attribute = {
      name: sourceAttribute.name,
      label: sourceAttribute.langDepName,
      required: sourceAttribute.required,
      uiType: uiType,
      uiTypeVariation: sourceAttribute.type,
      groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
      userInput:
        uiType === Configurator.UiType.NUMERIC ||
        uiType === Configurator.UiType.STRING
          ? sourceAttribute.formattedValue
            ? sourceAttribute.formattedValue
            : ''
          : undefined,
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
      intervalInDomain: sourceAttribute.intervalInDomain,
      key: sourceAttribute.key,
      validationType: sourceAttribute.validationType,
      visible: sourceAttribute.visible,
      description: sourceAttribute.longText,
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
      attributeType === Configurator.UiType.RADIOBUTTON ||
      attributeType === Configurator.UiType.SINGLE_SELECTION_IMAGE
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

  protected hasSourceAttributeConflicts(
    sourceAttribute: OccConfigurator.Attribute
  ): boolean {
    return sourceAttribute.conflicts
      ? sourceAttribute.conflicts.length > 0
      : false;
  }

  protected isSourceAttributeTypeReadOnly(
    sourceAttribute: OccConfigurator.Attribute
  ): boolean {
    return (
      sourceAttribute.type === OccConfigurator.UiType.READ_ONLY ||
      sourceAttribute.type ===
        OccConfigurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE ||
      sourceAttribute.type ===
        OccConfigurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE
    );
  }

  protected isRetractBlocked(
    sourceAttribute: OccConfigurator.Attribute
  ): boolean {
    return sourceAttribute.retractBlocked
      ? sourceAttribute.retractBlocked
      : false;
  }

  protected addRetractValue(
    sourceAttribute: OccConfigurator.Attribute,
    values: Configurator.Value[]
  ) {
    const isRetractBlocked = this.isRetractBlocked(sourceAttribute);
    const isConflicting = this.hasSourceAttributeConflicts(sourceAttribute);

    if (!isRetractBlocked) {
      if (
        this.uiSettingsConfig?.productConfigurator?.addRetractOption ||
        (this.isSourceAttributeTypeReadOnly(sourceAttribute) && isConflicting)
      ) {
        const attributeType = this.convertAttributeType(sourceAttribute);
        if (
          attributeType === Configurator.UiType.RADIOBUTTON ||
          attributeType === Configurator.UiType.DROPDOWN ||
          attributeType === Configurator.UiType.SINGLE_SELECTION_IMAGE
        ) {
          const value: Configurator.Value = {
            valueCode: Configurator.RetractValueCode,
            selected: this.isRetractValueSelected(sourceAttribute),
          };

          this.setRetractValueDisplay(attributeType, value);

          values.push(value);
        }
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
      description: occValue.longText,
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

  protected getSingleSelectionUiType(
    coreSourceType: string,
    uiType: Configurator.UiType
  ): Configurator.UiType {
    switch (coreSourceType) {
      case OccConfigurator.UiType.RADIO_BUTTON: {
        uiType = Configurator.UiType.RADIOBUTTON;
        break;
      }
      case OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT: {
        uiType = Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
        break;
      }
      case OccConfigurator.UiType.DROPDOWN: {
        uiType = Configurator.UiType.DROPDOWN;
        break;
      }
      case OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
        uiType = Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
        break;
      }
      case OccConfigurator.UiType.CHECK_BOX: {
        uiType = Configurator.UiType.CHECKBOX;
        break;
      }
      case OccConfigurator.UiType.SINGLE_SELECTION_IMAGE: {
        uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
        break;
      }
    }
    return uiType;
  }

  protected getMultiSelectionUiType(
    coreSourceType: string,
    uiType: Configurator.UiType
  ): Configurator.UiType {
    switch (coreSourceType) {
      case OccConfigurator.UiType.CHECK_BOX_LIST: {
        uiType = Configurator.UiType.CHECKBOXLIST;
        break;
      }
      case OccConfigurator.UiType.MULTI_SELECTION_IMAGE: {
        uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
        break;
      }
    }
    return uiType;
  }

  protected getReadOnlyUiType(
    sourceAttribute: OccConfigurator.Attribute,
    coreSourceType: string,
    uiType: Configurator.UiType
  ): Configurator.UiType {
    switch (coreSourceType) {
      case OccConfigurator.UiType.READ_ONLY: {
        uiType =
          !sourceAttribute.retractBlocked &&
          this.hasSourceAttributeConflicts(sourceAttribute)
            ? Configurator.UiType.RADIOBUTTON
            : Configurator.UiType.READ_ONLY;
        break;
      }
      case OccConfigurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE: {
        uiType =
          !sourceAttribute.retractBlocked &&
          this.hasSourceAttributeConflicts(sourceAttribute)
            ? Configurator.UiType.SINGLE_SELECTION_IMAGE
            : Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE;
        break;
      }
      case OccConfigurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE: {
        uiType =
          !sourceAttribute.retractBlocked &&
          this.hasSourceAttributeConflicts(sourceAttribute)
            ? Configurator.UiType.MULTI_SELECTION_IMAGE
            : Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
        break;
      }
    }
    return uiType;
  }

  protected getInputUiType(
    coreSourceType: string,
    uiType: Configurator.UiType
  ): Configurator.UiType {
    switch (coreSourceType) {
      case OccConfigurator.UiType.STRING: {
        uiType = Configurator.UiType.STRING;
        break;
      }
      case OccConfigurator.UiType.NUMERIC: {
        uiType = Configurator.UiType.NUMERIC;
        break;
      }
    }
    return uiType;
  }

  convertAttributeType(
    sourceAttribute: OccConfigurator.Attribute
  ): Configurator.UiType {
    let uiType = Configurator.UiType.NOT_IMPLEMENTED;
    const sourceType: string = sourceAttribute.type?.toString() ?? '';
    const coreSourceType = this.determineCoreUiType(sourceType);

    uiType = this.getSingleSelectionUiType(coreSourceType, uiType);
    uiType = this.getMultiSelectionUiType(coreSourceType, uiType);
    uiType = this.getInputUiType(coreSourceType, uiType);
    uiType = this.getReadOnlyUiType(sourceAttribute, coreSourceType, uiType);

    return uiType;
  }

  protected determineCoreUiType(sourceType: string) {
    const indexCustomSeparator = sourceType.indexOf(
      Configurator.CustomUiTypeIndicator
    );
    return indexCustomSeparator > 0
      ? sourceType.substring(0, indexCustomSeparator)
      : sourceType;
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
      case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
      case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
      case Configurator.UiType.DROPDOWN: {
        if (
          !attribute.selectedSingleValue ||
          attribute.selectedSingleValue === Configurator.RetractValueCode
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
