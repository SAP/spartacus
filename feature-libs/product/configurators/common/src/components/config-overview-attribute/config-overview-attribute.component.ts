import { Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-overview-attribute',
  templateUrl: './config-overview-attribute.component.html',
})
export class ConfigOverviewAttributeComponent {
  @Input() attributeOverview: Configurator.AttributeOverview;
}
