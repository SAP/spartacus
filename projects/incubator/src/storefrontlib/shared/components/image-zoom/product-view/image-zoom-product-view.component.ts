import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
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
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMapTo,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'cx-image-zoom-product-view',
  templateUrl: './image-zoom-product-view.component.html',
  styleUrls: ['./image-zoom-product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomProductViewComponent implements AfterViewInit {
  iconType = ICON_TYPE;
  private mainMediaContainer = new BehaviorSubject(null);

  isZoomed = false;

  isZoomed2 = new BehaviorSubject(false);

  isZoomed$ = this.isZoomed2.asObservable().pipe(
    tap((val) => {
      if (val) {
        // console.log('true', val);
        // fromEvent(this.container.nativeElement, 'click').subscribe((event) =>
        //   console.log(event)
        // );
      } else {
        // console.log('in else', val);
      }
    })
  );

  @Input() galleryIndex: number;

  @ViewChildren('zoomedImage', { read: ElementRef }) zoomedImage: QueryList<
    ElementRef
  >;

  @ViewChild('container') container: ElementRef;

  @ViewChild('z3', { read: ElementRef }) set zz(z: ElementRef) {
    if (z) {
      merge(
        fromEvent(z.nativeElement, 'click').pipe(
          switchMapTo(this.breakpoint.isDown(BREAKPOINT.lg)),
          filter(Boolean)
        ),
        fromEvent(z.nativeElement, 'dblclick').pipe(
          switchMapTo(this.breakpoint.isUp(BREAKPOINT.md)),
          filter(Boolean)
        )
      )
        .pipe(
          tap((clickOrDoubleClick) => {
            console.log('clickOrDoubleClick', clickOrDoubleClick);
            // console.log('dbl', dbl);
            this.zoom();
          }),
          first()
        )
        .subscribe();
      // fromEvent(z.nativeElement, 'click')
      //   .pipe(debounceTime(300))
      //   .subscribe(() => this.zoom());
      // fromEvent(z.nativeElement, 'dblclick').subscribe(() =>
      //   console.log('dbl')
      // );
    }
  }

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
    protected element: ElementRef,
    protected cdRef: ChangeDetectorRef,
    protected breakpoint: BreakpointService
  ) {}

  ngAfterViewInit() {
    // fromEvent(this.z3.nativeElement, 'click').subscribe((event) =>
    //   console.log(event)
    // );
    // this.z3.changes.subscribe((comp) => {
    //   console.log('comp', comp);
    //   if (comp.length > 0) {
    //     console.log(comp[0]);
    //   }
    // });
  }

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

  print() {
    console.log('print', !this.isZoomed);
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
    console.log('zoom', this.isZoomed);
    // this.isZoomed2.next(true);
    this.isZoomed = !this.isZoomed;
    this.startCoords = null;
    this.left = 0;
    this.top = 0;
    this.cdRef.detectChanges();
  }

  /**
   * Touch screen image pan
   *
   * @param event
   */
  touchMove(event: any): void {
    const touch = event.touches[0] || event.changedTouches[0];
    const boundingRect = this.zoomedImage.last.nativeElement.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage.last.nativeElement.firstChild;

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
    const boundingRect = this.zoomedImage.first.nativeElement.getBoundingClientRect() as DOMRect;
    const imageElement = this.zoomedImage.first.nativeElement.firstChild;

    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    const positionX = -x + this.zoomedImage.first.nativeElement.clientWidth / 2;
    const positionY =
      -y + this.zoomedImage.first.nativeElement.clientHeight / 2;

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
    boundingRect: DOMRect
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
