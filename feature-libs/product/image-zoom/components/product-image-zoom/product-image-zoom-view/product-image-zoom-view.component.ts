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
  EventEmitter,
} from '@angular/core';
import { ImageGroup, isNotNullable, Product } from '@spartacus/core';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
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

@Component({
  selector: 'cx-product-image-zoom-view',
  templateUrl: './product-image-zoom-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageZoomViewComponent implements OnInit, OnDestroy {
  iconType = ICON_TYPE;

  @Input() galleryIndex: number;

  private mainMediaContainer = new BehaviorSubject<ImageGroup | null>(null);
  private defaultImageReady = new BehaviorSubject<boolean>(false);
  private zoomReady = new BehaviorSubject<boolean>(false);
  private _defaultImage: ElementRef;
  private _zoomImage: ElementRef;

  protected subscription = new Subscription();
  protected mainMediaContainer$: Observable<ImageGroup | null> =
    this.mainMediaContainer.asObservable();
  protected defaultImageReady$: Observable<boolean> =
    this.defaultImageReady.asObservable();
  protected zoomReady$: Observable<boolean> = this.zoomReady.asObservable();

  activeThumb: EventEmitter<ImageGroup> = new EventEmitter<ImageGroup>();

  defaultImageClickHandler$: Observable<any[]> = this.defaultImageReady$.pipe(
    filter(Boolean),
    switchMap((_) =>
      merge(...this.clickOrDoubleClick(this.defaultImage)).pipe(
        tap(() => this.zoom())
      )
    )
  );

  get defaultImage(): ElementRef {
    return this._defaultImage;
  }

  @ViewChild('defaultImage', { read: ElementRef }) set defaultImage(
    el: ElementRef
  ) {
    if (el) {
      this._defaultImage = el;
      this.defaultImageReady.next(true);
    }
  }

  zoomImageClickHandler$: Observable<any[]> = this.zoomReady$.pipe(
    filter(Boolean),
    switchMap((_) =>
      merge(...this.clickOrDoubleClick(this.zoomImage)).pipe(
        tap(() => this.zoom())
      )
    )
  );

  get zoomImage(): ElementRef {
    return this._zoomImage;
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

  startCoords: { x: number; y: number } | null = null;
  left = 0;
  top = 0;
  isZoomed = false;

  protected product$: Observable<Product> = this.currentProductService
    .getProduct()
    .pipe(
      filter(isNotNullable),
      distinctUntilChanged(),
      tap((p: Product) => {
        if (this.galleryIndex) {
          const image = Array.isArray(p.images?.GALLERY)
            ? p.images?.GALLERY.find(
                (img) => img.zoom?.galleryIndex === this.galleryIndex
              )
            : p.images?.GALLERY;
          this.mainMediaContainer.next(image || null);
        } else {
          this.mainMediaContainer.next(
            p.images?.PRIMARY ? (p.images.PRIMARY as ImageGroup) : {}
          );
        }
      }),
      shareReplay(1)
    );

  thumbnails$: Observable<Observable<ThumbnailsGroup>[]> = this.product$.pipe(
    map((p: Product) => this.createThumbs(p)),
    shareReplay(1)
  );

  mainImage$: Observable<ImageGroup | null> = combineLatest([
    this.product$,
    this.mainMediaContainer$,
  ]).pipe(map(([, container]) => container));

  constructor(
    protected currentProductService: CurrentProductService,
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    protected breakpointService: BreakpointService
  ) {}

  ngOnInit() {
    this.subscription.add(this.defaultImageClickHandler$.subscribe());
    this.subscription.add(this.zoomImageClickHandler$.subscribe());
  }

  openImage(item: ImageGroup): void {
    this.mainMediaContainer.next(item);
    this.activeThumb.emit(item);
  }

  /** find the index of the main media in the list of media */
  protected getActive(): number {
    if (Array.isArray(this.mainMediaContainer.value)) {
      return this.mainMediaContainer.value[0].thumbnail?.galleryIndex || 0;
    }
    return this.mainMediaContainer?.value?.thumbnail?.galleryIndex || 0;
  }

  getPreviousProduct(thumbs: Observable<ImageGroup>[]): Observable<ImageGroup> {
    const active = this.getActive();
    if (active === 0) {
      return thumbs[active];
    }
    return thumbs[active - 1];
  }

  getNextProduct(thumbs: Observable<ImageGroup>[]): Observable<ImageGroup> {
    const active = this.getActive();
    if (active === thumbs.length - 1) {
      return thumbs[active];
    }
    return thumbs[active + 1];
  }

  /**
   * Zoom in or out of the image
   */
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
  touchMove(event: TouchEvent): void {
    const touch = event.touches[0] || event.changedTouches[0];
    const boundingRect =
      this.zoomedImage?.nativeElement?.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage?.nativeElement?.firstChild;

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
  pointerMove(event: MouseEvent): void {
    const boundingRect =
      this.zoomedImage.nativeElement.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage.nativeElement.firstChild;

    const { positionX, positionY } = this.calculatePointerMovePosition(
      this.zoomedImage,
      event.clientX,
      event.clientY
    );

    this.moveImage(positionX, positionY, boundingRect, imageElement);
  }

  changeImage(event: { image: ImageGroup; index: number }): void {
    this.mainMediaContainer.next(event.image);
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
    const { x, y } = this.handleOutOfBounds(
      positionX,
      positionY,
      imageElement,
      boundingRect
    );

    if (imageElement) {
      this.renderer.setStyle(imageElement, 'left', x + 'px');
      this.renderer.setStyle(imageElement, 'top', y + 'px');
    }
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
        switchMapTo(this.breakpointService.isUp(BREAKPOINT.md)),
        filter(Boolean)
      ),
      fromEvent(element.nativeElement, 'dblclick').pipe(
        switchMapTo(this.breakpointService.isDown(BREAKPOINT.lg)),
        filter(Boolean)
      ),
    ];
  }

  /**
   * Return an array of CarouselItems for the product thumbnails.
   * In case there are less then 2 thumbs, we return null.
   */
  private createThumbs(product: Product): Observable<ThumbnailsGroup>[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      product.images.GALLERY.length < 2
    ) {
      return [];
    }

    const images: ImageGroup[] = product.images.GALLERY as ImageGroup[];

    return images.map((c) => of({ container: c }));
  }

  /**
   * Keeps the zoom image from leaving the bounding container
   *
   * @param positionX
   * @param positionY
   * @param imageElement
   * @param boundingRect
   */
  handleOutOfBounds(
    positionX: number,
    positionY: number,
    imageElement: any,
    boundingRect: DOMRect
  ): { x: number; y: number } {
    const paddingX = 60;
    const paddingY = 60;

    if (positionY <= -imageElement?.height + paddingY) {
      positionY = -imageElement?.height + paddingY;
    }
    if (positionY >= boundingRect?.height - paddingY) {
      positionY = boundingRect?.height - paddingY;
    }
    if (
      positionX <=
      -imageElement?.width - boundingRect?.width / 2 + paddingX
    ) {
      positionX = -imageElement?.width - boundingRect?.width / 2 + paddingX;
    }
    if (positionX >= imageElement?.width + boundingRect?.width / 2 - paddingX) {
      positionX = imageElement?.width + boundingRect?.width / 2 - paddingX;
    }

    return { x: positionX, y: positionY };
  }

  /**
   * Returns the position of the image based on the cursor pointer
   *
   * @param element
   * @param clientX
   * @param clientY
   */
  calculatePointerMovePosition(
    element: ElementRef,
    clientX: number,
    clientY: number
  ): { positionX: number; positionY: number } {
    const boundingRect =
      element.nativeElement.getBoundingClientRect() as DOMRect;

    const x = clientX - boundingRect.left;
    const y = clientY - boundingRect.top;

    const positionX = -x + element.nativeElement.clientWidth / 2;
    const positionY = -y + element.nativeElement.clientHeight / 2;

    return { positionX, positionY };
  }
}
