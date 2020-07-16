import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfigFormUpdateEvent } from './config-form.event';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent {
  configuration$: Observable<
    Configurator.Configuration
  > = this.configRouterExtractorService.extractRouterData().pipe(
    filter(
      (routerData) =>
        routerData.pageType === ConfigurationRouter.PageType.CONFIGURATION
    ),
    switchMap((routerData) => {
      return this.configuratorCommonsService.getOrCreateConfiguration(
        routerData.owner
      );
    })
  );
  currentGroup$: Observable<
    Configurator.Group
  > = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService.getCurrentGroup(routerData.owner)
      )
    );

  UiType = Configurator.UiType;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    const owner: GenericConfigurator.Owner = { key: event.productCode };

    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );

    // Wait until update is done until setting the group status
    this.configuratorCommonsService
      .isConfigurationLoading(owner)
      .pipe(
        filter((isLoading) => !isLoading.valueOf()),
        take(1)
      )
      .subscribe(() =>
        this.configuratorGroupsService.setGroupStatus(
          owner,
          event.groupId,
          false
        )
      );
  }
}
