import { Cart, EntitiesModel } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class SavedCartAdapter {
  /**
   * Abstract method used to load a list of saved carts
   */
  abstract loadList(userId: string): Observable<EntitiesModel<Cart>>;
}
