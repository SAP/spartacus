import { Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { UIKeyGeneratorService } from '../service/ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './attribute-header.component.html',
})
export class AttributeHeaderComponent {
  constructor(private uiKeyGen: UIKeyGeneratorService) {}

  @Input() currentAttribute: Configurator.Attribute;

  public get attribute(): Configurator.Attribute {
    return this.currentAttribute;
  }

  public showRequiredMessage(): boolean {
    return this.currentAttribute.required && this.currentAttribute.incomplete;
  }
  public getRequiredMessageKey(): string {
    let msgKey = 'attribute.';
    const uiType = this.currentAttribute.uiType;
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
