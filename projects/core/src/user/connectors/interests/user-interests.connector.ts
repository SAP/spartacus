import { Injectable } from '@angular/core';
import { UserInterestsAdapter } from './user-interests.adapter';
import { Observable } from 'rxjs';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  NotificationType,
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
    sort?: string,
    productCode?: string,
    notificationType?: NotificationType
  ): Observable<ProductInterestSearchResult> {
    return this.adapter.getInterests(
      userId,
      pageSize,
      currentPage,
      sort,
      productCode,
      notificationType
    );
  }

  removeInterest(
    userId: string,
    item: ProductInterestEntryRelation
  ): Observable<any[]> {
    return this.adapter.removeInterest(userId, item);
  }

  addInterest(
    userId: string,
    productCode: string,
    notificationType: NotificationType
  ): Observable<any> {
    return this.adapter.addInterest(userId, productCode, notificationType);
  }
}
