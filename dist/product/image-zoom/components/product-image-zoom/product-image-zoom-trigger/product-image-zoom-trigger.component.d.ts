import { EventEmitter, OnDestroy, ViewContainerRef, ElementRef } from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ProductImageZoomTriggerComponent implements OnDestroy {
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    iconType: typeof ICON_TYPE;
    protected subscriptions: Subscription;
    expandButton: ElementRef;
    galleryIndex: number;
    set expandImage(expand: boolean);
    dialogClose: EventEmitter<void>;
    constructor(launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    triggerZoom(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageZoomTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImageZoomTriggerComponent, "cx-product-image-zoom-trigger", never, { "galleryIndex": "galleryIndex"; "expandImage": "expandImage"; }, { "dialogClose": "dialogClose"; }, never, never, false, never>;
}
