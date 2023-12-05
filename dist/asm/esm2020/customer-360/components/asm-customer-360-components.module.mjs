/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, MediaModule, MessageComponentModule, PageComponentModule, StarRatingModule, } from '@spartacus/storefront';
import { AsmCustomer360Component } from './asm-customer-360/asm-customer-360.component';
import { AsmCustomer360ActiveCartModule } from './sections/asm-customer-360-active-cart/asm-customer-360-active-cart.module';
import { AsmCustomer360ActivityModule } from './sections/asm-customer-360-activity/asm-customer-360-activity.module';
import { AsmCustomer360MapComponentModule } from './sections/asm-customer-360-map/asm-customer-360-map.component.module';
import { AsmCustomer360ProductInterestsModule } from './sections/asm-customer-360-product-interests/asm-customer-360-product-interests.module';
import { AsmCustomer360ProductReviewsComponentModule } from './sections/asm-customer-360-product-reviews/asm-customer-360-product-reviews.component.module';
import { AsmCustomer360ProfileModule } from './sections/asm-customer-360-profile/asm-customer-360-profile.module';
import { AsmCustomer360SavedCartModule } from './sections/asm-customer-360-saved-cart/asm-customer-360-saved-cart.module';
import { AsmCustomer360SectionComponent } from './sections/asm-customer-360-section/asm-customer-360-section.component';
import { AsmCustomer360SupportTicketsComponentModule } from './sections/asm-customer-360-support-tickets/asm-customer-360-support-tickets.component.module';
import { AsmCustomer360CouponComponentModule } from './sections/asm-customer-360-coupon/asm-customer-360-coupon.module';
import { AsmCustomer360PromotionComponentModule } from './sections/asm-customer-360-promotion/asm-customer-360-promotion.module';
import { AsmCustomer360CustomerCouponComponentModule } from './sections/asm-customer-360-customer-coupon/asm-customer-360-customer-coupon.module';
import { defaultAsmCustomer360LayoutConfig } from './default-asm-customer-360-layout.config';
import * as i0 from "@angular/core";
export class AsmCustomer360ComponentsModule {
}
AsmCustomer360ComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, declarations: [AsmCustomer360Component, AsmCustomer360SectionComponent], imports: [CommonModule,
        StarRatingModule,
        I18nModule,
        ArgsModule,
        MediaModule,
        IconModule,
        KeyboardFocusModule,
        PageComponentModule,
        MessageComponentModule,
        AsmCustomer360ActiveCartModule,
        AsmCustomer360ProductInterestsModule,
        AsmCustomer360SavedCartModule,
        AsmCustomer360ProfileModule,
        AsmCustomer360ActivityModule,
        AsmCustomer360MapComponentModule,
        AsmCustomer360ProductReviewsComponentModule,
        AsmCustomer360SupportTicketsComponentModule,
        AsmCustomer360CouponComponentModule,
        AsmCustomer360PromotionComponentModule,
        AsmCustomer360CustomerCouponComponentModule], exports: [AsmCustomer360Component] });
