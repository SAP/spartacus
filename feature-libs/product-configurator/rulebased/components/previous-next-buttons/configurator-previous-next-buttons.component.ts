import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-previous-next-buttons',
  templateUrl: './configurator-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPreviousNextButtonsComponent {
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  constructor(
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configUtils: ConfiguratorStorefrontUtilsService
  ) {}

  onPrevious(configuration: Configurator.Configuration): void {
    this.configuratorGroupsService
      .getPreviousGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) => {
        if (groupId) {
          this.configuratorGroupsService.navigateToGroup(
            configuration,
            groupId
          );
          this.focusFirstAttribute();
        }
      });

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
    );
  }

  onNext(configuration: Configurator.Configuration): void {
    this.configuratorGroupsService
      .getNextGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) => {
        if (groupId) {
          this.configuratorGroupsService.navigateToGroup(
            configuration,
            groupId
          );
          this.focusFirstAttribute();
        }
      });

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
    );
  }

  isFirstGroup(owner: CommonConfigurator.Owner): Observable<boolean> {
    return this.configuratorGroupsService
      .getPreviousGroupId(owner)
      .pipe(map((group) => !group));
  }

  isLastGroup(owner: CommonConfigurator.Owner): Observable<boolean> {
    return this.configuratorGroupsService
      .getNextGroupId(owner)
      .pipe(map((group) => !group));
  }

  protected focusFirstAttribute(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService
            .isConfigurationLoading(routerData.owner)
            .pipe(
              filter((isLoading) => isLoading),
              take(1),
              switchMap(() =>
                this.configuratorCommonsService
                  .isConfigurationLoading(routerData.owner)
                  .pipe(
                    filter((isLoading) => !isLoading),
                    take(1),
                    delay(0) //we need to consider the re-rendering of the page
                  )
              )
            )
        )
      )
      .subscribe(() => this.configUtils.focusFirstAttribute());
  }
}
