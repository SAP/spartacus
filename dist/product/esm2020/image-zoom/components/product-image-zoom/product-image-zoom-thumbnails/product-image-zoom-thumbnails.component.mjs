/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
export class ProductImageZoomThumbnailsComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdGh1bWJuYWlscy9wcm9kdWN0LWltYWdlLXpvb20tdGh1bWJuYWlscy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzL3Byb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU83QyxNQUFNLE9BQU8sbUNBQW1DO0lBYTlDO1FBWlEsdUJBQWtCLEdBQUcsSUFBSSxlQUFlLENBQWEsRUFBRSxDQUFDLENBQUM7UUFFdkQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUMsQ0FBQztRQU1qRSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLMUMsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFpQjtRQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNuRTtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsU0FBcUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNoRCxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDLFNBQXFCLEVBQUUsRUFBRTtZQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHO2dCQUN6QixTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUc7Z0JBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnSUE3Q1UsbUNBQW1DO29IQUFuQyxtQ0FBbUMsK0tDekJoRCxpZ0JBb0JBOzJGREthLG1DQUFtQztrQkFML0MsU0FBUzsrQkFDRSxrQ0FBa0MsbUJBRTNCLHVCQUF1QixDQUFDLE1BQU07MEVBS3JDLFlBQVk7c0JBQXJCLE1BQU07Z0JBRUUsT0FBTztzQkFBZixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlR3JvdXAsIGlzTm90TnVsbGFibGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVGh1bWJuYWlsc0dyb3VwIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0L2ltYWdlLXpvb20vcm9vdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVpvb21UaHVtYm5haWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG1haW5NZWRpYUNvbnRhaW5lciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SW1hZ2VHcm91cD4oe30pO1xuXG4gIEBPdXRwdXQoKSBwcm9kdWN0SW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaW1hZ2U6IGFueTsgaW5kZXg6IG51bWJlciB9PigpO1xuXG4gIEBJbnB1dCgpIHRodW1icyQ6IE9ic2VydmFibGU8VGh1bWJuYWlsc0dyb3VwW10+O1xuXG4gIEBJbnB1dCgpIGFjdGl2ZVRodW1iOiBFdmVudEVtaXR0ZXI8SW1hZ2VHcm91cD47XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuYWN0aXZlVGh1bWIuc3Vic2NyaWJlKChpbWFnZSkgPT4ge1xuICAgICAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KGltYWdlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG9wZW5JbWFnZShpbWFnZTogSW1hZ2VHcm91cCk6IHZvaWQge1xuICAgIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyLm5leHQoaW1hZ2UpO1xuICAgIGlmICh0eXBlb2YgaW1hZ2Uuem9vbT8uZ2FsbGVyeUluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wcm9kdWN0SW1hZ2UuZW1pdCh7IGltYWdlLCBpbmRleDogaW1hZ2Uuem9vbS5nYWxsZXJ5SW5kZXggfSk7XG4gICAgfVxuICB9XG5cbiAgaXNBY3RpdmUodGh1bWJuYWlsOiBJbWFnZUdyb3VwKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoaXNOb3ROdWxsYWJsZSksXG4gICAgICBtYXAoKGNvbnRhaW5lcjogSW1hZ2VHcm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gKGNvbnRhaW5lci56b29tPy51cmwgJiZcbiAgICAgICAgICB0aHVtYm5haWwuem9vbT8udXJsICYmXG4gICAgICAgICAgY29udGFpbmVyLnpvb20udXJsID09PSB0aHVtYm5haWwuem9vbS51cmwpIGFzIGJvb2xlYW47XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwidGh1bWJzJCB8IGFzeW5jIGFzIHRodW1ic1wiPlxuICA8Y3gtY2Fyb3VzZWxcbiAgICAqbmdJZj1cInRodW1icy5sZW5ndGhcIlxuICAgIGNsYXNzPVwidGh1bWJzXCJcbiAgICBbaXRlbXNdPVwidGh1bWJzXCJcbiAgICBpdGVtV2lkdGg9XCI3MHB4XCJcbiAgICBbaGlkZUluZGljYXRvcnNdPVwiZmFsc2VcIlxuICAgIFt0ZW1wbGF0ZV09XCJ0aHVtYlwiXG4gID48L2N4LWNhcm91c2VsPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjdGh1bWIgbGV0LWl0ZW09XCJpdGVtXCI+XG4gIDxjeC1tZWRpYVxuICAgIFtjb250YWluZXJdPVwiaXRlbS5jb250YWluZXJcIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgKGZvY3VzKT1cIm9wZW5JbWFnZShpdGVtLmNvbnRhaW5lcilcIlxuICAgIFtjbGFzcy5pcy1hY3RpdmVdPVwiaXNBY3RpdmUoaXRlbS5jb250YWluZXIpIHwgYXN5bmNcIlxuICA+XG4gIDwvY3gtbWVkaWE+XG48L25nLXRlbXBsYXRlPlxuIl19