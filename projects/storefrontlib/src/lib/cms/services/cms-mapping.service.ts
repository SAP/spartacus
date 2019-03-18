import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CmsConfig, Page } from '@spartacus/core';
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

  isFlexTypeEnabled(flexType: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const isComponentDisabledInSSR = (this.config.cmsComponents[flexType] || {})
      .disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  getFlexTypesFromPage(pageData: Page): string[] {
    const mappings = new Set<string>();
    for (const slot of Object.keys(pageData.slots)) {
      for (const component of pageData.slots[slot].components || []) {
        if (this.isFlexTypeEnabled(component.flexType)) {
          mappings.add(component.flexType);
        }
      }
    }
    return Array.from(mappings);
  }

  getRoutesFromPage(pageData: Page): Route[] {
    const routes = [];
    for (const componentId of this.getFlexTypesFromPage(pageData)) {
      routes.push(...this.getRoutesForComponent(componentId));
    }
    return routes;
  }

  private getRoutesForComponent(flexType: string): Route[] {
    const mappingConfig = this.config.cmsComponents[flexType];
    return (mappingConfig && mappingConfig.childRoutes) || [];
  }
}
