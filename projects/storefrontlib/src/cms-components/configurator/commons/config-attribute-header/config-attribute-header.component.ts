import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  constructor(private uiKeyGen: ConfigUIKeyGeneratorService) {}
  iconTypes = ICON_TYPE;

  @Input() attribute: Configurator.Attribute;

  showRequiredMessage(): boolean {
    return this.attribute.required && this.attribute.incomplete;
  }

  get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
