import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { UserItemService } from '../../../../user/services/user-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserItemService extends UserItemService {
  save(form: FormGroup, key?: string) {
    // we enable the orgUnit temporarily so that the underlying
    // save method can read the complete form.value.
    form.get('orgUnit')?.enable();
    super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'unitUserList';
  }

  protected getRouteParams(item: B2BUser) {
    return { uid: item.orgUnit.uid };
  }
}
