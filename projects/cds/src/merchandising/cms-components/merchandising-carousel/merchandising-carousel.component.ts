import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
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
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected el: ElementRef
  ) {}

  private componentData$: Observable<
    CmsMerchandisingCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  backgroundColor$: Observable<string> = this.componentData$.pipe(
    map(data => data.backgroundColour)
  );

  textColor$: Observable<string> = this.componentData$.pipe(
    map(data => data.textColour)
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

  setBackgroundColor(color: string): void {
    this.el.nativeElement.style.setProperty(
      '--cx-merchandising-carousel-background-color',
      color
    );
  }

  setTextColor(color: string): void {
    this.el.nativeElement.style.setProperty(
      '--cx-merchandising-carousel-color-text',
      color
    );
  }
}
