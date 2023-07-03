/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';
import { LanguageService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from './configurator-form.event';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Component({
  selector: 'cx-configurator-form',
  templateUrl: './configurator-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorFormComponent implements OnInit {
  protected subscriptions = new Subscription();

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

  //TODO(CXSPA-1014): make ConfiguratorExpertModeService a required dependency
  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    languageService: LanguageService,
    configUtils: ConfiguratorStorefrontUtilsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configExpertModeService: ConfiguratorExpertModeService
  );

  /**
   * @deprecated since 5.1
   */
  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    languageService: LanguageService,
    configUtils: ConfiguratorStorefrontUtilsService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected languageService: LanguageService,
    protected configUtils: ConfiguratorStorefrontUtilsService,
    @Optional()
    protected configExpertModeService?: ConfiguratorExpertModeService
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
              if (hasConflicts && !routingData.skipConflicts) {
                this.configuratorGroupsService.navigateToConflictSolver(
                  routingData.owner
                );

                //Only check for Incomplete group when there are no conflicts or conflicts should be skipped
              } else {
                this.configuratorGroupsService.navigateToFirstIncompleteGroup(
                  routingData.owner
                );
              }
            });
        }
        if (routingData.expMode) {
          this.configExpertModeService?.setExpModeRequested(
            routingData.expMode
          );
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
   * Display group description box only for conflict groups with a given group name (i.e. a conflict description)
   * @param group
   * @returns true if conflict description box should be displayed
   */
  displayConflictDescription(group: Configurator.Group): boolean {
    return (
      group.groupType !== undefined &&
      this.configuratorGroupsService.isConflictGroupType(group.groupType) &&
      group.name !== ''
    );
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

  get expMode(): Observable<boolean> | undefined {
    return this.configExpertModeService?.getExpModeActive();
  }
}
