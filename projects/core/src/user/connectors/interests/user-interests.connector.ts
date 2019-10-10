import { Injectable } from '@angular/core';
import { UserInterestsAdapter } from './user-interests.adapter';
import { Observable } from 'rxjs';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
} from '../../../model/product-interest.model';

@Injectable({
  providedIn: 'root',
})
export class UserInterestsConnector {
  constructor(protected adapter: UserInterestsAdapter) {}
  getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ProductInterestSearchResult> {
    return this.adapter.getInterests(userId, pageSize, currentPage, sort);
  }

  removeInterests(
    userId: string,
    item: ProductInterestEntryRelation
  ): Observable<any[]> {
    return this.adapter.removeInterests(userId, item);
  }
}
