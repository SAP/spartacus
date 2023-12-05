/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./item.service";
import * as i2 from "./message/services/message.service";
export class ItemExistsDirective {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
    }
    ngOnInit() {
        this.subscription = this.itemService.error$
            .pipe(filter((error) => error))
            .subscribe(() => this.handleErrorMessage());
    }
    handleErrorMessage() {
        this.messageService.add({
            message: {
                key: 'organization.notification.notExist',
            },
            type: GlobalMessageType.MSG_TYPE_ERROR,
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
ItemExistsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsDirective, deps: [{ token: i1.ItemService }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Directive });
ItemExistsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ItemExistsDirective, selector: "[cxOrgItemExists]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOrgItemExists]',
                }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1leGlzdHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9pdGVtLWV4aXN0cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVF4QyxNQUFNLE9BQU8sbUJBQW1CO0lBRzlCLFlBQ1ksV0FBMkIsRUFDM0IsY0FBOEI7UUFEOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUN2QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxvQ0FBb0M7YUFDMUM7WUFDRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsY0FBYztTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Z0hBekJVLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlVHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL21lc3NhZ2Uvc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VJdGVtIH0gZnJvbSAnLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hPcmdJdGVtRXhpc3RzXScsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1FeGlzdHNEaXJlY3RpdmU8VCA9IEJhc2VJdGVtPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8VD4sXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLml0ZW1TZXJ2aWNlLmVycm9yJFxuICAgICAgLnBpcGUoZmlsdGVyKChlcnJvcikgPT4gZXJyb3IpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZUVycm9yTWVzc2FnZSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvck1lc3NhZ2UoKSB7XG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGQoe1xuICAgICAgbWVzc2FnZToge1xuICAgICAgICBrZXk6ICdvcmdhbml6YXRpb24ubm90aWZpY2F0aW9uLm5vdEV4aXN0JyxcbiAgICAgIH0sXG4gICAgICB0eXBlOiBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUixcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=