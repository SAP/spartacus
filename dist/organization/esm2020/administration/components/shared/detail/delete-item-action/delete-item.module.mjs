/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfirmationMessageModule } from '../../message/confirmation/confirmation-message.module';
import { MessageModule } from '../../message/message.module';
import { DeleteItemComponent } from './delete-item.component';
import * as i0 from "@angular/core";
export class DeleteItemModule {
}
DeleteItemModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DeleteItemModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, declarations: [DeleteItemComponent], imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule], exports: [DeleteItemComponent] });
DeleteItemModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
                    declarations: [DeleteItemComponent],
                    exports: [DeleteItemComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWl0ZW0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9kZXRhaWwvZGVsZXRlLWl0ZW0tYWN0aW9uL2RlbGV0ZS1pdGVtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFPOUQsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQUhaLG1CQUFtQixhQUR4QixZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSx5QkFBeUIsYUFFbEUsbUJBQW1COzhHQUVsQixnQkFBZ0IsWUFKakIsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUseUJBQXlCOzJGQUlqRSxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUseUJBQXlCLENBQUM7b0JBQzdFLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4uLy4uL21lc3NhZ2UvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBNZXNzYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWVzc2FnZS9tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWxldGVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWxldGUtaXRlbS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBNZXNzYWdlTW9kdWxlLCBDb25maXJtYXRpb25NZXNzYWdlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVsZXRlSXRlbUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWxldGVJdGVtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlSXRlbU1vZHVsZSB7fVxuIl19