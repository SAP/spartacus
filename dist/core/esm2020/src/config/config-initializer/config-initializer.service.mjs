/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { LoggerService } from '../../logger';
import { RootConfig } from '../config-tokens';
import { deepMerge } from '../utils/deep-merge';
import { CONFIG_INITIALIZER_FORROOT_GUARD, } from './config-initializer';
import * as i0 from "@angular/core";
import * as i1 from "../config-tokens";
/**
 * Provides support for CONFIG_INITIALIZERS
 */
export class ConfigInitializerService {
    constructor(config, initializerGuard, rootConfig) {
        this.config = config;
        this.initializerGuard = initializerGuard;
        this.rootConfig = rootConfig;
        this.logger = inject(LoggerService);
        this.ongoingScopes$ = new BehaviorSubject(undefined);
    }
    /**
     * Returns true if config is stable, i.e. all CONFIG_INITIALIZERS resolved correctly
     */
    get isStable() {
        return !this.initializerGuard || this.ongoingScopes$.value?.length === 0;
    }
    /**
     * Recommended way to get config for code that can run before app will finish
     * initialization (APP_INITIALIZERS, selected service constructors)
     *
     * Used without parameters waits for the whole config to become stable
     *
     * Parameters allow to describe which part of the config should be stable using
     * string describing config part, e.g.:
     * 'siteContext', 'siteContext.language', etc.
     *
     * @param scopes String describing parts of the config we want to be sure are stable
     */
    getStable(...scopes) {
        if (this.isStable) {
            return of(this.config);
        }
        return this.ongoingScopes$.pipe(filter((ongoingScopes) => !!ongoingScopes && this.areReady(scopes, ongoingScopes)), take(1), map(() => this.config));
    }
    /**
     * Removes provided scopes from currently ongoingScopes
     *
     * @param scopes
     */
    finishScopes(scopes) {
        const newScopes = [...(this.ongoingScopes$.value ?? [])];
        for (const scope of scopes) {
            newScopes.splice(newScopes.indexOf(scope), 1);
        }
        this.ongoingScopes$.next(newScopes);
    }
    /**
     * Return true if provided scopes are not part of ongoingScopes
     *
     * @param scopes
     * @param ongoingScopes
     */
    areReady(scopes, ongoingScopes) {
        if (!scopes.length) {
            return !ongoingScopes.length;
        }
        for (const scope of scopes) {
            for (const ongoingScope of ongoingScopes) {
                if (this.scopesOverlap(scope, ongoingScope)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Check if two scopes overlap.
     *
     * Example of scopes that overlap:
     * 'test' and 'test', 'test.a' and 'test', 'test' and 'test.a'
     *
     * Example of scopes that do not overlap:
     * 'test' and 'testA', 'test.a' and 'test.b', 'test.nested' and 'test.nest'
     *
     * @param a ScopeA
     * @param b ScopeB
     */
    scopesOverlap(a, b) {
        if (b.length > a.length) {
            [a, b] = [b, a];
        }
        return a.startsWith(b) && (a[b.length] || '.') === '.';
    }
    /**
     * @internal
     *
     * Not a part of a public API, used by APP_INITIALIZER to initialize all provided CONFIG_INITIALIZERS
     *
     */
    async initialize(initializers) {
        if (this.ongoingScopes$.value) {
            // guard for double initialization
            return;
        }
        const ongoingScopes = [];
        const asyncConfigs = [];
        for (const initializer of initializers || []) {
            if (!initializer) {
                continue;
            }
            if (!initializer.scopes || !initializer.scopes.length) {
                throw new Error('CONFIG_INITIALIZER should provide scope!');
            }
            if (isDevMode() && !this.areReady(initializer.scopes, ongoingScopes)) {
                this.logger.warn('More than one CONFIG_INITIALIZER is initializing the same config scope.');
            }
            ongoingScopes.push(...initializer.scopes);
            asyncConfigs.push((async () => {
                const initializerConfig = await initializer.configFactory();
                // contribute configuration to rootConfig
                deepMerge(this.rootConfig, initializerConfig);
                // contribute configuration to global config
                deepMerge(this.config, initializerConfig);
                this.finishScopes(initializer.scopes);
            })());
        }
        this.ongoingScopes$.next(ongoingScopes);
        if (asyncConfigs.length) {
            await Promise.all(asyncConfigs);
        }
    }
}
ConfigInitializerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerService, deps: [{ token: i1.Config }, { token: CONFIG_INITIALIZER_FORROOT_GUARD, optional: true }, { token: RootConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigInitializerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CONFIG_INITIALIZER_FORROOT_GUARD]
                }] }, { type: i1.Config, decorators: [{
                    type: Inject,
                    args: [RootConfig]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWluaXRpYWxpemVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jb25maWcvY29uZmlnLWluaXRpYWxpemVyL2NvbmZpZy1pbml0aWFsaXplci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBVSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFFOUI7O0dBRUc7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBR25DLFlBQ1ksTUFBYyxFQUdkLGdCQUFxQixFQUNELFVBQWtCO1FBSnRDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUs7UUFDRCxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBUHhDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFVL0IsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FDNUMsU0FBUyxDQUNWLENBQUM7SUFKQyxDQUFDO0lBTUo7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUks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QUMsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QseUVBQXlFLENBQzFFLENBQUM7YUFDSDtZQUVELGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUMsWUFBWSxDQUFDLElBQUksQ0FDZixDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNWLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQzVELHlDQUF5QztnQkFDekMsU0FBUyxDQUNQLElBQUksQ0FBQyxVQUFxQyxFQUMxQyxpQkFBaUIsQ0FDbEIsQ0FBQztnQkFDRiw0Q0FBNEM7Z0JBQzVDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBaUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsRUFBRSxDQUNMLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOztxSEF2SlUsd0JBQXdCLHdDQU16QixnQ0FBZ0MsNkJBRWhDLFVBQVU7eUhBUlQsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxnQ0FBZ0M7OzBCQUV2QyxNQUFNOzJCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpbmplY3QsIEluamVjdCwgSW5qZWN0YWJsZSwgaXNEZXZNb2RlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbG9nZ2VyJztcbmltcG9ydCB7IENvbmZpZywgUm9vdENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy10b2tlbnMnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnLi4vdXRpbHMvZGVlcC1tZXJnZSc7XG5pbXBvcnQge1xuICBDT05GSUdfSU5JVElBTElaRVJfRk9SUk9PVF9HVUFSRCxcbiAgQ29uZmlnSW5pdGlhbGl6ZXIsXG59IGZyb20gJy4vY29uZmlnLWluaXRpYWxpemVyJztcblxuLyoqXG4gKiBQcm92aWRlcyBzdXBwb3J0IGZvciBDT05GSUdfSU5JVElBTElaRVJTXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWdJbml0aWFsaXplclNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IENvbmZpZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQ09ORklHX0lOSVRJQUxJWkVSX0ZPUlJPT1RfR1VBUkQpXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVyR3VhcmQ6IGFueSxcbiAgICBASW5qZWN0KFJvb3RDb25maWcpIHByb3RlY3RlZCByb290Q29uZmlnOiBDb25maWdcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBvbmdvaW5nU2NvcGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10gfCB1bmRlZmluZWQ+KFxuICAgIHVuZGVmaW5lZFxuICApO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgY29uZmlnIGlzIHN0YWJsZSwgaS5lLiBhbGwgQ09ORklHX0lOSVRJQUxJWkVSUyByZXNvbHZlZCBjb3JyZWN0bHlcbiAgICovXG4gIGdldCBpc1N0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaW5pdGlhbGl6ZXJHdWFyZCB8fCB0aGlzLm9uZ29pbmdTY29wZXMkLnZhbHVlPy5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogUmVjb21tZW5kZWQgd2F5IHRvIGdldCBjb25maWcgZm9yIGNvZGUgdGhhdCBjYW4gcnVuIGJlZm9yZSBhcHAgd2lsbCBmaW5pc2hcbiAgICogaW5pdGlhbGl6YXRpb24gKEFQUF9JTklUSUFMSVpFUlMsIHNlbGVjdGVkIHNlcnZpY2UgY29uc3RydWN0b3JzKVxuICAgKlxuICAgKiBVc2VkIHdpdGhvdXQgcGFyYW1ldGVycyB3YWl0cyBmb3IgdGhlIHdob2xlIGNvbmZpZyB0byBiZWNvbWUgc3RhYmxlXG4gICAqXG4gICAqIFBhcmFtZXRlcnMgYWxsb3cgdG8gZGVzY3JpYmUgd2hpY2ggcGFydCBvZiB0aGUgY29uZmlnIHNob3VsZCBiZSBzdGFibGUgdXNpbmdcbiAgICogc3RyaW5nIGRlc2NyaWJpbmcgY29uZmlnIHBhcnQsIGUuZy46XG4gICAqICdzaXRlQ29udGV4dCcsICdzaXRlQ29udGV4dC5sYW5ndWFnZScsIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIHNjb3BlcyBTdHJpbmcgZGVzY3JpYmluZyBwYXJ0cyBvZiB0aGUgY29uZmlnIHdlIHdhbnQgdG8gYmUgc3VyZSBhcmUgc3RhYmxlXG4gICAqL1xuICBnZXRTdGFibGUoLi4uc2NvcGVzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8Q29uZmlnPiB7XG4gICAgaWYgKHRoaXMuaXNTdGFibGUpIHtcbiAgICAgIHJldHVybiBvZih0aGlzLmNvbmZpZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9uZ29pbmdTY29wZXMkLnBpcGUoXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChvbmdvaW5nU2NvcGVzKSA9PlxuICAgICAgICAgICEhb25nb2luZ1Njb3BlcyAmJiB0aGlzLmFyZVJlYWR5KHNjb3Blcywgb25nb2luZ1Njb3BlcylcbiAgICAgICksXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKCgpID0+IHRoaXMuY29uZmlnKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBwcm92aWRlZCBzY29wZXMgZnJvbSBjdXJyZW50bHkgb25nb2luZ1Njb3Blc1xuICAgKlxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgZmluaXNoU2NvcGVzKHNjb3Blczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBuZXdTY29wZXMgPSBbLi4uKHRoaXMub25nb2luZ1Njb3BlcyQudmFsdWUgPz8gW10pXTtcbiAgICBmb3IgKGNvbnN0IHNjb3BlIG9mIHNjb3Blcykge1xuICAgICAgbmV3U2NvcGVzLnNwbGljZShuZXdTY29wZXMuaW5kZXhPZihzY29wZSksIDEpO1xuICAgIH1cbiAgICB0aGlzLm9uZ29pbmdTY29wZXMkLm5leHQobmV3U2NvcGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiBwcm92aWRlZCBzY29wZXMgYXJlIG5vdCBwYXJ0IG9mIG9uZ29pbmdTY29wZXNcbiAgICpcbiAgICogQHBhcmFtIHNjb3Blc1xuICAgKiBAcGFyYW0gb25nb2luZ1Njb3Blc1xuICAgKi9cbiAgcHJvdGVjdGVkIGFyZVJlYWR5KHNjb3Blczogc3RyaW5nW10sIG9uZ29pbmdTY29wZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzY29wZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gIW9uZ29pbmdTY29wZXMubGVuZ3RoO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHNjb3BlIG9mIHNjb3Blcykge1xuICAgICAgZm9yIChjb25zdCBvbmdvaW5nU2NvcGUgb2Ygb25nb2luZ1Njb3Blcykge1xuICAgICAgICBpZiAodGhpcy5zY29wZXNPdmVybGFwKHNjb3BlLCBvbmdvaW5nU2NvcGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBzY29wZXMgb3ZlcmxhcC5cbiAgICpcbiAgICogRXhhbXBsZSBvZiBzY29wZXMgdGhhdCBvdmVybGFwOlxuICAgKiAndGVzdCcgYW5kICd0ZXN0JywgJ3Rlc3QuYScgYW5kICd0ZXN0JywgJ3Rlc3QnIGFuZCAndGVzdC5hJ1xuICAgKlxuICAgKiBFeGFtcGxlIG9mIHNjb3BlcyB0aGF0IGRvIG5vdCBvdmVybGFwOlxuICAgKiAndGVzdCcgYW5kICd0ZXN0QScsICd0ZXN0LmEnIGFuZCAndGVzdC5iJywgJ3Rlc3QubmVzdGVkJyBhbmQgJ3Rlc3QubmVzdCdcbiAgICpcbiAgICogQHBhcmFtIGEgU2NvcGVBXG4gICAqIEBwYXJhbSBiIFNjb3BlQlxuICAgKi9cbiAgcHJvdGVjdGVkIHNjb3Blc092ZXJsYXAoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoYi5sZW5ndGggPiBhLmxlbmd0aCkge1xuICAgICAgW2EsIGJdID0gW2IsIGFdO1xuICAgIH1cbiAgICByZXR1cm4gYS5zdGFydHNXaXRoKGIpICYmIChhW2IubGVuZ3RoXSB8fCAnLicpID09PSAnLic7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqXG4gICAqIE5vdCBhIHBhcnQgb2YgYSBwdWJsaWMgQVBJLCB1c2VkIGJ5IEFQUF9JTklUSUFMSVpFUiB0byBpbml0aWFsaXplIGFsbCBwcm92aWRlZCBDT05GSUdfSU5JVElBTElaRVJTXG4gICAqXG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplKGluaXRpYWxpemVycz86IENvbmZpZ0luaXRpYWxpemVyW10pIHtcbiAgICBpZiAodGhpcy5vbmdvaW5nU2NvcGVzJC52YWx1ZSkge1xuICAgICAgLy8gZ3VhcmQgZm9yIGRvdWJsZSBpbml0aWFsaXphdGlvblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9uZ29pbmdTY29wZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdCBhc3luY0NvbmZpZ3M6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpbml0aWFsaXplciBvZiBpbml0aWFsaXplcnMgfHwgW10pIHtcbiAgICAgIGlmICghaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoIWluaXRpYWxpemVyLnNjb3BlcyB8fCAhaW5pdGlhbGl6ZXIuc2NvcGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NPTkZJR19JTklUSUFMSVpFUiBzaG91bGQgcHJvdmlkZSBzY29wZSEnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGV2TW9kZSgpICYmICF0aGlzLmFyZVJlYWR5KGluaXRpYWxpemVyLnNjb3Blcywgb25nb2luZ1Njb3BlcykpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAnTW9yZSB0aGFuIG9uZSBDT05GSUdfSU5JVElBTElaRVIgaXMgaW5pdGlhbGl6aW5nIHRoZSBzYW1lIGNvbmZpZyBzY29wZS4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIG9uZ29pbmdTY29wZXMucHVzaCguLi5pbml0aWFsaXplci5zY29wZXMpO1xuXG4gICAgICBhc3luY0NvbmZpZ3MucHVzaChcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbml0aWFsaXplckNvbmZpZyA9IGF3YWl0IGluaXRpYWxpemVyLmNvbmZpZ0ZhY3RvcnkoKTtcbiAgICAgICAgICAvLyBjb250cmlidXRlIGNvbmZpZ3VyYXRpb24gdG8gcm9vdENvbmZpZ1xuICAgICAgICAgIGRlZXBNZXJnZShcbiAgICAgICAgICAgIHRoaXMucm9vdENvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICAgICAgICAgIGluaXRpYWxpemVyQ29uZmlnXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBjb250cmlidXRlIGNvbmZpZ3VyYXRpb24gdG8gZ2xvYmFsIGNvbmZpZ1xuICAgICAgICAgIGRlZXBNZXJnZSh0aGlzLmNvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgaW5pdGlhbGl6ZXJDb25maWcpO1xuICAgICAgICAgIHRoaXMuZmluaXNoU2NvcGVzKGluaXRpYWxpemVyLnNjb3Blcyk7XG4gICAgICAgIH0pKClcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMub25nb2luZ1Njb3BlcyQubmV4dChvbmdvaW5nU2NvcGVzKTtcblxuICAgIGlmIChhc3luY0NvbmZpZ3MubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhc3luY0NvbmZpZ3MpO1xuICAgIH1cbiAgfVxufVxuIl19