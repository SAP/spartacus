/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OrderEntryPromotionsNormalizer {
    convert(source, target) {
        target = this.getProductPromotion(source.item, source.promotions);
        return target;
    }
    /**
     * Get consumed promotions for the given order entry
     *
     * @param item
     * @param promotions
     * @returns consumed promotions for this entry
     */
    getProductPromotion(item, promotions) {
        const entryPromotions = [];
        promotions?.forEach((promotion) => {
            if (promotion.description && promotion.consumedEntries) {
                for (const consumedEntry of promotion.consumedEntries) {
                    if (this.isConsumedByEntry(consumedEntry, item)) {
                        entryPromotions.push(promotion);
                    }
                }
            }
        });
        return entryPromotions;
    }
    isConsumedByEntry(consumedEntry, entry) {
        const consumedEntryNumber = consumedEntry.orderEntryNumber;
        if (entry && entry.entries && entry.entries.length > 0) {
            for (const subEntry of entry.entries) {
                if (subEntry.entryNumber === consumedEntryNumber) {
                    return true;
                }
            }
            return false;
        }
        else {
            return consumedEntryNumber === entry?.entryNumber;
        }
    }
}
OrderEntryPromotionsNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderEntryPromotionsNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZW50cnktcHJvbW90aW9ucy1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9vY2MvYWRhcHRlcnMvY29udmVydGVycy9vcmRlci1lbnRyeS1wcm9tb3Rpb25zLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sT0FBTyw4QkFBOEI7SUFPekMsT0FBTyxDQUNMLE1BQWlFLEVBQ2pFLE1BQTBCO1FBRTFCLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUNqQixJQUFxQixFQUNyQixVQUE4QjtRQUU5QixNQUFNLGVBQWUsR0FBc0IsRUFBRSxDQUFDO1FBQzlDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLGVBQWUsRUFBRTtnQkFDdEQsS0FBSyxNQUFNLGFBQWEsSUFBSSxTQUFTLENBQUMsZUFBZSxFQUFFO29CQUNyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQy9DLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2pDO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsYUFBMEMsRUFDMUMsS0FBVTtRQUVWLE1BQU0sbUJBQW1CLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQzNELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RELEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDcEMsSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLG1CQUFtQixFQUFFO29CQUNoRCxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxtQkFBbUIsS0FBSyxLQUFLLEVBQUUsV0FBVyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7MkhBdkRVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRGpCLE1BQU07MkZBQ25CLDhCQUE4QjtrQkFEMUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBQcm9tb3Rpb25PcmRlckVudHJ5Q29uc3VtZWQsXG4gIFByb21vdGlvblJlc3VsdCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIE9jYyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT3JkZXJFbnRyeVByb21vdGlvbnNOb3JtYWxpemVyXG4gIGltcGxlbWVudHNcbiAgICBDb252ZXJ0ZXI8XG4gICAgICB7IGl0ZW0/OiBPY2MuT3JkZXJFbnRyeTsgcHJvbW90aW9ucz86IFByb21vdGlvblJlc3VsdFtdIH0sXG4gICAgICBQcm9tb3Rpb25SZXN1bHRbXVxuICAgID5cbntcbiAgY29udmVydChcbiAgICBzb3VyY2U6IHsgaXRlbT86IE9jYy5PcmRlckVudHJ5OyBwcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W10gfSxcbiAgICB0YXJnZXQ/OiBQcm9tb3Rpb25SZXN1bHRbXVxuICApIHtcbiAgICB0YXJnZXQgPSB0aGlzLmdldFByb2R1Y3RQcm9tb3Rpb24oc291cmNlLml0ZW0sIHNvdXJjZS5wcm9tb3Rpb25zKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb25zdW1lZCBwcm9tb3Rpb25zIGZvciB0aGUgZ2l2ZW4gb3JkZXIgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGl0ZW1cbiAgICogQHBhcmFtIHByb21vdGlvbnNcbiAgICogQHJldHVybnMgY29uc3VtZWQgcHJvbW90aW9ucyBmb3IgdGhpcyBlbnRyeVxuICAgKi9cbiAgZ2V0UHJvZHVjdFByb21vdGlvbihcbiAgICBpdGVtPzogT2NjLk9yZGVyRW50cnksXG4gICAgcHJvbW90aW9ucz86IFByb21vdGlvblJlc3VsdFtdXG4gICk6IFByb21vdGlvblJlc3VsdFtdIHtcbiAgICBjb25zdCBlbnRyeVByb21vdGlvbnM6IFByb21vdGlvblJlc3VsdFtdID0gW107XG4gICAgcHJvbW90aW9ucz8uZm9yRWFjaCgocHJvbW90aW9uKSA9PiB7XG4gICAgICBpZiAocHJvbW90aW9uLmRlc2NyaXB0aW9uICYmIHByb21vdGlvbi5jb25zdW1lZEVudHJpZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBjb25zdW1lZEVudHJ5IG9mIHByb21vdGlvbi5jb25zdW1lZEVudHJpZXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0NvbnN1bWVkQnlFbnRyeShjb25zdW1lZEVudHJ5LCBpdGVtKSkge1xuICAgICAgICAgICAgZW50cnlQcm9tb3Rpb25zLnB1c2gocHJvbW90aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeVByb21vdGlvbnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb25zdW1lZEJ5RW50cnkoXG4gICAgY29uc3VtZWRFbnRyeTogUHJvbW90aW9uT3JkZXJFbnRyeUNvbnN1bWVkLFxuICAgIGVudHJ5OiBhbnlcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29uc3VtZWRFbnRyeU51bWJlciA9IGNvbnN1bWVkRW50cnkub3JkZXJFbnRyeU51bWJlcjtcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuZW50cmllcyAmJiBlbnRyeS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qgc3ViRW50cnkgb2YgZW50cnkuZW50cmllcykge1xuICAgICAgICBpZiAoc3ViRW50cnkuZW50cnlOdW1iZXIgPT09IGNvbnN1bWVkRW50cnlOdW1iZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29uc3VtZWRFbnRyeU51bWJlciA9PT0gZW50cnk/LmVudHJ5TnVtYmVyO1xuICAgIH1cbiAgfVxufVxuXG4vLyBDSEVDSyBTT05BUlxuIl19