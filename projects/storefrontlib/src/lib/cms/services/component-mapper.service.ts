import {
  Injectable,
  Type,
  ComponentFactoryResolver,
  Inject
} from '@angular/core';
import { CmsModuleConfig } from '../cms-module-config';

@Injectable()
export class ComponentMapperService {
  missingComponents = [];
  private cmsComponentMapping: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private config: CmsModuleConfig,
    @Inject('CMS_COMPONENT_MAPPING')
    protected customCmsComponentMappingProviders
  ) {
    let customCmsComponentMappings = {};
    customCmsComponentMappingProviders.forEach(element => {
      customCmsComponentMappings = {
        ...customCmsComponentMappings,
        ...element
      };
    });

    this.cmsComponentMapping = {
      ...this.config.cmsComponentMapping,
      ...customCmsComponentMappings
    };
  }
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
  protected getType(typeCode: string) {
    return this.cmsComponentMapping[typeCode];
  }

  getComponentTypeByCode(typeCode: string): Type<any> {
    const alias = this.getType(typeCode);
    if (!alias) {
      if (this.missingComponents.indexOf(typeCode) === -1) {
        this.missingComponents.push(typeCode);
        console.warn(
          'No component implementation found for the CMS component type',
          typeCode,
          '.\n',
          'Make sure you implement a component and register it in the mapper.'
        );
      }
      return;
    }

    const factories = Array.from(
      this.componentFactoryResolver['_factories'].keys()
    );
    const factoryClass = <Type<any>>(
      factories.find((x: any) => x.componentName === alias)
    );
    if (!factoryClass) {
      console.warn(
        `No factory class found for typecode CMS component alias ${alias}`
      );
    }

    return factoryClass;
  }
}
