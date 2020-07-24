import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigFormUpdateEvent } from './config-form.event';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<Configurator.Group>;

  UiType = Configurator.UiType;
  GroupType = Configurator.GroupType;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
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

    this.currentGroup$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );

    this.configRouterExtractorService
      .extractRouterData()
      .pipe(take(1))
      .subscribe((routingData) => {
        //In case the 'forceReload' is set (means the page is launched from the cart),
        //we need to initialise the cart configuration
        if (routingData.forceReload) {
          this.configuratorCommonsService.removeConfiguration(
            routingData.owner
          );
        }
      });
  }

  updateConfiguration(event: ConfigFormUpdateEvent) {
    const owner: GenericConfigurator.Owner = { key: event.productCode };

    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );

    // Wait until update is triggered first, then wait until update is finished, to be sure that the configuration
    // is changed before the group status is set. This cannot be done in the effects, as we need to call the facade layer.
    this.configuratorCommonsService
      .isConfigurationLoading(owner)
      .pipe(
        filter((isLoading) => isLoading.valueOf()),
        take(1)
      )
      .subscribe(() =>
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
          )
      );
  }

  displayConflictDescription(group: Configurator.Group): boolean {
    return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
  }
}
