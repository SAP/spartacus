/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { WishListStoreModule } from './store/wish-list-store.module';
import * as i0 from "@angular/core";
export class WishListCoreModule {
}
WishListCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, imports: [WishListStoreModule] });
WishListCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, providers: [...facadeProviders], imports: [WishListStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [WishListStoreModule],
                    providers: [...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lzaC1saXN0LWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvd2lzaC1saXN0L2NvcmUvd2lzaC1saXN0LWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFNckUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLFlBSG5CLG1CQUFtQjtnSEFHbEIsa0JBQWtCLGFBRmxCLENBQUMsR0FBRyxlQUFlLENBQUMsWUFEckIsbUJBQW1COzJGQUdsQixrQkFBa0I7a0JBSjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcbmltcG9ydCB7IFdpc2hMaXN0U3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL3dpc2gtbGlzdC1zdG9yZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbV2lzaExpc3RTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogWy4uLmZhY2FkZVByb3ZpZGVyc10sXG59KVxuZXhwb3J0IGNsYXNzIFdpc2hMaXN0Q29yZU1vZHVsZSB7fVxuIl19