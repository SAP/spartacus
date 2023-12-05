/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccCostCenterNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.active = this.normalizeBoolean(source.active);
        return target;
    }
    /**
     * Returns the boolean value for a string property that is supposed
     * to be of type boolean.
     */
    normalizeBoolean(property) {
        if (property === undefined) {
            return false;
        }
        return typeof property === 'string' ? property === 'true' : property;
    }
}
OccCostCenterNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccCostCenterNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvc3QtY2VudGVyLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY29zdC1jZW50ZXIvY29udmVydGVycy9vY2MtY29zdC1jZW50ZXItbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRM0MsTUFBTSxPQUFPLHVCQUF1QjtJQUdsQyxPQUFPLENBQUMsTUFBc0IsRUFBRSxNQUFtQjtRQUNqRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQWdCLENBQUM7U0FDL0M7UUFDRCxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGdCQUFnQixDQUFDLFFBQXNDO1FBQy9ELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN2RSxDQUFDOztvSEFyQlUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29zdENlbnRlciB9IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL29yZy11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9jY0Nvc3RDZW50ZXJOb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jYy5Db3N0Q2VudGVyLCBDb3N0Q2VudGVyPlxue1xuICBjb252ZXJ0KHNvdXJjZTogT2NjLkNvc3RDZW50ZXIsIHRhcmdldD86IENvc3RDZW50ZXIpOiBDb3N0Q2VudGVyIHtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldCA9IHsgLi4uKHNvdXJjZSBhcyBhbnkpIH0gYXMgQ29zdENlbnRlcjtcbiAgICB9XG4gICAgdGFyZ2V0LmFjdGl2ZSA9IHRoaXMubm9ybWFsaXplQm9vbGVhbihzb3VyY2UuYWN0aXZlKTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm9vbGVhbiB2YWx1ZSBmb3IgYSBzdHJpbmcgcHJvcGVydHkgdGhhdCBpcyBzdXBwb3NlZFxuICAgKiB0byBiZSBvZiB0eXBlIGJvb2xlYW4uXG4gICAqL1xuICBwcm90ZWN0ZWQgbm9ybWFsaXplQm9vbGVhbihwcm9wZXJ0eTogc3RyaW5nIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnID8gcHJvcGVydHkgPT09ICd0cnVlJyA6IHByb3BlcnR5O1xuICB9XG59XG4iXX0=