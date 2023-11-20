import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { SpikeQueryParams } from './$spike-query-params';

/**
 * Service that returns query params of the current URL based on the Angular Location service.
 */
@Injectable({ providedIn: 'root' })
export class QueryParamsService {
  protected location = inject(Location);

  protected _queryParams: SpikeQueryParams;

  get queryParams(): SpikeQueryParams {
    if (this._queryParams) {
      return this._queryParams;
    }

    const url = new URLSearchParams(this.location.path());
    const result = Object.fromEntries(Array.from(url.entries()));
    this._queryParams = result;
    return result;
  }
}
