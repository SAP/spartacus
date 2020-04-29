import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
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

  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData(this.routingService)
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

    this.configRouterExtractorService
      .extractRouterData(this.routingService)
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getOrCreateUiState(routerData.owner)
        ),
        take(1)
      )
      .subscribe();

    this.currentGroup$ = this.configRouterExtractorService
      .extractRouterData(this.routingService)
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );
  }

  updateConfiguration(event: ConfigFormUpdateEvent) {
    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );
  }
}
