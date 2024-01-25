/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService, LogoutEvent } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { ConfiguratorExpertModeService } from '../services/configurator-expert-mode.service';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorLogoutEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected configExpertModeService: ConfiguratorExpertModeService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    this.onLogout();
  }

  protected onLogout(): void {
    this.subscription.add(
      merge(this.eventService.get(LogoutEvent)).subscribe(() => {
        this.configExpertModeService.setExpModeActive(false);
        this.configExpertModeService.setExpModeRequested(false);
        this.configuratorCommonsService.removeProductBoundConfigurations();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
