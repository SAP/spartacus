import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from './configurator-form.event';

@Component({
  selector: 'cx-configurator-form',
  templateUrl: './configurator-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      filter(
        (routerData) =>
          routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
      ),
      switchMap((routerData) => {
        return this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner
        );
      })
    );
  currentGroup$: Observable<Configurator.Group> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );

  activeLanguage$: Observable<string> = this.languageService.getActive();

  uiType = Configurator.UiType;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected languageService: LanguageService,
    protected configUtils: ConfiguratorStorefrontUtilsService
  ) {}

  ngOnInit(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(take(1))
      .subscribe((routingData) => {
        //In case of resolving issues, check if the configuration contains conflicts,
        //if not, check if the configuration contains missing mandatory fields and show the group
        if (routingData.resolveIssues) {
          this.configuratorCommonsService
            .hasConflicts(routingData.owner)
            .pipe(take(1))
            .subscribe((hasConflicts) => {
              if (hasConflicts) {
                this.configuratorGroupsService.navigateToConflictSolver(
                  routingData.owner
                );

                //Only check for Incomplete group when there are no conflicts
              } else {
                this.configuratorGroupsService.navigateToFirstIncompleteGroup(
                  routingData.owner
                );
              }
            });
        }
      });
  }

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  isConflictGroupType(groupType: Configurator.GroupType): boolean {
    return this.configuratorGroupsService.isConflictGroupType(groupType);
  }

  /**
   * Generates a group ID.
   *
   * @param {string} groupId - group ID
   * @returns {string | undefined} - generated group ID
   */
  createGroupId(groupId?: string): string | undefined {
    return this.configUtils.createGroupId(groupId);
  }
}
