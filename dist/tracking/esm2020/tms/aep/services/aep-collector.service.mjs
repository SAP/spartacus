/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Default Adobe Experience Platform Launch collector.
 */
export class AepCollectorService {
    constructor(scriptLoader) {
        this.scriptLoader = scriptLoader;
    }
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `digitalData`
     */
    init(config, windowObject) {
        const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
        windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? {};
        if (config.scriptUrl) {
            this.scriptLoader.embedScript({ src: config.scriptUrl });
        }
    }
    pushEvent(config, windowObject, event) {
        const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
        windowObject[dataLayerProperty] = {
            ...windowObject[dataLayerProperty],
            ...event,
        };
    }
}
AepCollectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, deps: [{ token: i1.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
AepCollectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVwLWNvbGxlY3Rvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3Rtcy9hZXAvc2VydmljZXMvYWVwLWNvbGxlY3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQXNCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUNwRDs7T0FFRztJQUNILElBQUksQ0FBQyxNQUEwQixFQUFFLFlBQTBCO1FBQ3pELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixJQUFJLGFBQWEsQ0FBQztRQUNwRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFeEUsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FDUCxNQUEwQixFQUMxQixZQUEwQixFQUMxQixLQUFjO1FBRWQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLElBQUksYUFBYSxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO1lBQ2hDLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLEdBQUcsS0FBSztTQUNULENBQUM7SUFDSixDQUFDOztnSEF4QlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3hFdmVudCwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFRtc0NvbGxlY3RvcixcbiAgVG1zQ29sbGVjdG9yQ29uZmlnLFxuICBXaW5kb3dPYmplY3QsXG59IGZyb20gJ0BzcGFydGFjdXMvdHJhY2tpbmcvdG1zL2NvcmUnO1xuaW1wb3J0IHsgQWVwQ29sbGVjdG9yQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2RlZmF1bHQtYWVwLmNvbmZpZyc7XG5cbi8qKlxuICogRGVmYXVsdCBBZG9iZSBFeHBlcmllbmNlIFBsYXRmb3JtIExhdW5jaCBjb2xsZWN0b3IuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQWVwQ29sbGVjdG9yU2VydmljZSBpbXBsZW1lbnRzIFRtc0NvbGxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlcikge31cbiAgLyoqXG4gICAqIElmIHRoZSBgVG1zQ29sbGVjdG9yQ29uZmlnLmRhdGFMYXllclByb3BlcnR5YCBpcyBub3Qgc3BlY2lmaWVkLCBpdCB1c2VzIHRoZSBkZWZhdWx0IGBkaWdpdGFsRGF0YWBcbiAgICovXG4gIGluaXQoY29uZmlnOiBBZXBDb2xsZWN0b3JDb25maWcsIHdpbmRvd09iamVjdDogV2luZG93T2JqZWN0KTogdm9pZCB7XG4gICAgY29uc3QgZGF0YUxheWVyUHJvcGVydHkgPSBjb25maWcuZGF0YUxheWVyUHJvcGVydHkgPz8gJ2RpZ2l0YWxEYXRhJztcbiAgICB3aW5kb3dPYmplY3RbZGF0YUxheWVyUHJvcGVydHldID0gd2luZG93T2JqZWN0W2RhdGFMYXllclByb3BlcnR5XSA/PyB7fTtcblxuICAgIGlmIChjb25maWcuc2NyaXB0VXJsKSB7XG4gICAgICB0aGlzLnNjcmlwdExvYWRlci5lbWJlZFNjcmlwdCh7IHNyYzogY29uZmlnLnNjcmlwdFVybCB9KTtcbiAgICB9XG4gIH1cblxuICBwdXNoRXZlbnQ8VCBleHRlbmRzIEN4RXZlbnQ+KFxuICAgIGNvbmZpZzogVG1zQ29sbGVjdG9yQ29uZmlnLFxuICAgIHdpbmRvd09iamVjdDogV2luZG93T2JqZWN0LFxuICAgIGV2ZW50OiBUIHwgYW55XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGFMYXllclByb3BlcnR5ID0gY29uZmlnLmRhdGFMYXllclByb3BlcnR5ID8/ICdkaWdpdGFsRGF0YSc7XG4gICAgd2luZG93T2JqZWN0W2RhdGFMYXllclByb3BlcnR5XSA9IHtcbiAgICAgIC4uLndpbmRvd09iamVjdFtkYXRhTGF5ZXJQcm9wZXJ0eV0sXG4gICAgICAuLi5ldmVudCxcbiAgICB9O1xuICB9XG59XG4iXX0=