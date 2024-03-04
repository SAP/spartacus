/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  filter,
  skip,
  switchMap,
  take,
} from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Component({
  selector: 'cx-configurator-form',
  templateUrl: './configurator-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorFormComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      filter(
        (routerData) =>
          routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
      ),
      switchMap((routerData) => {
        return this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner,
          routerData.configIdTemplate
        );
      })
    );

  currentGroup$: Observable<Configurator.Group> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorGroupsService.getCurrentGroup(routerData.owner)
    )
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configExpertModeService: ConfiguratorExpertModeService,
    protected launchDialogService: LaunchDialogService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected listenForConflictResolution(): void {
    this.subscription.add(
      this.routerData$
        .pipe(
          switchMap((routerData) =>
            this.configuratorCommonsService.hasConflicts(routerData.owner)
          ),
          distinctUntilChanged(), // we are interested only in status changes
          skip(1), // we skip the very first emission to avoid the change fron undefined -> no conflicts
          filter((hasConflicts) => !hasConflicts)
        )
        .subscribe(() => this.displayConflictResolvedMessage())
    );
  }

  protected displayConflictResolvedMessage(): void {
    this.globalMessageService.add(
      { key: 'configurator.header.conflictsResolved' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  ngOnInit(): void {
    this.listenForConflictResolution();

    this.routerData$
      .pipe(
        switchMap((routerData) => {
          return this.configuratorCommonsService.getConfiguration(
            routerData.owner
          );
        }),
        take(1)
      )
      .subscribe((configuration) => {
        this.configuratorCommonsService.checkConflictSolverDialog(
          configuration.owner
        );
      });

    this.routerData$
      .pipe(
        filter((routingData) => routingData.displayRestartDialog === true),
        switchMap((routerData) => {
          return this.configuratorCommonsService.getConfiguration(
            routerData.owner
          );
        }),
        take(1),
        filter(
          (configuration) =>
            configuration.interactionState.newConfiguration === false
        ),
        delay(0) // Delay because we first want the form to react on data changes
      )
      .subscribe((configuration) => {
        this.launchDialogService.openDialogAndSubscribe(
          LAUNCH_CALLER.CONFIGURATOR_RESTART_DIALOG,
          undefined,
          { owner: configuration.owner }
        );
      });

    this.routerData$.pipe(take(1)).subscribe((routingData) => {
      //In case of resolving issues (if no conflict solver dialog is present!), check if the configuration contains conflicts,
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
        this.configExpertModeService?.setExpModeRequested(routingData.expMode);
      }
    });
  }

  /**
   * Verifies whether the navigation to a conflict group is enabled.
   * @param configuration Current configuration
   * @returns {boolean} Returns 'true' if the navigation to a conflict group is enabled, otherwise 'false'.
   */
  isNavigationToGroupEnabled(
    configuration: Configurator.Configuration
  ): boolean {
    return !configuration.immediateConflictResolution;
  }

  /**
   * Checks if conflict solver dialog is active
   * @param configuration
   * @returns Conflict solver dialog active?
   */
  isDialogActive(configuration: Configurator.Configuration): boolean {
    return configuration.interactionState.showConflictSolverDialog ?? false;
  }
}
