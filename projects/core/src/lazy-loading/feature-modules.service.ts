import { Injectable, isDevMode, NgModuleRef } from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { defer, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { CmsConfig } from '../cms/config/cms-config';

@Injectable({
  providedIn: 'root',
})
export class FeatureModulesService {
  /*
   * Contains resolvers for features.
   * Each resolver runs only once and caches the result.
   */
  private features: Map<string, Observable<NgModuleRef<any>>> = new Map();

  constructor(
    protected cmsConfig: CmsConfig,
    protected lazyModules: LazyModulesService
  ) {}

  /**
   *
   * @param featureName
   */
  isConfigured(featureName: string): boolean {
    return !!this.cmsConfig.featureModules?.[featureName]?.module;
  }

  /**
   * Resolve feature based on feature name, if feature was not yet resolved
   *
   * It will first resolve all module dependencies if defined
   */
  resolveFeature(featureName: string): Observable<NgModuleRef<any>> {
    return defer(() => {
      if (!this.features.has(featureName)) {
        if (!this.isConfigured(featureName)) {
          if (isDevMode()) {
            throw new Error(
              'No module defined for Feature Module ' + featureName
            );
          }
          return EMPTY;
        }

        const featureConfig = this.cmsConfig.featureModules?.[featureName];

        // resolve dependencies first (if any)
        const depsResolve = featureConfig.dependencies?.length
          ? forkJoin(
              featureConfig.dependencies.map((depModuleFunc) =>
                this.lazyModules.resolveDependencyModuleInstance(depModuleFunc)
              )
            )
          : of(undefined);

        this.features.set(
          featureName,
          depsResolve.pipe(
            switchMap((deps) =>
              this.lazyModules.resolveModuleInstance(
                featureConfig?.module,
                featureName,
                deps
              )
            ),
            shareReplay()
          )
        );
      }

      return this.features.get(featureName);
    });
  }
}
