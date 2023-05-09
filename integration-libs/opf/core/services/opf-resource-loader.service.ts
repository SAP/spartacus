/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';
import { PaymentDynamicScriptResource } from '@spartacus/opf/root';
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

  hasScript(src?: string): boolean {
    return super.hasScript(src);
  }

  executeScriptFromHtml(html: string | undefined) {
    if (html) {
      const element = new DOMParser().parseFromString(html, 'text/html');
      const script = element.getElementsByTagName('script');
      Function(script[0].innerText)();
    }
  }

  loadProviderScripts(
    scripts: PaymentDynamicScriptResource[] | undefined
  ): Promise<void> {
    return new Promise((resolve) => {
      let loaded = 0;

      scripts?.forEach((script: PaymentDynamicScriptResource) => {
        if (script.url) {
          if (this.hasScript(script.url)) {
            loaded++;
            if (loaded === scripts?.length) {
              resolve();
            }
          } else {
            super.embedScript({
              src: script.url,
              attributes: { type: 'text/javascript' },
              callback: () => {
                loaded++;
                if (loaded === scripts?.length) {
                  resolve();
                }
              },
              errorCallback: () =>
                throwError(
                  `Error while loading external ${script.url} script.`
                ),
            });
          }
        }
      });
    });
  }
}
