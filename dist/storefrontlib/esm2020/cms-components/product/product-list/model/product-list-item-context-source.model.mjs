/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ProductListItemContext } from './product-list-item-context.model';
import * as i0 from "@angular/core";
/**
 * Context source for `ProductListItemComponent`.
 *
 * `ProductListItemContext` should be injected instead in child components.
 */
export class ProductListItemContextSource extends ProductListItemContext {
    constructor() {
        super(...arguments);
        this.product$ = new ReplaySubject(1);
    }
}
ProductListItemContextSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListItemContextSource, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
ProductListItemContextSource.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListItemContextSource });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListItemContextSource, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0LWl0ZW0tY29udGV4dC1zb3VyY2UubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L21vZGVsL3Byb2R1Y3QtbGlzdC1pdGVtLWNvbnRleHQtc291cmNlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBRTNFOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsc0JBQXNCO0lBRHhFOztRQUVXLGFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztLQUNuRDs7eUhBRlksNEJBQTRCOzZIQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJvZHVjdExpc3RJdGVtQ29udGV4dCB9IGZyb20gJy4vcHJvZHVjdC1saXN0LWl0ZW0tY29udGV4dC5tb2RlbCc7XG5cbi8qKlxuICogQ29udGV4dCBzb3VyY2UgZm9yIGBQcm9kdWN0TGlzdEl0ZW1Db21wb25lbnRgLlxuICpcbiAqIGBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0YCBzaG91bGQgYmUgaW5qZWN0ZWQgaW5zdGVhZCBpbiBjaGlsZCBjb21wb25lbnRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvZHVjdExpc3RJdGVtQ29udGV4dFNvdXJjZSBleHRlbmRzIFByb2R1Y3RMaXN0SXRlbUNvbnRleHQge1xuICByZWFkb25seSBwcm9kdWN0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PFByb2R1Y3Q+KDEpO1xufVxuIl19