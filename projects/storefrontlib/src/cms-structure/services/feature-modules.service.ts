import {
  Compiler,
  Injectable,
  InjectFlags,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  OnDestroy,
} from '@angular/core';
import {
  CMSComponentConfig,
  CmsComponentMapping,
  CmsConfig,
  ConfigChunk,
  ConfigInitializerService,
  createFrom,
  deepMerge,
  DefaultConfigChunk,
  EventService,
  FeatureModuleConfig,
  ModuleInitializedEvent,
} from '@spartacus/core';
import {
  combineLatest,
  defer,
  forkJoin,
  from,
  merge,
  Observable,
  of,
  queueScheduler,
} from 'rxjs';
import {
  map,
  observeOn,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

interface FeatureInstance extends FeatureModuleConfig {
  moduleRef?: NgModuleRef<any>;
  depsModules?: any[];
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

  private dependencyModules = new Map<any, NgModuleRef<any>>();

  constructor(
    protected configInitializer: ConfigInitializerService,
    protected compiler: Compiler,
    protected injector: Injector,
    protected events: EventService
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
          ...featureInstance.depsModules.map(
            (module) => this.dependencyModules.get(module).injector
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
                this.resolveDependencyModule(depModuleFunc)
              )
            )
          : of(undefined);

        this.features.set(
          featureName,
          depsResolve.pipe(
            switchMap((deps) => this.resolveFeatureModule(featureConfig, deps)),
            tap((featureInstance) =>
              this.events.dispatch(
                createFrom(ModuleInitializedEvent, {
                  featureName,
                  moduleRef: featureInstance.moduleRef,
                })
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
   * Initialize feature module by returning feature instance
   */
  private resolveFeatureModule(
    featureConfig: FeatureModuleConfig,
    depsModules: any[] = []
  ): Observable<FeatureInstance> {
    return this.resolveModuleFactory(featureConfig?.module).pipe(
      map(([moduleFactory]) => {
        const moduleRef = moduleFactory.create(this.injector);

        const featureInstance: FeatureInstance = {
          ...featureConfig,
          moduleRef,
          depsModules,
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

  /**
   * Resolves dependency module and initializes single module instance
   */
  private resolveDependencyModule(
    moduleFunc: () => Promise<any>
  ): Observable<any> {
    // We grab moduleFactory symbol from module function and if there is no
    // such a module created yet, we create it and store it in a
    // dependencyModules map
    return this.resolveModuleFactory(moduleFunc).pipe(
      tap(([moduleFactory, module]) => {
        if (!this.dependencyModules.has(module)) {
          const moduleRef = moduleFactory.create(this.injector);
          this.dependencyModules.set(module, moduleRef);

          this.events.dispatch(
            createFrom(ModuleInitializedEvent, {
              moduleRef,
            })
          );
        }
      }),
      pluck(1)
    );
  }

  /**
   * Resolve any Angular module from an function that return module or moduleFactory
   */
  private resolveModuleFactory(
    moduleFunc: () => Promise<any>
  ): Observable<[NgModuleFactory<any>, any]> {
    return from(moduleFunc()).pipe(
      switchMap((module) =>
        module instanceof NgModuleFactory
          ? (of([module, module]) as Observable<[NgModuleFactory<any>, any]>)
          : combineLatest([
              // using compiler here is for jit compatibility, there is no overhead
              // for aot production builds as it will be stubbed
              from(this.compiler.compileModuleAsync(module as any)),
              of(module),
            ])
      ),
      observeOn(queueScheduler)
    );
  }

  ngOnDestroy(): void {
    // clean up all initialized features
    merge(...Array.from(this.features.values())).subscribe((featureInstance) =>
      featureInstance.moduleRef?.destroy()
    );

    // clean up all initialized dependency modules
    this.dependencyModules.forEach((dependency) => dependency.destroy());
  }
}
