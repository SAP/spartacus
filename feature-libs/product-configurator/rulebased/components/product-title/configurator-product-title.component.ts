/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  Product,
  ProductScope,
  ProductService,
  useFeatureStyles,
} from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { ConfiguratorMainAriaLabelledByDirective } from './configurator-product-title.directive';
import { IconComponent } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { MediaComponent } from '../../../../../projects/storefrontlib/shared/components/media/media.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-configurator-product-title',
  templateUrl: './configurator-product-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ConfiguratorMainAriaLabelledByDirective,
    IconComponent,
    MediaComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
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
            return this.getProductCode(container);
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

  protected getProductCode(container: {
    routerData: ConfiguratorRouter.Data;
    configuration: Configurator.Configuration;
  }): string | undefined {
    if (!!container.routerData.productCode) {
      return container.routerData.productCode;
    }
    return !!container.configuration.productCode
      ? container.configuration.productCode
      : container.configuration.overview?.productCode;
  }

  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected productService: ProductService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {
    useFeatureStyles('a11yWideScreenImprovements');
  }

  triggerDetails(): void {
    this.showMore = !this.showMore;
  }

  get expMode(): Observable<boolean> | undefined {
    return this.configExpertModeService.getExpModeActive();
  }
}
