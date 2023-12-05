/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, HostListener, } from '@angular/core';
import { cartWithIdAndUserId, } from '@spartacus/pickup-in-store/root';
import { ICON_TYPE, } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/pickup-in-store/root";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
import * as i5 from "../store-list/store-list.component";
import * as i6 from "../store-search/store-search.component";
import * as i7 from "@spartacus/core";
/**
 * The dialog box to select the pickup location for a product.
 */
export class PickupOptionDialogComponent {
    constructor(activeCartFacade, elementRef, intendedPickupLocationService, launchDialogService, pickupLocationsSearchService, pickupOptionFacade) {
        this.activeCartFacade = activeCartFacade;
        this.elementRef = elementRef;
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.launchDialogService = launchDialogService;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.pickupOptionFacade = pickupOptionFacade;
        this.subscription = new Subscription();
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'input',
            focusOnEscape: true,
        };
        this.ICON_TYPE = ICON_TYPE;
        /** The reason given closing the dialog window without selecting a location */
        this.CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
        /** The reason given closing the dialog window after selecting a location */
        this.LOCATION_SELECTED = 'LOCATION_SELECTED';
        // Intentional empty constructor
    }
    handleClick(event) {
        if (event.target.tagName === this.elementRef.nativeElement.tagName) {
            this.close(this.CLOSE_WITHOUT_SELECTION);
        }
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe(({ productCode, entryNumber, quantity }) => {
            this.productCode = productCode;
            this.entryNumber = entryNumber;
            this.quantity = quantity;
        }));
        this.getHideOutOfStockState$ =
            this.pickupLocationsSearchService.getHideOutOfStock();
        this.subscription.add(this.pickupOptionFacade
            .getPageContext()
            .subscribe((_data) => (this.isPDP = _data === 'PDP')));
        this.subscription.add(this.activeCartFacade
            .getActive()
            .pipe(filter(cartWithIdAndUserId), tap((cart) => {
            this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
            this.userId = cart.user.uid;
        }))
            .subscribe());
    }
    /**
     * Find the pickup points of service nearest to a place based on given search parameters.
     * @param locationSearchParams The latitude and longitude or free text search query to be used
     */
    onFindStores(locationSearchParams) {
        this.pickupLocationsSearchService.startSearch({
            productCode: this.productCode,
            ...locationSearchParams,
        });
    }
    /**
     * Toggle whether locations without store should be shown or hidden.
     */
    onHideOutOfStock() {
        this.pickupLocationsSearchService.toggleHideOutOfStock();
    }
    /**
     * Close the dialog window. This has additional side effects based upon whether
     * we are making a selection on the PDP or in the cart/during checkout.
     *
     * On the PDP:
     *
     * If the dialog is closed without making a selection, then the radio buttons
     * are left on pickup if there already exists an intended pickup location or
     * to delivery if not.
     *
     * Not on the PDP:
     *
     * If the window is closed after making a selection, then the cart is updated
     * to the the new selection.
     *
     * @param reason The reason the dialog window was closed
     */
    close(reason) {
        this.launchDialogService.closeDialog(reason);
        if (reason === this.CLOSE_WITHOUT_SELECTION) {
            this.intendedPickupLocationService
                .getIntendedLocation(this.productCode)
                .pipe(filter((store) => typeof store !== 'undefined'), map((store) => store), filter((store) => !store.name), take(1), tap(() => this.intendedPickupLocationService.setPickupOption(this.productCode, 'delivery')))
                .subscribe();
            this.pickupOptionFacade.setPickupOption(this.entryNumber, 'delivery');
            return;
        }
        this.subscription.add(this.intendedPickupLocationService
            .getIntendedLocation(this.productCode)
            .pipe(filter((store) => !this.isPDP && !!store), tap((store) => this.activeCartFacade.updateEntry(this.entryNumber, this.quantity, store.name, false)))
            .subscribe());
    }
    /**
     * Change if the loading spinner should be displayed or not.
     * @param showSpinner Whether the loading spinner should be displayed
     */
    showSpinner(showSpinner) {
        this.loading = showSpinner;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
PickupOptionDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i0.ElementRef }, { token: i2.IntendedPickupLocationFacade }, { token: i3.LaunchDialogService }, { token: i2.PickupLocationsSearchFacade }, { token: i2.PickupOptionFacade }], target: i0.ɵɵFactoryTarget.Component });
PickupOptionDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupOptionDialogComponent, selector: "cx-pickup-option-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  class=\"cx-pickup-option-dialog cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close(CLOSE_WITHOUT_SELECTION)\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  aria-labelledby=\"cx-pickup-option-dialog-title\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-dialog-header\">\n      <div id=\"cx-pickup-option-dialog-title\" class=\"cx-dialog-title\">\n        {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}\n      </div>\n\n      <button\n        (click)=\"close(CLOSE_WITHOUT_SELECTION)\"\n        class=\"cx-dialog-close close\"\n        [attr.aria-label]=\"'pickupOptionDialog.close' | cxTranslate\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"ICON_TYPE.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <section class=\"cx-dialog-body modal-body\">\n      <cx-store-search\n        [hideOutOfStock]=\"getHideOutOfStockState$ | async\"\n        (findStores)=\"onFindStores($event)\"\n        (showSpinner)=\"showSpinner($event)\"\n        (eventHideOutOfStock)=\"onHideOutOfStock()\"\n      ></cx-store-search>\n      <cx-store-list\n        [productCode]=\"productCode\"\n        (storeSelected)=\"close(LOCATION_SELECTED)\"\n      ></cx-store-list>\n      <div *ngIf=\"loading\">\n        <div class=\"cx-spinner\">\n          <cx-spinner></cx-spinner>\n        </div>\n      </div>\n    </section>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i5.StoreListComponent, selector: "cx-store-list", inputs: ["productCode"], outputs: ["storeSelected"] }, { kind: "component", type: i6.StoreSearchComponent, selector: "cx-store-search", inputs: ["hideOutOfStock"], outputs: ["eventHideOutOfStock", "findStores", "showSpinner"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-option-dialog', template: "<div\n  class=\"cx-pickup-option-dialog cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close(CLOSE_WITHOUT_SELECTION)\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  aria-labelledby=\"cx-pickup-option-dialog-title\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-dialog-header\">\n      <div id=\"cx-pickup-option-dialog-title\" class=\"cx-dialog-title\">\n        {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}\n      </div>\n\n      <button\n        (click)=\"close(CLOSE_WITHOUT_SELECTION)\"\n        class=\"cx-dialog-close close\"\n        [attr.aria-label]=\"'pickupOptionDialog.close' | cxTranslate\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"ICON_TYPE.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <section class=\"cx-dialog-body modal-body\">\n      <cx-store-search\n        [hideOutOfStock]=\"getHideOutOfStockState$ | async\"\n        (findStores)=\"onFindStores($event)\"\n        (showSpinner)=\"showSpinner($event)\"\n        (eventHideOutOfStock)=\"onHideOutOfStock()\"\n      ></cx-store-search>\n      <cx-store-list\n        [productCode]=\"productCode\"\n        (storeSelected)=\"close(LOCATION_SELECTED)\"\n      ></cx-store-list>\n      <div *ngIf=\"loading\">\n        <div class=\"cx-spinner\">\n          <cx-spinner></cx-spinner>\n        </div>\n      </div>\n    </section>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i0.ElementRef }, { type: i2.IntendedPickupLocationFacade }, { type: i3.LaunchDialogService }, { type: i2.PickupLocationsSearchFacade }, { type: i2.PickupOptionFacade }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLW9wdGlvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL2NvbnRhaW5lci9waWNrdXAtb3B0aW9uLWRpYWxvZy9waWNrdXAtb3B0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3BpY2t1cC1vcHRpb24tZGlhbG9nL3BpY2t1cC1vcHRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBRUwsbUJBQW1CLEdBS3BCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUVMLFNBQVMsR0FFVixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFFeEQ7O0dBRUc7QUFLSCxNQUFNLE9BQU8sMkJBQTJCO0lBd0J0QyxZQUNZLGdCQUFrQyxFQUNsQyxVQUFzQixFQUN0Qiw2QkFBMkQsRUFDM0QsbUJBQXdDLEVBQ3hDLDRCQUF5RCxFQUN6RCxrQkFBc0M7UUFMdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBOEI7UUFDM0Qsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQ0FBNEIsR0FBNUIsNEJBQTRCLENB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Q0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7O3dIQXZLVSwyQkFBMkI7NEdBQTNCLDJCQUEyQix3SEN0Q3hDLGsrQ0ErQ0E7MkZEVGEsMkJBQTJCO2tCQUp2QyxTQUFTOytCQUNFLHlCQUF5Qjt3UkF1Q25DLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXVnbWVudGVkUG9pbnRPZlNlcnZpY2UsXG4gIGNhcnRXaXRoSWRBbmRVc2VySWQsXG4gIEludGVuZGVkUGlja3VwTG9jYXRpb25GYWNhZGUsXG4gIExvY2F0aW9uU2VhcmNoUGFyYW1zLFxuICBQaWNrdXBMb2NhdGlvbnNTZWFyY2hGYWNhZGUsXG4gIFBpY2t1cE9wdGlvbkZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9waWNrdXAtaW4tc3RvcmUvcm9vdCc7XG5pbXBvcnQge1xuICBGb2N1c0NvbmZpZyxcbiAgSUNPTl9UWVBFLFxuICBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVGhlIGRpYWxvZyBib3ggdG8gc2VsZWN0IHRoZSBwaWNrdXAgbG9jYXRpb24gZm9yIGEgcHJvZHVjdC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcGlja3VwLW9wdGlvbi1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGlja3VwLW9wdGlvbi1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBQaWNrdXBPcHRpb25EaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb2R1Y3RDb2RlOiBzdHJpbmc7XG4gIGVudHJ5TnVtYmVyOiBudW1iZXI7XG4gIHF1YW50aXR5OiBudW1iZXI7XG4gIGdldEhpZGVPdXRPZlN0b2NrU3RhdGUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIGlzUERQOiBib29sZWFuO1xuICBjYXJ0SWQ6IHN0cmluZztcbiAgdXNlcklkOiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgZm9jdXNDb25maWc6IEZvY3VzQ29uZmlnID0ge1xuICAgIHRyYXA6IHRydWUsXG4gICAgYmxvY2s6IHRydWUsXG4gICAgYXV0b2ZvY3VzOiAnaW5wdXQnLFxuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gIH07XG5cbiAgcmVhZG9ubHkgSUNPTl9UWVBFID0gSUNPTl9UWVBFO1xuICAvKiogVGhlIHJlYXNvbiBnaXZlbiBjbG9zaW5nIHRoZSBkaWFsb2cgd2luZG93IHdpdGhvdXQgc2VsZWN0aW5nIGEgbG9jYXRpb24gKi9cbiAgcmVhZG9ubHkgQ0xPU0VfV0lUSE9VVF9TRUxFQ1RJT04gPSAnQ0xPU0VfV0lUSE9VVF9TRUxFQ1RJT04nO1xuICAvKiogVGhlIHJlYXNvbiBnaXZlbiBjbG9zaW5nIHRoZSBkaWFsb2cgd2luZG93IGFmdGVyIHNlbGVjdGluZyBhIGxvY2F0aW9uICovXG4gIHJlYWRvbmx5IExPQ0FUSU9OX1NFTEVDVEVEID0gJ0xPQ0FUSU9OX1NFTEVDVEVEJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgaW50ZW5kZWRQaWNrdXBMb2NhdGlvblNlcnZpY2U6IEludGVuZGVkUGlja3VwTG9jYXRpb25GYWNhZGUsXG4gICAgcHJvdGVjdGVkIGxhdW5jaERpYWxvZ1NlcnZpY2U6IExhdW5jaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBpY2t1cExvY2F0aW9uc1NlYXJjaFNlcnZpY2U6IFBpY2t1cExvY2F0aW9uc1NlYXJjaEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcGlja3VwT3B0aW9uRmFjYWRlOiBQaWNrdXBPcHRpb25GYWNhZGVcbiAgKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIGFueSkudGFnTmFtZSA9PT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZVxuICAgICkge1xuICAgICAgdGhpcy5jbG9zZSh0aGlzLkNMT1NFX1dJVEhPVVRfU0VMRUNUSU9OKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2UuZGF0YSQuc3Vic2NyaWJlKFxuICAgICAgICAoeyBwcm9kdWN0Q29kZSwgZW50cnlOdW1iZXIsIHF1YW50aXR5IH0pID0+IHtcbiAgICAgICAgICB0aGlzLnByb2R1Y3RDb2RlID0gcHJvZHVjdENvZGU7XG4gICAgICAgICAgdGhpcy5lbnRyeU51bWJlciA9IGVudHJ5TnVtYmVyO1xuICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLmdldEhpZGVPdXRPZlN0b2NrU3RhdGUkID1cbiAgICAgIHRoaXMucGlja3VwTG9jYXRpb25zU2VhcmNoU2VydmljZS5nZXRIaWRlT3V0T2ZTdG9jaygpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5waWNrdXBPcHRpb25GYWNhZGVcbiAgICAgICAgLmdldFBhZ2VDb250ZXh0KClcbiAgICAgICAgLnN1YnNjcmliZSgoX2RhdGEpID0+ICh0aGlzLmlzUERQID0gX2RhdGEgPT09ICdQRFAnKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoY2FydFdpdGhJZEFuZFVzZXJJZCksXG4gICAgICAgICAgdGFwKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcnRJZCA9IGNhcnQudXNlci51aWQgPT09ICdhbm9ueW1vdXMnID8gY2FydC5ndWlkIDogY2FydC5jb2RlO1xuICAgICAgICAgICAgdGhpcy51c2VySWQgPSBjYXJ0LnVzZXIudWlkO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBwaWNrdXAgcG9pbnRzIG9mIHNlcnZpY2UgbmVhcmVzdCB0byBhIHBsYWNlIGJhc2VkIG9uIGdpdmVuIHNlYXJjaCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0gbG9jYXRpb25TZWFyY2hQYXJhbXMgVGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgb3IgZnJlZSB0ZXh0IHNlYXJjaCBxdWVyeSB0byBiZSB1c2VkXG4gICAqL1xuICBvbkZpbmRTdG9yZXMobG9jYXRpb25TZWFyY2hQYXJhbXM6IExvY2F0aW9uU2VhcmNoUGFyYW1zKTogdm9pZCB7XG4gICAgdGhpcy5waWNrdXBMb2NhdGlvbnNTZWFyY2hTZXJ2aWNlLnN0YXJ0U2VhcmNoKHtcbiAgICAgIHByb2R1Y3RDb2RlOiB0aGlzLnByb2R1Y3RDb2RlLFxuICAgICAgLi4ubG9jYXRpb25TZWFyY2hQYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHdoZXRoZXIgbG9jYXRpb25zIHdpdGhvdXQgc3RvcmUgc2hvdWxkIGJlIHNob3duIG9yIGhpZGRlbi5cbiAgICovXG4gIG9uSGlkZU91dE9mU3RvY2soKTogdm9pZCB7XG4gICAgdGhpcy5waWNrdXBMb2NhdGlvbnNTZWFyY2hTZXJ2aWNlLnRvZ2dsZUhpZGVPdXRPZlN0b2NrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIGRpYWxvZyB3aW5kb3cuIFRoaXMgaGFzIGFkZGl0aW9uYWwgc2lkZSBlZmZlY3RzIGJhc2VkIHVwb24gd2hldGhlclxuICAgKiB3ZSBhcmUgbWFraW5nIGEgc2VsZWN0aW9uIG9uIHRoZSBQRFAgb3IgaW4gdGhlIGNhcnQvZHVyaW5nIGNoZWNrb3V0LlxuICAgKlxuICAgKiBPbiB0aGUgUERQOlxuICAgKlxuICAgKiBJZiB0aGUgZGlhbG9nIGlzIGNsb3NlZCB3aXRob3V0IG1ha2luZyBhIHNlbGVjdGlvbiwgdGhlbiB0aGUgcmFkaW8gYnV0dG9uc1xuICAgKiBhcmUgbGVmdCBvbiBwaWNrdXAgaWYgdGhlcmUgYWxyZWFkeSBleGlzdHMgYW4gaW50ZW5kZWQgcGlja3VwIGxvY2F0aW9uIG9yXG4gICAqIHRvIGRlbGl2ZXJ5IGlmIG5vdC5cbiAgICpcbiAgICogTm90IG9uIHRoZSBQRFA6XG4gICAqXG4gICAqIElmIHRoZSB3aW5kb3cgaXMgY2xvc2VkIGFmdGVyIG1ha2luZyBhIHNlbGVjdGlvbiwgdGhlbiB0aGUgY2FydCBpcyB1cGRhdGVkXG4gICAqIHRvIHRoZSB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVhc29uIHRoZSBkaWFsb2cgd2luZG93IHdhcyBjbG9zZWRcbiAgICovXG4gIGNsb3NlKHJlYXNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gICAgaWYgKHJlYXNvbiA9PT0gdGhpcy5DTE9TRV9XSVRIT1VUX1NFTEVDVElPTikge1xuICAgICAgdGhpcy5pbnRlbmRlZFBpY2t1cExvY2F0aW9uU2VydmljZVxuICAgICAgICAuZ2V0SW50ZW5kZWRMb2NhdGlvbih0aGlzLnByb2R1Y3RDb2RlKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAoc3RvcmU6IEF1Z21lbnRlZFBvaW50T2ZTZXJ2aWNlIHwgdW5kZWZpbmVkKSA9PlxuICAgICAgICAgICAgICB0eXBlb2Ygc3RvcmUgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtYXAoKHN0b3JlKSA9PiBzdG9yZSBhcyBBdWdtZW50ZWRQb2ludE9mU2VydmljZSksXG4gICAgICAgICAgZmlsdGVyKChzdG9yZSkgPT4gIXN0b3JlLm5hbWUpLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgdGFwKCgpID0+XG4gICAgICAgICAgICB0aGlzLmludGVuZGVkUGlja3VwTG9jYXRpb25TZXJ2aWNlLnNldFBpY2t1cE9wdGlvbihcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgJ2RlbGl2ZXJ5J1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnBpY2t1cE9wdGlvbkZhY2FkZS5zZXRQaWNrdXBPcHRpb24odGhpcy5lbnRyeU51bWJlciwgJ2RlbGl2ZXJ5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuaW50ZW5kZWRQaWNrdXBMb2NhdGlvblNlcnZpY2VcbiAgICAgICAgLmdldEludGVuZGVkTG9jYXRpb24odGhpcy5wcm9kdWN0Q29kZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChzdG9yZSkgPT4gIXRoaXMuaXNQRFAgJiYgISFzdG9yZSksXG4gICAgICAgICAgdGFwKChzdG9yZSkgPT5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS51cGRhdGVFbnRyeShcbiAgICAgICAgICAgICAgdGhpcy5lbnRyeU51bWJlcixcbiAgICAgICAgICAgICAgdGhpcy5xdWFudGl0eSxcbiAgICAgICAgICAgICAgKHN0b3JlIGFzIEF1Z21lbnRlZFBvaW50T2ZTZXJ2aWNlKS5uYW1lIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgaWYgdGhlIGxvYWRpbmcgc3Bpbm5lciBzaG91bGQgYmUgZGlzcGxheWVkIG9yIG5vdC5cbiAgICogQHBhcmFtIHNob3dTcGlubmVyIFdoZXRoZXIgdGhlIGxvYWRpbmcgc3Bpbm5lciBzaG91bGQgYmUgZGlzcGxheWVkXG4gICAqL1xuICBzaG93U3Bpbm5lcihzaG93U3Bpbm5lcjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IHNob3dTcGlubmVyO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICBjbGFzcz1cImN4LXBpY2t1cC1vcHRpb24tZGlhbG9nIGN4LW1vZGFsLWNvbnRhaW5lclwiXG4gIFtjeEZvY3VzXT1cImZvY3VzQ29uZmlnXCJcbiAgKGVzYyk9XCJjbG9zZShDTE9TRV9XSVRIT1VUX1NFTEVDVElPTilcIlxuICByb2xlPVwiZGlhbG9nXCJcbiAgYXJpYS1tb2RhbD1cInRydWVcIlxuICBhcmlhLWxhYmVsbGVkYnk9XCJjeC1waWNrdXAtb3B0aW9uLWRpYWxvZy10aXRsZVwiXG4+XG4gIDxkaXYgY2xhc3M9XCJjeC1kaWFsb2ctY29udGVudFwiPlxuICAgIDwhLS0gTW9kYWwgSGVhZGVyIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgY3gtZGlhbG9nLWhlYWRlclwiPlxuICAgICAgPGRpdiBpZD1cImN4LXBpY2t1cC1vcHRpb24tZGlhbG9nLXRpdGxlXCIgY2xhc3M9XCJjeC1kaWFsb2ctdGl0bGVcIj5cbiAgICAgICAge3sgJ3BpY2t1cE9wdGlvbkRpYWxvZy5tb2RhbEhlYWRlcicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKGNsaWNrKT1cImNsb3NlKENMT1NFX1dJVEhPVVRfU0VMRUNUSU9OKVwiXG4gICAgICAgIGNsYXNzPVwiY3gtZGlhbG9nLWNsb3NlIGNsb3NlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIncGlja3VwT3B0aW9uRGlhbG9nLmNsb3NlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxjeC1pY29uIFt0eXBlXT1cIklDT05fVFlQRS5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIE1vZGFsIEJvZHkgLS0+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJjeC1kaWFsb2ctYm9keSBtb2RhbC1ib2R5XCI+XG4gICAgICA8Y3gtc3RvcmUtc2VhcmNoXG4gICAgICAgIFtoaWRlT3V0T2ZTdG9ja109XCJnZXRIaWRlT3V0T2ZTdG9ja1N0YXRlJCB8IGFzeW5jXCJcbiAgICAgICAgKGZpbmRTdG9yZXMpPVwib25GaW5kU3RvcmVzKCRldmVudClcIlxuICAgICAgICAoc2hvd1NwaW5uZXIpPVwic2hvd1NwaW5uZXIoJGV2ZW50KVwiXG4gICAgICAgIChldmVudEhpZGVPdXRPZlN0b2NrKT1cIm9uSGlkZU91dE9mU3RvY2soKVwiXG4gICAgICA+PC9jeC1zdG9yZS1zZWFyY2g+XG4gICAgICA8Y3gtc3RvcmUtbGlzdFxuICAgICAgICBbcHJvZHVjdENvZGVdPVwicHJvZHVjdENvZGVcIlxuICAgICAgICAoc3RvcmVTZWxlY3RlZCk9XCJjbG9zZShMT0NBVElPTl9TRUxFQ1RFRClcIlxuICAgICAgPjwvY3gtc3RvcmUtbGlzdD5cbiAgICAgIDxkaXYgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+XG4gICAgICAgICAgPGN4LXNwaW5uZXI+PC9jeC1zcGlubmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==