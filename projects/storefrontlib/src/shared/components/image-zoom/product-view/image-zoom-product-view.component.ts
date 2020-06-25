import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../../../../cms-components/product/current-product.service';

@Component({
  selector: 'cx-image-zoom-product-view',
  templateUrl: './image-zoom-product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomProductViewComponent {
  private mainMediaContainer = new BehaviorSubject(null);

  isZoomed = false;

  @Input() galleryItem: number;

  @ViewChild('zoomedImage', { read: ElementRef }) zoomedImage: ElementRef;

  top = 0;
  left = 0;

  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(
    filter(Boolean),
    distinctUntilChanged(),
    tap((p: Product) => {
      if (this.galleryItem) {
        const image = Array.isArray(p.images?.GALLERY)
          ? p.images?.GALLERY.find(
              (img) => img.zoom?.galleryIndex === this.galleryItem
            )
          : p.images?.GALLERY;
        this.mainMediaContainer.next(image);
      } else {
        this.mainMediaContainer.next(p.images?.PRIMARY ? p.images.PRIMARY : {});
      }
    })
  );

  thumbs$: Observable<any[]> = this.product$.pipe(
    map((p: Product) => this.createThumbs(p))
  );

  mainImage$ = combineLatest([this.product$, this.mainMediaContainer]).pipe(
    map(([, container]) => container)
  );

  constructor(
    protected currentProductService: CurrentProductService,
    protected renderer: Renderer2
  ) {}

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
          (t) =>
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

  zoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  moveImage(event: any): void {
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();
    const imageElement = this.zoomedImage.nativeElement.firstChild;

    const x = event.screenX - boundingRect.left;
    const y = event.screenY - boundingRect.top;

    this.left = -x + this.zoomedImage.nativeElement.clientWidth / 2;
    this.top = -y + this.zoomedImage.nativeElement.clientHeight / 2;

    this.renderer.setStyle(imageElement, 'left', this.left + 'px');
    this.renderer.setStyle(imageElement, 'top', this.top + 'px');
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

    return (<any[]>product.images.GALLERY).map((c) => of({ container: c }));
  }
}
