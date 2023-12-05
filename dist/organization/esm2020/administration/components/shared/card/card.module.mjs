/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { MessageModule } from '../message/message.module';
import { CardComponent } from './card.component';
import { PopoverModule } from '@spartacus/storefront';
import * as i0 from "@angular/core";
/**
 * Provides a reusable card UI component for the organization split views.
 *
 * The component does not intend to provide a complete set of card features, it's just
 * a reusable component inside the organization UI.
 */
export class CardModule {
}
CardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CardModule, declarations: [CardComponent], imports: [CommonModule,
        SplitViewModule,
        RouterModule,
        I18nModule,
        IconModule,
        UrlModule,
        MessageModule,
        PopoverModule], exports: [CardComponent] });
CardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, imports: [CommonModule,
        SplitViewModule,
        RouterModule,
        I18nModule,
        IconModule,
        UrlModule,
        MessageModule,
        PopoverModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        SplitViewModule,
                        RouterModule,
                        I18nModule,
                        IconModule,
                        UrlModule,
                        MessageModule,
                        PopoverModule,
                    ],
                    declarations: [CardComponent],
                    exports: [CardComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2NhcmQvY2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBQ3REOzs7OztHQUtHO0FBZUgsTUFBTSxPQUFPLFVBQVU7O3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkFITixhQUFhLGFBVDFCLFlBQVk7UUFDWixlQUFlO1FBQ2YsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULGFBQWE7UUFDYixhQUFhLGFBR0wsYUFBYTt3R0FFWixVQUFVLFlBWm5CLFlBQVk7UUFDWixlQUFlO1FBQ2YsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULGFBQWE7UUFDYixhQUFhOzJGQUtKLFVBQVU7a0JBZHRCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixTQUFTO3dCQUNULGFBQWE7d0JBQ2IsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQzdCLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgU3BsaXRWaWV3TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE1lc3NhZ2VNb2R1bGUgfSBmcm9tICcuLi9tZXNzYWdlL21lc3NhZ2UubW9kdWxlJztcbmltcG9ydCB7IENhcmRDb21wb25lbnQgfSBmcm9tICcuL2NhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuLyoqXG4gKiBQcm92aWRlcyBhIHJldXNhYmxlIGNhcmQgVUkgY29tcG9uZW50IGZvciB0aGUgb3JnYW5pemF0aW9uIHNwbGl0IHZpZXdzLlxuICpcbiAqIFRoZSBjb21wb25lbnQgZG9lcyBub3QgaW50ZW5kIHRvIHByb3ZpZGUgYSBjb21wbGV0ZSBzZXQgb2YgY2FyZCBmZWF0dXJlcywgaXQncyBqdXN0XG4gKiBhIHJldXNhYmxlIGNvbXBvbmVudCBpbnNpZGUgdGhlIG9yZ2FuaXphdGlvbiBVSS5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTcGxpdFZpZXdNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgTWVzc2FnZU1vZHVsZSxcbiAgICBQb3BvdmVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDYXJkQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhcmRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkTW9kdWxlIHt9XG4iXX0=