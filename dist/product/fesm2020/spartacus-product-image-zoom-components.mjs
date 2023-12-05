import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Output, Input, ElementRef, ViewChild, HostListener, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as i3 from '@spartacus/core';
import { isNotNullable, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { ICON_TYPE, BREAKPOINT, DIALOG_TYPE, ProductImagesComponent, CarouselModule, IconModule, KeyboardFocusModule, MediaModule, OutletModule } from '@spartacus/storefront';
import { BehaviorSubject, Subscription, merge, combineLatest, fromEvent, of } from 'rxjs';
import { filter, map, switchMap, tap, distinctUntilChanged, shareReplay } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomThumbnailsComponent {
    constructor() {
        this.mainMediaContainer = new BehaviorSubject({});
        this.productImage = new EventEmitter();
        this.subscription = new Subscription();
        // Intentional empty constructor
    }
    ngOnInit() {
        this.subscription.add(this.activeThumb.subscribe((image) => {
            this.mainMediaContainer.next(image);
        }));
    }
    openImage(image) {
        this.mainMediaContainer.next(image);
        if (typeof image.zoom?.galleryIndex === 'number') {
            this.productImage.emit({ image, index: image.zoom.galleryIndex });
        }
    }
    isActive(thumbnail) {
        return this.mainMediaContainer.asObservable().pipe(filter(isNotNullable), map((container) => {
            return (container.zoom?.url &&
                thumbnail.zoom?.url &&
                container.zoom.url === thumbnail.zoom.url);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ProductImageZoomThumbnailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomThumbnailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomThumbnailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomThumbnailsComponent, selector: "cx-product-image-zoom-thumbnails", inputs: { thumbs$: "thumbs$", activeThumb: "activeThumb" }, outputs: { productImage: "productImage" }, ngImport: i0, template: "<ng-container *ngIf=\"thumbs$ | async as thumbs\">\n  <cx-carousel\n    *ngIf=\"thumbs.length\"\n    class=\"thumbs\"\n    [items]=\"thumbs\"\n    itemWidth=\"70px\"\n    [hideIndicators]=\"false\"\n    [template]=\"thumb\"\n  ></cx-carousel>\n</ng-container>\n\n<ng-template #thumb let-item=\"item\">\n  <cx-media\n    [container]=\"item.container\"\n    tabindex=\"0\"\n    (focus)=\"openImage(item.container)\"\n    [class.is-active]=\"isActive(item.container) | async\"\n  >\n  </cx-media>\n</ng-template>\n", dependencies: [{ kind: "component", type: i1.CarouselComponent, selector: "cx-carousel", inputs: ["title", "items", "template", "itemWidth", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomThumbnailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-thumbnails', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"thumbs$ | async as thumbs\">\n  <cx-carousel\n    *ngIf=\"thumbs.length\"\n    class=\"thumbs\"\n    [items]=\"thumbs\"\n    itemWidth=\"70px\"\n    [hideIndicators]=\"false\"\n    [template]=\"thumb\"\n  ></cx-carousel>\n</ng-container>\n\n<ng-template #thumb let-item=\"item\">\n  <cx-media\n    [container]=\"item.container\"\n    tabindex=\"0\"\n    (focus)=\"openImage(item.container)\"\n    [class.is-active]=\"isActive(item.container) | async\"\n  >\n  </cx-media>\n</ng-template>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { productImage: [{
                type: Output
            }], thumbs$: [{
                type: Input
            }], activeThumb: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomViewComponent {
    get defaultImage() {
        return this._defaultImage;
    }
    set defaultImage(el) {
        if (el) {
            this._defaultImage = el;
            this.defaultImageReady.next(true);
        }
    }
    get zoomImage() {
        return this._zoomImage;
    }
    set zoomImage(el) {
        if (el) {
            this._zoomImage = el;
            this.zoomReady.next(true);
        }
    }
    constructor(currentProductService, renderer, cdRef, breakpointService) {
        this.currentProductService = currentProductService;
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.breakpointService = breakpointService;
        this.iconType = ICON_TYPE;
        this.mainMediaContainer = new BehaviorSubject(null);
        this.defaultImageReady = new BehaviorSubject(false);
        this.zoomReady = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.mainMediaContainer$ = this.mainMediaContainer.asObservable();
        this.defaultImageReady$ = this.defaultImageReady.asObservable();
        this.zoomReady$ = this.zoomReady.asObservable();
        this.activeThumb = new EventEmitter();
        this.defaultImageClickHandler$ = this.defaultImageReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.defaultImage)).pipe(tap(() => this.zoom()))));
        this.zoomImageClickHandler$ = this.zoomReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.zoomImage)).pipe(tap(() => this.zoom()))));
        this.startCoords = null;
        this.left = 0;
        this.top = 0;
        this.isZoomed = false;
        this.product$ = this.currentProductService
            .getProduct()
            .pipe(filter(isNotNullable), distinctUntilChanged(), tap((p) => {
            if (this.galleryIndex) {
                const image = Array.isArray(p.images?.GALLERY)
                    ? p.images?.GALLERY.find((img) => img.zoom?.galleryIndex === this.galleryIndex)
                    : p.images?.GALLERY;
                this.mainMediaContainer.next(image || null);
            }
            else {
                this.mainMediaContainer.next(p.images?.PRIMARY ? p.images.PRIMARY : {});
            }
        }), shareReplay(1));
        this.thumbnails$ = this.product$.pipe(map((p) => this.createThumbs(p)), shareReplay(1));
        this.mainImage$ = combineLatest([
            this.product$,
            this.mainMediaContainer$,
        ]).pipe(map(([, container]) => container));
    }
    ngOnInit() {
        this.subscription.add(this.defaultImageClickHandler$.subscribe());
        this.subscription.add(this.zoomImageClickHandler$.subscribe());
    }
    openImage(item) {
        this.mainMediaContainer.next(item);
        this.activeThumb.emit(item);
    }
    /** find the index of the main media in the list of media */
    getActive() {
        if (Array.isArray(this.mainMediaContainer.value)) {
            return this.mainMediaContainer.value[0].thumbnail?.galleryIndex || 0;
        }
        return this.mainMediaContainer?.value?.thumbnail?.galleryIndex || 0;
    }
    getPreviousProduct(thumbs) {
        const active = this.getActive();
        if (active === 0) {
            return thumbs[active];
        }
        return thumbs[active - 1];
    }
    getNextProduct(thumbs) {
        const active = this.getActive();
        if (active === thumbs.length - 1) {
            return thumbs[active];
        }
        return thumbs[active + 1];
    }
    /**
     * Zoom in or out of the image
     */
    zoom() {
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
    touchMove(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        const boundingRect = this.zoomedImage?.nativeElement?.getBoundingClientRect();
        const imageElement = this.zoomedImage?.nativeElement?.firstChild;
        if (!this.startCoords) {
            this.startCoords = { x: touch.clientX, y: touch.clientY };
        }
        this.left += touch.clientX - this.startCoords.x;
        this.top += touch.clientY - this.startCoords.y;
        this.moveImage(this.left, this.top, boundingRect, imageElement);
        this.startCoords = { x: touch.clientX, y: touch.clientY };
    }
    /**
     * Clears touch location
     */
    clearTouch() {
        this.startCoords = null;
    }
    /**
     * Pointer image pan
     *
     * @param event
     */
    pointerMove(event) {
        const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();
        const imageElement = this.zoomedImage.nativeElement.firstChild;
        const { positionX, positionY } = this.calculatePointerMovePosition(this.zoomedImage, event.clientX, event.clientY);
        this.moveImage(positionX, positionY, boundingRect, imageElement);
    }
    changeImage(event) {
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
    moveImage(positionX, positionY, boundingRect, imageElement) {
        const { x, y } = this.handleOutOfBounds(positionX, positionY, imageElement, boundingRect);
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
    clickOrDoubleClick(element) {
        return [
            fromEvent(element.nativeElement, 'click').pipe(switchMap(() => this.breakpointService.isUp(BREAKPOINT.md)), filter(Boolean)),
            fromEvent(element.nativeElement, 'dblclick').pipe(switchMap(() => this.breakpointService.isDown(BREAKPOINT.lg)), filter(Boolean)),
        ];
    }
    /**
     * Return an array of CarouselItems for the product thumbnails.
     * In case there are less then 2 thumbs, we return null.
     */
    createThumbs(product) {
        if (!product.images ||
            !product.images.GALLERY ||
            product.images.GALLERY.length < 2) {
            return [];
        }
        const images = product.images.GALLERY;
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
    handleOutOfBounds(positionX, positionY, imageElement, boundingRect) {
        const paddingX = 60;
        const paddingY = 60;
        if (positionY <= -imageElement?.height + paddingY) {
            positionY = -imageElement?.height + paddingY;
        }
        if (positionY >= boundingRect?.height - paddingY) {
            positionY = boundingRect?.height - paddingY;
        }
        if (positionX <=
            -imageElement?.width - boundingRect?.width / 2 + paddingX) {
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
    calculatePointerMovePosition(element, clientX, clientY) {
        const boundingRect = element.nativeElement.getBoundingClientRect();
        const x = clientX - boundingRect.left;
        const y = clientY - boundingRect.top;
        const positionX = -x + element.nativeElement.clientWidth / 2;
        const positionY = -y + element.nativeElement.clientHeight / 2;
        return { positionX, positionY };
    }
}
ProductImageZoomViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomViewComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: { galleryIndex: "galleryIndex" }, viewQueries: [{ propertyName: "defaultImage", first: true, predicate: ["defaultImage"], descendants: true, read: ElementRef }, { propertyName: "zoomImage", first: true, predicate: ["zoomContainer"], descendants: true, read: ElementRef }, { propertyName: "zoomedImage", first: true, predicate: ["zoomedImage"], descendants: true, read: ElementRef }], ngImport: i0, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ProductImageZoomThumbnailsComponent, selector: "cx-product-image-zoom-thumbnails", inputs: ["thumbs$", "activeThumb"], outputs: ["productImage"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.BreakpointService }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], defaultImage: [{
                type: ViewChild,
                args: ['defaultImage', { read: ElementRef }]
            }], zoomImage: [{
                type: ViewChild,
                args: ['zoomContainer', { read: ElementRef }]
            }], zoomedImage: [{
                type: ViewChild,
                args: ['zoomedImage', { read: ElementRef }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomDialogComponent {
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(launchDialogService, el) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.iconType = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    close(reason = '') {
        this.launchDialogService.closeDialog(reason);
    }
}
ProductImageZoomDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomDialogComponent, selector: "cx-product-image-zoom-dialog", inputs: { galleryIndex: "galleryIndex" }, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: ["galleryIndex"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultProductImageZoomLayoutConfig = {
    launch: {
        PRODUCT_IMAGE_ZOOM: {
            inline: true,
            component: ProductImageZoomDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomTriggerComponent {
    set expandImage(expand) {
        if (expand) {
            this.triggerZoom();
        }
    }
    constructor(launchDialogService, vcr) {
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.iconType = ICON_TYPE;
        this.subscriptions = new Subscription();
        this.dialogClose = new EventEmitter();
    }
    triggerZoom() {
        const component = this.launchDialogService.launch("PRODUCT_IMAGE_ZOOM" /* LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM */, this.vcr);
        if (component) {
            this.subscriptions.add(combineLatest([component, this.launchDialogService.dialogClose])
                .pipe(tap(([comp]) => {
                if (this.galleryIndex) {
                    comp.instance.galleryIndex = this.galleryIndex;
                }
            }), filter(([, close]) => Boolean(close)), tap(([comp]) => {
                this.launchDialogService.clear("PRODUCT_IMAGE_ZOOM" /* LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM */);
                comp?.destroy();
                this.dialogClose.emit();
                this.expandButton.nativeElement.focus();
            }))
                .subscribe());
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ProductImageZoomTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomTriggerComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomTriggerComponent, selector: "cx-product-image-zoom-trigger", inputs: { galleryIndex: "galleryIndex", expandImage: "expandImage" }, outputs: { dialogClose: "dialogClose" }, viewQueries: [{ propertyName: "expandButton", first: true, predicate: ["expandButton"], descendants: true }], ngImport: i0, template: "<button\n  #expandButton\n  class=\"btn btn-link cx-action-link\"\n  (click)=\"triggerZoom()\"\n>\n  <span>\n    {{ 'productImageZoomTrigger.expand' | cxTranslate }}\n    <cx-icon [type]=\"iconType.EXPAND_ARROWS\"></cx-icon\n  ></span>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomTriggerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-trigger', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  #expandButton\n  class=\"btn btn-link cx-action-link\"\n  (click)=\"triggerZoom()\"\n>\n  <span>\n    {{ 'productImageZoomTrigger.expand' | cxTranslate }}\n    <cx-icon [type]=\"iconType.EXPAND_ARROWS\"></cx-icon\n  ></span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { expandButton: [{
                type: ViewChild,
                args: ['expandButton']
            }], galleryIndex: [{
                type: Input
            }], expandImage: [{
                type: Input
            }], dialogClose: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomProductImagesComponent extends ProductImagesComponent {
    constructor(currentProductService) {
        super(currentProductService);
        this.currentProductService = currentProductService;
        this.expandImage = new BehaviorSubject(false);
        this.product$ = this.product$;
    }
    openImage(item) {
        this.mainMediaContainer.next(item);
        this.selectedIndex = this.mainMediaContainer.value?.zoom?.galleryIndex;
    }
    /**
     * Opens image zoom dialog.
     */
    triggerZoom(value) {
        this.expandImage.next(value);
    }
}
ProductImageZoomProductImagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomProductImagesComponent, deps: [{ token: i1.CurrentProductService }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomProductImagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomProductImagesComponent, selector: "cx-product-images", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <cx-media [container]=\"main\" (click)=\"triggerZoom(true)\"></cx-media>\n  <cx-product-image-zoom-trigger\n    [expandImage]=\"expandImage.value\"\n    [galleryIndex]=\"selectedIndex\"\n    (dialogClose)=\"triggerZoom(false)\"\n  ></cx-product-image-zoom-trigger>\n</ng-container>\n\n<ng-container *ngIf=\"thumbs$ | async as thumbs\">\n  <ng-container *ngIf=\"product$ | async as product\">\n    <cx-carousel\n      role=\"region\"\n      [attr.aria-label]=\"\n        'carousel.carouselForProduct' | cxTranslate: { product: product.name }\n      \"\n      tabindex=\"-1\"\n      *ngIf=\"thumbs.length\"\n      class=\"thumbs\"\n      [items]=\"thumbs\"\n      itemWidth=\"120px\"\n      [hideIndicators]=\"false\"\n      [template]=\"thumb\"\n    ></cx-carousel>\n  </ng-container>\n</ng-container>\n\n<ng-template #thumb let-item=\"item\">\n  <cx-media\n    [container]=\"item.container\"\n    tabindex=\"0\"\n    (focus)=\"openImage(item.container)\"\n    [class.is-active]=\"isActive(item.container) | async\"\n    format=\"product\"\n  >\n  </cx-media>\n</ng-template>\n", dependencies: [{ kind: "component", type: i1.CarouselComponent, selector: "cx-carousel", inputs: ["title", "items", "template", "itemWidth", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ProductImageZoomTriggerComponent, selector: "cx-product-image-zoom-trigger", inputs: ["galleryIndex", "expandImage"], outputs: ["dialogClose"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomProductImagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-images', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <cx-media [container]=\"main\" (click)=\"triggerZoom(true)\"></cx-media>\n  <cx-product-image-zoom-trigger\n    [expandImage]=\"expandImage.value\"\n    [galleryIndex]=\"selectedIndex\"\n    (dialogClose)=\"triggerZoom(false)\"\n  ></cx-product-image-zoom-trigger>\n</ng-container>\n\n<ng-container *ngIf=\"thumbs$ | async as thumbs\">\n  <ng-container *ngIf=\"product$ | async as product\">\n    <cx-carousel\n      role=\"region\"\n      [attr.aria-label]=\"\n        'carousel.carouselForProduct' | cxTranslate: { product: product.name }\n      \"\n      tabindex=\"-1\"\n      *ngIf=\"thumbs.length\"\n      class=\"thumbs\"\n      [items]=\"thumbs\"\n      itemWidth=\"120px\"\n      [hideIndicators]=\"false\"\n      [template]=\"thumb\"\n    ></cx-carousel>\n  </ng-container>\n</ng-container>\n\n<ng-template #thumb let-item=\"item\">\n  <cx-media\n    [container]=\"item.container\"\n    tabindex=\"0\"\n    (focus)=\"openImage(item.container)\"\n    [class.is-active]=\"isActive(item.container) | async\"\n    format=\"product\"\n  >\n  </cx-media>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomModule {
}
ProductImageZoomModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductImageZoomModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, declarations: [ProductImageZoomDialogComponent,
        ProductImageZoomProductImagesComponent,
        ProductImageZoomThumbnailsComponent,
        ProductImageZoomTriggerComponent,
        ProductImageZoomViewComponent], imports: [CarouselModule,
        CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        MediaModule,
        OutletModule,
        RouterModule], exports: [ProductImageZoomDialogComponent,
        ProductImageZoomProductImagesComponent,
        ProductImageZoomThumbnailsComponent,
        ProductImageZoomTriggerComponent,
        ProductImageZoomViewComponent] });
ProductImageZoomModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, providers: [
        provideDefaultConfig(defaultProductImageZoomLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ProductImagesComponent: {
                    component: ProductImageZoomProductImagesComponent,
                },
            },
        }),
    ], imports: [CarouselModule,
        CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        MediaModule,
        OutletModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CarouselModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        MediaModule,
                        OutletModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultProductImageZoomLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductImagesComponent: {
                                    component: ProductImageZoomProductImagesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ProductImageZoomDialogComponent,
                        ProductImageZoomProductImagesComponent,
                        ProductImageZoomThumbnailsComponent,
                        ProductImageZoomTriggerComponent,
                        ProductImageZoomViewComponent,
                    ],
                    exports: [
                        ProductImageZoomDialogComponent,
                        ProductImageZoomProductImagesComponent,
                        ProductImageZoomThumbnailsComponent,
                        ProductImageZoomTriggerComponent,
                        ProductImageZoomViewComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductImageZoomComponentsModule {
}
ProductImageZoomComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductImageZoomComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomComponentsModule, imports: [ProductImageZoomModule] });
ProductImageZoomComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomComponentsModule, imports: [ProductImageZoomModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProductImageZoomModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ProductImageZoomComponentsModule, ProductImageZoomDialogComponent, ProductImageZoomModule, ProductImageZoomProductImagesComponent, ProductImageZoomThumbnailsComponent, ProductImageZoomTriggerComponent, ProductImageZoomViewComponent, defaultProductImageZoomLayoutConfig };
//# sourceMappingURL=spartacus-product-image-zoom-components.mjs.map
