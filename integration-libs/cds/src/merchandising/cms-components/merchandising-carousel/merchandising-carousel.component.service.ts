/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  take,
  tap,
  toArray,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models';
import { CdsConfig } from '../../../config';
import { ProfileTagEventService } from '../../../profiletag';
import { CdsMerchandisingProductService } from '../../facade';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProduct,
   StrategyResponseV2,
} from '../../model';
import {
  CarouselEvent,
  MerchandisingCarouselClickedEvent,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewedEvent,
} from './model';
import { StrategyRequest } from '../../../cds-models';

const DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD = 80;

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselComponentService {
  protected readonly PRODUCT_SCOPE = 'details';

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
    return this.cdsMerchandisingProductService.buildStrategyQuery().pipe(
      mergeMap((query) => {
        query.queryParams.pageSize = 2 * cmsComponent.numberToDisplay;
        query.queryParams.pageNumber = 1;
        return this.cdsMerchandisingProductService
          .loadProducts(cmsComponent.strategy, query)
          .pipe(
            map((response) => {
              const count = cmsComponent.numberToDisplay | 10;

              const items$ = this.getProductsForCarousel(response, count);

              //FIXME how to build metedata properly
              // const metadata = this.getCarouselMetadata(
              //   strategy.products,
              //   cmsComponent
              // );

              //FIXME how to set productIds properly
              // const productIds = this.mapStrategyProductsToProductIds(
              //   response.products
              // );

              const id = this.getMerchandisingCarouselModelId(
                cmsComponent,
                query
              );

              return {
                id,
                items$,
                productIds: [],
                metadata: response.metadata,
                title: cmsComponent.title,
                backgroundColor: cmsComponent.backgroundColour,
                textColor: cmsComponent.textColour,
              };
            })
          );
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
        this.profileTagEventService.notifyProfileTagOfEventOccurence(
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

    this.profileTagEventService.notifyProfileTagOfEventOccurence(
      new MerchandisingCarouselClickedEvent(
        carouselEvent,
        clickedProduct.metadata.slot,
        clickedProduct.code,
        clickedProduct.images?.PRIMARY['product']?.url
      )
    );
  }

  private getProductsForCarousel(
    response: StrategyResponseV2,
    count: number
  ): Observable<Observable<MerchandisingProduct>[]>
  {
    return response.products.pipe(
      mergeMap((prod, index) => this.mapProduct(prod, index)),
      filter( product => this.filterProduct(product, response)),
      take(count),
      toArray(),
      map((array) => array
          .sort((a, b) => a.metadata.slot - b.metadata.slot)
          .map((element) => of(element))
      )
    );
  }

  private mapProduct(
    strategyProduct: StrategyProduct,
    index: number
  ): Observable<MerchandisingProduct> {
    return this.productService.get(strategyProduct.id, this.PRODUCT_SCOPE).pipe(
      map((product) => {
        const result = {
          ...product,
          metadata: this.getCarouselItemMetadata(strategyProduct, index + 1),
        };
        return result;
      })
    );
  }

  private filterProduct(product: MerchandisingProduct, response: StrategyResponseV2): boolean
  {
    let result = true;
    if (response.metadata['filterOutOfStockProducts']) {
      result = product.stock?.stockLevel > 0;
    }
    if (!product.code) {
      result = false;
    }
    return result;
  }

  // private getCarouselMetadata(
  //   strategyProducts: StrategyProducts,
  //   componentData: CmsMerchandisingCarouselComponent
  // ): MerchandisingMetadata {
  //   const metadata: MerchandisingMetadata = strategyProducts.metadata ?? {};
  //   if (strategyProducts.products && strategyProducts.products.length) {
  //     metadata.slots = strategyProducts.products.length;
  //   }
  //
  //   metadata.title = componentData.title;
  //   metadata.name = componentData.name;
  //   metadata.strategyid = componentData.strategy;
  //   metadata.id = componentData.uid;
  //
  //   return metadata;
  // }
  //
  // private mapStrategyProductsToProductIds(
  //   strategyProducts: StrategyProducts
  // ): string[] {
  //   return strategyProducts && strategyProducts.products
  //     ? strategyProducts.products.map((strategyProduct) => strategyProduct.id)
  //     : [];
  // }

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
