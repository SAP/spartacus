import {
  Injectable,
  InjectFlags,
  Injector,
  NgModuleRef,
  OnDestroy,
} from '@angular/core';
import {
  CMSComponentConfig,
  CmsComponentMapping,
  CmsConfig,
  ConfigChunk,
  ConfigInitializerService,
  deepMerge,
  DefaultConfigChunk,
  FeatureModuleConfig,
  LazyModulesService,
} from '@spartacus/core';
import { defer, forkJoin, merge, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

interface FeatureInstance extends FeatureModuleConfig {
  moduleRef?: NgModuleRef<any>;
  dependencyModuleRefs?: NgModuleRef<any>[];
  componentsMappings?: CMSComponentConfig;
}

/**
 * Service responsible for resolving cms config based feature modules.
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureModulesService implements OnDestroy {
  // feature modules configuration
  private featureModulesConfig?: {
    [featureName: string]: FeatureModuleConfig;
  };

  // maps componentType to feature
  private componentFeatureMap: Map<string, string> = new Map();

  /*
   * Contains either FeatureInstance or FeatureInstance resolver for not yet
   * resolved feature modules
   */
  private features: Map<string, Observable<FeatureInstance>> = new Map();

  constructor(
    protected configInitializer: ConfigInitializerService,
    protected lazyModules: LazyModulesService
  ) {
    this.initFeatureMap();
  }

  private async initFeatureMap(): Promise<void> {
    const config: CmsConfig = await this.configInitializer.getStableConfig(
      'featureModules'
    );

    this.featureModulesConfig = config.featureModules ?? {};

    for (const [featureName, featureConfig] of Object.entries(
      this.featureModulesConfig
    )) {
      if (featureConfig?.cmsComponents?.length) {
        for (const component of featureConfig.cmsComponents) {
          this.componentFeatureMap.set(component, featureName);
        }
      }
    }
  }

  /**
   * Check if there is feature module configuration that covers specified
   * component type
   */
  hasFeatureFor(componentType: string): boolean {
    return this.componentFeatureMap.has(componentType);
  }

  /**
   * Return full CmsComponent mapping defined in feature module
   */
  getCmsMapping(componentType: string): Observable<CmsComponentMapping> {
    const feature = this.componentFeatureMap.get(componentType);

    return this.resolveFeature(feature).pipe(
      map(
        (featureInstance) => featureInstance.componentsMappings[componentType]
      )
    );
  }

  /**
   * Get all injectors for feature and its dependencies
   *
   * As it's a synchronous method, it works only for already resolved features,
   * returning undefined otherwise
   */
  getInjectors(componentType: string): Injector[] | undefined {
    const feature = this.componentFeatureMap.get(componentType);
    let injectors;

    // we are returning injectors only for already resolved features
    this.features
      .get(feature)
      ?.subscribe((featureInstance) => {
        injectors = [
          // feature module injector
          featureInstance.moduleRef.injector,
          // injectors from dependency modules
          ...featureInstance.dependencyModuleRefs.map(
            (moduleRef) => moduleRef.injector
          ),
        ];
      })
      .unsubscribe();
    return injectors;
  }

  /**
   * Resolve feature based on feature name, if feature was not yet resolved
   *
   * It will first resolve all module dependencies if defined
   */
  private resolveFeature(featureName: string): Observable<FeatureInstance> {
    return defer(() => {
      if (!this.features.has(featureName)) {
        const featureConfig = this.featureModulesConfig[featureName];

        if (!featureConfig?.module) {
          throw new Error(
            'No module defined for Feature Module ' + featureName
          );
        }

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
              this.resolveFeatureModule(featureConfig, deps, featureName)
            ),
            shareReplay()
          )
        );
      }

      return this.features.get(featureName);
    });
  }

  /**
   * Initialize feature module by returning feature instance
   */
  private resolveFeatureModule(
    featureConfig: FeatureModuleConfig,
    dependencyModuleRefs: NgModuleRef<any>[] = [],
    feature: string
  ): Observable<FeatureInstance> {
    return this.lazyModules
      .resolveModuleInstance(featureConfig?.module, feature)
      .pipe(
        map((moduleRef) => {
          const featureInstance: FeatureInstance = {
            ...featureConfig,
            moduleRef,
            dependencyModuleRefs,
            componentsMappings: {},
          };

          // resolve configuration for feature module
          const resolvedConfiguration = this.resolveFeatureConfiguration(
            moduleRef.injector
          );

          // extract cms components configuration from feature config
          for (const componentType of featureInstance.cmsComponents) {
            featureInstance.componentsMappings[componentType] =
              resolvedConfiguration.cmsComponents[componentType];
          }
          return featureInstance;
        })
      );
  }

  /**
   * Returns configuration provided in feature module
   */
  private resolveFeatureConfiguration(featureInjector: Injector): CmsConfig {
    // get config chunks from feature lib
    const featureConfigChunks = featureInjector.get<any[]>(
      ConfigChunk,
      [],
      InjectFlags.Self
    );
    // get default config chunks from feature lib
    const featureDefaultConfigChunks = featureInjector.get<any[]>(
      DefaultConfigChunk,
      [],
      InjectFlags.Self
    );

    return deepMerge(
      {},
      ...(featureDefaultConfigChunks ?? []),
      ...(featureConfigChunks ?? [])
    ) as CmsConfig;
  }

  ngOnDestroy(): void {
    // clean up all initialized features
    merge(...Array.from(this.features.values())).subscribe((featureInstance) =>
      featureInstance.moduleRef?.destroy()
    );
  }
}
