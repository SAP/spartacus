import { Injectable } from '@angular/core';
import { UserInterestsAdapter } from './user-interests.adapter';
import { Observable } from 'rxjs';
import {
  ProductInterestList,
  ProductInterestRelation,
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
  ): Observable<ProductInterestList> {
    return this.adapter.getInterests(
      userId,
      pageSize,
      currentPage,
      sort,
      productCode,
      notificationType
    );
  }

  removeInterests(
    userId: string,
    item: ProductInterestRelation
  ): Observable<any[]> {
    return this.adapter.removeInterests(userId, item);
  }
}
