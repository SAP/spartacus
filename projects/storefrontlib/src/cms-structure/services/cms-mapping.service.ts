import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CmsComponentMapping, CmsConfig } from '@spartacus/core';
import { Route } from '@angular/router';
import { isPlatformServer } from '@angular/common';

/**
 * Please don't put that service in public API.
 * */
@Injectable({
  providedIn: 'root',
})
export class CmsMappingService {
  private missingComponents: string[] = [];

  constructor(
    private config: CmsConfig,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public getComponentMapping(typeCode: string): CmsComponentMapping {
    const componentConfig = this.config.cmsComponents?.[typeCode];

    if (!componentConfig) {
      if (!this.missingComponents.includes(typeCode)) {
        this.missingComponents.push(typeCode);
        console.warn(
          `No component implementation found for the CMS component type '${typeCode}'.\n`,
          `Make sure you implement a component and register it in the mapper.`
        );
      }
    }

    return componentConfig;
  }

  isComponentEnabled(flexType: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    return !(isSSR && this.getComponentMapping(flexType)?.disableSSR);
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
      this.getGuardsForComponent(componentType).forEach((guard) =>
        guards.add(guard)
      );
    }
    return Array.from(guards);
  }

  getI18nKeysForComponents(componentTypes: string[]): string[] {
    const i18nKeys = new Set<string>();
    for (const componentType of componentTypes) {
      if (this.isComponentEnabled(componentType)) {
        this.getI18nKeysForComponent(componentType).forEach((key) =>
          i18nKeys.add(key)
        );
      }
    }
    return Array.from(i18nKeys);
  }

  private getRoutesForComponent(componentType: string): Route[] {
    return this.getComponentMapping(componentType)?.childRoutes ?? [];
  }

  private getGuardsForComponent(componentType: string): any[] {
    return this.getComponentMapping(componentType)?.guards ?? [];
  }

  private getI18nKeysForComponent(componentType: string): string[] {
    return this.getComponentMapping(componentType)?.i18nKeys ?? [];
  }
}
