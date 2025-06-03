/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';

import {
  OpfDynamicScriptResource,
  OpfDynamicScriptResourceType,
  OpfKeyValueMap,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class OpfResourceLoaderService {
  protected scriptLoader = inject(ScriptLoader);
  protected document = inject(DOCUMENT);
  protected platformId = inject(PLATFORM_ID);

  // Store backend response time to include in total calculation
  static backendResponseTime: number = 0;

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
    const startTime = performance.now();
    const { attributes, src, sri, callback, errorCallback } = embedOptions;

    // Get resource URL for performance timing
    const resourceUrl = new URL(src, window.location.href).toString();

    // eslint-disable-next-line no-console
    console.log(`[OPF Resource Loader] Starting to load stylesheet: ${src}`);

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
      link.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        const resourceTimingAfterLoad = performance.getEntriesByName(
          resourceUrl,
          'resource'
        );
        const networkTiming = resourceTimingAfterLoad[
          resourceTimingAfterLoad.length - 1
        ] as PerformanceResourceTiming;

        const networkMetrics = networkTiming
          ? {
              dnsLookup:
                networkTiming.domainLookupEnd - networkTiming.domainLookupStart,
              tcpConnection:
                networkTiming.connectEnd - networkTiming.connectStart,
              requestTime:
                networkTiming.responseEnd - networkTiming.requestStart,
              totalNetworkTime:
                networkTiming.responseEnd - networkTiming.startTime,
            }
          : null;

        console.log(`[OPF Resource Loader] Stylesheet loaded: ${src}`, {
          totalLoadTime: `${loadTime.toFixed(2)}ms`,
          networkMetrics: networkMetrics
            ? {
                dnsLookup: `${networkMetrics.dnsLookup.toFixed(2)}ms`,
                tcpConnection: `${networkMetrics.tcpConnection.toFixed(2)}ms`,
                requestTime: `${networkMetrics.requestTime.toFixed(2)}ms`,
                totalNetworkTime: `${networkMetrics.totalNetworkTime.toFixed(2)}ms`,
              }
            : 'Not available',
        });
        callback(new Event('load'));
      });
    }

    if (errorCallback) {
      link.addEventListener('error', (error) => {
        const errorTime = performance.now() - startTime;
        console.error(
          `[OPF Resource Loader] Failed to load stylesheet: ${src} (${errorTime.toFixed(2)}ms)`,
          error
        );
        errorCallback(error);
      });
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
      const startTime = performance.now();
      const resourceUrl = resource.url
        ? new URL(resource.url, window.location.href).toString()
        : '';

      // eslint-disable-next-line no-console
      console.log(
        `[OPF Resource Loader] Starting to load payment resource: ${resource.url}`
      );

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
          callback: () => {
            const loadTime = performance.now() - startTime;
            if (resourceUrl) {
              const resourceTiming = performance.getEntriesByName(
                resourceUrl,
                'resource'
              );
              const networkTiming = resourceTiming[
                resourceTiming.length - 1
              ] as PerformanceResourceTiming;

              // eslint-disable-next-line no-console
              console.log(
                `[OPF Resource Loader] Payment resource loaded: ${resource.url}`,
                {
                  totalTime: `${loadTime.toFixed(0)}ms`,
                  networkMetrics: networkTiming
                    ? {
                        dnsLookup: `${(networkTiming.domainLookupEnd - networkTiming.domainLookupStart).toFixed(0)}ms`,
                        tcpConnection: `${(networkTiming.connectEnd - networkTiming.connectStart).toFixed(0)}ms`,
                        downloadTime: `${(networkTiming.responseEnd - networkTiming.responseStart).toFixed(0)}ms`,
                        totalNetworkTime: `${(networkTiming.responseEnd - networkTiming.startTime).toFixed(0)}ms`,
                        resourceSize: `${(networkTiming.transferSize / 1024).toFixed(1)}KB`,
                      }
                    : 'Not available',
                }
              );
            }
            resolve();
          },
          errorCallback: (error) => {
            const errorTime = performance.now() - startTime;
            // eslint-disable-next-line no-console
            console.error(
              `[OPF Resource Loader] Failed to load payment resource: ${resource.url}`,
              {
                errorTime: `${errorTime.toFixed(0)}ms`,
                error,
              }
            );
            reject();
          },
          disableKeyRestriction: true,
        });
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `[OPF Resource Loader] Payment resource already loaded: ${resource.url}`
        );
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
   * Loads scripts and stylesheets specified in the lists of resource objects (scripts and styles).
   *
   * The returned Promise is resolved when all resources are loaded.
   * The returned Promise is also resolved (not rejected!) immediately when any loading error occurs.
   */

  loadResources(
    scripts: OpfDynamicScriptResource[] = [],
    styles: OpfDynamicScriptResource[] = []
  ): Promise<void> {
    const startTime = performance.now();
    // eslint-disable-next-line no-console
    console.log('[OPF Payment] Starting payment form initialization', {
      scriptCount: scripts.length,
      styleCount: styles.length,
      totalResources: scripts.length + styles.length,
    });

    // SSR mode not supported for security concerns
    if (isPlatformServer(this.platformId)) {
      // eslint-disable-next-line no-console
      console.log('[OPF Payment] Skipping resource loading in SSR mode');
      return Promise.resolve();
    }

    const resources: OpfDynamicScriptResource[] = [
      ...scripts.map((script) => ({
        ...script,
        type: OpfDynamicScriptResourceType.SCRIPT,
      })),
      ...styles.map((style) => ({
        ...style,
        type: OpfDynamicScriptResourceType.STYLES,
      })),
    ];

    if (!resources.length) {
      // eslint-disable-next-line no-console
      console.log('[OPF Payment] No payment resources to load');
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
      const resourceLoadTime = performance.now() - startTime;
      const totalTime =
        resourceLoadTime + OpfResourceLoaderService.backendResponseTime;

      // eslint-disable-next-line no-console
      console.log('[OPF Payment] Payment form initialization completed', {
        backendResponseTime: `${(OpfResourceLoaderService.backendResponseTime / 1000).toFixed(2)}s`,
        resourceLoadTime: `${(resourceLoadTime / 1000).toFixed(2)}s`,
        totalTime: `${(totalTime / 1000).toFixed(2)}s`,
        resourceCount: resources.length,
      });

      // Reset backend response time for next initialization
      OpfResourceLoaderService.backendResponseTime = 0;
    });
  }
}
