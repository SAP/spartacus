import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Route } from '@angular/router';
import {
  CmsComponentChildRoutesConfig,
  CmsComponentMapping,
  CmsConfig,
  deepMerge,
  DeferLoadingStrategy,
} from '@spartacus/core';
import { defer, forkJoin, Observable, of } from 'rxjs';
import { mapTo, share, tap } from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules.service';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentsService {
  private missingComponents: string[] = [];
  private mappings: { [componentType: string]: CmsComponentMapping } = {};

  // contains
  private mappingResolvers: Map<
    string,
    Observable<CmsComponentMapping>
  > = new Map();

  /**
   * @deprecated since 2.1
   * constructor(config: CmsConfig, platformId: Object);
   */
  constructor(
    protected config: CmsConfig,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected featureModules?: FeatureModulesService
  ) {}

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
          const staticConfig = this.config.cmsComponents[componentType];

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

  getInjectors(componentType: string): Injector[] {
    return (
      (this.featureModules.hasFeatureFor(componentType) &&
        this.featureModules.getInjectors(componentType)) ??
      []
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
      this.config.cmsComponents?.[componentType];

    if (!componentConfig) {
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
  getDeferLoadingStrategy(componentType: string): DeferLoadingStrategy {
    return this.config.cmsComponents?.[componentType]?.deferLoading;
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
   * Standardizes the format to an object with defined parent and children routes, even if parent is undefined
   *
   * Some `childRoutes` configs are simple arrays of Routes (without the notion of the parent route).
   * But some configs can be an object with children routes and their parent defined in separate property.
   */
  private standardizeChildRoutes(
    childRoutesConfigs: (Route[] | CmsComponentChildRoutesConfig)[]
  ): CmsComponentChildRoutesConfig {
    return (childRoutesConfigs || []).reduce<CmsComponentChildRoutesConfig>(
      (result, config) =>
        Array.isArray(config)
          ? // config is an array of child routes:
            {
              parent: result.parent,
              children: [...result.children, ...config],
            }
          : // config is an object with `parent` and `children` properties:
            {
              parent: config.parent ?? result.parent,
              children: [...result.children, ...config.children],
            },
      {
        parent: undefined,
        children: [],
      }
    );
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
