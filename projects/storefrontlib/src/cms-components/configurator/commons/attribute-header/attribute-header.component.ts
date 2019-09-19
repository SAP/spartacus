import { Component, Input } from '@angular/core';
import { Attribute, UiType } from '@spartacus/core';
import { UIKeyGeneratorService } from '../service/ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './attribute-header.component.html',
})
export class AttributeHeaderComponent {
  constructor(private uiKeyGen: UIKeyGeneratorService) {}

  @Input() currentAttribute: Attribute;

  public get attribute(): Attribute {
    return this.currentAttribute;
  }

  public showRequiredMessage(): boolean {
    return this.currentAttribute.required && this.currentAttribute.incomplete;
  }
  public getRequiredMessageKey(): string {
    let msgKey = 'attribute.';
    const uiType = this.currentAttribute.uiType;
    if (uiType === UiType.RADIOBUTTON || uiType === UiType.DDLB) {
      msgKey += 'singleSelectRequiredMessage';
    } else if (uiType === UiType.CHECKBOX) {
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
