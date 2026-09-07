/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureDirective, TranslatePipe, UrlPipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FeatureDirective,
    RouterLink,
    IconComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.miniCartComponentService.getQuantity();

  total$: Observable<string> = this.miniCartComponentService.getTotalPrice();

  /**
   * True while the active cart has pending writes. Drives the mini-cart's
   * loading affordance.
   */
  updating$: Observable<boolean> = this.miniCartComponentService.getUpdating();

  constructor(protected miniCartComponentService: MiniCartComponentService) {}
}
