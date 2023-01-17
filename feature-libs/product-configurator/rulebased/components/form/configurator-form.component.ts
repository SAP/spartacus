/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
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
  conflictSolverSubscription: Subscription;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configExpertModeService: ConfiguratorExpertModeService,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routerData$
      .pipe(
        switchMap((routerData) => {
          return this.configuratorCommonsService.getConfiguration(
            routerData.owner
          );
        }),
        take(1)
      )
      .subscribe((configuration) =>
        this.configuratorCommonsService.checkConflictSolverDialog(
          configuration.owner
        )
      );

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
      this.conflictSolverSubscription = this.configuratorCommonsService
        .getConfiguration(routingData.owner)
        .pipe(
          distinctUntilChanged(
            (a, b) =>
              a.interactionState.showConflictSolverDialog ===
              b.interactionState.showConflictSolverDialog
          )
        )
        .subscribe((config) => {
          if (config.interactionState.showConflictSolverDialog) {
            if (
              config.interactionState.currentGroup?.startsWith(
                Configurator.ConflictIdPrefix
              )
            ) {
              this.configuratorGroupsService.navigateToFirstAttributeGroup(
                config
              );
            }
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.conflictSolverSubscription?.unsubscribe();
  }

  /**
   * Verifies whether the navigation to a conflict group is enabled.
   *
   * @returns {Observable<boolean>} Returns 'true' if the navigation to a conflict group is enabled, otherwise 'false'.
   */
  isNavigationToGroupEnabled(): Observable<boolean> {
    return this.configuration$.pipe(
      map((configuration) => {
        return !configuration.immediateConflictResolution;
      })
    );
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
