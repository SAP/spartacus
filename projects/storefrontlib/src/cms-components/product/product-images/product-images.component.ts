import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { CarouselItem } from '../../../shared/components/carousel/index';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImagesComponent {
  private mainMediaContainer = new BehaviorSubject(null);

  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(
    filter(Boolean),
    distinctUntilChanged(),
    tap((p: Product) =>
      this.mainMediaContainer.next(p.images ? p.images.PRIMARY : {})
    )
  );

  private thumbs$: Observable<CarouselItem[]> = this.product$.pipe(
    map(product => this.createCarouselItems(product))
  );

  private mainImage$ = combineLatest([
    this.product$,
    this.mainMediaContainer,
  ]).pipe(map(([_, container]) => container));

  constructor(private currentProductService: CurrentProductService) {}

  getThumbs(): Observable<CarouselItem[]> {
    return this.thumbs$;
  }

  getMain(): Observable<any> {
    return this.mainImage$;
  }

  openImage(item: CarouselItem): void {
    this.mainMediaContainer.next(item.media.container);
  }

  /** find the index of the main media in the list of media */
  getActive(thumbs: CarouselItem[]): Observable<number> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: any) => {
        const current = thumbs.find(
          t =>
            t.media &&
            container.zoom &&
            t.media.container &&
            t.media.container.zoom &&
            t.media.container.zoom.url === container.zoom.url
        );
        return thumbs.indexOf(current);
      })
    );
  }

  /**
   * Return an array of CarouselItems for the product thumbnails.
   * In case there are less then 2 thumbs, we return null.
   */
  private createCarouselItems(product: Product): CarouselItem[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      product.images.GALLERY.length < 2
    ) {
      return null;
    }

    return (<any[]>product.images.GALLERY).map(c => {
      return {
        media: {
          container: c,
          format: 'thumbnail',
        },
      };
    });
  }
}
