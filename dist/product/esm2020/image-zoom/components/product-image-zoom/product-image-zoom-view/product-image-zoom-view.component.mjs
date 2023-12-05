/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, ViewChild, } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BREAKPOINT, ICON_TYPE, } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, fromEvent, merge, of, Subscription, } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "../product-image-zoom-thumbnails/product-image-zoom-thumbnails.component";
export class ProductImageZoomViewComponent {
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
ProductImageZoomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: { galleryIndex: "galleryIndex" }, viewQueries: [{ propertyName: "defaultImage", first: true, predicate: ["defaultImage"], descendants: true, read: ElementRef }, { propertyName: "zoomImage", first: true, predicate: ["zoomContainer"], descendants: true, read: ElementRef }, { propertyName: "zoomedImage", first: true, predicate: ["zoomedImage"], descendants: true, read: ElementRef }], ngImport: i0, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3.ProductImageZoomThumbnailsComponent, selector: "cx-product-image-zoom-thumbnails", inputs: ["thumbs$", "activeThumb"], outputs: ["productImage"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdmlldy9wcm9kdWN0LWltYWdlLXpvb20tdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3L3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBRXJFLE9BQU8sRUFDTCxVQUFVLEVBR1YsU0FBUyxHQUNWLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsU0FBUyxFQUNULEtBQUssRUFFTCxFQUFFLEVBQ0YsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxTQUFTLEVBQ1QsR0FBRyxHQUNKLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBT3hCLE1BQU0sT0FBTyw2QkFBNkI7SUE2QnhDLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBcUQsWUFBWSxDQUMvRCxF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TSxDQUFDLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFckMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUU5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OzBIQTVVVSw2QkFBNkI7OEdBQTdCLDZCQUE2QixxTUFpQ0wsVUFBVSxxR0FzQlQsVUFBVSxxR0FTWixVQUFVLDZCQ2pIOUMsKzZDQThDQTsyRkRHYSw2QkFBNkI7a0JBTHpDLFNBQVM7K0JBQ0UsNEJBQTRCLG1CQUVyQix1QkFBdUIsQ0FBQyxNQUFNO29NQUt0QyxZQUFZO3NCQUFwQixLQUFLO2dCQThCK0MsWUFBWTtzQkFBaEUsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQXNCTyxTQUFTO3NCQUE5RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBU0EsV0FBVztzQkFBMUQsU0FBUzt1QkFBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZUdyb3VwLCBpc05vdE51bGxhYmxlLCBQcm9kdWN0IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFRodW1ibmFpbHNHcm91cCB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC9pbWFnZS16b29tL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQlJFQUtQT0lOVCxcbiAgQnJlYWtwb2ludFNlcnZpY2UsXG4gIEN1cnJlbnRQcm9kdWN0U2VydmljZSxcbiAgSUNPTl9UWVBFLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBjb21iaW5lTGF0ZXN0LFxuICBmcm9tRXZlbnQsXG4gIG1lcmdlLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW1hZ2Utem9vbS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVpvb21WaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBpY29uVHlwZSA9IElDT05fVFlQRTtcblxuICBASW5wdXQoKSBnYWxsZXJ5SW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIG1haW5NZWRpYUNvbnRhaW5lciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SW1hZ2VHcm91cCB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIGRlZmF1bHRJbWFnZVJlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgem9vbVJlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgX2RlZmF1bHRJbWFnZTogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfem9vbUltYWdlOiBFbGVtZW50UmVmO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCBtYWluTWVkaWFDb250YWluZXIkOiBPYnNlcnZhYmxlPEltYWdlR3JvdXAgfCBudWxsPiA9XG4gICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIuYXNPYnNlcnZhYmxlKCk7XG4gIHByb3RlY3RlZCBkZWZhdWx0SW1hZ2VSZWFkeSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPVxuICAgIHRoaXMuZGVmYXVsdEltYWdlUmVhZHkuYXNPYnNlcnZhYmxlKCk7XG4gIHByb3RlY3RlZCB6b29tUmVhZHkkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy56b29tUmVhZHkuYXNPYnNlcnZhYmxlKCk7XG5cbiAgYWN0aXZlVGh1bWI6IEV2ZW50RW1pdHRlcjxJbWFnZUdyb3VwPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VHcm91cD4oKTtcblxuICBkZWZhdWx0SW1hZ2VDbGlja0hhbmRsZXIkOiBPYnNlcnZhYmxlPGFueVtdPiA9IHRoaXMuZGVmYXVsdEltYWdlUmVhZHkkLnBpcGUoXG4gICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgIHN3aXRjaE1hcCgoXykgPT5cbiAgICAgIG1lcmdlKC4uLnRoaXMuY2xpY2tPckRvdWJsZUNsaWNrKHRoaXMuZGVmYXVsdEltYWdlKSkucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuem9vbSgpKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBnZXQgZGVmYXVsdEltYWdlKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0SW1hZ2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCdkZWZhdWx0SW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgc2V0IGRlZmF1bHRJbWFnZShcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRJbWFnZSA9IGVsO1xuICAgICAgdGhpcy5kZWZhdWx0SW1hZ2VSZWFkeS5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHpvb21JbWFnZUNsaWNrSGFuZGxlciQ6IE9ic2VydmFibGU8YW55W10+ID0gdGhpcy56b29tUmVhZHkkLnBpcGUoXG4gICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgIHN3aXRjaE1hcCgoXykgPT5cbiAgICAgIG1lcmdlKC4uLnRoaXMuY2xpY2tPckRvdWJsZUNsaWNrKHRoaXMuem9vbUltYWdlKSkucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuem9vbSgpKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBnZXQgem9vbUltYWdlKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl96b29tSW1hZ2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCd6b29tQ29udGFpbmVyJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHNldCB6b29tSW1hZ2UoXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLl96b29tSW1hZ2UgPSBlbDtcbiAgICAgIHRoaXMuem9vbVJlYWR5Lm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnem9vbWVkSW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgem9vbWVkSW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgc3RhcnRDb29yZHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGwgPSBudWxsO1xuICBsZWZ0ID0gMDtcbiAgdG9wID0gMDtcbiAgaXNab29tZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgcHJvZHVjdCQ6IE9ic2VydmFibGU8UHJvZHVjdD4gPSB0aGlzLmN1cnJlbnRQcm9kdWN0U2VydmljZVxuICAgIC5nZXRQcm9kdWN0KClcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihpc05vdE51bGxhYmxlKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICB0YXAoKHA6IFByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUluZGV4KSB7XG4gICAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheS5pc0FycmF5KHAuaW1hZ2VzPy5HQUxMRVJZKVxuICAgICAgICAgICAgPyBwLmltYWdlcz8uR0FMTEVSWS5maW5kKFxuICAgICAgICAgICAgICAgIChpbWcpID0+IGltZy56b29tPy5nYWxsZXJ5SW5kZXggPT09IHRoaXMuZ2FsbGVyeUluZGV4XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogcC5pbWFnZXM/LkdBTExFUlk7XG4gICAgICAgICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIubmV4dChpbWFnZSB8fCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KFxuICAgICAgICAgICAgcC5pbWFnZXM/LlBSSU1BUlkgPyAocC5pbWFnZXMuUFJJTUFSWSBhcyBJbWFnZUdyb3VwKSA6IHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzaGFyZVJlcGxheSgxKVxuICAgICk7XG5cbiAgdGh1bWJuYWlscyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUaHVtYm5haWxzR3JvdXA+W10+ID0gdGhpcy5wcm9kdWN0JC5waXBlKFxuICAgIG1hcCgocDogUHJvZHVjdCkgPT4gdGhpcy5jcmVhdGVUaHVtYnMocCkpLFxuICAgIHNoYXJlUmVwbGF5KDEpXG4gICk7XG5cbiAgbWFpbkltYWdlJDogT2JzZXJ2YWJsZTxJbWFnZUdyb3VwIHwgbnVsbD4gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICB0aGlzLnByb2R1Y3QkLFxuICAgIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyJCxcbiAgXSkucGlwZShtYXAoKFssIGNvbnRhaW5lcl0pID0+IGNvbnRhaW5lcikpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50UHJvZHVjdFNlcnZpY2U6IEN1cnJlbnRQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCBicmVha3BvaW50U2VydmljZTogQnJlYWtwb2ludFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmRlZmF1bHRJbWFnZUNsaWNrSGFuZGxlciQuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnpvb21JbWFnZUNsaWNrSGFuZGxlciQuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgb3BlbkltYWdlKGl0ZW06IEltYWdlR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KGl0ZW0pO1xuICAgIHRoaXMuYWN0aXZlVGh1bWIuZW1pdChpdGVtKTtcbiAgfVxuXG4gIC8qKiBmaW5kIHRoZSBpbmRleCBvZiB0aGUgbWFpbiBtZWRpYSBpbiB0aGUgbGlzdCBvZiBtZWRpYSAqL1xuICBwcm90ZWN0ZWQgZ2V0QWN0aXZlKCk6IG51bWJlciB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5tYWluTWVkaWFDb250YWluZXIudmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYWluTWVkaWFDb250YWluZXIudmFsdWVbMF0udGh1bWJuYWlsPy5nYWxsZXJ5SW5kZXggfHwgMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyPy52YWx1ZT8udGh1bWJuYWlsPy5nYWxsZXJ5SW5kZXggfHwgMDtcbiAgfVxuXG4gIGdldFByZXZpb3VzUHJvZHVjdCh0aHVtYnM6IE9ic2VydmFibGU8SW1hZ2VHcm91cD5bXSk6IE9ic2VydmFibGU8SW1hZ2VHcm91cD4ge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgaWYgKGFjdGl2ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRodW1ic1thY3RpdmVdO1xuICAgIH1cbiAgICByZXR1cm4gdGh1bWJzW2FjdGl2ZSAtIDFdO1xuICB9XG5cbiAgZ2V0TmV4dFByb2R1Y3QodGh1bWJzOiBPYnNlcnZhYmxlPEltYWdlR3JvdXA+W10pOiBPYnNlcnZhYmxlPEltYWdlR3JvdXA+IHtcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIGlmIChhY3RpdmUgPT09IHRodW1icy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdGh1bWJzW2FjdGl2ZV07XG4gICAgfVxuICAgIHJldHVybiB0aHVtYnNbYWN0aXZlICsgMV07XG4gIH1cblxuICAvKipcbiAgICogWm9vbSBpbiBvciBvdXQgb2YgdGhlIGltYWdlXG4gICAqL1xuICB6b29tKCk6IHZvaWQge1xuICAgIHRoaXMuaXNab29tZWQgPSAhdGhpcy5pc1pvb21lZDtcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0gbnVsbDtcbiAgICB0aGlzLmxlZnQgPSAwO1xuICAgIHRoaXMudG9wID0gMDtcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvdWNoIHNjcmVlbiBpbWFnZSBwYW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICB0b3VjaE1vdmUoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIHRoaXMuem9vbWVkSW1hZ2U/Lm5hdGl2ZUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIERPTVJlY3Q7XG4gICAgY29uc3QgaW1hZ2VFbGVtZW50ID0gdGhpcy56b29tZWRJbWFnZT8ubmF0aXZlRWxlbWVudD8uZmlyc3RDaGlsZDtcblxuICAgIGlmICghdGhpcy5zdGFydENvb3Jkcykge1xuICAgICAgdGhpcy5zdGFydENvb3JkcyA9IHsgeDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WSB9O1xuICAgIH1cbiAgICB0aGlzLmxlZnQgKz0gdG91Y2guY2xpZW50WCAtIHRoaXMuc3RhcnRDb29yZHMueDtcbiAgICB0aGlzLnRvcCArPSB0b3VjaC5jbGllbnRZIC0gdGhpcy5zdGFydENvb3Jkcy55O1xuXG4gICAgdGhpcy5tb3ZlSW1hZ2UodGhpcy5sZWZ0LCB0aGlzLnRvcCwgYm91bmRpbmdSZWN0LCBpbWFnZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdGFydENvb3JkcyA9IHsgeDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0b3VjaCBsb2NhdGlvblxuICAgKi9cbiAgY2xlYXJUb3VjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb2ludGVyIGltYWdlIHBhblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHBvaW50ZXJNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIHRoaXMuem9vbWVkSW1hZ2UubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuICAgIGNvbnN0IGltYWdlRWxlbWVudCA9IHRoaXMuem9vbWVkSW1hZ2UubmF0aXZlRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgY29uc3QgeyBwb3NpdGlvblgsIHBvc2l0aW9uWSB9ID0gdGhpcy5jYWxjdWxhdGVQb2ludGVyTW92ZVBvc2l0aW9uKFxuICAgICAgdGhpcy56b29tZWRJbWFnZSxcbiAgICAgIGV2ZW50LmNsaWVudFgsXG4gICAgICBldmVudC5jbGllbnRZXG4gICAgKTtcblxuICAgIHRoaXMubW92ZUltYWdlKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBib3VuZGluZ1JlY3QsIGltYWdlRWxlbWVudCk7XG4gIH1cblxuICBjaGFuZ2VJbWFnZShldmVudDogeyBpbWFnZTogSW1hZ2VHcm91cDsgaW5kZXg6IG51bWJlciB9KTogdm9pZCB7XG4gICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIubmV4dChldmVudC5pbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgb2Zmc2V0IGZyb20gdG91Y2hNb3ZlIG9yIHBvaW50ZXJNb3ZlIHRvIHRoZSBpbWFnZSBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvblhcbiAgICogQHBhcmFtIHBvc2l0aW9uWVxuICAgKiBAcGFyYW0gYm91bmRpbmdSZWN0XG4gICAqIEBwYXJhbSBpbWFnZUVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBtb3ZlSW1hZ2UoXG4gICAgcG9zaXRpb25YOiBudW1iZXIsXG4gICAgcG9zaXRpb25ZOiBudW1iZXIsXG4gICAgYm91bmRpbmdSZWN0OiBhbnksXG4gICAgaW1hZ2VFbGVtZW50OiBET01SZWN0XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5oYW5kbGVPdXRPZkJvdW5kcyhcbiAgICAgIHBvc2l0aW9uWCxcbiAgICAgIHBvc2l0aW9uWSxcbiAgICAgIGltYWdlRWxlbWVudCxcbiAgICAgIGJvdW5kaW5nUmVjdFxuICAgICk7XG5cbiAgICBpZiAoaW1hZ2VFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGltYWdlRWxlbWVudCwgJ2xlZnQnLCB4ICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGltYWdlRWxlbWVudCwgJ3RvcCcsIHkgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2xpY2sgYW5kIGRibGNsaWNrIGV2ZW50IG1hcHBpbmcgZm9yIHRoZSBnaXZlbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGNsaWNrT3JEb3VibGVDbGljayhlbGVtZW50OiBFbGVtZW50UmVmKTogT2JzZXJ2YWJsZTxhbnk+W10ge1xuICAgIHJldHVybiBbXG4gICAgICBmcm9tRXZlbnQoZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5icmVha3BvaW50U2VydmljZS5pc1VwKEJSRUFLUE9JTlQubWQpKSxcbiAgICAgICAgZmlsdGVyKEJvb2xlYW4pXG4gICAgICApLFxuICAgICAgZnJvbUV2ZW50KGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2RibGNsaWNrJykucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuaXNEb3duKEJSRUFLUE9JTlQubGcpKSxcbiAgICAgICAgZmlsdGVyKEJvb2xlYW4pXG4gICAgICApLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIENhcm91c2VsSXRlbXMgZm9yIHRoZSBwcm9kdWN0IHRodW1ibmFpbHMuXG4gICAqIEluIGNhc2UgdGhlcmUgYXJlIGxlc3MgdGhlbiAyIHRodW1icywgd2UgcmV0dXJuIG51bGwuXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVRodW1icyhwcm9kdWN0OiBQcm9kdWN0KTogT2JzZXJ2YWJsZTxUaHVtYm5haWxzR3JvdXA+W10ge1xuICAgIGlmIChcbiAgICAgICFwcm9kdWN0LmltYWdlcyB8fFxuICAgICAgIXByb2R1Y3QuaW1hZ2VzLkdBTExFUlkgfHxcbiAgICAgIHByb2R1Y3QuaW1hZ2VzLkdBTExFUlkubGVuZ3RoIDwgMlxuICAgICkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlczogSW1hZ2VHcm91cFtdID0gcHJvZHVjdC5pbWFnZXMuR0FMTEVSWSBhcyBJbWFnZUdyb3VwW107XG5cbiAgICByZXR1cm4gaW1hZ2VzLm1hcCgoYykgPT4gb2YoeyBjb250YWluZXI6IGMgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRoZSB6b29tIGltYWdlIGZyb20gbGVhdmluZyB0aGUgYm91bmRpbmcgY29udGFpbmVyXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvblhcbiAgICogQHBhcmFtIHBvc2l0aW9uWVxuICAgKiBAcGFyYW0gaW1hZ2VFbGVtZW50XG4gICAqIEBwYXJhbSBib3VuZGluZ1JlY3RcbiAgICovXG4gIGhhbmRsZU91dE9mQm91bmRzKFxuICAgIHBvc2l0aW9uWDogbnVtYmVyLFxuICAgIHBvc2l0aW9uWTogbnVtYmVyLFxuICAgIGltYWdlRWxlbWVudDogYW55LFxuICAgIGJvdW5kaW5nUmVjdDogRE9NUmVjdFxuICApOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHBhZGRpbmdYID0gNjA7XG4gICAgY29uc3QgcGFkZGluZ1kgPSA2MDtcblxuICAgIGlmIChwb3NpdGlvblkgPD0gLWltYWdlRWxlbWVudD8uaGVpZ2h0ICsgcGFkZGluZ1kpIHtcbiAgICAgIHBvc2l0aW9uWSA9IC1pbWFnZUVsZW1lbnQ/LmhlaWdodCArIHBhZGRpbmdZO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25ZID49IGJvdW5kaW5nUmVjdD8uaGVpZ2h0IC0gcGFkZGluZ1kpIHtcbiAgICAgIHBvc2l0aW9uWSA9IGJvdW5kaW5nUmVjdD8uaGVpZ2h0IC0gcGFkZGluZ1k7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBvc2l0aW9uWCA8PVxuICAgICAgLWltYWdlRWxlbWVudD8ud2lkdGggLSBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiArIHBhZGRpbmdYXG4gICAgKSB7XG4gICAgICBwb3NpdGlvblggPSAtaW1hZ2VFbGVtZW50Py53aWR0aCAtIGJvdW5kaW5nUmVjdD8ud2lkdGggLyAyICsgcGFkZGluZ1g7XG4gICAgfVxuICAgIGlmIChwb3NpdGlvblggPj0gaW1hZ2VFbGVtZW50Py53aWR0aCArIGJvdW5kaW5nUmVjdD8ud2lkdGggLyAyIC0gcGFkZGluZ1gpIHtcbiAgICAgIHBvc2l0aW9uWCA9IGltYWdlRWxlbWVudD8ud2lkdGggKyBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiAtIHBhZGRpbmdYO1xuICAgIH1cblxuICAgIHJldHVybiB7IHg6IHBvc2l0aW9uWCwgeTogcG9zaXRpb25ZIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGltYWdlIGJhc2VkIG9uIHRoZSBjdXJzb3IgcG9pbnRlclxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gY2xpZW50WFxuICAgKiBAcGFyYW0gY2xpZW50WVxuICAgKi9cbiAgY2FsY3VsYXRlUG9pbnRlck1vdmVQb3NpdGlvbihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIGNsaWVudFg6IG51bWJlcixcbiAgICBjbGllbnRZOiBudW1iZXJcbiAgKTogeyBwb3NpdGlvblg6IG51bWJlcjsgcG9zaXRpb25ZOiBudW1iZXIgfSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIGVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuXG4gICAgY29uc3QgeCA9IGNsaWVudFggLSBib3VuZGluZ1JlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gY2xpZW50WSAtIGJvdW5kaW5nUmVjdC50b3A7XG5cbiAgICBjb25zdCBwb3NpdGlvblggPSAteCArIGVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCAvIDI7XG4gICAgY29uc3QgcG9zaXRpb25ZID0gLXkgKyBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgIHJldHVybiB7IHBvc2l0aW9uWCwgcG9zaXRpb25ZIH07XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJtYWluSW1hZ2UkIHwgYXN5bmMgYXMgbWFpblwiPlxuICA8ZGl2IGNsYXNzPVwiY3gtbWFpbi1pbWFnZS1ncm91cFwiICpuZ0lmPVwidGh1bWJuYWlscyQgfCBhc3luYyBhcyB0aHVtYnNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtbmF2aWdhdGUtaW1hZ2VcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIlxuICAgICAgICAqbmdJZj1cImdldFByZXZpb3VzUHJvZHVjdCh0aHVtYnMpIHwgYXN5bmMgYXMgcHJldmlvdXNQcm9kdWN0XCJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5JbWFnZShwcmV2aW91c1Byb2R1Y3QuY29udGFpbmVyKVwiXG4gICAgICA+XG4gICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkNBUkVUX0xFRlRcIj48L2N4LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8Y3gtbWVkaWFcbiAgICAgICNkZWZhdWx0SW1hZ2VcbiAgICAgIGNsYXNzPVwiY3gtZGVmYXVsdC1pbWFnZS16b29tXCJcbiAgICAgICpuZ0lmPVwiIWlzWm9vbWVkXCJcbiAgICAgIFtjb250YWluZXJdPVwibWFpblwiXG4gICAgPlxuICAgIDwvY3gtbWVkaWE+XG4gICAgPGRpdiAjem9vbUNvbnRhaW5lciBjbGFzcz1cImN4LXpvb20tY29udGFpbmVyXCIgKm5nSWY9XCJpc1pvb21lZFwiPlxuICAgICAgPGN4LW1lZGlhXG4gICAgICAgICN6b29tZWRJbWFnZVxuICAgICAgICBjbGFzcz1cImN4LWltYWdlLXpvb21lZFwiXG4gICAgICAgIFtjb250YWluZXJdPVwibWFpblwiXG4gICAgICAgIChtb3VzZW1vdmUpPVwicG9pbnRlck1vdmUoJGV2ZW50KVwiXG4gICAgICAgICh0b3VjaG1vdmUpPVwidG91Y2hNb3ZlKCRldmVudClcIlxuICAgICAgICAodG91Y2hlbmQpPVwiY2xlYXJUb3VjaCgpXCJcbiAgICAgID5cbiAgICAgIDwvY3gtbWVkaWE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImN4LW5hdmlnYXRlLWltYWdlXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcbiAgICAgICAgKm5nSWY9XCJnZXROZXh0UHJvZHVjdCh0aHVtYnMpIHwgYXN5bmMgYXMgbmV4dFByb2R1Y3RcIlxuICAgICAgICAoY2xpY2spPVwib3BlbkltYWdlKG5leHRQcm9kdWN0LmNvbnRhaW5lcilcIlxuICAgICAgPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5DQVJFVF9SSUdIVFwiPjwvY3gtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48Y3gtcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHNcbiAgW3RodW1icyRdPVwidGh1bWJuYWlscyRcIlxuICBbYWN0aXZlVGh1bWJdPVwiYWN0aXZlVGh1bWJcIlxuICAocHJvZHVjdEltYWdlKT1cImNoYW5nZUltYWdlKCRldmVudClcIlxuPjwvY3gtcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHM+XG4iXX0=