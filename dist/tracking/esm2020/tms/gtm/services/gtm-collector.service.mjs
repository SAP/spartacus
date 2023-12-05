/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Default Google Tag Manager collector.
 */
export class GtmCollectorService {
    constructor(winRef) {
        this.winRef = winRef;
    }
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
     */
    init(config, windowObject) {
        const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
        windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];
        if (config.gtmId) {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                const f = d.getElementsByTagName(s)[0];
                const j = d.createElement(s);
                const dl = l !== 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode?.insertBefore(j, f);
            })(windowObject, this.winRef.document, 'script', dataLayerProperty, config.gtmId);
        }
    }
    pushEvent(config, windowObject, event) {
        const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
        windowObject[dataLayerProperty].push(event);
    }
}
GtmCollectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
GtmCollectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3RtLWNvbGxlY3Rvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3Rtcy9ndG0vc2VydmljZXMvZ3RtLWNvbGxlY3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQXNCLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBQzNDOztPQUVHO0lBQ0gsSUFBSSxDQUFDLE1BQTBCLEVBQUUsWUFBMEI7UUFDekQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4RSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsQ0FBQyxVQUNDLENBQWUsRUFDZixDQUFXLEVBQ1gsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTO2dCQUVULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQXNCLENBQUM7Z0JBQ2xELE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLEdBQUcsR0FBRyw2Q0FBNkMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMvRCxDQUFDLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQ0EsWUFBWSxFQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUNwQixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQ2IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FDUCxNQUEwQixFQUMxQixZQUEwQixFQUMxQixLQUFjO1FBRWQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDOztnSEExQ1UsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3hFdmVudCwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFRtc0NvbGxlY3RvcixcbiAgVG1zQ29sbGVjdG9yQ29uZmlnLFxuICBXaW5kb3dPYmplY3QsXG59IGZyb20gJ0BzcGFydGFjdXMvdHJhY2tpbmcvdG1zL2NvcmUnO1xuaW1wb3J0IHsgR3RtQ29sbGVjdG9yQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2RlZmF1bHQtZ3RtLmNvbmZpZyc7XG5cbi8qKlxuICogRGVmYXVsdCBHb29nbGUgVGFnIE1hbmFnZXIgY29sbGVjdG9yLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEd0bUNvbGxlY3RvclNlcnZpY2UgaW1wbGVtZW50cyBUbXNDb2xsZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYpIHt9XG4gIC8qKlxuICAgKiBJZiB0aGUgYFRtc0NvbGxlY3RvckNvbmZpZy5kYXRhTGF5ZXJQcm9wZXJ0eWAgaXMgbm90IHNwZWNpZmllZCwgaXQgdXNlcyB0aGUgZGVmYXVsdCBgZGF0YUxheWVyYFxuICAgKi9cbiAgaW5pdChjb25maWc6IEd0bUNvbGxlY3RvckNvbmZpZywgd2luZG93T2JqZWN0OiBXaW5kb3dPYmplY3QpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRhTGF5ZXJQcm9wZXJ0eSA9IGNvbmZpZy5kYXRhTGF5ZXJQcm9wZXJ0eSA/PyAnZGF0YUxheWVyJztcbiAgICB3aW5kb3dPYmplY3RbZGF0YUxheWVyUHJvcGVydHldID0gd2luZG93T2JqZWN0W2RhdGFMYXllclByb3BlcnR5XSA/PyBbXTtcblxuICAgIGlmIChjb25maWcuZ3RtSWQpIHtcbiAgICAgIChmdW5jdGlvbiAoXG4gICAgICAgIHc6IFdpbmRvd09iamVjdCxcbiAgICAgICAgZDogRG9jdW1lbnQsXG4gICAgICAgIHM6IHN0cmluZyxcbiAgICAgICAgbDogc3RyaW5nLFxuICAgICAgICBpOiBzdHJpbmdcbiAgICAgICkge1xuICAgICAgICB3W2xdID0gd1tsXSB8fCBbXTtcbiAgICAgICAgd1tsXS5wdXNoKHsgJ2d0bS5zdGFydCc6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLCBldmVudDogJ2d0bS5qcycgfSk7XG4gICAgICAgIGNvbnN0IGYgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICBjb25zdCBqID0gZC5jcmVhdGVFbGVtZW50KHMpIGFzIEhUTUxTY3JpcHRFbGVtZW50O1xuICAgICAgICBjb25zdCBkbCA9IGwgIT09ICdkYXRhTGF5ZXInID8gJyZsPScgKyBsIDogJyc7XG4gICAgICAgIGouYXN5bmMgPSB0cnVlO1xuICAgICAgICBqLnNyYyA9ICdodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndG0uanM/aWQ9JyArIGkgKyBkbDtcbiAgICAgICAgZi5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoaiwgZik7XG4gICAgICB9KShcbiAgICAgICAgd2luZG93T2JqZWN0LFxuICAgICAgICB0aGlzLndpblJlZi5kb2N1bWVudCxcbiAgICAgICAgJ3NjcmlwdCcsXG4gICAgICAgIGRhdGFMYXllclByb3BlcnR5LFxuICAgICAgICBjb25maWcuZ3RtSWRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVzaEV2ZW50PFQgZXh0ZW5kcyBDeEV2ZW50PihcbiAgICBjb25maWc6IFRtc0NvbGxlY3RvckNvbmZpZyxcbiAgICB3aW5kb3dPYmplY3Q6IFdpbmRvd09iamVjdCxcbiAgICBldmVudDogVCB8IGFueVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBkYXRhTGF5ZXJQcm9wZXJ0eSA9IGNvbmZpZy5kYXRhTGF5ZXJQcm9wZXJ0eSA/PyAnZGF0YUxheWVyJztcbiAgICB3aW5kb3dPYmplY3RbZGF0YUxheWVyUHJvcGVydHldLnB1c2goZXZlbnQpO1xuICB9XG59XG4iXX0=