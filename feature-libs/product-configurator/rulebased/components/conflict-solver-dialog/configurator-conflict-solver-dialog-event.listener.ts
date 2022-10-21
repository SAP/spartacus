/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogEventListener
  implements OnDestroy
{
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroups$: Observable<Configurator.Group[] | undefined> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService.getConflictGroups(routerData.owner)
      )
    );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.openConflictSolverDialog();
  }

  protected isConfiguratorRelatedRoute(semanticRoute?: string): boolean {
    return semanticRoute ? semanticRoute.includes('configure') : false;
  }

  protected openConflictSolverDialog() {
    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        if (conflictGroups && conflictGroups?.length > 0) {
          this.openModal();
        }
      })
    );

    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        if (conflictGroups && conflictGroups?.length === 0) {
          this.closeModal('CLOSE_NO_CONFLICTS_EXIST');
        }
      })
    );

    this.subscription.add(
      this.routingService.getRouterState().subscribe((routerState) => {
        if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
          this.closeModal('CLOSE_CLICK_EXIT_CANCEL_CONFIGURATION_BUTTON');
        }
      })
    );
  }

  protected openModal(): void {
    const dialogData = {
      conflictGroups: this.conflictGroups$,
      routerData: this.routerData$,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONFLICT_SOLVER,
      undefined,
      undefined,
      dialogData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  protected closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
