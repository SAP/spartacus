import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
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
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService
  ) {}

  private componentData$: Observable<
    CmsMerchandisingCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  carouselStyle$: Observable<{
    [key: string]: string;
  }> = this.componentData$.pipe(
    map(data => {
      const style = {};
      if (data.backgroundColour) {
        style['background-color'] = data.backgroundColour;
      }
      if (data.textColour) {
        style['color'] = data.textColour;
      }
      return style;
    })
  );

  carouselItemStyle$: Observable<{
    [key: string]: string;
  }> = this.componentData$.pipe(
    map(data => {
      const style = {};
      if (data.textColour) {
        style['color'] = data.textColour;
      }
      return style;
    })
  );

  title$: Observable<string> = this.componentData$.pipe(
    map(data => data.title)
  );

  merchandisingCarouselModel$: Observable<
    MerchandisingCarouselModel
  > = this.componentData$.pipe(
    distinctUntilKeyChanged('strategy'),
    switchMap(data =>
      this.merchandisingCarouselComponentService.getMerchandisingCarouselModel(
        data
      )
    )
  );
}
