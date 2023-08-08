/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';

import { throwError } from 'rxjs';
import {
  AfterRedirectDynamicScriptResource,
  AfterRedirectDynamicScriptResourceType,
} from '../model';

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

  protected readonly OPF_RESOURCE_ATTRIBUTE_KEY = 'data-opf-resource';

  protected loadedResources: AfterRedirectDynamicScriptResource[] = [];

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
    link.setAttribute(this.OPF_RESOURCE_ATTRIBUTE_KEY, 'true');

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
    resources: AfterRedirectDynamicScriptResource[]
  ) {
    return resources.length === this.loadedResources.length;
  }

  protected markResourceAsLoaded(
    resource: AfterRedirectDynamicScriptResource,
    resources: AfterRedirectDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    this.loadedResources.push(resource);
    if (this.isResourceLoadingCompleted(resources)) {
      resolve();
    }
  }

  protected loadScript(
    resource: AfterRedirectDynamicScriptResource,
    resources: AfterRedirectDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    if (resource.url && !this.hasScript(resource.url)) {
      super.embedScript({
        src: resource.url,
        attributes: {
          type: 'text/javascript',
          [this.OPF_RESOURCE_ATTRIBUTE_KEY]: true,
        },

        callback: () => this.markResourceAsLoaded(resource, resources, resolve),
        errorCallback: () => this.handleLoadingResourceError(resource.url),
      });
    } else {
      this.markResourceAsLoaded(resource, resources, resolve);
    }
  }

  protected loadStyles(
    resource: AfterRedirectDynamicScriptResource,
    resources: AfterRedirectDynamicScriptResource[],
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
    scripts: AfterRedirectDynamicScriptResource[] = [],
    styles: AfterRedirectDynamicScriptResource[] = []
  ): Promise<void> {
    const resources: AfterRedirectDynamicScriptResource[] = [
      ...scripts.map((script) => ({
        ...script,
        type: AfterRedirectDynamicScriptResourceType.SCRIPT,
      })),
      ...styles.map((style) => ({
        ...style,
        type: AfterRedirectDynamicScriptResourceType.STYLES,
      })),
    ];

    return new Promise((resolve) => {
      this.loadedResources = [];

      resources.forEach((resource: AfterRedirectDynamicScriptResource) => {
        if (!resource.url) {
          this.markResourceAsLoaded(resource, resources, resolve);
        } else {
          switch (resource.type) {
            case AfterRedirectDynamicScriptResourceType.SCRIPT:
              this.loadScript(resource, resources, resolve);
              break;
            case AfterRedirectDynamicScriptResourceType.STYLES:
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
