import {
  Compiler,
  Inject,
  Injectable,
  Injector,
  PLATFORM_ID,
} from '@angular/core';
import {
  CmsComponentMapping,
  CmsConfig,
  DeferLoadingStrategy,
} from '@spartacus/core';
import { Route } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { defer, forkJoin, Observable, of } from 'rxjs';
import { mapTo, share, tap } from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules.service';
import { deepMerge } from '../../../../core/src/config/utils/deep-merge';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentsService {
  private missingComponents: string[] = [];
  private mappings: { [componentType: string]: CmsComponentMapping } = {};
  private resolvingMappings: Map<
    string,
    Observable<CmsComponentMapping>
  > = new Map();

  constructor(
    config: CmsConfig,
    platformId: Object,
    compiler: Compiler,
    injector: Injector
  );
  /**
   * @deprecated since 2.1
   */
  constructor(config: CmsConfig, platformId: Object);
  constructor(
    protected config: CmsConfig,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected compiler?: Compiler,
    protected injector?: Injector,
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
      const featureResolvers = [];

      for (const componentType of componentTypes) {
        if (!this.mappings[componentType]) {
          const staticConfig = this.config.cmsComponents[componentType] ?? {};

          // check if this component type is managed by feature module
          if (this.featureModules.hasFeatureFor(componentType)) {
            featureResolvers.push(
              this.getFeatureMappingResolver(componentType, staticConfig)
            );
          } else {
            // simply use only static config
            this.mappings[componentType] = staticConfig;
          }
        }
      }

      if (featureResolvers.length) {
        return forkJoin(...featureResolvers).pipe(mapTo(componentTypes));
      } else {
        return of(componentTypes);
      }
    });
  }

  private getFeatureMappingResolver(
    componentType: string,
    staticConfig: CmsComponentMapping
  ): Observable<CmsComponentMapping> {
    if (!this.resolvingMappings.has(componentType)) {
      const mappingResolver$ = this.featureModules
        .getCmsMapping(componentType)
        .pipe(
          tap((featureComponentMapping) => {
            // get mapping from feature with static configuration
            this.mappings[componentType] = deepMerge(
              {},
              featureComponentMapping,
              staticConfig
            );
            this.resolvingMappings.delete(componentType);
          }),
          share()
        );
      this.resolvingMappings.set(componentType, mappingResolver$);
    }
    return this.resolvingMappings.get(componentType);
  }

  getInjectors(componentType: string): Injector[] {
    return this.featureModules.getInjectors(componentType) ?? [];
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
    let componentConfig =
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
  getChildRoutes(componentTypes: string[]): Route[] {
    const routes = [];
    for (const componentType of componentTypes) {
      if (this.shouldRender(componentType)) {
        routes.push(...(this.getMapping(componentType)?.childRoutes ?? []));
      }
    }
    return routes;
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
