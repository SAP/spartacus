import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export interface TestQueryParams {
  pageNotFoundError?: boolean;
  serverError?: boolean;
  ngrxError?: boolean;
  enableSsrStrictErrorHandlingForHttpAndNgrx?: boolean;
  enablePropagateErrorsToServer?: boolean;
  customResponseStatus?: boolean;
  runtimeErrorInComponent?: boolean;
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
