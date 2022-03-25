import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { Observable, of, using } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  switchMapTo,
  take,
  tap,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { MerchandisingProduct } from '../../model/index';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingCarouselComponent {
  protected lastEventModelId: string;

  constructor(
    protected componentData: CmsComponentData<CmsMerchandisingCarouselComponent>,
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected routingService: RoutingService,
    protected intersectionService: IntersectionService,
    protected el: ElementRef
  ) {
    this.lastEventModelId = '';
  }

  private fetchProducts$: Observable<MerchandisingCarouselModel> =
    this.componentData.data$.pipe(
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
      shareReplay({ bufferSize: 1, refCount: true })
    );

  private intersection$: Observable<void> = this.fetchProducts$.pipe(
    take(1),
    switchMapTo(
      this.routingService.getPageContext().pipe(
        switchMapTo(this.componentData.data$),
        map((data) =>
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
              switchMap((_) => {
                return this.merchandisingCarouselComponentService
                  .sendCarouselViewEvent(
                    this.lastEventModelId,
                    this.fetchProducts$
                  )
                  .pipe(
                    tap((model) => {
                      this.lastEventModelId = model.id;
                    }),
                    switchMapTo(of())
                  );
              })
            )
        )
      )
    )
  );

  merchandisingCarouselModel$ = using(
    () => this.intersection$.subscribe(),
    () => this.fetchProducts$
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
