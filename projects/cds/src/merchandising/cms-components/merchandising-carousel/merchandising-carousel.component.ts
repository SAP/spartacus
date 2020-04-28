import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { MerchandisingProduct } from '../../model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';

//const MERCHANDISING_CAROUSEL_DATA_CLASS_NAME = 'data-cx-merchandising-carousel';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MerchandisingCarouselComponent {
  constructor(
    protected componentData: CmsComponentData<
      CmsMerchandisingCarouselComponent
    >,
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected routingService: RoutingService,
    protected intersectionService: IntersectionService,
    protected el: ElementRef
  ) {}

  merchandisingCarouselModel$: Observable<
    MerchandisingCarouselModel
  > = this.componentData.data$.pipe(
    filter((data) => Boolean(data)),
    distinctUntilKeyChanged('strategy'),
    switchMap((data) =>
      this.merchandisingCarouselComponentService.getMerchandisingCarouselModel(
        data
      )
    ),
    tap((data) => {
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
    }),
    shareReplay({ refCount: true })
  );

  intersectionEvent$: Observable<
    [boolean, MerchandisingCarouselModel]
  > = this.routingService.getPageContext().pipe(
    switchMap((_) => this.componentData.data$),
    filter((data) => Boolean(data)),
    switchMap((data) =>
      this.merchandisingCarouselComponentService.getMerchandisingCaourselViewportThreshold(
        data
      )
    ),
    switchMap((threshold) =>
      this.intersectionService
        .isIntersected(this.el.nativeElement, {
          threshold,
        })
        .pipe(
          filter((carouselIsVisible) => carouselIsVisible),
          withLatestFrom(this.merchandisingCarouselModel$),
          tap(([_, carouselModel]) =>
            this.merchandisingCarouselComponentService.sendCarouselViewEvent(
              carouselModel
            )
          )
        )
    )
  );

  onMerchandisingCarouselItemClick(
    merchandisingCarouselModel: MerchandisingCarouselModel,
    clickedProduct: MerchandisingProduct
  ): void {
    this.merchandisingCarouselComponentService.sendCarouselItemClickedEvent(
      merchandisingCarouselModel,
      clickedProduct
    );
  }
}
