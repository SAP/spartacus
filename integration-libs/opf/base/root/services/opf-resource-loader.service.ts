/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';

import {
  OpfDynamicScriptResource,
  OpfDynamicScriptResourceType,
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

  protected loadedResources: OpfDynamicScriptResource[] = [];

  protected embedStyles(embedOptions: {
    src: string;
    callback?: EventListener;
    errorCallback: EventListener;
  }): void {
    const { src, callback, errorCallback } = embedOptions;

    const isSSR = isPlatformServer(this.platformId);

    if (isSSR) {
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

  protected handleLoadingResourceError(
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    resolve();
  }

  protected isResourceLoadingCompleted(resources: OpfDynamicScriptResource[]) {
    return resources.length === this.loadedResources.length;
  }

  protected markResourceAsLoaded(
    resource: OpfDynamicScriptResource,
    resources: OpfDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    console.log('flo7', resource);
    this.loadedResources.push(resource);
    console.log('flo75');
    if (this.isResourceLoadingCompleted(resources)) {
      console.log('flo8');
      resolve();
    }
    console.log('flo9');
  }

  protected loadScript(
    resource: OpfDynamicScriptResource,
    resources: OpfDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    const attributes: any = {
      type: 'text/javascript',
      [this.OPF_RESOURCE_ATTRIBUTE_KEY]: true,
    };

    if (resource.attributes) {
      resource.attributes.forEach((attribute) => {
        attributes[attribute.key] = attribute.value;
      });
    }
    console.log('flo9');
    if (resource.url && !this.hasScript(resource.url)) {
      console.log('flo91');
      super.embedScript({
        src: resource.url,
        attributes: attributes,
        callback: () => {
          console.log('flo93');
          this.markResourceAsLoaded(resource, resources, resolve);
        },
        errorCallback: () => {
          console.log('flo94');
          this.handleLoadingResourceError(resolve);
        },
      });
    } else {
      console.log('flo92');
      this.markResourceAsLoaded(resource, resources, resolve);
    }
  }

  protected loadStyles(
    resource: OpfDynamicScriptResource,
    resources: OpfDynamicScriptResource[],
    resolve: (value: void | PromiseLike<void>) => void
  ) {
    if (resource.url && !this.hasStyles(resource.url)) {
      this.embedStyles({
        src: resource.url,
        callback: () => this.markResourceAsLoaded(resource, resources, resolve),
        errorCallback: () => {
          this.handleLoadingResourceError(resolve);
        },
      });
    } else {
      this.markResourceAsLoaded(resource, resources, resolve);
    }
  }

  executeScriptFromHtml(html: string | undefined) {
    const isSSR = isPlatformServer(this.platformId);
    console.log('3 isSSR', isSSR);
    if (html) {
      const element = new DOMParser().parseFromString(html, 'text/html');
      const script = element.getElementsByTagName('script');
      if (!script?.[0]?.innerText) {
        return;
      }
      Function(script[0].innerText)();
    }
  }

  clearAllProviderResources() {
    this.document
      .querySelectorAll(`[${this.OPF_RESOURCE_ATTRIBUTE_KEY}]`)
      .forEach((resource: undefined | HTMLLinkElement | HTMLScriptElement) => {
        if (resource) {
          resource.remove();
        }
      });
  }

  loadProviderResources(
    scripts: OpfDynamicScriptResource[] = [],
    styles: OpfDynamicScriptResource[] = []
  ): Promise<void> {
    const isSSR = isPlatformServer(this.platformId);
    if (isSSR) {
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
    console.log('flo4');
    if (!resources.length) {
      console.log('flo5');
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.loadedResources = [];
      console.log('flo6');
      resources.forEach((resource: OpfDynamicScriptResource) => {
        console.log('flo61', resource);
        if (!resource.url) {
          console.log('flo65');
          this.markResourceAsLoaded(resource, resources, resolve);
        } else {
          console.log('flo66');
          switch (resource.type) {
            case OpfDynamicScriptResourceType.SCRIPT:
              this.loadScript(resource, resources, resolve);
              break;
            case OpfDynamicScriptResourceType.STYLES:
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
