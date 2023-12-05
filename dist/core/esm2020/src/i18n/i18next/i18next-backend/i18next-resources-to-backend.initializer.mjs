/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable } from '@angular/core';
import I18nextResourcesToBackend from 'i18next-resources-to-backend';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import * as i0 from "@angular/core";
import * as i1 from "../../config/i18n-config";
export class I18nextResourcesToBackendInitializer {
    constructor(config, i18next) {
        this.config = config;
        this.i18next = i18next;
    }
    hasMatch() {
        return !!this.config.i18n?.backend?.loader;
    }
    initialize() {
        const loader = this.config.i18n?.backend?.loader;
        if (!loader) {
            throw new Error('Missing config `i18n.backend.loader`.');
        }
        this.i18next.use(I18nextResourcesToBackend(loader));
        return { backend: {} };
    }
}
I18nextResourcesToBackendInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextResourcesToBackendInitializer, deps: [{ token: i1.I18nConfig }, { token: I18NEXT_INSTANCE }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextResourcesToBackendInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextResourcesToBackendInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextResourcesToBackendInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.I18nConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_INSTANCE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1yZXNvdXJjZXMtdG8tYmFja2VuZC5pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vaTE4bmV4dC9pMThuZXh0LWJhY2tlbmQvaTE4bmV4dC1yZXNvdXJjZXMtdG8tYmFja2VuZC5pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyx5QkFBeUIsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBSXZELE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFDWSxNQUFrQixFQUNRLE9BQWE7UUFEdkMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNRLFlBQU8sR0FBUCxPQUFPLENBQU07SUFDaEQsQ0FBQztJQUVKLFFBQVE7UUFDTixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztRQUVqRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7O2lJQXRCVSxvQ0FBb0MsNENBS3JDLGdCQUFnQjtxSUFMZixvQ0FBb0MsY0FEdkIsTUFBTTsyRkFDbkIsb0NBQW9DO2tCQURoRCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBTTdCLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpMThuLCBJbml0T3B0aW9ucyB9IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IEkxOG5leHRSZXNvdXJjZXNUb0JhY2tlbmQgZnJvbSAnaTE4bmV4dC1yZXNvdXJjZXMtdG8tYmFja2VuZCc7XG5pbXBvcnQgeyBJMThuQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2kxOG4tY29uZmlnJztcbmltcG9ydCB7IEkxOE5FWFRfSU5TVEFOQ0UgfSBmcm9tICcuLi9pMThuZXh0LWluc3RhbmNlJztcbmltcG9ydCB7IEkxOG5leHRCYWNrZW5kSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2kxOG5leHQtYmFja2VuZC5pbml0aWFsaXplcic7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSTE4bmV4dFJlc291cmNlc1RvQmFja2VuZEluaXRpYWxpemVyXG4gIGltcGxlbWVudHMgSTE4bmV4dEJhY2tlbmRJbml0aWFsaXplclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBJMThuQ29uZmlnLFxuICAgIEBJbmplY3QoSTE4TkVYVF9JTlNUQU5DRSkgcHJvdGVjdGVkIGkxOG5leHQ6IGkxOG5cbiAgKSB7fVxuXG4gIGhhc01hdGNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY29uZmlnLmkxOG4/LmJhY2tlbmQ/LmxvYWRlcjtcbiAgfVxuXG4gIGluaXRpYWxpemUoKTogSW5pdE9wdGlvbnMge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuY29uZmlnLmkxOG4/LmJhY2tlbmQ/LmxvYWRlcjtcblxuICAgIGlmICghbG9hZGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29uZmlnIGBpMThuLmJhY2tlbmQubG9hZGVyYC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmkxOG5leHQudXNlKEkxOG5leHRSZXNvdXJjZXNUb0JhY2tlbmQobG9hZGVyKSk7XG5cbiAgICByZXR1cm4geyBiYWNrZW5kOiB7fSB9O1xuICB9XG59XG4iXX0=