import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { ghostConfigurationId } from '../../core/model/configurator.ghostdata';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-group-title',
  templateUrl: './configurator-group-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorGroupTitleComponent {
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  displayedGroup$: Observable<Configurator.Group> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );

  iconTypes = ICON_TYPE;
  GHOST_ID = ghostConfigurationId;

  //TODO GHOST Better method name
  isReady$: Observable<boolean> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.isGhostConfiguration(routerData.owner)
      ),
      map((isGhost) => !isGhost)
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
