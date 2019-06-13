import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CarouselItem } from 'projects/storefrontlib/src/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImagesComponent {
  mainMediaContainer = new BehaviorSubject(null);

  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(
    filter(Boolean),
    tap((p: Product) =>
      this.mainMediaContainer.next(p.images ? p.images.PRIMARY : null)
    )
  );

  thumbs$: Observable<CarouselItem[]> = this.product$.pipe(
    map(product => this.createCarouselItems(product))
  );

  constructor(private currentProductService: CurrentProductService) {}

  openImage(item: CarouselItem): void {
    this.mainMediaContainer.next(item.media.container);
  }

  /** find the index of the main media in the list of media */
  getActive(thumbs): Observable<number> {
    return this.mainMediaContainer.pipe(
      map(container => {
        const current = thumbs.find(
          t =>
            t.media &&
            t.media.container &&
            t.media.container.zoom &&
            t.media.container.zoom.url === container.zoom.url
        );
        return thumbs.indexOf(current);
      })
    );
  }

  mainMediaIsLoaded(): void {}

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
