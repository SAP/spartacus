/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';
import {
  PaymentDynamicScriptResource,
  PaymentDynamicScriptResourceType,
} from '@spartacus/opf/root';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpfResourceLoaderService extends ScriptLoader {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {
    super(document, platformId);
  }

  protected loadedResources: PaymentDynamicScriptResource[] = [];

  protected embedStyles(embedOptions: {
    src: string;
    callback?: EventListener;
    errorCallback?: EventListener;
  }): void {
    const { src, callback, errorCallback } = embedOptions;

    const isSSR = isPlatformServer(this.platformId);
    if ((callback || errorCallback) && isSSR) {
      return;
    }

    if (!isSSR && this.hasStyles(src)) {
      return;
    }

    const link: HTMLLinkElement = this.document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';
    link.type = 'text/css';

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
    return super.hasScript(src);
  }

  protected handleLoadingResourceError(src?: string) {
    return throwError(`Error while loading external ${src} resource.`);
  }

  protected isResourceLoadingCompleted(
    resources: PaymentDynamicScriptResource[]
  ) {
    return resources.length === this.loadedResources.length;
  }

  protected markResourceAsLoaded(
    resource: PaymentDynamicScriptResource,
    resources: PaymentDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    this.loadedResources.push(resource);
    if (this.isResourceLoadingCompleted(resources)) {
      resolve();
    }
  }

  protected loadScript(
    resource: PaymentDynamicScriptResource,
    resources: PaymentDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    if (resource.url && !this.hasScript(resource.url)) {
      super.embedScript({
        src: resource.url,
        attributes: { type: 'text/javascript' },
        callback: () => this.markResourceAsLoaded(resource, resources, resolve),
        errorCallback: () => this.handleLoadingResourceError(resource.url),
      });
    } else {
      this.markResourceAsLoaded(resource, resources, resolve);
    }
  }

  protected loadStyles(
    resource: PaymentDynamicScriptResource,
    resources: PaymentDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    if (resource.url && !this.hasStyles(resource.url)) {
      this.embedStyles({
        src: resource.url,
        callback: () => this.markResourceAsLoaded(resource, resources, resolve),
        errorCallback: () => this.handleLoadingResourceError(resource.url),
      });
    } else {
      this.markResourceAsLoaded(resource, resources, resolve);
    }
  }

  executeScriptFromHtml(html: string | undefined) {
    if (html) {
      const element = new DOMParser().parseFromString(html, 'text/html');
      const script = element.getElementsByTagName('script');
      Function(script[0].innerText)();
    }
  }

  loadProviderResources(
    scripts: PaymentDynamicScriptResource[] = [],
    styles: PaymentDynamicScriptResource[] = []
  ): Promise<void> {
    const resources: PaymentDynamicScriptResource[] = [
      ...scripts.map((script) => ({
        ...script,
        type: PaymentDynamicScriptResourceType.SCRIPT,
      })),
      ...styles.map((style) => ({
        ...style,
        type: PaymentDynamicScriptResourceType.STYLES,
      })),
    ];

    return new Promise((resolve) => {
      this.loadedResources = [];

      resources.forEach((resource: PaymentDynamicScriptResource) => {
        if (!resource.url) {
          this.markResourceAsLoaded(resource, resources, resolve);
        } else {
          switch (resource.type) {
            case PaymentDynamicScriptResourceType.SCRIPT:
              this.loadScript(resource, resources, resolve);
              break;
            case PaymentDynamicScriptResourceType.STYLES:
              this.loadStyles(resource, resources, resolve);
              break;
            default:
              break;
          }
        }
      });
    });
  }
}
