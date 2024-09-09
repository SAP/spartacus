/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE, IconModule } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';
import { UrlModule, I18nModule } from '@spartacus/core';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-mini-cart',
    templateUrl: './mini-cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        IconModule,
        AsyncPipe,
        UrlModule,
        I18nModule,
    ],
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.miniCartComponentService.getQuantity();

  total$: Observable<string> = this.miniCartComponentService.getTotalPrice();

  constructor(protected miniCartComponentService: MiniCartComponentService) {}
}
