import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CurrentProductService,
  ICON_TYPE,
} from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  merge,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import {
  calculatePointerMovePosition,
  handleOutOfBounds,
} from './image-zoom-util';

@Component({
  selector: 'cx-image-zoom-product-view',
  templateUrl: './image-zoom-product-view.component.html',
  styleUrls: ['./image-zoom-product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomProductViewComponent implements OnInit, OnDestroy {
  iconType = ICON_TYPE;
  private mainMediaContainer = new BehaviorSubject(null);
  private subscription = new Subscription();

  private defaultImageReady = new BehaviorSubject(false);
  private zoomReady = new BehaviorSubject(false);

  private _defaultImage: ElementRef;
  private _zoomImage: ElementRef;

  @Input() galleryIndex: number;

  defaultImageClickHandler$ = this.defaultImageReady.pipe(
    filter(Boolean),
    switchMap((_) =>
      merge(...this.clickOrDoubleClick(this.defaultImage)).pipe(
        tap(() => this.zoom())
      )
    )
  );

  zoomImageClickHandler$ = this.zoomReady.pipe(
    filter(Boolean),
    switchMap((_) =>
      merge(...this.clickOrDoubleClick(this.zoomImage)).pipe(
        tap(() => this.zoom())
      )
    )
  );

  get defaultImage(): ElementRef {
    return this._defaultImage;
  }

  get zoomImage(): ElementRef {
    return this._zoomImage;
  }

  @ViewChild('defaultImage', { read: ElementRef }) set defaultImage(
    el: ElementRef
  ) {
    if (el) {
      this._defaultImage = el;
      this.defaultImageReady.next(true);
    }
  }

  @ViewChild('zoomContainer', { read: ElementRef }) set zoomImage(
    el: ElementRef
  ) {
    if (el) {
      this._zoomImage = el;
      this.zoomReady.next(true);
    }
  }

  @ViewChild('zoomedImage', { read: ElementRef }) zoomedImage: ElementRef;

  startCoords: { x: number; y: number } = null;
  left = 0;
  top = 0;
  isZoomed = false;

  protected product$: Observable<
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
    }),
    shareReplay(1)
  );

  thumbs$: Observable<any[]> = this.product$.pipe(
    map((p: Product) => this.createThumbs(p)),
    shareReplay(1)
  );

  mainImage$ = combineLatest([this.product$, this.mainMediaContainer]).pipe(
    map(([, container]) => container)
  );

  constructor(
    protected currentProductService: CurrentProductService,
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    protected breakpoint: BreakpointService
  ) {}

  ngOnInit() {
    this.subscription.add(this.defaultImageClickHandler$.subscribe());
    this.subscription.add(this.zoomImageClickHandler$.subscribe());
  }

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
  }

  isActive(thumbnail: any): Observable<boolean> {
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
    this.cdRef.markForCheck();
  }

  /**
   * Touch screen image pan
   *
   * @param event
   */
  touchMove(event: any): void {
    const touch = event.touches[0] || event.changedTouches[0];
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage.nativeElement.firstChild;

    if (!this.startCoords)
      this.startCoords = { x: touch.clientX, y: touch.clientY };

    this.left += touch.clientX - this.startCoords.x;
    this.top += touch.clientY - this.startCoords.y;

    this.moveImage(this.left, this.top, boundingRect, imageElement);

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
    const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage.nativeElement.firstChild;

    const { positionX, positionY } = calculatePointerMovePosition(
      this.zoomedImage,
      event.clientX,
      event.clientY
    );

    this.moveImage(positionX, positionY, boundingRect, imageElement);
  }

  /**
   * Applies the offset from touchMove or pointerMove to the image element
   *
   * @param positionX
   * @param positionY
   * @param boundingRect
   * @param imageElement
   */
  protected moveImage(
    positionX: number,
    positionY: number,
    boundingRect: any,
    imageElement: DOMRect
  ): void {
    const { x, y } = handleOutOfBounds(
      positionX,
      positionY,
      imageElement,
      boundingRect
    );

    this.renderer.setStyle(imageElement, 'left', x + 'px');
    this.renderer.setStyle(imageElement, 'top', y + 'px');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Returns click and dblclick event mapping for the given element
   *
   * @param element
   */
  private clickOrDoubleClick(element: ElementRef): Observable<any>[] {
    return [
      fromEvent(element.nativeElement, 'click').pipe(
        switchMapTo(this.breakpoint.isUp(BREAKPOINT.md)),
        filter(Boolean)
      ),
      fromEvent(element.nativeElement, 'dblclick').pipe(
        switchMapTo(this.breakpoint.isDown(BREAKPOINT.lg)),
        filter(Boolean)
      ),
    ];
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
