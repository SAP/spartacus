import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from './../../../../merchandising/facade/cds-merchandising-product.service';

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

  items$: Observable<Observable<Product>[]> = this.componentData$.pipe(
    map(data => data.strategy),
    distinctUntilChanged(),
    switchMap(strategyId =>
      this.cdsMerchandisingProductService.loadProductsForStrategy(strategyId)
    ),
    map(merchandisingProducts => merchandisingProducts.products),
    map(products => products.map(product => of(product)))
  );
}
