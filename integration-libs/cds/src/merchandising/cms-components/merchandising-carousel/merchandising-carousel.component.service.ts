/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ProductService, ProductScope } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  CmsMerchandisingCarouselComponent,
  StrategyRequest,
} from '../../../cds-models';
import { CdsConfig } from '../../../config';
import { ProfileTagEventService } from '../../../profiletag';
import { CdsMerchandisingProductService } from '../../facade';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProduct,
  StrategyProducts,
} from '../../model';
import {
  CarouselEvent,
  MerchandisingCarouselClickedEvent,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewedEvent,
} from './model';

const DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD = 80;

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselComponentService {
  constructor(
    protected cdsMerchandisingProductService: CdsMerchandisingProductService,
    protected productService: ProductService,
    protected profileTagEventService: ProfileTagEventService,
    protected cdsConfig: CdsConfig
  ) {}

  getMerchandisingCaourselViewportThreshold(
    cmsComponent: CmsMerchandisingCarouselComponent
  ): number {
    const viewportPercentage =
      cmsComponent.viewportPercentage ??
      this.cdsConfig?.cds?.merchandising?.defaultCarouselViewportThreshold ??
      DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD;

    return viewportPercentage / 100;
  }

  getMerchandisingCarouselModel(
    cmsComponent: CmsMerchandisingCarouselComponent
  ): Observable<MerchandisingCarouselModel> {
    return this.cdsMerchandisingProductService
      .loadProductsForStrategy(
        cmsComponent.strategy,
        cmsComponent.numberToDisplay
      )
      .pipe(
        map((strategy) => {
          const metadata = this.getCarouselMetadata(
            strategy.products,
            cmsComponent
          );
          const items$ = this.mapStrategyProductsToCarouselItems(
            strategy.products
          );
          const productIds = this.mapStrategyProductsToProductIds(
            strategy.products
          );
          const id = this.getMerchandisingCarouselModelId(
            cmsComponent,
            strategy.request
          );

          return {
            id,
            items$,
            productIds,
            metadata,
            title: cmsComponent.title,
            backgroundColor: cmsComponent.backgroundColour,
            textColor: cmsComponent.textColour,
          };
        })
      );
  }

  sendCarouselViewEvent(
    lastSendModelId: string,
    merchandisingCarouselModel$: Observable<MerchandisingCarouselModel>
  ): Observable<MerchandisingCarouselModel> {
    return merchandisingCarouselModel$.pipe(
      filter((model) => model.id !== lastSendModelId),
      tap((merchandisingCarouselModel) => {
        const carouselEvent: CarouselEvent =
          this.getCarouselEventFromCarouselModel(merchandisingCarouselModel);
        this.profileTagEventService.notifyProfileTagOfEventOccurrence(
          new MerchandisingCarouselViewedEvent(
            carouselEvent,
            merchandisingCarouselModel.productIds
          )
        );
      })
    );
  }

  sendCarouselItemClickedEvent(
    merchandisingCarouselModel: MerchandisingCarouselModel,
    clickedProduct: MerchandisingProduct
  ): void {
    const carouselEvent: CarouselEvent = this.getCarouselEventFromCarouselModel(
      merchandisingCarouselModel
    );

    carouselEvent.metadata = {
      ...carouselEvent.metadata,
      ...clickedProduct.metadata,
    };

    this.profileTagEventService.notifyProfileTagOfEventOccurrence(
      new MerchandisingCarouselClickedEvent(
        carouselEvent,
        clickedProduct.metadata.slot,
        clickedProduct.code,
        clickedProduct.images?.PRIMARY['product']?.url
      )
    );
  }

  private getCarouselMetadata(
    strategyProducts: StrategyProducts,
    componentData: CmsMerchandisingCarouselComponent
  ): MerchandisingMetadata {
    const metadata: MerchandisingMetadata = strategyProducts.metadata ?? {};
    if (strategyProducts.products && strategyProducts.products.length) {
      metadata.slots = strategyProducts.products.length;
    }

    metadata.title = componentData.title;
    metadata.name = componentData.name;
    metadata.strategyid = componentData.strategy;
    metadata.id = componentData.uid;

    return metadata;
  }

  private mapStrategyProductsToCarouselItems(
    strategyProducts: StrategyProducts
  ): Observable<MerchandisingProduct>[] {
    return strategyProducts && strategyProducts.products
      ? strategyProducts.products.map((strategyProduct, index) =>
          this.productService
            .get(strategyProduct.id, [ProductScope.DETAILS, ProductScope.PRICE])
            .pipe(
              map((product) => ({
                ...product,
                metadata: this.getCarouselItemMetadata(
                  strategyProduct,
                  index + 1
                ),
              }))
            )
        )
      : [EMPTY];
  }

  private mapStrategyProductsToProductIds(
    strategyProducts: StrategyProducts
  ): string[] {
    return strategyProducts && strategyProducts.products
      ? strategyProducts.products.map((strategyProduct) => strategyProduct.id)
      : [];
  }

  private getMerchandisingCarouselModelId(
    cmsComponent: CmsMerchandisingCarouselComponent,
    request: StrategyRequest
  ): string {
    return (
      cmsComponent.uid +
      '_' +
      cmsComponent.strategy +
      '_' +
      JSON.stringify(request.queryParams)
    );
  }

  private getCarouselItemMetadata(
    strategyProduct: StrategyProduct,
    index: number
  ): MerchandisingMetadata {
    const metadata: MerchandisingMetadata = strategyProduct.metadata ?? {};

    metadata.slot = index;
    metadata.id = strategyProduct.id;

    return metadata;
  }

  private getCarouselEventFromCarouselModel(
    carouselModel: MerchandisingCarouselModel
  ): CarouselEvent {
    return {
      carouselId: carouselModel.metadata.id,
      carouselName: carouselModel.metadata.name,
      strategyId: carouselModel.metadata.strategyid,
      metadata: carouselModel.metadata,
    };
  }
}
