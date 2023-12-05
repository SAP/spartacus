import { ElementRef } from '@angular/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ProductImageZoomDialogComponent {
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    iconType: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    galleryIndex: number;
    handleClick(event: UIEvent): void;
    constructor(launchDialogService: LaunchDialogService, el: ElementRef);
    close(reason?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageZoomDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImageZoomDialogComponent, "cx-product-image-zoom-dialog", never, { "galleryIndex": "galleryIndex"; }, {}, never, never, false, never>;
}
