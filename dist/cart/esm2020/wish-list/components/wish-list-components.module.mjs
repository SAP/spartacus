/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { AtMessageModule, ItemCounterModule, MediaModule, PageComponentModule, StarRatingModule, } from '@spartacus/storefront';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { WishListComponent } from './wish-list/wish-list.component';
import * as i0 from "@angular/core";
export class WishListComponentsModule {
}
WishListComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, declarations: [WishListComponent, WishListItemComponent], imports: [AtMessageModule,
        CommonModule,
        I18nModule,
        ItemCounterModule,
        MediaModule,
        PageComponentModule,
        RouterModule,
        StarRatingModule,
        UrlModule], exports: [WishListComponent, WishListItemComponent] });
WishListComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                WishListComponent: {
                    component: WishListComponent,
                    data: {
                        composition: {
                            inner: ['ProductAddToCartComponent'],
                        },
                    },
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        I18nModule,
        ItemCounterModule,
        MediaModule,
        PageComponentModule,
        RouterModule,
        StarRatingModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        I18nModule,
                        ItemCounterModule,
                        MediaModule,
                        PageComponentModule,
                        RouterModule,
                        StarRatingModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                WishListComponent: {
                                    component: WishListComponent,
                                    data: {
                                        composition: {
                                            inner: ['ProductAddToCartComponent'],
                                        },
                                    },
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [WishListComponent, WishListItemComponent],
                    exports: [WishListComponent, WishListItemComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lzaC1saXN0LWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvd2lzaC1saXN0L2NvbXBvbmVudHMvd2lzaC1saXN0LWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsZ0JBQWdCLEdBQ2pCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBZ0NwRSxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsaUJBSHBCLGlCQUFpQixFQUFFLHFCQUFxQixhQXpCckQsZUFBZTtRQUNmLFlBQVk7UUFDWixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixTQUFTLGFBa0JELGlCQUFpQixFQUFFLHFCQUFxQjtzSEFFdkMsd0JBQXdCLGFBbEJ4QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixpQkFBaUIsRUFBRTtvQkFDakIsU0FBUyxFQUFFLGlCQUFpQjtvQkFDNUIsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRTs0QkFDWCxLQUFLLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzt5QkFDckM7cUJBQ0Y7b0JBQ0QsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBeEJDLGVBQWU7UUFDZixZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsU0FBUzsyRkFvQkEsd0JBQXdCO2tCQTlCcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFNBQVM7cUJBQ1Y7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsaUJBQWlCLEVBQUU7b0NBQ2pCLFNBQVMsRUFBRSxpQkFBaUI7b0NBQzVCLElBQUksRUFBRTt3Q0FDSixXQUFXLEVBQUU7NENBQ1gsS0FBSyxFQUFFLENBQUMsMkJBQTJCLENBQUM7eUNBQ3JDO3FDQUNGO29DQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7aUJBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBBdE1lc3NhZ2VNb2R1bGUsXG4gIEl0ZW1Db3VudGVyTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbiAgUGFnZUNvbXBvbmVudE1vZHVsZSxcbiAgU3RhclJhdGluZ01vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFdpc2hMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vd2lzaC1saXN0LWl0ZW0vd2lzaC1saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFdpc2hMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi93aXNoLWxpc3Qvd2lzaC1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBdE1lc3NhZ2VNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgUGFnZUNvbXBvbmVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgU3RhclJhdGluZ01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBXaXNoTGlzdENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogV2lzaExpc3RDb21wb25lbnQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY29tcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgaW5uZXI6IFsnUHJvZHVjdEFkZFRvQ2FydENvbXBvbmVudCddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtXaXNoTGlzdENvbXBvbmVudCwgV2lzaExpc3RJdGVtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1dpc2hMaXN0Q29tcG9uZW50LCBXaXNoTGlzdEl0ZW1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBXaXNoTGlzdENvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==