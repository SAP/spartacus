import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule, Injectable } from '@angular/core';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@spartacus/core';
import { I18nModule, AuthGuard, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, NgSelectA11yModule, DatePickerModule, FormErrorsModule, SortingModule, PaginationModule, IconModule, CardModule, TableLayout, BREAKPOINT } from '@spartacus/storefront';
import * as i1 from '@spartacus/organization/account-summary/root';
import { FilterByOptions, DocumentStatus, DocumentFields } from '@spartacus/organization/account-summary/root';
import { Subscription, zip, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, tap, skip, take } from 'rxjs/operators';
import * as i2$1 from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i1$1 from '@spartacus/organization/administration/components';
import { UnitListComponent, UnitListService, OrganizationTableType, ToggleLinkCellComponent, ListService, ItemService, ListModule } from '@spartacus/organization/administration/components';
import { ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY } from '@spartacus/organization/account-summary/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryDocumentFilterComponent {
    set initialFilters(initialFilters) {
        this.initializeForm(initialFilters);
    }
    constructor(translation, fb) {
        this.translation = translation;
        this.fb = fb;
        this.filterListEvent = new EventEmitter();
        /* For Enum use in HTML */
        this.FilterByOptions = FilterByOptions;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.getStatusOptions().subscribe((statusOptions) => (this.statusOptions = [...statusOptions])));
        this.subscription.add(this.getFilterByOptions().subscribe((filterOptions) => (this.filterByOptions = [...filterOptions])));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    formSearch() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const status = (_a = this.filterForm.get('status')) === null || _a === void 0 ? void 0 : _a.value;
        const filterByKey = (_b = this.filterForm.get('filterBy')) === null || _b === void 0 ? void 0 : _b.value;
        let filterByValue;
        let startRange;
        let endRange;
        switch (filterByKey) {
            case FilterByOptions.DOCUMENT_TYPE: {
                filterByValue = (_c = this.filterForm.get('documentType')) === null || _c === void 0 ? void 0 : _c.value;
                break;
            }
            case FilterByOptions.DOCUMENT_NUMBER: {
                filterByValue = (_d = this.filterForm.get('documentNumber')) === null || _d === void 0 ? void 0 : _d.value;
                break;
            }
            case FilterByOptions.DOCUMENT_NUMBER_RANGE: {
                startRange = (_e = this.filterForm.get('documentNumberRange.from')) === null || _e === void 0 ? void 0 : _e.value;
                endRange = (_f = this.filterForm.get('documentNumberRange.to')) === null || _f === void 0 ? void 0 : _f.value;
                break;
            }
            case FilterByOptions.DATE_RANGE: {
                const from = (_g = this.filterForm.get('documentDateRange.from')) === null || _g === void 0 ? void 0 : _g.value;
                const to = (_h = this.filterForm.get('documentDateRange.to')) === null || _h === void 0 ? void 0 : _h.value;
                startRange = from ? this.encodeDate(from) : '';
                endRange = to ? this.encodeDate(to) : '';
                break;
            }
            case FilterByOptions.DUE_DATE_RANGE: {
                const from = (_j = this.filterForm.get('dueDateRange.from')) === null || _j === void 0 ? void 0 : _j.value;
                const to = (_k = this.filterForm.get('dueDateRange.to')) === null || _k === void 0 ? void 0 : _k.value;
                startRange = from ? this.encodeDate(from) : '';
                endRange = to ? this.encodeDate(to) : '';
                break;
            }
            case FilterByOptions.AMOUNT_RANGE: {
                startRange = (_l = this.filterForm.get('originalAmountRange.from')) === null || _l === void 0 ? void 0 : _l.value;
                endRange = (_m = this.filterForm.get('originalAmountRange.to')) === null || _m === void 0 ? void 0 : _m.value;
                break;
            }
            case FilterByOptions.OPEN_AMOUNT_RANGE: {
                startRange = (_o = this.filterForm.get('openAmountRange.from')) === null || _o === void 0 ? void 0 : _o.value;
                endRange = (_p = this.filterForm.get('openAmountRange.to')) === null || _p === void 0 ? void 0 : _p.value;
                break;
            }
        }
        this.filterListEvent.emit({
            status,
            filterByKey,
            filterByValue,
            startRange,
            endRange,
        });
    }
    resetForm(andSearch = false) {
        const defaults = {
            documentType: '',
            documentNumber: '',
            documentNumberRange: { from: '', to: '' },
            documentDateRange: { from: '', to: '' },
            dueDateRange: { from: '', to: '' },
            originalAmountRange: { from: '', to: '' },
            openAmountRange: { from: '', to: '' },
        };
        if (andSearch) {
            // if set, clear all fields and perform search
            this.filterForm.patchValue(Object.assign(Object.assign({}, defaults), { status: DocumentStatus.OPEN, filterBy: FilterByOptions.DOCUMENT_NUMBER }));
            this.formSearch();
        }
        else {
            // otherwise just clear all fields except status and filterBy
            this.filterForm.patchValue(defaults);
        }
    }
    getStatusOptions() {
        const statusOptions = Object.values(DocumentStatus).map((code) => ({ code }));
        const translations = statusOptions.map((status) => this.translation.translate(`orgAccountSummary.statuses.${status.code}`));
        return zip(...translations).pipe(map((texts) => {
            texts.forEach((text, index) => (statusOptions[index].name = text));
            return statusOptions;
        }));
    }
    getFilterByOptions() {
        const filterByOptions = Object.values(FilterByOptions).map((code) => ({ code }));
        const translations = filterByOptions.map((status) => this.translation.translate(`orgAccountSummary.filterByOptions.${status.code}`));
        return zip(...translations).pipe(map((texts) => {
            texts.forEach((text, index) => (filterByOptions[index].name = text));
            return filterByOptions;
        }));
    }
    initializeForm({ status, filterByKey, filterByValue, startRange, endRange, }) {
        var _a;
        const generateRangeGroup = (filterByOption, validator) => {
            return this.fb.group({
                from: [
                    filterByKey === filterByOption && (startRange !== null && startRange !== void 0 ? startRange : ''),
                    validator === null || validator === void 0 ? void 0 : validator.startRange,
                ],
                to: [
                    filterByKey === filterByOption && (endRange !== null && endRange !== void 0 ? endRange : ''),
                    validator === null || validator === void 0 ? void 0 : validator.endRange,
                ],
            }, { validators: validator === null || validator === void 0 ? void 0 : validator.groupValidator });
        };
        const generateDateRangeGroup = (filterByOption, validator) => {
            return this.fb.group({
                from: [
                    filterByKey === filterByOption && startRange
                        ? this.decodeDate(startRange)
                        : '',
                    validator === null || validator === void 0 ? void 0 : validator.startRange,
                ],
                to: [
                    filterByKey === filterByOption && endRange
                        ? this.decodeDate(endRange)
                        : '',
                    validator === null || validator === void 0 ? void 0 : validator.endRange,
                ],
            }, { validators: validator === null || validator === void 0 ? void 0 : validator.groupValidator });
        };
        const validRange = (type) => {
            return (c) => {
                const from = c.get('from');
                const to = c.get('to');
                if (from.pristine || from.invalid || to.pristine || to.invalid) {
                    return null;
                }
                if (type === 'date' && from.value > to.value) {
                    return { toDateMustComeAfterFrom: true };
                }
                if (type === 'number') {
                    return isFromLargerThanTo(from, to)
                        ? { toAmountMustBeLargeThanFrom: true }
                        : null;
                }
                return null;
            };
        };
        function isFromLargerThanTo(from, to) {
            const fromValue = parseFloat(from.value) || 0;
            const toValue = parseFloat(to.value) || 0;
            return !isNaN(from.value) && !isNaN(to.value) && fromValue > toValue;
        }
        this.filterForm = this.fb.group({
            status: status || DocumentStatus.OPEN,
            filterBy: filterByKey || FilterByOptions.DOCUMENT_NUMBER,
            documentType: filterByKey === FilterByOptions.DOCUMENT_TYPE && (filterByValue !== null && filterByValue !== void 0 ? filterByValue : ''),
            documentNumber: filterByKey === FilterByOptions.DOCUMENT_NUMBER &&
                (filterByValue !== null && filterByValue !== void 0 ? filterByValue : ''),
            documentNumberRange: generateRangeGroup(FilterByOptions.DOCUMENT_NUMBER_RANGE),
            documentDateRange: generateDateRangeGroup(FilterByOptions.DATE_RANGE, {
                groupValidator: validRange('date'),
            }),
            dueDateRange: generateDateRangeGroup(FilterByOptions.DUE_DATE_RANGE, {
                groupValidator: validRange('date'),
            }),
            originalAmountRange: generateRangeGroup(FilterByOptions.AMOUNT_RANGE, {
                groupValidator: validRange('number'),
            }),
            openAmountRange: generateRangeGroup(FilterByOptions.OPEN_AMOUNT_RANGE, {
                groupValidator: validRange('number'),
            }),
        });
        this.subscription.add((_a = this.filterForm
            .get('filterBy')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(() => this.filterByChanged()));
    }
    filterByChanged() {
        this.resetForm(false);
    }
    encodeDate(inputDate) {
        const [year, month, day] = inputDate.split('-');
        return `${month}/${day}/${year}`;
    }
    decodeDate(inputDate) {
        const [month, day, year] = inputDate.split('/');
        return `${year}-${month}-${day}`;
    }
}
AccountSummaryDocumentFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterComponent, deps: [{ token: i2.TranslationService }, { token: i2$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
AccountSummaryDocumentFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AccountSummaryDocumentFilterComponent, selector: "cx-account-summary-document-filter", inputs: { documentTypeOptions: "documentTypeOptions", initialFilters: "initialFilters" }, outputs: { filterListEvent: "filterListEvent" }, ngImport: i0, template: "<ng-template #rangeInput let-formGroup=\"formGroup\" let-type=\"type\">\n  <ng-container [formGroup]=\"formGroup\">\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.startRange' | cxTranslate }}</span>\n      <ng-container *ngIf=\"type === 'date'; else inputFrom\">\n        <cx-date-picker [control]=\"formGroup.controls.from\"></cx-date-picker>\n      </ng-container>\n      <ng-template #inputFrom>\n        <input\n          class=\"cx-account-summary-document-filter-form-input\"\n          [type]=\"type\"\n          formControlName=\"from\"\n        />\n        <cx-form-errors [control]=\"formGroup.controls.from\"></cx-form-errors>\n      </ng-template>\n    </label>\n\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.endRange' | cxTranslate }}</span>\n      <ng-container *ngIf=\"type === 'date'; else inputTo\">\n        <cx-date-picker [control]=\"formGroup.controls.to\"></cx-date-picker>\n      </ng-container>\n      <ng-template #inputTo>\n        <input\n          class=\"cx-account-summary-document-filter-form-input\"\n          [type]=\"type\"\n          formControlName=\"to\"\n        />\n        <cx-form-errors [control]=\"formGroup.controls.to\"></cx-form-errors>\n      </ng-template>\n      <cx-form-errors\n        [control]=\"formGroup\"\n        [prefix]=\"'orgAccountSummary.filter.errors'\"\n      ></cx-form-errors>\n    </label>\n  </ng-container>\n</ng-template>\n\n<form (ngSubmit)=\"formSearch()\" [formGroup]=\"filterForm\">\n  <div\n    class=\"cx-account-summary-document-filter-form\"\n    *ngIf=\"filterForm.controls.filterBy.value as filterBy\"\n  >\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.status' | cxTranslate }}</span>\n      <ng-select\n        formControlName=\"status\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"statusOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'orgAccountSummary.filter.status' | cxTranslate,\n          ariaControls: 'cx-account-summary-document-table'\n        }\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"filterForm.controls.status\"></cx-form-errors>\n    </label>\n\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.filterBy' | cxTranslate }}</span>\n      <ng-select\n        formControlName=\"filterBy\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"filterByOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'orgAccountSummary.filter.filterBy' | cxTranslate,\n          ariaControls: 'cx-account-summary-document-table'\n        }\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"filterForm.controls.filterBy\"></cx-form-errors>\n    </label>\n\n    <label\n      class=\"cx-account-summary-document-filter-form-item\"\n      *ngIf=\"filterBy === FilterByOptions.DOCUMENT_TYPE\"\n    >\n      <span>{{ 'orgAccountSummary.filter.documentType' | cxTranslate }}</span>\n      <ng-select\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"documentTypeOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        formControlName=\"documentType\"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"filterForm.controls.documentType\"\n      ></cx-form-errors>\n    </label>\n\n    <label\n      class=\"cx-account-summary-document-filter-form-item\"\n      *ngIf=\"filterBy === FilterByOptions.DOCUMENT_NUMBER\"\n    >\n      <span>{{ 'orgAccountSummary.filter.documentNumber' | cxTranslate }}</span>\n      <input\n        class=\"cx-account-summary-document-filter-form-input\"\n        formControlName=\"documentNumber\"\n      />\n      <cx-form-errors\n        [control]=\"filterForm.controls.documentNumber\"\n      ></cx-form-errors>\n    </label>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DOCUMENT_NUMBER_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('documentNumberRange'),\n            type: 'text'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DATE_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('documentDateRange'),\n            type: 'date'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DUE_DATE_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: { formGroup: filterForm.get('dueDateRange'), type: 'date' }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.AMOUNT_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('originalAmountRange'),\n            type: 'number'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.OPEN_AMOUNT_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('openAmountRange'),\n            type: 'number'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <div class=\"cx-account-summary-document-filter-form-button-block\">\n      <button\n        class=\"cx-action-link clear-btn\"\n        type=\"button\"\n        (click)=\"resetForm(true)\"\n      >\n        {{ 'orgAccountSummary.filter.clear' | cxTranslate }}\n      </button>\n      <button class=\"btn btn-primary\" type=\"submit\">\n        {{ 'orgAccountSummary.filter.search' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</form>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i4.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i3.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.DatePickerComponent, selector: "cx-date-picker", inputs: ["control", "min", "max", "required"], outputs: ["update"] }, { kind: "component", type: i3.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-account-summary-document-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #rangeInput let-formGroup=\"formGroup\" let-type=\"type\">\n  <ng-container [formGroup]=\"formGroup\">\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.startRange' | cxTranslate }}</span>\n      <ng-container *ngIf=\"type === 'date'; else inputFrom\">\n        <cx-date-picker [control]=\"formGroup.controls.from\"></cx-date-picker>\n      </ng-container>\n      <ng-template #inputFrom>\n        <input\n          class=\"cx-account-summary-document-filter-form-input\"\n          [type]=\"type\"\n          formControlName=\"from\"\n        />\n        <cx-form-errors [control]=\"formGroup.controls.from\"></cx-form-errors>\n      </ng-template>\n    </label>\n\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.endRange' | cxTranslate }}</span>\n      <ng-container *ngIf=\"type === 'date'; else inputTo\">\n        <cx-date-picker [control]=\"formGroup.controls.to\"></cx-date-picker>\n      </ng-container>\n      <ng-template #inputTo>\n        <input\n          class=\"cx-account-summary-document-filter-form-input\"\n          [type]=\"type\"\n          formControlName=\"to\"\n        />\n        <cx-form-errors [control]=\"formGroup.controls.to\"></cx-form-errors>\n      </ng-template>\n      <cx-form-errors\n        [control]=\"formGroup\"\n        [prefix]=\"'orgAccountSummary.filter.errors'\"\n      ></cx-form-errors>\n    </label>\n  </ng-container>\n</ng-template>\n\n<form (ngSubmit)=\"formSearch()\" [formGroup]=\"filterForm\">\n  <div\n    class=\"cx-account-summary-document-filter-form\"\n    *ngIf=\"filterForm.controls.filterBy.value as filterBy\"\n  >\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.status' | cxTranslate }}</span>\n      <ng-select\n        formControlName=\"status\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"statusOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'orgAccountSummary.filter.status' | cxTranslate,\n          ariaControls: 'cx-account-summary-document-table'\n        }\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"filterForm.controls.status\"></cx-form-errors>\n    </label>\n\n    <label class=\"cx-account-summary-document-filter-form-item\">\n      <span>{{ 'orgAccountSummary.filter.filterBy' | cxTranslate }}</span>\n      <ng-select\n        formControlName=\"filterBy\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"filterByOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'orgAccountSummary.filter.filterBy' | cxTranslate,\n          ariaControls: 'cx-account-summary-document-table'\n        }\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"filterForm.controls.filterBy\"></cx-form-errors>\n    </label>\n\n    <label\n      class=\"cx-account-summary-document-filter-form-item\"\n      *ngIf=\"filterBy === FilterByOptions.DOCUMENT_TYPE\"\n    >\n      <span>{{ 'orgAccountSummary.filter.documentType' | cxTranslate }}</span>\n      <ng-select\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"documentTypeOptions\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        formControlName=\"documentType\"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"filterForm.controls.documentType\"\n      ></cx-form-errors>\n    </label>\n\n    <label\n      class=\"cx-account-summary-document-filter-form-item\"\n      *ngIf=\"filterBy === FilterByOptions.DOCUMENT_NUMBER\"\n    >\n      <span>{{ 'orgAccountSummary.filter.documentNumber' | cxTranslate }}</span>\n      <input\n        class=\"cx-account-summary-document-filter-form-input\"\n        formControlName=\"documentNumber\"\n      />\n      <cx-form-errors\n        [control]=\"filterForm.controls.documentNumber\"\n      ></cx-form-errors>\n    </label>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DOCUMENT_NUMBER_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('documentNumberRange'),\n            type: 'text'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DATE_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('documentDateRange'),\n            type: 'date'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.DUE_DATE_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: { formGroup: filterForm.get('dueDateRange'), type: 'date' }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.AMOUNT_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('originalAmountRange'),\n            type: 'number'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <ng-template [ngIf]=\"filterBy === FilterByOptions.OPEN_AMOUNT_RANGE\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          rangeInput;\n          context: {\n            formGroup: filterForm.get('openAmountRange'),\n            type: 'number'\n          }\n        \"\n      >\n      </ng-container>\n    </ng-template>\n\n    <div class=\"cx-account-summary-document-filter-form-button-block\">\n      <button\n        class=\"cx-action-link clear-btn\"\n        type=\"button\"\n        (click)=\"resetForm(true)\"\n      >\n        {{ 'orgAccountSummary.filter.clear' | cxTranslate }}\n      </button>\n      <button class=\"btn btn-primary\" type=\"submit\">\n        {{ 'orgAccountSummary.filter.search' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i2.TranslationService }, { type: i2$1.FormBuilder }]; }, propDecorators: { documentTypeOptions: [{
                type: Input
            }], initialFilters: [{
                type: Input
            }], filterListEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryDocumentComponent {
    constructor(accountSummaryFacade, translation, downloadService, languageService) {
        this.accountSummaryFacade = accountSummaryFacade;
        this.translation = translation;
        this.downloadService = downloadService;
        this.languageService = languageService;
        /* For Enum use in HTML */
        this.ICON_TYPE = ICON_TYPE;
        // Contains the initial query parameters and will be updated with current state of filters
        this._queryParams = {
            status: DocumentStatus.OPEN,
            filterByKey: FilterByOptions.DOCUMENT_NUMBER,
            page: 0,
            pageSize: 10,
            fields: DocumentFields.FULL,
        };
        // Used to fire event every time query params are changed
        this.queryParams$ = new BehaviorSubject(this._queryParams);
        // Used by template to subscribe to data from documents api
        this.accountSummary$ = this.queryParams$.pipe(switchMap((param) => this.accountSummaryFacade.getDocumentList(param)), tap((accountSummaryList) => {
            if (accountSummaryList.orgDocumentTypes) {
                this.documentTypeOptions = accountSummaryList.orgDocumentTypes;
            }
            if (accountSummaryList.sorts) {
                this.addNamesToSortModel(accountSummaryList.sorts);
            }
        }));
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.languageService
            .getActive()
            .pipe(skip(1))
            .subscribe(() => this.updateQueryParams({ fields: DocumentFields.FULL })));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    pageChange(page) {
        this.updateQueryParams({
            page: page,
        });
    }
    changeSortCode(sortCode) {
        this.updateQueryParams({
            sort: sortCode,
            page: 0,
        });
    }
    filterChange(newFilters) {
        this.updateQueryParams(Object.assign(Object.assign({}, newFilters), { page: 0 }));
    }
    downloadAttachment(documentId, attachmentId) {
        this.accountSummaryFacade
            .getDocumentAttachment(documentId, attachmentId)
            .pipe(take(1))
            .subscribe((data) => {
            const file = new Blob([data], { type: data.type });
            const url = URL.createObjectURL(file);
            this.downloadService.download(url, attachmentId);
        });
    }
    updateQueryParams(partialParams) {
        // Overwrite each value present in partialParams to _queryParams
        Object.entries(partialParams).forEach((param) => (this._queryParams[param[0]] = param[1]));
        // Every request that doesn't specify fields should be set to DEFAULT
        if (!partialParams.fields) {
            this._queryParams.fields = DocumentFields.DEFAULT;
        }
        this.queryParams$.next(this._queryParams);
    }
    addNamesToSortModel(sorts) {
        this.sortOptions = sorts;
        const translations = sorts.map((sort) => this.translation.translate(`orgAccountSummary.sorts.${sort.code}`));
        combineLatest(translations)
            .pipe(take(1))
            .subscribe((translated) => this.sortOptions.forEach((sort, index) => (sort.name = translated[index])));
    }
}
AccountSummaryDocumentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentComponent, deps: [{ token: i1.AccountSummaryFacade }, { token: i2.TranslationService }, { token: i3.FileDownloadService }, { token: i2.LanguageService }], target: i0.ɵɵFactoryTarget.Component });
AccountSummaryDocumentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AccountSummaryDocumentComponent, selector: "cx-account-summary-document", ngImport: i0, template: "<ng-container *ngIf=\"accountSummary$ | async as accountSummary\">\n  <div>\n    <!-- HEADER -->\n    <div class=\"cx-account-summary-document-header\">\n      <h2>\n        {{ 'orgAccountSummary.document.header' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-account-summary-document-body\">\n      <cx-account-summary-document-filter\n        [documentTypeOptions]=\"documentTypeOptions\"\n        [initialFilters]=\"_queryParams\"\n        (filterListEvent)=\"filterChange($event)\"\n      >\n      </cx-account-summary-document-filter>\n\n      <ng-container\n        *ngIf=\"\n          accountSummary.pagination && accountSummary.pagination.totalResults;\n          else noDocument\n        \"\n      >\n        <div class=\"cx-account-summary-document-sort top\">\n          <label class=\"cx-account-summary-document-form-group form-group\">\n            <span>\n              {{ 'orgAccountSummary.sortBy' | cxTranslate }}\n            </span>\n            <cx-sorting\n              [sortOptions]=\"sortOptions\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"accountSummary.pagination.sort\"\n              placeholder=\"{{ 'orgAccountSummary.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orgAccountSummary.sortDocuments' | cxTranslate\"\n              ariaControls=\"cx-account-summary-document-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-account-summary-document-pagination\"\n            *ngIf=\"\n              accountSummary.pagination &&\n              accountSummary.pagination.totalPages &&\n              accountSummary.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"accountSummary.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n\n        <!-- TABLE -->\n        <table\n          id=\"cx-account-summary-document-table\"\n          class=\"table cx-account-summary-document-table\"\n        >\n          <thead class=\"cx-account-summary-document-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.id' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.type' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.dueDate' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.originalAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.openAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.status' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              <cx-icon\n                [type]=\"ICON_TYPE.DOWNLOAD\"\n                class=\"cx-account-summary-document-attachment-icon\"\n                title=\"{{\n                  'orgAccountSummary.document.attachment' | cxTranslate\n                }}\"\n              ></cx-icon>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let document of accountSummary.orgDocuments\"\n              class=\"cx-account-summary-document-row\"\n            >\n              <td class=\"cx-account-summary-document-code\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.id' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.id }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-type\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.type' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.orgDocumentType?.name }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-date\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.date' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.createdAtDate | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-date\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.dueDate' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.dueAtDate | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-monetary\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{\n                    'orgAccountSummary.document.originalAmount' | cxTranslate\n                  }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.formattedAmount }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-monetary\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.openAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.formattedOpenAmount }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-status\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.status' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  <span\n                    [ngClass]=\"{\n                      'status-open': document.status === 'open',\n                      'status-closed': document.status === 'closed'\n                    }\"\n                  >\n                    {{\n                      'orgAccountSummary.statuses.' + document?.status\n                        | cxTranslate\n                    }}\n                  </span>\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-attachment\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.attachment' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  <button\n                    *ngIf=\"document.attachments?.[0]?.id as attachmentId\"\n                    class=\"cx-account-summary-document-attachment-btn\"\n                    (click)=\"downloadAttachment(document.id, attachmentId)\"\n                    attr.aria-label=\"{{\n                      'orgAccountSummary.document.attachmentDescription'\n                        | cxTranslate\n                          : {\n                              id: document.id,\n                              type: document.orgDocumentType?.name\n                            }\n                    }}\"\n                  >\n                    <cx-icon\n                      [type]=\"ICON_TYPE.FILE\"\n                      class=\"cx-account-summary-document-attachment-icon\"\n                      title=\"{{\n                        'orgAccountSummary.document.download' | cxTranslate\n                      }}\"\n                    >\n                    </cx-icon>\n                    <span\n                      class=\"cx-account-summary-document-attachment-text\"\n                      [innerText]=\"\n                        'orgAccountSummary.document.download' | cxTranslate\n                      \"\n                    >\n                    </span>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-account-summary-document-sort bottom\">\n          <div\n            class=\"cx-account-summary-document-pagination\"\n            *ngIf=\"\n              accountSummary.pagination &&\n              accountSummary.pagination.totalPages &&\n              accountSummary.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"accountSummary.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO DOCUMENT CONTAINER -->\n      <ng-template #noDocument>\n        <div class=\"cx-account-summary-document-no-document\">\n          {{ 'orgAccountSummary.document.noneFound' | cxTranslate }}\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "component", type: AccountSummaryDocumentFilterComponent, selector: "cx-account-summary-document-filter", inputs: ["documentTypeOptions", "initialFilters"], outputs: ["filterListEvent"] }, { kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-account-summary-document', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"accountSummary$ | async as accountSummary\">\n  <div>\n    <!-- HEADER -->\n    <div class=\"cx-account-summary-document-header\">\n      <h2>\n        {{ 'orgAccountSummary.document.header' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-account-summary-document-body\">\n      <cx-account-summary-document-filter\n        [documentTypeOptions]=\"documentTypeOptions\"\n        [initialFilters]=\"_queryParams\"\n        (filterListEvent)=\"filterChange($event)\"\n      >\n      </cx-account-summary-document-filter>\n\n      <ng-container\n        *ngIf=\"\n          accountSummary.pagination && accountSummary.pagination.totalResults;\n          else noDocument\n        \"\n      >\n        <div class=\"cx-account-summary-document-sort top\">\n          <label class=\"cx-account-summary-document-form-group form-group\">\n            <span>\n              {{ 'orgAccountSummary.sortBy' | cxTranslate }}\n            </span>\n            <cx-sorting\n              [sortOptions]=\"sortOptions\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"accountSummary.pagination.sort\"\n              placeholder=\"{{ 'orgAccountSummary.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orgAccountSummary.sortDocuments' | cxTranslate\"\n              ariaControls=\"cx-account-summary-document-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-account-summary-document-pagination\"\n            *ngIf=\"\n              accountSummary.pagination &&\n              accountSummary.pagination.totalPages &&\n              accountSummary.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"accountSummary.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n\n        <!-- TABLE -->\n        <table\n          id=\"cx-account-summary-document-table\"\n          class=\"table cx-account-summary-document-table\"\n        >\n          <thead class=\"cx-account-summary-document-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.id' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.type' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.dueDate' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.originalAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.openAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'orgAccountSummary.document.status' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              <cx-icon\n                [type]=\"ICON_TYPE.DOWNLOAD\"\n                class=\"cx-account-summary-document-attachment-icon\"\n                title=\"{{\n                  'orgAccountSummary.document.attachment' | cxTranslate\n                }}\"\n              ></cx-icon>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let document of accountSummary.orgDocuments\"\n              class=\"cx-account-summary-document-row\"\n            >\n              <td class=\"cx-account-summary-document-code\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.id' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.id }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-type\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.type' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.orgDocumentType?.name }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-date\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.date' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.createdAtDate | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-date\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.dueDate' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.dueAtDate | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-monetary\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{\n                    'orgAccountSummary.document.originalAmount' | cxTranslate\n                  }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.formattedAmount }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-monetary\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.openAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  {{ document.formattedOpenAmount }}\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-status\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.status' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  <span\n                    [ngClass]=\"{\n                      'status-open': document.status === 'open',\n                      'status-closed': document.status === 'closed'\n                    }\"\n                  >\n                    {{\n                      'orgAccountSummary.statuses.' + document?.status\n                        | cxTranslate\n                    }}\n                  </span>\n                </div>\n              </td>\n              <td class=\"cx-account-summary-document-attachment\">\n                <div class=\"cx-account-summary-document-label\">\n                  {{ 'orgAccountSummary.document.attachment' | cxTranslate }}\n                </div>\n                <div class=\"cx-account-summary-document-value\">\n                  <button\n                    *ngIf=\"document.attachments?.[0]?.id as attachmentId\"\n                    class=\"cx-account-summary-document-attachment-btn\"\n                    (click)=\"downloadAttachment(document.id, attachmentId)\"\n                    attr.aria-label=\"{{\n                      'orgAccountSummary.document.attachmentDescription'\n                        | cxTranslate\n                          : {\n                              id: document.id,\n                              type: document.orgDocumentType?.name\n                            }\n                    }}\"\n                  >\n                    <cx-icon\n                      [type]=\"ICON_TYPE.FILE\"\n                      class=\"cx-account-summary-document-attachment-icon\"\n                      title=\"{{\n                        'orgAccountSummary.document.download' | cxTranslate\n                      }}\"\n                    >\n                    </cx-icon>\n                    <span\n                      class=\"cx-account-summary-document-attachment-text\"\n                      [innerText]=\"\n                        'orgAccountSummary.document.download' | cxTranslate\n                      \"\n                    >\n                    </span>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-account-summary-document-sort bottom\">\n          <div\n            class=\"cx-account-summary-document-pagination\"\n            *ngIf=\"\n              accountSummary.pagination &&\n              accountSummary.pagination.totalPages &&\n              accountSummary.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"accountSummary.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO DOCUMENT CONTAINER -->\n      <ng-template #noDocument>\n        <div class=\"cx-account-summary-document-no-document\">\n          {{ 'orgAccountSummary.document.noneFound' | cxTranslate }}\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AccountSummaryFacade }, { type: i2.TranslationService }, { type: i3.FileDownloadService }, { type: i2.LanguageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryDocumentFilterModule {
}
AccountSummaryDocumentFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryDocumentFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, declarations: [AccountSummaryDocumentFilterComponent], imports: [CommonModule,
        I18nModule,
        NgSelectModule,
        NgSelectA11yModule,
        ReactiveFormsModule,
        DatePickerModule,
        FormErrorsModule], exports: [AccountSummaryDocumentFilterComponent] });
AccountSummaryDocumentFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, imports: [CommonModule,
        I18nModule,
        NgSelectModule,
        NgSelectA11yModule,
        ReactiveFormsModule,
        DatePickerModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryDocumentFilterComponent],
                    imports: [
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                        ReactiveFormsModule,
                        DatePickerModule,
                        FormErrorsModule,
                    ],
                    exports: [AccountSummaryDocumentFilterComponent],
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
const accountSummaryDocumentCmsConfig = {
    cmsComponents: {
        AccountSummaryDocumentComponent: {
            component: AccountSummaryDocumentComponent,
            guards: [AuthGuard, AdminGuard],
        },
    },
};
class AccountSummaryDocumentModule {
}
AccountSummaryDocumentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryDocumentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, declarations: [AccountSummaryDocumentComponent], imports: [AccountSummaryDocumentFilterModule,
        CommonModule,
        I18nModule,
        SortingModule,
        PaginationModule,
        IconModule] });
AccountSummaryDocumentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)], imports: [AccountSummaryDocumentFilterModule,
        CommonModule,
        I18nModule,
        SortingModule,
        PaginationModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryDocumentComponent],
                    imports: [
                        AccountSummaryDocumentFilterModule,
                        CommonModule,
                        I18nModule,
                        SortingModule,
                        PaginationModule,
                        IconModule,
                    ],
                    providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryHeaderComponent {
    constructor(accountSummaryFacade, languageService, translation) {
        this.accountSummaryFacade = accountSummaryFacade;
        this.languageService = languageService;
        this.translation = translation;
        this.headerDetails$ = this.languageService
            .getActive()
            .pipe(switchMap(() => this.accountSummaryFacade.getAccountSummary()));
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.translation
            .translate('orgAccountSummary.details.notApplicable')
            .subscribe((text) => (this.notApplicable = text)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    getIdCardContent(id) {
        return this.translation.translate('orgAccountSummary.details.uid').pipe(map((idTitle) => ({
            title: idTitle,
            text: [id || this.notApplicable],
        })));
    }
    getNameCardContent(name) {
        return this.translation.translate('orgAccountSummary.details.name').pipe(map((nameTitle) => ({
            title: nameTitle,
            text: [name || this.notApplicable],
        })));
    }
    getAddressCardContent(billingAddress) {
        return this.translation.translate('orgAccountSummary.details.address').pipe(map((addressTitle) => {
            var _a;
            const name = `${billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.title}, ${billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.firstName} ${billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.lastName}`;
            const address = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.formattedAddress;
            const country = (_a = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _a === void 0 ? void 0 : _a.name;
            return {
                title: addressTitle,
                text: Boolean(billingAddress)
                    ? [name, address, country]
                    : [this.notApplicable],
            };
        }));
    }
    getCreditRepCardContent(creditRep) {
        return this.translation
            .translate('orgAccountSummary.details.creditRep')
            .pipe(map((creditRepTitle) => ({
            title: creditRepTitle,
            text: [creditRep || this.notApplicable],
        })));
    }
    getCreditLineCardContent(creditLine) {
        return this.translation
            .translate('orgAccountSummary.details.creditLine')
            .pipe(map((creditLineTitle) => ({
            title: creditLineTitle,
            text: [creditLine || this.notApplicable],
        })));
    }
    getCurrentBalanceCardContent(currentBalance) {
        return this.translation
            .translate('orgAccountSummary.details.currentBalance')
            .pipe(map((currentBalanceTitle) => ({
            title: currentBalanceTitle,
            text: [currentBalance || this.notApplicable],
        })));
    }
    getOpenBalanceCardContent(openBalance) {
        return this.translation
            .translate('orgAccountSummary.details.openBalance')
            .pipe(map((openBalanceTitle) => ({
            title: openBalanceTitle,
            text: [openBalance || this.notApplicable],
        })));
    }
    getPastDueBalanceCardContent(pastDueBalance) {
        return this.translation
            .translate('orgAccountSummary.details.pastDueBalance')
            .pipe(map((pastDueBalanceTitle) => ({
            title: pastDueBalanceTitle,
            text: [pastDueBalance !== null && pastDueBalance !== void 0 ? pastDueBalance : this.notApplicable],
        })));
    }
}
AccountSummaryHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderComponent, deps: [{ token: i1.AccountSummaryFacade }, { token: i2.LanguageService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
AccountSummaryHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AccountSummaryHeaderComponent, selector: "cx-account-summary-header", ngImport: i0, template: "<div class=\"cx-account-summary\" *ngIf=\"headerDetails$ | async as headerDetails\">\n  <div class=\"cx-account-summary-header-cards\">\n    <div\n      class=\"\n        cx-summary-card-responsive-group cx-summary-card-group-unit-address\n      \"\n    >\n      <!-- Card: Unit ID & Unit Name -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getIdCardContent(headerDetails?.orgUnit?.uid) | async\"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"getNameCardContent(headerDetails?.orgUnit?.name) | async\"\n        >\n        </cx-card>\n      </div>\n\n      <!-- Card: Address -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getAddressCardContent(headerDetails?.billingAddress) | async\n          \"\n        >\n        </cx-card>\n      </div>\n    </div>\n\n    <div\n      class=\"\n        cx-summary-card-responsive-group cx-summary-card-group-credit-balance\n      \"\n    >\n      <!-- Card: Credit Rep & Credit Line -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getCreditRepCardContent(headerDetails?.accountManagerName) | async\n          \"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"\n            getCreditLineCardContent(headerDetails?.creditLimit) | async\n          \"\n        >\n        </cx-card>\n      </div>\n\n      <!-- Card: Current Balance & Open Balance -->\n      <div class=\"cx-summary-card cx-summary-card-balance\">\n        <cx-card\n          [content]=\"\n            getCurrentBalanceCardContent(\n              headerDetails?.amountBalance?.currentBalance\n            ) | async\n          \"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"\n            getOpenBalanceCardContent(headerDetails?.amountBalance?.openBalance)\n              | async\n          \"\n        >\n        </cx-card>\n      </div>\n    </div>\n\n    <!-- Card: Past Due Balance & Date Ranges -->\n    <div class=\"cx-summary-card cx-summary-card-group-due\">\n      <!-- If there range of past due balances are provided, display them here in a bordered section -->\n      <div\n        *ngIf=\"\n          headerDetails.amountBalance &&\n            headerDetails.amountBalance.dueBalances as pastDue;\n          else noDueRange\n        \"\n        [class.cx-account-summary-header-past-due-section]=\"pastDue.length > 0\"\n      >\n        <!-- Dynamically create lines of past due date ranges -->\n        <div\n          *ngIf=\"pastDue.length > 0\"\n          class=\"cx-account-summary-header-past-due-range-dates\"\n        >\n          <div\n            *ngFor=\"let rangeBalance of pastDue\"\n            class=\"cx-account-summary-header-past-due-range-collection\"\n            [tabindex]=\"-1\"\n          >\n            <div\n              class=\"cx-past-due-range-date\"\n              *ngIf=\"rangeBalance.dayRange as dayRange\"\n            >\n              <ng-template [ngIf]=\"dayRange?.maxBoundary\" [ngIfElse]=\"dayPlus\">\n                {{\n                  'orgAccountSummary.details.dayRange'\n                    | cxTranslate\n                      : {\n                          minBoundary: dayRange.minBoundary,\n                          maxBoundary: dayRange.maxBoundary\n                        }\n                }}\n              </ng-template>\n\n              <ng-template #dayPlus>\n                {{\n                  'orgAccountSummary.details.dayPlus'\n                    | cxTranslate: { minBoundary: dayRange.minBoundary }\n                }}\n              </ng-template>\n            </div>\n            <div>\n              {{ rangeBalance.amount }}\n            </div>\n          </div>\n        </div>\n\n        <div\n          class=\"cx-account-summary-header-past-due-balance-total\"\n          [tabindex]=\"-1\"\n        >\n          <div class=\"cx-past-due-balance-label cx-card-title\">\n            {{ 'orgAccountSummary.details.pastDueBalance' | cxTranslate }}\n          </div>\n          <div>{{ headerDetails?.amountBalance?.pastDueBalance }}</div>\n        </div>\n      </div>\n\n      <!-- When there are no Ranges, only show a card containing the Past Due Balance -->\n      <ng-template #noDueRange>\n        <cx-card\n          [content]=\"\n            getPastDueBalanceCardContent(\n              headerDetails?.amountBalance?.pastDueBalance\n            ) | async\n          \"\n        >\n        </cx-card>\n      </ng-template>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-account-summary-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-account-summary\" *ngIf=\"headerDetails$ | async as headerDetails\">\n  <div class=\"cx-account-summary-header-cards\">\n    <div\n      class=\"\n        cx-summary-card-responsive-group cx-summary-card-group-unit-address\n      \"\n    >\n      <!-- Card: Unit ID & Unit Name -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getIdCardContent(headerDetails?.orgUnit?.uid) | async\"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"getNameCardContent(headerDetails?.orgUnit?.name) | async\"\n        >\n        </cx-card>\n      </div>\n\n      <!-- Card: Address -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getAddressCardContent(headerDetails?.billingAddress) | async\n          \"\n        >\n        </cx-card>\n      </div>\n    </div>\n\n    <div\n      class=\"\n        cx-summary-card-responsive-group cx-summary-card-group-credit-balance\n      \"\n    >\n      <!-- Card: Credit Rep & Credit Line -->\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getCreditRepCardContent(headerDetails?.accountManagerName) | async\n          \"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"\n            getCreditLineCardContent(headerDetails?.creditLimit) | async\n          \"\n        >\n        </cx-card>\n      </div>\n\n      <!-- Card: Current Balance & Open Balance -->\n      <div class=\"cx-summary-card cx-summary-card-balance\">\n        <cx-card\n          [content]=\"\n            getCurrentBalanceCardContent(\n              headerDetails?.amountBalance?.currentBalance\n            ) | async\n          \"\n        >\n        </cx-card>\n\n        <cx-card\n          [content]=\"\n            getOpenBalanceCardContent(headerDetails?.amountBalance?.openBalance)\n              | async\n          \"\n        >\n        </cx-card>\n      </div>\n    </div>\n\n    <!-- Card: Past Due Balance & Date Ranges -->\n    <div class=\"cx-summary-card cx-summary-card-group-due\">\n      <!-- If there range of past due balances are provided, display them here in a bordered section -->\n      <div\n        *ngIf=\"\n          headerDetails.amountBalance &&\n            headerDetails.amountBalance.dueBalances as pastDue;\n          else noDueRange\n        \"\n        [class.cx-account-summary-header-past-due-section]=\"pastDue.length > 0\"\n      >\n        <!-- Dynamically create lines of past due date ranges -->\n        <div\n          *ngIf=\"pastDue.length > 0\"\n          class=\"cx-account-summary-header-past-due-range-dates\"\n        >\n          <div\n            *ngFor=\"let rangeBalance of pastDue\"\n            class=\"cx-account-summary-header-past-due-range-collection\"\n            [tabindex]=\"-1\"\n          >\n            <div\n              class=\"cx-past-due-range-date\"\n              *ngIf=\"rangeBalance.dayRange as dayRange\"\n            >\n              <ng-template [ngIf]=\"dayRange?.maxBoundary\" [ngIfElse]=\"dayPlus\">\n                {{\n                  'orgAccountSummary.details.dayRange'\n                    | cxTranslate\n                      : {\n                          minBoundary: dayRange.minBoundary,\n                          maxBoundary: dayRange.maxBoundary\n                        }\n                }}\n              </ng-template>\n\n              <ng-template #dayPlus>\n                {{\n                  'orgAccountSummary.details.dayPlus'\n                    | cxTranslate: { minBoundary: dayRange.minBoundary }\n                }}\n              </ng-template>\n            </div>\n            <div>\n              {{ rangeBalance.amount }}\n            </div>\n          </div>\n        </div>\n\n        <div\n          class=\"cx-account-summary-header-past-due-balance-total\"\n          [tabindex]=\"-1\"\n        >\n          <div class=\"cx-past-due-balance-label cx-card-title\">\n            {{ 'orgAccountSummary.details.pastDueBalance' | cxTranslate }}\n          </div>\n          <div>{{ headerDetails?.amountBalance?.pastDueBalance }}</div>\n        </div>\n      </div>\n\n      <!-- When there are no Ranges, only show a card containing the Past Due Balance -->\n      <ng-template #noDueRange>\n        <cx-card\n          [content]=\"\n            getPastDueBalanceCardContent(\n              headerDetails?.amountBalance?.pastDueBalance\n            ) | async\n          \"\n        >\n        </cx-card>\n      </ng-template>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AccountSummaryFacade }, { type: i2.LanguageService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const accountSummaryHeaderCmsConfig = {
    cmsComponents: {
        AccountSummaryHeaderComponent: {
            component: AccountSummaryHeaderComponent,
            guards: [AuthGuard, AdminGuard],
        },
    },
};
class AccountSummaryHeaderModule {
}
AccountSummaryHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, declarations: [AccountSummaryHeaderComponent], imports: [CardModule, CommonModule, I18nModule] });
AccountSummaryHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)], imports: [CardModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryHeaderComponent],
                    imports: [CardModule, CommonModule, I18nModule],
                    providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryListComponent extends UnitListComponent {
}
AccountSummaryListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
AccountSummaryListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AccountSummaryListComponent, selector: "cx-account-summary-list", usesInheritance: true, ngImport: i0, template: "<cx-org-list [hideAddButton]=\"true\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n", dependencies: [{ kind: "component", type: i1$1.ListComponent, selector: "cx-org-list", inputs: ["key", "hideAddButton"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-account-summary-list', template: "<cx-org-list [hideAddButton]=\"true\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryItemService {
    constructor(routingService) {
        this.routingService = routingService;
    }
    launchDetails(item) {
        if (item && Object.keys(item).length > 0) {
            this.routingService.go({
                cxRoute: 'orgAccountSummaryDetails',
                params: item,
            });
        }
    }
}
AccountSummaryItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryItemService, deps: [{ token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryUnitListService extends UnitListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.ACCOUNT_SUMMARY_UNIT;
    }
}
AccountSummaryUnitListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryUnitListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryUnitListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryUnitListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryUnitListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY = 'orgAccountSummaryList.breadcrumbs.details';
function accountSummaryUnitsTableConfigFactory() {
    return {
        table: {
            [OrganizationTableType.ACCOUNT_SUMMARY_UNIT]: {
                cells: ['name'],
                options: {
                    layout: TableLayout.VERTICAL,
                    cells: {
                        name: {
                            dataComponent: ToggleLinkCellComponent,
                        },
                    },
                },
                [BREAKPOINT.lg]: {
                    cells: ['name'],
                },
            },
        },
    };
}
const accountSummaryListCmsConfig = {
    cmsComponents: {
        ManageAccountSummaryListComponent: {
            component: AccountSummaryListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: AccountSummaryUnitListService,
                },
                {
                    provide: ItemService,
                    useExisting: AccountSummaryItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY,
                        },
                    },
                },
                children: [
                    {
                        path: `:${ROUTE_PARAMS.unitCode}`,
                        component: AccountSummaryDocumentComponent,
                        data: {
                            cxPageMeta: {
                                breadcrumb: ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY,
                            },
                        },
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryListModule {
}
AccountSummaryListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, declarations: [AccountSummaryListComponent], imports: [I18nModule, ListModule], exports: [AccountSummaryListComponent] });
AccountSummaryListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, providers: [
        provideDefaultConfig(accountSummaryListCmsConfig),
        provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
    ], imports: [I18nModule, ListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [I18nModule, ListModule],
                    providers: [
                        provideDefaultConfig(accountSummaryListCmsConfig),
                        provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
                    ],
                    declarations: [AccountSummaryListComponent],
                    exports: [AccountSummaryListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryComponentsModule {
}
AccountSummaryComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, imports: [AccountSummaryListModule,
        AccountSummaryHeaderModule,
        AccountSummaryDocumentModule] });
AccountSummaryComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, imports: [AccountSummaryListModule,
        AccountSummaryHeaderModule,
        AccountSummaryDocumentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AccountSummaryListModule,
                        AccountSummaryHeaderModule,
                        AccountSummaryDocumentModule,
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
OrganizationTableType['ACCOUNT_SUMMARY_UNIT'] = 'orgAccountSummary';

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY, AccountSummaryComponentsModule, AccountSummaryDocumentComponent, AccountSummaryDocumentFilterComponent, AccountSummaryDocumentFilterModule, AccountSummaryDocumentModule, AccountSummaryHeaderComponent, AccountSummaryHeaderModule, AccountSummaryItemService, AccountSummaryListComponent, AccountSummaryListModule, AccountSummaryUnitListService, accountSummaryDocumentCmsConfig, accountSummaryHeaderCmsConfig, accountSummaryListCmsConfig, accountSummaryUnitsTableConfigFactory };
//# sourceMappingURL=spartacus-organization-account-summary-components.mjs.map
