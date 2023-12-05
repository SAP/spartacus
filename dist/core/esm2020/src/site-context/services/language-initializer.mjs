/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { getContextParameterDefault } from '../config/context-config-utils';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../facade/language.service";
import * as i2 from "./language-state-persistence.service";
import * as i3 from "../../config/config-initializer/config-initializer.service";
export class LanguageInitializer {
    constructor(languageService, languageStatePersistenceService, configInit) {
        this.languageService = languageService;
        this.languageStatePersistenceService = languageStatePersistenceService;
        this.configInit = configInit;
    }
    /**
     * Initializes the value of the active language.
     */
    initialize() {
        this.subscription = this.configInit
            .getStable('context')
            .pipe(
        // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
        switchMap(() => this.languageStatePersistenceService.initSync()), switchMap(() => this.setFallbackValue()))
            .subscribe();
    }
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active language has been already initialized.
     */
    setFallbackValue() {
        return this.configInit
            .getStable('context')
            .pipe(tap((config) => this.setDefaultFromConfig(config)));
    }
    /**
     * Sets the active language value based on the default value from the config,
     * unless the active language has been already initialized.
     */
    setDefaultFromConfig(config) {
        const contextParam = getContextParameterDefault(config, LANGUAGE_CONTEXT_ID);
        if (!this.languageService.isInitialized() && contextParam) {
            this.languageService.setActive(contextParam);
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
LanguageInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageInitializer, deps: [{ token: i1.LanguageService }, { token: i2.LanguageStatePersistenceService }, { token: i3.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
LanguageInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }, { type: i2.LanguageStatePersistenceService }, { type: i3.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UtaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zaXRlLWNvbnRleHQvc2VydmljZXMvbGFuZ3VhZ2UtaW5pdGlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUc1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7QUFJL0QsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNZLGVBQWdDLEVBQ2hDLCtCQUFnRSxFQUNoRSxVQUFvQztRQUZwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0NBQStCLEdBQS9CLCtCQUErQixDQUFpQztRQUNoRSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtJQUM3QyxDQUFDO0lBSUo7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVTthQUNoQyxTQUFTLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUk7UUFDSCxtRUFBbUU7UUFDbkUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUNoRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FDekM7YUFDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ25CLFNBQVMsQ0FBQyxTQUFTLENBQUM7YUFDcEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUN0RSxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNPLG9CQUFvQixDQUFDLE1BQXlCO1FBQ3RELE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUM3QyxNQUFNLEVBQ04sbUJBQW1CLENBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxZQUFZLEVBQUU7WUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Z0hBcERVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRE4sTUFBTTsyRkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQgfSBmcm9tICcuLi9jb25maWcvY29udGV4dC1jb25maWctdXRpbHMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvbGFuZ3VhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMQU5HVUFHRV9DT05URVhUX0lEIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcbmltcG9ydCB7IExhbmd1YWdlU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgfSBmcm9tICcuL2xhbmd1YWdlLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlSW5pdGlhbGl6ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IExhbmd1YWdlU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0luaXQ6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdmFsdWUgb2YgdGhlIGFjdGl2ZSBsYW5ndWFnZS5cbiAgICovXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2NvbnRleHQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIC8vIFRPRE8oIzEyMzUxKTogPC0tLSBwbHVnIGhlcmUgZXhwbGljaXRseSBTaXRlQ29udGV4dFJvdXRlc0hhbmRsZXJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubGFuZ3VhZ2VTdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5pbml0U3luYygpKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuc2V0RmFsbGJhY2tWYWx1ZSgpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHN1YnNjcmlwdGlvbiB0byB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZTpcbiAgICpcbiAgICogU2V0cyB0aGUgZGVmYXVsdCB2YWx1ZSB0YWtlbiBmcm9tIGNvbmZpZywgdW5sZXNzIHRoZSBhY3RpdmUgbGFuZ3VhZ2UgaGFzIGJlZW4gYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICovXG4gIHByb3RlY3RlZCBzZXRGYWxsYmFja1ZhbHVlKCk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2NvbnRleHQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZykgPT4gdGhpcy5zZXREZWZhdWx0RnJvbUNvbmZpZyhjb25maWcpKVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgbGFuZ3VhZ2UgdmFsdWUgYmFzZWQgb24gdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgY29uZmlnLFxuICAgKiB1bmxlc3MgdGhlIGFjdGl2ZSBsYW5ndWFnZSBoYXMgYmVlbiBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIHNldERlZmF1bHRGcm9tQ29uZmlnKGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWcpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0UGFyYW0gPSBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdChcbiAgICAgIGNvbmZpZyxcbiAgICAgIExBTkdVQUdFX0NPTlRFWFRfSURcbiAgICApO1xuICAgIGlmICghdGhpcy5sYW5ndWFnZVNlcnZpY2UuaXNJbml0aWFsaXplZCgpICYmIGNvbnRleHRQYXJhbSkge1xuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2Uuc2V0QWN0aXZlKGNvbnRleHRQYXJhbSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==