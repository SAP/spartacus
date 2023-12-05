/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { SaveForLaterComponent } from './save-for-later.component';
import * as i0 from "@angular/core";
export class SaveForLaterModule {
}
SaveForLaterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SaveForLaterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, declarations: [SaveForLaterComponent], imports: [CommonModule, I18nModule, CartSharedModule], exports: [SaveForLaterComponent] });
SaveForLaterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SaveForLaterComponent: {
                    component: SaveForLaterComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, CartSharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CartSharedModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SaveForLaterComponent: {
                                    component: SaveForLaterComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [SaveForLaterComponent],
                    exports: [SaveForLaterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS1mb3ItbGF0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL3NhdmUtZm9yLWxhdGVyL3NhdmUtZm9yLWxhdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUdMLFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFnQm5FLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFIZCxxQkFBcUIsYUFWMUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsYUFXMUMscUJBQXFCO2dIQUVwQixrQkFBa0IsYUFabEI7UUFDVCxvQkFBb0IsQ0FBNkI7WUFDL0MsYUFBYSxFQUFFO2dCQUNiLHFCQUFxQixFQUFFO29CQUNyQixTQUFTLEVBQUUscUJBQXFCO2lCQUNqQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0I7MkZBYXpDLGtCQUFrQjtrQkFkOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDO29CQUNyRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQTZCOzRCQUMvQyxhQUFhLEVBQUU7Z0NBQ2IscUJBQXFCLEVBQUU7b0NBQ3JCLFNBQVMsRUFBRSxxQkFBcUI7aUNBQ2pDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJ0U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vY2FydC1zaGFyZWQvY2FydC1zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNhdmVGb3JMYXRlckNvbXBvbmVudCB9IGZyb20gJy4vc2F2ZS1mb3ItbGF0ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ2FydFNoYXJlZE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWcgfCBGZWF0dXJlc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFNhdmVGb3JMYXRlckNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogU2F2ZUZvckxhdGVyQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbU2F2ZUZvckxhdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NhdmVGb3JMYXRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFNhdmVGb3JMYXRlck1vZHVsZSB7fVxuIl19