import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CmsConfig } from '@spartacus/core';
import { Route } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
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

  getI18nNamespacesForComponents(componentTypes: string[]): string[] {
    const namespaces = new Set<string>();
    for (const componentType of componentTypes) {
      if (this.isComponentEnabled(componentType)) {
        this.getNamespaces18NForComponent(componentType).forEach(namespace =>
          namespaces.add(namespace)
        );
      }
    }
    return Array.from(namespaces);
  }

  private getRoutesForComponent(componentType: string): Route[] {
    const mappingConfig = this.config.cmsComponents[componentType];
    return (mappingConfig && mappingConfig.childRoutes) || [];
  }

  private getNamespaces18NForComponent(componentType: string): string[] {
    const mappingConfig = this.config.cmsComponents[componentType];
    return (mappingConfig && mappingConfig.i18nNamespaces) || [];
  }
}
