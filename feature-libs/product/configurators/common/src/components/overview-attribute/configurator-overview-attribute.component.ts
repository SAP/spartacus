import { Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-overview-attribute',
  templateUrl: './configurator-overview-attribute.component.html',
})
export class ConfiguratorOverviewAttributeComponent {
  @Input() attributeOverview: Configurator.AttributeOverview;
}
