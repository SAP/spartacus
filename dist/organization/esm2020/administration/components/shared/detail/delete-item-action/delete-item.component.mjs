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
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
/**
 * Reusable component in the my-company is to delete an item (if it's possible)
 */
export class DeleteItemComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
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
    delete(item) {
        if (!this.confirmation) {
            this.confirmation = this.messageService.add({
                message: {
                    key: this.i18nRoot + '.messages.delete',
                    params: { item },
                },
                messageTitle: {
                    key: this.i18nRoot + '.messages.deleteTitle',
                    params: { item },
                },
                component: ConfirmationMessageComponent,
            });
            this.subscription.add(this.confirmation.pipe(first()).subscribe((event) => {
                if (event.close) {
                    this.confirmation = null;
                }
                if (event.confirm) {
                    this.messageService.close(this.confirmation);
                    this.confirmDelete(item);
                    this.confirmation = null;
                }
            }));
        }
    }
    confirmDelete(item) {
        this.itemService
            .delete?.(item[this.key], this.additionalParam)
            .pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify({ ...item, ...data.item }));
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.deleted`,
                params: { item },
            },
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
DeleteItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemComponent, deps: [{ token: i1.ItemService }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Component });
DeleteItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DeleteItemComponent, selector: "cx-org-delete-item", inputs: { i18nRoot: "i18nRoot", key: "key", additionalParam: "additionalParam" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"isInEditMode$ | async\"\n  (click)=\"delete(item)\"\n>\n  {{ 'organization.delete' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-delete-item', host: { class: 'content-wrapper' }, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"isInEditMode$ | async\"\n  (click)=\"delete(item)\"\n>\n  {{ 'organization.delete' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], key: [{
                type: Input
            }], additionalParam: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9kZXRhaWwvZGVsZXRlLWl0ZW0tYWN0aW9uL2RlbGV0ZS1pdGVtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvZGV0YWlsL2RlbGV0ZS1pdGVtLWFjdGlvbi9kZWxldGUtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sRUFBdUIsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDOzs7Ozs7QUFLekc7O0dBRUc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBbUM5QixZQUNZLFdBQTJCLEVBQzNCLGNBQXVEO1FBRHZELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBeUM7UUE1Qm5FOzs7O1dBSUc7UUFDTSxRQUFHLEdBQUcsTUFBTSxDQUFDO1FBUXRCOztXQUVHO1FBQ0gsYUFBUSxHQUE4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUVoRTs7V0FFRztRQUNILGtCQUFhLEdBQXdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBRTFELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU16QyxDQUFDO0lBRUosTUFBTSxDQUFDLElBQU87UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUMxQyxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQWtCO29CQUN2QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUU7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUI7b0JBQzVDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRTtpQkFDakI7Z0JBQ0QsU0FBUyxFQUFFLDRCQUE0QjthQUN4QyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUMxQjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVTLGFBQWEsQ0FBQyxJQUFPO1FBQzdCLElBQUksQ0FBQyxXQUFXO2FBQ2IsTUFBTSxFQUFFLENBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFxQixDQUFXLEVBQzFDLElBQUksQ0FBQyxlQUFlLENBQ3JCO2FBQ0EsSUFBSSxDQUNILElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUNyRDthQUNBLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsTUFBTSxDQUFDLElBQU87UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLG1CQUFtQjtnQkFDeEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2dIQTdGVSxtQkFBbUI7b0dBQW5CLG1CQUFtQix5TEN4QmhDLDJNQVFBOzJGRGdCYSxtQkFBbUI7a0JBTC9CLFNBQVM7K0JBQ0Usb0JBQW9CLFFBRXhCLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFOytIQVN6QixRQUFRO3NCQUFoQixLQUFLO2dCQU9HLEdBQUc7c0JBQVgsS0FBSztnQkFNRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2FkU3RhdHVzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25NZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWVzc2FnZS9jb25maXJtYXRpb24vY29uZmlybWF0aW9uLW1lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1hdGlvbk1lc3NhZ2VEYXRhIH0gZnJvbSAnLi4vLi4vbWVzc2FnZS9jb25maXJtYXRpb24vY29uZmlybWF0aW9uLW1lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9tZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlSXRlbSB9IGZyb20gJy4uLy4uL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogUmV1c2FibGUgY29tcG9uZW50IGluIHRoZSBteS1jb21wYW55IGlzIHRvIGRlbGV0ZSBhbiBpdGVtIChpZiBpdCdzIHBvc3NpYmxlKVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctZGVsZXRlLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZGVsZXRlLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVJdGVtQ29tcG9uZW50PFQgZXh0ZW5kcyBCYXNlSXRlbT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGxvY2FsaXphdGlvbiBvZiBtZXNzYWdlcyBpcyBiYXNlZCBvbiB0aGUgaTE4biByb290LiBNZXNzYWdlcyBhcmVcbiAgICogY29uY2F0ZW5hdGVkIHRvIHRoZSByb290LCBzdWNoIGFzOlxuICAgKlxuICAgKiBgW2kxOG5Sb290XS5tZXNzYWdlcy5kZWFjdGl2YXRlYFxuICAgKi9cbiAgQElucHV0KCkgaTE4blJvb3Q6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGtleSBpbnB1dCBjYW4gYmUgdXNlZCB0byBhZGQgYSBjdXN0b20ga2V5LlxuICAgKlxuICAgKiBNb3N0IF9vcmdhbml6YXRpb25fIGVudGl0aWVzIHVzZSB0aGUgYGNvZGVgIGtleSwgYnV0IHRoZXJlIGlzIHNvbWUgdmFyaWF0aW9ucy5cbiAgICovXG4gIEBJbnB1dCgpIGtleSA9ICdjb2RlJztcblxuICAvKipcbiAgICogVGhlIGFkZGl0aW9uYWxQYXJhbSBpbnB1dCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFkZGl0aW9uYWwgZGF0YSBpZiBpdCdzIHJlcXVpcmVkXG4gICAqIGZvciBBUEkgcmVxdWVzdFxuICAgKi9cbiAgQElucHV0KCkgYWRkaXRpb25hbFBhcmFtPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiByZXNvbHZlcyB0aGUgY3VycmVudCBpdGVtLlxuICAgKi9cbiAgY3VycmVudCQ6IE9ic2VydmFibGU8VCB8IHVuZGVmaW5lZD4gPSB0aGlzLml0ZW1TZXJ2aWNlLmN1cnJlbnQkO1xuXG4gIC8qKlxuICAgKiByZXNvbHZlcyBpZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgaW4gdGhlIGVkaXQgZm9ybS5cbiAgICovXG4gIGlzSW5FZGl0TW9kZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLml0ZW1TZXJ2aWNlLmlzSW5FZGl0TW9kZSQ7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJvdGVjdGVkIGNvbmZpcm1hdGlvbjogU3ViamVjdDxDb25maXJtYXRpb25NZXNzYWdlRGF0YT4gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8VD4sXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZTxDb25maXJtYXRpb25NZXNzYWdlRGF0YT5cbiAgKSB7fVxuXG4gIGRlbGV0ZShpdGVtOiBUKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpcm1hdGlvbikge1xuICAgICAgdGhpcy5jb25maXJtYXRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7XG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICBrZXk6IHRoaXMuaTE4blJvb3QgKyAnLm1lc3NhZ2VzLmRlbGV0ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IGl0ZW0gfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZVRpdGxlOiB7XG4gICAgICAgICAga2V5OiB0aGlzLmkxOG5Sb290ICsgJy5tZXNzYWdlcy5kZWxldGVUaXRsZScsXG4gICAgICAgICAgcGFyYW1zOiB7IGl0ZW0gfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiBDb25maXJtYXRpb25NZXNzYWdlQ29tcG9uZW50LFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmNsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmVudC5jb25maXJtKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmNsb3NlKHRoaXMuY29uZmlybWF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybURlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjb25maXJtRGVsZXRlKGl0ZW06IFQpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1TZXJ2aWNlXG4gICAgICAuZGVsZXRlPy4oXG4gICAgICAgIGl0ZW1bdGhpcy5rZXkgYXMga2V5b2YgQmFzZUl0ZW1dIGFzIHN0cmluZyxcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1cbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBmaWx0ZXIoKGRhdGEpID0+IGRhdGEuc3RhdHVzID09PSBMb2FkU3RhdHVzLlNVQ0NFU1MpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm5vdGlmeSh7IC4uLml0ZW0sIC4uLmRhdGEuaXRlbSB9KSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm90aWZ5KGl0ZW06IFQpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7XG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgIGtleTogYCR7dGhpcy5pMThuUm9vdH0ubWVzc2FnZXMuZGVsZXRlZGAsXG4gICAgICAgIHBhcmFtczogeyBpdGVtIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgKm5nSWY9XCJjdXJyZW50JCB8IGFzeW5jIGFzIGl0ZW1cIlxuICBjbGFzcz1cImJ1dHRvbiBhY3RpdmVcIlxuICBbZGlzYWJsZWRdPVwiaXNJbkVkaXRNb2RlJCB8IGFzeW5jXCJcbiAgKGNsaWNrKT1cImRlbGV0ZShpdGVtKVwiXG4+XG4gIHt7ICdvcmdhbml6YXRpb24uZGVsZXRlJyB8IGN4VHJhbnNsYXRlIH19XG48L2J1dHRvbj5cbiJdfQ==