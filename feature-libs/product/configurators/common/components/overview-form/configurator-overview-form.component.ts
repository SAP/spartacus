import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorRouterExtractorService } from './../service/configurator-router-extractor.service';

@Component({
  selector: 'cx-configurator-overview-form',
  templateUrl: './configurator-overview-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewFormComponent {
  configuration$: Observable<
    Configurator.Configuration
  > = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner)
    ),
    distinctUntilKeyChanged('configId'),
    switchMap((configuration) =>
      this.configuratorCommonsService.getConfigurationWithOverview(
        configuration
      )
    ),
    filter((configuration) => configuration.overview != null)
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {
    //In case the 'forceReload' is set (means the page is launched from the checkout in display only mode),
    //we need to initialise the cart configuration
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(take(1))
      .subscribe((routingData) => {
        if (routingData.forceReload) {
          this.configuratorCommonsService.removeConfiguration(
            routingData.owner
          );
        }
      });
  }

  /**
   * Does the configuration contain any selected attribute values?
   * @param configuration Current configuration
   * @returns Any attributes available
   */
  hasAttributes(configuration: Configurator.Configuration): boolean {
    if (!(configuration?.overview?.groups?.length > 0)) {
      return false;
    }
    return (
      configuration.overview.groups.find(
        (group) => group.attributes?.length > 0
      ) !== undefined
    );
  }
}
