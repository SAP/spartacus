import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-overview-attribute',
  templateUrl: './config-overview-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigOverviewAttributeComponent {
  @Input() values: Configurator.AttributeOverview;

  constructor() {}
}
