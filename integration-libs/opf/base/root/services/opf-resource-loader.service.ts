/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import {
  Injectable,
  NgZone,
  PLATFORM_ID,
  inject,
  DOCUMENT,
} from '@angular/core';
import {
  Config,
  ScriptLoader,
  LoggerService,
  WindowRef,
} from '@spartacus/core';

import {
  OpfDynamicScript,
  OpfDynamicScriptResource,
  OpfDynamicScriptResourceType,
  OpfHtmlContentMode,
  OpfKeyValueMap,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class OpfResourceLoaderService {
  protected scriptLoader = inject(ScriptLoader);
  protected document = inject(DOCUMENT);
  protected platformId = inject(PLATFORM_ID);
  protected config = inject(Config);
  protected windowRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected logger = inject(LoggerService);

  protected readonly CORS_DEFAULT_VALUE = 'anonymous';
  protected readonly OPF_RESOURCE_LOAD_ONCE_ATTRIBUTE_KEY = 'opf-load-once';
  protected readonly OPF_RESOURCE_ATTRIBUTE_KEY = 'data-opf-resource';

  protected embedStyles(embedOptions: {
    attributes?: { [key: string]: string };
    src: string;
    sri?: string;
    callback?: EventListener;
    errorCallback: EventListener;
  }): void {
    const { attributes, src, sri, callback, errorCallback } = embedOptions;

    const link: HTMLLinkElement = this.document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if (sri) {
      link.integrity = sri;
      link.crossOrigin = attributes?.['crossorigin'] ?? this.CORS_DEFAULT_VALUE;
      delete attributes?.['crossorigin'];
    }

    attributes &&
      Object.keys(attributes)?.forEach((key) => {
        if (!(key in link)) {
          link.setAttribute(key, attributes[key as keyof object]);
        }
      });

    if (callback) {
      link.addEventListener('load', callback);
    }

    if (errorCallback) {
      link.addEventListener('error', errorCallback);
    }

    this.document.head.appendChild(link);
  }

  protected hasStyles(src?: string): boolean {
    return !!this.document.querySelector(`link[href="${src}"]`);
  }

  protected hasScript(src?: string): boolean {
    return this.scriptLoader.hasScript(src);
  }

  /**
   * Create attributes intended to script and link elements.
   *
   * Return attributes list including keyValueList and OPF specific attribute with below logic:
   *
   * 1. Resource loads only once: 'opf-load-once' key detected, no additional attribute added.
   * 2. Resource deleted at page/payment change: 'data-opf-resource' attribute is added.
   */

  protected createAttributesList(keyValueList?: OpfKeyValueMap[] | undefined): {
    [key: string]: string;
  } {
    const attributes: { [key: string]: string } = {};
    keyValueList?.forEach((keyValue: OpfKeyValueMap) => {
      attributes[keyValue.key] = keyValue.value;
    });
    if (
      !attributes?.[this.OPF_RESOURCE_LOAD_ONCE_ATTRIBUTE_KEY] ||
      attributes[this.OPF_RESOURCE_LOAD_ONCE_ATTRIBUTE_KEY] !== 'true'
    ) {
      attributes[this.OPF_RESOURCE_ATTRIBUTE_KEY] = 'true';
    }
    delete attributes?.[this.OPF_RESOURCE_LOAD_ONCE_ATTRIBUTE_KEY];
    return attributes;
  }

  /**
   * Loads a script specified in the resource object.
   *
   * The returned Promise is resolved when the script is loaded or already present.
   * The returned Promise is rejected when a loading error occurs.
   */

  protected loadScript(resource: OpfDynamicScriptResource): Promise<void> {
    return new Promise((resolve, reject) => {
      const attributes: { [key: string]: string } = {
        type: 'text/javascript',
        ...this.createAttributesList(resource.attributes),
      };

      if (resource?.sri) {
        attributes['integrity'] = resource.sri;
        attributes['crossOrigin'] =
          attributes?.['crossorigin'] ?? this.CORS_DEFAULT_VALUE;
        delete attributes?.['crossorigin'];
      }
      if (resource?.url && !this.hasScript(resource.url)) {
        this.scriptLoader.embedScript({
          attributes,
          src: resource.url,
          callback: () => resolve(),
          errorCallback: () => reject(),
          disableKeyRestriction: true,
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Loads a stylesheet specified in the resource object.
   *
   * The returned Promise is resolved when the stylesheet is loaded or already present.
   * The returned Promise is rejected when a loading error occurs.
   */

  protected loadStyles(resource: OpfDynamicScriptResource): Promise<void> {
    return new Promise((resolve, reject) => {
      if (resource.url && !this.hasStyles(resource.url)) {
        this.embedStyles({
          attributes: this.createAttributesList(resource?.attributes),
          src: resource.url,
          sri: resource?.sri,
          callback: () => resolve(),
          errorCallback: () => reject(),
        });
      } else {
        resolve();
      }
    });
  }

  executeScriptFromHtml(html: string | undefined) {
    // SSR mode not supported for security concerns
    if (!isPlatformServer(this.platformId) && html) {
      const element = new DOMParser().parseFromString(html, 'text/html');
      const script = element.getElementsByTagName('script');
      if (!script?.[0]?.innerText) {
        return;
      }
      Function(script[0].innerText)();
    }
  }

  clearAllResources() {
    this.document
      .querySelectorAll(`[${this.OPF_RESOURCE_ATTRIBUTE_KEY}]`)
      .forEach((resource) => {
        if (resource) {
          resource.remove();
        }
      });
  }

  /**
   * Parses jsContext JSON string and nested JSON strings (e.g., responseBody)
   * Returns empty object if parsing fails to allow graceful degradation
   */
  protected parseContext(jsContext?: string): any {
    if (!jsContext) {
      return {};
    }

    try {
      const parsed = JSON.parse(jsContext);
      if (parsed.responseBody && typeof parsed.responseBody === 'string') {
        try {
          parsed.responseBody = JSON.parse(parsed.responseBody);
        } catch (error) {
          this.logger.warn(
            'Failed to parse nested responseBody as JSON, keeping as string:',
            error
          );
        }
      }
      return parsed;
    } catch (error) {
      this.logger.warn(
        'Failed to parse jsContext as JSON, using empty object:',
        error
      );
      return {};
    }
  }

  /**
   * Execute script with context passed via global variable (no wrapping)
   * This allows using the original script hash from jsHash without modification
   * Context is set in window.OpfContext before script execution
   */
  protected executeScriptWithContext(
    originalScript: string,
    contextData: any
  ): void {
    // Run outside Angular zone since script execution doesn't need change detection
    this.ngZone.runOutsideAngular(() => {
      if (this.windowRef.isBrowser() && this.windowRef.nativeWindow) {
        const nativeWindow = this.windowRef.nativeWindow as any;
        if (nativeWindow.OpfContext) {
          delete nativeWindow.OpfContext;
        }

        nativeWindow.OpfContext = contextData ?? {};
        nativeWindow.OpfContext.additionalData ??= {};
      }

      const scriptElement = this.document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.textContent = originalScript;
      scriptElement.setAttribute('data-opf-script', 'true');
      this.document.head.appendChild(scriptElement);

      // Clean up after execution
      setTimeout(() => {
        if (scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }
      }, 100);
    });
  }

  /**
   * Checks if local PSP resources are available from the storefront configuration
   */
  hasLocalPspResources(paymentOptionId?: number): boolean {
    if (!paymentOptionId) {
      return false;
    }
    const localPspResources = (this.config as any).opf?.localPspResources;
    return localPspResources ? paymentOptionId in localPspResources : false;
  }

  /**
   * Extracts script content and context from dynamic script if in SEPARATE mode
   */
  protected extractDynamicScriptContext(dynamicScript?: OpfDynamicScript): {
    originalScript?: string;
    contextData?: any;
  } {
    if (
      dynamicScript?.htmlContentMode === OpfHtmlContentMode.SEPARATE &&
      dynamicScript.jsContent
    ) {
      return {
        originalScript: dynamicScript.jsContent,
        contextData: this.parseContext(dynamicScript.jsContext),
      };
    }
    return {};
  }

  /**
   * Adds CSS from dynamic script to styles array if in SEPARATE mode
   */
  protected addDynamicScriptCss(
    dynamicScript?: OpfDynamicScript,
    styles: OpfDynamicScriptResource[] = []
  ): void {
    if (
      dynamicScript?.htmlContentMode === OpfHtmlContentMode.SEPARATE &&
      dynamicScript.cssUrl &&
      dynamicScript.cssHash
    ) {
      styles.push({
        url: dynamicScript.cssUrl,
        sri: dynamicScript.cssHash,
        type: OpfDynamicScriptResourceType.STYLES,
      });
    }
  }

  /**
   * Gets local PSP resources if available for the given payment option ID
   */
  protected getLocalResources(
    paymentOptionId?: number
  ): OpfDynamicScriptResource[] {
    if (!paymentOptionId || !this.hasLocalPspResources(paymentOptionId)) {
      return [];
    }

    const localPspResources = (this.config as any).opf?.localPspResources;
    const localResources = localPspResources?.[paymentOptionId];

    if (!localResources) {
      return [];
    }

    const localScripts: OpfDynamicScriptResource[] = localResources.jsFiles.map(
      (url: string) => ({
        url,
        type: OpfDynamicScriptResourceType.SCRIPT,
      })
    );

    const localStyles: OpfDynamicScriptResource[] = localResources.cssFiles.map(
      (url: string) => ({
        url,
        type: OpfDynamicScriptResourceType.STYLES,
      })
    );

    return [...localScripts, ...localStyles];
  }

  /**
   * Converts external scripts and styles to resource format
   */
  protected getExternalResources(
    scripts: OpfDynamicScriptResource[] = [],
    styles: OpfDynamicScriptResource[] = []
  ): OpfDynamicScriptResource[] {
    return [
      ...scripts.map((script) => ({
        ...script,
        type: OpfDynamicScriptResourceType.SCRIPT,
      })),
      ...styles.map((style) => ({
        ...style,
        type: OpfDynamicScriptResourceType.STYLES,
      })),
    ];
  }

  /**
   * Loads a single resource based on its type
   */
  protected loadResource(resource: OpfDynamicScriptResource): Promise<void> {
    if (!resource.url) {
      return Promise.resolve();
    }

    switch (resource.type) {
      case OpfDynamicScriptResourceType.SCRIPT:
        return this.loadScript(resource);
      case OpfDynamicScriptResourceType.STYLES:
        return this.loadStyles(resource);
      default:
        return Promise.resolve();
    }
  }

  /**
   * Loads scripts and stylesheets specified in the lists of resource objects (scripts and styles).
   * The method automatically selects local or external resources based on the presence of localPspResources
   * in the storefront configuration.
   * If localPspResources are present, the method uses local resources.
   * If localPspResources are not present, the method uses external resources.
   *
   * When htmlContentMode is SEPARATE, the method uses jsContent/jsHash and cssUrl/cssHash properties
   * to load resources with specific URLs and SRI hashes.
   *
   * The returned Promise is resolved when all resources are loaded.
   * The returned Promise is also resolved (not rejected!) immediately when any loading error occurs.
   */
  loadResources(
    scripts: OpfDynamicScriptResource[] = [],
    styles: OpfDynamicScriptResource[] = [],
    paymentOptionId?: number,
    dynamicScript?: OpfDynamicScript
  ): Promise<void> {
    // SSR mode not supported for security concerns
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve();
    }

    const { originalScript, contextData } =
      this.extractDynamicScriptContext(dynamicScript);
    this.addDynamicScriptCss(dynamicScript, styles);

    const localResources = this.getLocalResources(paymentOptionId);
    const resources =
      localResources.length > 0
        ? localResources
        : this.getExternalResources(scripts, styles);

    if (!resources.length) {
      if (originalScript) {
        this.executeScriptWithContext(originalScript, contextData);
      }
      return Promise.resolve();
    }

    const resourcesPromises = resources.map((resource) =>
      this.loadResource(resource)
    );

    return Promise.all(resourcesPromises).then(() => {
      if (originalScript) {
        setTimeout(() => {
          this.executeScriptWithContext(originalScript, contextData);
        });
      }
    });
  }
}
