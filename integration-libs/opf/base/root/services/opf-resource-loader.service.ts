/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { Config, ScriptLoader, WindowRef } from '@spartacus/core';

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
        } catch (_) {}
      }
      return parsed;
    } catch (_) {
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
        nativeWindow.OpfContext = contextData;
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

    let originalScript: string | undefined;
    let contextData: any;

    if (
      dynamicScript?.htmlContentMode === OpfHtmlContentMode.SEPARATE &&
      dynamicScript.jsContent
    ) {
      try {
        contextData = this.parseContext(dynamicScript.jsContext);
        originalScript = dynamicScript.jsContent;
      } catch (_) {
        // Intentionally swallow errors to align with existing load behavior (resolve on errors)
      }
    }

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

    const resources: OpfDynamicScriptResource[] = [];

    if (paymentOptionId && this.hasLocalPspResources(paymentOptionId)) {
      const localPspResources = (this.config as any).opf?.localPspResources;
      const localResources = localPspResources?.[paymentOptionId];

      if (localResources) {
        // Convert local paths to OpfDynamicScriptResource format
        const localScripts: OpfDynamicScriptResource[] =
          localResources.jsFiles.map((url: string) => ({
            url,
            type: OpfDynamicScriptResourceType.SCRIPT,
          }));

        const localStyles: OpfDynamicScriptResource[] =
          localResources.cssFiles.map((url: string) => ({
            url,
            type: OpfDynamicScriptResourceType.STYLES,
          }));

        resources.push(...localScripts, ...localStyles);
      }
    }

    // Fallback to external resources if no local resources found
    if (resources.length === 0) {
      resources.push(
        ...scripts.map((script) => ({
          ...script,
          type: OpfDynamicScriptResourceType.SCRIPT,
        })),
        ...styles.map((style) => ({
          ...style,
          type: OpfDynamicScriptResourceType.STYLES,
        }))
      );
    }

    if (!resources.length) {
      if (originalScript) {
        this.executeScriptWithContext(originalScript, contextData);
      }
      return Promise.resolve();
    }

    const resourcesPromises = resources.map(
      (resource: OpfDynamicScriptResource) => {
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
