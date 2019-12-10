import { Observable } from 'rxjs';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  NotificationType,
} from '../../../model/product-interest.model';

export abstract class UserInterestsAdapter {
  /**
   * Abstract method used to load product interests for an user.
   *
   * @param userId The `userId` for given user
   * @param pageSize
   * @param currentPage
   * @param sort Sorting method
   * @param productCode The product code
   * @param  notificationType The notification type
   */
  abstract getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    productCode?: string,
    notificationType?: NotificationType
  ): Observable<ProductInterestSearchResult>;

  /**
   * Abstract method used to remove product interest for an user.
   *
   * @param userId The `userId` for given user
   * @param ProductInterestRelation The product interest to be removed.
   */
  abstract removeInterest(
    userId: string,
    item: ProductInterestEntryRelation
  ): Observable<any[]>;

  /**
   * Abstract method to add a product interest for an user.
   *
   * @param userId The `userId` for given user
   * @param productCode The product code
   * @param notificationType The notification type
   */
  abstract addInterest(
    userId: string,
    productCode: string,
    notificationType: NotificationType
  ): Observable<any>;
}
