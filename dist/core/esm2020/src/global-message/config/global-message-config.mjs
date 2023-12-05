/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { GlobalMessageType } from '../models/global-message.model';
import * as i0 from "@angular/core";
export class GlobalMessageConfig {
}
GlobalMessageConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GlobalMessageConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLW1lc3NhZ2UtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvY29uZmlnL2dsb2JhbC1tZXNzYWdlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBVW5FLE1BQU0sT0FBZ0IsbUJBQW1COztnSEFBbkIsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FIM0IsTUFBTSxlQUNMLE1BQU07MkZBRUMsbUJBQW1CO2tCQUp4QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLXRva2Vucyc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlVHlwZSB9IGZyb20gJy4uL21vZGVscy9nbG9iYWwtbWVzc2FnZS5tb2RlbCc7XG5cbmV4cG9ydCB0eXBlIEdsb2JhbE1lc3NhZ2VUeXBlQ29uZmlnID0ge1xuICB0aW1lb3V0PzogbnVtYmVyO1xufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUV4aXN0aW5nOiBDb25maWcsXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdsb2JhbE1lc3NhZ2VDb25maWcge1xuICBnbG9iYWxNZXNzYWdlcz86IHtcbiAgICBbR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXT86IEdsb2JhbE1lc3NhZ2VUeXBlQ29uZmlnO1xuICAgIFtHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9JTkZPXT86IEdsb2JhbE1lc3NhZ2VUeXBlQ29uZmlnO1xuICAgIFtHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUl0/OiBHbG9iYWxNZXNzYWdlVHlwZUNvbmZpZztcbiAgICBbR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfV0FSTklOR10/OiBHbG9iYWxNZXNzYWdlVHlwZUNvbmZpZztcbiAgICBbR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQVNTSVNUSVZFXT86IEdsb2JhbE1lc3NhZ2VUeXBlQ29uZmlnO1xuICB9O1xufVxuXG5kZWNsYXJlIG1vZHVsZSAnLi4vLi4vY29uZmlnL2NvbmZpZy10b2tlbnMnIHtcbiAgaW50ZXJmYWNlIENvbmZpZyBleHRlbmRzIEdsb2JhbE1lc3NhZ2VDb25maWcge31cbn1cbiJdfQ==