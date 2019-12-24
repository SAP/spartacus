import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';

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
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected el: ElementRef
  ) {}

  merchandisingCarouselModel$: Observable<
    MerchandisingCarouselModel
  > = this.componentData.data$.pipe(
    filter(data => Boolean(data)),
    distinctUntilKeyChanged('strategy'),
    switchMap(data =>
      this.merchandisingCarouselComponentService.getMerchandisingCarouselModel(
        data
      )
    ),
    tap(data => {
      if (typeof data.backgroundColor === 'string') {
        this.el.nativeElement.style.setProperty(
          '--cx-color-background',
          data.backgroundColor
        );
      }
      if (typeof data.textColor === 'string') {
        this.el.nativeElement.style.setProperty(
          '--cx-color-text',
          data.textColor
        );
      }
    })
  );
}
