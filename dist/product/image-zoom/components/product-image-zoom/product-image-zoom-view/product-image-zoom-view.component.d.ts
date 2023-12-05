import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ImageGroup, Product } from '@spartacus/core';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
import { BreakpointService, CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ProductImageZoomViewComponent implements OnInit, OnDestroy {
    protected currentProductService: CurrentProductService;
    protected renderer: Renderer2;
    protected cdRef: ChangeDetectorRef;
    protected breakpointService: BreakpointService;
    iconType: typeof ICON_TYPE;
    galleryIndex: number;
    private mainMediaContainer;
    private defaultImageReady;
    private zoomReady;
    private _defaultImage;
    private _zoomImage;
    protected subscription: Subscription;
    protected mainMediaContainer$: Observable<ImageGroup | null>;
    protected defaultImageReady$: Observable<boolean>;
    protected zoomReady$: Observable<boolean>;
    activeThumb: EventEmitter<ImageGroup>;
    defaultImageClickHandler$: Observable<any[]>;
    get defaultImage(): ElementRef;
    set defaultImage(el: ElementRef);
    zoomImageClickHandler$: Observable<any[]>;
    get zoomImage(): ElementRef;
    set zoomImage(el: ElementRef);
    zoomedImage: ElementRef;
    startCoords: {
        x: number;
        y: number;
    } | null;
    left: number;
    top: number;
    isZoomed: boolean;
    protected product$: Observable<Product>;
    thumbnails$: Observable<Observable<ThumbnailsGroup>[]>;
    mainImage$: Observable<ImageGroup | null>;
    constructor(currentProductService: CurrentProductService, renderer: Renderer2, cdRef: ChangeDetectorRef, breakpointService: BreakpointService);
    ngOnInit(): void;
    openImage(item: ImageGroup): void;
    /** find the index of the main media in the list of media */
    protected getActive(): number;
    getPreviousProduct(thumbs: Observable<ImageGroup>[]): Observable<ImageGroup>;
    getNextProduct(thumbs: Observable<ImageGroup>[]): Observable<ImageGroup>;
    /**
     * Zoom in or out of the image
     */
    zoom(): void;
    /**
     * Touch screen image pan
     *
     * @param event
     */
    touchMove(event: TouchEvent): void;
    /**
     * Clears touch location
     */
    clearTouch(): void;
    /**
     * Pointer image pan
     *
     * @param event
     */
    pointerMove(event: MouseEvent): void;
    changeImage(event: {
        image: ImageGroup;
        index: number;
    }): void;
    /**
     * Applies the offset from touchMove or pointerMove to the image element
     *
     * @param positionX
     * @param positionY
     * @param boundingRect
     * @param imageElement
     */
    protected moveImage(positionX: number, positionY: number, boundingRect: any, imageElement: DOMRect): void;
    ngOnDestroy(): void;
    /**
     * Returns click and dblclick event mapping for the given element
     *
     * @param element
     */
    private clickOrDoubleClick;
    /**
     * Return an array of CarouselItems for the product thumbnails.
     * In case there are less then 2 thumbs, we return null.
     */
    private createThumbs;
    /**
     * Keeps the zoom image from leaving the bounding container
     *
     * @param positionX
     * @param positionY
     * @param imageElement
     * @param boundingRect
     */
    handleOutOfBounds(positionX: number, positionY: number, imageElement: any, boundingRect: DOMRect): {
        x: number;
        y: number;
    };
    /**
     * Returns the position of the image based on the cursor pointer
     *
     * @param element
     * @param clientX
     * @param clientY
     */
    calculatePointerMovePosition(element: ElementRef, clientX: number, clientY: number): {
        positionX: number;
        positionY: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageZoomViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImageZoomViewComponent, "cx-product-image-zoom-view", never, { "galleryIndex": "galleryIndex"; }, {}, never, never, false, never>;
}
