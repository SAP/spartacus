import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
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
    this.convertGroup(source.attributes, target.groups);

    return target;
  }

  convertGroup(
    source: Configurator.Attribute[],
    occGroups: OccConfigurator.Group[]
  ) {
    // Currently only works with product CPQ_LAPTOP
    // Once groups are supported other products will work as well
    this.createGroups(occGroups);
    source.forEach(attribute =>
      this.mapAttributesToGroups(attribute, occGroups)
    );
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

    cstic.value = attribute.selectedSingleValue;

    occCstics.push(cstic);
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
      default: {
        uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  /**
   * MOCK IMPLEMENTATION FOR GROUPS.
   * WILL BE REMOVED IN THE NEXT FEW WEEKS, ONCE GROUPS ARE SUPPORTED
   */
  createGroups(occGroups: OccConfigurator.Group[]) {
    occGroups.push({
      configurable: true,
      description: 'Core components',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-CPQ_LAPTOP.1',
      name: '1',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'Peripherals & Accessories',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-CPQ_LAPTOP.2',
      name: '2',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'Software',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-CPQ_LAPTOP.3',
      name: '3',
      cstics: [],
    });
  }

  mapAttributesToGroups(
    attribute: Configurator.Attribute,
    occGroups: OccConfigurator.Group[]
  ) {
    switch (attribute.name) {
      case 'EXP_NUMBER':
      case 'CPQ_DISPLAY':
      case 'CPQ_CPU':
      case 'CPQ_RAM':
        this.convertAttribute(attribute, occGroups[0].cstics);
        break;

      case 'CPQ_MONITOR':
      case 'CPQ_PRINTER':
        this.convertAttribute(attribute, occGroups[1].cstics);
        break;

      case 'CPQ_OS':
      case 'CPQ_SECURITY':
      case 'CPQ_SOFTWARE':
        this.convertAttribute(attribute, occGroups[2].cstics);
        break;
    }
  }
}
