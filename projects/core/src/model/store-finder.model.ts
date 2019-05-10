import { PaginationModel, SortModel } from './misc.model';
import { PointOfService } from './order.model';

export interface StoreFinderSearchPage {
  boundEastLongitude?: number;
  boundNorthLatitude?: number;
  boundSouthLatitude?: number;
  boundWestLongitude?: number;
  locationText?: string;
  pagination?: PaginationModel;
  sorts?: SortModel[];
  sourceLatitude?: number;
  sourceLongitude?: number;
  stores?: PointOfService[];
}
