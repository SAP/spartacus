/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export interface TestQueryParams {
  /**
   * Causes HTTP 404 error
   */
  pageNotFoundError?: boolean;
  /**
   * Causes HTTP 500 error
   */
  serverError?: boolean;
  /**
   * Causes error in NgRx flow, that eventually turns into 500 unknown server error
   */
  ngrxError?: boolean;
  /**
   * control `ssrStrictErrorHandlingForHttpAndNgrx` feature toggle. Enabled by default
   */
  enableSsrStrictErrorHandlingForHttpAndNgrx?: boolean;
  /**
   * control `propagateErrorsToServer` feature toggle. Enabled by default
   */
  enablePropagateErrorsToServer?: boolean;
  /** control whether SSR response contains custom status and header:
   * `x-custom-status: 203` and `status: 203`
   */
  customResponseStatus?: boolean;
  /**
   * Causes runtime error in component
   */
  runtimeErrorInComponent?: boolean;

  /**
   * Turn on ExpressJS error handler returning custom error page.
   */
  customErrorPage?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TestQueryParamsService {
  protected location = inject(Location);

  protected _queryParams: TestQueryParams = {
    pageNotFoundError: false,
    serverError: false,
    ngrxError: false,
    enableSsrStrictErrorHandlingForHttpAndNgrx: true,
    enablePropagateErrorsToServer: true,
    customResponseStatus: false,
    runtimeErrorInComponent: false,
  };

  get queryParams(): TestQueryParams {
    const url = new URLSearchParams(this.location.path());
    const result: { [key: string]: string | boolean } = {};
    url.forEach((value, key) => {
      const newKey = key.split('?')[1] ? key.split('?')[1] : key;
      result[newKey] = value === 'true' ? true : false;
    });
    this._queryParams = { ...this._queryParams, ...result };
    return this._queryParams;
  }
}
