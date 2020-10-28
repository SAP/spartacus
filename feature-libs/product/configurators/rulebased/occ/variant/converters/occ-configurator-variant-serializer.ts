import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../occ-configurator.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantSerializer
  implements
    Converter<Configurator.Configuration, OccConfigurator.Configuration> {
  convert(
    source: Configurator.Configuration,
    target?: OccConfigurator.Configuration
  ): OccConfigurator.Configuration {
    const resultTarget: OccConfigurator.Configuration = {
      ...target,
      configId: source.configId,
      complete: source.complete,
      groups: [],
    };

    source.groups.forEach((group) =>
      this.convertGroup(group, resultTarget.groups)
    );

    return resultTarget;
  }

  convertGroup(source: Configurator.Group, occGroups: OccConfigurator.Group[]) {
    const group: OccConfigurator.Group = {
      name: source.name,
      id: source.id,
      configurable: source.configurable,
      groupType: this.convertGroupType(source.groupType),
      description: source.description,
      attributes: [],
      subGroups: [],
    };
    if (source.attributes) {
      source.attributes.forEach((attribute) =>
        this.convertAttribute(attribute, group.attributes)
      );
    }
    if (source.subGroups) {
      source.subGroups.forEach((subGroup) =>
        this.convertGroup(subGroup, group.subGroups)
      );
    }

    occGroups.push(group);
  }

  convertAttribute(
    attribute: Configurator.Attribute,
    occAttributes: OccConfigurator.Attribute[]
  ): void {
    const targetAttribute: OccConfigurator.Attribute = {
      name: attribute.name,
      langDepName: attribute.label,
      required: attribute.required,
      retractTriggered: attribute.retractTriggered,
      type: this.convertCharacteristicType(attribute.uiType),
    };

    if (
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.RADIOBUTTON ||
      attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE
    ) {
      targetAttribute.value = attribute.selectedSingleValue;
    } else if (attribute.uiType === Configurator.UiType.STRING) {
      targetAttribute.value = attribute.userInput;
    } else if (attribute.uiType === Configurator.UiType.NUMERIC) {
      targetAttribute.formattedValue = attribute.userInput;
    } else if (
      attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
      attribute.uiType === Configurator.UiType.CHECKBOX ||
      attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE
    ) {
      targetAttribute.domainValues = [];
      attribute.values.forEach((value) => {
        this.convertValue(value, targetAttribute.domainValues);
      });
    }

    occAttributes.push(targetAttribute);
  }

  convertValue(value: Configurator.Value, values: OccConfigurator.Value[]) {
    values.push({
      key: value.valueCode,
      langDepName: value.valueDisplay,
      name: value.name,
      selected: value.selected,
    });
  }

  convertCharacteristicType(type: Configurator.UiType): OccConfigurator.UiType {
    let uiType: OccConfigurator.UiType;
    switch (type) {
      case Configurator.UiType.RADIOBUTTON: {
        uiType = OccConfigurator.UiType.RADIO_BUTTON;
        break;
      }
      case Configurator.UiType.DROPDOWN: {
        uiType = OccConfigurator.UiType.DROPDOWN;
        break;
      }
      case Configurator.UiType.STRING: {
        uiType = OccConfigurator.UiType.STRING;
        break;
      }
      case Configurator.UiType.NUMERIC: {
        uiType = OccConfigurator.UiType.NUMERIC;
        break;
      }
      case Configurator.UiType.CHECKBOX: {
        uiType = OccConfigurator.UiType.CHECK_BOX;
        break;
      }
      case Configurator.UiType.CHECKBOXLIST: {
        uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
        break;
      }
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
        break;
      }
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        uiType = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
        break;
      }
      default: {
        uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  convertGroupType(
    groupType: Configurator.GroupType
  ): OccConfigurator.GroupType {
    switch (groupType) {
      case Configurator.GroupType.ATTRIBUTE_GROUP:
        return OccConfigurator.GroupType.CSTIC_GROUP;
      case Configurator.GroupType.SUB_ITEM_GROUP:
        return OccConfigurator.GroupType.INSTANCE;
    }
  }
}
