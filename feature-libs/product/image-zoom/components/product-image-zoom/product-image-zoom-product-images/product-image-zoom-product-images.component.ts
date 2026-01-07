/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureDirective, Product, TranslatePipe } from '@spartacus/core';
import {
  CarouselComponent,
  CarouselScrollingComponent,
  CurrentProductService,
  FocusableCarouselItemDirective,
  LcpContextDirective,
  MediaComponent,
  ProductImagesComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductImageZoomTriggerComponent } from '../product-image-zoom-trigger/product-image-zoom-trigger.component';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-image-zoom-product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    LcpContextDirective,
    MediaComponent,
    ProductImageZoomTriggerComponent,
    FeatureDirective,
    CarouselScrollingComponent,
    CarouselComponent,
    FocusableCarouselItemDirective,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ProductImageZoomProductImagesComponent extends ProductImagesComponent {
  expandImage = new BehaviorSubject(false);
  selectedIndex: number | undefined;

  product$: Observable<Product> = this.product$;

  constructor(protected currentProductService: CurrentProductService) {
    super(currentProductService);
  }

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
    this.selectedIndex = this.mainMediaContainer.value?.zoom?.galleryIndex;
  }

  /**
   * Opens image zoom dialog.
   */
  triggerZoom(value: boolean): void {
    this.expandImage.next(value);
  }
}
