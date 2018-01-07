import { Injectable, Type, ComponentFactoryResolver } from "@angular/core";
import { ConfigService } from "../config.service";

@Injectable()
export class ComponentMapperService {
  missingComponents = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private config: ConfigService
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
  protected getType(typeCode: string) {
    return this.config.cmsComponentMapping[typeCode];
  }

  getComponentTypeByCode(typeCode: string): Type<any> {
    const alias = this.getType(typeCode);

    if (!alias) {
      if (this.missingComponents.indexOf(typeCode) === -1) {
        this.missingComponents.push(typeCode);
        console.warn(
          "No component implementation found for the CMS component type",
          typeCode,
          ".\n",
          "Make sure you implement a component and register it in the mapper."
        );
      }
      return;
    }

    const factories = Array.from(
      this.componentFactoryResolver["_factories"].keys()
    );
    const factoryClass = <Type<any>>factories.find(
      (x: any) => x.name === alias
    );

    return factoryClass;
  }
}
