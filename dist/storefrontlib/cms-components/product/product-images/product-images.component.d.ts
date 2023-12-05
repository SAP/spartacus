import { ImageGroup, Product } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import * as i0 from "@angular/core";
export declare class ProductImagesComponent {
    protected currentProductService: CurrentProductService;
    protected mainMediaContainer: BehaviorSubject<any>;
    protected product$: Observable<Product>;
    thumbs$: Observable<any[]>;
    mainImage$: Observable<any>;
    constructor(currentProductService: CurrentProductService);
    openImage(item: any): void;
    isActive(thumbnail: ImageGroup): Observable<boolean>;
    /** find the index of the main media in the list of media */
    getActive(thumbs: any[]): Observable<number>;
    /**
     * Return an array of CarouselItems for the product thumbnails.
     * In case there are less then 2 thumbs, we return null.
     */
    private createThumbs;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImagesComponent, "cx-product-images", never, {}, {}, never, never, false, never>;
}
