/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  skip,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-update-message',
  templateUrl: './configurator-update-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorUpdateMessageComponent implements OnInit {
  displayConflictMessage$: Observable<boolean> = new ReplaySubject<boolean>(1);
  protected routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();
  hasPendingChanges$: Observable<boolean> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.hasPendingChanges(routerData.owner)
    ),
    distinctUntilChanged() // avoid subsequent emissions of the same value from the source observable
  );

  hasResolvedConflicts$: Observable<boolean> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.hasConflicts(routerData.owner)
    ),
    distinctUntilChanged(), // avoid subsequent emissions of the same value from the source observable
    skip(1),
    filter((hasConflicts) => !hasConflicts),
    map((hasConflicts) => !hasConflicts),
    tap(() => this.displayConflictMessage())
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected config: ConfiguratorMessageConfig,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    //TODO CHHI unsubscribe properly
    this.hasResolvedConflicts$.subscribe();
  }

  displayConflictMessage(): void {
    // (this.displayConflictMessage$ as ReplaySubject<boolean>).next(true);
    // const timer2 = timer(5000);
    // timer2
    //   .pipe(
    //     tap(() =>
    //       (this.displayConflictMessage$ as ReplaySubject<boolean>).next(false)
    //     )
    //   )
    //   .subscribe();
    this.globalMessageService.add(
      { key: 'configurator.header.conflictsResolved' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      5000
    );
  }
}
