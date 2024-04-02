/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductService, TranslationService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-variant-carousel',
  templateUrl: './configurator-variant-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorVariantCarouselComponent {
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

  constructor(
    protected productService: ProductService,
    protected translationService: TranslationService,
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}
}
