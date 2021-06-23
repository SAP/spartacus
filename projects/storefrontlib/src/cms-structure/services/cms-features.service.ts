import { Injectable, InjectFlags, Injector, NgModuleRef } from '@angular/core';
import {
  CMSComponentConfig,
  CmsComponentMapping,
  CmsConfig,
  ConfigChunk,
  ConfigInitializerService,
  deepMerge,
  DefaultConfigChunk,
  FeatureModuleConfig,
  FeatureModulesService,
} from '@spartacus/core';
import { defer, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface FeatureInstance extends FeatureModuleConfig {
  moduleRef?: NgModuleRef<any>;
  componentsMappings?: CMSComponentConfig;
}

/**
 * Service responsible for resolving cms config based feature modules.
 */
@Injectable({
  providedIn: 'root',
})
export class CmsFeaturesService {
  // feature modules configuration
  private featureModulesConfig?: {
    [featureName: string]: FeatureModuleConfig | string;
  };

  // maps componentType to feature
  private componentFeatureMap: Map<string, string> = new Map();

  /*
   * Contains either FeatureInstance or FeatureInstance resolver for not yet
   * resolved feature modules
   */
  private featureInstances: Map<string, Observable<FeatureInstance>> =
    new Map();

  constructor(
    protected configInitializer: ConfigInitializerService,
    protected featureModules: FeatureModulesService
  ) {
    this.initFeatureMap();
  }

  private initFeatureMap(): void {
    this.configInitializer
      .getStable('featureModules')
      .subscribe((config: CmsConfig) => {
        this.featureModulesConfig = config.featureModules ?? {};

        for (const [featureName, featureConfig] of Object.entries(
          this.featureModulesConfig
        )) {
          if (
            typeof featureConfig !== 'string' &&
            featureConfig?.module &&
            featureConfig?.cmsComponents?.length
          ) {
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
  hasFeatureFor(componentType: string): boolean {
    return this.componentFeatureMap.has(componentType);
  }

  /**
   * Return full CmsComponent mapping defined in feature module
   */
  getCmsMapping(
    componentType: string
  ): Observable<CmsComponentMapping | undefined> {
    const feature = this.componentFeatureMap.get(componentType);

    if (!feature) {
      return of(undefined);
    }

    return this.resolveFeatureInstance(feature).pipe(
      map(
        (featureInstance) => featureInstance.componentsMappings?.[componentType]
      )
    );
  }

  /**
   * Resolves feature module for provided component type
   *
   * @param componentType
   */
  getModule(componentType: string): NgModuleRef<any> | undefined {
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
  private resolveFeatureInstance(
    featureName: string
  ): Observable<FeatureInstance> {
    return defer(() => {
      if (!this.featureInstances.has(featureName)) {
        this.featureInstances.set(
          featureName,
          this.featureModules.resolveFeature(featureName).pipe(
            map((moduleRef) =>
              this.createFeatureInstance(moduleRef, featureName)
            ),
            shareReplay()
          )
        );
      }

      return this.featureInstances.get(featureName);
    });
  }

  /**
   * Create feature instance from feature's moduleRef
   */
  private createFeatureInstance(
    moduleRef: NgModuleRef<any>,
    feature: string
  ): FeatureInstance {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const featureConfig = this.featureModulesConfig![
      feature
    ] as FeatureModuleConfig;

    const featureInstance: FeatureInstance = {
      moduleRef,
      componentsMappings: {},
    };

    // resolve configuration for feature module
    const resolvedConfiguration = this.resolveFeatureConfiguration(
      moduleRef.injector
    );

    // extract cms components configuration from feature config
    for (const componentType of featureConfig.cmsComponents ?? []) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      featureInstance.componentsMappings![componentType] =
        resolvedConfiguration.cmsComponents?.[componentType] ?? {};
    }
    return featureInstance;
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
}
