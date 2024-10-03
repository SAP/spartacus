/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
} from 'rxjs/operators';

type ConflictGroupAndRouterData = {
  conflictGroup?: Configurator.Group;
  routerData: ConfiguratorRouter.Data;
};

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogLauncherService
  implements OnDestroy
{
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroupAndRouterData$: Observable<ConflictGroupAndRouterData> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService
          .getConflictGroupForImmediateConflictResolution(routerData.owner)
          .pipe(
            map((conflictGroup) => ({
              conflictGroup: conflictGroup,
              routerData: routerData,
            }))
          )
      ),
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
      this.conflictGroupAndRouterData$
        .pipe(
          filter((data) => !!data.conflictGroup),
          // subscribeToCloseDialog triggers another emission of conflictGroup$ with the same conflict group and router data
          // so until we get a new navigation id in the router data, we ignore emissions of same conflict group
          distinctUntilChanged(
            (prev, cur) =>
              prev.conflictGroup === cur.conflictGroup &&
              prev.routerData.navigationId === cur.routerData.navigationId
          )
        )
        .subscribe(() => {
          this.openModal();
          this.subscribeToCloseDialog();
        })
    );
  }

  protected subscribeToCloseDialog() {
    this.subscription.add(
      this.conflictGroupAndRouterData$
        .pipe(first((data) => !data.conflictGroup)) // stop listening, after we closed once
        .subscribe(() => this.closeModal('CLOSE_NO_CONFLICTS_EXIST'))
    );
  }

  protected openModal(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFLICT_SOLVER,
      undefined,
      {
        conflictGroup: this.conflictGroupAndRouterData$.pipe(
          map((data) => data.conflictGroup)
        ),
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
