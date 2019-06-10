import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsProductCarouselComponent } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CarouselItem } from '../../../../shared/components/carousel/carousel.model';
import { ProductCarouselService } from '../product-carousel.service';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarouselComponent {
  title$: Observable<string> = this.component.data$.pipe(
    map(data => data.title)
  );

  items$: Observable<CarouselItem[]> = this.component.data$.pipe(
    filter(Boolean),
    map(data => data.productCodes.split(' ')),
    map(codes => codes.map(code => this.service.loadProduct(code))),
    switchMap((products$: Observable<CarouselItem>[]) =>
      combineLatest(products$)
    )
  );

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    protected service: ProductCarouselService
  ) {}
}
