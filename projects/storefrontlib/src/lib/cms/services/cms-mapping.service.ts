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

  isFlexTypeEnabled(flexType: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const isComponentDisabledInSSR = (this.config.cmsComponents[flexType] || {})
      .disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  getRoutesFromComponents(componentTypes: string[]): Route[] {
    const routes = [];
    for (const componentId of componentTypes) {
      if (this.isFlexTypeEnabled(componentId)) {
        routes.push(...this.getRoutesForComponent(componentId));
      }
    }
    return routes;
  }

  private getRoutesForComponent(flexType: string): Route[] {
    const mappingConfig = this.config.cmsComponents[flexType];
    return (mappingConfig && mappingConfig.childRoutes) || [];
  }
}
