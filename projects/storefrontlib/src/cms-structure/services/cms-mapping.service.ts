import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CmsConfig } from '@spartacus/core';
import { Route } from '@angular/router';
import { isPlatformServer } from '@angular/common';

/**
 * Please don't put that service in public API.
 * */
@Injectable({
  providedIn: 'root',
})
export class CmsMappingService {
  constructor(
    private config: CmsConfig,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isComponentEnabled(flexType: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const isComponentDisabledInSSR = (this.config.cmsComponents[flexType] || {})
      .disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  getRoutesForComponents(componentTypes: string[]): Route[] {
    const routes = [];
    for (const componentType of componentTypes) {
      if (this.isComponentEnabled(componentType)) {
        routes.push(...this.getRoutesForComponent(componentType));
      }
    }
    return routes;
  }

  getGuardsForComponents(componentTypes: string[]): any[] {
    const guards = new Set<any>();
    for (const componentType of componentTypes) {
      this.getGuardsForComponent(componentType).forEach(guard =>
        guards.add(guard)
      );
    }
    return Array.from(guards);
  }

  getI18nKeysForComponents(componentTypes: string[]): string[] {
    const i18nKeys = new Set<string>();
    for (const componentType of componentTypes) {
      if (this.isComponentEnabled(componentType)) {
        this.getI18nKeysForComponent(componentType).forEach(key =>
          i18nKeys.add(key)
        );
      }
    }
    return Array.from(i18nKeys);
  }

  private getRoutesForComponent(componentType: string): Route[] {
    const mappingConfig = this.config.cmsComponents[componentType];
    return (mappingConfig && mappingConfig.childRoutes) || [];
  }

  private getGuardsForComponent(componentType: string): any[] {
    const mappingConfig = this.config.cmsComponents[componentType];
    return (mappingConfig && mappingConfig.guards) || [];
  }

  private getI18nKeysForComponent(componentType: string): string[] {
    const mappingConfig = this.config.cmsComponents[componentType];
    return (mappingConfig && mappingConfig.i18nKeys) || [];
  }
}
