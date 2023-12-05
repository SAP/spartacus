/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { EMPTY } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../item.service";
import * as i2 from "../message/services/message.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/router";
import * as i6 from "../card/card.component";
import * as i7 from "../item-active.directive";
import * as i8 from "@spartacus/storefront";
import * as i9 from "@spartacus/core";
const DISABLED_STATUS = 'DISABLED';
/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
export class FormComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.animateBack = true;
        this.form$ = this.itemService.current$.pipe(map((item) => {
            this.setI18nRoot(item);
            if (!item) {
                // we trick the form builder...
                item = {};
            }
            return this.itemService.getForm(item);
        }));
        /**
         * To handle the case of receiving a negative response during creation an item
         */
        this.disabled$ = this.form$.pipe(switchMap((form) => form?.statusChanges ?? EMPTY), map((status) => status === DISABLED_STATUS));
    }
    save(form) {
        this.itemService.key$
            .pipe(first(), switchMap((key) => this.itemService.save(form, key).pipe(take(1), map((data) => ({
            item: data.item,
            status: data.status,
            action: key ? 'update' : 'create',
        })))))
            .subscribe(({ item, action, status }) => {
            if (status === LoadStatus.SUCCESS) {
                this.itemService.launchDetails(item);
                this.notify(item, action);
            }
            form.enable();
        });
    }
    notify(item, action) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.${action}`,
                params: {
                    item,
                },
            },
        });
    }
    setI18nRoot(item) {
        // concatenate the i18n root with .edit or .create suffix
        this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
    }
    back(event, card) {
        if (this.animateBack) {
            card.closeView(event);
        }
    }
    ngOnInit() {
        this.itemService.setEditMode(true);
    }
    ngOnDestroy() {
        this.itemService.setEditMode(false);
    }
}
FormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormComponent, deps: [{ token: i1.ItemService }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Component });
FormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FormComponent, selector: "cx-org-form", inputs: { i18nRoot: "i18nRoot", animateBack: "animateBack", subtitle: "subtitle" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i7.ItemActiveDirective, selector: "[cxOrgItemActive]" }, { kind: "directive", type: i8.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i9.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], animateBack: [{
                type: Input
            }], subtitle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm0vZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFLN0QsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBRW5DOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxhQUFhO0lBbUN4QixZQUNZLFdBQTJCLEVBQzNCLGNBQThCO1FBRDlCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUE5QmpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBUTVCLFVBQUssR0FBd0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN6RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCwrQkFBK0I7Z0JBQy9CLElB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c291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMb2FkU3RhdHVzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QsIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FyZENvbXBvbmVudCB9IGZyb20gJy4uL2NhcmQvY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9tZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbmNvbnN0IERJU0FCTEVEX1NUQVRVUyA9ICdESVNBQkxFRCc7XG5cbi8qKlxuICogUmV1c2FibGUgY29tcG9uZW50IGZvciBjcmVhdGluZyBhbmQgZWRpdGluZyBvcmdhbml6YXRpb24gaXRlbXMuIFRoZSBjb21wb25lbnQgZG9lcyBub3RcbiAqIGtub3cgYW55dGhpbmcgYWJvdXQgZm9ybSBzcGVjaWZpYy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JnLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogaTE4biByb290IGZvciBhbGwgbG9jYWxpemF0aW9ucy4gVGhlIGkxOG4gcm9vdCBrZXkgaXMgc3VmZml4ZWQgd2l0aFxuICAgKiBlaXRoZXIgYC5lZGl0YCBvciBgLmNyZWF0ZWAsIGRlcGVuZGluZyBvbiB0aGUgdXNhZ2Ugb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGkxOG5Sb290OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgYW5pbWF0ZUJhY2sgPSB0cnVlO1xuICBASW5wdXQoKSBzdWJ0aXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogaTE4biBrZXkgZm9yIHRoZSBsb2NhbGl6YXRpb25zLlxuICAgKi9cbiAgaTE4bjogc3RyaW5nO1xuXG4gIGZvcm0kOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPiA9IHRoaXMuaXRlbVNlcnZpY2UuY3VycmVudCQucGlwZShcbiAgICBtYXAoKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuc2V0STE4blJvb3QoaXRlbSk7XG5cbiAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAvLyB3ZSB0cmljayB0aGUgZm9ybSBidWlsZGVyLi4uXG4gICAgICAgIGl0ZW0gPSB7fSBhcyBhbnk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5pdGVtU2VydmljZS5nZXRGb3JtKGl0ZW0pO1xuICAgIH0pXG4gICk7XG5cbiAgLyoqXG4gICAqIFRvIGhhbmRsZSB0aGUgY2FzZSBvZiByZWNlaXZpbmcgYSBuZWdhdGl2ZSByZXNwb25zZSBkdXJpbmcgY3JlYXRpb24gYW4gaXRlbVxuICAgKi9cbiAgZGlzYWJsZWQkID0gdGhpcy5mb3JtJC5waXBlKFxuICAgIHN3aXRjaE1hcCgoZm9ybSkgPT4gZm9ybT8uc3RhdHVzQ2hhbmdlcyA/PyBFTVBUWSksXG4gICAgbWFwKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gRElTQUJMRURfU1RBVFVTKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8VD4sXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgc2F2ZShmb3JtOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtU2VydmljZS5rZXkkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgc3dpdGNoTWFwKChrZXkpID0+XG4gICAgICAgICAgdGhpcy5pdGVtU2VydmljZS5zYXZlKGZvcm0sIGtleSkucGlwZShcbiAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICBtYXAoKGRhdGEpID0+ICh7XG4gICAgICAgICAgICAgIGl0ZW06IGRhdGEuaXRlbSxcbiAgICAgICAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICAgYWN0aW9uOiBrZXkgPyAndXBkYXRlJyA6ICdjcmVhdGUnLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh7IGl0ZW0sIGFjdGlvbiwgc3RhdHVzIH0pID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gTG9hZFN0YXR1cy5TVUNDRVNTKSB7XG4gICAgICAgICAgdGhpcy5pdGVtU2VydmljZS5sYXVuY2hEZXRhaWxzKGl0ZW0pO1xuICAgICAgICAgIHRoaXMubm90aWZ5KGl0ZW0sIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybS5lbmFibGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5vdGlmeShpdGVtOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkKHtcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAga2V5OiBgJHt0aGlzLmkxOG5Sb290fS5tZXNzYWdlcy4ke2FjdGlvbn1gLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBpdGVtLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRJMThuUm9vdChpdGVtPzogVCk6IHZvaWQge1xuICAgIC8vIGNvbmNhdGVuYXRlIHRoZSBpMThuIHJvb3Qgd2l0aCAuZWRpdCBvciAuY3JlYXRlIHN1ZmZpeFxuICAgIHRoaXMuaTE4biA9IHRoaXMuaTE4blJvb3QgKyAoaXRlbSA/ICcuZWRpdCcgOiAnLmNyZWF0ZScpO1xuICB9XG5cbiAgYmFjayhldmVudDogTW91c2VFdmVudCwgY2FyZDogQ2FyZENvbXBvbmVudDxhbnk+KSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0ZUJhY2spIHtcbiAgICAgIGNhcmQuY2xvc2VWaWV3KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLml0ZW1TZXJ2aWNlLnNldEVkaXRNb2RlKHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pdGVtU2VydmljZS5zZXRFZGl0TW9kZShmYWxzZSk7XG4gIH1cbn1cbiIsIjxmb3JtICpuZ0lmPVwiZm9ybSQgfCBhc3luYyBhcyBmb3JtXCIgKHN1Ym1pdCk9XCJzYXZlKGZvcm0pXCI+XG4gIDxjeC1vcmctY2FyZFxuICAgICNjYXJkXG4gICAgW3ByZXZpb3VzXT1cImZhbHNlXCJcbiAgICBbaTE4blJvb3RdPVwiaTE4blwiXG4gICAgY3hPcmdJdGVtQWN0aXZlXG4gICAgW3N1YnRpdGxlXT1cInN1YnRpdGxlXCJcbiAgICBbY3hGb2N1c109XCJ7IGF1dG9mb2N1czogJ2lucHV0JywgcmVmcmVzaEZvY3VzOiBmb3JtIH1cIlxuICA+XG4gICAgPGJ1dHRvblxuICAgICAgYWN0aW9uc1xuICAgICAgY2xhc3M9XCJidXR0b24gcHJpbWFyeVwiXG4gICAgICBbZGlzYWJsZWRdPVwiZm9ybS5kaXNhYmxlZCB8fCAoZGlzYWJsZWQkIHwgYXN5bmMpXCJcbiAgICA+XG4gICAgICB7eyAnb3JnYW5pemF0aW9uLnNhdmUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cIi4uL1wiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgIDwhLS1cbiAgICAgICAgV2UgbGV2ZXJhZ2UgdGhlIHNvZnQtY2xvc2UgZmVhdHVyZSBmcm9tIHRoZSBzcGxpdCB2aWV3LCBzbyB0aGF0IHRoZSBhbmltYXRpb25cbiAgICAgICAgaGFzIHRpbWUgdG8ga2ljayBpbiBiZWZvcmUgdGhlIHJvdXRlciBvdXRsZXQgaXMgZGVsZXRlZC5cbiAgICAgICAtLT5cbiAgICAgIDxzcGFuIChjbGljayk9XCJiYWNrKCRldmVudCwgY2FyZClcIj57e1xuICAgICAgICAnb3JnYW5pemF0aW9uLmNhbmNlbCcgfCBjeFRyYW5zbGF0ZVxuICAgICAgfX08L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICA8c2VjdGlvbiBtYWluIGNsYXNzPVwiZGV0YWlsc1wiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21haW5dXCIgbmdQcm9qZWN0QXM9XCJbbWFpbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9zZWN0aW9uPlxuICA8L2N4LW9yZy1jYXJkPlxuPC9mb3JtPlxuIl19