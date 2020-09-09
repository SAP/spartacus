import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './configurator-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPreviousNextButtonsComponent {
  configuration$: Observable<
    Configurator.Configuration
  > = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected configUtils: ConfiguratorStorefrontUtilsService
  ) {}

  onPrevious(configuration: Configurator.Configuration): void {
    this.configuratorGroupsService
      .getPreviousGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate'
    );
  }

  onNext(configuration: Configurator.Configuration): void {
    this.configuratorGroupsService
      .getNextGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate'
    );
  }

  isFirstGroup(owner: GenericConfigurator.Owner): Observable<boolean> {
    return this.configuratorGroupsService
      .getPreviousGroupId(owner)
      .pipe(map((group) => !group));
  }

  isLastGroup(owner: GenericConfigurator.Owner): Observable<boolean> {
    return this.configuratorGroupsService
      .getNextGroupId(owner)
      .pipe(map((group) => !group));
  }
}
