import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseSiteService, OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type Listing = {
  code: string;
  title: string;
  brand: string;
  model: string;
  condition: string;
  price: number;
  description: string;
  deliveryOption: {
    type: string;
    price: number;
  };
  images: string[];
};

export type ListingResponse = {
  itemId: string;
};

@Injectable({ providedIn: 'root' })
export class ResellService {
  constructor(
    private config: OccConfig,
    protected http: HttpClient,
    protected baseSiteService: BaseSiteService
  ) {}

  loadStockLevels(listing: Listing): Observable<ListingResponse> {
    return this.baseSiteService
      .getActive()
      .pipe(
        switchMap((baseSiteId) =>
          this.http.post<ListingResponse>(
            `${this.config?.backend?.occ?.baseUrl}/ebay/listings`,
            listing,
            { headers: { baseSiteId } }
          )
        )
      );
  }
}
