import { Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
})
export class ConfigAttributeHeaderComponent {
  constructor(private uiKeyGen: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;

  public showRequiredMessage(): boolean {
    return this.attribute.required && this.attribute.incomplete;
  }
  public getRequiredMessageKey(): string {
    let msgKey = 'attribute.';
    const uiType = this.attribute.uiType;
    if (
      uiType === Configurator.UiType.RADIOBUTTON ||
      uiType === Configurator.UiType.DROPDOWN
    ) {
      msgKey += 'singleSelectRequiredMessage';
    } else if (uiType === Configurator.UiType.CHECKBOX) {
      msgKey += 'multiSelectRequiredMessage';
    } else {
      msgKey += 'defaultRequiredMessage';
    }
    return msgKey;
  }

  public get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
