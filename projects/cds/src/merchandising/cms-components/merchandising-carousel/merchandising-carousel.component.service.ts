import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingProduct,
  MerchandisingProducts,
} from '../../model/merchandising-products.model';
import { MerchandisingCarouselModel } from './merchandising-carousel.model';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselComponentService {
  constructor(
    protected cdsMerchandisingProductService: CdsMerchandisingProductService
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
      map(([componentData, merchandisingProducts]) => {
        const metadata = this.getCarouselMetadata(
          merchandisingProducts,
          componentData
        );
        const items$ = this.mapMerchandisingProductsToCarouselItems(
          merchandisingProducts
        );
        return {
          items$,
          metadata,
        };
      })
    );
  }

  private getCarouselMetadata(
    merchandisingProducts: MerchandisingProducts,
    componentData: CmsMerchandisingCarouselComponent
  ): Map<string, string> {
    const metadata = new Map<string, string>();

    if (merchandisingProducts.metadata) {
      merchandisingProducts.metadata.forEach((value, name) =>
        metadata.set(name, value)
      );
    }

    if (
      merchandisingProducts.products &&
      merchandisingProducts.products.length
    ) {
      metadata.set('slots', merchandisingProducts.products.length.toString());
    }

    metadata.set('title', componentData.title);
    metadata.set('name', componentData.name);
    metadata.set('strategyid', componentData.strategy);
    metadata.set('id', componentData.uid);

    return metadata;
  }

  private mapMerchandisingProductsToCarouselItems(
    merchandisingProducts: MerchandisingProducts
  ): Observable<MerchandisingProduct>[] {
    return merchandisingProducts && merchandisingProducts.products
      ? merchandisingProducts.products.map((product, index) => {
          product.metadata = this.getCarouselItemMetadata(product, index + 1);
          return of(product);
        })
      : [EMPTY];
  }

  private getCarouselItemMetadata(
    merchandisingProduct: MerchandisingProduct,
    index: number
  ): Map<string, string> {
    const metadata = new Map<string, string>();

    if (merchandisingProduct.metadata) {
      merchandisingProduct.metadata.forEach((value, name) =>
        metadata.set(name, value)
      );
    }

    metadata.set('slot', index.toString());
    metadata.set('id', merchandisingProduct.code);

    return metadata;
  }
}
