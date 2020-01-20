import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
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

  /**
   * @deprecated since version 1.5
   * This variable will no longer be in use. Use thumbs$ observable instead.
   * TODO(issue:#6166).
   */
  isThumbsEmpty: boolean;

  thumbs$: Observable<any[]> = this.product$.pipe(
    map(product => this.createThumbs(product)),
    // TODO: deprecated, remove the below tap (issue:#6166)
    tap(thumbs => {
      this.isThumbsEmpty = thumbs.length === 0;
    })
  );

  mainImage$ = combineLatest([this.product$, this.mainMediaContainer]).pipe(
    map(([, container]) => container)
  );

  constructor(private currentProductService: CurrentProductService) {}

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
  }

  isActive(thumbnail): Observable<boolean> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: any) => {
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

  /** find the index of the main media in the list of media */
  getActive(thumbs: any[]): Observable<number> {
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
  private createThumbs(product: Product): Observable<any>[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      product.images.GALLERY.length < 2
    ) {
      return [];
    }

    return (<any[]>product.images.GALLERY).map(c => of({ container: c }));
  }
}
