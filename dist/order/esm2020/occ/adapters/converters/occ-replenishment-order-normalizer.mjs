/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '@spartacus/cart/base/root';
import { PRODUCT_NORMALIZER, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccReplenishmentOrderNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.entries) {
            target.entries = source.entries.map((entry) => ({
                ...entry,
                product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
                promotions: this.converter.convert({ item: entry, promotions: source.appliedProductPromotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER),
            }));
        }
        return target;
    }
}
OccReplenishmentOrderNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReplenishmentOrderNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXJlcGxlbmlzaG1lbnQtb3JkZXItbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9vY2MvYWRhcHRlcnMvY29udmVydGVycy9vY2MtcmVwbGVuaXNobWVudC1vcmRlci1ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlFLE9BQU8sRUFJTCxrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBSXpCLE1BQU0sT0FBTywrQkFBK0I7SUFHMUMsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBRyxDQUFDO0lBRW5ELE9BQU8sQ0FDTCxNQUE4QixFQUM5QixNQUEyQjtRQUUzQixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQXdCLENBQUM7U0FDdkQ7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsR0FBRyxLQUFLO2dCQUNSLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDO2dCQUNsRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ2hDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEVBQzVELGlDQUFpQyxDQUNsQzthQUNGLENBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs0SEF6QlUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FEbEIsTUFBTTsyRkFDbkIsK0JBQStCO2tCQUQzQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9SREVSX0VOVFJZX1BST01PVElPTlNfTk9STUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29udmVydGVyLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBPY2MsXG4gIFBST0RVQ1RfTk9STUFMSVpFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlciB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjUmVwbGVuaXNobWVudE9yZGVyTm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuUmVwbGVuaXNobWVudE9yZGVyLCBSZXBsZW5pc2htZW50T3JkZXI+XG57XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlKSB7fVxuXG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBPY2MuUmVwbGVuaXNobWVudE9yZGVyLFxuICAgIHRhcmdldD86IFJlcGxlbmlzaG1lbnRPcmRlclxuICApOiBSZXBsZW5pc2htZW50T3JkZXIge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBSZXBsZW5pc2htZW50T3JkZXI7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZS5lbnRyaWVzKSB7XG4gICAgICB0YXJnZXQuZW50cmllcyA9IHNvdXJjZS5lbnRyaWVzLm1hcCgoZW50cnkpID0+ICh7XG4gICAgICAgIC4uLmVudHJ5LFxuICAgICAgICBwcm9kdWN0OiB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KGVudHJ5LnByb2R1Y3QsIFBST0RVQ1RfTk9STUFMSVpFUiksXG4gICAgICAgIHByb21vdGlvbnM6IHRoaXMuY29udmVydGVyLmNvbnZlcnQoXG4gICAgICAgICAgeyBpdGVtOiBlbnRyeSwgcHJvbW90aW9uczogc291cmNlLmFwcGxpZWRQcm9kdWN0UHJvbW90aW9ucyB9LFxuICAgICAgICAgIE9SREVSX0VOVFJZX1BST01PVElPTlNfTk9STUFMSVpFUlxuICAgICAgICApLFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==