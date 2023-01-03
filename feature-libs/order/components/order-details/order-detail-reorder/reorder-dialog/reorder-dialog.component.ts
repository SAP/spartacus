/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  CartModification,
} from '@spartacus/cart/base/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartValidationStatusCode } from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-reorder-dialog',
  templateUrl: './reorder-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderDialogComponent implements OnInit, OnDestroy{
  protected subscriptions = new Subscription();
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  cartModifications: CartModification[];

  loading$ = new BehaviorSubject(false);

  constructor(protected launchDialogService: LaunchDialogService) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.launchDialogService.data$.subscribe(
        (data: any) => {
          this.cartModifications = data.cartModificationList?.cartModifications;
          this.loading$.next(data.loading);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
  public get cartValidationStatusCode(): typeof CartValidationStatusCode {
    return CartValidationStatusCode; 
  }
}
