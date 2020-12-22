import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { B2BUser } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { UserItemService } from '../../../../user/services/user-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserItemService extends UserItemService {
  save(
    form: FormGroup,
    key?: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    // we enable the orgUnit temporarily so that the underlying
    // save method can read the complete form.value.
    form.get('orgUnit')?.enable();
    return super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitUserList';
  }

  protected buildRouteParams(item: B2BUser) {
    return { uid: item.orgUnit.uid };
  }

  // @override to default method
  launchDetails(item: B2BUser): void {
    const cxRoute = this.getDetailsRoute();
    const params = this.buildRouteParams(item);
    if (cxRoute && item && Object.keys(item).length > 0) {
      this.routingService.go({ cxRoute, params });
    }
  }
}
