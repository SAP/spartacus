import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';

@Component({
  selector: 'cx-config-overview-attribute',
  templateUrl: './config-overview-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigOverviewAttributeComponent {
  @Input() attribute: Configurator.Attribute;

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}
}
