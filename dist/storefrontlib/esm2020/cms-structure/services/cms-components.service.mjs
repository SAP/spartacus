/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformServer } from '@angular/common';
import { inject, Inject, Injectable, isDevMode, PLATFORM_ID, } from '@angular/core';
import { deepMerge, isNotUndefined, LoggerService, } from '@spartacus/core';
import { defer, forkJoin, of } from 'rxjs';
import { filter, map, share, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./cms-features.service";
/**
 * Service with logic related to resolving component from cms mapping
 */
export class CmsComponentsService {
    constructor(config, platformId, featureModules, configInitializer) {
        this.config = config;
        this.platformId = platformId;
        this.featureModules = featureModules;
        this.configInitializer = configInitializer;
        // Component mappings that were identified as missing
        this.missingComponents = [];
        // Already resolved mappings
        this.mappings = {};
        // Contains already initialized resolvers for specified component typez
        this.mappingResolvers = new Map();
        this.logger = inject(LoggerService);
        this.configInitializer
            .getStable('cmsComponents')
            .subscribe((cmsConfig) => {
            // we want to grab cms configuration available at config initialization phase
            // as lazy-loaded modules can affect global configuration resulting in
            // non-deterministic state
            this.staticCmsConfig = { ...cmsConfig.cmsComponents };
        });
    }
    /**
     * Should be called to make sure all component mappings are determined,
     * especially lazy loaded ones.
     *
     * It's recommended way to make sure all other methods of CmsComponentService
     * will be able to work synchronously for asked component types and avoid risk
     * of potential errors that could be thrown otherwise.
     */
    determineMappings(componentTypes) {
        return defer(() => {
            // we use defer, to be sure the logic below used to compose final observable
            // will be executed at subscription time (with up to date state at the time,
            // when it will be needed)
            const featureResolvers = [];
            for (const componentType of componentTypes) {
                if (!this.mappings[componentType]) {
                    const staticConfig = (this.staticCmsConfig ??
                        this.config.cmsComponents)?.[componentType];
                    // check if this component type is managed by feature module
                    if (this.featureModules.hasFeatureFor(componentType)) {
                        featureResolvers.push(
                        // we delegate populating this.mappings to feature resolver
                        this.getFeatureMappingResolver(componentType, staticConfig));
                    }
                    else {
                        // simply use only static config
                        if (staticConfig) {
                            this.mappings[componentType] = staticConfig;
                        }
                    }
                }
            }
            if (featureResolvers.length) {
                return forkJoin(featureResolvers).pipe(map(() => componentTypes));
            }
            else {
                return of(componentTypes);
            }
        });
    }
    getFeatureMappingResolver(componentType, staticConfig) {
        if (!this.mappingResolvers.has(componentType)) {
            const mappingResolver$ = this.featureModules
                .getCmsMapping(componentType)
                .pipe(filter(isNotUndefined), tap((featureComponentMapping) => {
                // We treat cms mapping configuration from a feature as a default,
                // that can be overridden by app/static configuration
                this.mappings[componentType] = deepMerge({}, featureComponentMapping, staticConfig);
                this.mappingResolvers.delete(componentType);
            }), share());
            this.mappingResolvers.set(componentType, mappingResolver$);
        }
        return this.mappingResolvers.get(componentType);
    }
    /**
     * Returns the feature module for a cms component.
     * It will only work for cms components provided by feature modules.
     *
     * @param componentType
     */
    getModule(componentType) {
        if (this.featureModules.hasFeatureFor(componentType)) {
            return this.featureModules.getModule(componentType);
        }
    }
    /**
     * Return collection of component mapping configuration for specified list of
     * component types.
     *
     * If component mapping can't be determined synchronously, for example, lazy
     * loaded one, it will throw an error.
     *
     * To make sure component mapping is available, determineMappings()
     * should be called and completed first.
     */
    getMapping(componentType) {
        const componentConfig = this.mappings[componentType] ??
            (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType];
        if (isDevMode() && !componentConfig) {
            if (!this.missingComponents.includes(componentType)) {
                this.missingComponents.push(componentType);
                this.logger.warn(`No component implementation found for the CMS component type '${componentType}'.\n`, `Make sure you implement a component and register it in the mapper.`);
            }
        }
        return componentConfig;
    }
    /**
     * Checks, if component should be rendered as some components
     * could be disabled for server side renderings
     */
    shouldRender(componentType) {
        const isSSR = isPlatformServer(this.platformId);
        return !(isSSR && this.getMapping(componentType)?.disableSSR);
    }
    /**
     * Return DeferLoadingStrategy for component type.
     */
    getDeferLoadingStrategy(componentType) {
        return (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType]
            ?.deferLoading;
    }
    /**
     * Get cms driven child routes for components
     */
    getChildRoutes(componentTypes) {
        const configs = [];
        for (const componentType of componentTypes) {
            if (this.shouldRender(componentType)) {
                configs.push(this.getMapping(componentType)?.childRoutes ?? []);
            }
        }
        return this.standardizeChildRoutes(configs);
    }
    /**
     * Returns the static data for the component type.
     */
    getStaticData(componentType) {
        return this.getMapping(componentType)?.data;
    }
    /**
     * Standardizes the format of `childRoutes` config.
     *
     * Some `childRoutes` configs are simple arrays of Routes (without the notion of the parent route).
     * But some configs can be an object with children routes and their parent defined in separate property.
     */
    standardizeChildRoutes(childRoutesConfigs) {
        const result = { children: [] };
        (childRoutesConfigs || []).forEach((config) => {
            if (Array.isArray(config)) {
                result.children?.push(...config);
            }
            else {
                result.children?.push(...(config.children || []));
                if (config.parent) {
                    result.parent = config.parent;
                }
            }
        });
        return result;
    }
    /**
     * Get cms driven guards for components
     */
    getGuards(componentTypes) {
        const guards = new Set();
        for (const componentType of componentTypes) {
            this.getMapping(componentType)?.guards?.forEach((guard) => guards.add(guard));
        }
        return Array.from(guards);
    }
    /**
     * Get i18n keys associated with components
     */
    getI18nKeys(componentTypes) {
        const i18nKeys = new Set();
        for (const componentType of componentTypes) {
            if (this.shouldRender(componentType)) {
                this.getMapping(componentType)?.i18nKeys?.forEach((key) => i18nKeys.add(key));
            }
        }
        return Array.from(i18nKeys);
    }
}
CmsComponentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentsService, deps: [{ token: i1.CmsConfig }, { token: PLATFORM_ID }, { token: i2.CmsFeaturesService }, { token: i1.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsComponentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsConfig }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.CmsFeaturesService }, { type: i1.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWNvbXBvbmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZXJ2aWNlcy9jbXMtY29tcG9uZW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUVULFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBT0wsU0FBUyxFQUVULGNBQWMsRUFDZCxhQUFhLEdBQ2QsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3pEOztHQUVHO0FBSUgsTUFBTSxPQUFPLG9CQUFvQjtJQWdCL0IsWUFDWSxNQUFpQixFQUNJLFVBQWtCLEVBQ3ZDLGNBQWtDLEVBQ2xDLGlCQUEyQztRQUgzQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ0ksZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQW5CdkQscURBQXFEO1FBQzNDLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUUzQyw0QkFBNEI7UUFDbEIsYUFBUSxHQUFxRCxFQUFFLENBQUM7UUFLMUUsdUVBQXVFO1FBQzdELHFCQUFnQixHQUN4QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRUYsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztR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QUFjLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FDbEIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxjQUF3QjtRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ25DLEtBQUssTUFBTSxhQUFhLElBQUksY0FBYyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDeEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7aUhBN09VLG9CQUFvQiwyQ0FrQnJCLFdBQVc7cUhBbEJWLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQW1CSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIGluamVjdCxcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBpc0Rldk1vZGUsXG4gIE5nTW9kdWxlUmVmLFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb21wb25lbnQsXG4gIENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnLFxuICBDTVNDb21wb25lbnRDb25maWcsXG4gIENtc0NvbXBvbmVudE1hcHBpbmcsXG4gIENtc0NvbmZpZyxcbiAgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBkZWVwTWVyZ2UsXG4gIERlZmVyTG9hZGluZ1N0cmF0ZWd5LFxuICBpc05vdFVuZGVmaW5lZCxcbiAgTG9nZ2VyU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmVyLCBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi9jbXMtZmVhdHVyZXMuc2VydmljZSc7XG5cbi8qKlxuICogU2VydmljZSB3aXRoIGxvZ2ljIHJlbGF0ZWQgdG8gcmVzb2x2aW5nIGNvbXBvbmVudCBmcm9tIGNtcyBtYXBwaW5nXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbXNDb21wb25lbnRzU2VydmljZSB7XG4gIC8vIENvbXBvbmVudCBtYXBwaW5ncyB0aGF0IHdlcmUgaWRlbnRpZmllZCBhcyBtaXNzaW5nXG4gIHByb3RlY3RlZCBtaXNzaW5nQ29tcG9uZW50czogc3RyaW5nW10gPSBbXTtcblxuICAvLyBBbHJlYWR5IHJlc29sdmVkIG1hcHBpbmdzXG4gIHByb3RlY3RlZCBtYXBwaW5nczogeyBbY29tcG9uZW50VHlwZTogc3RyaW5nXTogQ21zQ29tcG9uZW50TWFwcGluZyB9ID0ge307XG5cbiAgLy8gQ29weSBvZiBpbml0aWFsL3N0YXRpYyBjbXMgbWFwcGluZyBjb25maWd1cmF0aW9uIHVuYWZmZWN0ZWQgYnkgbGF6eS1sb2FkZWQgbW9kdWxlc1xuICBwcm90ZWN0ZWQgc3RhdGljQ21zQ29uZmlnOiBDTVNDb21wb25lbnRDb25maWcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gQ29udGFpbnMgYWxyZWFkeSBpbml0aWFsaXplZCByZXNvbHZlcnMgZm9yIHNwZWNpZmllZCBjb21wb25lbnQgdHlwZXpcbiAgcHJvdGVjdGVkIG1hcHBpbmdSZXNvbHZlcnM6IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8Q21zQ29tcG9uZW50TWFwcGluZz4+ID1cbiAgICBuZXcgTWFwKCk7XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBDbXNDb25maWcsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcm90ZWN0ZWQgZmVhdHVyZU1vZHVsZXM6IENtc0ZlYXR1cmVzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbmZpZ0luaXRpYWxpemVyXG4gICAgICAuZ2V0U3RhYmxlKCdjbXNDb21wb25lbnRzJylcbiAgICAgIC5zdWJzY3JpYmUoKGNtc0NvbmZpZzogQ21zQ29uZmlnKSA9PiB7XG4gICAgICAgIC8vIHdlIHdhbnQgdG8gZ3JhYiBjbXMgY29uZmlndXJhdGlvbiBhdmFpbGFibGUgYXQgY29uZmlnIGluaXRpYWxpemF0aW9uIHBoYXNlXG4gICAgICAgIC8vIGFzIGxhenktbG9hZGVkIG1vZHVsZXMgY2FuIGFmZmVjdCBnbG9iYWwgY29uZmlndXJhdGlvbiByZXN1bHRpbmcgaW5cbiAgICAgICAgLy8gbm9uLWRldGVybWluaXN0aWMgc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0aWNDbXNDb25maWcgPSB7IC4uLmNtc0NvbmZpZy5jbXNDb21wb25lbnRzIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHRvIG1ha2Ugc3VyZSBhbGwgY29tcG9uZW50IG1hcHBpbmdzIGFyZSBkZXRlcm1pbmVkLFxuICAgKiBlc3BlY2lhbGx5IGxhenkgbG9hZGVkIG9uZXMuXG4gICAqXG4gICAqIEl0J3MgcmVjb21tZW5kZWQgd2F5IHRvIG1ha2Ugc3VyZSBhbGwgb3RoZXIgbWV0aG9kcyBvZiBDbXNDb21wb25lbnRTZXJ2aWNlXG4gICAqIHdpbGwgYmUgYWJsZSB0byB3b3JrIHN5bmNocm9ub3VzbHkgZm9yIGFza2VkIGNvbXBvbmVudCB0eXBlcyBhbmQgYXZvaWQgcmlza1xuICAgKiBvZiBwb3RlbnRpYWwgZXJyb3JzIHRoYXQgY291bGQgYmUgdGhyb3duIG90aGVyd2lzZS5cbiAgICovXG4gIGRldGVybWluZU1hcHBpbmdzKGNvbXBvbmVudFR5cGVzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgLy8gd2UgdXNlIGRlZmVyLCB0byBiZSBzdXJlIHRoZSBsb2dpYyBiZWxvdyB1c2VkIHRvIGNvbXBvc2UgZmluYWwgb2JzZXJ2YWJsZVxuICAgICAgLy8gd2lsbCBiZSBleGVjdXRlZCBhdCBzdWJzY3JpcHRpb24gdGltZSAod2l0aCB1cCB0byBkYXRlIHN0YXRlIGF0IHRoZSB0aW1lLFxuICAgICAgLy8gd2hlbiBpdCB3aWxsIGJlIG5lZWRlZClcbiAgICAgIGNvbnN0IGZlYXR1cmVSZXNvbHZlcnM6IE9ic2VydmFibGU8dW5rbm93bj5bXSA9IFtdO1xuXG4gICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudFR5cGUgb2YgY29tcG9uZW50VHlwZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcHBpbmdzW2NvbXBvbmVudFR5cGVdKSB7XG4gICAgICAgICAgY29uc3Qgc3RhdGljQ29uZmlnID0gKHRoaXMuc3RhdGljQ21zQ29uZmlnID8/XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jbXNDb21wb25lbnRzKT8uW2NvbXBvbmVudFR5cGVdO1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBjb21wb25lbnQgdHlwZSBpcyBtYW5hZ2VkIGJ5IGZlYXR1cmUgbW9kdWxlXG4gICAgICAgICAgaWYgKHRoaXMuZmVhdHVyZU1vZHVsZXMuaGFzRmVhdHVyZUZvcihjb21wb25lbnRUeXBlKSkge1xuICAgICAgICAgICAgZmVhdHVyZVJlc29sdmVycy5wdXNoKFxuICAgICAgICAgICAgICAvLyB3ZSBkZWxlZ2F0ZSBwb3B1bGF0aW5nIHRoaXMubWFwcGluZ3MgdG8gZmVhdHVyZSByZXNvbHZlclxuICAgICAgICAgICAgICB0aGlzLmdldEZlYXR1cmVNYXBwaW5nUmVzb2x2ZXIoXG4gICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDb25maWdcbiAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPENtc0NvbXBvbmVudE1hcHBpbmc+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzaW1wbHkgdXNlIG9ubHkgc3RhdGljIGNvbmZpZ1xuICAgICAgICAgICAgaWYgKHN0YXRpY0NvbmZpZykge1xuICAgICAgICAgICAgICB0aGlzLm1hcHBpbmdzW2NvbXBvbmVudFR5cGVdID0gc3RhdGljQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmVhdHVyZVJlc29sdmVycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGZlYXR1cmVSZXNvbHZlcnMpLnBpcGUobWFwKCgpID0+IGNvbXBvbmVudFR5cGVzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2YoY29tcG9uZW50VHlwZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGZWF0dXJlTWFwcGluZ1Jlc29sdmVyKFxuICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZyxcbiAgICBzdGF0aWNDb25maWc/OiBDbXNDb21wb25lbnRNYXBwaW5nXG4gICk6IE9ic2VydmFibGU8Q21zQ29tcG9uZW50TWFwcGluZz4gfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5tYXBwaW5nUmVzb2x2ZXJzLmhhcyhjb21wb25lbnRUeXBlKSkge1xuICAgICAgY29uc3QgbWFwcGluZ1Jlc29sdmVyJCA9IHRoaXMuZmVhdHVyZU1vZHVsZXNcbiAgICAgICAgLmdldENtc01hcHBpbmcoY29tcG9uZW50VHlwZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKSxcbiAgICAgICAgICB0YXAoKGZlYXR1cmVDb21wb25lbnRNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAvLyBXZSB0cmVhdCBjbXMgbWFwcGluZyBjb25maWd1cmF0aW9uIGZyb20gYSBmZWF0dXJlIGFzIGEgZGVmYXVsdCxcbiAgICAgICAgICAgIC8vIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4gYnkgYXBwL3N0YXRpYyBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICB0aGlzLm1hcHBpbmdzW2NvbXBvbmVudFR5cGVdID0gZGVlcE1lcmdlKFxuICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgZmVhdHVyZUNvbXBvbmVudE1hcHBpbmcsXG4gICAgICAgICAgICAgIHN0YXRpY0NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubWFwcGluZ1Jlc29sdmVycy5kZWxldGUoY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgc2hhcmUoKVxuICAgICAgICApO1xuICAgICAgdGhpcy5tYXBwaW5nUmVzb2x2ZXJzLnNldChjb21wb25lbnRUeXBlLCBtYXBwaW5nUmVzb2x2ZXIkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFwcGluZ1Jlc29sdmVycy5nZXQoY29tcG9uZW50VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmVhdHVyZSBtb2R1bGUgZm9yIGEgY21zIGNvbXBvbmVudC5cbiAgICogSXQgd2lsbCBvbmx5IHdvcmsgZm9yIGNtcyBjb21wb25lbnRzIHByb3ZpZGVkIGJ5IGZlYXR1cmUgbW9kdWxlcy5cbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudFR5cGVcbiAgICovXG4gIGdldE1vZHVsZShjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBOZ01vZHVsZVJlZjxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlTW9kdWxlcy5oYXNGZWF0dXJlRm9yKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mZWF0dXJlTW9kdWxlcy5nZXRNb2R1bGUoY29tcG9uZW50VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBjb2xsZWN0aW9uIG9mIGNvbXBvbmVudCBtYXBwaW5nIGNvbmZpZ3VyYXRpb24gZm9yIHNwZWNpZmllZCBsaXN0IG9mXG4gICAqIGNvbXBvbmVudCB0eXBlcy5cbiAgICpcbiAgICogSWYgY29tcG9uZW50IG1hcHBpbmcgY2FuJ3QgYmUgZGV0ZXJtaW5lZCBzeW5jaHJvbm91c2x5LCBmb3IgZXhhbXBsZSwgbGF6eVxuICAgKiBsb2FkZWQgb25lLCBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgKlxuICAgKiBUbyBtYWtlIHN1cmUgY29tcG9uZW50IG1hcHBpbmcgaXMgYXZhaWxhYmxlLCBkZXRlcm1pbmVNYXBwaW5ncygpXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgYW5kIGNvbXBsZXRlZCBmaXJzdC5cbiAgICovXG4gIGdldE1hcHBpbmcoY29tcG9uZW50VHlwZTogc3RyaW5nKTogQ21zQ29tcG9uZW50TWFwcGluZyB7XG4gICAgY29uc3QgY29tcG9uZW50Q29uZmlnID1cbiAgICAgIHRoaXMubWFwcGluZ3NbY29tcG9uZW50VHlwZV0gPz9cbiAgICAgICh0aGlzLnN0YXRpY0Ntc0NvbmZpZyA/PyB0aGlzLmNvbmZpZy5jbXNDb21wb25lbnRzKT8uW2NvbXBvbmVudFR5cGVdO1xuXG4gICAgaWYgKGlzRGV2TW9kZSgpICYmICFjb21wb25lbnRDb25maWcpIHtcbiAgICAgIGlmICghdGhpcy5taXNzaW5nQ29tcG9uZW50cy5pbmNsdWRlcyhjb21wb25lbnRUeXBlKSkge1xuICAgICAgICB0aGlzLm1pc3NpbmdDb21wb25lbnRzLnB1c2goY29tcG9uZW50VHlwZSk7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgYE5vIGNvbXBvbmVudCBpbXBsZW1lbnRhdGlvbiBmb3VuZCBmb3IgdGhlIENNUyBjb21wb25lbnQgdHlwZSAnJHtjb21wb25lbnRUeXBlfScuXFxuYCxcbiAgICAgICAgICBgTWFrZSBzdXJlIHlvdSBpbXBsZW1lbnQgYSBjb21wb25lbnQgYW5kIHJlZ2lzdGVyIGl0IGluIHRoZSBtYXBwZXIuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzLCBpZiBjb21wb25lbnQgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIHNvbWUgY29tcG9uZW50c1xuICAgKiBjb3VsZCBiZSBkaXNhYmxlZCBmb3Igc2VydmVyIHNpZGUgcmVuZGVyaW5nc1xuICAgKi9cbiAgc2hvdWxkUmVuZGVyKGNvbXBvbmVudFR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzU1NSID0gaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgIHJldHVybiAhKGlzU1NSICYmIHRoaXMuZ2V0TWFwcGluZyhjb21wb25lbnRUeXBlKT8uZGlzYWJsZVNTUik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIERlZmVyTG9hZGluZ1N0cmF0ZWd5IGZvciBjb21wb25lbnQgdHlwZS5cbiAgICovXG4gIGdldERlZmVyTG9hZGluZ1N0cmF0ZWd5KFxuICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZ1xuICApOiBEZWZlckxvYWRpbmdTdHJhdGVneSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuICh0aGlzLnN0YXRpY0Ntc0NvbmZpZyA/PyB0aGlzLmNvbmZpZy5jbXNDb21wb25lbnRzKT8uW2NvbXBvbmVudFR5cGVdXG4gICAgICA/LmRlZmVyTG9hZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY21zIGRyaXZlbiBjaGlsZCByb3V0ZXMgZm9yIGNvbXBvbmVudHNcbiAgICovXG4gIGdldENoaWxkUm91dGVzKGNvbXBvbmVudFR5cGVzOiBzdHJpbmdbXSk6IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnIHtcbiAgICBjb25zdCBjb25maWdzID0gW107XG4gICAgZm9yIChjb25zdCBjb21wb25lbnRUeXBlIG9mIGNvbXBvbmVudFR5cGVzKSB7XG4gICAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoY29tcG9uZW50VHlwZSkpIHtcbiAgICAgICAgY29uZmlncy5wdXNoKHRoaXMuZ2V0TWFwcGluZyhjb21wb25lbnRUeXBlKT8uY2hpbGRSb3V0ZXMgPz8gW10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0YW5kYXJkaXplQ2hpbGRSb3V0ZXMoY29uZmlncyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhdGljIGRhdGEgZm9yIHRoZSBjb21wb25lbnQgdHlwZS5cbiAgICovXG4gIGdldFN0YXRpY0RhdGE8VCBleHRlbmRzIENtc0NvbXBvbmVudCA9IENtc0NvbXBvbmVudD4oXG4gICAgY29tcG9uZW50VHlwZTogc3RyaW5nXG4gICk6IFQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldE1hcHBpbmcoY29tcG9uZW50VHlwZSk/LmRhdGEgYXMgVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFuZGFyZGl6ZXMgdGhlIGZvcm1hdCBvZiBgY2hpbGRSb3V0ZXNgIGNvbmZpZy5cbiAgICpcbiAgICogU29tZSBgY2hpbGRSb3V0ZXNgIGNvbmZpZ3MgYXJlIHNpbXBsZSBhcnJheXMgb2YgUm91dGVzICh3aXRob3V0IHRoZSBub3Rpb24gb2YgdGhlIHBhcmVudCByb3V0ZSkuXG4gICAqIEJ1dCBzb21lIGNvbmZpZ3MgY2FuIGJlIGFuIG9iamVjdCB3aXRoIGNoaWxkcmVuIHJvdXRlcyBhbmQgdGhlaXIgcGFyZW50IGRlZmluZWQgaW4gc2VwYXJhdGUgcHJvcGVydHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhbmRhcmRpemVDaGlsZFJvdXRlcyhcbiAgICBjaGlsZFJvdXRlc0NvbmZpZ3M6IChSb3V0ZVtdIHwgQ21zQ29tcG9uZW50Q2hpbGRSb3V0ZXNDb25maWcpW11cbiAgKTogQ21zQ29tcG9uZW50Q2hpbGRSb3V0ZXNDb25maWcge1xuICAgIGNvbnN0IHJlc3VsdDogQ21zQ29tcG9uZW50Q2hpbGRSb3V0ZXNDb25maWcgPSB7IGNoaWxkcmVuOiBbXSB9O1xuXG4gICAgKGNoaWxkUm91dGVzQ29uZmlncyB8fCBbXSkuZm9yRWFjaCgoY29uZmlnKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcpKSB7XG4gICAgICAgIHJlc3VsdC5jaGlsZHJlbj8ucHVzaCguLi5jb25maWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LmNoaWxkcmVuPy5wdXNoKC4uLihjb25maWcuY2hpbGRyZW4gfHwgW10pKTtcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgICByZXN1bHQucGFyZW50ID0gY29uZmlnLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY21zIGRyaXZlbiBndWFyZHMgZm9yIGNvbXBvbmVudHNcbiAgICovXG4gIGdldEd1YXJkcyhjb21wb25lbnRUeXBlczogc3RyaW5nW10pOiBhbnlbXSB7XG4gICAgY29uc3QgZ3VhcmRzID0gbmV3IFNldDxhbnk+KCk7XG4gICAgZm9yIChjb25zdCBjb21wb25lbnRUeXBlIG9mIGNvbXBvbmVudFR5cGVzKSB7XG4gICAgICB0aGlzLmdldE1hcHBpbmcoY29tcG9uZW50VHlwZSk/Lmd1YXJkcz8uZm9yRWFjaCgoZ3VhcmQpID0+XG4gICAgICAgIGd1YXJkcy5hZGQoZ3VhcmQpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShndWFyZHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpMThuIGtleXMgYXNzb2NpYXRlZCB3aXRoIGNvbXBvbmVudHNcbiAgICovXG4gIGdldEkxOG5LZXlzKGNvbXBvbmVudFR5cGVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBpMThuS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAoY29uc3QgY29tcG9uZW50VHlwZSBvZiBjb21wb25lbnRUeXBlcykge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMuZ2V0TWFwcGluZyhjb21wb25lbnRUeXBlKT8uaTE4bktleXM/LmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICBpMThuS2V5cy5hZGQoa2V5KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShpMThuS2V5cyk7XG4gIH1cbn1cbiJdfQ==