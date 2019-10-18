import { Injectable } from '@angular/core';
import { ConfiguratorTextfield } from '../../../../../model/configurator-textfield.model';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

@Injectable()
export class OccConfiguratorTextfieldNormalizer
  implements
    Converter<
      OccConfiguratorTextfield.Configuration,
      ConfiguratorTextfield.Configuration
    > {
  constructor() {}

  convert(
    source: OccConfiguratorTextfield.Configuration,
    target?: ConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    target = { attributes: this.convertAttributes(source) };

    return target;
  }
  convertAttributes(
    source: OccConfiguratorTextfield.Configuration
  ): Configurator.Attribute[] {
    const attributes = [];
    source.configurationInfos.forEach(configurationInfo =>
      this.convertConfigurationInfo(configurationInfo, attributes)
    );
    return attributes;
  }
  convertConfigurationInfo(
    configurationInfo: OccConfiguratorTextfield.ConfigurationInfo,
    attributes: any[]
  ): void {
    const attribute: Configurator.Attribute = {
      name: configurationInfo.configurationLabel,
      label: configurationInfo.configurationLabel,
      userInput: configurationInfo.configurationValue,
    };
    attributes.push(attribute);
  }
}
