import { Injectable } from '@angular/core';
import { UserInterestsAdapter } from './user-interests.adapter';
import { Observable } from 'rxjs';
import {
  ProductInterestList,
  ProductInterestRelation,
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
  ): Observable<ProductInterestList> {
    return this.adapter.getInterests(userId, pageSize, currentPage, sort);
  }

  removeInterests(
    userId: string,
    item: ProductInterestRelation
  ): Observable<any[]> {
    return this.adapter.removeInterests(userId, item);
  }
}
