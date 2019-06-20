import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsBannerCarouselComponent } from '@spartacus/core';
import { CarouselItem } from 'projects/storefrontlib/src/shared';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/index';
import { BannerCarouselService } from './banner.carousel.service';

@Component({
  selector: 'cx-banner-carousel',
  templateUrl: 'banner-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCarouselComponent {
  componentData$: Observable<
    CmsBannerCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  constructor(
    private componentData: CmsComponentData<CmsBannerCarouselComponent>,
    private bannerCarouselService: BannerCarouselService
  ) {}

  test() {
    console.log('test???');
  }

  getCarouselItems(): Observable<Observable<CarouselItem>[]> {
    return this.componentData$.pipe(
      map(data => data.banners.split(' ')),
      map(codes => this.bannerCarouselService.getCarouselItems(codes))
    );
  }

  getCarouselItemData(): Observable<CarouselItem[]> {
    return this.getCarouselItems().pipe(
      switchMap(items => combineLatest(items))
    );
  }
}
