/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, inject } from '@angular/core';
import { I18NEXT_INSTANCE } from './i18next-instance';
import { I18NEXT_LOGGER_PLUGIN } from './i18next-plugins/i18next-logger-plugin';
import * as i0 from "@angular/core";
import * as i1 from "../config/i18n-config";
import * as i2 from "../../site-context/facade/language.service";
import * as i3 from "./i18next-backend/i18next-backend.service";
/**
 * Initializes the i18next instance.
 */
export class I18nextInitializer {
    constructor(i18next, config, languageService, i18nextBackendService) {
        this.i18next = i18next;
        this.config = config;
        this.languageService = languageService;
        this.i18nextBackendService = i18nextBackendService;
        this.loggerPlugin = inject(I18NEXT_LOGGER_PLUGIN);
    }
    /**
     * Initializes the i18next instance.
     *
     * @returns Promise that resolves when the i18next instance is initialized.
     */
    initialize() {
        const i18nextConfig = this.getI18nextConfig();
        return this.i18next.use(this.loggerPlugin).init(i18nextConfig, () => {
            // Don't use i18next's 'resources' config key for adding static translations,
            // because it will disable loading chunks from backend. We add resources here, in the init's callback.
            this.addTranslationResources();
            this.synchronizeLanguage();
        });
    }
    /**
     * Returns the configuration for initializing an i18next instance.
     */
    getI18nextConfig() {
        let i18nextConfig = {
            ns: [],
            fallbackLng: this.config.i18n?.fallbackLang,
            debug: this.config.i18n?.debug,
            interpolation: {
                escapeValue: false,
                skipOnVariables: false,
            },
        };
        if (this.config.i18n?.backend) {
            i18nextConfig = {
                ...i18nextConfig,
                ...this.i18nextBackendService.initialize(),
            };
        }
        return i18nextConfig;
    }
    /**
     * Populates the i18next instance with the given static translations.
     *
     * @param i18next i18next instance
     * @param resources translation resources
     */
    addTranslationResources() {
        const resources = this.config.i18n?.resources ?? {};
        Object.keys(resources).forEach((lang) => {
            Object.keys(resources[lang]).forEach((chunkName) => {
                this.i18next.addResourceBundle(lang, chunkName, resources[lang][chunkName], true, true);
            });
        });
    }
    /**
     * Ensures that when the site context language changes,
     * the i18next instance is updated with the new language.
     */
    synchronizeLanguage() {
        this.subscription =
            this.subscription ??
                this.languageService
                    .getActive()
                    .subscribe((lang) => this.i18next.changeLanguage(lang));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
I18nextInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextInitializer, deps: [{ token: I18NEXT_INSTANCE }, { token: i1.I18nConfig }, { token: i2.LanguageService }, { token: i3.I18nextBackendService }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_INSTANCE]
                }] }, { type: i1.I18nConfig }, { type: i2.LanguageService }, { type: i3.I18nextBackendService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vaTE4bmV4dC9pMThuZXh0LWluaXRpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7O0FBRWhGOztHQUVHO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQUc3QixZQUNzQyxPQUFhLEVBQ3ZDLE1BQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLHFCQUE0QztRQUhsQixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFOeEQsaUJBQVksR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQU8xQyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNILFVBQVU7UUFDUixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRSw2RUFBNkU7WUFDN0Usc0dBQXNHO1lBQ3RHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ08sZ0JBQWdCO1FBQ3hCLElBQUksYUFBYSxHQUFnQjtZQUMvQixFQUFFLEVBQUUsRUFBRTtZQUNOLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZO1lBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsZUFBZSxFQUFFLEtBQUs7YUFDdkI7U0FDRixDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDN0IsYUFBYSxHQUFHO2dCQUNkLEdBQUcsYUFBYTtnQkFDaEIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFO2FBQzNDLENBQUM7U0FDSDtRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLHVCQUF1QjtRQUMvQixNQUFNLFNBQVMsR0FBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQzVCLElBQUksRUFDSixTQUFTLEVBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUMxQixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlEOzs7T0FHRztJQUNPLG1CQUFtQjtRQUMzQixJQUFJLENBQUMsWUFBWTtZQUNmLElBQUksQ0FBQyxZQUFZO2dCQUNqQixJQUFJLENBQUMsZUFBZTtxQkFDakIsU0FBUyxFQUFFO3FCQUNYLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7K0dBdEZVLGtCQUFrQixrQkFJbkIsZ0JBQWdCO21IQUpmLGtCQUFrQixjQURMLE1BQU07MkZBQ25CLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQUs3QixNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgSW5pdE9wdGlvbnMsIGkxOG4gfSBmcm9tICdpMThuZXh0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2l0ZS1jb250ZXh0L2ZhY2FkZS9sYW5ndWFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEkxOG5Db25maWcgfSBmcm9tICcuLi9jb25maWcvaTE4bi1jb25maWcnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25SZXNvdXJjZXMgfSBmcm9tICcuLi90cmFuc2xhdGlvbi1yZXNvdXJjZXMnO1xuaW1wb3J0IHsgSTE4bmV4dEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9pMThuZXh0LWJhY2tlbmQvaTE4bmV4dC1iYWNrZW5kLnNlcnZpY2UnO1xuaW1wb3J0IHsgSTE4TkVYVF9JTlNUQU5DRSB9IGZyb20gJy4vaTE4bmV4dC1pbnN0YW5jZSc7XG5pbXBvcnQgeyBJMThORVhUX0xPR0dFUl9QTFVHSU4gfSBmcm9tICcuL2kxOG5leHQtcGx1Z2lucy9pMThuZXh0LWxvZ2dlci1wbHVnaW4nO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBpMThuZXh0IGluc3RhbmNlLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEkxOG5leHRJbml0aWFsaXplciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGxvZ2dlclBsdWdpbiA9IGluamVjdChJMThORVhUX0xPR0dFUl9QTFVHSU4pO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSTE4TkVYVF9JTlNUQU5DRSkgcHJvdGVjdGVkIGkxOG5leHQ6IGkxOG4sXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogSTE4bkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGkxOG5leHRCYWNrZW5kU2VydmljZTogSTE4bmV4dEJhY2tlbmRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGkxOG5leHQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBpMThuZXh0IGluc3RhbmNlIGlzIGluaXRpYWxpemVkLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGkxOG5leHRDb25maWcgPSB0aGlzLmdldEkxOG5leHRDb25maWcoKTtcbiAgICByZXR1cm4gdGhpcy5pMThuZXh0LnVzZSh0aGlzLmxvZ2dlclBsdWdpbikuaW5pdChpMThuZXh0Q29uZmlnLCAoKSA9PiB7XG4gICAgICAvLyBEb24ndCB1c2UgaTE4bmV4dCdzICdyZXNvdXJjZXMnIGNvbmZpZyBrZXkgZm9yIGFkZGluZyBzdGF0aWMgdHJhbnNsYXRpb25zLFxuICAgICAgLy8gYmVjYXVzZSBpdCB3aWxsIGRpc2FibGUgbG9hZGluZyBjaHVua3MgZnJvbSBiYWNrZW5kLiBXZSBhZGQgcmVzb3VyY2VzIGhlcmUsIGluIHRoZSBpbml0J3MgY2FsbGJhY2suXG4gICAgICB0aGlzLmFkZFRyYW5zbGF0aW9uUmVzb3VyY2VzKCk7XG4gICAgICB0aGlzLnN5bmNocm9uaXplTGFuZ3VhZ2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb25maWd1cmF0aW9uIGZvciBpbml0aWFsaXppbmcgYW4gaTE4bmV4dCBpbnN0YW5jZS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRJMThuZXh0Q29uZmlnKCk6IEluaXRPcHRpb25zIHtcbiAgICBsZXQgaTE4bmV4dENvbmZpZzogSW5pdE9wdGlvbnMgPSB7XG4gICAgICBuczogW10sIC8vIGRvbid0IHByZWxvYWQgYW55IG5hbWVzcGFjZXNcbiAgICAgIGZhbGxiYWNrTG5nOiB0aGlzLmNvbmZpZy5pMThuPy5mYWxsYmFja0xhbmcsXG4gICAgICBkZWJ1ZzogdGhpcy5jb25maWcuaTE4bj8uZGVidWcsXG4gICAgICBpbnRlcnBvbGF0aW9uOiB7XG4gICAgICAgIGVzY2FwZVZhbHVlOiBmYWxzZSxcbiAgICAgICAgc2tpcE9uVmFyaWFibGVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5pMThuPy5iYWNrZW5kKSB7XG4gICAgICBpMThuZXh0Q29uZmlnID0ge1xuICAgICAgICAuLi5pMThuZXh0Q29uZmlnLFxuICAgICAgICAuLi50aGlzLmkxOG5leHRCYWNrZW5kU2VydmljZS5pbml0aWFsaXplKCksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBpMThuZXh0Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvcHVsYXRlcyB0aGUgaTE4bmV4dCBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiBzdGF0aWMgdHJhbnNsYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gaTE4bmV4dCBpMThuZXh0IGluc3RhbmNlXG4gICAqIEBwYXJhbSByZXNvdXJjZXMgdHJhbnNsYXRpb24gcmVzb3VyY2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkVHJhbnNsYXRpb25SZXNvdXJjZXMoKTogdm9pZCB7XG4gICAgY29uc3QgcmVzb3VyY2VzOiBUcmFuc2xhdGlvblJlc291cmNlcyA9IHRoaXMuY29uZmlnLmkxOG4/LnJlc291cmNlcyA/PyB7fTtcbiAgICBPYmplY3Qua2V5cyhyZXNvdXJjZXMpLmZvckVhY2goKGxhbmcpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHJlc291cmNlc1tsYW5nXSkuZm9yRWFjaCgoY2h1bmtOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuaTE4bmV4dC5hZGRSZXNvdXJjZUJ1bmRsZShcbiAgICAgICAgICBsYW5nLFxuICAgICAgICAgIGNodW5rTmFtZSxcbiAgICAgICAgICByZXNvdXJjZXNbbGFuZ11bY2h1bmtOYW1lXSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgd2hlbiB0aGUgc2l0ZSBjb250ZXh0IGxhbmd1YWdlIGNoYW5nZXMsXG4gICAqIHRoZSBpMThuZXh0IGluc3RhbmNlIGlzIHVwZGF0ZWQgd2l0aCB0aGUgbmV3IGxhbmd1YWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN5bmNocm9uaXplTGFuZ3VhZ2UoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPz9cbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlXG4gICAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgICAuc3Vic2NyaWJlKChsYW5nKSA9PiB0aGlzLmkxOG5leHQuY2hhbmdlTGFuZ3VhZ2UobGFuZykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==