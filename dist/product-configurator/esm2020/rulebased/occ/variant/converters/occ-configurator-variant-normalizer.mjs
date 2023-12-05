/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { take } from 'rxjs/operators';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../components/config/configurator-ui-settings.config";
export class OccConfiguratorVariantNormalizer {
    constructor(config, translation, uiSettingsConfig) {
        this.config = config;
        this.translation = translation;
        this.uiSettingsConfig = uiSettingsConfig;
    }
    convert(source, target) {
        const resultTarget = {
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
        const flatGroups = [];
        source.groups?.forEach((group) => this.convertGroup(group, resultTarget.groups, flatGroups));
        resultTarget.flatGroups = flatGroups;
        return resultTarget;
    }
    convertGroup(source, groupList, flatGroupList) {
        const attributes = [];
        if (source.attributes) {
            source.attributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, attributes));
        }
        const group = {
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
            source.subGroups.forEach((sourceSubGroup) => this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList));
        }
        if (group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP ||
            group.groupType === Configurator.GroupType.CONFLICT_GROUP) {
            flatGroupList.push(group);
        }
        groupList.push(group);
    }
    getGroupId(key, name) {
        return key.replace('@' + name, '');
    }
    convertAttribute(sourceAttribute, attributeList) {
        const numberOfConflicts = sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length
            : 0;
        const attributeImages = [];
        const attributeValues = [];
        if (sourceAttribute.images) {
            sourceAttribute.images.forEach((occImage) => this.convertImage(occImage, attributeImages));
        }
        this.addRetractValue(sourceAttribute, attributeValues);
        if (sourceAttribute.domainValues) {
            sourceAttribute.domainValues.forEach((value) => this.convertValue(value, attributeValues));
        }
        const uiType = this.convertAttributeType(sourceAttribute);
        const attribute = {
            name: sourceAttribute.name,
            label: sourceAttribute.langDepName,
            required: sourceAttribute.required,
            uiType: uiType,
            uiTypeVariation: sourceAttribute.type,
            groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
            userInput: uiType === Configurator.UiType.NUMERIC ||
                uiType === Configurator.UiType.STRING
                ? sourceAttribute.formattedValue
                    ? sourceAttribute.formattedValue
                    : ''
                : undefined,
            maxlength: (sourceAttribute.maxlength ?? 0) +
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
        };
        this.setSelectedSingleValue(attribute);
        //Has to be called after setSelectedSingleValue because it depends on the value of this property
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    setSelectedSingleValue(attribute) {
        if (attribute.values) {
            const selectedValues = attribute.values
                .map((entry) => entry)
                .filter((entry) => entry.selected);
            if (selectedValues && selectedValues.length === 1) {
                attribute.selectedSingleValue = selectedValues[0].valueCode;
            }
        }
    }
    isRetractValueSelected(sourceAttribute) {
        return sourceAttribute.domainValues &&
            sourceAttribute.domainValues.filter((value) => value.selected).length
            ? false
            : true;
    }
    setRetractValueDisplay(attributeType, value) {
        if (attributeType === Configurator.UiType.DROPDOWN ||
            attributeType === Configurator.UiType.RADIOBUTTON) {
            if (attributeType === Configurator.UiType.DROPDOWN && value.selected) {
                this.translation
                    .translate('configurator.attribute.dropDownSelectMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
            else {
                this.translation
                    .translate('configurator.attribute.noOptionSelectedMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
        }
    }
    hasSourceAttributeConflicts(sourceAttribute) {
        return sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length > 0
            : false;
    }
    isSourceAttributeTypeReadOnly(sourceAttribute) {
        return sourceAttribute.type === OccConfigurator.UiType.READ_ONLY;
    }
    isRetractBlocked(sourceAttribute) {
        return sourceAttribute.retractBlocked
            ? sourceAttribute.retractBlocked
            : false;
    }
    addRetractValue(sourceAttribute, values) {
        const isRetractBlocked = this.isRetractBlocked(sourceAttribute);
        const isConflicting = this.hasSourceAttributeConflicts(sourceAttribute);
        if (!isRetractBlocked) {
            if (this.uiSettingsConfig?.productConfigurator?.addRetractOption ||
                (this.isSourceAttributeTypeReadOnly(sourceAttribute) && isConflicting)) {
                const attributeType = this.convertAttributeType(sourceAttribute);
                if (attributeType === Configurator.UiType.RADIOBUTTON ||
                    attributeType === Configurator.UiType.DROPDOWN) {
                    const value = {
                        valueCode: Configurator.RetractValueCode,
                        selected: this.isRetractValueSelected(sourceAttribute),
                    };
                    this.setRetractValueDisplay(attributeType, value);
                    values.push(value);
                }
            }
        }
    }
    convertValue(occValue, values) {
        const valueImages = [];
        if (occValue.images) {
            occValue.images.forEach((occImage) => this.convertImage(occImage, valueImages));
        }
        const value = {
            valueCode: occValue.key,
            valueDisplay: occValue.langDepName,
            name: occValue.name,
            selected: occValue.selected,
            images: valueImages,
        };
        values.push(value);
    }
    convertImage(occImage, images) {
        const image = {
            /**
             * Traditionally, in an on-prem world, medias and other backend related calls
             * are hosted at the same platform, but in a cloud setup, applications are
             * typically distributed cross different environments. For media, we use the
             * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
             * if none provided.
             */
            url: (this.config?.backend?.media?.baseUrl ||
                this.config?.backend?.occ?.baseUrl ||
                '') + occImage.url,
            altText: occImage.altText,
            galleryIndex: occImage.galleryIndex,
            type: this.convertImageType(occImage.imageType),
            format: this.convertImageFormatType(occImage.format),
        };
        images.push(image);
    }
    convertAttributeType(sourceAttribute) {
        let uiType;
        const sourceType = sourceAttribute.type?.toString() ?? '';
        const coreSourceType = this.determineCoreUiType(sourceType);
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
            case OccConfigurator.UiType.STRING: {
                uiType = Configurator.UiType.STRING;
                break;
            }
            case OccConfigurator.UiType.NUMERIC: {
                uiType = Configurator.UiType.NUMERIC;
                break;
            }
            case OccConfigurator.UiType.READ_ONLY: {
                uiType =
                    !sourceAttribute.retractBlocked &&
                        this.hasSourceAttributeConflicts(sourceAttribute)
                        ? Configurator.UiType.RADIOBUTTON
                        : Configurator.UiType.READ_ONLY;
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
    determineCoreUiType(sourceType) {
        const indexCustomSeparator = sourceType.indexOf(Configurator.CustomUiTypeIndicator);
        return indexCustomSeparator > 0
            ? sourceType.substring(0, indexCustomSeparator)
            : sourceType;
    }
    convertGroupType(groupType) {
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
    setGroupDescription(group) {
        switch (group.groupType) {
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                this.translation
                    .translate('configurator.group.conflictHeader')
                    .pipe(take(1))
                    .subscribe((conflictHeaderText) => (group.description = conflictHeaderText));
                break;
            case Configurator.GroupType.CONFLICT_GROUP:
                const conflictDescription = group.description;
                this.translation
                    .translate('configurator.group.conflictGroup', {
                    attribute: group.name,
                })
                    .pipe(take(1))
                    .subscribe((conflictGroupText) => (group.description = conflictGroupText));
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
    convertImageType(imageType) {
        switch (imageType) {
            case OccConfigurator.ImageType.GALLERY:
                return Configurator.ImageType.GALLERY;
            case OccConfigurator.ImageType.PRIMARY:
                return Configurator.ImageType.PRIMARY;
        }
    }
    convertImageFormatType(formatType) {
        switch (formatType) {
            case OccConfigurator.ImageFormatType.VALUE_IMAGE:
                return Configurator.ImageFormatType.VALUE_IMAGE;
            case OccConfigurator.ImageFormatType.CSTIC_IMAGE:
                return Configurator.ImageFormatType.ATTRIBUTE_IMAGE;
        }
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue === Configurator.RetractValueCode) {
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
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined;
                attribute.incomplete = !isOneValueSelected;
                break;
            }
        }
    }
}
/**
 * @deprecated since 6.2
 */
OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, deps: [{ token: i1.OccConfig }, { token: i1.TranslationService }, { token: i2.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i1.TranslationService }, { type: i2.ConfiguratorUISettingsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7QUFHeEUsTUFBTSxPQUFPLGdDQUFnQztJQVMzQyxZQUNZLE1BQWlCLEVBQ2pCLFdBQStCLEVBQy9CLGdCQUE4QztRQUY5QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQThCO0lBQ3ZELENBQUM7SUFFSixPQUFPLENBQ0wsTUFBcUMsRUFDckMsTUFBbUM7UUFFbkMsTUFBTSxZQUFZLEdBQStCO1lBQy9DLEdBQUcsTUFBTTtZQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFO1lBQ25FLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsSUFBSSxFQUFFO1lBQ2hELFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFV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TUFBTSxrQkFBa0IsR0FDdEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ2xFLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDM0MsTUFBTTthQUNQO1NBQ0Y7SUFDSCxDQUFDOztBQXhkRDs7R0FFRztBQUNhLG1EQUFrQixHQUFHLDBCQUEwQixDQUFDOzZIQVByRCxnQ0FBZ0M7aUlBQWhDLGdDQUFnQyxjQURuQixNQUFNOzJGQUNuQixnQ0FBZ0M7a0JBRDVDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udmVydGVyLCBPY2NDb25maWcsIFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JNb2RlbFV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbmZpZy9jb25maWd1cmF0b3ItdWktc2V0dGluZ3MuY29uZmlnJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5tb2RlbHMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yVmFyaWFudE5vcm1hbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxPY2NDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiwgQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+XG57XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSA2LjJcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSBSRVRSQUNUX1ZBTFVFX0NPREUgPSAnIyMjUkVUUkFDVF9WQUxVRV9DT0RFIyMjJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBPY2NDb25maWcsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVpU2V0dGluZ3NDb25maWc6IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWdcbiAgKSB7fVxuXG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBPY2NDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICB0YXJnZXQ/OiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiB7XG4gICAgY29uc3QgcmVzdWx0VGFyZ2V0OiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLnRhcmdldCxcbiAgICAgIG93bmVyOiB0YXJnZXQ/Lm93bmVyID8/IENvbmZpZ3VyYXRvck1vZGVsVXRpbHMuY3JlYXRlSW5pdGlhbE93bmVyKCksXG4gICAgICBpbnRlcmFjdGlvblN0YXRlOiB0YXJnZXQ/LmludGVyYWN0aW9uU3RhdGUgPz8ge30sXG4gICAgICBjb25maWdJZDogc291cmNlLmNvbmZpZ0lkLFxuICAgICAgY29tcGxldGU6IHNvdXJjZS5jb21wbGV0ZSxcbiAgICAgIGNvbnNpc3RlbnQ6IHNvdXJjZS5jb25zaXN0ZW50LFxuICAgICAgdG90YWxOdW1iZXJPZklzc3Vlczogc291cmNlLnRvdGFsTnVtYmVyT2ZJc3N1ZXMsXG4gICAgICBwcm9kdWN0Q29kZTogc291cmNlLnJvb3RQcm9kdWN0LFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGZsYXRHcm91cHM6IFtdLFxuICAgICAga2JLZXk6IHNvdXJjZS5rYktleSA/PyB1bmRlZmluZWQsXG4gICAgICBwcmljaW5nRW5hYmxlZDogc291cmNlLnByaWNpbmdFbmFibGVkID8/IHRydWUsXG4gICAgICBoaWRlQmFzZVByaWNlQW5kU2VsZWN0ZWRPcHRpb25zOiBzb3VyY2UuaGlkZUJhc2VQcmljZUFuZFNlbGVjdGVkT3B0aW9ucyxcbiAgICAgIGltbWVkaWF0ZUNvbmZsaWN0UmVzb2x1dGlvbjogc291cmNlLmltbWVkaWF0ZUNvbmZsaWN0UmVzb2x1dGlvbiA/PyBmYWxzZSxcbiAgICAgIG5ld0NvbmZpZ3VyYXRpb246IHNvdXJjZS5uZXdDb25maWd1cmF0aW9uLCAvLyB3ZSBuZWVkIGEgdHJpbmFyeSBzdGF0ZSB0cnVlLCBmYWxzZSwgdW5kZWZpbmVkIVxuICAgIH07XG4gICAgY29uc3QgZmxhdEdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10gPSBbXTtcbiAgICBzb3VyY2UuZ3JvdXBzPy5mb3JFYWNoKChncm91cCkgPT5cbiAgICAgIHRoaXMuY29udmVydEdyb3VwKGdyb3VwLCByZXN1bHRUYXJnZXQuZ3JvdXBzLCBmbGF0R3JvdXBzKVxuICAgICk7XG4gICAgcmVzdWx0VGFyZ2V0LmZsYXRHcm91cHMgPSBmbGF0R3JvdXBzO1xuXG4gICAgcmV0dXJuIHJlc3VsdFRhcmdldDtcbiAgfVxuXG4gIGNvbnZlcnRHcm91cChcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICBncm91cExpc3Q6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGZsYXRHcm91cExpc3Q6IENvbmZpZ3VyYXRvci5Hcm91cFtdXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXM6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVbXSA9IFtdO1xuICAgIGlmIChzb3VyY2UuYXR0cmlidXRlcykge1xuICAgICAgc291cmNlLmF0dHJpYnV0ZXMuZm9yRWFjaCgoc291cmNlQXR0cmlidXRlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRBdHRyaWJ1dGUoc291cmNlQXR0cmlidXRlLCBhdHRyaWJ1dGVzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwID0ge1xuICAgICAgZGVzY3JpcHRpb246IHNvdXJjZS5kZXNjcmlwdGlvbixcbiAgICAgIGNvbmZpZ3VyYWJsZTogc291cmNlLmNvbmZpZ3VyYWJsZSxcbiAgICAgIGNvbXBsZXRlOiBzb3VyY2UuY29tcGxldGUsXG4gICAgICBjb25zaXN0ZW50OiBzb3VyY2UuY29uc2lzdGVudCxcbiAgICAgIGdyb3VwVHlwZTogdGhpcy5jb252ZXJ0R3JvdXBUeXBlKHNvdXJjZS5ncm91cFR5cGUpLFxuICAgICAgbmFtZTogc291cmNlLm5hbWUsXG4gICAgICBpZDogc291cmNlLmlkLFxuICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyxcbiAgICAgIHN1Ykdyb3VwczogW10sXG4gICAgfTtcblxuICAgIHRoaXMuc2V0R3JvdXBEZXNjcmlwdGlvbihncm91cCk7XG5cbiAgICBpZiAoc291cmNlLnN1Ykdyb3Vwcykge1xuICAgICAgc291cmNlLnN1Ykdyb3Vwcy5mb3JFYWNoKChzb3VyY2VTdWJHcm91cCkgPT5cbiAgICAgICAgdGhpcy5jb252ZXJ0R3JvdXAoc291cmNlU3ViR3JvdXAsIGdyb3VwLnN1Ykdyb3VwcywgZmxhdEdyb3VwTGlzdClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkFUVFJJQlVURV9HUk9VUCB8fFxuICAgICAgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgKSB7XG4gICAgICBmbGF0R3JvdXBMaXN0LnB1c2goZ3JvdXApO1xuICAgIH1cblxuICAgIGdyb3VwTGlzdC5wdXNoKGdyb3VwKTtcbiAgfVxuXG4gIGdldEdyb3VwSWQoa2V5OiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKCdAJyArIG5hbWUsICcnKTtcbiAgfVxuXG4gIGNvbnZlcnRBdHRyaWJ1dGUoXG4gICAgc291cmNlQXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIGF0dHJpYnV0ZUxpc3Q6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBudW1iZXJPZkNvbmZsaWN0cyA9IHNvdXJjZUF0dHJpYnV0ZS5jb25mbGljdHNcbiAgICAgID8gc291cmNlQXR0cmlidXRlLmNvbmZsaWN0cy5sZW5ndGhcbiAgICAgIDogMDtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZUltYWdlczogQ29uZmlndXJhdG9yLkltYWdlW10gPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZXM6IENvbmZpZ3VyYXRvci5WYWx1ZVtdID0gW107XG5cbiAgICBpZiAoc291cmNlQXR0cmlidXRlLmltYWdlcykge1xuICAgICAgc291cmNlQXR0cmlidXRlLmltYWdlcy5mb3JFYWNoKChvY2NJbWFnZSkgPT5cbiAgICAgICAgdGhpcy5jb252ZXJ0SW1hZ2Uob2NjSW1hZ2UsIGF0dHJpYnV0ZUltYWdlcylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRSZXRyYWN0VmFsdWUoc291cmNlQXR0cmlidXRlLCBhdHRyaWJ1dGVWYWx1ZXMpO1xuXG4gICAgaWYgKHNvdXJjZUF0dHJpYnV0ZS5kb21haW5WYWx1ZXMpIHtcbiAgICAgIHNvdXJjZUF0dHJpYnV0ZS5kb21haW5WYWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+XG4gICAgICAgIHRoaXMuY29udmVydFZhbHVlKHZhbHVlLCBhdHRyaWJ1dGVWYWx1ZXMpXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB1aVR5cGUgPSB0aGlzLmNvbnZlcnRBdHRyaWJ1dGVUeXBlKHNvdXJjZUF0dHJpYnV0ZSk7XG4gICAgY29uc3QgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlID0ge1xuICAgICAgbmFtZTogc291cmNlQXR0cmlidXRlLm5hbWUsXG4gICAgICBsYWJlbDogc291cmNlQXR0cmlidXRlLmxhbmdEZXBOYW1lLFxuICAgICAgcmVxdWlyZWQ6IHNvdXJjZUF0dHJpYnV0ZS5yZXF1aXJlZCxcbiAgICAgIHVpVHlwZTogdWlUeXBlLFxuICAgICAgdWlUeXBlVmFyaWF0aW9uOiBzb3VyY2VBdHRyaWJ1dGUudHlwZSxcbiAgICAgIGdyb3VwSWQ6IHRoaXMuZ2V0R3JvdXBJZChzb3VyY2VBdHRyaWJ1dGUua2V5LCBzb3VyY2VBdHRyaWJ1dGUubmFtZSksXG4gICAgICB1c2VySW5wdXQ6XG4gICAgICAgIHVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5OVU1FUklDIHx8XG4gICAgICAgIHVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkdcbiAgICAgICAgICA/IHNvdXJjZUF0dHJpYnV0ZS5mb3JtYXR0ZWRWYWx1ZVxuICAgICAgICAgICAgPyBzb3VyY2VBdHRyaWJ1dGUuZm9ybWF0dGVkVmFsdWVcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIG1heGxlbmd0aDpcbiAgICAgICAgKHNvdXJjZUF0dHJpYnV0ZS5tYXhsZW5ndGggPz8gMCkgK1xuICAgICAgICAoc291cmNlQXR0cmlidXRlLm5lZ2F0aXZlQWxsb3dlZCA/IDEgOiAwKSxcbiAgICAgIG51bURlY2ltYWxQbGFjZXM6IHNvdXJjZUF0dHJpYnV0ZS5udW1iZXJTY2FsZSxcbiAgICAgIG5lZ2F0aXZlQWxsb3dlZDogc291cmNlQXR0cmlidXRlLm5lZ2F0aXZlQWxsb3dlZCxcbiAgICAgIG51bVRvdGFsTGVuZ3RoOiBzb3VyY2VBdHRyaWJ1dGUudHlwZUxlbmd0aCxcbiAgICAgIHNlbGVjdGVkU2luZ2xlVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGhhc0NvbmZsaWN0czogbnVtYmVyT2ZDb25mbGljdHMgPiAwLFxuICAgICAgaW1hZ2VzOiBhdHRyaWJ1dGVJbWFnZXMsXG4gICAgICB2YWx1ZXM6IGF0dHJpYnV0ZVZhbHVlcyxcbiAgICAgIGludGVydmFsSW5Eb21haW46IHNvdXJjZUF0dHJpYnV0ZS5pbnRlcnZhbEluRG9tYWluLFxuICAgICAga2V5OiBzb3VyY2VBdHRyaWJ1dGUua2V5LFxuICAgICAgdmFsaWRhdGlvblR5cGU6IHNvdXJjZUF0dHJpYnV0ZS52YWxpZGF0aW9uVHlwZSxcbiAgICAgIHZpc2libGU6IHNvdXJjZUF0dHJpYnV0ZS52aXNpYmxlLFxuICAgIH07XG5cbiAgICB0aGlzLnNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlKTtcblxuICAgIC8vSGFzIHRvIGJlIGNhbGxlZCBhZnRlciBzZXRTZWxlY3RlZFNpbmdsZVZhbHVlIGJlY2F1c2UgaXQgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuICAgIHRoaXMuY29tcGlsZUF0dHJpYnV0ZUluY29tcGxldGUoYXR0cmlidXRlKTtcbiAgICBhdHRyaWJ1dGVMaXN0LnB1c2goYXR0cmlidXRlKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZS52YWx1ZXMpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gYXR0cmlidXRlLnZhbHVlc1xuICAgICAgICAubWFwKChlbnRyeSkgPT4gZW50cnkpXG4gICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zZWxlY3RlZCk7XG4gICAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMgJiYgc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlID0gc2VsZWN0ZWRWYWx1ZXNbMF0udmFsdWVDb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpc1JldHJhY3RWYWx1ZVNlbGVjdGVkKFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogT2NjQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc291cmNlQXR0cmlidXRlLmRvbWFpblZhbHVlcyAmJlxuICAgICAgc291cmNlQXR0cmlidXRlLmRvbWFpblZhbHVlcy5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS5zZWxlY3RlZCkubGVuZ3RoXG4gICAgICA/IGZhbHNlXG4gICAgICA6IHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UmV0cmFjdFZhbHVlRGlzcGxheShcbiAgICBhdHRyaWJ1dGVUeXBlOiBDb25maWd1cmF0b3IuVWlUeXBlLFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgYXR0cmlidXRlVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTiB8fFxuICAgICAgYXR0cmlidXRlVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTlxuICAgICkge1xuICAgICAgaWYgKGF0dHJpYnV0ZVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV04gJiYgdmFsdWUuc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUuZHJvcERvd25TZWxlY3RNc2cnKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHZhbHVlLnZhbHVlRGlzcGxheSA9IHRleHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYXR0cmlidXRlLm5vT3B0aW9uU2VsZWN0ZWRNc2cnKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHZhbHVlLnZhbHVlRGlzcGxheSA9IHRleHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFzU291cmNlQXR0cmlidXRlQ29uZmxpY3RzKFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogT2NjQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc291cmNlQXR0cmlidXRlLmNvbmZsaWN0c1xuICAgICAgPyBzb3VyY2VBdHRyaWJ1dGUuY29uZmxpY3RzLmxlbmd0aCA+IDBcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNTb3VyY2VBdHRyaWJ1dGVUeXBlUmVhZE9ubHkoXG4gICAgc291cmNlQXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzb3VyY2VBdHRyaWJ1dGUudHlwZSA9PT0gT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5SRUFEX09OTFk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNSZXRyYWN0QmxvY2tlZChcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNvdXJjZUF0dHJpYnV0ZS5yZXRyYWN0QmxvY2tlZFxuICAgICAgPyBzb3VyY2VBdHRyaWJ1dGUucmV0cmFjdEJsb2NrZWRcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkUmV0cmFjdFZhbHVlKFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogT2NjQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICB2YWx1ZXM6IENvbmZpZ3VyYXRvci5WYWx1ZVtdXG4gICkge1xuICAgIGNvbnN0IGlzUmV0cmFjdEJsb2NrZWQgPSB0aGlzLmlzUmV0cmFjdEJsb2NrZWQoc291cmNlQXR0cmlidXRlKTtcbiAgICBjb25zdCBpc0NvbmZsaWN0aW5nID0gdGhpcy5oYXNTb3VyY2VBdHRyaWJ1dGVDb25mbGljdHMoc291cmNlQXR0cmlidXRlKTtcblxuICAgIGlmICghaXNSZXRyYWN0QmxvY2tlZCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnVpU2V0dGluZ3NDb25maWc/LnByb2R1Y3RDb25maWd1cmF0b3I/LmFkZFJldHJhY3RPcHRpb24gfHxcbiAgICAgICAgKHRoaXMuaXNTb3VyY2VBdHRyaWJ1dGVUeXBlUmVhZE9ubHkoc291cmNlQXR0cmlidXRlKSAmJiBpc0NvbmZsaWN0aW5nKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVR5cGUgPSB0aGlzLmNvbnZlcnRBdHRyaWJ1dGVUeXBlKHNvdXJjZUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OIHx8XG4gICAgICAgICAgYXR0cmlidXRlVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTlxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlID0ge1xuICAgICAgICAgICAgdmFsdWVDb2RlOiBDb25maWd1cmF0b3IuUmV0cmFjdFZhbHVlQ29kZSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLmlzUmV0cmFjdFZhbHVlU2VsZWN0ZWQoc291cmNlQXR0cmlidXRlKSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5zZXRSZXRyYWN0VmFsdWVEaXNwbGF5KGF0dHJpYnV0ZVR5cGUsIHZhbHVlKTtcblxuICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRWYWx1ZShcbiAgICBvY2NWYWx1ZTogT2NjQ29uZmlndXJhdG9yLlZhbHVlLFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW11cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVJbWFnZXM6IENvbmZpZ3VyYXRvci5JbWFnZVtdID0gW107XG4gICAgaWYgKG9jY1ZhbHVlLmltYWdlcykge1xuICAgICAgb2NjVmFsdWUuaW1hZ2VzLmZvckVhY2goKG9jY0ltYWdlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRJbWFnZShvY2NJbWFnZSwgdmFsdWVJbWFnZXMpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUgPSB7XG4gICAgICB2YWx1ZUNvZGU6IG9jY1ZhbHVlLmtleSxcbiAgICAgIHZhbHVlRGlzcGxheTogb2NjVmFsdWUubGFuZ0RlcE5hbWUsXG4gICAgICBuYW1lOiBvY2NWYWx1ZS5uYW1lLFxuICAgICAgc2VsZWN0ZWQ6IG9jY1ZhbHVlLnNlbGVjdGVkLFxuICAgICAgaW1hZ2VzOiB2YWx1ZUltYWdlcyxcbiAgICB9O1xuXG4gICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICB9XG5cbiAgY29udmVydEltYWdlKFxuICAgIG9jY0ltYWdlOiBPY2NDb25maWd1cmF0b3IuSW1hZ2UsXG4gICAgaW1hZ2VzOiBDb25maWd1cmF0b3IuSW1hZ2VbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBpbWFnZTogQ29uZmlndXJhdG9yLkltYWdlID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUcmFkaXRpb25hbGx5LCBpbiBhbiBvbi1wcmVtIHdvcmxkLCBtZWRpYXMgYW5kIG90aGVyIGJhY2tlbmQgcmVsYXRlZCBjYWxsc1xuICAgICAgICogYXJlIGhvc3RlZCBhdCB0aGUgc2FtZSBwbGF0Zm9ybSwgYnV0IGluIGEgY2xvdWQgc2V0dXAsIGFwcGxpY2F0aW9ucyBhcmVcbiAgICAgICAqIHR5cGljYWxseSBkaXN0cmlidXRlZCBjcm9zcyBkaWZmZXJlbnQgZW52aXJvbm1lbnRzLiBGb3IgbWVkaWEsIHdlIHVzZSB0aGVcbiAgICAgICAqIGBiYWNrZW5kLm1lZGlhLmJhc2VVcmxgIGJ5IGRlZmF1bHQsIGJ1dCBmYWxsYmFjayB0byBgYmFja2VuZC5vY2MuYmFzZVVybGBcbiAgICAgICAqIGlmIG5vbmUgcHJvdmlkZWQuXG4gICAgICAgKi9cbiAgICAgIHVybDpcbiAgICAgICAgKHRoaXMuY29uZmlnPy5iYWNrZW5kPy5tZWRpYT8uYmFzZVVybCB8fFxuICAgICAgICAgIHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LmJhc2VVcmwgfHxcbiAgICAgICAgICAnJykgKyBvY2NJbWFnZS51cmwsXG4gICAgICBhbHRUZXh0OiBvY2NJbWFnZS5hbHRUZXh0LFxuICAgICAgZ2FsbGVyeUluZGV4OiBvY2NJbWFnZS5nYWxsZXJ5SW5kZXgsXG4gICAgICB0eXBlOiB0aGlzLmNvbnZlcnRJbWFnZVR5cGUob2NjSW1hZ2UuaW1hZ2VUeXBlKSxcbiAgICAgIGZvcm1hdDogdGhpcy5jb252ZXJ0SW1hZ2VGb3JtYXRUeXBlKG9jY0ltYWdlLmZvcm1hdCksXG4gICAgfTtcbiAgICBpbWFnZXMucHVzaChpbWFnZSk7XG4gIH1cblxuICBjb252ZXJ0QXR0cmlidXRlVHlwZShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogQ29uZmlndXJhdG9yLlVpVHlwZSB7XG4gICAgbGV0IHVpVHlwZTogQ29uZmlndXJhdG9yLlVpVHlwZTtcblxuICAgIGNvbnN0IHNvdXJjZVR5cGU6IHN0cmluZyA9IHNvdXJjZUF0dHJpYnV0ZS50eXBlPy50b1N0cmluZygpID8/ICcnO1xuICAgIGNvbnN0IGNvcmVTb3VyY2VUeXBlID0gdGhpcy5kZXRlcm1pbmVDb3JlVWlUeXBlKHNvdXJjZVR5cGUpO1xuXG4gICAgc3dpdGNoIChjb3JlU291cmNlVHlwZSkge1xuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPX0JVVFRPTjoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT19CVVRUT05fQURESVRJT05BTF9JTlBVVDoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV047XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX0FERElUSU9OQUxfSU5QVVQ6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5OVU1FUklDO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5SRUFEX09OTFk6IHtcbiAgICAgICAgdWlUeXBlID1cbiAgICAgICAgICAhc291cmNlQXR0cmlidXRlLnJldHJhY3RCbG9ja2VkICYmXG4gICAgICAgICAgdGhpcy5oYXNTb3VyY2VBdHRyaWJ1dGVDb25mbGljdHMoc291cmNlQXR0cmlidXRlKVxuICAgICAgICAgICAgPyBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OXG4gICAgICAgICAgICA6IENvbmZpZ3VyYXRvci5VaVR5cGUuUkVBRF9PTkxZO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS19CT1hfTElTVDoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tfQk9YOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1g7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLlNJTkdMRV9TRUxFQ1RJT05fSU1BR0U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVpVHlwZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZXRlcm1pbmVDb3JlVWlUeXBlKHNvdXJjZVR5cGU6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4Q3VzdG9tU2VwYXJhdG9yID0gc291cmNlVHlwZS5pbmRleE9mKFxuICAgICAgQ29uZmlndXJhdG9yLkN1c3RvbVVpVHlwZUluZGljYXRvclxuICAgICk7XG4gICAgcmV0dXJuIGluZGV4Q3VzdG9tU2VwYXJhdG9yID4gMFxuICAgICAgPyBzb3VyY2VUeXBlLnN1YnN0cmluZygwLCBpbmRleEN1c3RvbVNlcGFyYXRvcilcbiAgICAgIDogc291cmNlVHlwZTtcbiAgfVxuXG4gIGNvbnZlcnRHcm91cFR5cGUoXG4gICAgZ3JvdXBUeXBlOiBPY2NDb25maWd1cmF0b3IuR3JvdXBUeXBlXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUge1xuICAgIHN3aXRjaCAoZ3JvdXBUeXBlKSB7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ1NUSUNfR1JPVVA6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkFUVFJJQlVURV9HUk9VUDtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5JTlNUQU5DRTpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuU1VCX0lURU1fR1JPVVA7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfSEVBREVSOlxuICAgICAgICByZXR1cm4gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVA7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1Q6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQO1xuICAgIH1cbiAgfVxuXG4gIHNldEdyb3VwRGVzY3JpcHRpb24oZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCk6IHZvaWQge1xuICAgIHN3aXRjaCAoZ3JvdXAuZ3JvdXBUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfSEVBREVSX0dST1VQOlxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmdyb3VwLmNvbmZsaWN0SGVhZGVyJylcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoY29uZmxpY3RIZWFkZXJUZXh0KSA9PiAoZ3JvdXAuZGVzY3JpcHRpb24gPSBjb25mbGljdEhlYWRlclRleHQpXG4gICAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVA6XG4gICAgICAgIGNvbnN0IGNvbmZsaWN0RGVzY3JpcHRpb24gPSBncm91cC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5ncm91cC5jb25mbGljdEdyb3VwJywge1xuICAgICAgICAgICAgYXR0cmlidXRlOiBncm91cC5uYW1lLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGNvbmZsaWN0R3JvdXBUZXh0KSA9PiAoZ3JvdXAuZGVzY3JpcHRpb24gPSBjb25mbGljdEdyb3VwVGV4dClcbiAgICAgICAgICApO1xuICAgICAgICBncm91cC5uYW1lID0gY29uZmxpY3REZXNjcmlwdGlvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoZ3JvdXAubmFtZSAhPT0gJ19HRU4nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuZ3JvdXAuZ2VuZXJhbCcpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChnZW5lcmFsVGV4dCkgPT4gKGdyb3VwLmRlc2NyaXB0aW9uID0gZ2VuZXJhbFRleHQpKTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0SW1hZ2VUeXBlKFxuICAgIGltYWdlVHlwZTogT2NjQ29uZmlndXJhdG9yLkltYWdlVHlwZVxuICApOiBDb25maWd1cmF0b3IuSW1hZ2VUeXBlIHtcbiAgICBzd2l0Y2ggKGltYWdlVHlwZSkge1xuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuSW1hZ2VUeXBlLkdBTExFUlk6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuSW1hZ2VUeXBlLkdBTExFUlk7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5JbWFnZVR5cGUuUFJJTUFSWTpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5JbWFnZVR5cGUuUFJJTUFSWTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0SW1hZ2VGb3JtYXRUeXBlKFxuICAgIGZvcm1hdFR5cGU6IE9jY0NvbmZpZ3VyYXRvci5JbWFnZUZvcm1hdFR5cGVcbiAgKTogQ29uZmlndXJhdG9yLkltYWdlRm9ybWF0VHlwZSB7XG4gICAgc3dpdGNoIChmb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5JbWFnZUZvcm1hdFR5cGUuVkFMVUVfSU1BR0U6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuSW1hZ2VGb3JtYXRUeXBlLlZBTFVFX0lNQUdFO1xuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuSW1hZ2VGb3JtYXRUeXBlLkNTVElDX0lNQUdFOlxuICAgICAgICByZXR1cm4gQ29uZmlndXJhdG9yLkltYWdlRm9ybWF0VHlwZS5BVFRSSUJVVEVfSU1BR0U7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUF0dHJpYnV0ZUluY29tcGxldGUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKSB7XG4gICAgLy9EZWZhdWx0IHZhbHVlIGZvciBpbmNvbXBsZXRlIGlzIGZhbHNlXG4gICAgYXR0cmlidXRlLmluY29tcGxldGUgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYXR0cmlidXRlLnVpVHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQ6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fQURESVRJT05BTF9JTlBVVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTjoge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlIHx8XG4gICAgICAgICAgYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUgPT09IENvbmZpZ3VyYXRvci5SZXRyYWN0VmFsdWVDb2RlXG4gICAgICAgICkge1xuICAgICAgICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5TSU5HTEVfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIGlmICghYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuTlVNRVJJQzpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc6IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGUudXNlcklucHV0KSB7XG4gICAgICAgICAgYXR0cmlidXRlLmluY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICBjb25zdCBpc09uZVZhbHVlU2VsZWN0ZWQgPVxuICAgICAgICAgIGF0dHJpYnV0ZS52YWx1ZXM/LmZpbmQoKHZhbHVlKSA9PiB2YWx1ZS5zZWxlY3RlZCkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgYXR0cmlidXRlLmluY29tcGxldGUgPSAhaXNPbmVWYWx1ZVNlbGVjdGVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==