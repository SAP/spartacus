/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService, RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogLauncherService
  implements OnDestroy
{
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroups$: Observable<Configurator.Group[] | undefined> =
    this.routerData$.pipe(
      switchMap((routerData) => {
        return this.configuratorGroupsService.getConflictGroupsForImmediateConflictResolution(
          routerData.owner
        );
      })
    );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected eventService: EventService,
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.controlDialog();
  }

  protected controlDialog() {
    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        if (conflictGroups && conflictGroups?.length > 0) {
          this.openModal();
        } else {
          this.closeModal('CLOSE_NO_CONFLICTS_EXIST');
        }
      })
    );
  }

  protected openModal(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFLICT_SOLVER,
      undefined,
      {
        conflictGroups: this.conflictGroups$,
        routerData: this.routerData$,
      }
    );
  }

  protected closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
