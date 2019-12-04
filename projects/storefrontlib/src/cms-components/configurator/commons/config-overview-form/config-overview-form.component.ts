import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../service/config-router-extractor.service';

@Component({
  selector: 'cx-config-overview-form',
  templateUrl: './config-overview-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigOverviewFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        mergeMap(owner =>
          this.configuratorCommonsService.getOrCreateConfiguration(owner)
        ),
        take(1),
        mergeMap(configuration =>
          this.configuratorCommonsService.getConfigurationOverview(
            configuration
          )
        )
      );
  }

  hasAttributes(configuration: Configurator.Configuration): boolean {
    if (
      configuration.overview === undefined ||
      configuration.overview === null
    ) {
      return false;
    }

    for (let g = 0; g < configuration.overview.groups.length; g++) {
      if (configuration.overview.groups[g].characteristicValues.length > 0) {
        return true;
      }
    }
    return false;
  }
}
