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
  getActive(): number {
    return this.mainMediaContainer.value.thumbnail?.galleryIndex || 0;
    // console.log(this.mainMediaContainer.value);
    // return this.mainMediaContainer.asObservable().pipe(
    //   filter(Boolean),
    //   map((container: any) => {
    //     return container.thumbnail?.galleryIndex || 0;
    //   })
    // );
  }

  getPreviousProduct(thumbs: any[]): Observable<any> {
    const active = this.getActive();
    if (active === 0) {
      return thumbs[active];
    }
    return thumbs[active - 1];
  }
  getNextProduct(thumbs: any[]): Observable<any> {
    const active = this.getActive();
    if (active === thumbs.length - 1) {
      return thumbs[active];
    }
    return thumbs[active + 1];
  }

  zoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  touchMove(event: any): void {
    const touch = event.touches[0] || event.changedTouches[0];
    this.moveImage(touch.pageX, touch.pageY);
  }

  pointerMove(event: any): void {
    this.moveImage(event.pageX, event.pageY);
  }

  protected moveImage(positionX: number, positionY): void {
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();
    const imageElement = this.zoomedImage.nativeElement.firstChild;

    const x = positionX - boundingRect.left;
    const y = positionY - boundingRect.top;

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
