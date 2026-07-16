/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FeatureToggles,
  LanguageService,
  SemanticPathService,
  TranslatePipe,
} from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiniCartComponentService } from './mini-cart-component.service';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, IconComponent, AsyncPipe, TranslatePipe],
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  protected router = inject(Router);
  protected languageService = inject(LanguageService);
  protected urlService = inject(SemanticPathService);
  private featureToggles = inject(FeatureToggles);

  quantity$: Observable<number> = this.miniCartComponentService.getQuantity();

  total$: Observable<string> = this.miniCartComponentService.getTotalPrice();

  cartLink$: Observable<string | any[]> = this.featureToggles
    .fixLanguageContextLinks
    ? this.languageService
        .getActive()
        .pipe(
          map(() =>
            this.router.serializeUrl(
              this.router.createUrlTree(
                this.urlService.transform({ cxRoute: 'cart' })
              )
            )
          )
        )
    : of(this.urlService.transform({ cxRoute: 'cart' }));

  constructor(protected miniCartComponentService: MiniCartComponentService) {}
}
