import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-image-zoom-product-view',
  templateUrl: './image-zoom-product-view.component.html',
  styleUrls: ['./image-zoom-product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomProductViewComponent {
  iconType = ICON_TYPE;
  private mainMediaContainer = new BehaviorSubject(null);

  isZoomed = false;

  @Input() galleryIndex: number;

  @ViewChild('zoomedImage', { read: ElementRef }) zoomedImage: ElementRef;

  startCoords: { x: number; y: number } = null;
  left = 0;
  top = 0;

  private product$: Observable<
    Product
  > = this.currentProductService.getProduct().pipe(
    filter(Boolean),
    distinctUntilChanged(),
    tap((p: Product) => {
      if (this.galleryIndex) {
        const image = Array.isArray(p.images?.GALLERY)
          ? p.images?.GALLERY.find(
              (img) => img.zoom?.galleryIndex === this.galleryIndex
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
    protected renderer: Renderer2,
    protected element: ElementRef
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
    this.startCoords = null;
    this.left = 0;
    this.top = 0;
  }

  /**
   * Touch screen image pan
   *
   * @param event
   */
  touchMove(event: any): void {
    const touch = event.touches[0] || event.changedTouches[0];

    event.preventDefault();

    if (!this.startCoords)
      this.startCoords = { x: touch.clientX, y: touch.clientY };

    this.left += touch.clientX - this.startCoords.x;
    this.top += touch.clientY - this.startCoords.y;

    this.moveImage(this.left, this.top);

    this.startCoords = { x: touch.clientX, y: touch.clientY };
  }

  /**
   * Clears touch location
   */
  clearTouch(): void {
    this.startCoords = null;
  }

  /**
   * Pointer image pan
   *
   * @param event
   */
  pointerMove(event: any): void {
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();

    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    const positionX = -x + this.zoomedImage.nativeElement.clientWidth / 2;
    const positionY = -y + this.zoomedImage.nativeElement.clientHeight / 2;

    this.moveImage(positionX, positionY);
  }

  /**
   * Applies the offset from touchMove or pointerMove to the image element
   *
   * @param positionX
   * @param positionY
   */
  protected moveImage(positionX: number, positionY: number): void {
    const imageElement = this.zoomedImage.nativeElement.firstChild;
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();

    const { x, y } = this.handleOutOfBounds(
      positionX,
      positionY,
      imageElement,
      boundingRect
    );

    this.renderer.setStyle(imageElement, 'left', x + 'px');
    this.renderer.setStyle(imageElement, 'top', y + 'px');
  }

  /**
   * Keeps the zoom image from leaving the bounding container
   *
   * @param positionX
   * @param positionY
   * @param imageElement
   * @param boundingRect
   */
  protected handleOutOfBounds(
    positionX: number,
    positionY: number,
    imageElement: any,
    boundingRect: any
  ): { x: number; y: number } {
    const paddingX = 60;
    const paddingY = 60;

    if (positionY <= -imageElement.height + paddingY) {
      positionY = -imageElement.height + paddingY;
    }
    if (positionY >= boundingRect.height - paddingY) {
      positionY = boundingRect.height - paddingY;
    }
    if (positionX <= -imageElement.width - boundingRect.width / 2 + paddingX) {
      positionX = -imageElement.width - boundingRect.width / 2 + paddingX;
    }
    if (positionX >= imageElement.width + boundingRect.width / 2 - paddingX) {
      positionX = imageElement.width + boundingRect.width / 2 - paddingX;
    }

    return { x: positionX, y: positionY };
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
