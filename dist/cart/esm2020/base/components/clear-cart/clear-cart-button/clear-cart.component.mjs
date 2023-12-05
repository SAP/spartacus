/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class ClearCartComponent {
    constructor(activeCartFacade, vcr, launchDialogService) {
        this.activeCartFacade = activeCartFacade;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.cart$ = this.activeCartFacade.getActive();
        this.subscription = new Subscription();
    }
    openDialog(event) {
        const dialog = this.launchDialogService.openDialog("CLEAR_CART" /* LAUNCH_CALLER.CLEAR_CART */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
        event.stopPropagation();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ClearCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i0.ViewContainerRef }, { token: i2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ClearCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ClearCartComponent, selector: "cx-clear-cart", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div *ngIf=\"cart.totalItems > 0\" class=\"clear-cart-wrapper\">\n    <button\n      #element\n      (click)=\"openDialog($event)\"\n      class=\"btn btn-tertiary clear-cart-btn\"\n      type=\"button\"\n    >\n      {{ 'clearCart.clearCart' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-clear-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div *ngIf=\"cart.totalItems > 0\" class=\"clear-cart-wrapper\">\n    <button\n      #element\n      (click)=\"openDialog($event)\"\n      class=\"btn btn-tertiary clear-cart-btn\"\n      type=\"button\"\n    >\n      {{ 'clearCart.clearCart' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i0.ViewContainerRef }, { type: i2.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvY2xlYXItY2FydC9jbGVhci1jYXJ0LWJ1dHRvbi9jbGVhci1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jbGVhci1jYXJ0L2NsZWFyLWNhcnQtYnV0dG9uL2NsZWFyLWNhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBT3RDLE1BQU0sT0FBTyxrQkFBa0I7SUFPN0IsWUFDWSxnQkFBa0MsRUFDbEMsR0FBcUIsRUFDckIsbUJBQXdDO1FBRnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVRwRCxVQUFLLEdBQXFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVsRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFRekMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLDhDQUVoRCxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzsrR0E3QlUsa0JBQWtCO21HQUFsQixrQkFBa0IseUpDeEIvQixtV0FZQTsyRkRZYSxrQkFBa0I7a0JBTDlCLFNBQVM7K0JBQ0UsZUFBZSxtQkFFUix1QkFBdUIsQ0FBQyxNQUFNO3dLQU96QixPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIENhcnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY2xlYXItY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jbGVhci1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENsZWFyQ2FydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNhcnQkOiBPYnNlcnZhYmxlPENhcnQ+ID0gdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmdldEFjdGl2ZSgpO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgQFZpZXdDaGlsZCgnZWxlbWVudCcpIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApIHt9XG5cbiAgb3BlbkRpYWxvZyhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZyhcbiAgICAgIExBVU5DSF9DQUxMRVIuQ0xFQVJfQ0FSVCxcbiAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgIHRoaXMudmNyXG4gICAgKTtcbiAgICBpZiAoZGlhbG9nKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjYXJ0JCB8IGFzeW5jIGFzIGNhcnRcIj5cbiAgPGRpdiAqbmdJZj1cImNhcnQudG90YWxJdGVtcyA+IDBcIiBjbGFzcz1cImNsZWFyLWNhcnQtd3JhcHBlclwiPlxuICAgIDxidXR0b25cbiAgICAgICNlbGVtZW50XG4gICAgICAoY2xpY2spPVwib3BlbkRpYWxvZygkZXZlbnQpXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi10ZXJ0aWFyeSBjbGVhci1jYXJ0LWJ0blwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICA+XG4gICAgICB7eyAnY2xlYXJDYXJ0LmNsZWFyQ2FydCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19