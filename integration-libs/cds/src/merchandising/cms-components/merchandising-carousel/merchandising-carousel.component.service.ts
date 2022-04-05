import { Injectable } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsConfig } from '../../../config/index';
import { ProfileTagEventService } from '../../../profiletag/index';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProduct,
  StrategyProducts,
} from '../../model/index';
import {
  CarouselEvent,
  MerchandisingCarouselClickedEvent,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewedEvent,
} from './model/index';

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
    return combineLatest([
      of(cmsComponent),
      this.cdsMerchandisingProductService.loadProductsForStrategy(
        cmsComponent.strategy,
        cmsComponent.numberToDisplay
      ),
    ]).pipe(
      map(([componentData, strategyProducts]) => {
        const metadata = this.getCarouselMetadata(
          strategyProducts,
          componentData
        );
        const items$ =
          this.mapStrategyProductsToCarouselItems(strategyProducts);
        const productIds =
          this.mapStrategyProductsToProductIds(strategyProducts);
        const id = this.getMerchandisingCarouselModelId(
          componentData,
          productIds
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
          this.productService.get(strategyProduct.id, this.PRODUCT_SCOPE).pipe(
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
    productsIds: string[]
  ): string {
    const products = productsIds.reduce((acc, pId) => acc + '_' + pId, '');
    return cmsComponent.uid + '_' + cmsComponent.strategy + products;
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
