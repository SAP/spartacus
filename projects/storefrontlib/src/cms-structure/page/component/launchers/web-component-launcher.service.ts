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
import { ComponentLauncher } from './component-launcher';
import { CmsDataService } from '../services/cms-data.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CxApiService } from '../services/cx-api.service';
import { CmsMappingService } from '../../../services/cms-mapping.service';
import { CmsComponentMapping, Priority } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class WebComponentLauncherService implements ComponentLauncher {
  constructor(
    protected cmsMapping: CmsMappingService,
    private cmsData: CmsDataService,
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

  getLauncher(
    componentType: string,
    uid: string,
    directiveInjector: Injector
  ): Observable<[ElementRef]> {
    return new Observable<any>((observer) => {
      let webElement;
      let active = true;

      const renderer = directiveInjector.get(Renderer2);

      const disposeFunc = () => {
        active = false;
        if (webElement) {
          webElement.remove();
        }
      };

      this.initWebComponent(componentType, renderer).then((elementName) => {
        if (elementName) {
          webElement = renderer.createElement(elementName);

          const cmsComponentData = this.cmsData.getCmsDataForComponent(
            uid,
            directiveInjector
          );

          webElement.cxApi = {
            ...directiveInjector.get(CxApiService),
            cmsComponentData,
          };

          renderer.appendChild(
            directiveInjector.get(ViewContainerRef).element.nativeElement
              .parentElement,
            webElement
          );

          observer.next([new ElementRef(webElement)]);

          if (!active) {
            disposeFunc();
          }
        }
      });

      return disposeFunc;
    });
  }

  initWebComponent(
    componentType: string,
    renderer: Renderer2
  ): Promise<string> {
    return new Promise((resolve) => {
      const [path, selector] = this.cmsMapping
        .getComponentMapping(componentType)
        ?.component.split('#');

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
