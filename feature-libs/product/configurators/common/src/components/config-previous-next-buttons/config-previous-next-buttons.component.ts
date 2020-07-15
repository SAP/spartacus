import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent {
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
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  onPrevious(configuration: Configurator.Configuration) {
    this.navigateToPreviousGroup(configuration);
  }
  onNext(configuration: Configurator.Configuration) {
    this.navigateToNextGroup(configuration);
  }

  navigateToNextGroup(configuration: Configurator.Configuration) {
    this.scrollToVariantConfigurationHeader();
    this.configuratorGroupsService
      .getNextGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );
  }

  navigateToPreviousGroup(configuration: Configurator.Configuration) {
    this.scrollToVariantConfigurationHeader();
    this.configuratorGroupsService
      .getPreviousGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );
  }

  scrollToVariantConfigurationHeader() {
    const theElement = document.querySelector('.VariantConfigurationTemplate');
    let topOffset = 0;
    if (theElement instanceof HTMLElement) {
      topOffset = theElement.offsetTop;
    }
    window.scroll(0, topOffset);
  }

  isFirstGroup(owner: GenericConfigurator.Owner): Observable<Boolean> {
    return this.configuratorGroupsService
      .getPreviousGroupId(owner)
      .pipe(map((group) => !group));
  }

  isLastGroup(owner: GenericConfigurator.Owner): Observable<Boolean> {
    return this.configuratorGroupsService
      .getNextGroupId(owner)
      .pipe(map((group) => !group));
  }
}
