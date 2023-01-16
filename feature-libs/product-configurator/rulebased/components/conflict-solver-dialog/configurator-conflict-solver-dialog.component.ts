/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  LaunchDialogService,
  ICON_TYPE,
  FocusConfig,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorRouter } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-conflict-solver-dialog',
  templateUrl: './configurator-conflict-solver-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictSolverDialogComponent
  implements OnInit, OnDestroy
{
  iconTypes = ICON_TYPE;
  uiType = Configurator.UiType;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: false,
  };

  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data>;
  conflictGroup$: Observable<Configurator.Group>;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected launchDialogService: LaunchDialogService,
    protected cdr: ChangeDetectorRef
  ) {}

  init(
    conflictGroup: Observable<Configurator.Group>,
    routerData: Observable<ConfiguratorRouter.Data>
  ): void {
    this.conflictGroup$ = conflictGroup;
    this.routerData$ = routerData;
  }
  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((dialogData) => {
        this.init(dialogData.conflictGroup, dialogData.routerData);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Closes a modal with a certain reason.
   *
   * @param {any} reason - Reason
   */
  dismissModal(reason?: any): void {
    this.routerData$
      .pipe(take(1))
      .subscribe((routerData) =>
        this.configuratorCommonsService.dismissConflictSolverDialog(
          routerData.owner
        )
      );
    this.launchDialogService.closeDialog(reason);
  }
}
