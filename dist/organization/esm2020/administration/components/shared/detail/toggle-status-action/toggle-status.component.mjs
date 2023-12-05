/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Subscription } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { ConfirmationMessageComponent } from '../../message/confirmation/confirmation-message.component';
import * as i0 from "@angular/core";
import * as i1 from "../../item.service";
import * as i2 from "../../message/services/message.service";
import * as i3 from "../disable-info/disable-info.service";
import * as i4 from "@angular/common";
import * as i5 from "@spartacus/core";
/**
 * Reusable component in the my-company is to toggle the disabled state for
 * my company entities.
 */
export class ToggleStatusComponent {
    constructor(itemService, messageService, disableInfoService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.disableInfoService = disableInfoService;
        /**
         * The key input can be used to add a custom key.
         *
         * Most _organization_ entities use the `code` key, but there is some variations.
         */
        this.key = 'code';
        /**
         * resolves the current item.
         */
        this.current$ = this.itemService.current$;
        /**
         * resolves if the user is currently in the edit form.
         */
        this.isInEditMode$ = this.itemService.isInEditMode$;
        this.subscription = new Subscription();
    }
    toggle(item) {
        if (!item.active) {
            // we do ask for confirmation when the entity gets activated
            this.update(item);
        }
        else {
            if (!this.confirmation) {
                this.confirmation = this.messageService.add({
                    message: {
                        key: this.i18nRoot + '.messages.deactivate',
                        params: { item },
                    },
                    messageTitle: {
                        key: this.i18nRoot + '.messages.deactivateTitle',
                        params: { item },
                    },
                    confirm: {
                        key: 'organization.confirmation.disable',
                    },
                    component: ConfirmationMessageComponent,
                });
                this.subscription.add(this.confirmation.pipe(first()).subscribe((event) => {
                    if (event.close) {
                        this.confirmation = null;
                    }
                    if (event.confirm) {
                        this.messageService.close(this.confirmation);
                        this.update(item);
                        this.confirmation = null;
                    }
                }));
            }
        }
    }
    /**
     * Indicates whether the status can be toggled or not.
     */
    isDisabled(item) {
        return (this.disabled ??
            (this.disableInfoService.isParentDisabled(item) ||
                this.disableInfoService.isRootUnit(item)));
    }
    update(item) {
        this.itemService
            .update(item[this.key], this.getPatchedItem(item))
            .pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify({ ...item, ...data.item }));
    }
    getPatchedItem(item) {
        const patch = {};
        Object.assign(patch, { [this.key]: item[this.key] });
        patch.active = !item.active;
        return patch;
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.${item.active ? 'confirmEnabled' : 'confirmDisabled'}`,
                params: { item },
            },
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
ToggleStatusComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusComponent, deps: [{ token: i1.ItemService }, { token: i2.MessageService }, { token: i3.DisableInfoService }], target: i0.ɵɵFactoryTarget.Component });
ToggleStatusComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: { i18nRoot: "i18nRoot", key: "key", disabled: "disabled" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"\n    isDisabled(item) ||\n    ((isInEditMode$ | async) && item.active && disabled !== true)\n  \"\n  (click)=\"toggle(item)\"\n>\n  {{ 'organization.' + (item.active ? 'disable' : 'enable') | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-toggle-status', host: { class: 'content-wrapper' }, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"\n    isDisabled(item) ||\n    ((isInEditMode$ | async) && item.active && disabled !== true)\n  \"\n  (click)=\"toggle(item)\"\n>\n  {{ 'organization.' + (item.active ? 'disable' : 'enable') | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }, { type: i3.DisableInfoService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], key: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2RldGFpbC90b2dnbGUtc3RhdHVzLWFjdGlvbi90b2dnbGUtc3RhdHVzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvZGV0YWlsL3RvZ2dsZS1zdGF0dXMtYWN0aW9uL3RvZ2dsZS1zdGF0dXMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQXVCLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQzs7Ozs7OztBQU16Rzs7O0dBR0c7QUFNSCxNQUFNLE9BQU8scUJBQXFCO0lBa0NoQyxZQUNZLFdBQTJCLEVBQzNCLGNBQXVELEVBQ3ZELGtCQUF5QztRQUZ6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0IsbUJBQWMsR0FBZCxjQUFjLENBQXlDO1FBQ3ZELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUE1QnJEOzs7O1dBSUc7UUFDTSxRQUFHLEdBQUcsTUFBTSxDQUFDO1FBT3RCOztXQUVHO1FBQ0gsYUFBUSxHQUE4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFB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SSxDQUFDLE1BQU0sQ0FBQztRQUM1QixPQUFPLEtBQVUsQ0FBQztJQUNwQixDQUFDO0lBRVMsTUFBTSxDQUFDLElBQU87UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLGFBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxpQkFDbkMsRUFBRTtnQkFDRixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUU7YUFDakI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7a0hBM0hVLHFCQUFxQjtzR0FBckIscUJBQXFCLDZLQzFCbEMsdVRBV0E7MkZEZWEscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLHNCQUFzQixRQUUxQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtnS0FTekIsUUFBUTtzQkFBaEIsS0FBSztnQkFPRyxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9hZFN0YXR1cyB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21lc3NhZ2UvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25NZXNzYWdlRGF0YSB9IGZyb20gJy4uLy4uL21lc3NhZ2UvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWVzc2FnZS9zZXJ2aWNlcy9tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZUl0ZW0gfSBmcm9tICcuLi8uLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRGlzYWJsZUluZm9TZXJ2aWNlIH0gZnJvbSAnLi4vZGlzYWJsZS1pbmZvL2Rpc2FibGUtaW5mby5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXVzYWJsZSBjb21wb25lbnQgaW4gdGhlIG15LWNvbXBhbnkgaXMgdG8gdG9nZ2xlIHRoZSBkaXNhYmxlZCBzdGF0ZSBmb3JcbiAqIG15IGNvbXBhbnkgZW50aXRpZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy10b2dnbGUtc3RhdHVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RvZ2dsZS1zdGF0dXMuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVTdGF0dXNDb21wb25lbnQ8VCBleHRlbmRzIEJhc2VJdGVtPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbG9jYWxpemF0aW9uIG9mIG1lc3NhZ2VzIGlzIGJhc2VkIG9uIHRoZSBpMThuIHJvb3QuIE1lc3NhZ2VzIGFyZVxuICAgKiBjb25jYXRlbmF0ZWQgdG8gdGhlIHJvb3QsIHN1Y2ggYXM6XG4gICAqXG4gICAqIGBbaTE4blJvb3RdLm1lc3NhZ2VzLmRlYWN0aXZhdGVgXG4gICAqL1xuICBASW5wdXQoKSBpMThuUm9vdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUga2V5IGlucHV0IGNhbiBiZSB1c2VkIHRvIGFkZCBhIGN1c3RvbSBrZXkuXG4gICAqXG4gICAqIE1vc3QgX29yZ2FuaXphdGlvbl8gZW50aXRpZXMgdXNlIHRoZSBgY29kZWAga2V5LCBidXQgdGhlcmUgaXMgc29tZSB2YXJpYXRpb25zLlxuICAgKi9cbiAgQElucHV0KCkga2V5ID0gJ2NvZGUnO1xuXG4gIC8qKlxuICAgKiBUaGUgZGlzYWJsZWQgc3RhdGUgaXMgY2FsY3VsYXRlZCBidXQgY2FuIGJlIHByb3ZpZGVkIGFzIHdlbGwuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogcmVzb2x2ZXMgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICovXG4gIGN1cnJlbnQkOiBPYnNlcnZhYmxlPFQgfCB1bmRlZmluZWQ+ID0gdGhpcy5pdGVtU2VydmljZS5jdXJyZW50JDtcblxuICAvKipcbiAgICogcmVzb2x2ZXMgaWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGluIHRoZSBlZGl0IGZvcm0uXG4gICAqL1xuICBpc0luRWRpdE1vZGUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5pdGVtU2VydmljZS5pc0luRWRpdE1vZGUkO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCBjb25maXJtYXRpb246IFN1YmplY3Q8Q29uZmlybWF0aW9uTWVzc2FnZURhdGE+IHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlPFQ+LFxuICAgIHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2U8Q29uZmlybWF0aW9uTWVzc2FnZURhdGE+LFxuICAgIHByb3RlY3RlZCBkaXNhYmxlSW5mb1NlcnZpY2U6IERpc2FibGVJbmZvU2VydmljZTxUPlxuICApIHt9XG5cbiAgdG9nZ2xlKGl0ZW06IFQpIHtcbiAgICBpZiAoIWl0ZW0uYWN0aXZlKSB7XG4gICAgICAvLyB3ZSBkbyBhc2sgZm9yIGNvbmZpcm1hdGlvbiB3aGVuIHRoZSBlbnRpdHkgZ2V0cyBhY3RpdmF0ZWRcbiAgICAgIHRoaXMudXBkYXRlKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY29uZmlybWF0aW9uKSB7XG4gICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gdGhpcy5tZXNzYWdlU2VydmljZS5hZGQoe1xuICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGtleTogdGhpcy5pMThuUm9vdCArICcubWVzc2FnZXMuZGVhY3RpdmF0ZScsXG4gICAgICAgICAgICBwYXJhbXM6IHsgaXRlbSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWVzc2FnZVRpdGxlOiB7XG4gICAgICAgICAgICBrZXk6IHRoaXMuaTE4blJvb3QgKyAnLm1lc3NhZ2VzLmRlYWN0aXZhdGVUaXRsZScsXG4gICAgICAgICAgICBwYXJhbXM6IHsgaXRlbSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlybToge1xuICAgICAgICAgICAga2V5OiAnb3JnYW5pemF0aW9uLmNvbmZpcm1hdGlvbi5kaXNhYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlybWF0aW9uTWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNsb3NlKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuY2xvc2UodGhpcy5jb25maXJtYXRpb24pO1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShpdGVtKTtcbiAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzdGF0dXMgY2FuIGJlIHRvZ2dsZWQgb3Igbm90LlxuICAgKi9cbiAgaXNEaXNhYmxlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZGlzYWJsZWQgPz9cbiAgICAgICh0aGlzLmRpc2FibGVJbmZvU2VydmljZS5pc1BhcmVudERpc2FibGVkKGl0ZW0pIHx8XG4gICAgICAgIHRoaXMuZGlzYWJsZUluZm9TZXJ2aWNlLmlzUm9vdFVuaXQoaXRlbSkpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGUoaXRlbTogVCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbVNlcnZpY2VcbiAgICAgIC51cGRhdGUoXG4gICAgICAgIGl0ZW1bdGhpcy5rZXkgYXMga2V5b2YgQmFzZUl0ZW1dIGFzIHN0cmluZyxcbiAgICAgICAgdGhpcy5nZXRQYXRjaGVkSXRlbShpdGVtKVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIGZpbHRlcigoZGF0YSkgPT4gZGF0YS5zdGF0dXMgPT09IExvYWRTdGF0dXMuU1VDQ0VTUylcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMubm90aWZ5KHsgLi4uaXRlbSwgLi4uZGF0YS5pdGVtIH0pKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXRjaGVkSXRlbShpdGVtOiBUKTogVCB7XG4gICAgY29uc3QgcGF0Y2g6IEJhc2VJdGVtID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKHBhdGNoLCB7IFt0aGlzLmtleV06IGl0ZW1bdGhpcy5rZXkgYXMga2V5b2YgVF0gfSk7XG5cbiAgICBwYXRjaC5hY3RpdmUgPSAhaXRlbS5hY3RpdmU7XG4gICAgcmV0dXJuIHBhdGNoIGFzIFQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm90aWZ5KGl0ZW06IFQpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7XG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgIGtleTogYCR7dGhpcy5pMThuUm9vdH0ubWVzc2FnZXMuJHtcbiAgICAgICAgICBpdGVtLmFjdGl2ZSA/ICdjb25maXJtRW5hYmxlZCcgOiAnY29uZmlybURpc2FibGVkJ1xuICAgICAgICB9YCxcbiAgICAgICAgcGFyYW1zOiB7IGl0ZW0gfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICAqbmdJZj1cImN1cnJlbnQkIHwgYXN5bmMgYXMgaXRlbVwiXG4gIGNsYXNzPVwiYnV0dG9uIGFjdGl2ZVwiXG4gIFtkaXNhYmxlZF09XCJcbiAgICBpc0Rpc2FibGVkKGl0ZW0pIHx8XG4gICAgKChpc0luRWRpdE1vZGUkIHwgYXN5bmMpICYmIGl0ZW0uYWN0aXZlICYmIGRpc2FibGVkICE9PSB0cnVlKVxuICBcIlxuICAoY2xpY2spPVwidG9nZ2xlKGl0ZW0pXCJcbj5cbiAge3sgJ29yZ2FuaXphdGlvbi4nICsgKGl0ZW0uYWN0aXZlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZScpIHwgY3hUcmFuc2xhdGUgfX1cbjwvYnV0dG9uPlxuIl19