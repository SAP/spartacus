import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, Component, ViewChild, Output, ChangeDetectionStrategy, NgModule, Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { tap, map, distinctUntilChanged, shareReplay, switchMap, filter } from 'rxjs/operators';
import * as i1 from '@spartacus/core';
import { I18nModule, UrlModule, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import * as i2$1 from '@spartacus/organization/unit-order/root';
import { UnitOrderDetailsOrderEntriesContextToken } from '@spartacus/organization/unit-order/root';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i5 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, ListNavigationModule, CardModule } from '@spartacus/storefront';
import * as i2 from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { OrderEntriesSource } from '@spartacus/cart/base/root';
import { OrderDetailItemsComponent, OrderDetailsService, OrderDetailTotalsComponent } from '@spartacus/order/components';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderHistoryFilterComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.iconTypes = ICON_TYPE;
        this.filterForm = new FormGroup({
            buyerFilter: new FormControl(),
            unitFilter: new FormControl(),
        });
        this.filterFormMobile = new FormGroup({
            buyerFilterMobile: new FormControl(),
            unitFilterMobile: new FormControl(),
        });
        this.filterByBuyer = 'filterByBuyer';
        this.filterByUnit = 'filterByUnit';
        this.filterListEvent = new EventEmitter();
    }
    searchUnitLevelOrders() {
        const buyer = this.filterForm.get('buyerFilter')?.value;
        const unit = this.filterForm.get('unitFilter')?.value;
        this.filterFormMobile.setValue({
            buyerFilterMobile: buyer,
            unitFilterMobile: unit,
        });
        this.emitFilterEvent(buyer, unit);
        this.buyerFilterMobileValue = buyer;
        this.unitFilterMobileValue = unit;
    }
    emitFilterEvent(buyer, unit) {
        const filters = [];
        if (buyer?.length) {
            filters.push('user:' + buyer);
        }
        if (unit?.length) {
            filters.push('unit:' + unit);
        }
        filters.unshift(filters.length ? ':' : '');
        this.encodedFilter = filters.join(':');
        this.filterListEvent.emit({
            currentPage: 0,
            filters: this.encodedFilter,
        });
    }
    clearAll() {
        const buyer = this.filterForm.get('buyerFilter')?.value;
        const unit = this.filterForm.get('unitFilter')?.value;
        const buyerMobile = this.buyerFilterMobileId?.nativeElement.value;
        const unitMobile = this.unitFilterMobileId?.nativeElement.value;
        if (buyer || unit || buyerMobile || unitMobile) {
            this.filterForm.reset();
            this.filterFormMobile.reset();
            this.searchUnitLevelOrders();
        }
        this.unitFilterMobileValue = null;
        this.buyerFilterMobileValue = null;
    }
    launchMobileFilters() {
        this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.filterNav.nativeElement, 'width', '100%');
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
    searchUnitLevelOrdersForMobile() {
        this.getFormValuesForMobileAndEmitFilterEvent();
        this.closeFilterNav();
    }
    getFormValuesForMobileAndEmitFilterEvent() {
        const buyer = this.filterFormMobile.get('buyerFilterMobile')?.value;
        this.buyerFilterMobileValue = buyer;
        const unit = this.filterFormMobile.get('unitFilterMobile')?.value;
        this.unitFilterMobileValue = unit;
        this.filterForm.setValue({ buyerFilter: buyer, unitFilter: unit });
        this.emitFilterEvent(buyer, unit);
    }
    closeFilterNav() {
        this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
        this.renderer.setStyle(document.body, 'overflow', '');
        this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.filterNav.nativeElement, 'width', '0');
        this.filterFormMobile.patchValue({
            buyerFilterMobile: this.buyerFilterMobileValue,
            unitFilterMobile: this.unitFilterMobileValue,
        });
    }
    backFilterSubNav() {
        this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
        this.filterFormMobile.patchValue({
            buyerFilterMobile: this.buyerFilterMobileValue,
            unitFilterMobile: this.unitFilterMobileValue,
        });
    }
    launchSubNav(option) {
        this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
        if (option === this.filterByUnit) {
            this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'block');
        }
        else if (option === this.filterByBuyer) {
            this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'block');
        }
    }
    clearUnit() {
        this.filterForm.get('unitFilter')?.reset();
        this.searchUnitLevelOrders();
    }
    clearBuyer() {
        this.filterForm.get('buyerFilter')?.reset();
        this.searchUnitLevelOrders();
    }
    clearUnitMobile() {
        this.filterFormMobile.get('unitFilterMobile')?.reset();
        this.renderer.setStyle(document.body, 'overflow', '');
        this.unitFilterMobileValue = null;
        this.getFormValuesForMobileAndEmitFilterEvent();
    }
    clearBuyerMobile() {
        this.filterFormMobile.get('buyerFilterMobile')?.reset();
        this.renderer.setStyle(document.body, 'overflow', '');
        this.buyerFilterMobileValue = null;
        this.getFormValuesForMobileAndEmitFilterEvent();
    }
    searchBuyer(inputElement) {
        const value = inputElement.value;
        if (!value || value === '') {
            this.clearBuyer();
        }
    }
    searchUnit(inputElement) {
        const value = inputElement.value;
        if (!value || value === '') {
            this.clearUnit();
        }
    }
}
UnitLevelOrderHistoryFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
UnitLevelOrderHistoryFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitLevelOrderHistoryFilterComponent, selector: "cx-unit-level-order-history-filter", outputs: { filterListEvent: "filterListEvent" }, viewQueries: [{ propertyName: "filterNav", first: true, predicate: ["filterNav"], descendants: true, read: ElementRef }, { propertyName: "filterNavUnit", first: true, predicate: ["filterNavUnit"], descendants: true, read: ElementRef }, { propertyName: "filterNavBuyer", first: true, predicate: ["filterNavBuyer"], descendants: true, read: ElementRef }, { propertyName: "buyerFilterMobileId", first: true, predicate: ["buyerFilterMobileId"], descendants: true, read: ElementRef }, { propertyName: "unitFilterMobileId", first: true, predicate: ["unitFilterMobileId"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div\n  #filterNav\n  class=\"cx-filter\"\n  [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n>\n  <div class=\"cx-filter-list\">\n    <span>{{ 'unitLevelOrderHistory.filterBy' | cxTranslate }}</span>\n    <button\n      id=\"closeFilterNavBtn\"\n      type=\"button\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"closeFilterNav()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n\n  <div\n    class=\"cx-filter-list cx-filter-list-border\"\n    (click)=\"launchSubNav(filterByBuyer)\"\n  >\n    <span>{{ 'unitLevelOrderHistory.buyer' | cxTranslate }}</span>\n    <button\n      type=\"button\"\n      [attr.aria-label]=\"\n        'unitLevelOrderHistory.filterByBuyerLabel' | cxTranslate\n      \"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n\n  <div\n    class=\"cx-filter-list cx-filter-list-border\"\n    (click)=\"launchSubNav(filterByUnit)\"\n  >\n    <span>{{ 'unitLevelOrderHistory.unit' | cxTranslate }}</span>\n    <button\n      type=\"button\"\n      [attr.aria-label]=\"\n        'unitLevelOrderHistory.filterByUnitLabel' | cxTranslate\n      \"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</div>\n\n<form [formGroup]=\"filterFormMobile\">\n  <div\n    id=\"cx-unit-level-order-history-filter-nav-sub-buyer\"\n    #filterNavBuyer\n    class=\"cx-filter-nav\"\n    [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n  >\n    <div class=\"cx-filter-nav-div\">\n      <div class=\"cx-filter-list\">\n        <div class=\"cx-filter-back-button\" (click)=\"backFilterSubNav()\">\n          <button type=\"button\">\n            <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          </button>\n          <span>{{ 'unitLevelOrderHistory.filterByBuyer' | cxTranslate }}</span>\n        </div>\n\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"closeFilterNav()\"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </button>\n      </div>\n\n      <label [class.dirty]=\"!!buyerFilterMobileId.value\">\n        <input\n          #buyerFilterMobileId\n          formControlName=\"buyerFilterMobile\"\n          class=\"form-control buyer-filter-mobile\"\n          (input)=\"searchBuyer(buyerFilterMobileId)\"\n          (keydown.enter)=\"searchUnitLevelOrdersForMobile()\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n          \"\n          placeholder=\"{{\n            'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n          }}\"\n        />\n\n        <button\n          id=\"clearBuyerMobileBtn\"\n          [attr.aria-label]=\"'common.reset' | cxTranslate\"\n          (mousedown)=\"clearBuyerMobile()\"\n          (keydown.enter)=\"clearBuyerMobile()\"\n          class=\"reset cx-unit-level-order-history-filter-reset-button\"\n        >\n          <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n        </button>\n\n        <div role=\"presentation\" class=\"search-icon\">\n          <cx-icon\n            class=\"search-icon-filter\"\n            [type]=\"iconTypes.SEARCH\"\n          ></cx-icon>\n        </div>\n      </label>\n\n      <div class=\"cx-clear-btn-container\">\n        <button\n          class=\"cx-action-link cx-clear-btn\"\n          type=\"button\"\n          (click)=\"clearBuyerMobile()\"\n        >\n          {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div\n    id=\"cx-unit-level-order-history-filter-nav-sub-unit\"\n    #filterNavUnit\n    class=\"cx-filter-nav\"\n    [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n  >\n    <div class=\"cx-filter-nav-div\">\n      <div class=\"cx-filter-list\">\n        <div class=\"cx-filter-back-button\" (click)=\"backFilterSubNav()\">\n          <button type=\"button\">\n            <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          </button>\n          <span>{{ 'unitLevelOrderHistory.filterByUnit' | cxTranslate }}</span>\n        </div>\n\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"closeFilterNav()\"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </button>\n      </div>\n\n      <label [class.dirty]=\"!!unitFilterMobileId.value\">\n        <input\n          #unitFilterMobileId\n          formControlName=\"unitFilterMobile\"\n          class=\"form-control unit-filter-mobile\"\n          (input)=\"searchUnit(unitFilterMobileId)\"\n          (keydown.enter)=\"searchUnitLevelOrdersForMobile()\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n          \"\n          placeholder=\"{{\n            'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n          }}\"\n        />\n        <button\n          id=\"clearUnitMobileBtn\"\n          [attr.aria-label]=\"'common.reset' | cxTranslate\"\n          (mousedown)=\"clearUnitMobile()\"\n          (keydown.enter)=\"clearUnitMobile()\"\n          class=\"reset cx-unit-level-order-history-filter-reset-button\"\n        >\n          <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n        </button>\n\n        <div role=\"presentation\" class=\"search-icon\">\n          <cx-icon\n            class=\"search-icon-filter\"\n            [type]=\"iconTypes.SEARCH\"\n          ></cx-icon>\n        </div>\n      </label>\n\n      <div class=\"cx-clear-btn-container\">\n        <button\n          class=\"cx-action-link cx-clear-btn\"\n          type=\"button\"\n          (click)=\"clearUnitMobile()\"\n        >\n          {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n</form>\n\n<form [formGroup]=\"filterForm\" (keydown.enter)=\"searchUnitLevelOrders()\">\n  <div>\n    <div class=\"cx-unit-level-order-history-filter-div-wrapper\">\n      <div>\n        <span>\n          {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n        </span>\n        <div\n          role=\"search\"\n          class=\"cx-unit-level-order-history-filter-label-wrapper\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByBuyerAriaLabel' | cxTranslate\n          \"\n        >\n          <label\n            class=\"cx-unit-level-order-history-filter-label\"\n            [class.dirty]=\"!!buyerFilterId.value\"\n          >\n            <input\n              #buyerFilterId\n              formControlName=\"buyerFilter\"\n              class=\"form-control cx-unit-level-order-history-filter-input\"\n              (input)=\"searchBuyer(buyerFilterId)\"\n              [attr.aria-label]=\"\n                'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n              \"\n              placeholder=\"{{\n                'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n              }}\"\n            />\n            <button\n              id=\"clearBuyerBtn\"\n              [attr.aria-label]=\"'common.reset' | cxTranslate\"\n              (mousedown)=\"clearBuyer()\"\n              (keydown.enter)=\"clearBuyer()\"\n              class=\"reset cx-unit-level-order-history-filter-reset-button\"\n            >\n              <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n            </button>\n\n            <div role=\"presentation\" class=\"search-icon\">\n              <cx-icon\n                class=\"search-icon-filter\"\n                [type]=\"iconTypes.SEARCH\"\n              ></cx-icon>\n            </div>\n          </label>\n        </div>\n      </div>\n\n      <div>\n        <span>\n          {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n        </span>\n        <div\n          role=\"search\"\n          class=\"cx-unit-level-order-history-filter-label-wrapper\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByUnitAriaLabel' | cxTranslate\n          \"\n        >\n          <label\n            class=\"cx-unit-level-order-history-filter-label\"\n            [class.dirty]=\"!!unitFilterId.value\"\n          >\n            <input\n              #unitFilterId\n              formControlName=\"unitFilter\"\n              class=\"form-control cx-unit-level-order-history-filter-input\"\n              (input)=\"searchUnit(unitFilterId)\"\n              [attr.aria-label]=\"\n                'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n              \"\n              placeholder=\"{{\n                'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n              }}\"\n            />\n            <button\n              id=\"clearUnitBtn\"\n              type=\"button\"\n              [attr.aria-label]=\"'common.reset' | cxTranslate\"\n              (mousedown)=\"clearUnit()\"\n              (keydown.enter)=\"clearUnit()\"\n              class=\"reset cx-unit-level-order-history-filter-reset-button\"\n            >\n              <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n            </button>\n\n            <div role=\"presentation\" class=\"search-icon\">\n              <cx-icon\n                class=\"search-icon-filter\"\n                [type]=\"iconTypes.SEARCH\"\n              ></cx-icon>\n            </div>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-unit-level-order-history-filter-form-button-block\">\n      <button\n        id=\"clearAllBtn\"\n        class=\"cx-action-link cx-clear-btn\"\n        type=\"button\"\n        (click)=\"clearAll()\"\n      >\n        {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n      </button>\n      <button\n        id=\"searchUnitLevelOrdersBtn\"\n        class=\"btn btn-primary unit-level-order-history-search\"\n        type=\"button\"\n        (click)=\"searchUnitLevelOrders()\"\n      >\n        {{ 'unitLevelOrderHistory.search' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</form>\n\n<div class=\"cx-unit-level-order-history-filter-form-mobile\">\n  <button\n    id=\"filterByBtn\"\n    class=\"btn btn-action btn-block dialog-trigger\"\n    (click)=\"launchMobileFilters()\"\n  >\n    <cx-icon [type]=\"iconTypes.FILTER\"></cx-icon>\n    {{ 'unitLevelOrderHistory.filterBy' | cxTranslate }}\n  </button>\n\n  <div\n    *ngIf=\"buyerFilterMobileValue || unitFilterMobileValue\"\n    class=\"cx-unit-level-order-history-filters-show-and-remove\"\n  >\n    <div class=\"cx-selected-filters\">\n      {{ 'unitLevelOrderHistory.yourFilters' | cxTranslate }}\n      <span *ngIf=\"buyerFilterMobileValue\">\"{{ buyerFilterMobileValue }}\"</span\n      ><span *ngIf=\"buyerFilterMobileValue && unitFilterMobileValue\">{{\n        'unitLevelOrderHistory.and' | cxTranslate\n      }}</span\n      ><span *ngIf=\"unitFilterMobileValue\">\"{{ unitFilterMobileValue }}\"</span>\n    </div>\n\n    <div class=\"cx-clear-filter\">\n      <button\n        id=\"removeAppliedFiltersBtn\"\n        class=\"cx-action-link cx-clear-btn\"\n        type=\"button\"\n        (click)=\"clearAll()\"\n      >\n        {{ 'unitLevelOrderHistory.removeAppliedFilters' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-unit-level-order-history-filter', template: "<div\n  #filterNav\n  class=\"cx-filter\"\n  [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n>\n  <div class=\"cx-filter-list\">\n    <span>{{ 'unitLevelOrderHistory.filterBy' | cxTranslate }}</span>\n    <button\n      id=\"closeFilterNavBtn\"\n      type=\"button\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"closeFilterNav()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n\n  <div\n    class=\"cx-filter-list cx-filter-list-border\"\n    (click)=\"launchSubNav(filterByBuyer)\"\n  >\n    <span>{{ 'unitLevelOrderHistory.buyer' | cxTranslate }}</span>\n    <button\n      type=\"button\"\n      [attr.aria-label]=\"\n        'unitLevelOrderHistory.filterByBuyerLabel' | cxTranslate\n      \"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n\n  <div\n    class=\"cx-filter-list cx-filter-list-border\"\n    (click)=\"launchSubNav(filterByUnit)\"\n  >\n    <span>{{ 'unitLevelOrderHistory.unit' | cxTranslate }}</span>\n    <button\n      type=\"button\"\n      [attr.aria-label]=\"\n        'unitLevelOrderHistory.filterByUnitLabel' | cxTranslate\n      \"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</div>\n\n<form [formGroup]=\"filterFormMobile\">\n  <div\n    id=\"cx-unit-level-order-history-filter-nav-sub-buyer\"\n    #filterNavBuyer\n    class=\"cx-filter-nav\"\n    [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n  >\n    <div class=\"cx-filter-nav-div\">\n      <div class=\"cx-filter-list\">\n        <div class=\"cx-filter-back-button\" (click)=\"backFilterSubNav()\">\n          <button type=\"button\">\n            <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          </button>\n          <span>{{ 'unitLevelOrderHistory.filterByBuyer' | cxTranslate }}</span>\n        </div>\n\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"closeFilterNav()\"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </button>\n      </div>\n\n      <label [class.dirty]=\"!!buyerFilterMobileId.value\">\n        <input\n          #buyerFilterMobileId\n          formControlName=\"buyerFilterMobile\"\n          class=\"form-control buyer-filter-mobile\"\n          (input)=\"searchBuyer(buyerFilterMobileId)\"\n          (keydown.enter)=\"searchUnitLevelOrdersForMobile()\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n          \"\n          placeholder=\"{{\n            'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n          }}\"\n        />\n\n        <button\n          id=\"clearBuyerMobileBtn\"\n          [attr.aria-label]=\"'common.reset' | cxTranslate\"\n          (mousedown)=\"clearBuyerMobile()\"\n          (keydown.enter)=\"clearBuyerMobile()\"\n          class=\"reset cx-unit-level-order-history-filter-reset-button\"\n        >\n          <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n        </button>\n\n        <div role=\"presentation\" class=\"search-icon\">\n          <cx-icon\n            class=\"search-icon-filter\"\n            [type]=\"iconTypes.SEARCH\"\n          ></cx-icon>\n        </div>\n      </label>\n\n      <div class=\"cx-clear-btn-container\">\n        <button\n          class=\"cx-action-link cx-clear-btn\"\n          type=\"button\"\n          (click)=\"clearBuyerMobile()\"\n        >\n          {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div\n    id=\"cx-unit-level-order-history-filter-nav-sub-unit\"\n    #filterNavUnit\n    class=\"cx-filter-nav\"\n    [attr.aria-label]=\"'unitLevelOrderHistory.filterBy' | cxTranslate\"\n  >\n    <div class=\"cx-filter-nav-div\">\n      <div class=\"cx-filter-list\">\n        <div class=\"cx-filter-back-button\" (click)=\"backFilterSubNav()\">\n          <button type=\"button\">\n            <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n          </button>\n          <span>{{ 'unitLevelOrderHistory.filterByUnit' | cxTranslate }}</span>\n        </div>\n\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"closeFilterNav()\"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </button>\n      </div>\n\n      <label [class.dirty]=\"!!unitFilterMobileId.value\">\n        <input\n          #unitFilterMobileId\n          formControlName=\"unitFilterMobile\"\n          class=\"form-control unit-filter-mobile\"\n          (input)=\"searchUnit(unitFilterMobileId)\"\n          (keydown.enter)=\"searchUnitLevelOrdersForMobile()\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n          \"\n          placeholder=\"{{\n            'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n          }}\"\n        />\n        <button\n          id=\"clearUnitMobileBtn\"\n          [attr.aria-label]=\"'common.reset' | cxTranslate\"\n          (mousedown)=\"clearUnitMobile()\"\n          (keydown.enter)=\"clearUnitMobile()\"\n          class=\"reset cx-unit-level-order-history-filter-reset-button\"\n        >\n          <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n        </button>\n\n        <div role=\"presentation\" class=\"search-icon\">\n          <cx-icon\n            class=\"search-icon-filter\"\n            [type]=\"iconTypes.SEARCH\"\n          ></cx-icon>\n        </div>\n      </label>\n\n      <div class=\"cx-clear-btn-container\">\n        <button\n          class=\"cx-action-link cx-clear-btn\"\n          type=\"button\"\n          (click)=\"clearUnitMobile()\"\n        >\n          {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n</form>\n\n<form [formGroup]=\"filterForm\" (keydown.enter)=\"searchUnitLevelOrders()\">\n  <div>\n    <div class=\"cx-unit-level-order-history-filter-div-wrapper\">\n      <div>\n        <span>\n          {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n        </span>\n        <div\n          role=\"search\"\n          class=\"cx-unit-level-order-history-filter-label-wrapper\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByBuyerAriaLabel' | cxTranslate\n          \"\n        >\n          <label\n            class=\"cx-unit-level-order-history-filter-label\"\n            [class.dirty]=\"!!buyerFilterId.value\"\n          >\n            <input\n              #buyerFilterId\n              formControlName=\"buyerFilter\"\n              class=\"form-control cx-unit-level-order-history-filter-input\"\n              (input)=\"searchBuyer(buyerFilterId)\"\n              [attr.aria-label]=\"\n                'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n              \"\n              placeholder=\"{{\n                'unitLevelOrderHistory.filterByBuyerPlaceholder' | cxTranslate\n              }}\"\n            />\n            <button\n              id=\"clearBuyerBtn\"\n              [attr.aria-label]=\"'common.reset' | cxTranslate\"\n              (mousedown)=\"clearBuyer()\"\n              (keydown.enter)=\"clearBuyer()\"\n              class=\"reset cx-unit-level-order-history-filter-reset-button\"\n            >\n              <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n            </button>\n\n            <div role=\"presentation\" class=\"search-icon\">\n              <cx-icon\n                class=\"search-icon-filter\"\n                [type]=\"iconTypes.SEARCH\"\n              ></cx-icon>\n            </div>\n          </label>\n        </div>\n      </div>\n\n      <div>\n        <span>\n          {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n        </span>\n        <div\n          role=\"search\"\n          class=\"cx-unit-level-order-history-filter-label-wrapper\"\n          [attr.aria-label]=\"\n            'unitLevelOrderHistory.filterByUnitAriaLabel' | cxTranslate\n          \"\n        >\n          <label\n            class=\"cx-unit-level-order-history-filter-label\"\n            [class.dirty]=\"!!unitFilterId.value\"\n          >\n            <input\n              #unitFilterId\n              formControlName=\"unitFilter\"\n              class=\"form-control cx-unit-level-order-history-filter-input\"\n              (input)=\"searchUnit(unitFilterId)\"\n              [attr.aria-label]=\"\n                'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n              \"\n              placeholder=\"{{\n                'unitLevelOrderHistory.filterByUnitPlaceholder' | cxTranslate\n              }}\"\n            />\n            <button\n              id=\"clearUnitBtn\"\n              type=\"button\"\n              [attr.aria-label]=\"'common.reset' | cxTranslate\"\n              (mousedown)=\"clearUnit()\"\n              (keydown.enter)=\"clearUnit()\"\n              class=\"reset cx-unit-level-order-history-filter-reset-button\"\n            >\n              <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n            </button>\n\n            <div role=\"presentation\" class=\"search-icon\">\n              <cx-icon\n                class=\"search-icon-filter\"\n                [type]=\"iconTypes.SEARCH\"\n              ></cx-icon>\n            </div>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-unit-level-order-history-filter-form-button-block\">\n      <button\n        id=\"clearAllBtn\"\n        class=\"cx-action-link cx-clear-btn\"\n        type=\"button\"\n        (click)=\"clearAll()\"\n      >\n        {{ 'unitLevelOrderHistory.clearAll' | cxTranslate }}\n      </button>\n      <button\n        id=\"searchUnitLevelOrdersBtn\"\n        class=\"btn btn-primary unit-level-order-history-search\"\n        type=\"button\"\n        (click)=\"searchUnitLevelOrders()\"\n      >\n        {{ 'unitLevelOrderHistory.search' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</form>\n\n<div class=\"cx-unit-level-order-history-filter-form-mobile\">\n  <button\n    id=\"filterByBtn\"\n    class=\"btn btn-action btn-block dialog-trigger\"\n    (click)=\"launchMobileFilters()\"\n  >\n    <cx-icon [type]=\"iconTypes.FILTER\"></cx-icon>\n    {{ 'unitLevelOrderHistory.filterBy' | cxTranslate }}\n  </button>\n\n  <div\n    *ngIf=\"buyerFilterMobileValue || unitFilterMobileValue\"\n    class=\"cx-unit-level-order-history-filters-show-and-remove\"\n  >\n    <div class=\"cx-selected-filters\">\n      {{ 'unitLevelOrderHistory.yourFilters' | cxTranslate }}\n      <span *ngIf=\"buyerFilterMobileValue\">\"{{ buyerFilterMobileValue }}\"</span\n      ><span *ngIf=\"buyerFilterMobileValue && unitFilterMobileValue\">{{\n        'unitLevelOrderHistory.and' | cxTranslate\n      }}</span\n      ><span *ngIf=\"unitFilterMobileValue\">\"{{ unitFilterMobileValue }}\"</span>\n    </div>\n\n    <div class=\"cx-clear-filter\">\n      <button\n        id=\"removeAppliedFiltersBtn\"\n        class=\"cx-action-link cx-clear-btn\"\n        type=\"button\"\n        (click)=\"clearAll()\"\n      >\n        {{ 'unitLevelOrderHistory.removeAppliedFilters' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { filterNav: [{
                type: ViewChild,
                args: ['filterNav', { read: ElementRef }]
            }], filterNavUnit: [{
                type: ViewChild,
                args: ['filterNavUnit', { read: ElementRef }]
            }], filterNavBuyer: [{
                type: ViewChild,
                args: ['filterNavBuyer', { read: ElementRef }]
            }], buyerFilterMobileId: [{
                type: ViewChild,
                args: ['buyerFilterMobileId', { read: ElementRef }]
            }], unitFilterMobileId: [{
                type: ViewChild,
                args: ['unitFilterMobileId', { read: ElementRef }]
            }], filterListEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderHistoryComponent {
    constructor(routing, unitOrdersFacade, translation) {
        this.routing = routing;
        this.unitOrdersFacade = unitOrdersFacade;
        this.translation = translation;
        this.PAGE_SIZE = 5;
        // Contains the initial query parameters and will be updated with current state of filters
        this.queryParams = {
            currentPage: 0,
            sortCode: '',
            filters: '',
        };
        this.orders$ = this.unitOrdersFacade
            .getOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap((orders) => {
            if (orders?.pagination?.sort) {
                this.sortType = orders.pagination.sort;
                this.queryParams.sortCode = this.sortType;
            }
        }));
        this.isLoaded$ = this.unitOrdersFacade.getOrderHistoryListLoaded();
    }
    ngOnDestroy() {
        this.unitOrdersFacade.clearOrderList();
    }
    filterChange(newFilters) {
        this.updateQueryParams({
            ...newFilters,
            currentPage: 0,
        });
        this.fetchOrders(this.queryParams);
    }
    updateQueryParams(partialParams) {
        // Overwrite each value present in partialParams to _queryParams
        Object.entries(partialParams).forEach((param) => (this.queryParams[param[0]] = param[1]));
    }
    changeSortCode(sortCode) {
        this.updateQueryParams({
            sortCode: sortCode,
            currentPage: 0,
        });
        this.sortType = sortCode;
        this.fetchOrders(this.queryParams);
    }
    pageChange(page) {
        this.updateQueryParams({
            currentPage: page,
        });
        this.fetchOrders(this.queryParams);
    }
    goToOrderDetail(order) {
        this.routing.go({
            cxRoute: 'unitLevelOrderDetail',
            params: order,
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.orderNumber'),
            this.translation.translate('unitLevelOrderHistorySorting.orgUnit'),
            this.translation.translate('unitLevelOrderHistorySorting.buyer'),
            this.translation.translate('unitLevelOrderHistorySorting.orgUnitDesc'),
            this.translation.translate('unitLevelOrderHistorySorting.buyerDesc'),
        ]).pipe(map(([textByDate, textByOrderNumber, textByOrgUnit, textByBuyer, textByOrgUnitDesc, textByBuyerDesc,]) => {
            return {
                byDate: textByDate,
                byOrderNumber: textByOrderNumber,
                byOrgUnit: textByOrgUnit,
                byBuyer: textByBuyer,
                byOrgUnitDesc: textByOrgUnitDesc,
                byBuyerDesc: textByBuyerDesc,
            };
        }));
    }
    fetchOrders(queryParam) {
        this.unitOrdersFacade.loadOrderList(this.PAGE_SIZE, queryParam.currentPage, queryParam.filters, queryParam.sortCode);
    }
}
UnitLevelOrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryComponent, deps: [{ token: i1.RoutingService }, { token: i2$1.UnitOrderFacade }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
UnitLevelOrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitLevelOrderHistoryComponent, selector: "cx-unit-level-order-history", ngImport: i0, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory as orderHistory\">\n    <div>\n      <!-- HEADER -->\n\n      <cx-unit-level-order-history-filter\n        (filterListEvent)=\"filterChange($event)\"\n      ></cx-unit-level-order-history-filter>\n\n      <!-- BODY -->\n      <div class=\"cx-unit-level-order-history-body\">\n        <ng-container\n          *ngIf=\"orderHistory.pagination?.totalResults ?? 0 > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-unit-level-order-history-sort top\">\n            <label class=\"cx-unit-level-order-history-form-group form-group\"\n              ><span>\n                {{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"orderHistory?.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"orderHistory?.pagination?.sort\"\n                placeholder=\"{{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'unitLevelOrderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div class=\"cx-unit-level-order-history-total-result\">\n              <cx-total [pagination]=\"orderHistory?.pagination\"></cx-total>\n            </div>\n            <div\n              *ngIf=\"orderHistory?.pagination?.totalPages ?? 0 > 1\"\n              class=\"cx-unit-level-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"orderHistory?.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n          <!-- TABLE -->\n          <table\n            id=\"order-history-table\"\n            class=\"table cx-unit-level-order-history-table\"\n          >\n            <thead class=\"cx-unit-level-order-history-thead-mobile\">\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.orderId' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.date' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.status' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.total' | cxTranslate }}\n              </th>\n            </thead>\n            <tbody>\n              <tr\n                *ngFor=\"let order of orderHistory?.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td class=\"cx-unit-level-order-history-code\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-placed\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.placed | cxDate: 'longDate' }}\n                  </a>\n                </td>\n                <td class=\"cx-unit-level-order-history-status\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-buyer\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.orgCustomer?.name }}\n                    <span class=\"text-ellipsis\">{{\n                      order?.orgCustomer?.email\n                    }}</span></a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-unit\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.orgUnit?.name }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-total\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.total?.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-unit-level-order-history-sort bottom\">\n            <label class=\"cx-unit-level-order-history-form-group form-group\"\n              ><span>\n                {{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"orderHistory?.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"orderHistory?.pagination?.sort\"\n                placeholder=\"{{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'unitLevelOrderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div class=\"cx-unit-level-order-history-total-result\">\n              <cx-total [pagination]=\"orderHistory?.pagination\"></cx-total>\n            </div>\n            <div\n              *ngIf=\"orderHistory?.pagination?.totalPages ?? 0 > 1\"\n              class=\"cx-unit-level-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"orderHistory?.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            class=\"cx-unit-level-order-history-no-order\"\n          >\n            <div>\n              <div>{{ 'unitLevelOrderHistory.noOrders' | cxTranslate }}</div>\n              <a\n                [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                routerLinkActive=\"active\"\n                class=\"btn btn-primary btn-block\"\n                >{{ 'unitLevelOrderHistory.startShopping' | cxTranslate }}</a\n              >\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i5.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i5.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i5.TotalComponent, selector: "cx-total", inputs: ["pagination"] }, { kind: "component", type: UnitLevelOrderHistoryFilterComponent, selector: "cx-unit-level-order-history-filter", outputs: ["filterListEvent"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-unit-level-order-history', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory as orderHistory\">\n    <div>\n      <!-- HEADER -->\n\n      <cx-unit-level-order-history-filter\n        (filterListEvent)=\"filterChange($event)\"\n      ></cx-unit-level-order-history-filter>\n\n      <!-- BODY -->\n      <div class=\"cx-unit-level-order-history-body\">\n        <ng-container\n          *ngIf=\"orderHistory.pagination?.totalResults ?? 0 > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-unit-level-order-history-sort top\">\n            <label class=\"cx-unit-level-order-history-form-group form-group\"\n              ><span>\n                {{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"orderHistory?.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"orderHistory?.pagination?.sort\"\n                placeholder=\"{{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'unitLevelOrderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div class=\"cx-unit-level-order-history-total-result\">\n              <cx-total [pagination]=\"orderHistory?.pagination\"></cx-total>\n            </div>\n            <div\n              *ngIf=\"orderHistory?.pagination?.totalPages ?? 0 > 1\"\n              class=\"cx-unit-level-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"orderHistory?.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n          <!-- TABLE -->\n          <table\n            id=\"order-history-table\"\n            class=\"table cx-unit-level-order-history-table\"\n          >\n            <thead class=\"cx-unit-level-order-history-thead-mobile\">\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.orderId' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.date' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.status' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n              </th>\n              <th scope=\"col\">\n                {{ 'unitLevelOrderHistory.total' | cxTranslate }}\n              </th>\n            </thead>\n            <tbody>\n              <tr\n                *ngFor=\"let order of orderHistory?.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td class=\"cx-unit-level-order-history-code\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-placed\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.placed | cxDate: 'longDate' }}\n                  </a>\n                </td>\n                <td class=\"cx-unit-level-order-history-status\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-buyer\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.buyer' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.orgCustomer?.name }}\n                    <span class=\"text-ellipsis\">{{\n                      order?.orgCustomer?.email\n                    }}</span></a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-unit\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.unit' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.orgUnit?.name }}</a\n                  >\n                </td>\n                <td class=\"cx-unit-level-order-history-total\">\n                  <div class=\"cx-unit-level-order-history-label\">\n                    {{ 'unitLevelOrderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'unitLevelOrderDetail',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-unit-level-order-history-value\"\n                  >\n                    {{ order?.total?.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-unit-level-order-history-sort bottom\">\n            <label class=\"cx-unit-level-order-history-form-group form-group\"\n              ><span>\n                {{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"orderHistory?.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"orderHistory?.pagination?.sort\"\n                placeholder=\"{{ 'unitLevelOrderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'unitLevelOrderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div class=\"cx-unit-level-order-history-total-result\">\n              <cx-total [pagination]=\"orderHistory?.pagination\"></cx-total>\n            </div>\n            <div\n              *ngIf=\"orderHistory?.pagination?.totalPages ?? 0 > 1\"\n              class=\"cx-unit-level-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"orderHistory?.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            class=\"cx-unit-level-order-history-no-order\"\n          >\n            <div>\n              <div>{{ 'unitLevelOrderHistory.noOrders' | cxTranslate }}</div>\n              <a\n                [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                routerLinkActive=\"active\"\n                class=\"btn btn-primary btn-block\"\n                >{{ 'unitLevelOrderHistory.startShopping' | cxTranslate }}</a\n              >\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2$1.UnitOrderFacade }, { type: i1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderHistoryFilterModule {
}
UnitLevelOrderHistoryFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderHistoryFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, declarations: [UnitLevelOrderHistoryFilterComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule], exports: [UnitLevelOrderHistoryFilterComponent] });
UnitLevelOrderHistoryFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [UnitLevelOrderHistoryFilterComponent],
                    exports: [UnitLevelOrderHistoryFilterComponent],
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderHistoryModule {
}
UnitLevelOrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, declarations: [UnitLevelOrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        UnitLevelOrderHistoryFilterModule], exports: [UnitLevelOrderHistoryComponent] });
UnitLevelOrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UnitLevelOrderHistoryComponent: {
                    component: UnitLevelOrderHistoryComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        UnitLevelOrderHistoryFilterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                        UnitLevelOrderHistoryFilterModule,
                    ],
                    declarations: [UnitLevelOrderHistoryComponent],
                    exports: [UnitLevelOrderHistoryComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UnitLevelOrderHistoryComponent: {
                                    component: UnitLevelOrderHistoryComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                },
                            },
                        }),
                    ],
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
class UnitLevelOrderDetailService {
    constructor(unitOrderFacade, routingService) {
        this.unitOrderFacade = unitOrderFacade;
        this.routingService = routingService;
        this.orderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.orderCode), distinctUntilChanged());
        this.orderLoad$ = this.orderCode$.pipe(tap((orderCode) => {
            if (orderCode) {
                this.unitOrderFacade.loadOrderDetails(orderCode);
            }
            else {
                this.unitOrderFacade.clearOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.orderLoad$.pipe(switchMap(() => this.unitOrderFacade.getOrderDetails()));
    }
}
UnitLevelOrderDetailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailService, deps: [{ token: i2$1.UnitOrderFacade }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitLevelOrderDetailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2$1.UnitOrderFacade }, { type: i1.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderOverviewComponent {
    constructor(translation, unitLevelOrderDetailsService) {
        this.translation = translation;
        this.unitLevelOrderDetailsService = unitLevelOrderDetailsService;
    }
    ngOnInit() {
        this.order$ = this.unitLevelOrderDetailsService.getOrderDetails();
    }
    getOrderCodeCardContent(orderCode) {
        return this.translation.translate('orderDetails.orderNumber').pipe(filter(() => Boolean(orderCode)), map((textTitle) => ({
            title: textTitle,
            text: [orderCode],
        })));
    }
    getOrderCurrentDateCardContent(isoDate) {
        return this.translation.translate('orderDetails.placedOn').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getOrderStatusCardContent(status) {
        return combineLatest([
            this.translation.translate('orderDetails.status'),
            status
                ? this.translation.translate('orderDetails.statusDisplay_' + status)
                : of(''),
        ]).pipe(filter(() => Boolean(status)), map(([textTitle, textStatus]) => ({
            title: textTitle,
            text: [textStatus],
        })));
    }
    getPurchaseOrderNumber(poNumber) {
        return combineLatest([
            this.translation.translate('orderDetails.purchaseOrderNumber'),
            this.translation.translate('orderDetails.emptyPurchaseOrderId'),
        ]).pipe(filter(() => Boolean(poNumber)), map(([textTitle, noneTextTitle]) => ({
            title: textTitle,
            text: [poNumber ? poNumber : noneTextTitle],
        })));
    }
    getMethodOfPaymentCardContent(hasPaymentInfo) {
        return combineLatest([
            this.translation.translate('orderDetails.methodOfPayment'),
            this.translation.translate('paymentTypes.paymentType_ACCOUNT'),
            this.translation.translate('paymentTypes.paymentType_CARD'),
        ]).pipe(filter(() => Boolean(hasPaymentInfo)), map(([textTitle, textAccount, textCard]) => ({
            title: textTitle,
            text: [Boolean(hasPaymentInfo) ? textCard : textAccount],
        })));
    }
    getCostCenterCardContent(costCenter) {
        return this.translation.translate('orderDetails.costCenter').pipe(filter(() => Boolean(costCenter)), map((textTitle) => ({
            title: textTitle,
            textBold: costCenter?.name,
            text: [`(${costCenter?.unit?.name})`],
        })));
    }
    getAddressCardContent(deliveryAddress) {
        return this.translation.translate('addressCard.shipTo').pipe(filter(() => Boolean(deliveryAddress)), map((textTitle) => {
            const formattedAddress = this.normalizeFormattedAddress(deliveryAddress?.formattedAddress ?? '');
            return {
                title: textTitle,
                textBold: `${deliveryAddress?.firstName} ${deliveryAddress?.lastName}`,
                text: [formattedAddress, deliveryAddress?.country?.name],
            };
        }));
    }
    getDeliveryModeCardContent(deliveryMode) {
        return this.translation.translate('orderDetails.shippingMethod').pipe(filter(() => Boolean(deliveryMode)), map((textTitle) => ({
            title: textTitle,
            textBold: deliveryMode?.name,
            text: [
                deliveryMode?.description,
                deliveryMode?.deliveryCost?.formattedValue
                    ? deliveryMode.deliveryCost?.formattedValue
                    : '',
            ],
        })));
    }
    getPaymentInfoCardContent(payment) {
        return combineLatest([
            this.translation.translate('paymentForm.payment'),
            this.translation.translate('paymentCard.expires', {
                month: payment ? payment.expiryMonth : '',
                year: payment ? payment.expiryYear : '',
            }),
        ]).pipe(filter(() => Boolean(payment)), map(([textTitle, textExpires]) => ({
            title: textTitle,
            textBold: payment?.accountHolderName,
            text: [payment?.cardNumber, textExpires],
        })));
    }
    getBillingAddressCardContent(billingAddress) {
        return this.translation.translate('paymentForm.billingAddress').pipe(filter(() => Boolean(billingAddress)), map((textTitle) => ({
            title: textTitle,
            textBold: `${billingAddress?.firstName} ${billingAddress?.lastName}`,
            text: [
                billingAddress?.formattedAddress,
                billingAddress?.country?.name,
            ],
        })));
    }
    getBuyerNameCardContent(customer) {
        return this.translation.translate('unitLevelOrderDetails.buyer').pipe(filter(() => Boolean(customer)), map((textTitle) => ({
            title: textTitle,
            text: [customer?.name, `(${customer?.email})`],
        })));
    }
    getUnitNameCardContent(orgUnit) {
        return this.translation.translate('orderDetails.unit').pipe(filter(() => Boolean(orgUnit)), map((textTitle) => ({
            title: textTitle,
            text: [orgUnit],
        })));
    }
    normalizeFormattedAddress(formattedAddress) {
        const addresses = formattedAddress
            .split(',')
            .map((address) => address.trim());
        return addresses.filter(Boolean).join(', ');
    }
}
UnitLevelOrderOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewComponent, deps: [{ token: i1.TranslationService }, { token: UnitLevelOrderDetailService }], target: i0.ɵɵFactoryTarget.Component });
UnitLevelOrderOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitLevelOrderOverviewComponent, selector: "cx-unit-level-order-overview", ngImport: i0, template: "<div class=\"cx-order-summary\" *ngIf=\"order$ | async as order\">\n  <div class=\"container\">\n    <div class=\"cx-summary-card\">\n      <cx-card\n        [content]=\"getOrderCodeCardContent(order.code) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"\n          getOrderCurrentDateCardContent(order.created | cxDate) | async\n        \"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n      ></cx-card>\n\n      <cx-card\n        class=\"cx-display-inline\"\n        [content]=\"getBuyerNameCardContent(order.orgCustomer) | async\"\n      ></cx-card>\n    </div>\n    <div class=\"cx-summary-card\">\n      <cx-card\n        [content]=\"getUnitNameCardContent(order.orgUnit?.name) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getPurchaseOrderNumber(order.purchaseOrderNumber) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n      ></cx-card>\n\n      <ng-container *ngIf=\"order.costCenter\">\n        <cx-card\n          [content]=\"getCostCenterCardContent(order.costCenter) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <div class=\"cx-summary-card\">\n      <ng-container *ngIf=\"order.deliveryAddress\">\n        <cx-card\n          [content]=\"getAddressCardContent(order.deliveryAddress) | async\"\n        ></cx-card>\n      </ng-container>\n\n      <ng-container *ngIf=\"order.deliveryMode\">\n        <cx-card\n          [content]=\"getDeliveryModeCardContent(order.deliveryMode) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <ng-container *ngIf=\"order.paymentInfo\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPaymentInfoCardContent(order.paymentInfo) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getBillingAddressCardContent(order.paymentInfo?.billingAddress)\n              | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-unit-level-order-overview', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-summary\" *ngIf=\"order$ | async as order\">\n  <div class=\"container\">\n    <div class=\"cx-summary-card\">\n      <cx-card\n        [content]=\"getOrderCodeCardContent(order.code) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"\n          getOrderCurrentDateCardContent(order.created | cxDate) | async\n        \"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n      ></cx-card>\n\n      <cx-card\n        class=\"cx-display-inline\"\n        [content]=\"getBuyerNameCardContent(order.orgCustomer) | async\"\n      ></cx-card>\n    </div>\n    <div class=\"cx-summary-card\">\n      <cx-card\n        [content]=\"getUnitNameCardContent(order.orgUnit?.name) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getPurchaseOrderNumber(order.purchaseOrderNumber) | async\"\n      ></cx-card>\n\n      <cx-card\n        [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n      ></cx-card>\n\n      <ng-container *ngIf=\"order.costCenter\">\n        <cx-card\n          [content]=\"getCostCenterCardContent(order.costCenter) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <div class=\"cx-summary-card\">\n      <ng-container *ngIf=\"order.deliveryAddress\">\n        <cx-card\n          [content]=\"getAddressCardContent(order.deliveryAddress) | async\"\n        ></cx-card>\n      </ng-container>\n\n      <ng-container *ngIf=\"order.deliveryMode\">\n        <cx-card\n          [content]=\"getDeliveryModeCardContent(order.deliveryMode) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <ng-container *ngIf=\"order.paymentInfo\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPaymentInfoCardContent(order.paymentInfo) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getBillingAddressCardContent(order.paymentInfo?.billingAddress)\n              | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: UnitLevelOrderDetailService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitLevelOrderOverviewModule {
}
UnitLevelOrderOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, declarations: [UnitLevelOrderOverviewComponent], imports: [CommonModule, I18nModule, CardModule], exports: [UnitLevelOrderOverviewComponent] });
UnitLevelOrderOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, imports: [CommonModule, I18nModule, CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CardModule],
                    declarations: [UnitLevelOrderOverviewComponent],
                    exports: [UnitLevelOrderOverviewComponent],
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
class UnitLevelOrderDetailModule {
}
UnitLevelOrderDetailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderDetailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, imports: [CommonModule, UnitLevelOrderOverviewModule] });
UnitLevelOrderDetailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UnitLevelOrderDetailsOverviewComponent: {
                    component: UnitLevelOrderOverviewComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                },
                UnitLevelOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: UnitLevelOrderDetailService,
                        },
                    ],
                },
                UnitLevelOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: UnitLevelOrderDetailService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule, UnitLevelOrderOverviewModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UnitLevelOrderOverviewModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UnitLevelOrderDetailsOverviewComponent: {
                                    component: UnitLevelOrderOverviewComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                },
                                UnitLevelOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: UnitLevelOrderDetailService,
                                        },
                                    ],
                                },
                                UnitLevelOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: UnitLevelOrderDetailService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
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
class UnitOrderDetailsOrderEntriesContext {
    constructor(unitLevelOrderDetailService) {
        this.unitLevelOrderDetailService = unitLevelOrderDetailService;
        this.type = OrderEntriesSource.UNIT_ORDER_DETAILS;
    }
    getEntries() {
        return this.unitLevelOrderDetailService
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
UnitOrderDetailsOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, deps: [{ token: UnitLevelOrderDetailService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderDetailsOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: UnitLevelOrderDetailService }]; } });

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
class UnitOrderComponentsModule {
}
UnitOrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, imports: [RouterModule,
        UnitLevelOrderHistoryModule,
        UnitLevelOrderDetailModule] });
UnitOrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, providers: [
        {
            provide: UnitOrderDetailsOrderEntriesContextToken,
            useExisting: UnitOrderDetailsOrderEntriesContext,
        },
    ], imports: [RouterModule,
        UnitLevelOrderHistoryModule,
        UnitLevelOrderDetailModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        UnitLevelOrderHistoryModule,
                        UnitLevelOrderDetailModule,
                    ],
                    providers: [
                        {
                            provide: UnitOrderDetailsOrderEntriesContextToken,
                            useExisting: UnitOrderDetailsOrderEntriesContext,
                        },
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

export { UnitLevelOrderDetailModule, UnitLevelOrderDetailService, UnitLevelOrderHistoryComponent, UnitLevelOrderHistoryModule, UnitOrderComponentsModule, UnitOrderDetailsOrderEntriesContext };
//# sourceMappingURL=spartacus-organization-unit-order-components.mjs.map
