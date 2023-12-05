/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Optional, Output, ViewChild, ViewChildren, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { DirectionMode, } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@spartacus/asm/core";
import * as i3 from "@spartacus/asm/root";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@angular/common";
import * as i6 from "@spartacus/core";
import * as i7 from "../dot-spinner/dot-spinner.component";
export class CustomerSelectionComponent {
    constructor(fb, asmService, config, directionService, launchDialogService) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.directionService = directionService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
        this.activeFocusedButtonIndex = -1;
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        this.activeFocusedButtonIndex = -1;
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: this.config.asm?.customerSearch?.maxResults,
            });
        }
    }
    selectCustomerFromList(event, customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults(event) {
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
    /**
     * set focus to the first searched item
     * @param event keyboard event
     */
    focusFirstItem(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = 0;
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set mouse cursor to the end of search text
     * @param event keyboard event
     */
    setSelectionEnd(event) {
        event.preventDefault();
        if (this.searchTerm.nativeElement.value?.length) {
            const selectionStart = this.searchTerm.nativeElement.value.length;
            this.searchTerm.nativeElement.selectionStart = selectionStart;
            this.searchTerm.nativeElement.selectionEnd = selectionStart;
        }
    }
    /**
     * set focus on previous searh result item.  If no previous item then go to end of item.
     * @param event keyboard event
     */
    focusPreviousChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex--;
        if (this.activeFocusedButtonIndex < 0) {
            this.activeFocusedButtonIndex = this.searchResultItems.length - 1;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus on next searh result item.  if no next item then go to the first item
     * @param event keyboard event
     */
    focusNextChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex++;
        if (this.activeFocusedButtonIndex > this.searchResultItems.length - 1) {
            this.activeFocusedButtonIndex = 0;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus to input search text
     * @param event keyboard event
     */
    focusInputText(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = -1;
        this.searchTerm.nativeElement.focus();
        if (this.searchTerm.nativeElement.value?.length) {
            let selectionPos = this.searchTerm.nativeElement.selectionEnd;
            const searchTermLength = this.searchTerm.nativeElement.value.length;
            if (this.isBackNavigation(event)) {
                selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
            }
            else if (this.isForwardsNavigation(event)) {
                selectionPos =
                    selectionPos >= searchTermLength
                        ? searchTermLength
                        : selectionPos + 1;
            }
            else if (event.code === 'Home') {
                selectionPos = 0;
            }
            else if (event.code === 'End') {
                selectionPos = searchTermLength;
            }
            this.searchTerm.nativeElement.selectionStart = selectionPos;
            this.searchTerm.nativeElement.selectionEnd = selectionPos;
        }
    }
    /**
     * set focus to selected item
     * @param {number} selectedIndex - current selected item index
     */
    updateItemIndex(selectedIndex) {
        this.searchResultItems.toArray()?.[selectedIndex]?.nativeElement.focus();
    }
    createCustomer() {
        this.asmService.customerSearchReset();
        this.launchDialogService?.openDialogAndSubscribe("ASM_CREATE_CUSTOMER_FORM" /* LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM */, this.createCustomerLink);
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1.UntypedFormBuilder }, { token: i2.AsmService }, { token: i3.AsmConfig }, { token: i4.DirectionService }, { token: i4.LaunchDialogService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }, { propertyName: "createCustomerLink", first: true, predicate: ["createCustomerLink"], descendants: true }, { propertyName: "searchResultItems", predicate: ["searchResultItem"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n\n  <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n  <ng-container *cxFeatureLevel=\"'!6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"closeResults($event)\"\n      (keydown.enter)=\"closeResults($event)\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n    </button>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"createCustomer()\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      <span>{{ 'asm.customerSearch.noMatchResult' | cxTranslate }}</span>\n      <span #createCustomerLink class=\"linkStyleLabel\">{{\n        'asm.customerSearch.createCustomer' | cxTranslate\n      }}</span>\n    </button>\n  </ng-container>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n", dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i6.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: i7.DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n\n  <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n  <ng-container *cxFeatureLevel=\"'!6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"closeResults($event)\"\n      (keydown.enter)=\"closeResults($event)\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n    </button>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"createCustomer()\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      <span>{{ 'asm.customerSearch.noMatchResult' | cxTranslate }}</span>\n      <span #createCustomerLink class=\"linkStyleLabel\">{{\n        'asm.customerSearch.createCustomer' | cxTranslate\n      }}</span>\n    </button>\n  </ng-container>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }, { type: i2.AsmService }, { type: i3.AsmConfig }, { type: i4.DirectionService }, { type: i4.LaunchDialogService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }], createCustomerLink: [{
                type: ViewChild,
                args: ['createCustomerLink']
            }], searchResultItems: [{
                type: ViewChildren,
                args: ['searchResultItem']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFHWixRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBS3hCLE9BQU8sRUFDTCxhQUFhLEdBSWQsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7O0FBUzlDLE1BQU0sT0FBTywwQkFBMEI7SUF1Q3JDLFlBQ1ksRUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsTUFBaUIsRUFDakIsZ0JBQWtDLEVBQ3RCLG1CQUF5QztRQUpyRCxPQUFFLEdBQUYsRUFBRSxDQUFvQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBMUN2RCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNNUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQVUxRCw2QkFB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RFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQnVpbGRlcixcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXNtU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2NvcmUnO1xuaW1wb3J0IHsgQXNtQ29uZmlnLCBDdXN0b21lclNlYXJjaFBhZ2UgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBEaXJlY3Rpb25Nb2RlLFxuICBEaXJlY3Rpb25TZXJ2aWNlLFxuICBMQVVOQ0hfQ0FMTEVSLFxuICBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWN1c3RvbWVyLXNlbGVjdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1zZWxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnb25Eb2N1bWVudENsaWNrKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3VzdG9tZXJTZWxlY3Rpb25Gb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBzZWFyY2hSZXN1bHRzTG9hZGluZyQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHNlYXJjaFJlc3VsdHM6IE9ic2VydmFibGU8Q3VzdG9tZXJTZWFyY2hQYWdlPjtcbiAgc2VsZWN0ZWRDdXN0b21lcjogVXNlciB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KClcbiAgc3VibWl0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgY3VzdG9tZXJJZD86IHN0cmluZyB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3Jlc3VsdExpc3QnKSByZXN1bHRMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWFyY2hUZXJtJykgc2VhcmNoVGVybTogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCdjcmVhdGVDdXN0b21lckxpbmsnKSBjcmVhdGVDdXN0b21lckxpbms6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ3NlYXJjaFJlc3VsdEl0ZW0nKSBzZWFyY2hSZXN1bHRJdGVtczogUXVlcnlMaXN0PFxuICAgIEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+XG4gID47XG5cbiAgYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gLTE7XG5cbiAgLy8gVE9ETyhDWFNQQS0zMDkxKTogbWFrZSBMYXVuY2hEaWFsb2dTZXJ2aWNlIGFyZSByZXF1aXJlZCBkZXBlbmRlbmN5XG4gIGNvbnN0cnVjdG9yKFxuICAgIGZiOiBVbnR5cGVkRm9ybUJ1aWxkZXIsXG4gICAgYXNtU2VydmljZTogQXNtU2VydmljZSxcbiAgICBjb25maWc6IEFzbUNvbmZpZyxcbiAgICBkaXJlY3Rpb25TZXJ2aWNlOiBEaXJlY3Rpb25TZXJ2aWNlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNi4xXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBmYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIGFzbVNlcnZpY2U6IEFzbVNlcnZpY2UsXG4gICAgY29uZmlnOiBBc21Db25maWcsXG4gICAgZGlyZWN0aW9uU2VydmljZTogRGlyZWN0aW9uU2VydmljZVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBmYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIHByb3RlY3RlZCBhc21TZXJ2aWNlOiBBc21TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWc6IEFzbUNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uU2VydmljZTogRGlyZWN0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZT86IExhdW5jaERpYWxvZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBzZWFyY2hUZXJtOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgIH0pO1xuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzTG9hZGluZyQgPVxuICAgICAgdGhpcy5hc21TZXJ2aWNlLmdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRpbmcoKTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLmFzbVNlcnZpY2UuZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmN1c3RvbWVyU2VsZWN0aW9uRm9ybS5jb250cm9scy5zZWFyY2hUZXJtLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzAwKSlcbiAgICAgICAgLnN1YnNjcmliZSgoc2VhcmNoVGVybVZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWFyY2hUZXJtKHNlYXJjaFRlcm1WYWx1ZSk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVTZWFyY2hUZXJtKHNlYXJjaFRlcm1WYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKFxuICAgICAgISF0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgJiZcbiAgICAgIHNlYXJjaFRlcm1WYWx1ZSAhPT0gdGhpcy5zZWxlY3RlZEN1c3RvbWVyLm5hbWVcbiAgICApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKEJvb2xlYW4odGhpcy5zZWxlY3RlZEN1c3RvbWVyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gLTE7XG4gICAgaWYgKHNlYXJjaFRlcm1WYWx1ZS50cmltKCkubGVuZ3RoID49IDMpIHtcbiAgICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaCh7XG4gICAgICAgIHF1ZXJ5OiBzZWFyY2hUZXJtVmFsdWUsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmNvbmZpZy5hc20/LmN1c3RvbWVyU2VhcmNoPy5tYXhSZXN1bHRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Q3VzdG9tZXJGcm9tTGlzdChldmVudDogVUlFdmVudCwgY3VzdG9tZXI6IFVzZXIpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSBjdXN0b21lcjtcbiAgICB0aGlzLmN1c3RvbWVyU2VsZWN0aW9uRm9ybS5jb250cm9scy5zZWFyY2hUZXJtLnNldFZhbHVlKFxuICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyLm5hbWVcbiAgICApO1xuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLnZhbGlkICYmICEhdGhpcy5zZWxlY3RlZEN1c3RvbWVyKSB7XG4gICAgICB0aGlzLnN1Ym1pdEV2ZW50LmVtaXQoeyBjdXN0b21lcklkOiB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIuY3VzdG9tZXJJZCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXN0b21lclNlbGVjdGlvbkZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayhldmVudDogVUlFdmVudCkge1xuICAgIGlmIChCb29sZWFuKHRoaXMucmVzdWx0TGlzdCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZVJlc3VsdHMoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICAgIHRoaXMuc2VhcmNoVGVybS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gdGhlIGZpcnN0IHNlYXJjaGVkIGl0ZW1cbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c0ZpcnN0SXRlbShldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPSAwO1xuICAgIHRoaXMudXBkYXRlSXRlbUluZGV4KHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4KTtcbiAgfVxuICAvKipcbiAgICogc2V0IG1vdXNlIGN1cnNvciB0byB0aGUgZW5kIG9mIHNlYXJjaCB0ZXh0XG4gICAqIEBwYXJhbSBldmVudCBrZXlib2FyZCBldmVudFxuICAgKi9cbiAgc2V0U2VsZWN0aW9uRW5kKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQudmFsdWU/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGg7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgb24gcHJldmlvdXMgc2VhcmggcmVzdWx0IGl0ZW0uICBJZiBubyBwcmV2aW91cyBpdGVtIHRoZW4gZ28gdG8gZW5kIG9mIGl0ZW0uXG4gICAqIEBwYXJhbSBldmVudCBrZXlib2FyZCBldmVudFxuICAgKi9cbiAgZm9jdXNQcmV2aW91c0NoaWxkKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleC0tO1xuICAgIGlmICh0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCA8IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gdGhpcy5zZWFyY2hSZXN1bHRJdGVtcy5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUl0ZW1JbmRleCh0aGlzLmFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCk7XG4gIH1cbiAgLyoqXG4gICAqIHNldCBmb2N1cyBvbiBuZXh0IHNlYXJoIHJlc3VsdCBpdGVtLiAgaWYgbm8gbmV4dCBpdGVtIHRoZW4gZ28gdG8gdGhlIGZpcnN0IGl0ZW1cbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c05leHRDaGlsZChldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXgrKztcbiAgICBpZiAodGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPiB0aGlzLnNlYXJjaFJlc3VsdEl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVJdGVtSW5kZXgodGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXgpO1xuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gaW5wdXQgc2VhcmNoIHRleHRcbiAgICogQHBhcmFtIGV2ZW50IGtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBmb2N1c0lucHV0VGV4dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPSAtMTtcbiAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIGlmICh0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC52YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBsZXQgc2VsZWN0aW9uUG9zID0gdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgY29uc3Qgc2VhcmNoVGVybUxlbmd0aCA9IHRoaXMuc2VhcmNoVGVybS5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aDtcblxuICAgICAgaWYgKHRoaXMuaXNCYWNrTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgICAgc2VsZWN0aW9uUG9zID0gc2VsZWN0aW9uUG9zIDw9IDAgPyAwIDogc2VsZWN0aW9uUG9zIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZvcndhcmRzTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgICAgc2VsZWN0aW9uUG9zID1cbiAgICAgICAgICBzZWxlY3Rpb25Qb3MgPj0gc2VhcmNoVGVybUxlbmd0aFxuICAgICAgICAgICAgPyBzZWFyY2hUZXJtTGVuZ3RoXG4gICAgICAgICAgICA6IHNlbGVjdGlvblBvcyArIDE7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdIb21lJykge1xuICAgICAgICBzZWxlY3Rpb25Qb3MgPSAwO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5jb2RlID09PSAnRW5kJykge1xuICAgICAgICBzZWxlY3Rpb25Qb3MgPSBzZWFyY2hUZXJtTGVuZ3RoO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWFyY2hUZXJtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25Qb3M7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25Qb3M7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBzZXQgZm9jdXMgdG8gc2VsZWN0ZWQgaXRlbVxuICAgKiBAcGFyYW0ge251bWJlcn0gc2VsZWN0ZWRJbmRleCAtIGN1cnJlbnQgc2VsZWN0ZWQgaXRlbSBpbmRleFxuICAgKi9cbiAgdXBkYXRlSXRlbUluZGV4KHNlbGVjdGVkSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoUmVzdWx0SXRlbXMudG9BcnJheSgpPy5bc2VsZWN0ZWRJbmRleF0/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGNyZWF0ZUN1c3RvbWVyKCk6IHZvaWQge1xuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlPy5vcGVuRGlhbG9nQW5kU3Vic2NyaWJlKFxuICAgICAgTEFVTkNIX0NBTExFUi5BU01fQ1JFQVRFX0NVU1RPTUVSX0ZPUk0sXG4gICAgICB0aGlzLmNyZWF0ZUN1c3RvbWVyTGlua1xuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIHVzZXIgbmF2aWdhdGVzIGludG8gYSBzdWJncm91cCBvZiB0aGUgbWFpbiBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gS2V5Ym9hcmQgZXZlbnRcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0ndHJ1ZScgaWYgdGhlIHVzZXIgbmF2aWdhdGVzIGludG8gdGhlIHN1Ymdyb3VwLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGlzRm9yd2FyZHNOYXZpZ2F0aW9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIChldmVudC5jb2RlID09PSAnQXJyb3dSaWdodCcgJiYgdGhpcy5pc0xUUkRpcmVjdGlvbigpKSB8fFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0xlZnQnICYmIHRoaXMuaXNSVExEaXJlY3Rpb24oKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIHVzZXIgbmF2aWdhdGVzIGZyb20gYSBzdWJncm91cCBiYWNrIHRvIHRoZSBtYWluIGdyb3VwIG1lbnUuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSd0cnVlJyBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgYmFjayBpbnRvIHRoZSBtYWluIGdyb3VwIG1lbnUsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNCYWNrTmF2aWdhdGlvbihldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5pc0xUUkRpcmVjdGlvbigpKSB8fFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1JpZ2h0JyAmJiB0aGlzLmlzUlRMRGlyZWN0aW9uKCkpXG4gICAgKTtcbiAgfVxuICBwcm90ZWN0ZWQgaXNMVFJEaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSA9PT0gRGlyZWN0aW9uTW9kZS5MVFI7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNSVExEaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSA9PT0gRGlyZWN0aW9uTW9kZS5SVEw7XG4gIH1cbn1cbiIsIjxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCIgW2Zvcm1Hcm91cF09XCJjdXN0b21lclNlbGVjdGlvbkZvcm1cIj5cbiAgPGxhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgcmVxdWlyZWQ9XCJ0cnVlXCJcbiAgICAgICNzZWFyY2hUZXJtXG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hUZXJtXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2FzbS5jdXN0b21lclNlYXJjaC5zZWFyY2hUZXJtLmxhYmVsJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgIHBsYWNlaG9sZGVyPVwie3sgJ2FzbS5jdXN0b21lclNlYXJjaC5zZWFyY2hUZXJtLmxhYmVsJyB8IGN4VHJhbnNsYXRlIH19XCJcbiAgICAgIChrZXlkb3duLmFycm93ZG93bik9XCJmb2N1c0ZpcnN0SXRlbSgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmVuZCk9XCJzZXRTZWxlY3Rpb25FbmQoJGV2ZW50KVwiXG4gICAgLz5cbiAgICA8Y3gtZm9ybS1lcnJvcnNcbiAgICAgIFtjb250cm9sXT1cImN1c3RvbWVyU2VsZWN0aW9uRm9ybS5nZXQoJ3NlYXJjaFRlcm0nKVwiXG4gICAgPjwvY3gtZm9ybS1lcnJvcnM+XG4gIDwvbGFiZWw+XG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDdXN0b21lclwiPlxuICAgIHt7ICdhc20uY3VzdG9tZXJTZWFyY2guc3VibWl0JyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuXG48ZGl2ICpuZ0lmPVwic2VhcmNoUmVzdWx0cyB8IGFzeW5jIGFzIHJlc3VsdHNcIiBjbGFzcz1cImFzbS1yZXN1bHRzXCIgI3Jlc3VsdExpc3Q+XG4gIDxidXR0b25cbiAgICAjc2VhcmNoUmVzdWx0SXRlbVxuICAgICpuZ0Zvcj1cImxldCByZXN1bHQgb2YgcmVzdWx0cy5lbnRyaWVzOyBsZXQgaSA9IGluZGV4XCJcbiAgICBbdGFiaW5kZXhdPVwiYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID09PSBpID8gMCA6IC0xXCJcbiAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImFjdGl2ZUZvY3VzZWRCdXR0b25JbmRleCA9PT0gaVwiXG4gICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPT09IGlcIlxuICAgIChrZXlkb3duLmFycm93dXApPVwiZm9jdXNQcmV2aW91c0NoaWxkKCRldmVudClcIlxuICAgIChrZXlkb3duLmFycm93ZG93bik9XCJmb2N1c05leHRDaGlsZCgkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5hcnJvd3JpZ2h0KT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChrZXlkb3duLmFycm93bGVmdCk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5lbnRlcik9XCJzZWxlY3RDdXN0b21lckZyb21MaXN0KCRldmVudCwgcmVzdWx0KVwiXG4gICAgKGtleWRvd24uZXNjYXBlKT1cImNsb3NlUmVzdWx0cygkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5ob21lKT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgIChrZXlkb3duLmVuZCk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICAoY2xpY2spPVwic2VsZWN0Q3VzdG9tZXJGcm9tTGlzdCgkZXZlbnQsIHJlc3VsdClcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJyZXN1bHQtbmFtZVwiPnt7IHJlc3VsdC5uYW1lIH19PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwicmVzdWx0LWlkXCI+e3sgcmVzdWx0LnVpZCB9fTwvc3Bhbj5cbiAgPC9idXR0b24+XG5cbiAgPCEtLSBUT0RPOihDWFNQQS0zMDkwKSBmb3IgbmV4dCBtYWpvciByZWxlYXNlIHJlbW92ZSBmZWF0dXJlIGxldmVsIC0tPlxuICA8bmctY29udGFpbmVyICpjeEZlYXR1cmVMZXZlbD1cIichNi4xJ1wiPlxuICAgIDxidXR0b25cbiAgICAgICNzZWFyY2hSZXN1bHRJdGVtXG4gICAgICAoY2xpY2spPVwiY2xvc2VSZXN1bHRzKCRldmVudClcIlxuICAgICAgKGtleWRvd24uZW50ZXIpPVwiY2xvc2VSZXN1bHRzKCRldmVudClcIlxuICAgICAgKGtleWRvd24uZXNjYXBlKT1cImNsb3NlUmVzdWx0cygkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmFycm93cmlnaHQpPVwiZm9jdXNJbnB1dFRleHQoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5hcnJvd2xlZnQpPVwiZm9jdXNJbnB1dFRleHQoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5ob21lKT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgICAgKGtleWRvd24uZW5kKT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPT09IDBcIlxuICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJhY3RpdmVGb2N1c2VkQnV0dG9uSW5kZXggPT09IDBcIlxuICAgICAgKm5nSWY9XCJcbiAgICAgICAgIShzZWFyY2hSZXN1bHRzTG9hZGluZyQgfCBhc3luYykgJiZcbiAgICAgICAgc2VhcmNoVGVybS52YWx1ZS5sZW5ndGggPj0gMyAmJlxuICAgICAgICAhIXJlc3VsdHMuZW50cmllcyAmJlxuICAgICAgICByZXN1bHRzLmVudHJpZXMubGVuZ3RoIDw9IDBcbiAgICAgIFwiXG4gICAgPlxuICAgICAge3sgJ2FzbS5jdXN0b21lclNlYXJjaC5ub01hdGNoJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9idXR0b24+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpjeEZlYXR1cmVMZXZlbD1cIic2LjEnXCI+XG4gICAgPGJ1dHRvblxuICAgICAgI3NlYXJjaFJlc3VsdEl0ZW1cbiAgICAgIChjbGljayk9XCJjcmVhdGVDdXN0b21lcigpXCJcbiAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJjbG9zZVJlc3VsdHMoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5hcnJvd3JpZ2h0KT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgICAgKGtleWRvd24uYXJyb3dsZWZ0KT1cImZvY3VzSW5wdXRUZXh0KCRldmVudClcIlxuICAgICAgKGtleWRvd24uaG9tZSk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmVuZCk9XCJmb2N1c0lucHV0VGV4dCgkZXZlbnQpXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID09PSAwXCJcbiAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiYWN0aXZlRm9jdXNlZEJ1dHRvbkluZGV4ID09PSAwXCJcbiAgICAgICpuZ0lmPVwiXG4gICAgICAgICEoc2VhcmNoUmVzdWx0c0xvYWRpbmckIHwgYXN5bmMpICYmXG4gICAgICAgIHNlYXJjaFRlcm0udmFsdWUubGVuZ3RoID49IDMgJiZcbiAgICAgICAgISFyZXN1bHRzLmVudHJpZXMgJiZcbiAgICAgICAgcmVzdWx0cy5lbnRyaWVzLmxlbmd0aCA8PSAwXG4gICAgICBcIlxuICAgID5cbiAgICAgIDxzcGFuPnt7ICdhc20uY3VzdG9tZXJTZWFyY2gubm9NYXRjaFJlc3VsdCcgfCBjeFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICNjcmVhdGVDdXN0b21lckxpbmsgY2xhc3M9XCJsaW5rU3R5bGVMYWJlbFwiPnt7XG4gICAgICAgICdhc20uY3VzdG9tZXJTZWFyY2guY3JlYXRlQ3VzdG9tZXInIHwgY3hUcmFuc2xhdGVcbiAgICAgIH19PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiYXNtLXJlc3VsdHNcIiAqbmdJZj1cInNlYXJjaFJlc3VsdHNMb2FkaW5nJCB8IGFzeW5jXCI+XG4gIDxjeC1kb3Qtc3Bpbm5lclxuICAgIGFyaWEtaGlkZGVuPVwiZmFsc2VcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5sb2FkaW5nJyB8IGN4VHJhbnNsYXRlXCJcbiAgPjwvY3gtZG90LXNwaW5uZXI+XG48L2Rpdj5cbiJdfQ==