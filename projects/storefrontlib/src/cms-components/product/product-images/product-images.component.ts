import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CarouselItem } from 'projects/storefrontlib/src/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

const WAITING_CLASS = 'is-waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImagesComponent {
  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(filter(Boolean));

  private _imageContainer$ = new BehaviorSubject(null);

  imageContainer$ = combineLatest([this.product$, this._imageContainer$]).pipe(
    map(([product, container]) =>
      container
        ? container
        : product.images && product.images.PRIMARY
        ? product.images.PRIMARY
        : {}
    )
  );

  thumbs$: Observable<CarouselItem[]> = this.product$.pipe(
    map(product => this.createThumbs(product))
  );

  constructor(private currentProductService: CurrentProductService) {}

  // return null in case there are no thumbs, or there's only 1.
  private createThumbs(product: Product): CarouselItem[] {
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

  openImage(item: CarouselItem): void {
    this._imageContainer$.next(item.media.container);
  }

  /** find the index of the main media in the list of media */
  get active$(): Observable<number> {
    return combineLatest([this.thumbs$, this.imageContainer$]).pipe(
      map(([thumbs, main]: [CarouselItem[], any]) => {
        const current = thumbs.find(
          (thumb: CarouselItem) =>
            thumb.media.container.zoom.url === main.zoom.url
        );
        return thumbs.indexOf(current);
      })
    );
  }

  loadHandler(): void {}
}
