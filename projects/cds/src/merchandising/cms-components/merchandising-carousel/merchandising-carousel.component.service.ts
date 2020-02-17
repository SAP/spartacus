import { Injectable } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import { MerchandisingProduct } from '../../model/merchandising-products.model';
import {
  StrategyProduct,
  StrategyProducts,
} from '../../model/strategy-products.model';
import { MerchandisingCarouselModel } from './model/merchandising-carousel.model';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselComponentService {
  protected readonly PRODUCT_SCOPE = 'list';

  constructor(
    protected cdsMerchandisingProductService: CdsMerchandisingProductService,
    protected productService: ProductService
  ) {}

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
  ): Map<string, string> {
    const metadata = strategyProducts.metadata
      ? new Map<string, string>(Object.entries(strategyProducts.metadata))
      : new Map<string, string>();
    if (strategyProducts.products && strategyProducts.products.length) {
      metadata.set('slots', strategyProducts.products.length.toString());
    }

    metadata.set('title', componentData.title);
    metadata.set('name', componentData.name);
    metadata.set('strategyid', componentData.strategy);
    metadata.set('id', componentData.uid);

    return metadata;
  }

  private mapStrategyProductsToCarouselItems(
    strategyProducts: StrategyProducts
  ): Observable<MerchandisingProduct>[] {
    return strategyProducts && strategyProducts.products
      ? strategyProducts.products.map((strategyProduct, index) =>
          this.productService.get(strategyProduct.id, this.PRODUCT_SCOPE).pipe(
            map(product => ({
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
  ): Map<string, string> {
    const metadata = strategyProduct.metadata
      ? new Map<string, string>(Object.entries(strategyProduct.metadata))
      : new Map<string, string>();

    metadata.set('slot', index.toString());
    metadata.set('id', strategyProduct.id);

    return metadata;
  }
}
