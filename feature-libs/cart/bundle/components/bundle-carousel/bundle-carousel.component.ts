/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartBundleService } from '@spartacus/cart/bundle/core';
import { Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-bundle-carousel',
  templateUrl: './bundle-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleCarouselComponent {
  @Input() product$: Observable<Product | null> =
    this.currentProductService.getProduct();

  selectedTemplate: string | undefined;

  constructor(
    protected currentProductService: CurrentProductService,
    protected routingService: RoutingService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected cartBundleService: CartBundleService
  ) {}

  startBundle(templateId: string) {
    this.product$.pipe(take(1)).subscribe((product) =>
      this.cartBundleService.startBundle({
        productCode: product?.code,
        templateId: templateId,
        quantity: 1,
      })
    );
  }

  setTemplate(templateId: string) {
    this.selectedTemplate = templateId === 'undefined' ? undefined : templateId;
  }
}
