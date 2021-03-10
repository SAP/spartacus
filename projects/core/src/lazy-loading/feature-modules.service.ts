import { Injectable, NgModuleRef } from '@angular/core';
import { defer, forkJoin, Observable, of, throwError } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { CmsConfig } from '../cms/config/cms-config';
import { LazyModulesService } from './lazy-modules.service';

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
          return throwError(
            new Error('No module defined for Feature Module ' + featureName)
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const featureConfig = this.cmsConfig.featureModules![featureName];

        this.features.set(
          featureName,
          this.resolveDependencies(featureConfig.dependencies).pipe(
            switchMap((deps) =>
              this.lazyModules.resolveModuleInstance(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                featureConfig.module!,
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

  protected resolveDependencies(
    dependencies: any[] = []
  ): Observable<NgModuleRef<any>[] | undefined> {
    return dependencies?.length
      ? forkJoin(
          dependencies.map((dependency) => {
            if (typeof dependency === 'string') {
              // dependency is a feature, referenced by a feature name
              return this.resolveFeature(dependency);
            }
            // resolve dependency from a module function
            return this.lazyModules.resolveDependencyModuleInstance(dependency);
          })
        )
      : of(undefined);
  }
}
