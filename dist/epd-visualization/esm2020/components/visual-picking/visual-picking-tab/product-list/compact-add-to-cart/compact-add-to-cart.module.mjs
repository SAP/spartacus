/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, ItemCounterModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { CompactAddToCartComponent } from './compact-add-to-cart.component';
import * as i0 from "@angular/core";
export class CompactAddToCartModule {
}
CompactAddToCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CompactAddToCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, declarations: [CompactAddToCartComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        FeaturesConfigModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule], exports: [CompactAddToCartComponent] });
CompactAddToCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        FeaturesConfigModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        SpinnerModule,
                        PromotionsModule,
                        FeaturesConfigModule,
                        UrlModule,
                        IconModule,
                        I18nModule,
                        ItemCounterModule,
                    ],
                    declarations: [CompactAddToCartComponent],
                    exports: [CompactAddToCartComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC1hZGQtdG8tY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXBpY2tpbmcvdmlzdWFsLXBpY2tpbmctdGFiL3Byb2R1Y3QtbGlzdC9jb21wYWN0LWFkZC10by1jYXJ0L2NvbXBhY3QtYWRkLXRvLWNhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBa0I1RSxNQUFNLE9BQU8sc0JBQXNCOzttSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsaUJBSGxCLHlCQUF5QixhQVh0QyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixpQkFBaUIsYUFHVCx5QkFBeUI7b0hBRXhCLHNCQUFzQixZQWQvQixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixpQkFBaUI7MkZBS1Isc0JBQXNCO2tCQWhCbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZlYXR1cmVzQ29uZmlnTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gIFByb21vdGlvbnNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb21wYWN0QWRkVG9DYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wYWN0LWFkZC10by1jYXJ0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbXBhY3RBZGRUb0NhcnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29tcGFjdEFkZFRvQ2FydENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbXBhY3RBZGRUb0NhcnRNb2R1bGUge31cbiJdfQ==