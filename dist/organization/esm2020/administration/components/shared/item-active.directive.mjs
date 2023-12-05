/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive } from '@angular/core';
import { GlobalMessageType, isNotNullable } from '@spartacus/core';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./item.service";
import * as i2 from "./message/services/message.service";
export class ItemActiveDirective {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
    }
    ngOnInit() {
        this.subscription = this.itemService.current$
            .pipe(distinctUntilChanged((previous, current) => previous?.active === current?.active), filter(isNotNullable), filter((item) => item.active === false))
            .subscribe((item) => this.handleDisabledItems(item));
    }
    handleDisabledItems(item) {
        this.messageService.add({
            message: {
                key: 'organization.notification.disabled',
                params: { item },
            },
            type: GlobalMessageType.MSG_TYPE_ERROR,
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
ItemActiveDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveDirective, deps: [{ token: i1.ItemService }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Directive });
ItemActiveDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ItemActiveDirective, selector: "[cxOrgItemActive]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOrgItemActive]',
                }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1hY3RpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9pdGVtLWFjdGl2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFROUQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUNZLFdBQTJCLEVBQzNCLGNBQThCO1FBRDlCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDdkMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTthQUMxQyxJQUFJLENBQ0gsb0JBQW9CLENBQ2xCLENBQUMsUUFBOEIsRUFBRSxPQUE2QixFQUFFLEVBQUUsQ0FDaEUsUUFBUSxFQUFFLE1BQU0sS0FBSyxPQUFPLEVBQUUsTUFBTSxDQUN2QyxFQUNELE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDckIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUN4QzthQUNBLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVTLG1CQUFtQixDQUFDLElBQWM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxvQ0FBb0M7Z0JBQ3pDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRTthQUNqQjtZQUNELElBQUksRUFBRSxpQkFBaUIsQ0FBQyxjQUFjO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnSEFuQ1UsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFIL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VUeXBlLCBpc05vdE51bGxhYmxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL21lc3NhZ2Uvc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VJdGVtIH0gZnJvbSAnLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hPcmdJdGVtQWN0aXZlXScsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1BY3RpdmVEaXJlY3RpdmU8VCBleHRlbmRzIEJhc2VJdGVtID0gQmFzZUl0ZW0+XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8VD4sXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLml0ZW1TZXJ2aWNlLmN1cnJlbnQkXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgKHByZXZpb3VzOiBCYXNlSXRlbSB8IHVuZGVmaW5lZCwgY3VycmVudDogQmFzZUl0ZW0gfCB1bmRlZmluZWQpID0+XG4gICAgICAgICAgICBwcmV2aW91cz8uYWN0aXZlID09PSBjdXJyZW50Py5hY3RpdmVcbiAgICAgICAgKSxcbiAgICAgICAgZmlsdGVyKGlzTm90TnVsbGFibGUpLFxuICAgICAgICBmaWx0ZXIoKGl0ZW0pID0+IGl0ZW0uYWN0aXZlID09PSBmYWxzZSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGl0ZW0pID0+IHRoaXMuaGFuZGxlRGlzYWJsZWRJdGVtcyhpdGVtKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRGlzYWJsZWRJdGVtcyhpdGVtOiBCYXNlSXRlbSkge1xuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkKHtcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAga2V5OiAnb3JnYW5pemF0aW9uLm5vdGlmaWNhdGlvbi5kaXNhYmxlZCcsXG4gICAgICAgIHBhcmFtczogeyBpdGVtIH0sXG4gICAgICB9LFxuICAgICAgdHlwZTogR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1IsXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19