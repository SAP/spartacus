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
export class OccOrderNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.entries) {
            target.entries = source.entries.map((entry) => this.convertOrderEntry(entry, source.code, source.appliedProductPromotions));
        }
        if (source.consignments) {
            target.consignments = source.consignments.map((consignment) => ({
                ...consignment,
                entries: consignment.entries?.map((entry) => ({
                    ...entry,
                    orderEntry: this.convertOrderEntry(entry.orderEntry, source.code, source.appliedProductPromotions),
                })),
            }));
        }
        if (source.unconsignedEntries) {
            target.unconsignedEntries = source.unconsignedEntries.map((entry) => this.convertOrderEntry(entry, source.code, source.appliedProductPromotions));
        }
        return target;
    }
    convertOrderEntry(source, code, promotions) {
        return {
            ...source,
            product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
            orderCode: code,
            promotions: this.converter.convert({ item: source, promotions: promotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER),
        };
    }
}
OccOrderNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZGVyLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvb2NjL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLW9yZGVyLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlDQUFpQyxHQUVsQyxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFJTCxrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBSXpCLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBRyxDQUFDO0lBRW5ELE9BQU8sQ0FBQyxNQUFpQixFQUFFLE1BQWM7UUFDdkMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLEdBQUksTUFBYyxFQUFXLENBQUM7U0FDMUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsS0FBSyxFQUNMLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLHdCQUF3QixDQUNoQyxDQUNGLENBQUM7U0FDSDtRQUVELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxHQUFHLFdBQVc7Z0JBQ2QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxHQUFHLEtBQUs7b0JBQ1IsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FDaEMsS0FBSyxDQUFDLFVBQVUsRUFDaEIsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsd0JBQXdCLENBQ2hDO2lCQUNGLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTtZQUM3QixNQUFNLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ2xFLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsS0FBSyxFQUNMLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLHdCQUF3QixDQUNoQyxDQUNGLENBQUM7U0FDSDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxpQkFBaUIsQ0FDdkIsTUFBdUIsRUFDdkIsSUFBYSxFQUNiLFVBQThCO1FBRTlCLE9BQU87WUFDTCxHQUFHLE1BQU07WUFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztZQUNwRSxTQUFTLEVBQUUsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDaEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFDeEMsaUNBQWlDLENBQ2xDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OytHQTNEVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQURMLE1BQU07MkZBQ25CLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBPcmRlckVudHJ5LFxuICBPUkRFUl9FTlRSWV9QUk9NT1RJT05TX05PUk1BTElaRVIsXG4gIFByb21vdGlvblJlc3VsdCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXIsXG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIE9jYyxcbiAgUFJPRFVDVF9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY09yZGVyTm9ybWFsaXplciBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuT3JkZXIsIE9yZGVyPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlKSB7fVxuXG4gIGNvbnZlcnQoc291cmNlOiBPY2MuT3JkZXIsIHRhcmdldD86IE9yZGVyKTogT3JkZXIge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBPcmRlcjtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlLmVudHJpZXMpIHtcbiAgICAgIHRhcmdldC5lbnRyaWVzID0gc291cmNlLmVudHJpZXMubWFwKChlbnRyeSkgPT5cbiAgICAgICAgdGhpcy5jb252ZXJ0T3JkZXJFbnRyeShcbiAgICAgICAgICBlbnRyeSxcbiAgICAgICAgICBzb3VyY2UuY29kZSxcbiAgICAgICAgICBzb3VyY2UuYXBwbGllZFByb2R1Y3RQcm9tb3Rpb25zXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZS5jb25zaWdubWVudHMpIHtcbiAgICAgIHRhcmdldC5jb25zaWdubWVudHMgPSBzb3VyY2UuY29uc2lnbm1lbnRzLm1hcCgoY29uc2lnbm1lbnQpID0+ICh7XG4gICAgICAgIC4uLmNvbnNpZ25tZW50LFxuICAgICAgICBlbnRyaWVzOiBjb25zaWdubWVudC5lbnRyaWVzPy5tYXAoKGVudHJ5KSA9PiAoe1xuICAgICAgICAgIC4uLmVudHJ5LFxuICAgICAgICAgIG9yZGVyRW50cnk6IHRoaXMuY29udmVydE9yZGVyRW50cnkoXG4gICAgICAgICAgICBlbnRyeS5vcmRlckVudHJ5LFxuICAgICAgICAgICAgc291cmNlLmNvZGUsXG4gICAgICAgICAgICBzb3VyY2UuYXBwbGllZFByb2R1Y3RQcm9tb3Rpb25zXG4gICAgICAgICAgKSxcbiAgICAgICAgfSkpLFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2UudW5jb25zaWduZWRFbnRyaWVzKSB7XG4gICAgICB0YXJnZXQudW5jb25zaWduZWRFbnRyaWVzID0gc291cmNlLnVuY29uc2lnbmVkRW50cmllcy5tYXAoKGVudHJ5KSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRPcmRlckVudHJ5KFxuICAgICAgICAgIGVudHJ5LFxuICAgICAgICAgIHNvdXJjZS5jb2RlLFxuICAgICAgICAgIHNvdXJjZS5hcHBsaWVkUHJvZHVjdFByb21vdGlvbnNcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0T3JkZXJFbnRyeShcbiAgICBzb3VyY2U/OiBPY2MuT3JkZXJFbnRyeSxcbiAgICBjb2RlPzogc3RyaW5nLFxuICAgIHByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXVxuICApOiBPcmRlckVudHJ5IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc291cmNlLFxuICAgICAgcHJvZHVjdDogdGhpcy5jb252ZXJ0ZXIuY29udmVydChzb3VyY2U/LnByb2R1Y3QsIFBST0RVQ1RfTk9STUFMSVpFUiksXG4gICAgICBvcmRlckNvZGU6IGNvZGUsXG4gICAgICBwcm9tb3Rpb25zOiB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KFxuICAgICAgICB7IGl0ZW06IHNvdXJjZSwgcHJvbW90aW9uczogcHJvbW90aW9ucyB9LFxuICAgICAgICBPUkRFUl9FTlRSWV9QUk9NT1RJT05TX05PUk1BTElaRVJcbiAgICAgICksXG4gICAgfTtcbiAgfVxufVxuIl19