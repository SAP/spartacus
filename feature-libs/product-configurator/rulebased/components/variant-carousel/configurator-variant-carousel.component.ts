/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Product,
  ProductService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  CarouselComponent,
  ProductCarouselItemComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-variant-carousel',
  templateUrl: './configurator-variant-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CarouselComponent,
    ProductCarouselItemComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorVariantCarouselComponent {
  protected productService = inject(ProductService);
  protected translationService = inject(TranslationService);
  protected configuratorRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);

  configuration$: Observable<Configurator.Configuration> =
    this.configuratorRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  title$: Observable<string | undefined> = this.translationService.translate(
    'configurator.variantCarousel.title'
  );

  items$: Observable<Observable<Product | undefined>[]> =
    this.configuration$.pipe(
      map((configuration) =>
        configuration.variants ? configuration.variants : []
      ),
      map((variants) => {
        return variants.map((variant) =>
          this.productService.get(variant.productCode)
        );
      })
    );
}
