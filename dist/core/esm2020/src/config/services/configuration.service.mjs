/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { isFeatureEnabled } from '../../features-config';
import { ConfigChunk, DefaultConfig, DefaultConfigChunk, RootConfig, } from '../config-tokens';
import { deepMerge } from '../utils/deep-merge';
import * as i0 from "@angular/core";
import * as i1 from "../../lazy-loading/unified-injector";
import * as i2 from "../config-tokens";
export class ConfigurationService {
    constructor(rootConfig, defaultConfig, unifiedInjector, config) {
        this.rootConfig = rootConfig;
        this.defaultConfig = defaultConfig;
        this.unifiedInjector = unifiedInjector;
        this.ambientDefaultConfig = {};
        this.ambientConfig = {};
        this.config = config;
        this.unifiedConfig$ = new BehaviorSubject(config);
        // We need to use subscription to propagate changes to the config from the beginning.
        // It will be possible to make it lazy, when we drop this compatibility feature
        // in the future.
        this.subscription = this.feedUnifiedConfig().subscribe();
    }
    feedUnifiedConfig() {
        const configChunks$ = this.unifiedInjector.get(ConfigChunk, []);
        const defaultConfigChunks$ = this.unifiedInjector.get(DefaultConfigChunk, []);
        return zip(configChunks$, defaultConfigChunks$).pipe(
        // we don't need result from the root injector
        skip(1), tap(([configChunks, defaultConfigChunks]) => this.processConfig(configChunks, defaultConfigChunks)));
    }
    processConfig(configChunks, defaultConfigChunks) {
        if (defaultConfigChunks?.length) {
            deepMerge(this.ambientDefaultConfig, ...defaultConfigChunks);
        }
        if (configChunks.length) {
            deepMerge(this.ambientConfig, ...configChunks);
        }
        if (configChunks.length || defaultConfigChunks.length) {
            this.emitUnifiedConfig();
        }
    }
    emitUnifiedConfig() {
        const newConfig = deepMerge({}, this.defaultConfig, this.ambientDefaultConfig, this.ambientConfig, this.rootConfig);
        this.unifiedConfig$.next(newConfig);
        // compatibility mechanism, can be disabled with feature toggle
        if (!isFeatureEnabled(this.config, 'disableConfigUpdates')) {
            deepMerge(this.config, newConfig);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.unifiedConfig$.complete();
    }
}
ConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurationService, deps: [{ token: RootConfig }, { token: DefaultConfig }, { token: i1.UnifiedInjector }, { token: i2.Config }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.Config, decorators: [{
                    type: Inject,
                    args: [RootConfig]
                }] }, { type: i2.Config, decorators: [{
                    type: Inject,
                    args: [DefaultConfig]
                }] }, { type: i1.UnifiedInjector }, { type: i2.Config }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY29uZmlnL3NlcnZpY2VzL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBNEIsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsT0FBTyxFQUVMLFdBQVcsRUFDWCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLFVBQVUsR0FDWCxNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUtoRCxNQUFNLE9BQU8sb0JBQW9CO0lBa0IvQixZQUNnQyxVQUFrQixFQUNmLGFBQXFCLEVBQzVDLGVBQWdDLEVBQzFDLE1BQWM7UUFIZ0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQzVDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVIzQix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFVMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxxRkFBcUY7UUFDckYsK0VBQStFO1FBQy9FLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsTUFBTSxhQUFhLEdBQXlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUNsRSxXQUFXLEVBQ1gsRUFBRSxDQUNILENBQUM7UUFDRixNQUFNLG9CQUFvQixHQUF5QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDekUsa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDSCxDQUFDO1FBRUYsT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSTtRQUNsRCw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUN0RCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYSxDQUFDLFlBQXNCLEVBQUUsbUJBQTZCO1FBQ3pFLElBQUksbUJBQW1CLEVBQUUsTUFBTSxFQUFFO1lBQy9CLFNBQVMsQ0FDUCxJQUFJLENBQUMsb0JBQStDLEVBQ3BELEdBQUcsbUJBQW1CLENBQ3ZCLENBQUM7U0FDSDtRQUNELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLGFBQXdDLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7WUFDckQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLE1BQU0sU0FBUyxHQUFXLFNBQVMsQ0FDakMsRUFBRSxFQUNGLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFDekIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxjQUEwQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqRSwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsRUFBRTtZQUMxRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQWlDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0EsSUFBSSxDQUFDLGNBQTBDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUQsQ0FBQzs7aUhBekZVLG9CQUFvQixrQkFtQnJCLFVBQVUsYUFDVixhQUFhO3FIQXBCWixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFvQkksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB6aXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNraXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzRmVhdHVyZUVuYWJsZWQgfSBmcm9tICcuLi8uLi9mZWF0dXJlcy1jb25maWcnO1xuaW1wb3J0IHsgVW5pZmllZEluamVjdG9yIH0gZnJvbSAnLi4vLi4vbGF6eS1sb2FkaW5nL3VuaWZpZWQtaW5qZWN0b3InO1xuaW1wb3J0IHtcbiAgQ29uZmlnLFxuICBDb25maWdDaHVuayxcbiAgRGVmYXVsdENvbmZpZyxcbiAgRGVmYXVsdENvbmZpZ0NodW5rLFxuICBSb290Q29uZmlnLFxufSBmcm9tICcuLi9jb25maWctdG9rZW5zJztcbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJy4uL3V0aWxzL2RlZXAtbWVyZ2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogV2lsbCBlbWl0IHVuaWZpZWQgY29uZmlndXJhdGlvbiB3aGVuIHNvbWUgYW1iaWVudCBjb25maWd1cmF0aW9uIHdpbGwgYXBwZWFyXG4gICAqXG4gICAqIEFtYmllbnQgY29uZmlndXJhdGlvbiBjYW4gYXBwZWFyIHdoZW4gd2UgbGF6eSBsb2FkIG1vZHVsZSB3aXRoIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHJlYWRvbmx5IHVuaWZpZWRDb25maWckOiBPYnNlcnZhYmxlPENvbmZpZz47XG5cbiAgLyoqXG4gICAqIEdsb2JhbCBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uXG4gICAqL1xuICByZWFkb25seSBjb25maWc6IENvbmZpZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGFtYmllbnREZWZhdWx0Q29uZmlnOiBDb25maWcgPSB7fTtcbiAgcHJpdmF0ZSByZWFkb25seSBhbWJpZW50Q29uZmlnOiBDb25maWcgPSB7fTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUm9vdENvbmZpZykgcHJvdGVjdGVkIHJvb3RDb25maWc6IENvbmZpZyxcbiAgICBASW5qZWN0KERlZmF1bHRDb25maWcpIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBDb25maWcsXG4gICAgcHJvdGVjdGVkIHVuaWZpZWRJbmplY3RvcjogVW5pZmllZEluamVjdG9yLFxuICAgIGNvbmZpZzogQ29uZmlnXG4gICkge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMudW5pZmllZENvbmZpZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGNvbmZpZyk7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVzZSBzdWJzY3JpcHRpb24gdG8gcHJvcGFnYXRlIGNoYW5nZXMgdG8gdGhlIGNvbmZpZyBmcm9tIHRoZSBiZWdpbm5pbmcuXG4gICAgLy8gSXQgd2lsbCBiZSBwb3NzaWJsZSB0byBtYWtlIGl0IGxhenksIHdoZW4gd2UgZHJvcCB0aGlzIGNvbXBhdGliaWxpdHkgZmVhdHVyZVxuICAgIC8vIGluIHRoZSBmdXR1cmUuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZlZWRVbmlmaWVkQ29uZmlnKCkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGZlZWRVbmlmaWVkQ29uZmlnKCk6IE9ic2VydmFibGU8W0NvbmZpZ1tdLCBDb25maWdbXV0+IHtcbiAgICBjb25zdCBjb25maWdDaHVua3MkOiBPYnNlcnZhYmxlPENvbmZpZ1tdPiA9IHRoaXMudW5pZmllZEluamVjdG9yLmdldChcbiAgICAgIENvbmZpZ0NodW5rLFxuICAgICAgW11cbiAgICApO1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWdDaHVua3MkOiBPYnNlcnZhYmxlPENvbmZpZ1tdPiA9IHRoaXMudW5pZmllZEluamVjdG9yLmdldChcbiAgICAgIERlZmF1bHRDb25maWdDaHVuayxcbiAgICAgIFtdXG4gICAgKTtcblxuICAgIHJldHVybiB6aXAoY29uZmlnQ2h1bmtzJCwgZGVmYXVsdENvbmZpZ0NodW5rcyQpLnBpcGUoXG4gICAgICAvLyB3ZSBkb24ndCBuZWVkIHJlc3VsdCBmcm9tIHRoZSByb290IGluamVjdG9yXG4gICAgICBza2lwKDEpLFxuICAgICAgdGFwKChbY29uZmlnQ2h1bmtzLCBkZWZhdWx0Q29uZmlnQ2h1bmtzXSkgPT5cbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uZmlnKGNvbmZpZ0NodW5rcywgZGVmYXVsdENvbmZpZ0NodW5rcylcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzQ29uZmlnKGNvbmZpZ0NodW5rczogQ29uZmlnW10sIGRlZmF1bHRDb25maWdDaHVua3M6IENvbmZpZ1tdKSB7XG4gICAgaWYgKGRlZmF1bHRDb25maWdDaHVua3M/Lmxlbmd0aCkge1xuICAgICAgZGVlcE1lcmdlKFxuICAgICAgICB0aGlzLmFtYmllbnREZWZhdWx0Q29uZmlnIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgICAgICAuLi5kZWZhdWx0Q29uZmlnQ2h1bmtzXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY29uZmlnQ2h1bmtzLmxlbmd0aCkge1xuICAgICAgZGVlcE1lcmdlKHRoaXMuYW1iaWVudENvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgLi4uY29uZmlnQ2h1bmtzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnQ2h1bmtzLmxlbmd0aCB8fCBkZWZhdWx0Q29uZmlnQ2h1bmtzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0VW5pZmllZENvbmZpZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVuaWZpZWRDb25maWcoKTogdm9pZCB7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBDb25maWcgPSBkZWVwTWVyZ2UoXG4gICAgICB7fSxcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyxcbiAgICAgIHRoaXMuYW1iaWVudERlZmF1bHRDb25maWcsXG4gICAgICB0aGlzLmFtYmllbnRDb25maWcsXG4gICAgICB0aGlzLnJvb3RDb25maWdcbiAgICApO1xuICAgICh0aGlzLnVuaWZpZWRDb25maWckIGFzIEJlaGF2aW9yU3ViamVjdDxDb25maWc+KS5uZXh0KG5ld0NvbmZpZyk7XG5cbiAgICAvLyBjb21wYXRpYmlsaXR5IG1lY2hhbmlzbSwgY2FuIGJlIGRpc2FibGVkIHdpdGggZmVhdHVyZSB0b2dnbGVcbiAgICBpZiAoIWlzRmVhdHVyZUVuYWJsZWQodGhpcy5jb25maWcsICdkaXNhYmxlQ29uZmlnVXBkYXRlcycpKSB7XG4gICAgICBkZWVwTWVyZ2UodGhpcy5jb25maWcgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5ld0NvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICAodGhpcy51bmlmaWVkQ29uZmlnJCBhcyBCZWhhdmlvclN1YmplY3Q8Q29uZmlnPikuY29tcGxldGUoKTtcbiAgfVxufVxuIl19