/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { EMPTY, defer, forkJoin, of, throwError } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../cms/config/cms-config";
import * as i2 from "./lazy-modules.service";
export class FeatureModulesService {
    constructor(cmsConfig, lazyModules) {
        this.cmsConfig = cmsConfig;
        this.lazyModules = lazyModules;
        /*
         * Contains resolvers for features.
         * Each resolver runs only once and caches the result.
         */
        this.features = new Map();
    }
    /**
     * Check if feature is configured properly by providing module the shell app
     *
     * @param featureName
     */
    isConfigured(featureName) {
        return !!this.getFeatureConfig(featureName)?.module;
    }
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    resolveFeature(featureName) {
        featureName = this.resolveFeatureAlias(featureName);
        return defer(() => {
            if (!this.features.has(featureName)) {
                if (!this.isConfigured(featureName)) {
                    return throwError(new Error('No module defined for Feature Module ' + featureName));
                }
                const featureConfig = this.getFeatureConfig(featureName);
                this.features.set(featureName, this.resolveDependencies(featureConfig?.dependencies).pipe(switchMap((deps) => this.lazyModules.resolveModuleInstance(featureConfig?.module, featureName, deps)), shareReplay()));
            }
            return this.features.get(featureName) ?? EMPTY;
        });
    }
    /**
     * Resolve
     * @param featureName
     * @protected
     */
    getFeatureConfig(featureName) {
        return this.cmsConfig.featureModules?.[this.resolveFeatureAlias(featureName)];
    }
    /**
     * Will return target feature name, resolving optional feature to feature
     * string mapping
     *
     * @param featureName
     * @protected
     */
    resolveFeatureAlias(featureName) {
        while (typeof this.cmsConfig.featureModules?.[featureName] === 'string') {
            featureName = this.cmsConfig.featureModules?.[featureName];
        }
        return featureName;
    }
    /**
     * Resolve dependency modules for the feature
     *
     * @param dependencies
     * @protected
     */
    resolveDependencies(dependencies = []) {
        return dependencies?.length
            ? forkJoin(dependencies.map((dependency) => {
                if (typeof dependency === 'string') {
                    // dependency is a feature, referenced by a feature name
                    return this.resolveFeature(dependency);
                }
                // resolve dependency from a module function
                return this.lazyModules.resolveDependencyModuleInstance(dependency);
            }))
            : of(undefined);
    }
}
FeatureModulesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeatureModulesService, deps: [{ token: i1.CmsConfig }, { token: i2.LazyModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
FeatureModulesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeatureModulesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeatureModulesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsConfig }, { type: i2.LazyModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1tb2R1bGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9sYXp5LWxvYWRpbmcvZmVhdHVyZS1tb2R1bGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssRUFBYyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU94RCxNQUFNLE9BQU8scUJBQXFCO0lBT2hDLFlBQ1ksU0FBb0IsRUFDcEIsV0FBK0I7UUFEL0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFSM0M7OztXQUdHO1FBQ0ssYUFBUSxHQUE4QyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBS3JFLENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLFdBQW1CO1FBQzlCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsV0FBbUI7UUFDaEMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRCxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDbkMsT0FBTyxVQUFVLENBQ2YsSUFBSSxLQUFLLENBQUMsdUNBQXVDLEdBQUcsV0FBVyxDQUFDLENBQ2pFLENBQUM7aUJBQ0g7Z0JBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV6RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDZixXQUFXLEVBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ3hELFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQ3BDLGFBQWEsRUFBRSxNQUE0QixFQUMzQyxXQUFXLEVBQ1gsSUFBSSxDQUNMLENBQ0YsRUFDRCxXQUFXLEVBQUUsQ0FDZCxDQUNGLENBQUM7YUFDSDtZQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxnQkFBZ0IsQ0FDeEIsV0FBbUI7UUFFbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUNwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQ0gsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sbUJBQW1CLENBQUMsV0FBbUI7UUFDL0MsT0FBTyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3ZFLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLFdBQVcsQ0FBVyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sbUJBQW1CLENBQzNCLGVBQXNCLEVBQUU7UUFFeEIsT0FBTyxZQUFZLEVBQUUsTUFBTTtZQUN6QixDQUFDLENBQUMsUUFBUSxDQUNOLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7b0JBQ2xDLHdEQUF3RDtvQkFDeEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCw0Q0FBNEM7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FDSDtZQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7a0hBMUdVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE5nTW9kdWxlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgZGVmZXIsIGZvcmtKb2luLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbmZpZywgRmVhdHVyZU1vZHVsZUNvbmZpZyB9IGZyb20gJy4uL2Ntcy9jb25maWcvY21zLWNvbmZpZyc7XG5pbXBvcnQgeyBMYXp5TW9kdWxlc1NlcnZpY2UgfSBmcm9tICcuL2xhenktbW9kdWxlcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVNb2R1bGVzU2VydmljZSB7XG4gIC8qXG4gICAqIENvbnRhaW5zIHJlc29sdmVycyBmb3IgZmVhdHVyZXMuXG4gICAqIEVhY2ggcmVzb2x2ZXIgcnVucyBvbmx5IG9uY2UgYW5kIGNhY2hlcyB0aGUgcmVzdWx0LlxuICAgKi9cbiAgcHJpdmF0ZSBmZWF0dXJlczogTWFwPHN0cmluZywgT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+Pj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNtc0NvbmZpZzogQ21zQ29uZmlnLFxuICAgIHByb3RlY3RlZCBsYXp5TW9kdWxlczogTGF6eU1vZHVsZXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ2hlY2sgaWYgZmVhdHVyZSBpcyBjb25maWd1cmVkIHByb3Blcmx5IGJ5IHByb3ZpZGluZyBtb2R1bGUgdGhlIHNoZWxsIGFwcFxuICAgKlxuICAgKiBAcGFyYW0gZmVhdHVyZU5hbWVcbiAgICovXG4gIGlzQ29uZmlndXJlZChmZWF0dXJlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRGZWF0dXJlQ29uZmlnKGZlYXR1cmVOYW1lKT8ubW9kdWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgZmVhdHVyZSBiYXNlZCBvbiBmZWF0dXJlIG5hbWUsIGlmIGZlYXR1cmUgd2FzIG5vdCB5ZXQgcmVzb2x2ZWRcbiAgICpcbiAgICogSXQgd2lsbCBmaXJzdCByZXNvbHZlIGFsbCBtb2R1bGUgZGVwZW5kZW5jaWVzIGlmIGRlZmluZWRcbiAgICovXG4gIHJlc29sdmVGZWF0dXJlKGZlYXR1cmVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE5nTW9kdWxlUmVmPGFueT4+IHtcbiAgICBmZWF0dXJlTmFtZSA9IHRoaXMucmVzb2x2ZUZlYXR1cmVBbGlhcyhmZWF0dXJlTmFtZSk7XG5cbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZlYXR1cmVzLmhhcyhmZWF0dXJlTmFtZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29uZmlndXJlZChmZWF0dXJlTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihcbiAgICAgICAgICAgIG5ldyBFcnJvcignTm8gbW9kdWxlIGRlZmluZWQgZm9yIEZlYXR1cmUgTW9kdWxlICcgKyBmZWF0dXJlTmFtZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmVhdHVyZUNvbmZpZyA9IHRoaXMuZ2V0RmVhdHVyZUNvbmZpZyhmZWF0dXJlTmFtZSk7XG5cbiAgICAgICAgdGhpcy5mZWF0dXJlcy5zZXQoXG4gICAgICAgICAgZmVhdHVyZU5hbWUsXG4gICAgICAgICAgdGhpcy5yZXNvbHZlRGVwZW5kZW5jaWVzKGZlYXR1cmVDb25maWc/LmRlcGVuZGVuY2llcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoZGVwcykgPT5cbiAgICAgICAgICAgICAgdGhpcy5sYXp5TW9kdWxlcy5yZXNvbHZlTW9kdWxlSW5zdGFuY2UoXG4gICAgICAgICAgICAgICAgZmVhdHVyZUNvbmZpZz8ubW9kdWxlIGFzICgpID0+IFByb21pc2U8YW55PixcbiAgICAgICAgICAgICAgICBmZWF0dXJlTmFtZSxcbiAgICAgICAgICAgICAgICBkZXBzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzaGFyZVJlcGxheSgpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5mZWF0dXJlcy5nZXQoZmVhdHVyZU5hbWUpID8/IEVNUFRZO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVcbiAgICogQHBhcmFtIGZlYXR1cmVOYW1lXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBnZXRGZWF0dXJlQ29uZmlnKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmdcbiAgKTogRmVhdHVyZU1vZHVsZUNvbmZpZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY21zQ29uZmlnLmZlYXR1cmVNb2R1bGVzPy5bXG4gICAgICB0aGlzLnJlc29sdmVGZWF0dXJlQWxpYXMoZmVhdHVyZU5hbWUpXG4gICAgXSBhcyBGZWF0dXJlTW9kdWxlQ29uZmlnIHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgcmV0dXJuIHRhcmdldCBmZWF0dXJlIG5hbWUsIHJlc29sdmluZyBvcHRpb25hbCBmZWF0dXJlIHRvIGZlYXR1cmVcbiAgICogc3RyaW5nIG1hcHBpbmdcbiAgICpcbiAgICogQHBhcmFtIGZlYXR1cmVOYW1lXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlRmVhdHVyZUFsaWFzKGZlYXR1cmVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHdoaWxlICh0eXBlb2YgdGhpcy5jbXNDb25maWcuZmVhdHVyZU1vZHVsZXM/LltmZWF0dXJlTmFtZV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBmZWF0dXJlTmFtZSA9IHRoaXMuY21zQ29uZmlnLmZlYXR1cmVNb2R1bGVzPy5bZmVhdHVyZU5hbWVdIGFzIHN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmVOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgZGVwZW5kZW5jeSBtb2R1bGVzIGZvciB0aGUgZmVhdHVyZVxuICAgKlxuICAgKiBAcGFyYW0gZGVwZW5kZW5jaWVzXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlRGVwZW5kZW5jaWVzKFxuICAgIGRlcGVuZGVuY2llczogYW55W10gPSBbXVxuICApOiBPYnNlcnZhYmxlPE5nTW9kdWxlUmVmPGFueT5bXSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBkZXBlbmRlbmNpZXM/Lmxlbmd0aFxuICAgICAgPyBmb3JrSm9pbihcbiAgICAgICAgICBkZXBlbmRlbmNpZXMubWFwKChkZXBlbmRlbmN5KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlcGVuZGVuY3kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIC8vIGRlcGVuZGVuY3kgaXMgYSBmZWF0dXJlLCByZWZlcmVuY2VkIGJ5IGEgZmVhdHVyZSBuYW1lXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVGZWF0dXJlKGRlcGVuZGVuY3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmVzb2x2ZSBkZXBlbmRlbmN5IGZyb20gYSBtb2R1bGUgZnVuY3Rpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhenlNb2R1bGVzLnJlc29sdmVEZXBlbmRlbmN5TW9kdWxlSW5zdGFuY2UoZGVwZW5kZW5jeSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgOiBvZih1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=