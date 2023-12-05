/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule, PaginationModule, TableModule, } from '@spartacus/storefront';
import { CardModule } from '../card/card.module';
import { MessageModule } from '../message/message.module';
import { AssignCellComponent } from './assign-cell.component';
import { SubListComponent } from './sub-list.component';
import * as i0 from "@angular/core";
export class SubListModule {
}
SubListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SubListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, declarations: [SubListComponent, AssignCellComponent], imports: [CommonModule,
        I18nModule,
        CardModule,
        TableModule,
        PaginationModule,
        MessageModule,
        KeyboardFocusModule], exports: [SubListComponent] });
SubListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, imports: [CommonModule,
        I18nModule,
        CardModule,
        TableModule,
        PaginationModule,
        MessageModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        CardModule,
                        TableModule,
                        PaginationModule,
                        MessageModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [SubListComponent, AssignCellComponent],
                    exports: [SubListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixXQUFXLEdBQ1osTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQWV4RCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQUhULGdCQUFnQixFQUFFLG1CQUFtQixhQVJsRCxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixtQkFBbUIsYUFHWCxnQkFBZ0I7MkdBRWYsYUFBYSxZQVh0QixZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixtQkFBbUI7MkZBS1YsYUFBYTtrQkFiekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDckQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIFBhZ2luYXRpb25Nb2R1bGUsXG4gIFRhYmxlTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSB9IGZyb20gJy4uL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4uL21lc3NhZ2UvbWVzc2FnZS5tb2R1bGUnO1xuaW1wb3J0IHsgQXNzaWduQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vYXNzaWduLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFN1Ykxpc3RDb21wb25lbnQgfSBmcm9tICcuL3N1Yi1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFRhYmxlTW9kdWxlLFxuICAgIFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgTWVzc2FnZU1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTdWJMaXN0Q29tcG9uZW50LCBBc3NpZ25DZWxsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N1Ykxpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTdWJMaXN0TW9kdWxlIHt9XG4iXX0=