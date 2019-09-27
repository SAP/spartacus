import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  constructor(private uiKeyGen: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;

  showRequiredMessage(): boolean {
    return this.attribute.required && this.attribute.incomplete;
  }
  getRequiredMessageKey(): string {
    let msgKey = 'configurator.attribute.';
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

  get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
