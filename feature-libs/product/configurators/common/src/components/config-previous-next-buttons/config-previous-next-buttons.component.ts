import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
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
    protected configRouterExtractorService: ConfigRouterExtractorService,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  onPrevious(configuration: Configurator.Configuration): void {
    this.scrollToVariantConfigurationHeader();
    this.configuratorGroupsService
      .getPreviousGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );
  }
  onNext(configuration: Configurator.Configuration): void {
    this.scrollToVariantConfigurationHeader();
    this.configuratorGroupsService
      .getNextGroupId(configuration.owner)
      .pipe(take(1))
      .subscribe((groupId) =>
        this.configuratorGroupsService.navigateToGroup(configuration, groupId)
      );
  }

  protected scrollToVariantConfigurationHeader(): void {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      const theElement = document.querySelector(
        '.VariantConfigurationTemplate'
      );
      let topOffset = 0;
      if (theElement instanceof HTMLElement) {
        topOffset = theElement.offsetTop;
      }
      window.scroll(0, topOffset);
    }
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
