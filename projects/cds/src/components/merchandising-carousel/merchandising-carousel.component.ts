import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselItem, CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../cms.model';
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

  items$: Observable<CarouselItem[]> = this.component.data$.pipe(
    filter(Boolean),
    map(data => data.strategy),
    switchMap(stragegy => this.service.load(stragegy))
  );

  constructor(
    protected component: CmsComponentData<CmsMerchandisingCarouselComponent>,
    protected service: MerchandisingCarouselService
  ) {}
}
