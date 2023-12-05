/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable } from '@angular/core';
import i18nextHttpBackend from 'i18next-http-backend';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18NEXT_HTTP_BACKEND_CLIENT, } from './i18next-http-backend-client';
import * as i0 from "@angular/core";
import * as i1 from "../../config/i18n-config";
import * as i2 from "../../../window/window-ref";
/**
 * Configures an i18next HTTP backend plugin,
 * to allow for loading translations via HTTP.
 */
export class I18nextHttpBackendInitializer {
    constructor(i18next, i18nextHttpClient, config, windowRef) {
        this.i18next = i18next;
        this.i18nextHttpClient = i18nextHttpClient;
        this.config = config;
        this.windowRef = windowRef;
    }
    /**
     * Tells whether this i18next backend is applicable, based on the configuration.
     */
    hasMatch() {
        return !!this.config.i18n?.backend?.loadPath;
    }
    /**
     * @override
     * Configures an i18next HTTP backend plugin,
     * to allow for loading translations via HTTP.
     */
    initialize() {
        this.i18next.use(i18nextHttpBackend);
        return { backend: this.getBackendConfig() };
    }
    /**
     * Returns the configuration for the i18next-http-backend plugin.
     */
    getBackendConfig() {
        if (!this.config.i18n?.backend?.loadPath) {
            throw new Error('Missing config `i18n.backend.loadPath`.');
        }
        const loadPath = this.getLoadPath(this.config.i18n.backend.loadPath);
        const backend = {
            loadPath,
            request: this.i18nextHttpClient,
            // Disable the periodical reloading. Otherwise SSR would not finish due to the pending task `setInterval()`
            // See source code of `i18next-http-backend` : https://github.com/i18next/i18next-http-backend/blob/00b7e8f67abf8372af17529b51190a7e8b17e3d8/lib/index.js#L40-L41
            reloadInterval: false,
        };
        return backend;
    }
    /**
     * Resolves the relative path to the absolute one in SSR, using the server request's origin.
     * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
     * - https://github.com/angular/angular/issues/19224
     * - https://github.com/angular/universal/issues/858
     */
    getLoadPath(path) {
        if (!this.windowRef.isBrowser() && !path.match(/^http(s)?:\/\//)) {
            if (path.startsWith('/')) {
                path = path.slice('/'.length);
            }
            if (path.startsWith('./')) {
                path = path.slice('./'.length);
            }
            const serverRequestOrigin = this.windowRef.location.origin;
            return `${serverRequestOrigin}/${path}`;
        }
        return path;
    }
}
I18nextHttpBackendInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextHttpBackendInitializer, deps: [{ token: I18NEXT_INSTANCE }, { token: I18NEXT_HTTP_BACKEND_CLIENT }, { token: i1.I18nConfig }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextHttpBackendInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextHttpBackendInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextHttpBackendInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_INSTANCE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_HTTP_BACKEND_CLIENT]
                }] }, { type: i1.I18nConfig }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1odHRwLWJhY2tlbmQuaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL2kxOG5leHQvaTE4bmV4dC1iYWNrZW5kL2kxOG5leHQtaHR0cC1iYWNrZW5kLmluaXRpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLGtCQUFzQyxNQUFNLHNCQUFzQixDQUFDO0FBRzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFFTCwyQkFBMkIsR0FDNUIsTUFBTSwrQkFBK0IsQ0FBQzs7OztBQUV2Qzs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sNkJBQTZCO0lBR3hDLFlBQ3NDLE9BQWEsRUFFdkMsaUJBQTJDLEVBQzNDLE1BQWtCLEVBQ2xCLFNBQW9CO1FBSk0sWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUV2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUM3QixDQUFDO0lBRUo7O09BRUc7SUFDSCxRQUFRO1FBQ04sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDTyxnQkFBZ0I7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckUsTUFBTSxPQUFPLEdBQW1CO1lBQzlCLFFBQVE7WUFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUUvQiwyR0FBMkc7WUFDM0csaUtBQWlLO1lBQ2pLLGNBQWMsRUFBRSxLQUFLO1NBQ3RCLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxXQUFXLENBQUMsSUFBWTtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNoRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDM0QsT0FBTyxHQUFHLG1CQUFtQixJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzswSEFuRVUsNkJBQTZCLGtCQUk5QixnQkFBZ0IsYUFDaEIsMkJBQTJCOzhIQUwxQiw2QkFBNkIsY0FEaEIsTUFBTTsyRkFDbkIsNkJBQTZCO2tCQUR6QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSzdCLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDdkIsTUFBTTsyQkFBQywyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgaTE4biwgSW5pdE9wdGlvbnMgfSBmcm9tICdpMThuZXh0JztcbmltcG9ydCBpMThuZXh0SHR0cEJhY2tlbmQsIHsgQmFja2VuZE9wdGlvbnMgfSBmcm9tICdpMThuZXh0LWh0dHAtYmFja2VuZCc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi93aW5kb3cvd2luZG93LXJlZic7XG5pbXBvcnQgeyBJMThuQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2kxOG4tY29uZmlnJztcbmltcG9ydCB7IEkxOE5FWFRfSU5TVEFOQ0UgfSBmcm9tICcuLi9pMThuZXh0LWluc3RhbmNlJztcbmltcG9ydCB7IEkxOG5leHRCYWNrZW5kSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2kxOG5leHQtYmFja2VuZC5pbml0aWFsaXplcic7XG5pbXBvcnQge1xuICBJMThuZXh0SHR0cEJhY2tlbmRDbGllbnQsXG4gIEkxOE5FWFRfSFRUUF9CQUNLRU5EX0NMSUVOVCxcbn0gZnJvbSAnLi9pMThuZXh0LWh0dHAtYmFja2VuZC1jbGllbnQnO1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgYW4gaTE4bmV4dCBIVFRQIGJhY2tlbmQgcGx1Z2luLFxuICogdG8gYWxsb3cgZm9yIGxvYWRpbmcgdHJhbnNsYXRpb25zIHZpYSBIVFRQLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEkxOG5leHRIdHRwQmFja2VuZEluaXRpYWxpemVyXG4gIGltcGxlbWVudHMgSTE4bmV4dEJhY2tlbmRJbml0aWFsaXplclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEkxOE5FWFRfSU5TVEFOQ0UpIHByb3RlY3RlZCBpMThuZXh0OiBpMThuLFxuICAgIEBJbmplY3QoSTE4TkVYVF9IVFRQX0JBQ0tFTkRfQ0xJRU5UKVxuICAgIHByb3RlY3RlZCBpMThuZXh0SHR0cENsaWVudDogSTE4bmV4dEh0dHBCYWNrZW5kQ2xpZW50LFxuICAgIHByb3RlY3RlZCBjb25maWc6IEkxOG5Db25maWcsXG4gICAgcHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmXG4gICkge31cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGlzIGkxOG5leHQgYmFja2VuZCBpcyBhcHBsaWNhYmxlLCBiYXNlZCBvbiB0aGUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGhhc01hdGNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY29uZmlnLmkxOG4/LmJhY2tlbmQ/LmxvYWRQYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBDb25maWd1cmVzIGFuIGkxOG5leHQgSFRUUCBiYWNrZW5kIHBsdWdpbixcbiAgICogdG8gYWxsb3cgZm9yIGxvYWRpbmcgdHJhbnNsYXRpb25zIHZpYSBIVFRQLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpOiBJbml0T3B0aW9ucyB7XG4gICAgdGhpcy5pMThuZXh0LnVzZShpMThuZXh0SHR0cEJhY2tlbmQpO1xuICAgIHJldHVybiB7IGJhY2tlbmQ6IHRoaXMuZ2V0QmFja2VuZENvbmZpZygpIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGkxOG5leHQtaHR0cC1iYWNrZW5kIHBsdWdpbi5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRCYWNrZW5kQ29uZmlnKCk6IEJhY2tlbmRPcHRpb25zIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmkxOG4/LmJhY2tlbmQ/LmxvYWRQYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29uZmlnIGBpMThuLmJhY2tlbmQubG9hZFBhdGhgLicpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRQYXRoID0gdGhpcy5nZXRMb2FkUGF0aCh0aGlzLmNvbmZpZy5pMThuLmJhY2tlbmQubG9hZFBhdGgpO1xuXG4gICAgY29uc3QgYmFja2VuZDogQmFja2VuZE9wdGlvbnMgPSB7XG4gICAgICBsb2FkUGF0aCxcbiAgICAgIHJlcXVlc3Q6IHRoaXMuaTE4bmV4dEh0dHBDbGllbnQsXG5cbiAgICAgIC8vIERpc2FibGUgdGhlIHBlcmlvZGljYWwgcmVsb2FkaW5nLiBPdGhlcndpc2UgU1NSIHdvdWxkIG5vdCBmaW5pc2ggZHVlIHRvIHRoZSBwZW5kaW5nIHRhc2sgYHNldEludGVydmFsKClgXG4gICAgICAvLyBTZWUgc291cmNlIGNvZGUgb2YgYGkxOG5leHQtaHR0cC1iYWNrZW5kYCA6IGh0dHBzOi8vZ2l0aHViLmNvbS9pMThuZXh0L2kxOG5leHQtaHR0cC1iYWNrZW5kL2Jsb2IvMDBiN2U4ZjY3YWJmODM3MmFmMTc1MjliNTExOTBhN2U4YjE3ZTNkOC9saWIvaW5kZXguanMjTDQwLUw0MVxuICAgICAgcmVsb2FkSW50ZXJ2YWw6IGZhbHNlLFxuICAgIH07XG4gICAgcmV0dXJuIGJhY2tlbmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIHJlbGF0aXZlIHBhdGggdG8gdGhlIGFic29sdXRlIG9uZSBpbiBTU1IsIHVzaW5nIHRoZSBzZXJ2ZXIgcmVxdWVzdCdzIG9yaWdpbi5cbiAgICogSXQncyBuZWVkZWQsIGJlY2F1c2UgQW5ndWxhciBVbml2ZXJzYWwgZG9lc24ndCBzdXBwb3J0IHJlbGF0aXZlIFVSTHMgaW4gSHR0cENsaWVudC4gU2VlIEFuZ3VsYXIgaXNzdWVzOlxuICAgKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5MjI0XG4gICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdW5pdmVyc2FsL2lzc3Vlcy84NThcbiAgICovXG4gIHByb3RlY3RlZCBnZXRMb2FkUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkgJiYgIXBhdGgubWF0Y2goL15odHRwKHMpPzpcXC9cXC8vKSkge1xuICAgICAgaWYgKHBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNsaWNlKCcvJy5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYgKHBhdGguc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgnLi8nLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBzZXJ2ZXJSZXF1ZXN0T3JpZ2luID0gdGhpcy53aW5kb3dSZWYubG9jYXRpb24ub3JpZ2luO1xuICAgICAgcmV0dXJuIGAke3NlcnZlclJlcXVlc3RPcmlnaW59LyR7cGF0aH1gO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxufVxuIl19