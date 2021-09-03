import { isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  NgModuleRef,
  PLATFORM_ID,
} from '@angular/core';
import { Route } from '@angular/router';
import {
  CmsComponent,
  CmsComponentChildRoutesConfig,
  CMSComponentConfig,
  CmsComponentMapping,
  CmsConfig,
  ConfigInitializerService,
  deepMerge,
  DeferLoadingStrategy,
} from '@spartacus/core';
import { defer, forkJoin, Observable, of } from 'rxjs';
import { mapTo, share, tap } from 'rxjs/operators';
import { CmsFeaturesService } from './cms-features.service';

/**
 * Service with logic related to resolving component from cms mapping
 */
@Injectable({
  providedIn: 'root',
})
export class CmsComponentsService {
  // Component mappings that were identified as missing
  protected missingComponents: string[] = [];

  // Already resolved mappings
  protected mappings: { [componentType: string]: CmsComponentMapping } = {};

  // Copy of initial/static cms mapping configuration unaffected by lazy-loaded modules
  protected staticCmsConfig: CMSComponentConfig | undefined;

  // Contains already initialized resolvers for specified component typez
  protected mappingResolvers: Map<
    string,
    Observable<CmsComponentMapping>
  > = new Map();

  constructor(
    protected config: CmsConfig,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected featureModules: CmsFeaturesService,
    protected configInitializer: ConfigInitializerService
  ) {
    this.configInitializer
      .getStable('cmsComponents')
      .subscribe((cmsConfig: CmsConfig) => {
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
  determineMappings(componentTypes: string[]): Observable<string[]> {
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
              this.getFeatureMappingResolver(componentType, staticConfig)
            );
          } else {
            // simply use only static config
            this.mappings[componentType] = staticConfig;
          }
        }
      }

      if (featureResolvers.length) {
        return forkJoin(featureResolvers).pipe(mapTo(componentTypes));
      } else {
        return of(componentTypes);
      }
    });
  }

  private getFeatureMappingResolver(
    componentType: string,
    staticConfig?: CmsComponentMapping
  ): Observable<CmsComponentMapping> {
    if (!this.mappingResolvers.has(componentType)) {
      const mappingResolver$ = this.featureModules
        .getCmsMapping(componentType)
        .pipe(
          tap((featureComponentMapping) => {
            // We treat cms mapping configuration from a feature as a default,
            // that can be overridden by app/static configuration
            this.mappings[componentType] = deepMerge(
              {},
              featureComponentMapping,
              staticConfig
            );
            this.mappingResolvers.delete(componentType);
          }),
          share()
        );
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
  getModule(componentType: string): NgModuleRef<any> | undefined {
    return (
      this.featureModules.hasFeatureFor(componentType) &&
      this.featureModules.getModule(componentType)
    );
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
  getMapping(componentType: string): CmsComponentMapping {
    const componentConfig =
      this.mappings[componentType] ??
      (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType];

    if (isDevMode() && !componentConfig) {
      if (!this.missingComponents.includes(componentType)) {
        this.missingComponents.push(componentType);
        console.warn(
          `No component implementation found for the CMS component type '${componentType}'.\n`,
          `Make sure you implement a component and register it in the mapper.`
        );
      }
    }

    return componentConfig;
  }

  /**
   * Checks, if component should be rendered as some components
   * could be disabled for server side renderings
   */
  shouldRender(componentType: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    return !(isSSR && this.getMapping(componentType)?.disableSSR);
  }

  /**
   * Return DeferLoadingStrategy for component type.
   */
  getDeferLoadingStrategy(
    componentType: string
  ): DeferLoadingStrategy | undefined {
    return (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType]
      ?.deferLoading;
  }

  /**
   * Get cms driven child routes for components
   */
  getChildRoutes(componentTypes: string[]): CmsComponentChildRoutesConfig {
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
  getStaticData<T extends CmsComponent = CmsComponent>(
    componentType: string
  ): T | undefined {
    return this.getMapping(componentType)?.data as T;
  }

  /**
   * Standardizes the format of `childRoutes` config.
   *
   * Some `childRoutes` configs are simple arrays of Routes (without the notion of the parent route).
   * But some configs can be an object with children routes and their parent defined in separate property.
   */
  protected standardizeChildRoutes(
    childRoutesConfigs: (Route[] | CmsComponentChildRoutesConfig)[]
  ): CmsComponentChildRoutesConfig {
    const result: CmsComponentChildRoutesConfig = { children: [] };

    (childRoutesConfigs || []).forEach((config) => {
      if (Array.isArray(config)) {
        result.children.push(...config);
      } else {
        result.children.push(...(config.children || []));
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
  getGuards(componentTypes: string[]): any[] {
    const guards = new Set<any>();
    for (const componentType of componentTypes) {
      this.getMapping(componentType)?.guards?.forEach((guard) =>
        guards.add(guard)
      );
    }
    return Array.from(guards);
  }

  /**
   * Get i18n keys associated with components
   */
  getI18nKeys(componentTypes: string[]): string[] {
    const i18nKeys = new Set<string>();
    for (const componentType of componentTypes) {
      if (this.shouldRender(componentType)) {
        this.getMapping(componentType)?.i18nKeys?.forEach((key) =>
          i18nKeys.add(key)
        );
      }
    }
    return Array.from(i18nKeys);
  }
}
