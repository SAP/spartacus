/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, ItemCounterModule, OutletModule, } from '@spartacus/storefront';
import { AddToCartComponent } from './add-to-cart.component';
import * as i0 from "@angular/core";
export class AddToCartModule {
}
AddToCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddToCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, declarations: [AddToCartComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        OutletModule], exports: [AddToCartComponent] });
AddToCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProductAddToCartComponent: {
                    component: AddToCartComponent,
                    data: {
                        inventoryDisplay: false,
                    },
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductAddToCartComponent: {
                                    component: AddToCartComponent,
                                    data: {
                                        inventoryDisplay: false,
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [AddToCartComponent],
                    exports: [AddToCartComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWNhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2FkZC10by1jYXJ0L2FkZC10by1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFlBQVksR0FDYixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQTBCN0QsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFIWCxrQkFBa0IsYUFuQi9CLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsWUFBWSxhQWVKLGtCQUFrQjs2R0FFakIsZUFBZSxhQWZmO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHlCQUF5QixFQUFFO29CQUN6QixTQUFTLEVBQUUsa0JBQWtCO29CQUM3QixJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsS0FBSztxQkFDeEI7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWxCQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLFlBQVk7MkZBaUJILGVBQWU7a0JBeEIzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYix5QkFBeUIsRUFBRTtvQ0FDekIsU0FBUyxFQUFFLGtCQUFrQjtvQ0FDN0IsSUFBSSxFQUFFO3dDQUNKLGdCQUFnQixFQUFFLEtBQUs7cUNBQ3hCO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gIE91dGxldE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFkZFRvQ2FydENvbXBvbmVudCB9IGZyb20gJy4vYWRkLXRvLWNhcnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBJdGVtQ291bnRlck1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBQcm9kdWN0QWRkVG9DYXJ0Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBBZGRUb0NhcnRDb21wb25lbnQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaW52ZW50b3J5RGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FkZFRvQ2FydENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBZGRUb0NhcnRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRUb0NhcnRNb2R1bGUge31cbiJdfQ==