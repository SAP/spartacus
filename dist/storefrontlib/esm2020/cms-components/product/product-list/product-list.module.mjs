/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { AtMessageModule, ItemCounterModule, ListNavigationModule, MediaModule, SpinnerModule, StarRatingModule, } from '../../../shared/index';
import { IconModule } from '../../misc/icon/index';
import { defaultViewConfig } from '../config/default-view-config';
import { ProductListComponent } from './container/product-list.component';
import { ProductScrollComponent } from './container/product-scroll/product-scroll.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductViewComponent } from './product-view/product-view.component';
import * as i0 from "@angular/core";
export class ProductListModule {
}
ProductListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductListModule, declarations: [ProductListComponent,
        ProductListItemComponent,
        ProductGridItemComponent,
        ProductViewComponent,
        ProductScrollComponent], imports: [AtMessageModule,
        CommonModule,
        FeaturesConfigModule,
        I18nModule,
        IconModule,
        InfiniteScrollModule,
        ItemCounterModule,
        ListNavigationModule,
        MediaModule,
        OutletModule,
        PageComponentModule,
        RouterModule,
        SpinnerModule,
        StarRatingModule,
        UrlModule], exports: [ProductListComponent,
        ProductListItemComponent,
        ProductGridItemComponent,
        ProductViewComponent,
        ProductScrollComponent] });
ProductListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListModule, providers: [
        provideDefaultConfig(defaultViewConfig),
        provideDefaultConfig({
            cmsComponents: {
                CMSProductListComponent: {
                    component: ProductListComponent,
                    data: {
                        composition: {
                            inner: ['ProductAddToCartComponent'],
                        },
                    },
                },
                ProductGridComponent: {
                    component: ProductListComponent,
                    data: {
                        composition: {
                            inner: ['ProductAddToCartComponent'],
                        },
                    },
                },
                SearchResultsListComponent: {
                    component: ProductListComponent,
                    data: {
                        composition: {
                            inner: ['ProductAddToCartComponent'],
                        },
                    },
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        FeaturesConfigModule,
        I18nModule,
        IconModule,
        InfiniteScrollModule,
        ItemCounterModule,
        ListNavigationModule,
        MediaModule,
        OutletModule,
        PageComponentModule,
        RouterModule,
        SpinnerModule,
        StarRatingModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        FeaturesConfigModule,
                        I18nModule,
                        IconModule,
                        InfiniteScrollModule,
                        ItemCounterModule,
                        ListNavigationModule,
                        MediaModule,
                        OutletModule,
                        PageComponentModule,
                        RouterModule,
                        SpinnerModule,
                        StarRatingModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultViewConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                CMSProductListComponent: {
                                    component: ProductListComponent,
                                    data: {
                                        composition: {
                                            inner: ['ProductAddToCartComponent'],
                                        },
                                    },
                                },
                                ProductGridComponent: {
                                    component: ProductListComponent,
                                    data: {
                                        composition: {
                                            inner: ['ProductAddToCartComponent'],
                                        },
                                    },
                                },
                                SearchResultsListComponent: {
                                    component: ProductListComponent,
                                    data: {
                                        composition: {
                                            inner: ['ProductAddToCartComponent'],
                                        },
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ProductListComponent,
                        ProductListItemComponent,
                        ProductGridItemComponent,
                        ProductViewComponent,
                        ProductScrollComponent,
                    ],
                    exports: [
                        ProductListComponent,
                        ProductListItemComponent,
                        ProductGridItemComponent,
                        ProductViewComponent,
                        ProductScrollComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFFbEcsT0FBTyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx3QkFBd0IsRUFB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RCxZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3dCQUNwQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxNb2R1bGUgfSBmcm9tICduZ3gtaW5maW5pdGUtc2Nyb2xsJztcbmltcG9ydCB7IE91dGxldE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvcGFnZS1jb21wb25lbnQubW9kdWxlJztcbmltcG9ydCB7IFZpZXdDb25maWcgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29uZmlnL3ZpZXctY29uZmlnJztcbmltcG9ydCB7XG4gIEF0TWVzc2FnZU1vZHVsZSxcbiAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbiAgU3RhclJhdGluZ01vZHVsZSxcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2luZGV4JztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9taXNjL2ljb24vaW5kZXgnO1xuaW1wb3J0IHsgZGVmYXVsdFZpZXdDb25maWcgfSBmcm9tICcuLi9jb25maWcvZGVmYXVsdC12aWV3LWNvbmZpZyc7XG5pbXBvcnQgeyBQcm9kdWN0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVyL3Byb2R1Y3QtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZHVjdFNjcm9sbENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVyL3Byb2R1Y3Qtc2Nyb2xsL3Byb2R1Y3Qtc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0R3JpZEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3QtZ3JpZC1pdGVtL3Byb2R1Y3QtZ3JpZC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0TGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3QtbGlzdC1pdGVtL3Byb2R1Y3QtbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC12aWV3L3Byb2R1Y3Qtdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQXRNZXNzYWdlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgSW5maW5pdGVTY3JvbGxNb2R1bGUsXG4gICAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIFBhZ2VDb21wb25lbnRNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgU3RhclJhdGluZ01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxWaWV3Q29uZmlnPmRlZmF1bHRWaWV3Q29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ01TUHJvZHVjdExpc3RDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgIGlubmVyOiBbJ1Byb2R1Y3RBZGRUb0NhcnRDb21wb25lbnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgUHJvZHVjdEdyaWRDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgIGlubmVyOiBbJ1Byb2R1Y3RBZGRUb0NhcnRDb21wb25lbnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgU2VhcmNoUmVzdWx0c0xpc3RDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbXBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgIGlubmVyOiBbJ1Byb2R1Y3RBZGRUb0NhcnRDb21wb25lbnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgIFByb2R1Y3RMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBQcm9kdWN0R3JpZEl0ZW1Db21wb25lbnQsXG4gICAgUHJvZHVjdFZpZXdDb21wb25lbnQsXG4gICAgUHJvZHVjdFNjcm9sbENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgIFByb2R1Y3RMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBQcm9kdWN0R3JpZEl0ZW1Db21wb25lbnQsXG4gICAgUHJvZHVjdFZpZXdDb21wb25lbnQsXG4gICAgUHJvZHVjdFNjcm9sbENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdExpc3RNb2R1bGUge31cbiJdfQ==