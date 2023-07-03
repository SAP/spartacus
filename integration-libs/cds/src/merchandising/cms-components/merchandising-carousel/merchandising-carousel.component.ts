/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { EMPTY, Observable, using } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent as model } from '../../../cds-models/cms.model';
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
    protected componentData: CmsComponentData<model>,
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected routingService: RoutingService,
    protected intersectionService: IntersectionService,
    protected el: ElementRef
  ) {
    this.lastEventModelId = '';
  }

  /**
   * returns an Observable string for the title.
   */
  title$: Observable<string | undefined> = this.componentData.data$.pipe(
    filter((data) => Boolean(data)),
    map((data) => data.title)
  );

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
    switchMap(() =>
      this.routingService.getPageContext().pipe(
        switchMap(() => this.componentData.data$),
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
                    switchMap(() => EMPTY)
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
