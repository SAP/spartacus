import * as i0 from '@angular/core';
import { Directive, Input, Component, EventEmitter, Output, ChangeDetectionStrategy, ViewChild, Inject, NgModule } from '@angular/core';
import * as i1 from '@spartacus/storefinder/core';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$1 from '@spartacus/core';
import { UrlModule, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i2$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i4 from '@spartacus/storefront';
import { ICON_TYPE, ListNavigationModule, SpinnerModule, IconModule, OutletModule } from '@spartacus/storefront';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import * as i3 from '@angular/forms';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable @angular-eslint/directive-class-suffix */
class AbstractStoreItemComponent {
    constructor(storeFinderService) {
        this.storeFinderService = storeFinderService;
    }
    getDirections(location) {
        return this.storeFinderService.getDirections(location);
    }
    getFormattedStoreAddress(addressParts) {
        return addressParts.filter(Boolean).join(', ');
    }
}
AbstractStoreItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AbstractStoreItemComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractStoreItemComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AbstractStoreItemComponent, inputs: { location: "location" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AbstractStoreItemComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; }, propDecorators: { location: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduleComponent {
    constructor() {
        // Intentional empty constructor
    }
    ngOnInit() {
        if (this.location) {
            this.weekDays = this.location.openingHours
                ?.weekDayOpeningList;
        }
    }
}
ScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ScheduleComponent, selector: "cx-schedule", inputs: { location: "location" }, ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"container cx-store-hours\" *ngIf=\"location.openingHours\">\n  <div *ngFor=\"let day of weekDays\" class=\"row\">\n    <div class=\"cx-days col-4\">{{ day.weekDay }}</div>\n\n    <div *ngIf=\"day.closed\" class=\"cx-hours col-8 closed\">\n      {{ 'storeFinder.closed' | cxTranslate }}\n    </div>\n\n    <div *ngIf=\"!day.closed\" class=\"cx-hours col-8\">\n      {{ day.openingTime?.formattedHour }} -\n      {{ day.closingTime?.formattedHour }}\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-schedule', template: "<ng-content></ng-content>\n<div class=\"container cx-store-hours\" *ngIf=\"location.openingHours\">\n  <div *ngFor=\"let day of weekDays\" class=\"row\">\n    <div class=\"cx-days col-4\">{{ day.weekDay }}</div>\n\n    <div *ngIf=\"day.closed\" class=\"cx-hours col-8 closed\">\n      {{ 'storeFinder.closed' | cxTranslate }}\n    </div>\n\n    <div *ngIf=\"!day.closed\" class=\"cx-hours col-8\">\n      {{ day.openingTime?.formattedHour }} -\n      {{ day.closingTime?.formattedHour }}\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { location: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderListItemComponent extends AbstractStoreItemComponent {
    constructor(storeFinderService) {
        super(storeFinderService);
        this.storeFinderService = storeFinderService;
        this.locationIndex = null;
        this.storeItemClick = new EventEmitter();
        this.StoreFinderOutlets = StoreFinderOutlets;
    }
    handleStoreItemClick() {
        if (this.locationIndex !== null) {
            this.storeItemClick.emit(this.locationIndex);
        }
    }
    onKey(event) {
        if (event.key === 'Enter') {
            this.handleStoreItemClick();
        }
    }
}
StoreFinderListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderListItemComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderListItemComponent, selector: "cx-store-finder-list-item", inputs: { locationIndex: "locationIndex", listOrderLabel: "listOrderLabel", displayDistance: "displayDistance", useClickEvent: "useClickEvent" }, outputs: { storeItemClick: "storeItemClick" }, usesInheritance: true, ngImport: i0, template: "<ng-container>\n  <div aria-relevant=\"all\">\n    <div class=\"cx-store-list-order\">\n      {{ listOrderLabel }}\n    </div>\n    <a\n      *ngIf=\"useClickEvent\"\n      (click)=\"handleStoreItemClick()\"\n      (keyup)=\"onKey($event)\"\n      class=\"cx-store-name\"\n      tabindex=\"0\"\n    >\n      {{ location.displayName || location.name }}\n    </a>\n    <a\n      *ngIf=\"!useClickEvent\"\n      [routerLink]=\"[location.name]\"\n      class=\"cx-store-name\"\n      tabindex=\"0\"\n    >\n      {{ location.displayName || location.name }}\n    </a>\n    <div class=\"cx-store-address\" *ngIf=\"location.address\" aria-hidden=\"true\">\n      <div class=\"cx-store-address-street\">\n        {{ location.address.line1 }} {{ location.address.line2 }}\n      </div>\n      {{\n        getFormattedStoreAddress([\n          location.address.town,\n          location.address.postalCode,\n          location.address.country.isocode\n        ])\n      }}\n      <div\n        class=\"cx-store-distance\"\n        *ngIf=\"location.formattedDistance && displayDistance\"\n      >\n        {{ location.formattedDistance }}\n      </div>\n    </div>\n    <ng-template\n      [cxOutlet]=\"StoreFinderOutlets.PREFERRED_STORE\"\n      [cxOutletContext]=\"{\n        displayName: location.displayName,\n        name: location.name\n      }\"\n    ></ng-template>\n\n    <a\n      href=\"{{ getDirections(location) }}\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"btn btn-sm btn-secondary btn-block cx-button\"\n      (click)=\"$event.stopPropagation()\"\n      [attr.aria-label]=\"'storeFinder.ariaLabelGetDirections' | cxTranslate\"\n      >{{ 'storeFinder.getDirections' | cxTranslate }}</a\n    >\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-list-item', template: "<ng-container>\n  <div aria-relevant=\"all\">\n    <div class=\"cx-store-list-order\">\n      {{ listOrderLabel }}\n    </div>\n    <a\n      *ngIf=\"useClickEvent\"\n      (click)=\"handleStoreItemClick()\"\n      (keyup)=\"onKey($event)\"\n      class=\"cx-store-name\"\n      tabindex=\"0\"\n    >\n      {{ location.displayName || location.name }}\n    </a>\n    <a\n      *ngIf=\"!useClickEvent\"\n      [routerLink]=\"[location.name]\"\n      class=\"cx-store-name\"\n      tabindex=\"0\"\n    >\n      {{ location.displayName || location.name }}\n    </a>\n    <div class=\"cx-store-address\" *ngIf=\"location.address\" aria-hidden=\"true\">\n      <div class=\"cx-store-address-street\">\n        {{ location.address.line1 }} {{ location.address.line2 }}\n      </div>\n      {{\n        getFormattedStoreAddress([\n          location.address.town,\n          location.address.postalCode,\n          location.address.country.isocode\n        ])\n      }}\n      <div\n        class=\"cx-store-distance\"\n        *ngIf=\"location.formattedDistance && displayDistance\"\n      >\n        {{ location.formattedDistance }}\n      </div>\n    </div>\n    <ng-template\n      [cxOutlet]=\"StoreFinderOutlets.PREFERRED_STORE\"\n      [cxOutletContext]=\"{\n        displayName: location.displayName,\n        name: location.name\n      }\"\n    ></ng-template>\n\n    <a\n      href=\"{{ getDirections(location) }}\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"btn btn-sm btn-secondary btn-block cx-button\"\n      (click)=\"$event.stopPropagation()\"\n      [attr.aria-label]=\"'storeFinder.ariaLabelGetDirections' | cxTranslate\"\n      >{{ 'storeFinder.getDirections' | cxTranslate }}</a\n    >\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; }, propDecorators: { locationIndex: [{
                type: Input
            }], listOrderLabel: [{
                type: Input
            }], displayDistance: [{
                type: Input
            }], useClickEvent: [{
                type: Input
            }], storeItemClick: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderGridComponent {
    constructor(storeFinderService, route) {
        this.storeFinderService = storeFinderService;
        this.route = route;
    }
    ngOnInit() {
        this.isLoading$ = this.storeFinderService.getStoresLoading();
        this.locations$ = this.storeFinderService.getFindStoresEntities();
        this.defaultLocation = {};
        this.findStores();
    }
    findStores() {
        if (this.route.snapshot.params.country) {
            this.storeFinderService.callFindStoresAction(this.route.snapshot.params);
        }
    }
}
StoreFinderGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderGridComponent, deps: [{ token: i1.StoreFinderService }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderGridComponent, selector: "cx-store-finder-grid", ngImport: i0, template: "<ng-container\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div\n    class=\"container\"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    aria-relevant=\"additions\"\n  >\n    <div class=\"cx-visually-hidden\">\n      {{\n        'storeFinder.storesFound'\n          | cxTranslate: { count: locations?.stores?.length }\n      }}\n    </div>\n    <div class=\"row\">\n      <div\n        class=\"col-sm-6 col-md-4 col-lg-3 item\"\n        *ngFor=\"let location of locations?.stores\"\n      >\n        <cx-store-finder-list-item\n          [location]=\"location\"\n        ></cx-store-finder-list-item>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: StoreFinderListItemComponent, selector: "cx-store-finder-list-item", inputs: ["locationIndex", "listOrderLabel", "displayDistance", "useClickEvent"], outputs: ["storeItemClick"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div\n    class=\"container\"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    aria-relevant=\"additions\"\n  >\n    <div class=\"cx-visually-hidden\">\n      {{\n        'storeFinder.storesFound'\n          | cxTranslate: { count: locations?.stores?.length }\n      }}\n    </div>\n    <div class=\"row\">\n      <div\n        class=\"col-sm-6 col-md-4 col-lg-3 item\"\n        *ngFor=\"let location of locations?.stores\"\n      >\n        <cx-store-finder-list-item\n          [location]=\"location\"\n        ></cx-store-finder-list-item>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }, { type: i2$1.ActivatedRoute }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderSearchComponent {
    constructor(routingService) {
        this.routingService = routingService;
        this.searchBox = new UntypedFormControl();
        this.iconTypes = ICON_TYPE;
    }
    findStores(address) {
        this.routingService.go(['store-finder/find'], {
            queryParams: {
                query: address,
            },
        });
    }
    viewStoresWithMyLoc() {
        this.routingService.go(['store-finder/find'], {
            queryParams: {
                useMyLocation: true,
            },
        });
    }
    onKey(event) {
        if (this.searchBox.value &&
            this.searchBox.value.length &&
            event.key === 'Enter') {
            this.findStores(this.searchBox.value);
        }
    }
}
StoreFinderSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderSearchComponent, deps: [{ token: i1$1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderSearchComponent, selector: "cx-store-finder-search", ngImport: i0, template: "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12 col-lg-6\">\n      <div class=\"form-group search-wrapper\">\n        <input\n          #queryInput\n          [formControl]=\"searchBox\"\n          (keyup)=\"onKey($event)\"\n          type=\"text\"\n          class=\"form-control\"\n          [attr.aria-label]=\"'storeFinder.searchBoxLabel' | cxTranslate\"\n          placeholder=\"{{ 'storeFinder.searchBox' | cxTranslate }}\"\n        />\n        <cx-icon\n          [attr.tabindex]=\"queryInput.value?.length ? 0 : -1\"\n          [type]=\"iconTypes.SEARCH\"\n          role=\"button\"\n          [attr.aria-label]=\"'storeFinder.searchNearestStores' | cxTranslate\"\n          class=\"search\"\n          (keyup)=\"onKey($event)\"\n          [routerLink]=\"['/store-finder/find']\"\n          [queryParams]=\"{ query: queryInput.value }\"\n          [ngClass]=\"{\n            'disabled-action': !(queryInput.value && queryInput.value.length)\n          }\"\n        ></cx-icon>\n      </div>\n    </div>\n    <div class=\"col-md-12 col-lg-6\">\n      <div class=\"row cx-search-links mb-3\">\n        <div class=\"col-6\">\n          <button\n            (click)=\"viewStoresWithMyLoc()\"\n            class=\"btn btn-primary btn-block\"\n          >\n            {{ 'storeFinder.useMyLocation' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-6\">\n          <button\n            [routerLink]=\"['/store-finder/view-all']\"\n            class=\"btn btn-primary btn-block\"\n          >\n            {{ 'storeFinder.viewAllStores' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i2$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-search', template: "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12 col-lg-6\">\n      <div class=\"form-group search-wrapper\">\n        <input\n          #queryInput\n          [formControl]=\"searchBox\"\n          (keyup)=\"onKey($event)\"\n          type=\"text\"\n          class=\"form-control\"\n          [attr.aria-label]=\"'storeFinder.searchBoxLabel' | cxTranslate\"\n          placeholder=\"{{ 'storeFinder.searchBox' | cxTranslate }}\"\n        />\n        <cx-icon\n          [attr.tabindex]=\"queryInput.value?.length ? 0 : -1\"\n          [type]=\"iconTypes.SEARCH\"\n          role=\"button\"\n          [attr.aria-label]=\"'storeFinder.searchNearestStores' | cxTranslate\"\n          class=\"search\"\n          (keyup)=\"onKey($event)\"\n          [routerLink]=\"['/store-finder/find']\"\n          [queryParams]=\"{ query: queryInput.value }\"\n          [ngClass]=\"{\n            'disabled-action': !(queryInput.value && queryInput.value.length)\n          }\"\n        ></cx-icon>\n      </div>\n    </div>\n    <div class=\"col-md-12 col-lg-6\">\n      <div class=\"row cx-search-links mb-3\">\n        <div class=\"col-6\">\n          <button\n            (click)=\"viewStoresWithMyLoc()\"\n            class=\"btn btn-primary btn-block\"\n          >\n            {{ 'storeFinder.useMyLocation' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-6\">\n          <button\n            [routerLink]=\"['/store-finder/view-all']\"\n            class=\"btn btn-primary btn-block\"\n          >\n            {{ 'storeFinder.viewAllStores' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderHeaderComponent {
}
StoreFinderHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreFinderHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderHeaderComponent, selector: "cx-store-finder-header", ngImport: i0, template: "<ng-container>\n  <cx-store-finder-search\n    role=\"search\"\n    [attr.aria-label]=\"'storeFinder.storeFinder' | cxTranslate\"\n  ></cx-store-finder-search>\n</ng-container>\n", dependencies: [{ kind: "component", type: StoreFinderSearchComponent, selector: "cx-store-finder-search" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-header', template: "<ng-container>\n  <cx-store-finder-search\n    role=\"search\"\n    [attr.aria-label]=\"'storeFinder.storeFinder' | cxTranslate\"\n  ></cx-store-finder-search>\n</ng-container>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderMapComponent {
    constructor(googleMapRendererService) {
        this.googleMapRendererService = googleMapRendererService;
        this.selectedStoreItem = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.locations && this.locations) {
            this.renderMap();
        }
    }
    /**
     * Sets the center of the map to the given location
     * @param latitude latitude of the new center
     * @param longitude longitude of the new center
     */
    centerMap(latitude, longitude) {
        this.googleMapRendererService.centerMap(latitude, longitude);
    }
    renderMap() {
        this.googleMapRendererService.renderMap(this.mapElement.nativeElement, this.locations, (markerIndex) => {
            this.selectStoreItemClickHandle(markerIndex);
        });
    }
    selectStoreItemClickHandle(markerIndex) {
        this.selectedStoreItem.emit(markerIndex);
    }
}
StoreFinderMapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderMapComponent, deps: [{ token: i1.GoogleMapRendererService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderMapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderMapComponent, selector: "cx-store-finder-map", inputs: { locations: "locations" }, outputs: { selectedStoreItem: "selectedStoreItem" }, viewQueries: [{ propertyName: "mapElement", first: true, predicate: ["mapElement"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div aria-hidden=\"true\" #mapElement class=\"cx-store-map\"></div>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderMapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-map', template: "<div aria-hidden=\"true\" #mapElement class=\"cx-store-map\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.GoogleMapRendererService }]; }, propDecorators: { mapElement: [{
                type: ViewChild,
                args: ['mapElement', { static: true }]
            }], locations: [{
                type: Input
            }], selectedStoreItem: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderPaginationDetailsComponent {
    constructor() {
        // Intentional empty constructor
    }
    getResultsPerPage() {
        if (this.pagination.totalResults > this.pagination.pageSize) {
            const firstItem = this.pagination.currentPage * this.pagination.pageSize + 1;
            let resultsPerPage = (this.pagination.currentPage + 1) * this.pagination.pageSize;
            if (resultsPerPage > this.pagination.totalResults) {
                resultsPerPage = this.pagination.totalResults;
            }
            return `${firstItem} - ${resultsPerPage}`;
        }
        else {
            return `1 - ${this.pagination.totalResults}`;
        }
    }
}
StoreFinderPaginationDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderPaginationDetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreFinderPaginationDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderPaginationDetailsComponent, selector: "cx-store-finder-pagination-details", inputs: { pagination: "pagination" }, ngImport: i0, template: "<span class=\"cx-pagination-details\">\n  {{ getResultsPerPage() }}\n  {{\n    'storeFinder.fromStoresFound'\n      | cxTranslate: { count: pagination.totalResults }\n  }}\n</span>\n", dependencies: [{ kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderPaginationDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-pagination-details', template: "<span class=\"cx-pagination-details\">\n  {{ getResultsPerPage() }}\n  {{\n    'storeFinder.fromStoresFound'\n      | cxTranslate: { count: pagination.totalResults }\n  }}\n</span>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { pagination: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var LocationDisplayMode;
(function (LocationDisplayMode) {
    LocationDisplayMode["LIST_VIEW"] = "listView";
    LocationDisplayMode["MAP_VIEW"] = "mapView";
})(LocationDisplayMode || (LocationDisplayMode = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
    constructor(storeFinderService) {
        super(storeFinderService);
        this.storeFinderService = storeFinderService;
    }
}
StoreFinderStoreDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreDescriptionComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderStoreDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderStoreDescriptionComponent, selector: "cx-store-finder-store-description", inputs: { location: "location", disableMap: "disableMap" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"location\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <article class=\"cx-store col-md-4\">\n        <h2 aria-hidden=\"true\">{{ location.displayName || location.name }}</h2>\n\n        <p *ngIf=\"location.address\" class=\"cx-store-description-address\">\n          {{ location.address.line1 }} {{ location.address.line2 }} <br />\n          {{\n            getFormattedStoreAddress([\n              location.address.town,\n              location.address.postalCode,\n              location.address.country.isocode\n            ])\n          }}\n        </p>\n\n        <section class=\"cx-contact\">\n          <ul class=\"cx-list\">\n            <li class=\"cx-item\">\n              <a\n                class=\"cx-link\"\n                [href]=\"getDirections(location)\"\n                target=\"_blank\"\n                rel=\"noopener noreferrer\"\n                [attr.aria-label]=\"\n                  'storeFinder.ariaLabelGetDirections' | cxTranslate\n                \"\n                >{{ 'storeFinder.getDirections' | cxTranslate }}</a\n              >\n            </li>\n            <li class=\"cx-item\" *ngIf=\"location.address?.phone\">\n              {{ 'storeFinder.call' | cxTranslate }}\n              {{ location.address?.phone }}\n            </li>\n          </ul>\n        </section>\n        <div class=\"cx-schedule\" *ngIf=\"location.openingHours\">\n          <cx-schedule [location]=\"location\">\n            <h3>{{ 'storeFinder.storeHours' | cxTranslate }}</h3>\n          </cx-schedule>\n        </div>\n\n        <div *ngIf=\"(location.features | json) !== '{}'\" class=\"cx-features\">\n          <div class=\"row\">\n            <div class=\"col-lg-12\">\n              <h3 class=\"cx-features-header\">\n                {{ 'storeFinder.storeFeatures' | cxTranslate }}\n              </h3>\n            </div>\n          </div>\n\n          <article class=\"row\">\n            <div\n              class=\"col-lg-12 cx-feature-item\"\n              *ngFor=\"let feature of location.features?.entry\"\n            >\n              <div class=\"cx-feature-value\">{{ feature.value }}</div>\n            </div>\n          </article>\n        </div>\n      </article>\n      <article class=\"cx-storeMap col-lg-8\" *ngIf=\"!disableMap\">\n        <cx-store-finder-map [locations]=\"[location]\"></cx-store-finder-map>\n      </article>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: StoreFinderMapComponent, selector: "cx-store-finder-map", inputs: ["locations"], outputs: ["selectedStoreItem"] }, { kind: "component", type: ScheduleComponent, selector: "cx-schedule", inputs: ["location"] }, { kind: "pipe", type: i2.JsonPipe, name: "json" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreDescriptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-store-description', template: "<ng-container *ngIf=\"location\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <article class=\"cx-store col-md-4\">\n        <h2 aria-hidden=\"true\">{{ location.displayName || location.name }}</h2>\n\n        <p *ngIf=\"location.address\" class=\"cx-store-description-address\">\n          {{ location.address.line1 }} {{ location.address.line2 }} <br />\n          {{\n            getFormattedStoreAddress([\n              location.address.town,\n              location.address.postalCode,\n              location.address.country.isocode\n            ])\n          }}\n        </p>\n\n        <section class=\"cx-contact\">\n          <ul class=\"cx-list\">\n            <li class=\"cx-item\">\n              <a\n                class=\"cx-link\"\n                [href]=\"getDirections(location)\"\n                target=\"_blank\"\n                rel=\"noopener noreferrer\"\n                [attr.aria-label]=\"\n                  'storeFinder.ariaLabelGetDirections' | cxTranslate\n                \"\n                >{{ 'storeFinder.getDirections' | cxTranslate }}</a\n              >\n            </li>\n            <li class=\"cx-item\" *ngIf=\"location.address?.phone\">\n              {{ 'storeFinder.call' | cxTranslate }}\n              {{ location.address?.phone }}\n            </li>\n          </ul>\n        </section>\n        <div class=\"cx-schedule\" *ngIf=\"location.openingHours\">\n          <cx-schedule [location]=\"location\">\n            <h3>{{ 'storeFinder.storeHours' | cxTranslate }}</h3>\n          </cx-schedule>\n        </div>\n\n        <div *ngIf=\"(location.features | json) !== '{}'\" class=\"cx-features\">\n          <div class=\"row\">\n            <div class=\"col-lg-12\">\n              <h3 class=\"cx-features-header\">\n                {{ 'storeFinder.storeFeatures' | cxTranslate }}\n              </h3>\n            </div>\n          </div>\n\n          <article class=\"row\">\n            <div\n              class=\"col-lg-12 cx-feature-item\"\n              *ngFor=\"let feature of location.features?.entry\"\n            >\n              <div class=\"cx-feature-value\">{{ feature.value }}</div>\n            </div>\n          </article>\n        </div>\n      </article>\n      <article class=\"cx-storeMap col-lg-8\" *ngIf=\"!disableMap\">\n        <cx-store-finder-map [locations]=\"[location]\"></cx-store-finder-map>\n      </article>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; }, propDecorators: { location: [{
                type: Input
            }], disableMap: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderListComponent {
    constructor(storeFinderService, document) {
        this.storeFinderService = storeFinderService;
        this.document = document;
        this.iconTypes = ICON_TYPE;
        this.displayModes = LocationDisplayMode;
        this.activeDisplayMode = LocationDisplayMode.LIST_VIEW;
        this.isDetailsModeVisible = false;
    }
    centerStoreOnMapByIndex(index, location) {
        this.showStoreDetails(location);
        this.selectedStoreIndex = index;
        this.selectedStore = location;
        this.storeMap.centerMap(this.storeFinderService.getStoreLatitude(this.locations.stores[index]), this.storeFinderService.getStoreLongitude(this.locations.stores[index]));
    }
    selectStoreItemList(index) {
        this.selectedStoreIndex = index;
        const storeListItem = this.document.getElementById('item-' + index);
        storeListItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
    showStoreDetails(location) {
        this.isDetailsModeVisible = true;
        this.storeDetails = location;
    }
    hideStoreDetails() {
        this.isDetailsModeVisible = false;
        this.selectedStoreIndex = undefined;
        this.selectedStore = undefined;
        this.storeMap.renderMap();
    }
    setDisplayMode(mode) {
        this.activeDisplayMode = mode;
    }
    isDisplayModeActive(mode) {
        return this.activeDisplayMode === mode;
    }
}
StoreFinderListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderListComponent, deps: [{ token: i1.StoreFinderService }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderListComponent, selector: "cx-store-finder-list", inputs: { locations: "locations", useMylocation: "useMylocation" }, viewQueries: [{ propertyName: "storeMap", first: true, predicate: ["storeMap"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"locations\">\n  <div class=\"container mb-2\" aria-atomic=\"true\" aria-live=\"assertive\">\n    <div class=\"row\" *ngIf=\"locations?.pagination\">\n      <div class=\"col-md-12\">\n        <cx-store-finder-pagination-details\n          [pagination]=\"locations.pagination\"\n        ></cx-store-finder-pagination-details>\n      </div>\n      <div class=\"text-left cx-back-wrapper\">\n        <div class=\"cx-visually-hidden\">\n          {{ storeDetails?.displayName }}\n        </div>\n        <button\n          class=\"btn btn-block btn-secondary cx-back\"\n          *ngIf=\"isDetailsModeVisible\"\n          (click)=\"hideStoreDetails()\"\n        >\n          <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          {{ 'storeFinder.back' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div *ngIf=\"locations?.stores\" class=\"row cx-columns\">\n      <div class=\"col-md-4 cx-address-col\">\n        <div class=\"cx-store-details\" *ngIf=\"isDetailsModeVisible\">\n          <cx-store-finder-store-description\n            [location]=\"storeDetails\"\n            [disableMap]=\"true\"\n          ></cx-store-finder-store-description>\n        </div>\n        <ol class=\"cx-list\" *ngIf=\"!isDetailsModeVisible\">\n          <li\n            *ngFor=\"let location of locations?.stores; let i = index\"\n            id=\"{{ 'item-' + i }}\"\n            [ngClass]=\"{\n              'cx-selected-item': selectedStoreIndex === i\n            }\"\n            class=\"cx-list-items\"\n          >\n            <cx-store-finder-list-item\n              [location]=\"location\"\n              [locationIndex]=\"i\"\n              [displayDistance]=\"useMylocation\"\n              [useClickEvent]=\"true\"\n              (storeItemClick)=\"centerStoreOnMapByIndex($event, location)\"\n              [listOrderLabel]=\"\n                i +\n                locations.pagination.currentPage *\n                  locations.pagination.pageSize +\n                1\n              \"\n            ></cx-store-finder-list-item>\n          </li>\n        </ol>\n      </div>\n      <div class=\"col-md-8 cx-map-col\">\n        <cx-store-finder-map\n          #storeMap\n          [locations]=\"locations.stores\"\n          (selectedStoreItem)=\"selectStoreItemList($event)\"\n        ></cx-store-finder-map>\n      </div>\n    </div>\n\n    <!-- mobile tabs for column set only -->\n    <div *ngIf=\"locations?.stores\" class=\"cx-columns-mobile\">\n      <ul class=\"nav cx-nav\" role=\"tablist\">\n        <li\n          class=\"nav-item cx-nav-item\"\n          *ngFor=\"let mode of displayModes | keyvalue\"\n        >\n          <button\n            [id]=\"'tab-' + mode?.value\"\n            role=\"tab\"\n            [ngClass]=\"{\n              'nav-link': true,\n              active: isDisplayModeActive(mode?.value)\n            }\"\n            [attr.aria-controls]=\"'tab-' + mode?.value + '-panel'\"\n            [attr.aria-selected]=\"isDisplayModeActive(mode?.value)\"\n            aria-disabled=\"false\"\n            (click)=\"setDisplayMode(mode?.value)\"\n          >\n            {{ 'storeFinder.' + mode?.value | cxTranslate }}\n          </button>\n        </li>\n      </ul>\n      <div class=\"tab-content\">\n        <div [ngSwitch]=\"activeDisplayMode\">\n          <ng-template [ngSwitchCase]=\"displayModes.LIST_VIEW\">\n            <div\n              id=\"tab-listView-panel\"\n              role=\"tabpanel\"\n              aria-labelledby=\"tab-listView\"\n            >\n              <div class=\"cx-address-col\">\n                <div class=\"cx-store-details\" *ngIf=\"isDetailsModeVisible\">\n                  <cx-store-finder-store-description\n                    [location]=\"storeDetails\"\n                    [disableMap]=\"true\"\n                  ></cx-store-finder-store-description>\n                </div>\n                <ol class=\"cx-list\" *ngIf=\"!isDetailsModeVisible\">\n                  <li\n                    *ngFor=\"let location of locations?.stores; let i = index\"\n                    id=\"{{ 'item-' + i }}\"\n                    [ngClass]=\"{\n                      'cx-selected-item': selectedStoreIndex === i\n                    }\"\n                    class=\"cx-list-items\"\n                  >\n                    <cx-store-finder-list-item\n                      [location]=\"location\"\n                      [locationIndex]=\"i\"\n                      [displayDistance]=\"useMylocation\"\n                      [useClickEvent]=\"true\"\n                      (storeItemClick)=\"\n                        centerStoreOnMapByIndex($event, location)\n                      \"\n                      [listOrderLabel]=\"\n                        i +\n                        locations.pagination.currentPage *\n                          locations.pagination.pageSize +\n                        1\n                      \"\n                    ></cx-store-finder-list-item>\n                  </li>\n                </ol>\n              </div>\n            </div>\n          </ng-template>\n          <ng-template [ngSwitchCase]=\"displayModes.MAP_VIEW\">\n            <div\n              id=\"tab-mapView-panel\"\n              role=\"tabpanel\"\n              aria-labelledby=\"tab-mapView\"\n            >\n              <div class=\"cx-map-col\">\n                <cx-store-finder-map\n                  #storeMap\n                  [locations]=\"\n                    selectedStore ? [selectedStore] : locations.stores\n                  \"\n                  (selectedStoreItem)=\"selectStoreItemList($event)\"\n                ></cx-store-finder-map>\n              </div>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <!-- mobile tabs end -->\n\n    <div *ngIf=\"!locations?.stores\" class=\"row\">\n      <div class=\"col-md-12 cx-not-found\">\n        {{ 'storeFinder.noStoreFound' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: StoreFinderMapComponent, selector: "cx-store-finder-map", inputs: ["locations"], outputs: ["selectedStoreItem"] }, { kind: "component", type: StoreFinderListItemComponent, selector: "cx-store-finder-list-item", inputs: ["locationIndex", "listOrderLabel", "displayDistance", "useClickEvent"], outputs: ["storeItemClick"] }, { kind: "component", type: StoreFinderStoreDescriptionComponent, selector: "cx-store-finder-store-description", inputs: ["location", "disableMap"] }, { kind: "component", type: StoreFinderPaginationDetailsComponent, selector: "cx-store-finder-pagination-details", inputs: ["pagination"] }, { kind: "pipe", type: i2.KeyValuePipe, name: "keyvalue" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-list', template: "<ng-container *ngIf=\"locations\">\n  <div class=\"container mb-2\" aria-atomic=\"true\" aria-live=\"assertive\">\n    <div class=\"row\" *ngIf=\"locations?.pagination\">\n      <div class=\"col-md-12\">\n        <cx-store-finder-pagination-details\n          [pagination]=\"locations.pagination\"\n        ></cx-store-finder-pagination-details>\n      </div>\n      <div class=\"text-left cx-back-wrapper\">\n        <div class=\"cx-visually-hidden\">\n          {{ storeDetails?.displayName }}\n        </div>\n        <button\n          class=\"btn btn-block btn-secondary cx-back\"\n          *ngIf=\"isDetailsModeVisible\"\n          (click)=\"hideStoreDetails()\"\n        >\n          <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          {{ 'storeFinder.back' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div *ngIf=\"locations?.stores\" class=\"row cx-columns\">\n      <div class=\"col-md-4 cx-address-col\">\n        <div class=\"cx-store-details\" *ngIf=\"isDetailsModeVisible\">\n          <cx-store-finder-store-description\n            [location]=\"storeDetails\"\n            [disableMap]=\"true\"\n          ></cx-store-finder-store-description>\n        </div>\n        <ol class=\"cx-list\" *ngIf=\"!isDetailsModeVisible\">\n          <li\n            *ngFor=\"let location of locations?.stores; let i = index\"\n            id=\"{{ 'item-' + i }}\"\n            [ngClass]=\"{\n              'cx-selected-item': selectedStoreIndex === i\n            }\"\n            class=\"cx-list-items\"\n          >\n            <cx-store-finder-list-item\n              [location]=\"location\"\n              [locationIndex]=\"i\"\n              [displayDistance]=\"useMylocation\"\n              [useClickEvent]=\"true\"\n              (storeItemClick)=\"centerStoreOnMapByIndex($event, location)\"\n              [listOrderLabel]=\"\n                i +\n                locations.pagination.currentPage *\n                  locations.pagination.pageSize +\n                1\n              \"\n            ></cx-store-finder-list-item>\n          </li>\n        </ol>\n      </div>\n      <div class=\"col-md-8 cx-map-col\">\n        <cx-store-finder-map\n          #storeMap\n          [locations]=\"locations.stores\"\n          (selectedStoreItem)=\"selectStoreItemList($event)\"\n        ></cx-store-finder-map>\n      </div>\n    </div>\n\n    <!-- mobile tabs for column set only -->\n    <div *ngIf=\"locations?.stores\" class=\"cx-columns-mobile\">\n      <ul class=\"nav cx-nav\" role=\"tablist\">\n        <li\n          class=\"nav-item cx-nav-item\"\n          *ngFor=\"let mode of displayModes | keyvalue\"\n        >\n          <button\n            [id]=\"'tab-' + mode?.value\"\n            role=\"tab\"\n            [ngClass]=\"{\n              'nav-link': true,\n              active: isDisplayModeActive(mode?.value)\n            }\"\n            [attr.aria-controls]=\"'tab-' + mode?.value + '-panel'\"\n            [attr.aria-selected]=\"isDisplayModeActive(mode?.value)\"\n            aria-disabled=\"false\"\n            (click)=\"setDisplayMode(mode?.value)\"\n          >\n            {{ 'storeFinder.' + mode?.value | cxTranslate }}\n          </button>\n        </li>\n      </ul>\n      <div class=\"tab-content\">\n        <div [ngSwitch]=\"activeDisplayMode\">\n          <ng-template [ngSwitchCase]=\"displayModes.LIST_VIEW\">\n            <div\n              id=\"tab-listView-panel\"\n              role=\"tabpanel\"\n              aria-labelledby=\"tab-listView\"\n            >\n              <div class=\"cx-address-col\">\n                <div class=\"cx-store-details\" *ngIf=\"isDetailsModeVisible\">\n                  <cx-store-finder-store-description\n                    [location]=\"storeDetails\"\n                    [disableMap]=\"true\"\n                  ></cx-store-finder-store-description>\n                </div>\n                <ol class=\"cx-list\" *ngIf=\"!isDetailsModeVisible\">\n                  <li\n                    *ngFor=\"let location of locations?.stores; let i = index\"\n                    id=\"{{ 'item-' + i }}\"\n                    [ngClass]=\"{\n                      'cx-selected-item': selectedStoreIndex === i\n                    }\"\n                    class=\"cx-list-items\"\n                  >\n                    <cx-store-finder-list-item\n                      [location]=\"location\"\n                      [locationIndex]=\"i\"\n                      [displayDistance]=\"useMylocation\"\n                      [useClickEvent]=\"true\"\n                      (storeItemClick)=\"\n                        centerStoreOnMapByIndex($event, location)\n                      \"\n                      [listOrderLabel]=\"\n                        i +\n                        locations.pagination.currentPage *\n                          locations.pagination.pageSize +\n                        1\n                      \"\n                    ></cx-store-finder-list-item>\n                  </li>\n                </ol>\n              </div>\n            </div>\n          </ng-template>\n          <ng-template [ngSwitchCase]=\"displayModes.MAP_VIEW\">\n            <div\n              id=\"tab-mapView-panel\"\n              role=\"tabpanel\"\n              aria-labelledby=\"tab-mapView\"\n            >\n              <div class=\"cx-map-col\">\n                <cx-store-finder-map\n                  #storeMap\n                  [locations]=\"\n                    selectedStore ? [selectedStore] : locations.stores\n                  \"\n                  (selectedStoreItem)=\"selectStoreItemList($event)\"\n                ></cx-store-finder-map>\n              </div>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <!-- mobile tabs end -->\n\n    <div *ngIf=\"!locations?.stores\" class=\"row\">\n      <div class=\"col-md-12 cx-not-found\">\n        {{ 'storeFinder.noStoreFound' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { locations: [{
                type: Input
            }], useMylocation: [{
                type: Input
            }], storeMap: [{
                type: ViewChild,
                args: ['storeMap']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderSearchResultComponent {
    constructor(storeFinderService, route, config) {
        this.storeFinderService = storeFinderService;
        this.route = route;
        this.config = config;
        this.countryCode = null;
        this.searchConfig = {
            currentPage: 0,
        };
    }
    ngOnInit() {
        this.subscription = this.route.queryParams.subscribe((params) => this.initialize(params));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    viewPage(pageNumber) {
        this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
        this.storeFinderService.findStoresAction(this.searchQuery.queryText, this.searchConfig, this.geolocation, this.countryCode, this.useMyLocation, this.radius);
    }
    initialize(params) {
        this.searchQuery = this.parseParameters(params);
        this.useMyLocation = params && params.useMyLocation ? true : false;
        this.searchConfig = { ...this.searchConfig, currentPage: 0 };
        this.radius = this.config.googleMaps.radius;
        this.storeFinderService.findStoresAction(this.searchQuery.queryText, this.searchConfig, this.geolocation, this.countryCode, this.useMyLocation, this.radius);
        this.isLoading$ = this.storeFinderService.getStoresLoading();
        this.locations$ = this.storeFinderService.getFindStoresEntities();
    }
    parseParameters(queryParams) {
        let searchQuery;
        if (queryParams.query) {
            searchQuery = { queryText: queryParams.query };
        }
        else {
            searchQuery = { queryText: '' };
        }
        searchQuery.useMyLocation =
            queryParams.useMyLocation != null &&
                queryParams.useMyLocation.toUpperCase() === 'TRUE';
        return searchQuery;
    }
}
StoreFinderSearchResultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderSearchResultComponent, deps: [{ token: i1.StoreFinderService }, { token: i2$1.ActivatedRoute }, { token: i1.StoreFinderConfig }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderSearchResultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderSearchResultComponent, selector: "cx-store-finder-search-result", ngImport: i0, template: "<div\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div *ngIf=\"locations?.stores.length\">\n    <div class=\"cx-pagination\">\n      <cx-pagination\n        aria-hidden=\"true\"\n        [pagination]=\"locations.pagination\"\n        (viewPageEvent)=\"viewPage($event)\"\n      ></cx-pagination>\n    </div>\n  </div>\n  <cx-store-finder-list\n    *ngIf=\"locations?.stores.length\"\n    [locations]=\"locations\"\n    [useMylocation]=\"useMyLocation\"\n  ></cx-store-finder-list>\n  <div class=\"container\" *ngIf=\"!locations?.stores.length\">\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeFinder.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: StoreFinderListComponent, selector: "cx-store-finder-list", inputs: ["locations", "useMylocation"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderSearchResultComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-search-result', template: "<div\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div *ngIf=\"locations?.stores.length\">\n    <div class=\"cx-pagination\">\n      <cx-pagination\n        aria-hidden=\"true\"\n        [pagination]=\"locations.pagination\"\n        (viewPageEvent)=\"viewPage($event)\"\n      ></cx-pagination>\n    </div>\n  </div>\n  <cx-store-finder-list\n    *ngIf=\"locations?.stores.length\"\n    [locations]=\"locations\"\n    [useMylocation]=\"useMyLocation\"\n  ></cx-store-finder-list>\n  <div class=\"container\" *ngIf=\"!locations?.stores.length\">\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeFinder.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }, { type: i2$1.ActivatedRoute }, { type: i1.StoreFinderConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderStoresCountComponent {
    constructor(storeFinderService) {
        this.storeFinderService = storeFinderService;
    }
    ngOnInit() {
        this.storeFinderService.viewAllStores();
        this.locations$ = this.storeFinderService.getViewAllStoresEntities();
        this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
    }
}
StoreFinderStoresCountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoresCountComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderStoresCountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderStoresCountComponent, selector: "cx-store-finder-stores-count", ngImport: i0, template: "<ng-container\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"cx-count container\">\n    <div class=\"row\" *ngIf=\"locations?.length\">\n      <div class=\"cx-visually-hidden\">\n        {{\n          'storeFinder.ariaLabelCountriesCount'\n            | cxTranslate: { count: locations?.length }\n        }}\n      </div>\n      <div\n        *ngFor=\"let country of locations\"\n        class=\"cx-set col-sm-6 col-md-4 col-lg-4 col-xl-3\"\n      >\n        <a\n          [routerLink]=\"['../country', country.isoCode]\"\n          class=\"btn-link\"\n          role=\"button\"\n          [attr.aria-label]=\"country.name + '(' + country.count + ')'\"\n        >\n          <h2 class=\"cx-title\" aria-hidden=\"true\">\n            <span\n              [ngClass]=\"\n                country?.storeCountDataList\n                  ? 'country-header'\n                  : 'country-header-link'\n              \"\n              class=\"cx-name\"\n              >{{ country.name }}</span\n            >\n            <span\n              [ngClass]=\"\n                country?.storeCountDataList\n                  ? 'country-header'\n                  : 'country-header-link'\n              \"\n              *ngIf=\"!country?.storeCountDataList\"\n              class=\"cx-country-count\"\n              >({{ country.count }})</span\n            >\n          </h2>\n        </a>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"!locations?.length\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeFinder.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n</ng-container>\n<ng-template #loading>\n  <div class=\"cx-count-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoresCountComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-stores-count', template: "<ng-container\n  *ngIf=\"\n    !(isLoading$ | async) && (locations$ | async) as locations;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"cx-count container\">\n    <div class=\"row\" *ngIf=\"locations?.length\">\n      <div class=\"cx-visually-hidden\">\n        {{\n          'storeFinder.ariaLabelCountriesCount'\n            | cxTranslate: { count: locations?.length }\n        }}\n      </div>\n      <div\n        *ngFor=\"let country of locations\"\n        class=\"cx-set col-sm-6 col-md-4 col-lg-4 col-xl-3\"\n      >\n        <a\n          [routerLink]=\"['../country', country.isoCode]\"\n          class=\"btn-link\"\n          role=\"button\"\n          [attr.aria-label]=\"country.name + '(' + country.count + ')'\"\n        >\n          <h2 class=\"cx-title\" aria-hidden=\"true\">\n            <span\n              [ngClass]=\"\n                country?.storeCountDataList\n                  ? 'country-header'\n                  : 'country-header-link'\n              \"\n              class=\"cx-name\"\n              >{{ country.name }}</span\n            >\n            <span\n              [ngClass]=\"\n                country?.storeCountDataList\n                  ? 'country-header'\n                  : 'country-header-link'\n              \"\n              *ngIf=\"!country?.storeCountDataList\"\n              class=\"cx-country-count\"\n              >({{ country.count }})</span\n            >\n          </h2>\n        </a>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"!locations?.length\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeFinder.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n</ng-container>\n<ng-template #loading>\n  <div class=\"cx-count-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderComponent {
}
StoreFinderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreFinderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderComponent, selector: "cx-store-finder", ngImport: i0, template: "<ng-container>\n  <div aria-live=\"assertive\" aria-relevant=\"additions text\">\n    <div class=\"cx-store-finder-wrapper\">\n      <cx-store-finder-header></cx-store-finder-header>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "component", type: StoreFinderHeaderComponent, selector: "cx-store-finder-header" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder', template: "<ng-container>\n  <div aria-live=\"assertive\" aria-relevant=\"additions text\">\n    <div class=\"cx-store-finder-wrapper\">\n      <cx-store-finder-header></cx-store-finder-header>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</ng-container>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderStoreComponent {
    constructor(storeFinderService, route, routingService) {
        this.storeFinderService = storeFinderService;
        this.route = route;
        this.routingService = routingService;
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        if (!this.location) {
            this.requestStoresData();
            this.location$ = this.storeFinderService.getFindStoreEntityById();
            this.isLoading$ = this.storeFinderService.getStoresLoading();
        }
    }
    requestStoresData() {
        this.storeFinderService.viewStoreById(this.route.snapshot.params.store);
    }
    goBack() {
        this.routingService.go([
            `store-finder/country/${this.route.snapshot.params.country}`,
        ]);
    }
}
StoreFinderStoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreComponent, deps: [{ token: i1.StoreFinderService }, { token: i2$1.ActivatedRoute }, { token: i1$1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
StoreFinderStoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderStoreComponent, selector: "cx-store-finder-store", inputs: { location: "location", disableMap: "disableMap" }, ngImport: i0, template: "<div aria-live=\"assertive\" aria-atomic=\"true\" aria-relevant=\"additions\">\n  <div\n    class=\"container\"\n    *ngIf=\"\n      location || (!(isLoading$ | async) && (location$ | async)) as location;\n      else loading\n    \"\n  >\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cx-visually-hidden\">\n      {{ location?.displayName }}\n    </div>\n    <div class=\"cx-store-actions\">\n      <button class=\"btn btn-block btn-secondary\" (click)=\"goBack()\">\n        <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n        {{ 'storeFinder.backToList' | cxTranslate }}\n      </button>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12 p-0\">\n        <cx-store-finder-store-description\n          [disableMap]=\"disableMap\"\n          [location]=\"location\"\n        ></cx-store-finder-store-description>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: StoreFinderStoreDescriptionComponent, selector: "cx-store-finder-store-description", inputs: ["location", "disableMap"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderStoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-store', template: "<div aria-live=\"assertive\" aria-atomic=\"true\" aria-relevant=\"additions\">\n  <div\n    class=\"container\"\n    *ngIf=\"\n      location || (!(isLoading$ | async) && (location$ | async)) as location;\n      else loading\n    \"\n  >\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cx-visually-hidden\">\n      {{ location?.displayName }}\n    </div>\n    <div class=\"cx-store-actions\">\n      <button class=\"btn btn-block btn-secondary\" (click)=\"goBack()\">\n        <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n        {{ 'storeFinder.backToList' | cxTranslate }}\n      </button>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12 p-0\">\n        <cx-store-finder-store-description\n          [disableMap]=\"disableMap\"\n          [location]=\"location\"\n        ></cx-store-finder-store-description>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }, { type: i2$1.ActivatedRoute }, { type: i1$1.RoutingService }]; }, propDecorators: { location: [{
                type: Input
            }], disableMap: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderComponentsModule {
}
StoreFinderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, declarations: [StoreFinderSearchComponent,
        StoreFinderListComponent,
        StoreFinderMapComponent,
        StoreFinderListItemComponent,
        StoreFinderStoresCountComponent,
        StoreFinderGridComponent,
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderHeaderComponent,
        StoreFinderSearchResultComponent,
        StoreFinderComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderStoreComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule,
        OutletModule], exports: [ScheduleComponent,
        StoreFinderComponent,
        StoreFinderGridComponent,
        StoreFinderHeaderComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderSearchComponent,
        StoreFinderSearchResultComponent,
        StoreFinderListComponent,
        StoreFinderStoreDescriptionComponent,
        StoreFinderStoresCountComponent,
        StoreFinderStoreComponent] });
StoreFinderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                StoreFinderComponent: {
                    component: StoreFinderComponent,
                    childRoutes: [
                        {
                            path: 'find',
                            component: StoreFinderSearchResultComponent,
                        },
                        {
                            path: 'view-all',
                            component: StoreFinderStoresCountComponent,
                        },
                        {
                            path: 'country/:country',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region/:store',
                            component: StoreFinderStoreComponent,
                        },
                        {
                            path: 'country/:country/:store',
                            component: StoreFinderStoreComponent,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        ListNavigationModule,
                        SpinnerModule,
                        UrlModule,
                        StoreFinderCoreModule,
                        I18nModule,
                        IconModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                StoreFinderComponent: {
                                    component: StoreFinderComponent,
                                    childRoutes: [
                                        {
                                            path: 'find',
                                            component: StoreFinderSearchResultComponent,
                                        },
                                        {
                                            path: 'view-all',
                                            component: StoreFinderStoresCountComponent,
                                        },
                                        {
                                            path: 'country/:country',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                        {
                                            path: 'country/:country/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        StoreFinderSearchComponent,
                        StoreFinderListComponent,
                        StoreFinderMapComponent,
                        StoreFinderListItemComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderGridComponent,
                        StoreFinderStoreDescriptionComponent,
                        ScheduleComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderStoreComponent,
                    ],
                    exports: [
                        ScheduleComponent,
                        StoreFinderComponent,
                        StoreFinderGridComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderListItemComponent,
                        StoreFinderMapComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderSearchComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderListComponent,
                        StoreFinderStoreDescriptionComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderStoreComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AbstractStoreItemComponent, ScheduleComponent, StoreFinderComponent, StoreFinderComponentsModule, StoreFinderGridComponent, StoreFinderHeaderComponent, StoreFinderListComponent, StoreFinderListItemComponent, StoreFinderMapComponent, StoreFinderPaginationDetailsComponent, StoreFinderSearchComponent, StoreFinderSearchResultComponent, StoreFinderStoreComponent, StoreFinderStoreDescriptionComponent, StoreFinderStoresCountComponent };
//# sourceMappingURL=spartacus-storefinder-components.mjs.map
