import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigUIFocusService } from '../service/config-ui-focus.service';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private configuratorGroupsService: ConfiguratorGroupsService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private focusService: ConfigUIFocusService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );
  }

  onPrevious(configuration: Configurator.Configuration) {
    this.focusService.setActiveFocusedElement();
    this.navigateToPreviousGroup(configuration);
  }
  onNext(configuration: Configurator.Configuration) {
    this.focusService.setActiveFocusedElement();
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
