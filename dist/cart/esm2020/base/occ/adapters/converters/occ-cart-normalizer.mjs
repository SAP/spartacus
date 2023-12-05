/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER, } from '@spartacus/cart/base/root';
import { PRODUCT_NORMALIZER, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccCartNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        this.removeDuplicatePromotions(source, target);
        if (source.entries) {
            target.entries = source.entries.map((entry) => ({
                ...entry,
                product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
                promotions: this.converter.convert({ item: entry, promotions: target?.appliedProductPromotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER),
            }));
        }
        return target;
    }
    /**
     * Remove all duplicate promotions
     */
    removeDuplicatePromotions(source, target) {
        if (source && source.potentialOrderPromotions) {
            target.potentialOrderPromotions = this.removeDuplicateItems(source.potentialOrderPromotions);
        }
        if (source && source.potentialProductPromotions) {
            target.potentialProductPromotions = this.removeDuplicateItems(source.potentialProductPromotions);
        }
        if (source && source.appliedOrderPromotions) {
            target.appliedOrderPromotions = this.removeDuplicateItems(source.appliedOrderPromotions);
        }
        if (source && source.appliedProductPromotions) {
            target.appliedProductPromotions = this.removeDuplicateItems(source.appliedProductPromotions);
        }
    }
    removeDuplicateItems(itemList) {
        return itemList.filter((p, i, a) => {
            const b = a.map((el) => JSON.stringify(el));
            return i === b.indexOf(JSON.stringify(p));
        });
    }
}
OccCartNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNhcnQtbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvb2NjL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLWNhcnQtbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsaUNBQWlDLEdBQ2xDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUlMLGtCQUFrQixHQUNuQixNQUFNLGlCQUFpQixDQUFDOzs7QUFHekIsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFHLENBQUM7SUFFbkQsT0FBTyxDQUFDLE1BQWdCLEVBQUUsTUFBYTtRQUNyQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQVUsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLEdBQUcsS0FBSztnQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztnQkFDbEUsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNoQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUM3RCxpQ0FBaUMsQ0FDbEM7YUFDRixDQUFDLENBQUMsQ0FBQztTQUNMO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0sseUJBQXlCLENBQUMsTUFBVyxFQUFFLE1BQVk7UUFDekQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFO1lBQzdDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQ3pELE1BQU0sQ0FBQyx3QkFBd0IsQ0FDaEMsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLDBCQUEwQixFQUFFO1lBQy9DLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQzNELE1BQU0sQ0FBQywwQkFBMEIsQ0FDbEMsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQ3ZELE1BQU0sQ0FBQyxzQkFBc0IsQ0FDOUIsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFO1lBQzdDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQ3pELE1BQU0sQ0FBQyx3QkFBd0IsQ0FDaEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQWU7UUFDMUMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs4R0ExRFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FESixNQUFNOzJGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FydCxcbiAgT1JERVJfRU5UUllfUFJPTU9USU9OU19OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbnZlcnRlcixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgT2NjLFxuICBQUk9EVUNUX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ2FydE5vcm1hbGl6ZXIgaW1wbGVtZW50cyBDb252ZXJ0ZXI8T2NjLkNhcnQsIENhcnQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2UpIHt9XG5cbiAgY29udmVydChzb3VyY2U6IE9jYy5DYXJ0LCB0YXJnZXQ/OiBDYXJ0KTogQ2FydCB7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQgPSB7IC4uLihzb3VyY2UgYXMgYW55KSB9IGFzIENhcnQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVEdXBsaWNhdGVQcm9tb3Rpb25zKHNvdXJjZSwgdGFyZ2V0KTtcblxuICAgIGlmIChzb3VyY2UuZW50cmllcykge1xuICAgICAgdGFyZ2V0LmVudHJpZXMgPSBzb3VyY2UuZW50cmllcy5tYXAoKGVudHJ5KSA9PiAoe1xuICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgcHJvZHVjdDogdGhpcy5jb252ZXJ0ZXIuY29udmVydChlbnRyeS5wcm9kdWN0LCBQUk9EVUNUX05PUk1BTElaRVIpLFxuICAgICAgICBwcm9tb3Rpb25zOiB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KFxuICAgICAgICAgIHsgaXRlbTogZW50cnksIHByb21vdGlvbnM6IHRhcmdldD8uYXBwbGllZFByb2R1Y3RQcm9tb3Rpb25zIH0sXG4gICAgICAgICAgT1JERVJfRU5UUllfUFJPTU9USU9OU19OT1JNQUxJWkVSXG4gICAgICAgICksXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGR1cGxpY2F0ZSBwcm9tb3Rpb25zXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZUR1cGxpY2F0ZVByb21vdGlvbnMoc291cmNlOiBhbnksIHRhcmdldDogQ2FydCk6IHZvaWQge1xuICAgIGlmIChzb3VyY2UgJiYgc291cmNlLnBvdGVudGlhbE9yZGVyUHJvbW90aW9ucykge1xuICAgICAgdGFyZ2V0LnBvdGVudGlhbE9yZGVyUHJvbW90aW9ucyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlSXRlbXMoXG4gICAgICAgIHNvdXJjZS5wb3RlbnRpYWxPcmRlclByb21vdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZSAmJiBzb3VyY2UucG90ZW50aWFsUHJvZHVjdFByb21vdGlvbnMpIHtcbiAgICAgIHRhcmdldC5wb3RlbnRpYWxQcm9kdWN0UHJvbW90aW9ucyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlSXRlbXMoXG4gICAgICAgIHNvdXJjZS5wb3RlbnRpYWxQcm9kdWN0UHJvbW90aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlICYmIHNvdXJjZS5hcHBsaWVkT3JkZXJQcm9tb3Rpb25zKSB7XG4gICAgICB0YXJnZXQuYXBwbGllZE9yZGVyUHJvbW90aW9ucyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlSXRlbXMoXG4gICAgICAgIHNvdXJjZS5hcHBsaWVkT3JkZXJQcm9tb3Rpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2UgJiYgc291cmNlLmFwcGxpZWRQcm9kdWN0UHJvbW90aW9ucykge1xuICAgICAgdGFyZ2V0LmFwcGxpZWRQcm9kdWN0UHJvbW90aW9ucyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlSXRlbXMoXG4gICAgICAgIHNvdXJjZS5hcHBsaWVkUHJvZHVjdFByb21vdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVEdXBsaWNhdGVJdGVtcyhpdGVtTGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGl0ZW1MaXN0LmZpbHRlcigocCwgaSwgYSkgPT4ge1xuICAgICAgY29uc3QgYiA9IGEubWFwKChlbCkgPT4gSlNPTi5zdHJpbmdpZnkoZWwpKTtcbiAgICAgIHJldHVybiBpID09PSBiLmluZGV4T2YoSlNPTi5zdHJpbmdpZnkocCkpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=