AsmCustomer360ComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, providers: [provideDefaultConfig(defaultAsmCustomer360LayoutConfig)], imports: [CommonModule,
        StarRatingModule,
        I18nModule,
        ArgsModule,
        MediaModule,
        IconModule,
        KeyboardFocusModule,
        PageComponentModule,
        MessageComponentModule,
        AsmCustomer360ActiveCartModule,
        AsmCustomer360ProductInterestsModule,
        AsmCustomer360SavedCartModule,
        AsmCustomer360ProfileModule,
        AsmCustomer360ActivityModule,
        AsmCustomer360MapComponentModule,
        AsmCustomer360ProductReviewsComponentModule,
        AsmCustomer360SupportTicketsComponentModule,
        AsmCustomer360CouponComponentModule,
        AsmCustomer360PromotionComponentModule,
        AsmCustomer360CustomerCouponComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StarRatingModule,
                        I18nModule,
                        ArgsModule,
                        MediaModule,
                        IconModule,
                        KeyboardFocusModule,
                        PageComponentModule,
                        MessageComponentModule,
                        AsmCustomer360ActiveCartModule,
                        AsmCustomer360ProductInterestsModule,
                        AsmCustomer360SavedCartModule,
                        AsmCustomer360ProfileModule,
                        AsmCustomer360ActivityModule,
                        AsmCustomer360MapComponentModule,
                        AsmCustomer360ProductReviewsComponentModule,
                        AsmCustomer360SupportTicketsComponentModule,
                        AsmCustomer360CouponComponentModule,
                        AsmCustomer360PromotionComponentModule,
                        AsmCustomer360CustomerCouponComponentModule,
                    ],
                    declarations: [AsmCustomer360Component, AsmCustomer360SectionComponent],
                    exports: [AsmCustomer360Component],
                    providers: [provideDefaultConfig(defaultAsmCustomer360LayoutConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL2NvbXBvbmVudHMvYXNtLWN1c3RvbWVyLTM2MC1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixnQkFBZ0IsR0FDakIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUNySCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUN6SCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx5RkFBeUYsQ0FBQztBQUMvSSxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSwrRkFBK0YsQ0FBQztBQUM1SixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUN4SCxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSwrRkFBK0YsQ0FBQztBQUM1SixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxxRkFBcUYsQ0FBQztBQUNsSixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUE2QjdGLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixpQkFKMUIsdUJBQXVCLEVBQUUsOEJBQThCLGFBckJwRSxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixVQUFVO1FBQ1YsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0Qiw4QkFBOEI7UUFDOUIsb0NBQW9DO1FBQ3BDLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLGdDQUFnQztRQUNoQywyQ0FBMkM7UUFDM0MsMkNBQTJDO1FBQzNDLG1DQUFtQztRQUNuQyxzQ0FBc0M7UUFDdEMsMkNBQTJDLGFBR25DLHVCQUF1Qjs0SEFHdEIsOEJBQThCLGFBRjlCLENBQUMsb0JBQW9CLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxZQXZCbEUsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsOEJBQThCO1FBQzlCLG9DQUFvQztRQUNwQyw2QkFBNkI7UUFDN0IsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1QixnQ0FBZ0M7UUFDaEMsMkNBQTJDO1FBQzNDLDJDQUEyQztRQUMzQyxtQ0FBbUM7UUFDbkMsc0NBQXNDO1FBQ3RDLDJDQUEyQzsyRkFNbEMsOEJBQThCO2tCQTNCMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsOEJBQThCO3dCQUM5QixvQ0FBb0M7d0JBQ3BDLDZCQUE2Qjt3QkFDN0IsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLGdDQUFnQzt3QkFDaEMsMkNBQTJDO3dCQUMzQywyQ0FBMkM7d0JBQzNDLG1DQUFtQzt3QkFDbkMsc0NBQXNDO3dCQUN0QywyQ0FBMkM7cUJBQzVDO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLDhCQUE4QixDQUFDO29CQUN2RSxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQWlDLENBQUMsQ0FBQztpQkFDckUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFyZ3NNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIE1lZGlhTW9kdWxlLFxuICBNZXNzYWdlQ29tcG9uZW50TW9kdWxlLFxuICBQYWdlQ29tcG9uZW50TW9kdWxlLFxuICBTdGFyUmF0aW5nTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBDb21wb25lbnQgfSBmcm9tICcuL2FzbS1jdXN0b21lci0zNjAvYXNtLWN1c3RvbWVyLTM2MC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBBY3RpdmVDYXJ0TW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLWFjdGl2ZS1jYXJ0L2FzbS1jdXN0b21lci0zNjAtYWN0aXZlLWNhcnQubW9kdWxlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkvYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBNYXBDb21wb25lbnRNb2R1bGUgfSBmcm9tICcuL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtbWFwL2FzbS1jdXN0b21lci0zNjAtbWFwLmNvbXBvbmVudC5tb2R1bGUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0SW50ZXJlc3RzTW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtaW50ZXJlc3RzL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1pbnRlcmVzdHMubW9kdWxlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwUHJvZHVjdFJldmlld3NDb21wb25lbnRNb2R1bGUgfSBmcm9tICcuL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzLmNvbXBvbmVudC5tb2R1bGUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBQcm9maWxlTW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXByb2ZpbGUvYXNtLWN1c3RvbWVyLTM2MC1wcm9maWxlLm1vZHVsZSc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFNhdmVkQ2FydE1vZHVsZSB9IGZyb20gJy4vc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1zYXZlZC1jYXJ0L2FzbS1jdXN0b21lci0zNjAtc2F2ZWQtY2FydC5tb2R1bGUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24vYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFN1cHBvcnRUaWNrZXRzQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy5jb21wb25lbnQubW9kdWxlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQ291cG9uQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLWNvdXBvbi9hc20tY3VzdG9tZXItMzYwLWNvdXBvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb25Db21wb25lbnRNb2R1bGUgfSBmcm9tICcuL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MEN1c3RvbWVyQ291cG9uQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnLi9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLWN1c3RvbWVyLWNvdXBvbi9hc20tY3VzdG9tZXItMzYwLWN1c3RvbWVyLWNvdXBvbi5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdEFzbUN1c3RvbWVyMzYwTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWFzbS1jdXN0b21lci0zNjAtbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU3RhclJhdGluZ01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEFyZ3NNb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIFBhZ2VDb21wb25lbnRNb2R1bGUsXG4gICAgTWVzc2FnZUNvbXBvbmVudE1vZHVsZSxcbiAgICBBc21DdXN0b21lcjM2MEFjdGl2ZUNhcnRNb2R1bGUsXG4gICAgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0SW50ZXJlc3RzTW9kdWxlLFxuICAgIEFzbUN1c3RvbWVyMzYwU2F2ZWRDYXJ0TW9kdWxlLFxuICAgIEFzbUN1c3RvbWVyMzYwUHJvZmlsZU1vZHVsZSxcbiAgICBBc21DdXN0b21lcjM2MEFjdGl2aXR5TW9kdWxlLFxuICAgIEFzbUN1c3RvbWVyMzYwTWFwQ29tcG9uZW50TW9kdWxlLFxuICAgIEFzbUN1c3RvbWVyMzYwUHJvZHVjdFJldmlld3NDb21wb25lbnRNb2R1bGUsXG4gICAgQXNtQ3VzdG9tZXIzNjBTdXBwb3J0VGlja2V0c0NvbXBvbmVudE1vZHVsZSxcbiAgICBBc21DdXN0b21lcjM2MENvdXBvbkNvbXBvbmVudE1vZHVsZSxcbiAgICBBc21DdXN0b21lcjM2MFByb21vdGlvbkNvbXBvbmVudE1vZHVsZSxcbiAgICBBc21DdXN0b21lcjM2MEN1c3RvbWVyQ291cG9uQ29tcG9uZW50TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBc21DdXN0b21lcjM2MENvbXBvbmVudCwgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FzbUN1c3RvbWVyMzYwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEFzbUN1c3RvbWVyMzYwTGF5b3V0Q29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwQ29tcG9uZW50c01vZHVsZSB7fVxuIl19