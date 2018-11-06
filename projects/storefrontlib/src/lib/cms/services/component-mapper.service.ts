import {
  Injectable,
  Type,
  ComponentFactoryResolver,
  Inject,
  Renderer2, PLATFORM_ID
} from '@angular/core';
import { CmsModuleConfig } from '../cms-module-config';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable()
export class ComponentMapperService {
  missingComponents = [];

  private loadedWebComponents: string[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private config: CmsModuleConfig,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platform: any
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
    const alias = this.config.cmsComponentMapping[typeCode];
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
    }
    return alias;
  }

  getComponentTypeByCode(typeCode: string): Type<any> {
    const alias = this.getType(typeCode);
    if (!alias) {
      return;
    }

    const factoryEntries = Array.from(
      this.componentFactoryResolver['_factories'].entries()
    );
    const factoryEntry = factoryEntries.find(
      ([, value]: any) => value.selector === alias
    );

    return factoryEntry ? factoryEntry[0] : null;
  }

  isWebComponent(typeCode: string): boolean {
    return (this.getType(typeCode) || '').includes('#');
  }

  initWebComponent(
    componentType: string,
    renderer: Renderer2
  ): Promise<string> {
    return new Promise(resolve => {
      const [path, selector] = this.getType(componentType).split('#');
      if (this.loadedWebComponents.indexOf(path) > -1) {
        resolve(selector);
      }

      this.loadedWebComponents.push(path);
      const script = renderer.createElement('script');
      script.setAttribute('src', path);
      renderer.appendChild(this.document.body, script);

      if (isPlatformBrowser(this.platform)) {
        script.onload = () => {
          resolve(selector);
        };
      } else {
        resolve(selector);
      }
    });
  }

  getComponentFactoryByCode(componentType: string): any {
    const alias = this.getType(componentType);

    if (!alias) {
      return null;
    }

    const factoryEntries = Array.from(
      this.componentFactoryResolver['_factories'].entries()
    );
    const factoryEntry = factoryEntries.find(
      ([, value]: any) => value.selector === alias
    );

    return factoryEntry ? factoryEntry[1] : null;
  }
}
