/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
export class ProductImageZoomTriggerComponent {
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
ProductImageZoomTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomTriggerComponent, selector: "cx-product-image-zoom-trigger", inputs: { galleryIndex: "galleryIndex", expandImage: "expandImage" }, outputs: { dialogClose: "dialogClose" }, viewQueries: [{ propertyName: "expandButton", first: true, predicate: ["expandButton"], descendants: true }], ngImport: i0, template: "<button\n  #expandButton\n  class=\"btn btn-link cx-action-link\"\n  (click)=\"triggerZoom()\"\n>\n  <span>\n    {{ 'productImageZoomTrigger.expand' | cxTranslate }}\n    <cx-icon [type]=\"iconType.EXPAND_ARROWS\"></cx-icon\n  ></span>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXRyaWdnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyL3Byb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFNBQVMsR0FHVixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFRN0MsTUFBTSxPQUFPLGdDQUFnQztJQVEzQyxJQUFhLFdBQVcsQ0FBQyxNQUFlO1FBQ3RDLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUlELFlBQ1ksbUJBQXdDLEVBQ3hDLEdBQXFCO1FBRHJCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFqQmpDLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDWCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFZbkMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBSzlDLENBQUM7SUFFSixXQUFXO1FBQ1QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sOERBRS9DLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzdELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUVuQixJQUNELENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUM3QztZQUNILENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyw2REFBa0MsQ0FBQztnQkFDakUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FDSDtpQkFDQSxTQUFTLEVBQUUsQ0FDZixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NkhBcERVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLGtTQ2hDN0MsMFBBVUE7MkZEc0JhLGdDQUFnQztrQkFMNUMsU0FBUzsrQkFDRSwrQkFBK0IsbUJBRXhCLHVCQUF1QixDQUFDLE1BQU07eUlBT3BCLFlBQVk7c0JBQXRDLFNBQVM7dUJBQUMsY0FBYztnQkFFaEIsWUFBWTtzQkFBcEIsS0FBSztnQkFDTyxXQUFXO3NCQUF2QixLQUFLO2dCQU1JLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgSUNPTl9UWVBFLFxuICBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICBMQVVOQ0hfQ0FMTEVSLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFByb2R1Y3RJbWFnZVpvb21EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9wcm9kdWN0LWltYWdlLXpvb20tZGlhbG9nL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcHJvZHVjdC1pbWFnZS16b29tLXRyaWdnZXInLFxuICB0ZW1wbGF0ZVVybDogJ3Byb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVpvb21UcmlnZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaWNvblR5cGUgPSBJQ09OX1RZUEU7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIC8vRXhwb3NlIHRoZSBleHBhbmQgYnV0dG9uIHNvIGl0IGNhbiBnYWluIGZvY3VzIG9uIGNsb3NpbmcgdGhlIHpvb20gd2luZG93XG4gIEBWaWV3Q2hpbGQoJ2V4cGFuZEJ1dHRvbicpIGV4cGFuZEJ1dHRvbjogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBnYWxsZXJ5SW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgc2V0IGV4cGFuZEltYWdlKGV4cGFuZDogYm9vbGVhbikge1xuICAgIGlmIChleHBhbmQpIHtcbiAgICAgIHRoaXMudHJpZ2dlclpvb20oKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgZGlhbG9nQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGxhdW5jaERpYWxvZ1NlcnZpY2U6IExhdW5jaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgdHJpZ2dlclpvb20oKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmxhdW5jaChcbiAgICAgIExBVU5DSF9DQUxMRVIuUFJPRFVDVF9JTUFHRV9aT09NLFxuICAgICAgdGhpcy52Y3JcbiAgICApO1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoW2NvbXBvbmVudCwgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmRpYWxvZ0Nsb3NlXSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgoW2NvbXBdKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmdhbGxlcnlJbmRleCkge1xuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGNvbXAgYXMgQ29tcG9uZW50UmVmPFByb2R1Y3RJbWFnZVpvb21EaWFsb2dDb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgKS5pbnN0YW5jZS5nYWxsZXJ5SW5kZXggPSB0aGlzLmdhbGxlcnlJbmRleDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmaWx0ZXIoKFssIGNsb3NlXSkgPT4gQm9vbGVhbihjbG9zZSkpLFxuICAgICAgICAgICAgdGFwKChbY29tcF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsZWFyKExBVU5DSF9DQUxMRVIuUFJPRFVDVF9JTUFHRV9aT09NKTtcbiAgICAgICAgICAgICAgY29tcD8uZGVzdHJveSgpO1xuICAgICAgICAgICAgICB0aGlzLmRpYWxvZ0Nsb3NlLmVtaXQoKTtcbiAgICAgICAgICAgICAgdGhpcy5leHBhbmRCdXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gICNleHBhbmRCdXR0b25cbiAgY2xhc3M9XCJidG4gYnRuLWxpbmsgY3gtYWN0aW9uLWxpbmtcIlxuICAoY2xpY2spPVwidHJpZ2dlclpvb20oKVwiXG4+XG4gIDxzcGFuPlxuICAgIHt7ICdwcm9kdWN0SW1hZ2Vab29tVHJpZ2dlci5leHBhbmQnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5FWFBBTkRfQVJST1dTXCI+PC9jeC1pY29uXG4gID48L3NwYW4+XG48L2J1dHRvbj5cbiJdfQ==