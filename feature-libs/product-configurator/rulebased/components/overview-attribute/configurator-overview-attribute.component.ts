import { Component, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-attribute',
  templateUrl: './configurator-overview-attribute.component.html',
})
export class ConfiguratorOverviewAttributeComponent {
  @Input() attributeOverview: Configurator.AttributeOverview;
}
