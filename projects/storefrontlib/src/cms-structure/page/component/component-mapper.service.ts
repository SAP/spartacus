import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { CmsConfig } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class ComponentMapperService {
  missingComponents: string[] = [];

  private loadedWebComponents: { [path: string]: any } = {};

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected config: CmsConfig,
    @Inject(DOCUMENT) protected document: any,
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
  protected getComponent(typeCode: string): any {
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
    return componentConfig ? componentConfig.component : null;
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

  isWebComponent(typeCode: string): boolean {
    const component = this.getComponent(typeCode);
    return typeof component === 'string' && (component || '').includes('#');
  }

  initWebComponent(
    componentType: string,
    renderer: Renderer2
  ): Promise<string> {
    return new Promise(resolve => {
      const [path, selector] = this.getComponent(componentType).split('#');

      let script = this.loadedWebComponents[path];

      if (!script) {
        if (path) {
          script = renderer.createElement('script');
          this.loadedWebComponents[path] = script;
          script.setAttribute('src', path);
          renderer.appendChild(this.document.body, script);
          if (isPlatformBrowser(this.platform)) {
            script.onload = () => {
              script.onload = null;
            };
          }
        } else {
          script = {};
        }
      }

      if (script.onload) {
        // If script is still loading (has onload callback defined)
        // add new callback and chain it with the existing one.
        // Needed to support loading multiple components from one script
        const chainedOnload = script.onload;
        script.onload = () => {
          chainedOnload();
          resolve(selector);
        };
      } else {
        resolve(selector);
      }
    });
  }
}
