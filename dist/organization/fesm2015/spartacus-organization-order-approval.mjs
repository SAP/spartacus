import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule, InjectionToken, inject } from '@angular/core';
import * as i3 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { queueScheduler, combineLatest, of } from 'rxjs';
import { observeOn, tap, filter, map, switchMap, shareReplay, catchError } from 'rxjs/operators';
import * as i1$1 from '@spartacus/core';
import { StateUtils, PROCESS_FEATURE, ProcessSelectors, B2BUserRole, GlobalMessageType, I18nModule, UrlModule, ConfigModule, AuthGuard, provideDefaultConfig, LoggerService, OCC_USER_ID_ANONYMOUS, normalizeHttpError, AuthActions } from '@spartacus/core';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, combineReducers, StoreModule } from '@ngrx/store';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@spartacus/storefront';
import { FormErrorsModule, SpinnerModule, ListNavigationModule } from '@spartacus/storefront';
import * as i6 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$3 from '@spartacus/order/components';
import { OrderDetailTotalsComponent, OrderDetailsService, OrderOverviewComponent, OrderDetailItemsComponent } from '@spartacus/order/components';
import * as i1$2 from '@spartacus/user/account/root';
import * as i1$4 from '@angular/common/http';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import * as i1$5 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var OrderApprovalDecisionValue;
(function (OrderApprovalDecisionValue) {
    OrderApprovalDecisionValue["APPROVE"] = "APPROVE";
    OrderApprovalDecisionValue["REJECT"] = "REJECT";
})(OrderApprovalDecisionValue || (OrderApprovalDecisionValue = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_APPROVAL_FEATURE = 'order-approval';
const ORDER_APPROVAL_ENTITIES = 'order-approval-entities';
const ORDER_APPROVAL_LIST = 'order-approval-list';
const ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID = 'orderApproval.makeDecision';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_ORDER_APPROVAL = '[OrderApproval] Load OrderApproval Data';
const LOAD_ORDER_APPROVAL_FAIL = '[OrderApproval] Load OrderApproval Data Fail';
const LOAD_ORDER_APPROVAL_SUCCESS = '[OrderApproval] Load OrderApproval Data Success';
const LOAD_ORDER_APPROVALS = '[OrderApproval] Load OrderApprovals';
const LOAD_ORDER_APPROVALS_FAIL = '[OrderApproval] Load OrderApprovals Fail';
const LOAD_ORDER_APPROVALS_SUCCESS = '[OrderApproval] Load OrderApprovals Success';
const MAKE_DECISION = '[OrderApproval] Make OrderApproval Decision';
const MAKE_DECISION_FAIL = '[OrderApproval] Make OrderApproval Decision Fail';
const MAKE_DECISION_SUCCESS = '[OrderApproval] Make OrderApproval Decision Success';
const MAKE_DECISION_RESET = '[OrderApproval] Make OrderApproval Decision Reset';
class LoadOrderApproval extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode);
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVAL;
    }
}
class LoadOrderApprovalFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode, payload.error);
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVAL_FAIL;
    }
}
class LoadOrderApprovalSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ORDER_APPROVAL_ENTITIES, Array.isArray(payload)
            ? payload.map((orderApproval) => { var _a; return (_a = orderApproval.code) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVAL_SUCCESS;
    }
}
class LoadOrderApprovals extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORDER_APPROVAL_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVALS;
    }
}
class LoadOrderApprovalsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORDER_APPROVAL_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVALS_FAIL;
    }
}
class LoadOrderApprovalsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ORDER_APPROVAL_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_ORDER_APPROVALS_SUCCESS;
    }
}
class MakeDecision extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
        this.payload = payload;
        this.type = MAKE_DECISION;
    }
}
class MakeDecisionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID, payload);
        this.payload = payload;
        this.type = MAKE_DECISION_FAIL;
    }
}
class MakeDecisionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
        this.payload = payload;
        this.type = MAKE_DECISION_SUCCESS;
    }
}
class MakeDecisionReset extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
        this.type = MAKE_DECISION_RESET;
    }
}

var orderApproval_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_ORDER_APPROVAL: LOAD_ORDER_APPROVAL,
    LOAD_ORDER_APPROVALS: LOAD_ORDER_APPROVALS,
    LOAD_ORDER_APPROVALS_FAIL: LOAD_ORDER_APPROVALS_FAIL,
    LOAD_ORDER_APPROVALS_SUCCESS: LOAD_ORDER_APPROVALS_SUCCESS,
    LOAD_ORDER_APPROVAL_FAIL: LOAD_ORDER_APPROVAL_FAIL,
    LOAD_ORDER_APPROVAL_SUCCESS: LOAD_ORDER_APPROVAL_SUCCESS,
    LoadOrderApproval: LoadOrderApproval,
    LoadOrderApprovalFail: LoadOrderApprovalFail,
    LoadOrderApprovalSuccess: LoadOrderApprovalSuccess,
    LoadOrderApprovals: LoadOrderApprovals,
    LoadOrderApprovalsFail: LoadOrderApprovalsFail,
    LoadOrderApprovalsSuccess: LoadOrderApprovalsSuccess,
    MAKE_DECISION: MAKE_DECISION,
    MAKE_DECISION_FAIL: MAKE_DECISION_FAIL,
    MAKE_DECISION_RESET: MAKE_DECISION_RESET,
    MAKE_DECISION_SUCCESS: MAKE_DECISION_SUCCESS,
    MakeDecision: MakeDecision,
    MakeDecisionFail: MakeDecisionFail,
    MakeDecisionReset: MakeDecisionReset,
    MakeDecisionSuccess: MakeDecisionSuccess
});

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
const getOrderApprovalState = createFeatureSelector(ORDER_APPROVAL_FEATURE);
const getOrderApprovalManagementState = createSelector(getOrderApprovalState, (state) => state[ORDER_APPROVAL_FEATURE]);
const getOrderApprovalsState = createSelector(getOrderApprovalManagementState, (state) => state && state.entities);
const getOrderApproval = (orderApprovalCode) => createSelector(getOrderApprovalsState, (state) => StateUtils.entityLoaderStateSelector(state, orderApprovalCode));
const getOrderApprovalList = (params) => createSelector(getOrderApprovalManagementState, (state) => StateUtils.denormalizeSearch(state, params));

