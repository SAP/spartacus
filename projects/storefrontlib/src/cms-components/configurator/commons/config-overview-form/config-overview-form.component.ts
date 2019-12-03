import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-overview-form',
  templateUrl: './config-overview-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigOverviewFormComponent implements OnInit {
  configurationOverview$: Observable<Configurator.ConfigurationOverview>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.configurationOverview$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.rootProduct),
      switchMap(product =>
        this.configuratorCommonsService.getOrCreateConfiguration(product)
      )
    );
  }

  hasAttributes(): Observable<boolean> {
    return this.configurationOverview$.pipe(
      map(configuration => {
        // We use FOR loop instead of the forEach method, because we want to quit the
        // method as soon as we found one group which contains an attribute
        for (let g = 0; g < configuration.groups.length; g++) {
          if (configuration.groups[g].attributes.length > 0) {
            return true;
          }
        }
        return false;
      })
    );
  }
}
