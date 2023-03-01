/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';

import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { delay, filter, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogLauncherService
  implements OnDestroy
{
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroup$: Observable<Configurator.Group | undefined> =
    this.routerData$.pipe(
      switchMap((routerData) => {
        return this.configuratorGroupsService.getConflictGroupForImmediateConflictResolution(
          routerData.owner
        );
      }),
      //Delay because we first want the form to react on data changes
      delay(0)
    );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.controlDialog();
  }

  protected controlDialog() {
    this.subscription.add(
      this.conflictGroup$
        .pipe(filter((conflictGroup) => !!conflictGroup))
        .subscribe(() => {
          this.openModal();
          this.subscribeToCloseDialog();
        })
    );
  }

  protected subscribeToCloseDialog() {
    this.subscription.add(
      this.conflictGroup$
        .pipe(first((conflictGroup) => !conflictGroup)) // stop listening, after we closed once
        .subscribe(() => this.closeModal('CLOSE_NO_CONFLICTS_EXIST'))
    );
  }

  protected openModal(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFLICT_SOLVER,
      undefined,
      {
        conflictGroup: this.conflictGroup$,
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
