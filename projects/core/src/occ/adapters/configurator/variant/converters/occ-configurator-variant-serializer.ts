import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantSerializer
  implements
    Converter<Configurator.Configuration, OccConfigurator.Configuration> {
  constructor() {}

  convert(
    source: Configurator.Configuration,
    target?: OccConfigurator.Configuration
  ): OccConfigurator.Configuration {
    target = {
      configId: source.configId,
      complete: source.complete,
      groups: [],
    };

    source.groups.forEach(group => this.convertGroup(group, target.groups));

    return target;
  }

  convertGroup(source: Configurator.Group, occGroups: OccConfigurator.Group[]) {
    const group: OccConfigurator.Group = {
      name: source.name,
      id: source.id,
      configurable: source.configurable,
      groupType: this.convertGroupType(source.groupType),
      description: source.description,
      cstics: [],
      subGroups: [],
    };
    if (source.attributes) {
      source.attributes.forEach(attribute =>
        this.convertAttribute(attribute, group.cstics)
      );
    }
    if (source.subGroups) {
      source.subGroups.forEach(subGroup =>
        this.convertGroup(subGroup, group.subGroups)
      );
    }

    occGroups.push(group);
  }

  convertAttribute(
    attribute: Configurator.Attribute,
    occCstics: OccConfigurator.Characteristic[]
  ): void {
    const cstic: OccConfigurator.Characteristic = {
      name: attribute.name,
      langdepname: attribute.label,
      required: attribute.required,
      type: this.convertCharacteristicType(attribute.uiType),
    };

    if (
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.RADIOBUTTON ||
      attribute.uiType === Configurator.UiType.IMAGE_SINGLE_SELECT
    ) {
      cstic.value = attribute.selectedSingleValue;
    } else if (attribute.uiType === Configurator.UiType.STRING) {
      cstic.value = attribute.userInput;
    } else if (
      attribute.uiType === Configurator.UiType.CHECKBOX ||
      attribute.uiType === Configurator.UiType.IMAGE_MULTI_SELECT
    ) {
      cstic.domainvalues = [];
      attribute.values.forEach(value => {
        this.convertValue(value, cstic.domainvalues);
      });
    }

    occCstics.push(cstic);
  }

  convertValue(value: Configurator.Value, values: OccConfigurator.Value[]) {
    values.push({
      key: value.valueCode,
      langdepname: value.valueDisplay,
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
      case Configurator.UiType.CHECKBOX: {
        uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
        break;
      }
      case Configurator.UiType.IMAGE_MULTI_SELECT: {
        uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
        break;
      }
      case Configurator.UiType.IMAGE_SINGLE_SELECT: {
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