var orderApproval_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getOrderApproval: getOrderApproval,
    getOrderApprovalList: getOrderApprovalList,
    getOrderApprovalManagementState: getOrderApprovalManagementState,
    getOrderApprovalState: getOrderApprovalState,
    getOrderApprovalsState: getOrderApprovalsState
});

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
class OrderApprovalService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    loadOrderApproval(orderApprovalCode) {
        this.userIdService.takeUserId().subscribe((userId) => this.store.dispatch(new LoadOrderApproval({
            userId,
            orderApprovalCode,
        })));
    }
    loadOrderApprovals(params) {
        this.userIdService
            .takeUserId()
            .subscribe((userId) => this.store.dispatch(new LoadOrderApprovals({ userId, params })));
    }
    getOrderApproval(orderApprovalCode) {
        return this.store.select(getOrderApproval(orderApprovalCode));
    }
    getOrderApprovalList(params) {
        return this.store.select(getOrderApprovalList(params));
    }
    get(orderApprovalCode) {
        return this.getOrderApproval(orderApprovalCode).pipe(observeOn(queueScheduler), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadOrderApproval(orderApprovalCode);
            }
        }), filter((state) => Boolean(state.success || state.error)), map((state) => state.value));
    }
    /**
     * Emits true if a request is currently fetching order approval data from
     * the server.
     *
     * @param orderApprovalCode The approval code for which we want the loading status.
     */
    getOrderApprovalLoading(orderApprovalCode) {
        return this.getOrderApproval(orderApprovalCode).pipe(map((orderApprovalState) => { var _a; return (_a = orderApprovalState.loading) !== null && _a !== void 0 ? _a : false; }));
    }
    getList(params) {
        return this.getOrderApprovalList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadOrderApprovals(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    makeDecision(orderApprovalCode, orderApprovalDecision) {
        this.userIdService.takeUserId().subscribe((userId) => this.store.dispatch(new MakeDecision({
            userId,
            orderApprovalCode,
            orderApprovalDecision,
        })));
    }
    /**
     * Returns the makeDecision loading flag.  Returns true when the process triggered
     * by makeDecision() is currently running.
     */
    getMakeDecisionResultLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID)));
    }
    /**
     * Returns the makeDecision failure outcome.  Returns true when the outcome
     * of makeDecision() was an error.
     */
    getMakeDecisionResultError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID)));
    }
    /**
     * Returns the makeDecision process success outcome.  Returns true when the outcome
     * of makeDecision() was a success.
     */
    getMakeDecisionResultSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID)));
    }
    /**
     * Resets the makeDecision process state. It is usually preferable to reset the
     * process state before making a call to makeDecision() for which we then want
     * to monitor the loading state or the outcome.
     */
    resetMakeDecisionProcessState() {
        this.store.dispatch(new MakeDecisionReset());
    }
}
OrderApprovalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalService, deps: [{ token: i1.Store }, { token: i1$1.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1$1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalDetailService {
    constructor(routingService, orderApprovalService) {
        this.routingService = routingService;
        this.orderApprovalService = orderApprovalService;
        this.approvalCode$ = this.routingService
            .getRouterState()
            .pipe(map((routingData) => routingData.state.params.approvalCode));
        this.orderApproval$ = this.approvalCode$.pipe(filter((approvalCode) => Boolean(approvalCode)), tap((approvalCode) => this.orderApprovalService.loadOrderApproval(approvalCode)), switchMap((approvalCode) => this.orderApprovalService.get(approvalCode)), shareReplay({ bufferSize: 1, refCount: true }));
        this.order$ = this.orderApproval$.pipe(map((orderApproval) => orderApproval === null || orderApproval === void 0 ? void 0 : orderApproval.order));
    }
    /**
     * Returns a string that represents the approval code
     * found in the page url.
     */
    getOrderApprovalCodeFromRoute() {
        return this.approvalCode$;
    }
    /**
     * Returns the order data from the approval details that have been
     * retrieved from the approval code in the page url.
     */
    getOrderDetails() {
        return this.order$;
    }
    /**
     * Returns the approval details that have been retrieved from the
     * approval code in the page url.
     */
    getOrderApproval() {
        return this.orderApproval$;
    }
}
OrderApprovalDetailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, deps: [{ token: i1$1.RoutingService }, { token: OrderApprovalService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalDetailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: OrderApprovalService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalDetailFormComponent {
    constructor(orderApprovalDetailService, orderApprovalService, fb) {
        this.orderApprovalDetailService = orderApprovalDetailService;
        this.orderApprovalService = orderApprovalService;
        this.fb = fb;
        this.approvalDecisionValue = OrderApprovalDecisionValue;
        this.approvalFormVisible = false;
        this.approvalForm = this.fb.group({
            comment: [''],
        });
        this.orderApprovalLoading$ = this.orderApprovalDetailService
            .getOrderApprovalCodeFromRoute()
            .pipe(switchMap((approvalCode) => this.orderApprovalService.getOrderApprovalLoading(approvalCode)));
        this.decisionResultLoading$ = this.orderApprovalService.getMakeDecisionResultLoading();
        this.loading$ = combineLatest([
            this.orderApprovalLoading$,
            this.decisionResultLoading$,
        ]).pipe(map(([approvalLoading, decisionResultLoading]) => approvalLoading || decisionResultLoading));
        this.orderApproval$ = this.orderApprovalDetailService.getOrderApproval();
        this.orderApprovalService.resetMakeDecisionProcessState();
    }
    displayDecisionForm(decision) {
        this.approvalDecision = decision;
        if (decision === OrderApprovalDecisionValue.APPROVE) {
            this.approvalForm.controls.comment.clearValidators();
        }
        else {
            this.approvalForm.controls.comment.setValidators([Validators.required]);
        }
        this.approvalFormVisible = true;
    }
    cancelDecisionForm() {
        this.approvalFormVisible = false;
        this.approvalForm.reset();
    }
    submitDecision(orderApproval) {
        var _a;
        if (this.approvalForm.valid) {
            this.orderApprovalService.makeDecision((_a = orderApproval.code) !== null && _a !== void 0 ? _a : '', {
                decision: this.approvalDecision,
                comment: this.approvalForm.controls.comment.value,
            });
            this.approvalFormVisible = false;
        }
        else {
            this.approvalForm.markAllAsTouched();
        }
    }
    ngOnDestroy() {
        this.orderApprovalService.resetMakeDecisionProcessState();
    }
}
OrderApprovalDetailFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailFormComponent, deps: [{ token: OrderApprovalDetailService }, { token: OrderApprovalService }, { token: i3.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OrderApprovalDetailFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderApprovalDetailFormComponent, selector: "cx-order-approval-detail-form", ngImport: i0, template: "<ng-container *ngIf=\"orderApproval$ | async as orderApproval\">\n  <div *ngIf=\"loading$ | async; else approvalFormTemplate\">\n    <div class=\"cx-spinner\">\n      <cx-spinner></cx-spinner>\n    </div>\n  </div>\n\n  <ng-template #approvalFormTemplate>\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container *ngIf=\"orderApproval?.approvalDecisionRequired\">\n      <div *ngIf=\"approvalFormVisible\" class=\"cx-approval-form-header row\">\n        <div class=\"cx-approval-form-label col-sm-12\">\n          {{\n            'orderApprovalDetails.form.title_' + approvalDecision\n              | cxTranslate\n                : {\n                    orderCode: orderApproval?.order?.code,\n                    orderTotal:\n                      orderApproval?.order?.totalPriceWithTax?.formattedValue\n                  }\n          }}\n        </div>\n      </div>\n\n      <form\n        [formGroup]=\"approvalForm\"\n        (ngSubmit)=\"submitDecision(orderApproval)\"\n        *ngIf=\"approvalFormVisible\"\n      >\n        <label\n          >{{\n            'orderApprovalDetails.form.comment_' + approvalDecision + '.label'\n              | cxTranslate\n          }}\n          <textarea\n            class=\"form-control\"\n            rows=\"3\"\n            formControlName=\"comment\"\n            maxlength=\"255\"\n          ></textarea>\n          <cx-form-errors\n            [control]=\"approvalForm.get('comment')\"\n          ></cx-form-errors>\n        </label>\n        <div class=\"form-group row\">\n          <div class=\"col-lg-6 col-md-12\">\n            <button\n              class=\"btn btn-block btn-secondary\"\n              (click)=\"cancelDecisionForm()\"\n              type=\"button\"\n            >\n              {{ 'orderApprovalDetails.form.cancel' | cxTranslate }}\n            </button>\n          </div>\n          <div class=\"col-lg-6 col-md-12\">\n            <button class=\"btn btn-block btn-primary\" type=\"submit\">\n              {{\n                'orderApprovalDetails.form.submit_' + approvalDecision\n                  | cxTranslate\n              }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </ng-container>\n    <ng-container *ngIf=\"!approvalFormVisible\">\n      <div class=\"form-group row\">\n        <div class=\"col-lg-4 col-md-12\">\n          <a\n            [routerLink]=\"{ cxRoute: 'orderApprovals' } | cxUrl\"\n            class=\"btn btn-block btn-secondary\"\n            >{{ 'orderApprovalDetails.back' | cxTranslate }}</a\n          >\n        </div>\n        <div\n          class=\"col-lg-4 col-md-12\"\n          *ngIf=\"orderApproval?.approvalDecisionRequired\"\n        >\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"displayDecisionForm(approvalDecisionValue.REJECT)\"\n          >\n            {{ 'orderApprovalDetails.showForm_REJECT' | cxTranslate }}\n          </button>\n        </div>\n        <div\n          class=\"col-lg-4 col-md-12\"\n          *ngIf=\"orderApproval?.approvalDecisionRequired\"\n        >\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"displayDecisionForm(approvalDecisionValue.APPROVE)\"\n          >\n            {{ 'orderApprovalDetails.showForm_APPROVE' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i5.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-approval-detail-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"orderApproval$ | async as orderApproval\">\n  <div *ngIf=\"loading$ | async; else approvalFormTemplate\">\n    <div class=\"cx-spinner\">\n      <cx-spinner></cx-spinner>\n    </div>\n  </div>\n\n  <ng-template #approvalFormTemplate>\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container *ngIf=\"orderApproval?.approvalDecisionRequired\">\n      <div *ngIf=\"approvalFormVisible\" class=\"cx-approval-form-header row\">\n        <div class=\"cx-approval-form-label col-sm-12\">\n          {{\n            'orderApprovalDetails.form.title_' + approvalDecision\n              | cxTranslate\n                : {\n                    orderCode: orderApproval?.order?.code,\n                    orderTotal:\n                      orderApproval?.order?.totalPriceWithTax?.formattedValue\n                  }\n          }}\n        </div>\n      </div>\n\n      <form\n        [formGroup]=\"approvalForm\"\n        (ngSubmit)=\"submitDecision(orderApproval)\"\n        *ngIf=\"approvalFormVisible\"\n      >\n        <label\n          >{{\n            'orderApprovalDetails.form.comment_' + approvalDecision + '.label'\n              | cxTranslate\n          }}\n          <textarea\n            class=\"form-control\"\n            rows=\"3\"\n            formControlName=\"comment\"\n            maxlength=\"255\"\n          ></textarea>\n          <cx-form-errors\n            [control]=\"approvalForm.get('comment')\"\n          ></cx-form-errors>\n        </label>\n        <div class=\"form-group row\">\n          <div class=\"col-lg-6 col-md-12\">\n            <button\n              class=\"btn btn-block btn-secondary\"\n              (click)=\"cancelDecisionForm()\"\n              type=\"button\"\n            >\n              {{ 'orderApprovalDetails.form.cancel' | cxTranslate }}\n            </button>\n          </div>\n          <div class=\"col-lg-6 col-md-12\">\n            <button class=\"btn btn-block btn-primary\" type=\"submit\">\n              {{\n                'orderApprovalDetails.form.submit_' + approvalDecision\n                  | cxTranslate\n              }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </ng-container>\n    <ng-container *ngIf=\"!approvalFormVisible\">\n      <div class=\"form-group row\">\n        <div class=\"col-lg-4 col-md-12\">\n          <a\n            [routerLink]=\"{ cxRoute: 'orderApprovals' } | cxUrl\"\n            class=\"btn btn-block btn-secondary\"\n            >{{ 'orderApprovalDetails.back' | cxTranslate }}</a\n          >\n        </div>\n        <div\n          class=\"col-lg-4 col-md-12\"\n          *ngIf=\"orderApproval?.approvalDecisionRequired\"\n        >\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"displayDecisionForm(approvalDecisionValue.REJECT)\"\n          >\n            {{ 'orderApprovalDetails.showForm_REJECT' | cxTranslate }}\n          </button>\n        </div>\n        <div\n          class=\"col-lg-4 col-md-12\"\n          *ngIf=\"orderApproval?.approvalDecisionRequired\"\n        >\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"displayDecisionForm(approvalDecisionValue.APPROVE)\"\n          >\n            {{ 'orderApprovalDetails.showForm_APPROVE' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderApprovalDetailService }, { type: OrderApprovalService }, { type: i3.UntypedFormBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ApproverGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), map((user) => user === null || user === void 0 ? void 0 : user.roles), map((roles) => {
            const hasRole = Array.isArray(roles) &&
                (roles.includes(B2BUserRole.APPROVER) ||
                    roles.includes(B2BUserRole.ADMIN));
            if (!hasRole) {
                this.routingService.go({ cxRoute: 'home' });
                this.globalMessageService.add({
                    key: 'orderApprovalGlobal.notification.noSufficientPermissions',
                }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
ApproverGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApproverGuard, deps: [{ token: i1$2.UserAccountFacade }, { token: i1$1.RoutingService }, { token: i1$1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ApproverGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApproverGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApproverGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.UserAccountFacade }, { type: i1$1.RoutingService }, { type: i1$1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailPermissionResultsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailPermissionResultsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailPermissionResultsComponent, deps: [{ token: i1$3.OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailPermissionResultsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailPermissionResultsComponent, selector: "cx-order-detail-permission-results", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.permissionResults?.length\">\n    <div class=\"cx-approval-header\">\n      <div class=\"cx-approval-label\">\n        {{ 'orderApprovalDetails.permissionResults.header' | cxTranslate }}\n      </div>\n    </div>\n    <table class=\"table table-striped cx-approval-table\">\n      <thead class=\"cx-approval-thead-mobile\">\n        <th scope=\"col\">\n          {{\n            'orderApprovalDetails.permissionResults.permission' | cxTranslate\n          }}\n        </th>\n        <th scope=\"col\">\n          {{ 'orderApprovalDetails.permissionResults.approver' | cxTranslate }}\n        </th>\n        <th scope=\"col\">\n          {{ 'orderApprovalDetails.permissionResults.status' | cxTranslate }}\n        </th>\n        <th scope=\"col\">\n          {{\n            'orderApprovalDetails.permissionResults.approverComments'\n              | cxTranslate\n          }}\n        </th>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let permissionResult of order.permissionResults\">\n          <td class=\"cx-approval-permissionCode\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.permission'\n                  | cxTranslate\n              }}\n            </div>\n            {{\n              'orderApprovalDetails.permissionResults.permissionType_' +\n                permissionResult?.permissionType?.code | cxTranslate\n            }}\n          </td>\n          <td class=\"cx-approval-approverName\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.approver' | cxTranslate\n              }}\n            </div>\n            {{ permissionResult.approverName }}\n          </td>\n          <td class=\"cx-approval-statusDisplay\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.status' | cxTranslate\n              }}\n            </div>\n            {{ permissionResult.statusDisplay }}\n          </td>\n          <td class=\"cx-approval-approvalNotes\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.approverComments'\n                  | cxTranslate\n              }}\n            </div>\n            {{\n              permissionResult.approverNotes\n                ? permissionResult.approverNotes\n                : ('orderApprovalDetails.permissionResults.noApprovalComments'\n                  | cxTranslate)\n            }}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailPermissionResultsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-detail-permission-results', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.permissionResults?.length\">\n    <div class=\"cx-approval-header\">\n      <div class=\"cx-approval-label\">\n        {{ 'orderApprovalDetails.permissionResults.header' | cxTranslate }}\n      </div>\n    </div>\n    <table class=\"table table-striped cx-approval-table\">\n      <thead class=\"cx-approval-thead-mobile\">\n        <th scope=\"col\">\n          {{\n            'orderApprovalDetails.permissionResults.permission' | cxTranslate\n          }}\n        </th>\n        <th scope=\"col\">\n          {{ 'orderApprovalDetails.permissionResults.approver' | cxTranslate }}\n        </th>\n        <th scope=\"col\">\n          {{ 'orderApprovalDetails.permissionResults.status' | cxTranslate }}\n        </th>\n        <th scope=\"col\">\n          {{\n            'orderApprovalDetails.permissionResults.approverComments'\n              | cxTranslate\n          }}\n        </th>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let permissionResult of order.permissionResults\">\n          <td class=\"cx-approval-permissionCode\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.permission'\n                  | cxTranslate\n              }}\n            </div>\n            {{\n              'orderApprovalDetails.permissionResults.permissionType_' +\n                permissionResult?.permissionType?.code | cxTranslate\n            }}\n          </td>\n          <td class=\"cx-approval-approverName\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.approver' | cxTranslate\n              }}\n            </div>\n            {{ permissionResult.approverName }}\n          </td>\n          <td class=\"cx-approval-statusDisplay\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.status' | cxTranslate\n              }}\n            </div>\n            {{ permissionResult.statusDisplay }}\n          </td>\n          <td class=\"cx-approval-approvalNotes\">\n            <div class=\"cx-approval-table-label\">\n              {{\n                'orderApprovalDetails.permissionResults.approverComments'\n                  | cxTranslate\n              }}\n            </div>\n            {{\n              permissionResult.approverNotes\n                ? permissionResult.approverNotes\n                : ('orderApprovalDetails.permissionResults.noApprovalComments'\n                  | cxTranslate)\n            }}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$3.OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalDetailsModule {
}
OrderApprovalDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, declarations: [OrderApprovalDetailFormComponent,
        OrderDetailPermissionResultsComponent], imports: [ReactiveFormsModule,
        CommonModule,
        I18nModule,
        UrlModule,
        FormErrorsModule,
        SpinnerModule,
        RouterModule, i1$1.ConfigModule], exports: [OrderApprovalDetailFormComponent,
        OrderDetailPermissionResultsComponent] });
OrderApprovalDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, imports: [ReactiveFormsModule,
        CommonModule,
        I18nModule,
        UrlModule,
        FormErrorsModule,
        SpinnerModule,
        RouterModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderApprovalDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailApprovalDetailsComponent: {
                    component: OrderDetailPermissionResultsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                AccountOrderDetailsApprovalDetailsComponent: {
                    component: OrderDetailPermissionResultsComponent,
                },
                OrderApprovalDetailShippingComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailFormComponent: {
                    component: OrderApprovalDetailFormComponent,
                    guards: [AuthGuard, ApproverGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        FormErrorsModule,
                        SpinnerModule,
                        RouterModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderApprovalDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailApprovalDetailsComponent: {
                                    component: OrderDetailPermissionResultsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                AccountOrderDetailsApprovalDetailsComponent: {
                                    component: OrderDetailPermissionResultsComponent,
                                },
                                OrderApprovalDetailShippingComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailFormComponent: {
                                    component: OrderApprovalDetailFormComponent,
                                    guards: [AuthGuard, ApproverGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        OrderApprovalDetailFormComponent,
                        OrderDetailPermissionResultsComponent,
                    ],
                    exports: [
                        OrderApprovalDetailFormComponent,
                        OrderDetailPermissionResultsComponent,
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
class OrderApprovalListComponent {
    constructor(routing, orderApprovalService, translation) {
        this.routing = routing;
        this.orderApprovalService = orderApprovalService;
        this.translation = translation;
        this.PAGE_SIZE = 5;
    }
    ngOnInit() {
        this.fetchApprovalListPage({});
        this.sortLabels$ = combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.orderNumber'),
        ]).pipe(map(([textByDate, textByOrderNumber]) => {
            return {
                byDate: textByDate,
                byOrderNumber: textByOrderNumber,
            };
        }));
    }
    changeSortCode(sortCode) {
        const fetchParams = {
            sort: sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchApprovalListPage(fetchParams);
    }
    pageChange(page) {
        const fetchParams = {
            sort: this.sortType,
            currentPage: page,
        };
        this.fetchApprovalListPage(fetchParams);
    }
    fetchApprovalListPage(searchConfig) {
        searchConfig.pageSize = this.PAGE_SIZE;
        this.orderApprovalService.loadOrderApprovals(searchConfig);
        this.orderApprovals$ = this.orderApprovalService.getList(searchConfig);
    }
    goToApprovalDetails(event, orderApproval) {
        var _a;
        if (((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) !== 'a') {
            this.routing.go({
                cxRoute: 'orderApprovalDetails',
                params: { approvalCode: orderApproval.code },
            });
        }
    }
}
OrderApprovalListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListComponent, deps: [{ token: i1$1.RoutingService }, { token: OrderApprovalService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderApprovalListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderApprovalListComponent, selector: "cx-order-approval-list", ngImport: i0, template: "<ng-container *ngIf=\"orderApprovals$ | async as orderApprovals\">\n  <ng-container\n    *ngIf=\"\n      orderApprovals.pagination &&\n        orderApprovals.pagination.totalResults &&\n        orderApprovals.pagination.totalResults > 0;\n      else noOrder\n    \"\n  >\n    <!-- Select Form and Pagination Top -->\n    <div class=\"cx-order-approval-sort top row\">\n      <div\n        class=\"\n          cx-order-approval-form-group\n          form-group\n          col-sm-12 col-md-4 col-lg-4\n        \"\n      >\n        <label>\n          <span class=\"cx-visually-hidden\">{{\n            'orderHistory.sortOrders' | cxTranslate\n          }}</span>\n          <cx-sorting\n            [sortOptions]=\"orderApprovals.sorts\"\n            [sortLabels]=\"sortLabels$ | async\"\n            (sortListEvent)=\"changeSortCode($event)\"\n            [selectedOption]=\"orderApprovals.pagination.sort\"\n            [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n            ariaControls=\"order-approval-table\"\n          ></cx-sorting>\n        </label>\n      </div>\n      <div class=\"cx-order-approval-pagination\">\n        <cx-pagination\n          [pagination]=\"orderApprovals.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n    <!-- TABLE -->\n    <table\n      role=\"table\"\n      id=\"order-approval-table\"\n      class=\"table cx-order-approval-table\"\n    >\n      <caption class=\"cx-visually-hidden\">\n        {{\n          'orderApprovalList.orderApprovalList' | cxTranslate\n        }}\n      </caption>\n      <thead class=\"cx-order-approval-thead-mobile\">\n        <th scope=\"col\">\n          {{ 'orderApprovalList.orderCode' | cxTranslate }}\n        </th>\n        <th scope=\"col\">{{ 'orderApprovalList.POCode' | cxTranslate }}</th>\n        <th scope=\"col\">{{ 'orderApprovalList.placedBy' | cxTranslate }}</th>\n        <th scope=\"col\">{{ 'orderApprovalList.date' | cxTranslate }}</th>\n        <th scope=\"col\">\n          {{ 'orderApprovalList.status' | cxTranslate }}\n        </th>\n        <th scope=\"col\">{{ 'orderApprovalList.total' | cxTranslate }}</th>\n      </thead>\n      <tbody>\n        <tr\n          role=\"row\"\n          *ngFor=\"let approval of orderApprovals.values\"\n          (click)=\"goToApprovalDetails($event, approval)\"\n        >\n          <td role=\"cell\" class=\"cx-order-approval-code\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.orderCode' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{ approval.order?.code }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-po-code\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.POCode' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{\n                approval.order?.purchaseOrderNumber ||\n                  ('orderApprovalList.none' | cxTranslate)\n              }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-placed\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.placedBy' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{ approval.order?.orgCustomer?.name }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-date\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.date' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{ approval.order?.created | cxDate: 'longDate' }}</a\n            >\n          </td>\n\n          <td role=\"cell\" class=\"cx-order-approval-status\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.status' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{\n                'orderDetails.statusDisplay_' + approval.order?.statusDisplay\n                  | cxTranslate\n              }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-total\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.total' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{ approval.order?.totalPrice?.formattedValue }}</a\n            >\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <!-- Select Form and Pagination Bottom -->\n    <div class=\"cx-order-approval-sort bottom row\">\n      <div\n        class=\"\n          cx-order-approval-form-group\n          form-group\n          col-sm-12 col-md-4 col-lg-4\n        \"\n      >\n        <label>\n          <span class=\"cx-visually-hidden\">{{\n            'orderHistory.sortOrders' | cxTranslate\n          }}</span>\n          <cx-sorting\n            [sortOptions]=\"orderApprovals.sorts\"\n            [sortLabels]=\"sortLabels$ | async\"\n            (sortListEvent)=\"changeSortCode($event)\"\n            [selectedOption]=\"orderApprovals.pagination.sort\"\n            [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n            ariaControls=\"order-approval-table\"\n          ></cx-sorting>\n        </label>\n      </div>\n      <div class=\"cx-order-approval-pagination\">\n        <cx-pagination\n          [pagination]=\"orderApprovals.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- NO ORDER CONTAINER -->\n  <ng-template #noOrder>\n    <div class=\"cx-order-approval-no-order row\">\n      <div class=\"col-sm-12 col-md-6 col-lg-4\">\n        <div>{{ 'orderApprovalList.emptyList' | cxTranslate }}</div>\n      </div>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i5.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-approval-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"orderApprovals$ | async as orderApprovals\">\n  <ng-container\n    *ngIf=\"\n      orderApprovals.pagination &&\n        orderApprovals.pagination.totalResults &&\n        orderApprovals.pagination.totalResults > 0;\n      else noOrder\n    \"\n  >\n    <!-- Select Form and Pagination Top -->\n    <div class=\"cx-order-approval-sort top row\">\n      <div\n        class=\"\n          cx-order-approval-form-group\n          form-group\n          col-sm-12 col-md-4 col-lg-4\n        \"\n      >\n        <label>\n          <span class=\"cx-visually-hidden\">{{\n            'orderHistory.sortOrders' | cxTranslate\n          }}</span>\n          <cx-sorting\n            [sortOptions]=\"orderApprovals.sorts\"\n            [sortLabels]=\"sortLabels$ | async\"\n            (sortListEvent)=\"changeSortCode($event)\"\n            [selectedOption]=\"orderApprovals.pagination.sort\"\n            [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n            ariaControls=\"order-approval-table\"\n          ></cx-sorting>\n        </label>\n      </div>\n      <div class=\"cx-order-approval-pagination\">\n        <cx-pagination\n          [pagination]=\"orderApprovals.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n    <!-- TABLE -->\n    <table\n      role=\"table\"\n      id=\"order-approval-table\"\n      class=\"table cx-order-approval-table\"\n    >\n      <caption class=\"cx-visually-hidden\">\n        {{\n          'orderApprovalList.orderApprovalList' | cxTranslate\n        }}\n      </caption>\n      <thead class=\"cx-order-approval-thead-mobile\">\n        <th scope=\"col\">\n          {{ 'orderApprovalList.orderCode' | cxTranslate }}\n        </th>\n        <th scope=\"col\">{{ 'orderApprovalList.POCode' | cxTranslate }}</th>\n        <th scope=\"col\">{{ 'orderApprovalList.placedBy' | cxTranslate }}</th>\n        <th scope=\"col\">{{ 'orderApprovalList.date' | cxTranslate }}</th>\n        <th scope=\"col\">\n          {{ 'orderApprovalList.status' | cxTranslate }}\n        </th>\n        <th scope=\"col\">{{ 'orderApprovalList.total' | cxTranslate }}</th>\n      </thead>\n      <tbody>\n        <tr\n          role=\"row\"\n          *ngFor=\"let approval of orderApprovals.values\"\n          (click)=\"goToApprovalDetails($event, approval)\"\n        >\n          <td role=\"cell\" class=\"cx-order-approval-code\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.orderCode' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{ approval.order?.code }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-po-code\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.POCode' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{\n                approval.order?.purchaseOrderNumber ||\n                  ('orderApprovalList.none' | cxTranslate)\n              }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-placed\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.placedBy' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{ approval.order?.orgCustomer?.name }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-date\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.date' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n              >{{ approval.order?.created | cxDate: 'longDate' }}</a\n            >\n          </td>\n\n          <td role=\"cell\" class=\"cx-order-approval-status\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.status' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{\n                'orderDetails.statusDisplay_' + approval.order?.statusDisplay\n                  | cxTranslate\n              }}</a\n            >\n          </td>\n          <td role=\"cell\" class=\"cx-order-approval-total\">\n            <div class=\"d-md-none cx-order-approval-label\">\n              {{ 'orderApprovalList.total' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderApprovalDetails',\n                  params: { approvalCode: approval?.code }\n                } | cxUrl\n              \"\n              class=\"cx-order-approval-value\"\n            >\n              {{ approval.order?.totalPrice?.formattedValue }}</a\n            >\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <!-- Select Form and Pagination Bottom -->\n    <div class=\"cx-order-approval-sort bottom row\">\n      <div\n        class=\"\n          cx-order-approval-form-group\n          form-group\n          col-sm-12 col-md-4 col-lg-4\n        \"\n      >\n        <label>\n          <span class=\"cx-visually-hidden\">{{\n            'orderHistory.sortOrders' | cxTranslate\n          }}</span>\n          <cx-sorting\n            [sortOptions]=\"orderApprovals.sorts\"\n            [sortLabels]=\"sortLabels$ | async\"\n            (sortListEvent)=\"changeSortCode($event)\"\n            [selectedOption]=\"orderApprovals.pagination.sort\"\n            [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n            ariaControls=\"order-approval-table\"\n          ></cx-sorting>\n        </label>\n      </div>\n      <div class=\"cx-order-approval-pagination\">\n        <cx-pagination\n          [pagination]=\"orderApprovals.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n  </ng-container>\n\n  <!-- NO ORDER CONTAINER -->\n  <ng-template #noOrder>\n    <div class=\"cx-order-approval-no-order row\">\n      <div class=\"col-sm-12 col-md-6 col-lg-4\">\n        <div>{{ 'orderApprovalList.emptyList' | cxTranslate }}</div>\n      </div>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: OrderApprovalService }, { type: i1$1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalListModule {
}
OrderApprovalListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, declarations: [OrderApprovalListComponent], imports: [CommonModule, i1$1.ConfigModule, UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule], exports: [OrderApprovalListComponent] });
OrderApprovalListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, imports: [CommonModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderApprovalListComponent: {
                    component: OrderApprovalListComponent,
                    guards: [AuthGuard, ApproverGuard],
                },
            },
        }),
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderApprovalListComponent: {
                                    component: OrderApprovalListComponent,
                                    guards: [AuthGuard, ApproverGuard],
                                },
                            },
                        }),
                        UrlModule,
                        RouterModule,
                        ListNavigationModule,
                        I18nModule,
                    ],
                    declarations: [OrderApprovalListComponent],
                    exports: [OrderApprovalListComponent],
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
class OrderApprovalComponentsModule {
}
OrderApprovalComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalComponentsModule, imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule] });
OrderApprovalComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalComponentsModule, imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule],
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
class OrderApprovalAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, orderApprovalCode) {
        return this.adapter.load(userId, orderApprovalCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    makeDecision(userId, orderApprovalCode, orderApprovalDecision) {
        return this.adapter.makeDecision(userId, orderApprovalCode, orderApprovalDecision);
    }
}
OrderApprovalConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, deps: [{ token: OrderApprovalAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderApprovalAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_APPROVAL_NORMALIZER = new InjectionToken('OrderApprovalNormalizer');
const ORDER_APPROVALS_NORMALIZER = new InjectionToken('OrderApprovalsListNormalizer');
const ORDER_APPROVAL_DECISION_NORMALIZER = new InjectionToken('OrderApprovalDecisionNormalizer');

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

class OccOrderApprovalAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, orderApprovalCode) {
        return this.http
            .get(this.getOrderApprovalEndpoint(userId, orderApprovalCode))
            .pipe(this.converter.pipeable(ORDER_APPROVAL_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getOrderApprovalsEndpoint(userId, params))
            .pipe(this.converter.pipeable(ORDER_APPROVALS_NORMALIZER));
    }
    makeDecision(userId, orderApprovalCode, orderApprovalDecision) {
        return this.http
            .post(this.getOrderApprovalDecisionEndpoint(userId, orderApprovalCode), orderApprovalDecision)
            .pipe(this.converter.pipeable(ORDER_APPROVAL_DECISION_NORMALIZER));
    }
    getOrderApprovalEndpoint(userId, orderApprovalCode) {
        return this.occEndpoints.buildUrl('orderApproval', {
            urlParams: {
                userId,
                orderApprovalCode,
            },
        });
    }
    getOrderApprovalsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('orderApprovals', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getOrderApprovalDecisionEndpoint(userId, orderApprovalCode) {
        return this.occEndpoints.buildUrl('orderApprovalDecision', {
            urlParams: {
                userId,
                orderApprovalCode,
            },
        });
    }
}
OccOrderApprovalAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter, deps: [{ token: i1$4.HttpClient }, { token: i1$1.OccEndpointsService }, { token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$4.HttpClient }, { type: i1$1.OccEndpointsService }, { type: i1$1.ConverterService }]; } });

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
class OccOrderApprovalDecisionNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        return target;
    }
}
OccOrderApprovalDecisionNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalDecisionNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalDecisionNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalDecisionNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalDecisionNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrderApprovalListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        var _a, _b;
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        target.values =
            (_b = (_a = source.orderApprovals) === null || _a === void 0 ? void 0 : _a.map((orderApproval) => (Object.assign({}, this.converter.convert(orderApproval, ORDER_APPROVAL_NORMALIZER))))) !== null && _b !== void 0 ? _b : [];
        return target;
    }
}
OccOrderApprovalListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, deps: [{ token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrderApprovalNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        if (source.order) {
            target.order = this.converter.convert(source.order, ORDER_NORMALIZER);
        }
        return target;
    }
}
OccOrderApprovalNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalNormalizer, deps: [{ token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ConverterService }]; } });

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
const defaultOccOrderApprovalConfig = {
    backend: {
        occ: {
            endpoints: {
                orderApprovals: '/users/${userId}/orderapprovals',
                orderApproval: '/users/${userId}/orderapprovals/${orderApprovalCode}?fields=FULL',
                orderApprovalDecision: '/users/${userId}/orderapprovals/${orderApprovalCode}/decision',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalOccModule {
}
OrderApprovalOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, imports: [CommonModule] });
OrderApprovalOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, providers: [
        provideDefaultConfig(defaultOccOrderApprovalConfig),
        {
            provide: OrderApprovalAdapter,
            useClass: OccOrderApprovalAdapter,
        },
        {
            provide: ORDER_APPROVAL_NORMALIZER,
            useExisting: OccOrderApprovalNormalizer,
            multi: true,
        },
        {
            provide: ORDER_APPROVALS_NORMALIZER,
            useExisting: OccOrderApprovalListNormalizer,
            multi: true,
        },
        {
            provide: ORDER_APPROVAL_DECISION_NORMALIZER,
            useExisting: OccOrderApprovalDecisionNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrderApprovalConfig),
                        {
                            provide: OrderApprovalAdapter,
                            useClass: OccOrderApprovalAdapter,
                        },
                        {
                            provide: ORDER_APPROVAL_NORMALIZER,
                            useExisting: OccOrderApprovalNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_APPROVALS_NORMALIZER,
                            useExisting: OccOrderApprovalListNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_APPROVAL_DECISION_NORMALIZER,
                            useExisting: OccOrderApprovalDecisionNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class OrderApprovalEffects {
    constructor(actions$, orderApprovalConnector) {
        this.actions$ = actions$;
        this.orderApprovalConnector = orderApprovalConnector;
        this.logger = inject(LoggerService);
        this.loadOrderApproval$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_APPROVAL), map((action) => action.payload), filter((payload) => payload.userId !== OCC_USER_ID_ANONYMOUS), switchMap(({ userId, orderApprovalCode }) => {
            return this.orderApprovalConnector.get(userId, orderApprovalCode).pipe(map((orderApproval) => {
                return new LoadOrderApprovalSuccess([
                    orderApproval,
                ]);
            }), catchError((error) => of(new LoadOrderApprovalFail({
                orderApprovalCode,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
        this.loadOrderApprovals$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_APPROVALS), map((action) => action.payload), filter((payload) => payload.userId !== OCC_USER_ID_ANONYMOUS), switchMap(({ userId, params }) => this.orderApprovalConnector.getList(userId, params).pipe(switchMap((orderApprovals) => {
            const { values, page } = StateUtils.normalizeListPage(orderApprovals, 'code');
            return [
                new LoadOrderApprovalSuccess(values),
                new LoadOrderApprovalsSuccess({
                    page,
                    params,
                }),
            ];
        }), catchError((error) => of(new LoadOrderApprovalsFail({
            params: params,
            error: normalizeHttpError(error, this.logger),
        })))))));
        this.makeDecision$ = createEffect(() => this.actions$.pipe(ofType(MAKE_DECISION), map((action) => action.payload), filter((payload) => payload.userId !== OCC_USER_ID_ANONYMOUS), switchMap(({ userId, orderApprovalCode, orderApprovalDecision }) => this.orderApprovalConnector
            .makeDecision(userId, orderApprovalCode, orderApprovalDecision)
            .pipe(switchMap((orderApprovalDecisionData) => [
            new MakeDecisionSuccess({
                orderApprovalCode,
                orderApprovalDecision: orderApprovalDecisionData,
            }),
            new LoadOrderApproval({
                userId,
                orderApprovalCode,
            }),
        ]), catchError((error) => of(new MakeDecisionFail({
            orderApprovalCode: orderApprovalCode,
            error: normalizeHttpError(error, this.logger),
        })))))));
    }
}
OrderApprovalEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalEffects, deps: [{ token: i1$5.Actions }, { token: OrderApprovalConnector }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$5.Actions }, { type: OrderApprovalConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [OrderApprovalEffects];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const orderApprovalInitialState = undefined;
const orderApprovalsInitialState = undefined;
function orderApprovalsEntitiesReducer(state = orderApprovalInitialState, action) {
    switch (action.type) {
        case LOAD_ORDER_APPROVAL_SUCCESS:
            return action.payload;
        case MAKE_DECISION_SUCCESS:
            return state;
    }
    return state;
}
function orderApprovalsListReducer(state = orderApprovalsInitialState, action) {
    switch (action.type) {
        case LOAD_ORDER_APPROVALS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        [ORDER_APPROVAL_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(ORDER_APPROVAL_ENTITIES, orderApprovalsEntitiesReducer),
            list: StateUtils.entityLoaderReducer(ORDER_APPROVAL_LIST, orderApprovalsListReducer),
        }),
    };
}
const reducerToken = new InjectionToken('OrganizationReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
function clearOrganizationState(reducer) {
    return function (state, action) {
        if (action.type === AuthActions.LOGOUT) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
const metaReducers = [clearOrganizationState];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalStoreModule {
}
OrderApprovalStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalStoreModule, imports: [i1.StoreFeatureModule, i1$5.EffectsFeatureModule] });
OrderApprovalStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalStoreModule, providers: [reducerProvider], imports: [StoreModule.forFeature(ORDER_APPROVAL_FEATURE, reducerToken, {
            metaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(ORDER_APPROVAL_FEATURE, reducerToken, {
                            metaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalCoreModule {
    static forRoot() {
        return {
            ngModule: OrderApprovalCoreModule,
            providers: [OrderApprovalConnector],
        };
    }
}
OrderApprovalCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, imports: [OrderApprovalStoreModule] });
OrderApprovalCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, imports: [OrderApprovalStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderApprovalStoreModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderApprovalModule {
}
OrderApprovalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, imports: [OrderApprovalCoreModule, OrderApprovalOccModule,
        OrderApprovalComponentsModule] });
OrderApprovalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, imports: [OrderApprovalCoreModule.forRoot(),
        OrderApprovalOccModule,
        OrderApprovalComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderApprovalCoreModule.forRoot(),
                        OrderApprovalOccModule,
                        OrderApprovalComponentsModule,
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

export { ApproverGuard, ORDER_APPROVALS_NORMALIZER, ORDER_APPROVAL_DECISION_NORMALIZER, ORDER_APPROVAL_ENTITIES, ORDER_APPROVAL_FEATURE, ORDER_APPROVAL_LIST, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID, ORDER_APPROVAL_NORMALIZER, OccOrderApprovalAdapter, OccOrderApprovalDecisionNormalizer, OccOrderApprovalListNormalizer, OccOrderApprovalNormalizer, orderApproval_action as OrderApprovalActions, OrderApprovalAdapter, OrderApprovalComponentsModule, OrderApprovalConnector, OrderApprovalDecisionValue, OrderApprovalDetailFormComponent, OrderApprovalDetailService, OrderApprovalDetailsModule, OrderApprovalListComponent, OrderApprovalListModule, OrderApprovalModule, OrderApprovalOccModule, orderApproval_selector as OrderApprovalSelectors, OrderApprovalService, OrderDetailPermissionResultsComponent };
//# sourceMappingURL=spartacus-organization-order-approval.mjs.map
