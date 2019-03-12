import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  CmsConfig,
  ContentSlotComponentData,
  CMS_FLEX_COMPONENT_TYPE,
  JSP_INCLUDE_CMS_COMPONENT_TYPE,
  Page
} from '@spartacus/core';
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

  /**
   * The "JspIncludeComponent" and "FlexCmsComponent" are types of CmsComponent that behave
   * as a placeholder component (with no specific data provided).
   *
   * While it's not very clean solution, we interpret the "uid" of the "JspIncludeComponent" and "flextype" of "FlexCmsComponent"
   * as a component type and thanks to that we map it onto the implementation of the Angular (or web) component.
   *
   * CAUTION: The mapped type should not be used for SmartEdit bindings.
   */
  getComponentMappedType(component: ContentSlotComponentData): string {
    switch (component.typeCode) {
      case JSP_INCLUDE_CMS_COMPONENT_TYPE:
        return component.uid;
      case CMS_FLEX_COMPONENT_TYPE:
        return component.flexType;
      default:
        return component.typeCode;
    }
  }

  isComponentMappingEnabled(componentId: string): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const isComponentDisabledInSSR = (
      this.config.cmsComponents[componentId] || {}
    ).disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  getComponentMappings(pageData: Page): string[] {
    const mappings = new Set<string>();
    for (const slot of Object.keys(pageData.slots)) {
      for (const component of pageData.slots[slot].components || []) {
        const mappedType = this.getComponentMappedType(component);
        if (this.isComponentMappingEnabled(mappedType)) {
          mappings.add(mappedType);
        }
      }
    }
    return Array.from(mappings);
  }

  getRoutesFromPageData(pageData: Page): Route[] {
    const routes = [];
    for (const componentId of this.getComponentMappings(pageData)) {
      routes.push(...this.getRoutesFromComponent(componentId));
    }
    return routes;
  }

  private getRoutesFromComponent(componentId: string): Route[] {
    const mappingConfig = this.config.cmsComponents[componentId];
    return (mappingConfig && mappingConfig.childRoutes) || [];
  }
}
