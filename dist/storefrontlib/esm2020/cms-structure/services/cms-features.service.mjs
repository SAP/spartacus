/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfigChunk, DefaultConfigChunk, deepMerge, } from '@spartacus/core';
import { EMPTY, defer, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Service responsible for resolving cms config based feature modules.
 */
export class CmsFeaturesService {
    constructor(configInitializer, featureModules) {
        this.configInitializer = configInitializer;
        this.featureModules = featureModules;
        // maps componentType to feature
        this.componentFeatureMap = new Map();
        /*
         * Contains either FeatureInstance or FeatureInstance resolver for not yet
         * resolved feature modules
         */
        this.featureInstances = new Map();
        this.initFeatureMap();
    }
    initFeatureMap() {
        this.configInitializer
            .getStable('featureModules')
            .subscribe((config) => {
            this.featureModulesConfig = config.featureModules ?? {};
            for (const [featureName, featureConfig] of Object.entries(this.featureModulesConfig)) {
                if (typeof featureConfig !== 'string' &&
                    featureConfig?.module &&
                    featureConfig?.cmsComponents?.length) {
                    for (const component of featureConfig.cmsComponents) {
                        this.componentFeatureMap.set(component, featureName);
                    }
                }
            }
        });
    }
    /**
     * Check if there is feature module configuration that covers specified
     * component type
     */
    hasFeatureFor(componentType) {
        return this.componentFeatureMap.has(componentType);
    }
    /**
     * Return full CmsComponent mapping defined in feature module
     */
    getCmsMapping(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return of(undefined);
        }
        return this.resolveFeatureInstance(feature).pipe(map((featureInstance) => featureInstance.componentsMappings?.[componentType]));
    }
    /**
     * Resolves feature module for provided component type
     *
     * @param componentType
     */
    getModule(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return undefined;
        }
        let module;
        // we are returning injectors only for already resolved features
        this.featureInstances
            .get(feature)
            ?.subscribe((featureInstance) => {
            module = featureInstance.moduleRef;
        })
            .unsubscribe();
        return module;
    }
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    resolveFeatureInstance(featureName) {
        return defer(() => {
            if (!this.featureInstances.has(featureName)) {
                this.featureInstances.set(featureName, this.featureModules.resolveFeature(featureName).pipe(map((moduleRef) => this.createFeatureInstance(moduleRef, featureName)), shareReplay()));
            }
            return this.featureInstances.get(featureName) ?? EMPTY;
        });
    }
    /**
     * Create feature instance from feature's moduleRef
     */
    createFeatureInstance(moduleRef, feature) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const featureConfig = this.featureModulesConfig[feature];
        const featureInstance = {
            moduleRef,
            componentsMappings: {},
        };
        // resolve configuration for feature module
        const resolvedConfiguration = this.resolveFeatureConfiguration(moduleRef.injector);
        // extract cms components configuration from feature config
        for (const componentType of featureConfig.cmsComponents ?? []) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            featureInstance.componentsMappings[componentType] =
                resolvedConfiguration.cmsComponents?.[componentType] ?? {};
        }
        return featureInstance;
    }
    /**
     * Returns configuration provided in feature module
     */
    resolveFeatureConfiguration(featureInjector) {
        // get config chunks from feature lib
        const featureConfigChunks = featureInjector.get(ConfigChunk, [], {
            self: true,
        });
        // get default config chunks from feature lib
        const featureDefaultConfigChunks = featureInjector.get(DefaultConfigChunk, [], { self: true });
        return deepMerge({}, ...(featureDefaultConfigChunks ?? []), ...(featureConfigChunks ?? []));
    }
}
CmsFeaturesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsFeaturesService, deps: [{ token: i1.ConfigInitializerService }, { token: i1.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsFeaturesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsFeaturesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsFeaturesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfigInitializerService }, { type: i1.FeatureModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWZlYXR1cmVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VydmljZXMvY21zLWZlYXR1cmVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFJTCxXQUFXLEVBRVgsa0JBQWtCLEVBR2xCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxLQUFLLEVBQWMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPbEQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBZ0I3QixZQUNZLGlCQUEyQyxFQUMzQyxjQUFxQztRQURyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQVpqRCxnQ0FBZ0M7UUFDeEIsd0JBQW1CLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFN0Q7OztXQUdHO1FBQ0sscUJBQWdCLEdBQ3RCLElBQUksR0FBRyxFQUFFLENBQUM7UUFNVixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQjthQUNuQixTQUFTLENBQUMsZ0JBQWdCLENBQUM7YUFDM0IsU0FBUyxDQUFDLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztZQUV4RCxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFD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QVEsQ0FDbkIsQ0FBQztRQUVGLDJEQUEyRDtRQUMzRCxLQUFLLE1BQU0sYUFBYSxJQUFJLGFBQWEsQ0FBQyxhQUFhLElBQUksRUFBRSxFQUFFO1lBQzdELG9FQUFvRTtZQUNwRSxlQUFlLENBQUMsa0JBQW1CLENBQUMsYUFBYSxDQUFDO2dCQUNoRCxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDOUQ7UUFDRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSywyQkFBMkIsQ0FBQyxlQUF5QjtRQUMzRCxxQ0FBcUM7UUFDckMsTUFBTSxtQkFBbUIsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFRLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDdEUsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7UUFDSCw2Q0FBNkM7UUFDN0MsTUFBTSwwQkFBMEIsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUNwRCxrQkFBa0IsRUFDbEIsRUFBRSxFQUNGLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUNmLENBQUM7UUFFRixPQUFPLFNBQVMsQ0FDZCxFQUFFLEVBQ0YsR0FBRyxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQyxFQUNyQyxHQUFHLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFDakIsQ0FBQzs7K0dBNUtVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBOZ01vZHVsZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ01TQ29tcG9uZW50Q29uZmlnLFxuICBDbXNDb21wb25lbnRNYXBwaW5nLFxuICBDbXNDb25maWcsXG4gIENvbmZpZ0NodW5rLFxuICBDb25maWdJbml0aWFsaXplclNlcnZpY2UsXG4gIERlZmF1bHRDb25maWdDaHVuayxcbiAgRmVhdHVyZU1vZHVsZUNvbmZpZyxcbiAgRmVhdHVyZU1vZHVsZXNTZXJ2aWNlLFxuICBkZWVwTWVyZ2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgZGVmZXIsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgRmVhdHVyZUluc3RhbmNlIGV4dGVuZHMgRmVhdHVyZU1vZHVsZUNvbmZpZyB7XG4gIG1vZHVsZVJlZj86IE5nTW9kdWxlUmVmPGFueT47XG4gIGNvbXBvbmVudHNNYXBwaW5ncz86IENNU0NvbXBvbmVudENvbmZpZztcbn1cblxuLyoqXG4gKiBTZXJ2aWNlIHJlc3BvbnNpYmxlIGZvciByZXNvbHZpbmcgY21zIGNvbmZpZyBiYXNlZCBmZWF0dXJlIG1vZHVsZXMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbXNGZWF0dXJlc1NlcnZpY2Uge1xuICAvLyBmZWF0dXJlIG1vZHVsZXMgY29uZmlndXJhdGlvblxuICBwcml2YXRlIGZlYXR1cmVNb2R1bGVzQ29uZmlnPzoge1xuICAgIFtmZWF0dXJlTmFtZTogc3RyaW5nXTogRmVhdHVyZU1vZHVsZUNvbmZpZyB8IHN0cmluZztcbiAgfTtcblxuICAvLyBtYXBzIGNvbXBvbmVudFR5cGUgdG8gZmVhdHVyZVxuICBwcml2YXRlIGNvbXBvbmVudEZlYXR1cmVNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbiAgLypcbiAgICogQ29udGFpbnMgZWl0aGVyIEZlYXR1cmVJbnN0YW5jZSBvciBGZWF0dXJlSW5zdGFuY2UgcmVzb2x2ZXIgZm9yIG5vdCB5ZXRcbiAgICogcmVzb2x2ZWQgZmVhdHVyZSBtb2R1bGVzXG4gICAqL1xuICBwcml2YXRlIGZlYXR1cmVJbnN0YW5jZXM6IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8RmVhdHVyZUluc3RhbmNlPj4gPVxuICAgIG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZmVhdHVyZU1vZHVsZXM6IEZlYXR1cmVNb2R1bGVzU2VydmljZVxuICApIHtcbiAgICB0aGlzLmluaXRGZWF0dXJlTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRGZWF0dXJlTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnSW5pdGlhbGl6ZXJcbiAgICAgIC5nZXRTdGFibGUoJ2ZlYXR1cmVNb2R1bGVzJylcbiAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZzogQ21zQ29uZmlnKSA9PiB7XG4gICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXNDb25maWcgPSBjb25maWcuZmVhdHVyZU1vZHVsZXMgPz8ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBbZmVhdHVyZU5hbWUsIGZlYXR1cmVDb25maWddIG9mIE9iamVjdC5lbnRyaWVzKFxuICAgICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXNDb25maWdcbiAgICAgICAgKSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBmZWF0dXJlQ29uZmlnICE9PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgZmVhdHVyZUNvbmZpZz8ubW9kdWxlICYmXG4gICAgICAgICAgICBmZWF0dXJlQ29uZmlnPy5jbXNDb21wb25lbnRzPy5sZW5ndGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGZlYXR1cmVDb25maWcuY21zQ29tcG9uZW50cykge1xuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEZlYXR1cmVNYXAuc2V0KGNvbXBvbmVudCwgZmVhdHVyZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlcmUgaXMgZmVhdHVyZSBtb2R1bGUgY29uZmlndXJhdGlvbiB0aGF0IGNvdmVycyBzcGVjaWZpZWRcbiAgICogY29tcG9uZW50IHR5cGVcbiAgICovXG4gIGhhc0ZlYXR1cmVGb3IoY29tcG9uZW50VHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RmVhdHVyZU1hcC5oYXMoY29tcG9uZW50VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgQ21zQ29tcG9uZW50IG1hcHBpbmcgZGVmaW5lZCBpbiBmZWF0dXJlIG1vZHVsZVxuICAgKi9cbiAgZ2V0Q21zTWFwcGluZyhcbiAgICBjb21wb25lbnRUeXBlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDbXNDb21wb25lbnRNYXBwaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuY29tcG9uZW50RmVhdHVyZU1hcC5nZXQoY29tcG9uZW50VHlwZSk7XG5cbiAgICBpZiAoIWZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc29sdmVGZWF0dXJlSW5zdGFuY2UoZmVhdHVyZSkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGZlYXR1cmVJbnN0YW5jZSkgPT4gZmVhdHVyZUluc3RhbmNlLmNvbXBvbmVudHNNYXBwaW5ncz8uW2NvbXBvbmVudFR5cGVdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBmZWF0dXJlIG1vZHVsZSBmb3IgcHJvdmlkZWQgY29tcG9uZW50IHR5cGVcbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudFR5cGVcbiAgICovXG4gIGdldE1vZHVsZShjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBOZ01vZHVsZVJlZjxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5jb21wb25lbnRGZWF0dXJlTWFwLmdldChjb21wb25lbnRUeXBlKTtcblxuICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgbW9kdWxlO1xuXG4gICAgLy8gd2UgYXJlIHJldHVybmluZyBpbmplY3RvcnMgb25seSBmb3IgYWxyZWFkeSByZXNvbHZlZCBmZWF0dXJlc1xuICAgIHRoaXMuZmVhdHVyZUluc3RhbmNlc1xuICAgICAgLmdldChmZWF0dXJlKVxuICAgICAgPy5zdWJzY3JpYmUoKGZlYXR1cmVJbnN0YW5jZSkgPT4ge1xuICAgICAgICBtb2R1bGUgPSBmZWF0dXJlSW5zdGFuY2UubW9kdWxlUmVmO1xuICAgICAgfSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBmZWF0dXJlIGJhc2VkIG9uIGZlYXR1cmUgbmFtZSwgaWYgZmVhdHVyZSB3YXMgbm90IHlldCByZXNvbHZlZFxuICAgKlxuICAgKiBJdCB3aWxsIGZpcnN0IHJlc29sdmUgYWxsIG1vZHVsZSBkZXBlbmRlbmNpZXMgaWYgZGVmaW5lZFxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlRmVhdHVyZUluc3RhbmNlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlSW5zdGFuY2U+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZlYXR1cmVJbnN0YW5jZXMuaGFzKGZlYXR1cmVOYW1lKSkge1xuICAgICAgICB0aGlzLmZlYXR1cmVJbnN0YW5jZXMuc2V0KFxuICAgICAgICAgIGZlYXR1cmVOYW1lLFxuICAgICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXMucmVzb2x2ZUZlYXR1cmUoZmVhdHVyZU5hbWUpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKG1vZHVsZVJlZikgPT5cbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGZWF0dXJlSW5zdGFuY2UobW9kdWxlUmVmLCBmZWF0dXJlTmFtZSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzaGFyZVJlcGxheSgpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5mZWF0dXJlSW5zdGFuY2VzLmdldChmZWF0dXJlTmFtZSkgPz8gRU1QVFk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGZlYXR1cmUgaW5zdGFuY2UgZnJvbSBmZWF0dXJlJ3MgbW9kdWxlUmVmXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUZlYXR1cmVJbnN0YW5jZShcbiAgICBtb2R1bGVSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgZmVhdHVyZTogc3RyaW5nXG4gICk6IEZlYXR1cmVJbnN0YW5jZSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCBmZWF0dXJlQ29uZmlnID0gdGhpcy5mZWF0dXJlTW9kdWxlc0NvbmZpZyFbXG4gICAgICBmZWF0dXJlXG4gICAgXSBhcyBGZWF0dXJlTW9kdWxlQ29uZmlnO1xuXG4gICAgY29uc3QgZmVhdHVyZUluc3RhbmNlOiBGZWF0dXJlSW5zdGFuY2UgPSB7XG4gICAgICBtb2R1bGVSZWYsXG4gICAgICBjb21wb25lbnRzTWFwcGluZ3M6IHt9LFxuICAgIH07XG5cbiAgICAvLyByZXNvbHZlIGNvbmZpZ3VyYXRpb24gZm9yIGZlYXR1cmUgbW9kdWxlXG4gICAgY29uc3QgcmVzb2x2ZWRDb25maWd1cmF0aW9uID0gdGhpcy5yZXNvbHZlRmVhdHVyZUNvbmZpZ3VyYXRpb24oXG4gICAgICBtb2R1bGVSZWYuaW5qZWN0b3JcbiAgICApO1xuXG4gICAgLy8gZXh0cmFjdCBjbXMgY29tcG9uZW50cyBjb25maWd1cmF0aW9uIGZyb20gZmVhdHVyZSBjb25maWdcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudFR5cGUgb2YgZmVhdHVyZUNvbmZpZy5jbXNDb21wb25lbnRzID8/IFtdKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgZmVhdHVyZUluc3RhbmNlLmNvbXBvbmVudHNNYXBwaW5ncyFbY29tcG9uZW50VHlwZV0gPVxuICAgICAgICByZXNvbHZlZENvbmZpZ3VyYXRpb24uY21zQ29tcG9uZW50cz8uW2NvbXBvbmVudFR5cGVdID8/IHt9O1xuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZUluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBwcm92aWRlZCBpbiBmZWF0dXJlIG1vZHVsZVxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlRmVhdHVyZUNvbmZpZ3VyYXRpb24oZmVhdHVyZUluamVjdG9yOiBJbmplY3Rvcik6IENtc0NvbmZpZyB7XG4gICAgLy8gZ2V0IGNvbmZpZyBjaHVua3MgZnJvbSBmZWF0dXJlIGxpYlxuICAgIGNvbnN0IGZlYXR1cmVDb25maWdDaHVua3MgPSBmZWF0dXJlSW5qZWN0b3IuZ2V0PGFueVtdPihDb25maWdDaHVuaywgW10sIHtcbiAgICAgIHNlbGY6IHRydWUsXG4gICAgfSk7XG4gICAgLy8gZ2V0IGRlZmF1bHQgY29uZmlnIGNodW5rcyBmcm9tIGZlYXR1cmUgbGliXG4gICAgY29uc3QgZmVhdHVyZURlZmF1bHRDb25maWdDaHVua3MgPSBmZWF0dXJlSW5qZWN0b3IuZ2V0PGFueVtdPihcbiAgICAgIERlZmF1bHRDb25maWdDaHVuayxcbiAgICAgIFtdLFxuICAgICAgeyBzZWxmOiB0cnVlIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIGRlZXBNZXJnZShcbiAgICAgIHt9LFxuICAgICAgLi4uKGZlYXR1cmVEZWZhdWx0Q29uZmlnQ2h1bmtzID8/IFtdKSxcbiAgICAgIC4uLihmZWF0dXJlQ29uZmlnQ2h1bmtzID8/IFtdKVxuICAgICkgYXMgQ21zQ29uZmlnO1xuICB9XG59XG4iXX0=