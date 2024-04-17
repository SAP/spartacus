/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-product-title',
  templateUrl: './configurator-product-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorProductTitleComponent {
  @HostBinding('class.ghost') ghostStyle = true;

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService.getConfiguration(
          routerData.owner
        );
      })
    );

  product$: Observable<Product | undefined> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuration$
        .pipe(map((configuration) => ({ routerData, configuration })))
        .pipe(
          map((container) => {
            switch (container.configuration.owner.type) {
              case CommonConfigurator.OwnerType.PRODUCT:
                return container.configuration.owner.id;
              case CommonConfigurator.OwnerType.CART_ENTRY:
                return container.routerData.productCode;
              case CommonConfigurator.OwnerType.ORDER_ENTRY:
                return container.configuration.overview?.productCode;
            }
          }),
          switchMap((productCode) =>
            productCode
              ? this.productService.get(productCode, ProductScope.LIST)
              : EMPTY
          )
        )
        .pipe(
          tap(() => {
            this.ghostStyle = false;
          })
        )
    )
  );

  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected productService: ProductService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {}

  triggerDetails(): void {
    this.showMore = !this.showMore;
  }

  get expMode(): Observable<boolean> | undefined {
    return this.configExpertModeService.getExpModeActive();
  }
}
