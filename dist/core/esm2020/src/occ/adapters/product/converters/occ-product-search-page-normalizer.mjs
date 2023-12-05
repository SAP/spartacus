/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import * as i0 from "@angular/core";
import * as i1 from "../../../../util/converter.service";
export class OccProductSearchPageNormalizer {
    constructor(converterService) {
        this.converterService = converterService;
        /**
         * Specifies the minimal number of top values in case
         * non have been setup by the business.
         */
        this.DEFAULT_TOP_VALUES = 6;
    }
    convert(source, target = {}) {
        target = {
            ...target,
            ...source,
        };
        this.normalizeFacets(target);
        if (source.products) {
            target.products = source.products.map((product) => this.converterService.convert(product, PRODUCT_NORMALIZER));
        }
        return target;
    }
    normalizeFacets(target) {
        this.normalizeFacetValues(target);
        this.normalizeUselessFacets(target);
    }
    /**
     * The (current) backend returns facets with values that do not contribute
     * to the facet navigation much, as the number in the result list will not get
     * behavior, see https://jira.hybris.com/browse/CS-427.
     *
     * As long as this is not in place, we manually filter the facet from the list;
     * any facet that does not have a count < the total results will be dropped from
     * the facets.
     */
    normalizeUselessFacets(target) {
        if (target.facets) {
            target.facets = target.facets.filter((facet) => {
                return (!target.pagination ||
                    !target.pagination.totalResults ||
                    ((!facet.hasOwnProperty('visible') || facet.visible) &&
                        facet.values &&
                        facet.values.find((value) => {
                            return (value.selected ||
                                (value.count ?? 0) < (target.pagination?.totalResults ?? 0));
                        })));
            });
        }
    }
    /*
     * In case there are so-called `topValues` given for the facet values,
     * values are obsolete.
     *
     * `topValues` is a feature in Adaptive Search which can limit a large
     * amount of facet values to a small set (5 by default). As long as the backend
     * provides all facet values AND topValues, we normalize the data to not bother
     * the UI with this specific feature.
     */
    normalizeFacetValues(target) {
        if (target.facets) {
            target.facets = target.facets.map((facetSource) => {
                const { topValues, ...facetTarget } = facetSource;
                facetTarget.topValueCount =
                    topValues && topValues.length > 0
                        ? topValues.length
                        : this.DEFAULT_TOP_VALUES;
                return facetTarget;
            });
        }
    }
}
OccProductSearchPageNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductSearchPageNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccProductSearchPageNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductSearchPageNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductSearchPageNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXByb2R1Y3Qtc2VhcmNoLXBhZ2Utbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9wcm9kdWN0L2NvbnZlcnRlcnMvb2NjLXByb2R1Y3Qtc2VhcmNoLXBhZ2Utbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQzs7O0FBUXZGLE1BQU0sT0FBTyw4QkFBOEI7SUFHekMsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFdEQ7OztXQUdHO1FBQ08sdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBTndCLENBQUM7SUFRMUQsT0FBTyxDQUNMLE1BQTZCLEVBQzdCLFNBQTRCLEVBQUU7UUFFOUIsTUFBTSxHQUFHO1lBQ1AsR0FBRyxNQUFNO1lBQ1QsR0FBSSxNQUFjO1NBQ25CLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FDM0QsQ0FBQztTQUNIO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLGVBQWUsQ0FBQyxNQUF5QjtRQUNqRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNPLHNCQUFzQixDQUFDLE1BQXlCO1FBQ3hELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdDLE9BQU8sQ0FDTCxDQUFDLE1BQU0sQ0FBQyxVQUFVO29CQUNsQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWTtvQkFDL0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO3dCQUNsRCxLQUFLLENBQUMsTUFBTTt3QkFDWixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUMxQixPQUFPLENBQ0wsS0FBSyxDQUFDLFFBQVE7Z0NBQ2QsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQzVELENBQUM7d0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FDTixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNPLG9CQUFvQixDQUFDLE1BQXlCO1FBQ3RELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBa0IsRUFBRSxFQUFFO2dCQUN2RCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDO2dCQUNsRCxXQUFXLENBQUMsYUFBYTtvQkFDdkIsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDL0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNO3dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUM5QixPQUFPLFdBQVcsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7MkhBbEZVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRGpCLE1BQU07MkZBQ25CLDhCQUE4QjtrQkFEMUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGYWNldCxcbiAgUHJvZHVjdFNlYXJjaFBhZ2UsXG59IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL3Byb2R1Y3Qtc2VhcmNoLm1vZGVsJztcbmltcG9ydCB7IFBST0RVQ1RfTk9STUFMSVpFUiB9IGZyb20gJy4uLy4uLy4uLy4uL3Byb2R1Y3QvY29ubmVjdG9ycy9wcm9kdWN0L2NvbnZlcnRlcnMnO1xuaW1wb3J0IHtcbiAgQ29udmVydGVyLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2NvbnZlcnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9jYyB9IGZyb20gJy4uLy4uLy4uL29jYy1tb2RlbHMvb2NjLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjUHJvZHVjdFNlYXJjaFBhZ2VOb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jYy5Qcm9kdWN0U2VhcmNoUGFnZSwgUHJvZHVjdFNlYXJjaFBhZ2U+XG57XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZSkge31cblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoZSBtaW5pbWFsIG51bWJlciBvZiB0b3AgdmFsdWVzIGluIGNhc2VcbiAgICogbm9uIGhhdmUgYmVlbiBzZXR1cCBieSB0aGUgYnVzaW5lc3MuXG4gICAqL1xuICBwcm90ZWN0ZWQgREVGQVVMVF9UT1BfVkFMVUVTID0gNjtcblxuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjLlByb2R1Y3RTZWFyY2hQYWdlLFxuICAgIHRhcmdldDogUHJvZHVjdFNlYXJjaFBhZ2UgPSB7fVxuICApOiBQcm9kdWN0U2VhcmNoUGFnZSB7XG4gICAgdGFyZ2V0ID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgLi4uKHNvdXJjZSBhcyBhbnkpLFxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZUZhY2V0cyh0YXJnZXQpO1xuICAgIGlmIChzb3VyY2UucHJvZHVjdHMpIHtcbiAgICAgIHRhcmdldC5wcm9kdWN0cyA9IHNvdXJjZS5wcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+XG4gICAgICAgIHRoaXMuY29udmVydGVyU2VydmljZS5jb252ZXJ0KHByb2R1Y3QsIFBST0RVQ1RfTk9STUFMSVpFUilcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm9ybWFsaXplRmFjZXRzKHRhcmdldDogUHJvZHVjdFNlYXJjaFBhZ2UpOiB2b2lkIHtcbiAgICB0aGlzLm5vcm1hbGl6ZUZhY2V0VmFsdWVzKHRhcmdldCk7XG4gICAgdGhpcy5ub3JtYWxpemVVc2VsZXNzRmFjZXRzKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIChjdXJyZW50KSBiYWNrZW5kIHJldHVybnMgZmFjZXRzIHdpdGggdmFsdWVzIHRoYXQgZG8gbm90IGNvbnRyaWJ1dGVcbiAgICogdG8gdGhlIGZhY2V0IG5hdmlnYXRpb24gbXVjaCwgYXMgdGhlIG51bWJlciBpbiB0aGUgcmVzdWx0IGxpc3Qgd2lsbCBub3QgZ2V0XG4gICAqIGJlaGF2aW9yLCBzZWUgaHR0cHM6Ly9qaXJhLmh5YnJpcy5jb20vYnJvd3NlL0NTLTQyNy5cbiAgICpcbiAgICogQXMgbG9uZyBhcyB0aGlzIGlzIG5vdCBpbiBwbGFjZSwgd2UgbWFudWFsbHkgZmlsdGVyIHRoZSBmYWNldCBmcm9tIHRoZSBsaXN0O1xuICAgKiBhbnkgZmFjZXQgdGhhdCBkb2VzIG5vdCBoYXZlIGEgY291bnQgPCB0aGUgdG90YWwgcmVzdWx0cyB3aWxsIGJlIGRyb3BwZWQgZnJvbVxuICAgKiB0aGUgZmFjZXRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVVzZWxlc3NGYWNldHModGFyZ2V0OiBQcm9kdWN0U2VhcmNoUGFnZSk6IHZvaWQge1xuICAgIGlmICh0YXJnZXQuZmFjZXRzKSB7XG4gICAgICB0YXJnZXQuZmFjZXRzID0gdGFyZ2V0LmZhY2V0cy5maWx0ZXIoKGZhY2V0KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgIXRhcmdldC5wYWdpbmF0aW9uIHx8XG4gICAgICAgICAgIXRhcmdldC5wYWdpbmF0aW9uLnRvdGFsUmVzdWx0cyB8fFxuICAgICAgICAgICgoIWZhY2V0Lmhhc093blByb3BlcnR5KCd2aXNpYmxlJykgfHwgZmFjZXQudmlzaWJsZSkgJiZcbiAgICAgICAgICAgIGZhY2V0LnZhbHVlcyAmJlxuICAgICAgICAgICAgZmFjZXQudmFsdWVzLmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdmFsdWUuc2VsZWN0ZWQgfHxcbiAgICAgICAgICAgICAgICAodmFsdWUuY291bnQgPz8gMCkgPCAodGFyZ2V0LnBhZ2luYXRpb24/LnRvdGFsUmVzdWx0cyA/PyAwKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBJbiBjYXNlIHRoZXJlIGFyZSBzby1jYWxsZWQgYHRvcFZhbHVlc2AgZ2l2ZW4gZm9yIHRoZSBmYWNldCB2YWx1ZXMsXG4gICAqIHZhbHVlcyBhcmUgb2Jzb2xldGUuXG4gICAqXG4gICAqIGB0b3BWYWx1ZXNgIGlzIGEgZmVhdHVyZSBpbiBBZGFwdGl2ZSBTZWFyY2ggd2hpY2ggY2FuIGxpbWl0IGEgbGFyZ2VcbiAgICogYW1vdW50IG9mIGZhY2V0IHZhbHVlcyB0byBhIHNtYWxsIHNldCAoNSBieSBkZWZhdWx0KS4gQXMgbG9uZyBhcyB0aGUgYmFja2VuZFxuICAgKiBwcm92aWRlcyBhbGwgZmFjZXQgdmFsdWVzIEFORCB0b3BWYWx1ZXMsIHdlIG5vcm1hbGl6ZSB0aGUgZGF0YSB0byBub3QgYm90aGVyXG4gICAqIHRoZSBVSSB3aXRoIHRoaXMgc3BlY2lmaWMgZmVhdHVyZS5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVGYWNldFZhbHVlcyh0YXJnZXQ6IFByb2R1Y3RTZWFyY2hQYWdlKTogdm9pZCB7XG4gICAgaWYgKHRhcmdldC5mYWNldHMpIHtcbiAgICAgIHRhcmdldC5mYWNldHMgPSB0YXJnZXQuZmFjZXRzLm1hcCgoZmFjZXRTb3VyY2U6IEZhY2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdG9wVmFsdWVzLCAuLi5mYWNldFRhcmdldCB9ID0gZmFjZXRTb3VyY2U7XG4gICAgICAgIGZhY2V0VGFyZ2V0LnRvcFZhbHVlQ291bnQgPVxuICAgICAgICAgIHRvcFZhbHVlcyAmJiB0b3BWYWx1ZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0b3BWYWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICA6IHRoaXMuREVGQVVMVF9UT1BfVkFMVUVTO1xuICAgICAgICByZXR1cm4gZmFjZXRUYXJnZXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==