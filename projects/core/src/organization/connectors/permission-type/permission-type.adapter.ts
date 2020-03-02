import { Observable } from 'rxjs';
import { OrderApprovalPermissionType } from '../../../model/permission.model';
import { EntitiesModel } from '../../../model/misc.model';

export abstract class PermissionTypeAdapter {
  /**
   * Abstract method used to load the OrderApprovalPermissionType list.
   */

  abstract loadList(): Observable<EntitiesModel<OrderApprovalPermissionType>>;
}
