import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CmsComponentMapping, CmsConfig } from '@spartacus/core';
import { ComponentType } from '../model/component-type.model';

@Injectable({ providedIn: 'root' })
export class ComponentMapperService {
  missingComponents: string[] = [];

  constructor(
    protected config: CmsConfig,
    @Inject(PLATFORM_ID) protected platform: any
  ) {}

  /**
   * @desc
   * returns a web component for the CMS typecode.
   *
   * The mapping of CMS components to web componetns requires a mapping.
   * This is configurable when the module is loaded.
   *
   * For example:
   *
   *  {
   *      'CMSLinkComponent': 'LinkComponent',
   *      'SimpleResponsiveBannerComponent': 'SimpleResponsiveBannerComponent',
   *      [etc.]
   *  }
   *
   * The type codes are dynamic since they depend on the implementation.
   * Customer will add, extend or ingore standard components.
   *
   * @param typeCode the component type
   */
  public getComponent(typeCode: string): any {
    const componentConfig = this.getComponentConfig(typeCode);
    return componentConfig ? componentConfig.component : null;
  }

  protected getComponentConfig(typeCode: string): CmsComponentMapping {
    const componentConfig = this.config.cmsComponents[typeCode];

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

  shouldRenderComponent(typeCode: string): boolean {
    const isSSR = isPlatformServer(this.platform);
    const isComponentDisabledInSSR = (this.config.cmsComponents[typeCode] || {})
      .disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  getComponentType(typeCode: string): ComponentType {
    const componentConfig = this.getComponentConfig(typeCode);

    if (
      typeof componentConfig?.component === 'string' &&
      (componentConfig?.component || '').includes('#')
    ) {
      return ComponentType.WebComponent;
    }

    return ComponentType.CmsComponent;
  }
}
