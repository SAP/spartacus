/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { EventService, LanguageSetEvent } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorLanguageSetEventListener implements OnDestroy {
  protected subscription = new Subscription();

  protected eventService = inject(EventService);
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);

  constructor() {
    this.onLanguageSet();
  }

  protected onLanguageSet(): void {
    this.subscription.add(
      merge(this.eventService.get(LanguageSetEvent)).subscribe(() => {
        this.configuratorCommonsService.removeProductBoundConfigurations();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
