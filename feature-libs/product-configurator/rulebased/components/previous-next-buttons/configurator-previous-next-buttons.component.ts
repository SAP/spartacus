import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
  configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService
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
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
    );

    this.focusFirstAttribute();
  }

  onNext(configuration: Configurator.Configuration): void {
    this.configuratorGroupsService
      .getNextGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );

    this.configUtils.scrollToConfigurationElement(
      '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
    );

    this.focusFirstAttribute();
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

  private focusFirstAttribute(): void {
    this.configRouterExtractorService.extractRouterData().pipe(
      map((routerData) =>
        this.configuratorCommonsService
          .hasPendingChanges(routerData.owner)
          .pipe(
            map((hasPendingChanges) =>
              this.configuratorCommonsService
                .isConfigurationLoading(routerData.owner)
                .pipe(
                  map((isLoading) => {
                    if (!hasPendingChanges && !isLoading) {
                      this.configUtils.focusFirstAttribute();
                    }
                  })
                )
            )
          )
      )
    );
  }
}
