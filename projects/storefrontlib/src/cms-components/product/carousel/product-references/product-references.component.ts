import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsProductReferencesComponent } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';
import { ProductCarouselService } from '../product-carousel.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent {
  title$ = this.component.data$.pipe(map(d => d.title));

  items$ = combineLatest([this.productCode$, this.component.data$]).pipe(
    switchMap(([code, data]) =>
      this.service.getProductReferences(
        code,
        data.productReferenceTypes,
        Boolean(JSON.parse(data.displayProductTitles)),
        Boolean(JSON.parse(data.displayProductPrices))
      )
    )
  );

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>,
    protected service: ProductCarouselService,
    protected current: CurrentProductService
  ) {}

  get productCode$(): Observable<string> {
    return this.current.getProduct().pipe(
      filter(Boolean),
      map(p => p.code)
    );
  }
}
