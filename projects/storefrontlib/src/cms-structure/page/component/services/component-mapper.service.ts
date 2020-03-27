import { isPlatformServer } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { CmsConfig } from '@spartacus/core';
import { CmsComponentMapping } from '../../../../../../core/src/cms/config';
import { ComponentType } from '../model/component-type.model';

@Injectable({ providedIn: 'root' })
export class ComponentMapperService {
  missingComponents: string[] = [];

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
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
    if (!componentConfig) {
      if (!this.missingComponents.includes(typeCode)) {
        this.missingComponents.push(typeCode);
        console.warn(
          `No component implementation found for the CMS component type '${typeCode}'.\n`,
          `Make sure you implement a component and register it in the mapper.`
        );
      }
    }
    return componentConfig ? componentConfig.component : null;
  }

  protected getComponentConfig(typeCode: string): CmsComponentMapping {
    return this.config.cmsComponents[typeCode];
  }

  getComponentFactoryByCode(typeCode: string): any {
    const component = this.getComponent(typeCode);
    if (!component) {
      return null;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    if (!factory) {
      console.warn(
        `No component factory found for the CMS component type '${typeCode}'.\n`,
        `Make sure you add a component to the 'entryComponents' array in the NgModule.`
      );
      return null;
    }
    return factory;
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
      typeof componentConfig.component === 'string' &&
      (componentConfig.component || '').includes('#')
    ) {
      return ComponentType.WebComponent;
    }

    return ComponentType.CmsComponent;
  }
}
