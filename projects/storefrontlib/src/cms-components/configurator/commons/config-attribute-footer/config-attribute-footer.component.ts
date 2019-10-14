import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';

@Component({
  selector: 'cx-config-attribute-footer',
  templateUrl: './config-attribute-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeFooterComponent {
  constructor() {}
  iconTypes = ICON_TYPE;

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
}
