/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CurrentProductService,
  ProductImagesComponent,
} from '@spartacus/storefront';
import { Product } from '@spartacus/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LcpContextDirective } from '../../../../../../projects/storefrontlib/shared/lcp-context/lcp-context.directive';
import { MediaComponent } from '../../../../../../projects/storefrontlib/shared/components/media/media.component';
import { ProductImageZoomTriggerComponent } from '../product-image-zoom-trigger/product-image-zoom-trigger.component';
import { FeatureDirective } from '../../../../../../projects/core/src/features-config/directives/feature.directive';
import { CarouselScrollingComponent } from '../../../../../../projects/storefrontlib/shared/components/carousel-scrolling/carousel-scrolling.component';
import { CarouselComponent } from '../../../../../../projects/storefrontlib/shared/components/carousel/carousel.component';
import { FocusableCarouselItemDirective } from '../../../../../../projects/storefrontlib/shared/components/carousel/focusable-carousel-item/focusable-carousel-item.directive';
import { TranslatePipe } from '../../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
    MockTranslatePipe,
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
