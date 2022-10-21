/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SsrHttpErrorsInterceptor } from './ssr-http-errors.interceptor';

@Injectable({ providedIn: 'root' })
export class SsrErrorHandlerService {
  constructor(
    protected httpErrorsInterceptor: SsrHttpErrorsInterceptor,
    protected windowRef: WindowRef
  ) {}

  protected getErrors(): any[] {
    return this.httpErrorsInterceptor.errors;
  }

  handleErrors() {
    // SPIKE TODO - UNCOMMENT IT:
    // if(this.windowRef.isBrowser()){
    //   return;
    // }

    const errors = this.getErrors();

    if (errors.length) {
      this.embedErrorsInHtml(errors);

      // SPIKE TODO REMOVE:
      // console.error({
      //   message: 'Server-side rendering errors',
      //   // url: this.windowRef.location.href,
      //   errors,
      // });
    }
  }

  protected embedErrorsInHtml(errors: any[]) {
    const serializedErrors = this.serializeErrors(errors);

    const script = this.windowRef.document.createElement('script');
    script.id = 'cx-ssr-errors';
    script.setAttribute('type', 'application/json');
    script.textContent = escapeHtml(serializedErrors);
    this.windowRef.document.body.appendChild(script);
  }

  // SPIKE TODO: make the serialization more specific
  protected serializeErrors(errors: any[]): string {
    errors = errors.map((httpErrorResponse) => {
      const { status, url } = httpErrorResponse;
      return { status, url };
    });

    return JSON.stringify({
      errors,
      errorsCount: errors.length,
    });
  }
}

// SPIKE TODO: embed information about errors in the HTML body
// https://github.com/angular/angular/blob/24950dd2a5b6a69a6afc80b8e2041f99bfd47e06/packages/platform-browser/src/browser/transfer_state.ts#L22
export function escapeHtml(text: string): string {
  const escapedText: { [k: string]: string } = {
    '&': '&a;',
    '"': '&q;',
    "'": '&s;',
    '<': '&l;',
    '>': '&g;',
  };
  return text.replace(/[&"'<>]/g, (s) => escapedText[s]);
}
