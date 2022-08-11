import {
  ElementRef,
  Inject,
  Injectable,
  Injector,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentHandler } from './component-handler';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CxApiService } from '../services/cx-api.service';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import { CmsComponentData } from '../../model';

/**
 * Component handler responsible for launching cms web components.
 */
@Injectable({
  providedIn: 'root',
})
export class WebComponentHandler implements ComponentHandler {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    @Inject(PLATFORM_ID) protected platform: any
  ) {}

  private loadedWebComponents: { [path: string]: any } = {};

  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return (
      typeof componentMapping.component === 'string' &&
      componentMapping.component.includes('#')
    );
  }

  getPriority(): Priority {
    return Priority.LOW; // low, as it's a default matcher
  }

  launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector
  ): Observable<{ elementRef: ElementRef }> {
    return new Observable<{ elementRef: ElementRef }>((subscriber) => {
      let webElement;
      let active = true;
      const injector = elementInjector ?? viewContainerRef.injector;

      const renderer = injector.get(Renderer2);

      const disposeFunc = () => {
        active = false;
        if (webElement) {
          webElement.remove();
        }
      };

      this.initWebComponent(componentMapping.component, renderer).then(
        (elementName) => {
          if (elementName) {
            webElement = renderer.createElement(elementName);

            const cmsComponentData = injector.get(CmsComponentData, null);

            webElement.cxApi = {
              ...injector.get(CxApiService),
              cmsComponentData,
            };

            renderer.appendChild(
              viewContainerRef.element.nativeElement.parentElement,
              webElement
            );

            subscriber.next({ elementRef: new ElementRef(webElement) });

            if (!active) {
              disposeFunc();
            }
          }
        }
      );

      return disposeFunc;
    });
  }

  private initWebComponent(
    component: string,
    renderer: Renderer2
  ): Promise<string> {
    return new Promise((resolve) => {
      const [path, selector] = component.split('#');

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
