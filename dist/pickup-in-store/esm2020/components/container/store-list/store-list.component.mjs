/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/pickup-in-store/root";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "../../presentational/store/store.component";
import * as i5 from "@spartacus/core";
/**
 * The list of stores with their stock level and distance from a searched location.
 * Used in the PickupOptionDialog component for selecting a pickup location.
 */
export class StoreListComponent {
    constructor(intendedPickupLocationService, pickupLocationsSearchService) {
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        /** Event emitter triggered when a store is selected for pickup */
        this.storeSelected = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        this.stores$ = this.pickupLocationsSearchService.getSearchResults(this.productCode);
        this.hasSearchStarted$ = this.pickupLocationsSearchService.hasSearchStarted(this.productCode);
        this.isSearchRunning$ = this.pickupLocationsSearchService.isSearchRunning();
    }
    /**
     * Select the store to pickup from. This also sets the user's preferred store
     * the selected point of service.
     *
     * @param store Store to pickup from
     */
    onSelectStore(store) {
        const { stockInfo: _, ...pointOfService } = store;
        this.intendedPickupLocationService.setIntendedLocation(this.productCode, {
            ...pointOfService,
            pickupOption: 'pickup',
        });
        this.storeSelected.emit();
    }
}
StoreListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListComponent, deps: [{ token: i1.IntendedPickupLocationFacade }, { token: i1.PickupLocationsSearchFacade }], target: i0.ɵɵFactoryTarget.Component });
StoreListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreListComponent, selector: "cx-store-list", inputs: { productCode: "productCode" }, outputs: { storeSelected: "storeSelected" }, ngImport: i0, template: "<div\n  *ngIf=\"\n    !(isSearchRunning$ | async) && (stores$ | async) as stores;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <div\n    class=\"container\"\n    *ngIf=\"(hasSearchStarted$ | async) && stores.length === 0\"\n  >\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeList.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"stores.length\">\n    <cx-store\n      *ngFor=\"let store of stores\"\n      [storeDetails]=\"store\"\n      (storeSelected)=\"onSelectStore($event)\"\n    ></cx-store>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.StoreComponent, selector: "cx-store", inputs: ["storeDetails"], outputs: ["storeSelected"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-list', template: "<div\n  *ngIf=\"\n    !(isSearchRunning$ | async) && (stores$ | async) as stores;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <div\n    class=\"container\"\n    *ngIf=\"(hasSearchStarted$ | async) && stores.length === 0\"\n  >\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeList.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"stores.length\">\n    <cx-store\n      *ngFor=\"let store of stores\"\n      [storeDetails]=\"store\"\n      (storeSelected)=\"onSelectStore($event)\"\n    ></cx-store>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.IntendedPickupLocationFacade }, { type: i1.PickupLocationsSearchFacade }]; }, propDecorators: { productCode: [{
                type: Input
            }], storeSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3N0b3JlLWxpc3Qvc3RvcmUtbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3N0b3JlLWxpc3Qvc3RvcmUtbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVEvRTs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sa0JBQWtCO0lBVTdCLFlBQ1ksNkJBQTJELEVBQzNELDRCQUF5RDtRQUR6RCxrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQThCO1FBQzNELGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBNkI7UUFUckUsa0VBQWtFO1FBQ3hELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFVckUsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLENBQy9ELElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixDQUN6RSxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsS0FBMEI7UUFDdEMsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFbEQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkUsR0FBRyxjQUFjO1lBQ2pCLFlBQVksRUFBRSxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7K0dBMUNVLGtCQUFrQjttR0FBbEIsa0JBQWtCLDBJQ3RCL0Isb3hCQWdDQTsyRkRWYSxrQkFBa0I7a0JBSjlCLFNBQVM7K0JBQ0UsZUFBZTs2SkFLaEIsV0FBVztzQkFBbkIsS0FBSztnQkFFSSxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnRPZlNlcnZpY2VTdG9jayB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBJbnRlbmRlZFBpY2t1cExvY2F0aW9uRmFjYWRlLFxuICBQaWNrdXBMb2NhdGlvbnNTZWFyY2hGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvcGlja3VwLWluLXN0b3JlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIHN0b3JlcyB3aXRoIHRoZWlyIHN0b2NrIGxldmVsIGFuZCBkaXN0YW5jZSBmcm9tIGEgc2VhcmNoZWQgbG9jYXRpb24uXG4gKiBVc2VkIGluIHRoZSBQaWNrdXBPcHRpb25EaWFsb2cgY29tcG9uZW50IGZvciBzZWxlY3RpbmcgYSBwaWNrdXAgbG9jYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXN0b3JlLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJ3N0b3JlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHByb2R1Y3QgY29kZSBmb3IgdGhlIHN0b2NrIGxldmVscyBhdCBlYWNoIGxvY2F0aW9uICovXG4gIEBJbnB1dCgpIHByb2R1Y3RDb2RlOiBzdHJpbmc7XG4gIC8qKiBFdmVudCBlbWl0dGVyIHRyaWdnZXJlZCB3aGVuIGEgc3RvcmUgaXMgc2VsZWN0ZWQgZm9yIHBpY2t1cCAqL1xuICBAT3V0cHV0KCkgc3RvcmVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuXG4gIHN0b3JlcyQ6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2VTdG9ja1tdPjtcbiAgaGFzU2VhcmNoU3RhcnRlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGlzU2VhcmNoUnVubmluZyQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGludGVuZGVkUGlja3VwTG9jYXRpb25TZXJ2aWNlOiBJbnRlbmRlZFBpY2t1cExvY2F0aW9uRmFjYWRlLFxuICAgIHByb3RlY3RlZCBwaWNrdXBMb2NhdGlvbnNTZWFyY2hTZXJ2aWNlOiBQaWNrdXBMb2NhdGlvbnNTZWFyY2hGYWNhZGVcbiAgKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3RvcmVzJCA9IHRoaXMucGlja3VwTG9jYXRpb25zU2VhcmNoU2VydmljZS5nZXRTZWFyY2hSZXN1bHRzKFxuICAgICAgdGhpcy5wcm9kdWN0Q29kZVxuICAgICk7XG4gICAgdGhpcy5oYXNTZWFyY2hTdGFydGVkJCA9IHRoaXMucGlja3VwTG9jYXRpb25zU2VhcmNoU2VydmljZS5oYXNTZWFyY2hTdGFydGVkKFxuICAgICAgdGhpcy5wcm9kdWN0Q29kZVxuICAgICk7XG4gICAgdGhpcy5pc1NlYXJjaFJ1bm5pbmckID0gdGhpcy5waWNrdXBMb2NhdGlvbnNTZWFyY2hTZXJ2aWNlLmlzU2VhcmNoUnVubmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgc3RvcmUgdG8gcGlja3VwIGZyb20uIFRoaXMgYWxzbyBzZXRzIHRoZSB1c2VyJ3MgcHJlZmVycmVkIHN0b3JlXG4gICAqIHRoZSBzZWxlY3RlZCBwb2ludCBvZiBzZXJ2aWNlLlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgU3RvcmUgdG8gcGlja3VwIGZyb21cbiAgICovXG4gIG9uU2VsZWN0U3RvcmUoc3RvcmU6IFBvaW50T2ZTZXJ2aWNlU3RvY2spIHtcbiAgICBjb25zdCB7IHN0b2NrSW5mbzogXywgLi4ucG9pbnRPZlNlcnZpY2UgfSA9IHN0b3JlO1xuXG4gICAgdGhpcy5pbnRlbmRlZFBpY2t1cExvY2F0aW9uU2VydmljZS5zZXRJbnRlbmRlZExvY2F0aW9uKHRoaXMucHJvZHVjdENvZGUsIHtcbiAgICAgIC4uLnBvaW50T2ZTZXJ2aWNlLFxuICAgICAgcGlja3VwT3B0aW9uOiAncGlja3VwJyxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RvcmVTZWxlY3RlZC5lbWl0KCk7XG4gIH1cbn1cbiIsIjxkaXZcbiAgKm5nSWY9XCJcbiAgICAhKGlzU2VhcmNoUnVubmluZyQgfCBhc3luYykgJiYgKHN0b3JlcyQgfCBhc3luYykgYXMgc3RvcmVzO1xuICAgIGVsc2UgbG9hZGluZ1xuICBcIlxuPlxuICA8ZGl2IHJvbGU9XCJzdGF0dXNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24ubG9hZGVkJyB8IGN4VHJhbnNsYXRlXCI+PC9kaXY+XG5cbiAgPGRpdlxuICAgIGNsYXNzPVwiY29udGFpbmVyXCJcbiAgICAqbmdJZj1cIihoYXNTZWFyY2hTdGFydGVkJCB8IGFzeW5jKSAmJiBzdG9yZXMubGVuZ3RoID09PSAwXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY3gtbm8tc3RvcmVzXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgIHt7ICdzdG9yZUxpc3Qubm9TdG9yZXNNZXNzYWdlJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJzdG9yZXMubGVuZ3RoXCI+XG4gICAgPGN4LXN0b3JlXG4gICAgICAqbmdGb3I9XCJsZXQgc3RvcmUgb2Ygc3RvcmVzXCJcbiAgICAgIFtzdG9yZURldGFpbHNdPVwic3RvcmVcIlxuICAgICAgKHN0b3JlU2VsZWN0ZWQpPVwib25TZWxlY3RTdG9yZSgkZXZlbnQpXCJcbiAgICA+PC9jeC1zdG9yZT5cbiAgPC9kaXY+XG48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cbiAgPGRpdiBjbGFzcz1cImN4LXNwaW5uZXJcIj5cbiAgICA8Y3gtc3Bpbm5lcj48L2N4LXNwaW5uZXI+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==