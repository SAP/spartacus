import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsMerchandisingCarouselComponent, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/index';
import { MerchandisingCarouselService } from './merchandising-carousel.service';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingCarouselComponent {
  title$: Observable<string> = this.component.data$.pipe(
    map(data => data.title)
  );

  size$: Observable<string> = this.component.data$.pipe(
    map(data => data.numberToDisplay)
  );

  backgroundColor$: Observable<string> = this.component.data$.pipe(
    map(data => data.backgroundColour)
  );

  textColor$: Observable<string> = this.component.data$.pipe(
    map(data => data.textColour)
  );

  items$: Observable<Product[]> = this.component.data$.pipe(
    map(data => data.strategy),
    switchMap(strategy => {
      return this.merchService.load(strategy);
    })
  );

  constructor(
    protected component: CmsComponentData<CmsMerchandisingCarouselComponent>,
    protected merchService: MerchandisingCarouselService
  ) {}
}
