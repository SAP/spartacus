/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PersistFocusService } from '../persist/persist-focus.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/select-focus.util";
export class EscapeFocusService extends PersistFocusService {
    constructor(selectFocusUtil) {
        super();
        this.selectFocusUtil = selectFocusUtil;
    }
    shouldFocus(config) {
        return !!config?.focusOnEscape;
    }
    handleEscape(host, config, event) {
        if (this.shouldFocus(config)) {
            if (host !== event.target) {
                host.focus({ preventScroll: true });
                event.preventDefault();
                event.stopPropagation();
            }
            else {
                if (config?.focusOnDoubleEscape) {
                    this.selectFocusUtil
                        .findFirstFocusable(host, { autofocus: true })
                        ?.focus();
                }
            }
        }
    }
}
EscapeFocusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EscapeFocusService, deps: [{ token: i1.SelectFocusUtility }], target: i0.ɵɵFactoryTarget.Injectable });
EscapeFocusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EscapeFocusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EscapeFocusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SelectFocusUtility }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlLWZvY3VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2VzY2FwZS9lc2NhcGUtZm9jdXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBTXZFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxtQkFBbUI7SUFDekQsWUFBc0IsZUFBbUM7UUFDdkQsS0FBSyxFQUFFLENBQUM7UUFEWSxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7SUFFekQsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUF5QjtRQUNuQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQ1YsSUFBaUIsRUFDakIsTUFBeUIsRUFDekIsS0FBb0I7UUFFcEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxlQUFlO3lCQUNqQixrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQzlDLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ2I7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7K0dBM0JVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVzY2FwZUZvY3VzQ29uZmlnIH0gZnJvbSAnLi4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgUGVyc2lzdEZvY3VzU2VydmljZSB9IGZyb20gJy4uL3BlcnNpc3QvcGVyc2lzdC1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdEZvY3VzVXRpbGl0eSB9IGZyb20gJy4uL3NlcnZpY2VzL3NlbGVjdC1mb2N1cy51dGlsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEVzY2FwZUZvY3VzU2VydmljZSBleHRlbmRzIFBlcnNpc3RGb2N1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VsZWN0Rm9jdXNVdGlsOiBTZWxlY3RGb2N1c1V0aWxpdHkpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2hvdWxkRm9jdXMoY29uZmlnOiBFc2NhcGVGb2N1c0NvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNvbmZpZz8uZm9jdXNPbkVzY2FwZTtcbiAgfVxuXG4gIGhhbmRsZUVzY2FwZShcbiAgICBob3N0OiBIVE1MRWxlbWVudCxcbiAgICBjb25maWc6IEVzY2FwZUZvY3VzQ29uZmlnLFxuICAgIGV2ZW50OiBLZXlib2FyZEV2ZW50XG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3VsZEZvY3VzKGNvbmZpZykpIHtcbiAgICAgIGlmIChob3N0ICE9PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgaG9zdC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbmZpZz8uZm9jdXNPbkRvdWJsZUVzY2FwZSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNVdGlsXG4gICAgICAgICAgICAuZmluZEZpcnN0Rm9jdXNhYmxlKGhvc3QsIHsgYXV0b2ZvY3VzOiB0cnVlIH0pXG4gICAgICAgICAgICA/LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==