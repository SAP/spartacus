import { Injectable, NgModuleRef } from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { defer, forkJoin, Observable, of, throwError } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { CmsConfig, FeatureModuleConfig } from '../cms/config/cms-config';

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
   * Check if feature is configured properly by providing module the shell app
   *
   * @param featureName
   */
  isConfigured(featureName: string): boolean {
    return !!this.getFeatureConfig(featureName)?.module;
  }

  /**
   * Resolve feature based on feature name, if feature was not yet resolved
   *
   * It will first resolve all module dependencies if defined
   */
  resolveFeature(featureName: string): Observable<NgModuleRef<any>> {
    featureName = this.resolveFeatureAlias(featureName);

    return defer(() => {
      if (!this.features.has(featureName)) {
        if (!this.isConfigured(featureName)) {
          return throwError(
            new Error('No module defined for Feature Module ' + featureName)
          );
        }

        const featureConfig = this.getFeatureConfig(featureName);

        this.features.set(
          featureName,
          this.resolveDependencies(featureConfig.dependencies).pipe(
            switchMap((deps) =>
              this.lazyModules.resolveModuleInstance(
                featureConfig.module,
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

  /**
   * Resolve
   * @param featureName
   * @protected
   */
  protected getFeatureConfig(
    featureName: string
  ): FeatureModuleConfig | undefined {
    return this.cmsConfig.featureModules?.[
      this.resolveFeatureAlias(featureName)
    ] as FeatureModuleConfig | undefined;
  }

  /**
   * Will return target feature name, resolving optional feature to feature
   * string mapping
   *
   * @param featureName
   * @protected
   */
  protected resolveFeatureAlias(featureName: string): string {
    while (typeof this.cmsConfig.featureModules?.[featureName] === 'string') {
      featureName = this.cmsConfig.featureModules?.[featureName] as string;
    }
    return featureName;
  }

  /**
   * Resolve dependency modules for the feature
   *
   * @param dependencies
   * @protected
   */
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
