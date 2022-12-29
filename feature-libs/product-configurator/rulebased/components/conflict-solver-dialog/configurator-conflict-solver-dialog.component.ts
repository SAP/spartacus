/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LaunchDialogService, ICON_TYPE } from '@spartacus/storefront';
import { LanguageService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorRouter } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../default-form/configurator-default-form.event';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-conflict-solver-dialog',
  templateUrl: './configurator-conflict-solver-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictSolverDialogComponent
  implements OnInit, OnDestroy
{
  iconTypes = ICON_TYPE;
  activeLanguage$: Observable<string> = this.languageService.getActive();
  uiType = Configurator.UiType;

  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data>;
  conflictGroups$: Observable<Configurator.Group[]>;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected launchDialogService: LaunchDialogService,
    protected languageService: LanguageService
  ) {}

  init(
    conflictGroups: Observable<Configurator.Group[]>,
    routerData: Observable<ConfiguratorRouter.Data>
  ): void {
    this.conflictGroups$ = conflictGroups;
    this.routerData$ = routerData;
  }

  /**
   * Updates a configuration, specified by the configuration form update event
   * that contains information about a configuration owner key, a changed attribute and an update type.
   *
   * @param {ConfigFormUpdateEvent} event - ConfigFormUpdateEvent
   */
  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((dialogData) => {
        this.init(dialogData.conflictGroups, dialogData.routerData);
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
    this.launchDialogService.closeDialog(reason);
  }
}
