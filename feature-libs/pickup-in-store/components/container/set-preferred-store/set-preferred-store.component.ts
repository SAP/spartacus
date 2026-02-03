/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TranslatePipe } from '@spartacus/core';
import {
  PointOfServiceNames,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import {
  ICON_TYPE,
  IconComponent,
  OutletContextData,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-set-preferred-store',
  templateUrl: './set-preferred-store.component.html',
  imports: [NgIf, NgClass, IconComponent, AsyncPipe, TranslatePipe],
})
export class SetPreferredStoreComponent implements OnInit, OnDestroy {
  readonly ICON_TYPE = ICON_TYPE;
  @Input() pointOfServiceName: PointOfServiceNames;

  public storeSelected$: Observable<PointOfServiceNames | null> =
    this.preferredStoreFacade.getPreferredStore$();
  subscription: Subscription = new Subscription();

  constructor(
    protected preferredStoreFacade: PreferredStoreFacade,
    @Optional() protected outlet: OutletContextData<PointOfServiceNames>
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.outlet?.context$.subscribe(
        (pointOfServiceNames) => (this.pointOfServiceName = pointOfServiceNames)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setAsPreferred(): boolean {
    this.preferredStoreFacade.setPreferredStore(this.pointOfServiceName);
    return false;
  }

  getSetStoreButtonLabel(storeName: string): string {
    return this.pointOfServiceName.name === storeName
      ? 'setPreferredStore.myStore'
      : 'setPreferredStore.makeThisMyStore';
  }
}
