import { Injectable } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { CdsConfig } from 'projects/cds/src/config';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProduct,
  StrategyProducts,
} from '../../model';
import { MerchandisingCarouselModel } from './model/merchandising-carousel.model';

const DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD = 80;

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselComponentService {
  protected readonly PRODUCT_SCOPE = 'list';

  constructor(
    protected cdsMerchandisingProductService: CdsMerchandisingProductService,
    protected productService: ProductService,
    protected cdsConfig: CdsConfig
  ) {}

  getMerchandisingCaourselViewportThreshold(
    cmsComponent: CmsMerchandisingCarouselComponent
  ): Observable<number> {
    return of(
      cmsComponent.viewportPercentage ??
        this.cdsConfig?.cds?.merchandising?.defaultCarouselViewportThreshold ??
        DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD
    ).pipe(
      map((viewportThresholdPercentage) => viewportThresholdPercentage / 100)
    );
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
        const items$ = this.mapStrategyProductsToCarouselItems(
          strategyProducts
        );
        return {
          items$,
          metadata,
          title: cmsComponent.title,
          backgroundColor: cmsComponent.backgroundColour,
          textColor: cmsComponent.textColour,
        };
      })
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

  private getCarouselItemMetadata(
    strategyProduct: StrategyProduct,
    index: number
  ): MerchandisingMetadata {
    const metadata: MerchandisingMetadata = strategyProduct.metadata ?? {};

    metadata.slot = index;
    metadata.id = strategyProduct.id;

    return metadata;
  }
}
