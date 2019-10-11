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
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.complete = source.complete;
    target.groups = [];

    this.convertGroup(source, target.groups);

    return target;
  }

  convertGroup(
    source: Configurator.Configuration,
    occGroups: OccConfigurator.Group[]
  ) {
    // Currently only works with products CPQ_LAPTOP and WCEM_DEPENDENCY_PC
    // Once groups are supported other products will work as well
    switch (source.productCode) {
      case 'CPQ_LAPTOP': {
        this.createLaptopGroups(occGroups);
        source.attributes.forEach(attribute =>
          this.mapAttributesToLaptopGroups(attribute, occGroups)
        );
        break;
      }
      case 'WCEM_DEPENDENCY_PC': {
        this.createPCGroups(occGroups);
        source.attributes.forEach(attribute =>
          this.mapAttributesToPCGroups(attribute, occGroups)
        );
        break;
      }
    }
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
  createLaptopGroups(occGroups: OccConfigurator.Group[]) {
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

  createPCGroups(occGroups: OccConfigurator.Group[]) {
    occGroups.push({
      configurable: true,
      description: 'Monitor',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-WCEM_DEPENDENCY_PC.MONITOR',
      name: 'MONITOR',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'Accessory',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-WCEM_DEPENDENCY_PC.ACCESSORY',
      name: 'ACCESSORY',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'Multimedia',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-WCEM_DEPENDENCY_PC.MULTIMEDIA',
      name: 'MULTIMEDIA',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'System set value test extra long title',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-WCEM_DEPENDENCY_PC.SELECTABLE',
      name: 'SELECTABLE',
      cstics: [],
    });

    occGroups.push({
      configurable: true,
      description: 'Group to test static delta prices rendering',
      groupType: OccConfigurator.GroupType.CSTIC_GROUP,
      id: '1-WCEM_DEPENDENCY_PC.DELTA_PRICES',
      name: 'DELTA_PRICES',
      cstics: [],
    });
  }

  mapAttributesToLaptopGroups(
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

  mapAttributesToPCGroups(
    attribute: Configurator.Attribute,
    occGroups: OccConfigurator.Group[]
  ) {
    switch (attribute.name) {
      case 'WCEM_DP_MONITOR_MNF':
      case 'WCEM_DP_MONITOR_MODEL':
        this.convertAttribute(attribute, occGroups[0].cstics);
        break;

      case 'WCEM_DP_ACCESSORY':
      case 'WCEM_DP_EXT_DD':
        this.convertAttribute(attribute, occGroups[1].cstics);
        break;

      case 'WCEM_DP_SOUND_CARD':
      case 'WCEM_DP_WEBCAM':
        this.convertAttribute(attribute, occGroups[2].cstics);
        break;

      case 'WCEM_SIMPLE_FLAG':
      case 'WCEM_FLAG_MULTI':
      case 'WCEM_RO_REQ_INPUT':
      case 'WCEM_SET_INPUT_RO':
      case 'WCEM_SET_INPUT_REQ':
        this.convertAttribute(attribute, occGroups[3].cstics);
        break;
      case 'WCEM_DP_RADIO_BUTTON':
      case 'CPQ_HT_SPK_MODEL':
      case 'CPQ_HT_VIDEO_SOURCES':
      case 'WCEM_DP_DDLB':
      case 'WCEM_DP_CHECKBOX':
      case 'WCEM_DP_CHECKBOX_LIST':
      case 'WCEM_DP_READ_ONLY':
        this.convertAttribute(attribute, occGroups[4].cstics);
        break;
    }
  }
}
