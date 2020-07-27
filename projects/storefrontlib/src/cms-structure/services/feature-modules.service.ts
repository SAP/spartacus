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
  configurationFactory,
  DefaultConfigChunk,
  FeatureModuleConfig,
} from '@spartacus/core';
import {
  combineLatest,
  defer,
  forkJoin,
  from,
  Observable,
  of,
  queueScheduler,
} from 'rxjs';
import { map, observeOn, pluck, share, switchMap, tap } from 'rxjs/operators';

interface FeatureInstance extends FeatureModuleConfig {
  moduleRef?: NgModuleRef<any>;
  depsModules?: any[];
  injectors?: Injector[];
  componentsMappings?: CMSComponentConfig;
}

/**
 * Service responsible for resolving feature domains
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureModulesService implements OnDestroy {
  // maps componentType to feature
  private componentFeatureMap: Map<string, string> = new Map();

  private featureModulesConfig?: {
    [featureName: string]: FeatureInstance;
  };

  private featureResolvers: Map<
    string,
    Observable<FeatureInstance>
  > = new Map();

  private features: Map<string, FeatureInstance> = new Map();

  private dependencyModules = new Map<any, NgModuleRef<any>>();

  constructor(
    protected configInitializer: ConfigInitializerService,
    protected compiler: Compiler,
    protected injector: Injector
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
      if (featureConfig.cmsComponents?.length) {
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
   */
  getInjectors(componentType: string): Injector[] {
    const featureName = this.componentFeatureMap.get(componentType);
    return this.features.get(featureName)?.injectors;
  }

  private resolveFeature(featureName: string): Observable<FeatureInstance> {
    return defer(() => {
      if (this.features.has(featureName)) {
        return of(this.features.get(featureName));
      }

      if (!this.featureResolvers.has(featureName)) {
        const featureConfig = this.featureModulesConfig[featureName];

        if (!featureConfig?.module) {
          throw 'No module defined for Feature Module ' + featureName;
        }

        const depsResolve = featureConfig.dependencies?.length
          ? forkJoin(
              featureConfig.dependencies.map((depModuleFunc) =>
                this.resolveDependencyModule(depModuleFunc)
              )
            )
          : of(undefined);

        this.featureResolvers.set(
          featureName,
          depsResolve.pipe(
            switchMap((deps) => this.resolveFeatureModule(featureConfig, deps)),
            tap((featureInstance) => {
              this.features.set(featureName, featureInstance);

              this.featureResolvers.delete(featureName);
            }),
            share()
          )
        );
      }
      return this.featureResolvers.get(featureName);
    });
  }

  private resolveFeatureModule(
    featureConfig: FeatureModuleConfig,
    depsModules: any[] = []
  ): Observable<FeatureInstance> {
    return from(featureConfig?.module()).pipe(
      switchMap((module) =>
        module instanceof NgModuleFactory
          ? of(module)
          : from(this.compiler.compileModuleAsync(module as any))
      ),
      observeOn(queueScheduler),
      map((moduleFactory: NgModuleFactory<any>) => {
        const moduleRef = moduleFactory.create(this.injector);

        const injectors = [
          moduleRef.injector,
          ...depsModules.map(
            (module) => this.dependencyModules.get(module).injector
          ),
        ];

        const featureInstance: FeatureInstance = {
          ...featureConfig,
          moduleRef,
          depsModules,
          injectors,
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
   * Returns feature configuration by composing root configuration tokens with
   * configuration tokens retrieved from feature library
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

    return configurationFactory(
      featureConfigChunks,
      featureDefaultConfigChunks
    ) as CmsConfig;
  }

  private resolveDependencyModule(
    moduleFunc: () => Promise<any>
  ): Observable<any> {
    return from(moduleFunc()).pipe(
      switchMap((module) =>
        module instanceof NgModuleFactory
          ? (of([module, module]) as Observable<[NgModuleFactory<any>, any]>)
          : combineLatest([
              from(this.compiler.compileModuleAsync(module as any)),
              of(module),
            ])
      ),
      observeOn(queueScheduler),
      tap(([moduleFactory, module]) => {
        if (!this.dependencyModules.has(module)) {
          const moduleRef = moduleFactory.create(this.injector);
          this.dependencyModules.set(module, moduleRef);
        }
      }),
      pluck(1)
    );
  }

  ngOnDestroy(): void {
    // clean up all initialized features
    this.features.forEach((featureInstance) => {
      featureInstance.moduleRef?.destroy();
    });

    // clean up all initialized dependency modules
    this.dependencyModules.forEach((dependency) => dependency.destroy());
  }
}
