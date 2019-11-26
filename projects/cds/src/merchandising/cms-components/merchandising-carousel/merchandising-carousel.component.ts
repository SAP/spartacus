import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import { MerchandisingProducts } from '../../model';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingCarouselComponent {
  constructor(
    protected componentData: CmsComponentData<
      CmsMerchandisingCarouselComponent
    >,
    protected cdsMerchandisingProductService: CdsMerchandisingProductService
  ) {}

  private componentData$: Observable<
    CmsMerchandisingCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  title$: Observable<string> = this.componentData$.pipe(
    map(data => data.title)
  );

  merchandisingProducts$: Observable<
    MerchandisingProducts
  > = this.componentData$.pipe(
    distinctUntilKeyChanged('strategy'),
    switchMap(data =>
      this.cdsMerchandisingProductService
        .loadProductsForStrategy(data.strategy, data.numberToDisplay)
        .pipe(
          map(merchandsingProducts => {
            merchandsingProducts.metadata.set('title', data.title);
            merchandsingProducts.metadata.set('name', data.name);
            if (
              merchandsingProducts.products &&
              merchandsingProducts.products.length
            ) {
              merchandsingProducts.metadata.set(
                'slots',
                merchandsingProducts.products.length.toString()
              );
            }

            return merchandsingProducts;
          })
        )
    )
  );

  getMetdata(
    merchandisingProducts: MerchandisingProducts
  ): Map<string, string> {
    return merchandisingProducts ? merchandisingProducts.metadata : undefined;
  }

  getProducts(
    merchandisingProducts: MerchandisingProducts
  ): Observable<Product>[] {
    return merchandisingProducts && merchandisingProducts.products
      ? merchandisingProducts.products.map(product => of(product))
      : [EMPTY];
  }
}
