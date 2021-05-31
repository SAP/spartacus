import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageGroup, Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, tap } from 'rxjs/operators';
import { ThumbGroup } from '../../../shared/components/image-zoom/product-thumbnails/thumbnails.model';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImagesComponent {
  private mainMediaContainer = new BehaviorSubject<ImageGroup>(null);

  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(
    filter((product: Product) => !!product),
    distinctUntilKeyChanged('code'),
    tap((p: Product) => {
      this.mainMediaContainer.next(
        p.images?.PRIMARY ? (p.images.PRIMARY as ImageGroup) : {}
      );
    })
  );

  protected mainMediaContainer$ = this.mainMediaContainer.asObservable();

  thumbnails$: Observable<Observable<ThumbGroup>[]> = this.product$.pipe(
    map((p: Product) => this.createThumbs(p))
  );

  mainImage$: Observable<ImageGroup> = combineLatest([
    this.product$,
    this.mainMediaContainer$,
  ]).pipe(map(([, container]) => container));

  // Used for image zoom
  expandImage = new BehaviorSubject(false);
  selectedIndex: number;

  constructor(protected currentProductService: CurrentProductService) {}

  openImage(item: ImageGroup): void {
    this.mainMediaContainer.next(item);
    this.selectedIndex = this.mainMediaContainer.value?.zoom?.galleryIndex;
  }

  isActive(thumbnail: ImageGroup): Observable<boolean> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: ImageGroup) => {
        return (
          container.zoom &&
          container.zoom.url &&
          thumbnail.zoom &&
          thumbnail.zoom.url &&
          container.zoom.url === thumbnail.zoom.url
        );
      })
    );
  }

  triggerZoom(value: boolean): void {
    this.expandImage.next(value);
  }

  /**
   * Return an array of CarouselItems for the product thumbnails.
   * In case there are less then 2 thumbs, we return null.
   */
  private createThumbs(product: Product): Observable<ThumbGroup>[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      product.images.GALLERY.length < 2
    ) {
      return [];
    }

    return [].concat(product.images.GALLERY).map((c) => of({ container: c }));
  }
}
