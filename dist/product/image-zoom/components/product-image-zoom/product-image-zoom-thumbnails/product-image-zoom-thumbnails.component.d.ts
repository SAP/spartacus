import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ImageGroup } from '@spartacus/core';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ProductImageZoomThumbnailsComponent implements OnInit, OnDestroy {
    private mainMediaContainer;
    productImage: EventEmitter<{
        image: any;
        index: number;
    }>;
    thumbs$: Observable<ThumbnailsGroup[]>;
    activeThumb: EventEmitter<ImageGroup>;
    protected subscription: Subscription;
    selectedIndex: number;
    constructor();
    ngOnInit(): void;
    openImage(image: ImageGroup): void;
    isActive(thumbnail: ImageGroup): Observable<boolean>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageZoomThumbnailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImageZoomThumbnailsComponent, "cx-product-image-zoom-thumbnails", never, { "thumbs$": "thumbs$"; "activeThumb": "activeThumb"; }, { "productImage": "productImage"; }, never, never, false, never>;
}
