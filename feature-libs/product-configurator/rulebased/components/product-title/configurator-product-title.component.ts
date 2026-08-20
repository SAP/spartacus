/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import {
  FeatureToggles,
  Product,
  ProductScope,
  ProductService,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  ICON_TYPE,
  IconComponent,
  MediaComponent,
} from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorUtilsService } from '../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { ConfiguratorMainAriaLabelledByDirective } from './configurator-product-title.directive';
import { ConfiguratorTruncatePathTitleDirective } from './configurator-truncate-path-title.directive';

/**
 * View model for the product title: the heading can include the nested
 * container-product path, while details always belong to the base product.
 */
interface ConfiguratorProductTitleView {
  /**
   * Slash-separated path of the base product name and nested container
   * product names, e.g. `Camera / Zoom Lens / Filter`.
   */
  title: string;
  /**
   * Catalog data of the base product, used for the expandable details
   * (image, name, code, description).
   */
  product?: Product;
}

@Component({
  selector: 'cx-configurator-product-title',
  templateUrl: './configurator-product-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ConfiguratorMainAriaLabelledByDirective,
    ConfiguratorTruncatePathTitleDirective,
    IconComponent,
    MediaComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorProductTitleComponent {
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);
  protected featureToggles = inject(FeatureToggles);

  protected readonly SLASH_SEPARATOR = '/';

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

  /**
   * Product title view for the current configuration context. When
   * `productConfiguratorCPQContainer` is enabled, the heading (`title`)
   * includes nested container products. Details (`product`) always belong
   * to the base product.
   */
  productTitleData$: Observable<ConfiguratorProductTitleView> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService
          .getConfiguration(routerData.owner)
          .pipe(
            switchMap((configuration) =>
              this.buildProductTitleData(routerData, configuration)
            )
          )
      ),
      tap(() => {
        this.ghostStyle = false;
      })
    );

  /**
   * Catalog product used for the expandable details.
   *
   * @deprecated since 221121.17 - Use `productTitleData$` and read
   * `product` from the view instead. This observable remains for
   * backward compatibility and will be removed in a future major version.
   */
  product$: Observable<Product | undefined> = this.productTitleData$.pipe(
    map((data) => data.product)
  );

  protected getProductCode(container: {
    routerData: ConfiguratorRouter.Data;
    configuration: Configurator.Configuration;
  }): string | undefined {
    // For cart entries the productCode carried in the URL can become stale,
    // e.g. after a cart entry is deleted and the user navigates back via the
    // browser: the URL still points to the deleted product while the
    // configuration is re-read for the (now different) cart entry. The loaded
    // configuration is always read per owner and is therefore authoritative,
    // so we prefer it and fall back to the router productCode only.
    if (container.routerData.isOwnerCartEntry) {
      return (
        container.configuration.productCode ||
        container.configuration.overview?.productCode ||
        container.routerData.productCode
      );
    }
    if (container.routerData.productCode) {
      return container.routerData.productCode;
    }
    return container.configuration.productCode
      ? container.configuration.productCode
      : container.configuration.overview?.productCode;
  }

  /**
   * Builds the product-title view for the given router and configuration
   * state. Nested container products are included in the heading only when
   * `productConfiguratorCPQContainer` is enabled. Details always use the
   * base product.
   *
   * @param routerData - Router data of the current configurator page
   * @param configuration - Current configuration
   * @returns Product title view, or `EMPTY` if no heading can be resolved
   */
  protected buildProductTitleData(
    routerData: ConfiguratorRouter.Data,
    configuration: Configurator.Configuration
  ): Observable<ConfiguratorProductTitleView> {
    if (!this.featureToggles.productConfiguratorCPQContainer) {
      return this.buildBaseProductTitleData(routerData, configuration);
    }

    const nestedNames = this.getContainerRowGroupsOnPath(configuration)
      .map((group) => group.description)
      .filter((name): name is string => !!name);
    const baseProductCode = this.getProductCode({ routerData, configuration });

    if (!baseProductCode) {
      return nestedNames.length
        ? of({
            title: nestedNames.join(' ' + this.SLASH_SEPARATOR + ' '),
          })
        : EMPTY;
    }

    return this.getCatalogProduct(baseProductCode).pipe(
      switchMap((baseProduct) => {
        if (!baseProduct && nestedNames.length === 0) {
          return EMPTY;
        }
        const titleParts = [
          baseProduct ? baseProduct.name : baseProductCode,
          ...nestedNames,
        ].filter((part): part is string => !!part);
        return of({
          title: titleParts.join(' ' + this.SLASH_SEPARATOR + ' '),
          product: baseProduct,
        });
      })
    );
  }

  /**
   * Builds the product-title view from the base product only, which is the
   * behavior when `productConfiguratorCPQContainer` is disabled.
   *
   * @param routerData - Router data of the current configurator page
   * @param configuration - Current configuration
   * @returns Product title view, or `EMPTY` if no product code is available
   */
  protected buildBaseProductTitleData(
    routerData: ConfiguratorRouter.Data,
    configuration: Configurator.Configuration
  ): Observable<ConfiguratorProductTitleView> {
    const productCode = this.getProductCode({ routerData, configuration });
    if (!productCode) {
      return EMPTY;
    }
    return this.productService
      .get(productCode, ProductScope.LIST)
      .pipe(
        switchMap((product) =>
          product ? of({ title: product.name ?? '', product }) : EMPTY
        )
      );
  }

  /**
   * Collects container-row groups from the root down to the current group.
   * Nested containers (container in container) appear in outer-to-inner order.
   *
   * @param configuration - Current configuration
   * @returns Container-row groups on the path to the current group
   */
  protected getContainerRowGroupsOnPath(
    configuration: Configurator.Configuration
  ): Configurator.Group[] {
    const currentGroupId = configuration.interactionState.currentGroup;
    if (!currentGroupId || !configuration.groups?.length) {
      return [];
    }
    const groupPath: Configurator.Group[] = [];
    this.configuratorUtilsService.buildGroupPath(
      currentGroupId,
      configuration.groups,
      groupPath
    );
    return groupPath
      .slice()
      .reverse()
      .filter(
        (group) =>
          group.groupType === Configurator.GroupType.CONTAINER_ROW_GROUP
      );
  }

  /**
   * Loads catalog product data. Lookup errors resolve to `undefined` so
   * that a catalog miss such as "Product with the code 'CONF_CABIN' not
   * found!" does not fail the stream.
   *
   * @param productCode - Product code to load
   * @returns Catalog product, or `undefined` if it cannot be loaded
   */
  protected getCatalogProduct(
    productCode: string
  ): Observable<Product | undefined> {
    return this.productService
      .get(productCode, ProductScope.LIST)
      .pipe(catchError(() => of(undefined)));
  }

  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected productService: ProductService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {
    useFeatureStyles('productConfiguratorCPQContainer');
  }

  triggerDetails(): void {
    this.showMore = !this.showMore;
  }

  get expMode(): Observable<boolean> | undefined {
    return this.configExpertModeService.getExpModeActive();
  }
}
